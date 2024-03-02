const clientCache = new cacheAPI();
const gifApi = new gifyAPI();
const scoresCache = new ScoresAPI();

let gameActive = false;
let captionSent = false;
let voted = false;

let playerID;
let localPlayerObject = {};
let scoresJustIn = {};
let currentRound = 0;
console.log("Game State", currentRound);
let pressed1 = false;
let pressed2 = false;
let pressed3 = false;
let pressed4 = false;
let pID;

const form = document.querySelector('.caption__submit');
const captionInput = document.getElementById('fname');
const playerFormID = document.getElementById('playerFormID');
const hostStartGameButton = document.querySelector('#startGameButton');
const readyButton = document.querySelector('#readyButton');

const submitAPI = async () => {
    playerID = localPlayerObject.id;
    let playerApiObject = localPlayerObject;
    await clientCache.pushData(playerID, playerApiObject);
}

const requestAnswers = async () => {
    let infoArr = await clientCache.fetchCache();
    console.log("your answer are here", infoArr);
    let p1Input = infoArr[0].round1.input;
    let p2Input = infoArr[1].round1.input;
    let p3Input = infoArr[2].round1.input;

    console.log(p1Input);
    console.log(p2Input);
    console.log(p3Input);

    updatePlayer1Button(p1Input);
    updatePlayer2Button(p2Input);
    updatePlayer3Button(p3Input);
}

function updatePlayer1Button(text) {
    document.querySelector('.player1Caption').innerHTML = text;
}

function updatePlayer2Button(text) {
    document.querySelector('.player2Caption').innerHTML = text;
}

function updatePlayer3Button(text) {
    document.querySelector('.player3Caption').innerHTML = text;
}

function updatePlayer4Button(text) {
    document.querySelector('.player4Caption').innerHTML = text;
}

const playerReady = async (player) => {
    try {
        pID = player - 1;
        const getObject = await clientCache.fetchCache();
        let playerProfile = getObject[pID]
        localPlayerObject = playerProfile;
        console.log(localPlayerObject);
        setTimeout(() => {
            displayGifForRound(localPlayerObject)
            updateRoundDisplay(currentRound)
        }, 5000);

    } catch (error) {
        console.error(error);
    }
}

function displayGifForRound() {
    if (currentRound == 5) {
        currentRound = `X`;
        console.log("all rounds complete");
        // winner announcement and scores
        //starts here

        return
    } else {
        currentRound = currentRound + 1;
        console.log("Round =", currentRound);
        const gifURL = localPlayerObject[`round${currentRound}`].gifUrl;
        console.log(`Round ${currentRound} GIF URL:`, gifURL);
        const iframe = document.getElementById('round1Gif');
        iframe.src = gifURL;
    }
};

function nextRound() {
    captionSent = false;
    voted = false;
    pressed1 = false;
    pressed2 = false;
    pressed3 = false;
    pressed4 = false;
    displayGifForRound()
    updateRoundDisplay(currentRound)
}

const updateResults = async (id) => { //this updates the player input API on submit
    try {
        let infoArr = await clientCache.fetchCache();
        const displayResults = document.querySelector('.results-displayResults');
        displayResults.innerHTML = '';
        let i = id - 1;
        console.log(i);
        console.log("we are here");

    } catch (error) {
        console.error(error);
    }
}

const gifRefresh = async () => {
    try {
        let gifSrc = await gifApi.fetchGif();

        let r1 = Math.floor(Math.random() * gifSrc.length);
        let r2 = Math.floor(Math.random() * gifSrc.length);
        let r3 = Math.floor(Math.random() * gifSrc.length);
        let r4 = Math.floor(Math.random() * gifSrc.length);

        let gif1 = gifSrc[r1].embed_url;
        let gif2 = gifSrc[r2].embed_url;
        let gif3 = gifSrc[r3].embed_url;
        let gif4 = gifSrc[r4].embed_url;

        const playerObject = {
            round1: { gifUrl: gif1, input: "", score: 0 },
            round2: { gifUrl: gif2, input: "", score: 0 },
            round3: { gifUrl: gif3, input: "", score: 0 },
            round4: { gifUrl: gif4, input: "", score: 0 },
        };

        console.log("im here");
        await clientCache.pushGif(playerObject);
        console.log("upload complete");

    } catch (error) {
        // console.log(error);
    }
}

function updateRoundDisplay(currentRound) {
    const roundTitleElement = document.getElementById('roundTitle');
    roundTitleElement.textContent = `ROUND ${currentRound}`;
}

const displayCaptions = () => {  ///currently not called anywhere
    // this needs to be moved to a function to display on the voting page.
    let Log0 = infoArr[i].playerInput.caption1;
    console.log(playerID);
    if (playerID === 1) return
    const pTag0 = document.createElement('p');
    pTag0.textContent = Log0;
    displayResults.appendChild(pTag0);

    let Log1 = infoArr[i].playerInput.caption2;
    console.log(Log1);
    if (playerID === 2) return
    const pTag1 = document.createElement('p');
    pTag1.textContent = Log1;
    displayResults.appendChild(pTag1);

    let Log2 = infoArr[i].playerInput.caption3;
    //console.log(Log2);
    if (playerID === 3) return
    const pTag2 = document.createElement('p');
    pTag2.textContent = Log2;
    displayResults.appendChild(pTag2);

    let Log3 = infoArr[i].playerInput.caption4;
    //console.log(Log3); 
    if (playerID === 4) return
    const pTag3 = document.createElement('p');
    pTag3.textContent = Log3;
    displayResults.appendChild(pTag3);
}
document.querySelector('.formSubmission').addEventListener('submit', function (event) {
    event.preventDefault();
    const selectElement = document.getElementById('playerSelect');
    const selectedOption = selectElement.options[selectElement.selectedIndex].value;
    console.log(selectedOption);
    playerReady(selectedOption);
});
// Game Button Event Listener

document.getElementById('round1Form').addEventListener('submit', function (event) {
    event.preventDefault();
    if (captionSent) {
        alert("You can only submit one time!")
    }
    if (!gameActive || captionSent) return;
    const inputValue = document.querySelector('input[name="comment1"]').value;
    captionSent = true;
    console.log(inputValue);
    localPlayerObject.round1.input = inputValue;
    console.log("localPlayerOBJ", localPlayerObject);
    submitAPI();
    startCountdown(10);
    setTimeout(() => {
        requestAnswers();
        document.querySelector('input[name="comment1"]').value = "";
    }, 10000);
});

function startCountdown(duration) {
    let timer = duration, seconds;
    const countdownElement = document.getElementById('countdown');
    const interval = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        countdownElement.textContent = seconds;
        if (--timer < 0) {
            clearInterval(interval);
            countdownElement.textContent = 'Time to vote!';
        }
    }, 1000);
}


const buttonVotePlayer1 = document.getElementById('player1Vote');

buttonVotePlayer1.addEventListener('click', () => {
    if (!gameActive) return;
    if (voted) {
        alert("Only 1 vote per round!")
        return
    }
    console.log('Button1 pressed');
    let pressed1 = true;
    voteFav(pressed1);
    console.log(pressed1);
});

const buttonVotePlayer2 = document.getElementById('player2Vote');

buttonVotePlayer2.addEventListener('click', () => {
    if (!gameActive) return;
    if (voted) {
        alert("Only 1 vote per round!")
        return
    }
    console.log('Button2 pressed');
    let pressed2 = true;
    console.log(pressed2);
    voteFav(pressed2);
});

const buttonVotePlayer3 = document.getElementById('player3Vote');

buttonVotePlayer3.addEventListener('click', () => {
    if (!gameActive) return;
    if (voted) {
        alert("Only 1 vote per round!")
        return
    }
    console.log('Button3 pressed');
    let pressed3 = true;
    console.log(pressed3);
    voteFav(pressed3);
});

const buttonVotePlayer4 = document.getElementById('player3Vote');

buttonVotePlayer4.addEventListener('click', () => {
    if (!gameActive) return;
    if (voted) {
        alert("Only 1 vote per round!")
        return
    }
    console.log('Button4 pressed');
    let pressed4 = true;
    console.log(pressed4);
    voteFav(pressed4);
});



let votesInLocal = {
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0,
}
const voteFav = async (button) => {
    pressed1 = button
    pressed2 = button
    pressed3 = button
    pressed4 = button

    if (pressed1) {
        console.log("Vote B1");
        votesInLocal.player1++;
        pressed1 = false;
        voted = true;
    } else if (pressed2) {
        console.log("Vote B2");
        votesInLocal.player2++;
        pressed2 = false;
        voted = true;
    } else if (pressed3) {
        console.log("Vote B3");
        votesInLocal.player3++;
        pressed3 = false;
        voted = true;
    } else if (pressed4) {
        console.log("Vote B4");
        votesInLocal.player4++;
        pressed4 = false;
        voted = true;
    }
    setTimeout(() => {
        nextRound()
    }, 20000);
    alert("Votes Closing Soon, Do not go anywhere!")
    console.log("local scores", votesInLocal);
    if (currentRound === 4) {
        sendVoteApi()
    }
}

console.log("local scores data", votesInLocal);
const sendVoteApi = async () => {
    pID = playerID;
    let allVotes = votesInLocal;
    await scoresCache.editScores(pID, allVotes);
    scoresJustIn = await scoresCache.fetchScores();
    console.log("the final scores are in", scoresJustIn);
}

hostStartGameButton.addEventListener('click', (event) => {
    event.preventDefault()
    gifRefresh()
});

readyButton.addEventListener('click', () => {
    gameActive = true;
    console.log(gameActive);
    console.log("Local OBJ", localPlayerObject);
});