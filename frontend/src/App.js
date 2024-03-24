import NavBar from "./components/NavBar";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import StartScreen from "./components/StartScreen";
import AboutScreen from "./components/AboutScreen";
import GameOverScreen from "./components/GameOverScreen";
import Alert from "./components/Alert";
import LoadingDialogue from "./components/LoadingDialogue";
import Error from "./components/Error";
import { useEffect, useState, useRef } from "react";
import { keyIsLetter, getRowAndCol, getWord, checkWord, mergeArrays, updateStats } from "./helperFunctions";
import { getRandomWord, generateURL, wordIsAllowed } from "./apiFunctions";

function App() {

  var stats = JSON.parse(localStorage.getItem("stats")) || { total: 0, wins: 0, streak: 0 };
  const [currentRow, setCurrentRow] = useState(parseInt(localStorage.getItem("currentRow")) || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rowProgress, setRowProgress] = useState(parseInt(localStorage.getItem("rowProgress")) || 0);
  const [word, setWord] = useState(atob(localStorage.getItem("word")) || "");
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showAboutScreen, setShowAboutScreen] = useState(false);
  const [gameOver, setGameOver] = useState(JSON.parse(localStorage.getItem("gameOver")) || false);
  const [won, setWon] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [unusedLetters, setUnusedLetters] = useState(JSON.parse(localStorage.getItem("unusedLetters")) || [])
  const [totalProgress, setTotalProgress] = useState(parseInt(localStorage.getItem("totalProgress")) || 0);
  const [gameState, setGameState] = useState(JSON.parse(localStorage.getItem("gameState")) || [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ])
  const [classes, setClasses] = useState(JSON.parse(localStorage.getItem("classes")) || [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  useEffect(() => {
    localStorage.setItem("word", btoa(word));
    localStorage.setItem("unusedLetters", JSON.stringify(unusedLetters));
    localStorage.setItem("rowProgress", rowProgress);
    localStorage.setItem("totalProgress", totalProgress);
    localStorage.setItem("gameState", JSON.stringify(gameState));
    localStorage.setItem("classes", JSON.stringify(classes));
    localStorage.setItem("gameOver", JSON.stringify(gameOver));
    localStorage.setItem("currentRow", currentRow);
  }, [word, unusedLetters, rowProgress, totalProgress, gameState, classes, gameOver, currentRow])

  const addLetter = (key, progress) => {
    const rowAndCol = getRowAndCol(progress + 1);
    const newGameState = gameState;
    newGameState[rowAndCol.row][rowAndCol.col] = key;
    setGameState(newGameState);
  }

  const updateProgress = (key) => {
    if (key === "BACKSPACE") {
      const newRowProgress = rowProgress === 0 ? 0 : rowProgress - 1;
      const newTotalProgress = totalProgress === 0 ? 0 : totalProgress - 1;
      setTotalProgress(newTotalProgress)
      setRowProgress(newRowProgress)
    } else if (key.length === 1) {
      setTotalProgress(totalProgress + 1)
      setRowProgress(rowProgress + 1)
    } else {
      setRowProgress(0);
    }
  }

  const updateBoard = (classRow) => {
    const row = getRowAndCol(totalProgress).row;
    const newClassState = classes;
    newClassState[row] = classRow;
    setClasses(newClassState);
  }

  const updateKeyboard = (letters) => {
    const newUnusedLetters = mergeArrays(letters, unusedLetters);
    setUnusedLetters(newUnusedLetters);
  }

  const updateBoardAndKeyboard = (guessedWord, key) => {
    const classesAndUnusedLetters = checkWord(word, guessedWord);
    updateBoard(classesAndUnusedLetters.classes);
    updateKeyboard(classesAndUnusedLetters.unusedLetters);
    updateProgress(key);
  }

  const updatePreviousWords = () => {
    const previousWords = JSON.parse(localStorage.getItem("previousWords")) || [];
    previousWords.push(word);
    localStorage.setItem("previousWords", JSON.stringify(previousWords))
  }

  const alert = (msg) => {
    setAlertMsg(msg);
    setTimeout(() => {
      setAlertMsg("");
    }, 1500);
  }

  const handleEnter = async (key) => {

    if (rowProgress < 5) {
      alert("Not Enough Letters")
      return;
    }

    const guessedWord = getWord(totalProgress, gameState);
    const validWord = await wordIsValid(guessedWord);
    if (!validWord) {
      alert("Invalid Word");
      return;
    }

    updateBoardAndKeyboard(guessedWord, key);
    const newRow = currentRow + 1;
    setCurrentRow(newRow)

    if (guessedWord === word) {
      setTimeout(() => {
        setWon(true);
        updateStats(true, stats);
        setGameOver(true);
        updatePreviousWords()
      }, 1250);
    } else if (totalProgress === 30) {
      setTimeout(() => {
        setWon(false);
        updateStats(false, stats);
        setGameOver(true);
        updatePreviousWords()
      }, 1250);
    }
  }

  const resetGame = async () => {
    const newGameState = gameState.map(row => row.map(elem => ""));
    const newClassState = classes.map(row => row.map(elem => ""));
    setShowStartScreen(false)
    setGameState(newGameState);
    setClasses(newClassState);
    setGameOver(false);
    setWon(false);
    setTotalProgress(0);
    setRowProgress(0);
    setUnusedLetters([]);
    setCurrentRow(0)
    wordleRef.current.focus();
  }

  const handleKeyDown = (key) => {

    if (isLoading || error) return;
    if (typeof key === "object") key = key.key;

    if (keyIsLetter(key) && rowProgress !== 5 && !gameOver) {
      addLetter(key, totalProgress);
      updateProgress(key);
    }

    if (key === "BACKSPACE" && rowProgress > 0) {
      addLetter("", totalProgress - 1);
      updateProgress(key)
    }

    if (key === "ENTER") {
      handleEnter(key)
    }

  }

  const fetchWord = async () => {
    const URL = generateURL("api/words");
    const timer = setTimeout(() => setIsLoading(true), 500);
    try {
      const response = await fetch(URL);
      if (!response.ok) throw Error("Unable to retrieve word from server.")
      const data = await response.json();
      var previousWords = JSON.parse(localStorage.getItem("previousWords")) || [];
      previousWords = previousWords.length > 1500 ? [] : previousWords;
      var randomWord = getRandomWord(data);
      while (previousWords.includes(randomWord)) {
        randomWord = getRandomWord(data);
      }
      return randomWord;
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      clearTimeout(timer);
      setIsLoading(false);
    }
  }

  const wordIsValid = async (word) => {
    const URL = generateURL("api/allowed");
    const timer = setTimeout(() => setIsLoading(true), 500);
    try {
      const response = await fetch(URL);
      if (!response.ok) throw Error("There was a problem with the server.")
      const wordList = await response.json();
      return wordIsAllowed(wordList, word.toLowerCase());
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      clearTimeout(timer);
      setIsLoading(false);
    }
  }

  const wordleRef = useRef();
  useEffect(() => {
    if (!showStartScreen || !showAboutScreen) wordleRef.current.focus();
  }, [showStartScreen, showAboutScreen])

  return (
    <div
      tabIndex="0"
      ref={wordleRef}
      className="app"
      onKeyDown={(e) => handleKeyDown(e.key.toUpperCase())}
      onBlur={(e) => e.target.focus()}>

      {alertMsg && <Alert msg={alertMsg} />}

      {isLoading && <LoadingDialogue />}
      {error && <Error />}

      {gameOver && <GameOverScreen
        won={won}
        word={word}
        stats={stats}
        resetGame={resetGame}
        setWord={setWord}
        fetchWord={fetchWord} />}

      {showStartScreen && !gameOver && <StartScreen
        setShowStartScreen={setShowStartScreen}
        totalProgress={totalProgress}
        gameOver={gameOver}
        setWord={setWord}
        fetchWord={fetchWord} />}

      {showAboutScreen && <AboutScreen
        setShowAboutScreen={setShowAboutScreen} />}

      <NavBar
        setShowAboutScreen={setShowAboutScreen} />

      {!showStartScreen && <main>

        <Board
          gameState={gameState}
          classes={classes}
          currentRow={currentRow}
          handleKeyDown={handleKeyDown}
        />

        <Keyboard
          unusedLetters={unusedLetters}
          handleKeyDown={handleKeyDown} />

      </main>}

    </div >
  );
}

export default App;
