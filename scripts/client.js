
const clientCache = new cacheAPI();
const gifApi = new gifyAPI();

const form = document.querySelector('.formSubmission');
const sentenceInput = document.getElementById('fname');
const playerFormID = document.getElementById('playerFormID');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const sentence = sentenceInput.value;
    const playerID = playerFormID.value;

    console.log('Sentence:', sentence);
    console.log('Player ID:', playerID);

    clientCache.pushData(playerID, sentence)

    form.reset();
    clientCache.fetchCache()
});

const updateResults = async () => {
    try {
        let infoArr = await clientCache.fetchCache();
        const displayResults = document.querySelector('.results-displayResults');
        displayResults.innerHTML = '';

        let Log0 = infoArr[0].sentence;
        let Log1 = infoArr[1].sentence;
        let Log2 = infoArr[2].sentence;
        let Log3 = infoArr[3].sentence;

        const pTag0 = document.createElement('p');
        pTag0.textContent = Log0;
        displayResults.appendChild(pTag0);

        const pTag1 = document.createElement('p');
        pTag1.textContent = Log1;
        displayResults.appendChild(pTag1);

        const pTag2 = document.createElement('p');
        pTag2.textContent = Log2;
        displayResults.appendChild(pTag2);

        const pTag3 = document.createElement('p');
        pTag3.textContent = Log3;
        displayResults.appendChild(pTag3);


                // console.log("Test:, ", clientCache.fetchCache());
    } catch (error) {
        // console.log(error);
    }
}


const gifRefresh = async () => {

    
    try {
        let gifSrc = await gifApi.fetchGif();
        
        const displayResults = document.querySelector('.results-displayResults');
        
        const iFrame = document.createElement('iframe');
        iFrame.src = gifSrc;
        iFrame.className = 'iFrame';
        displayResults.appendChild(iFrame);
        
        console.log("Is this running?", gifSrc);
    } catch (error) {
        // console.log(error);
    }
}


// need to push to cache then re pull before rendering on client


const refreshButton = document.querySelector('.refreshPage');

refreshButton.addEventListener('click', () => {
    updateResults();
    gifRefresh();

});

