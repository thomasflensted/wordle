export function getRandomWord(arr) {
    var num = Math.floor(Math.random() * arr.length);
    return arr[num].toUpperCase();
}

export function generateURL(ext) {
    const baseURL = "https://wordle-api-6ijq.onrender.com/";
    const extension = ext;
    return `${baseURL}${extension}`;
}

export function wordIsAllowed(wordArray, word) {
    for (let i = 0; i < wordArray.length; i++) {
        if (wordArray[i] === word) return true;
    }
    return false;
}