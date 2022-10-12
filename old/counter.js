let seconds = 0;

function incrementSeconds() {
    seconds += 1;
    console.log(seconds + " seconds")
}

let cancel = setInterval(incrementSeconds, 1000);