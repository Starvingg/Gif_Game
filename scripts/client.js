const clientCache = new cacheAPI();
const gifApi = new gifyAPI();
let localPlayerObject = {};
let currentRound = 0;

const form = document.querySelector('.caption__submit');
const captionInput = document.getElementById('fname');
const playerFormID = document.getElementById('playerFormID');
const hostStartGameButton = document.querySelector('#startGameButton');

const readyButton = document.querySelector('#readyButton'); 



document.querySelector('.formSubmission').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectElement = document.getElementById('playerSelect');
    const selectedOption = selectElement.options[selectElement.selectedIndex].value;
     console.log(selectedOption);
    playerReady(selectedOption);
});

document.getElementById('round1Form').addEventListener('submit', function(event) {
    event.preventDefault();
    const inputValue = document.querySelector('input[name="comment1"]').value;
    
    console.log(inputValue);
    localPlayerObject.round1.input = inputValue;
    console.log("localPlayerOBJ",localPlayerObject); 
    
    submitAPI();
    setTimeout(() => {
        requestAnswers();
    }, 20000);
});

const submitAPI = async () => {
    let playerID = localPlayerObject.id;
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
    document.getElementById('player1Caption').innerHTML = text;
}

function updatePlayer2Button(text) {
    document.getElementById('player2Caption').innerHTML = text;
}

function updatePlayer3Button(text) {
    document.getElementById('player3Caption').innerHTML = text;
}







const playerReady = async (player) => {
    try {
        currentRound = 1;
        let pID = player - 1;
        const getObject = await clientCache.fetchCache();
        let playerProfile = getObject[pID]
        localPlayerObject = playerProfile;
        //console.log(localPlayerObject);
        setTimeout(() => {         
            displayGifRound1(localPlayerObject)
        }, 5000);

    } catch (error) {
        console.error(error); 
    }
}

function displayGifRound1(localPlayerObject) {
    let gif1URL = localPlayerObject.round1.gifUrl;
    console.log(gif1URL);
    const iframeRound1 = document.getElementById('round1Gif');
    iframeRound1.src = gif1URL;
}


const updateResults = async (id) => { //this updates the player input API on submit
    try {
        let infoArr = await clientCache.fetchCache();
        const displayResults = document.querySelector('.results-displayResults');
        displayResults.innerHTML = '';

        // pass in the player number -1 to get the index. 
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

        let gif1 = gifSrc[0].embed_url;
        let gif2 = gifSrc[1].embed_url;
        let gif3 = gifSrc[2].embed_url;
        let gif4 = gifSrc[3].embed_url;


        const playerObject = {
            round1:{gifUrl: gif1, input:"", score:0},
            round2:{gifUrl: gif2, input:"", score:0},
            round3:{gifUrl: gif3, input:"", score:0},
            round4:{gifUrl: gif4, input:"", score:0},
        };

        console.log("im here");
        await clientCache.pushGif(playerObject);
        console.log("upload complete");

    } catch (error) {
        // console.log(error);
    }
}

const displayCaptions = () => {  ///currently not called anywhere
    // this needs to be moved to a function to display on the voting page.
    let Log0 = infoArr[i].playerInput.caption1;
    console.log(Log0);
    const pTag0 = document.createElement('p');
    pTag0.textContent = Log0;
    displayResults.appendChild(pTag0);

    let Log1 = infoArr[i].playerInput.caption2;
    console.log(Log1);
    const pTag1 = document.createElement('p');
    pTag1.textContent = Log1;
    displayResults.appendChild(pTag1);
    
    let Log2 = infoArr[i].playerInput.caption3;
    //console.log(Log2); 
    const pTag2 = document.createElement('p');
    pTag2.textContent = Log2; 
    displayResults.appendChild(pTag2);

    let Log3 = infoArr[i].playerInput.caption4;
    //console.log(Log3); 
    const pTag3 = document.createElement('p');
    pTag3.textContent = Log3; 
    displayResults.appendChild(pTag3);
}




hostStartGameButton.addEventListener('click', () => {
    gifRefresh()
    // Needs to write to API
});

readyButton.addEventListener('click', () => {
    playerReady()
    // Needs to read
});



























/* 
/// - Things to reset at end of game
/// - Round counter
/// - Player Data Object
/// -
////////// */

// GAME FLOW //

// Player 1 
    // Start Game
        // gifRefresh

// Player 2
    // Ready - // PlayerObject will be saved locally
    // Click "NEXT" Button


// Player 3
    // Ready - // PlayerObject will be saved locally
    // Click "NEXT" Button


// Player 1 
    // Ready - // PlayerObject will be saved locally
    // Click "NEXT" Button

    
// --- Game Has Started ---


// -- Gif Display Rounds start --

// - Round 1
// Local Logic to ShowGif
// Local logic to send userCommentInput

// - Round 2
// Local Logic to ShowGif
// Local logic to send userCommentInput

// - Round 3
// Local Logic to ShowGif
// Local logic to send userCommentInput

// -- Voting Rounds start --

// -- Gif 1 Voting
    // Pull all userInputs
    // Send vote

// -- Gif 2 Voting
    // Pull all userInputs
    // Send vote

// -- Gif 3 Voting
    // Pull all userInputs
    // Send vote

// -- Gif 4 Voting
    // Pull all userInputs
    // Send vote









    // form.addEventListener('submit',  async (event) => {
//     const dataHandler = new cacheAPI();
//     event.preventDefault();
    
//     //let input1 = captionInput.value;  
//    // const playerID = playerFormID.value; // When you submit this will be updated locally

//     const cachedData = await dataHandler.fetchCache();

//     let gifURL1 = cachedData[0].round1.gifUrl;
//     let gifURL2 = cachedData[0].round1.gifUrl;
//     let gifURL3 = cachedData[0].round1.gifUrl;
//     let gifURL4 = cachedData[0].round1.gifUrl;
    
//     const playerObject = {
//         round1:{gifUrl: gifURL1, input: input1, score:0},
//         round2:{gifUrl: gifURL2, input: input2, score:0},
//         round3:{gifUrl: gifURL3, input: input3, score:0},
//         round4:{gifUrl: gifURL4, input: input4, score:0},
//         playerScore:0
//     };
    
//     console.log(playerObject);

//     await clientCache.pushData(playerID, playerObject);

//     console.log('caption1:', input1);
//     console.log('Player ID:', playerID);

//     clientCache.pushData(playerID, playerObject)

//     form.reset();
//     updateResults(playerID);
//     clientCache.fetchCache();
// });