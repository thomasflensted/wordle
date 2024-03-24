export function keyIsLetter(key) {
    return key.length === 1 && key.toLowerCase() !== key;
}

export function getRowAndCol(progress) {
    const row = progress % 5 !== 0 ? Math.floor(progress / 5) : Math.floor(progress / 5) - 1;
    const col = progress % 5 !== 0 ? progress % 5 - 1 : 4;
    return { row: row, col: col };
}

export function endOfGame(progress) {
    return progress === 30;
}

export function getWord(progress, gameState) {
    const row = getRowAndCol(progress).row;
    return gameState[row].join("");
}

export function checkWord(word, guessedWord) {

    var duplicateCheck = word;
    var classes = Array(word.length).fill("gray");
    var unusedLetters = [];

    classes = classes.map((elem, idx) => {
        if (word[idx] === guessedWord[idx]) {
            duplicateCheck = duplicateCheck.replace(word[idx], "");
            return "green";
        } else {
            return elem;
        }
    })

    classes = classes.map((elem, idx) => {
        if (elem !== "green" && duplicateCheck.includes(guessedWord[idx])) {
            duplicateCheck = duplicateCheck.replace(guessedWord[idx], "");
            return "orange";
        } else if (!word.includes(guessedWord[idx])) unusedLetters.push(guessedWord[idx]);
        return elem;
    })

    return { classes: classes, unusedLetters: unusedLetters }
}

export function mergeArrays(arr1, arr2) {
    const newArr = [...arr1, ...arr2];
    const mergedArr = [...new Set(newArr)];
    return mergedArr;
}

export function updateStats(won, oldStats) {
    const updatedStats = {
        total: oldStats.total + 1,
        wins: won ? oldStats.wins + 1 : oldStats.wins,
        streak: won ? oldStats.streak + 1 : 0,
    }
    localStorage.setItem("stats", JSON.stringify(updatedStats));
}