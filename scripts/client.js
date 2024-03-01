
const clientCache = new cacheAPI();
const gifApi = new gifyAPI();

const form = document.querySelector('.formSubmission');
const sentenceInput = document.getElementById('fname');
const playerFormID = document.getElementById('playerFormID');

form.addEventListener('submit',  async (event) => {
    const dataHandler = new cacheAPI();
    console.log("IS THIS REFRESH");
    event.preventDefault();

    // const input1 = sentenceInput.value;
    // const input2 = sentenceInput.value;
    // const input3 = sentenceInput.value;
    // const input4 = sentenceInput.value;

    // const playerID = playerFormID.value;

    const cachedData = await dataHandler.fetchCache();

    //console.log(cachedData);

    let gifURL1 = cachedData[0].round1;

    console.log(gifURL1);

    // const playerObject = {
    //     round1:{gifUrl: gifURL1, input:input1, score:0},
    //     round2:{gifUrl: gif2, input:input2, score:0},
    //     round3:{gifUrl: gif3, input:input3, score:0},
    //     round4:{gifUrl: gif4, input:input4, score:0},
    //     playerScore:0
    // };

    // How do we access this data after the game starts??

    // player1.playerObject.caption1.score++   ???
    // player1.playerObject.caption1.score++   ???
    // player3.playerObject.playerScore++   ???

    // When Voting this should happen -> player1.playerObject.caption1.score++

    // console.log('caption1:', input1);
    // console.log('Player ID:', playerID);

    //clientCache.pushData(playerID, playerObject)

    form.reset();
    //updateResults(playerID);
    //clientCache.fetchCache();
});

const updateResults = async (id) => { //this updates the player input API on submit
    try {
        let infoArr = await clientCache.fetchCache();
        const displayResults = document.querySelector('.results-displayResults');
        displayResults.innerHTML = '';

        // pass in the player number -1 to get the index. 
        let i = id - 1;
        console.log(i);

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
        
        // needs its own function (generateGif())
            //const displayResults = document.querySelector('.results-displayResults');
            // const iFrame = document.createElement('iframe');
            // iFrame.src = gifSrc;
            // iFrame.className = 'iFrame';
            // displayResults.appendChild(iFrame);

        //console.log("Is this running?", gifSrc);
    } catch (error) {
        // console.log(error);
    }
}


// need to push to cache then re pull before rendering on client


const refreshButton = document.querySelector('.refreshPage');

refreshButton.addEventListener('click', () => {
    gifRefresh()

    // setTimeout(() => {
    //    clientCache.fetchCache();
    // }, 5000);
});

