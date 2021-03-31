export function shuffleArray(arr) {
    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

export function getWeightedRand(spec) {
    var i, sum = 0, r = Math.random()
    for (i in spec) {
        sum += spec[i]
        if (r <= sum) return i
    }
}

export function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1))
}
