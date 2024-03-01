// let country = 'UK';
// let year = '2024';
// let type = '';


// class gifyAPI {
    
//     constructor() {
//         this.baseURL = `https://retoolapi.dev/zXytKh/giphy=`;
//     }

//     async fetchGif() {
//         const url = `https://retoolapi.dev/zXytKh/giphy=`;
//         const response = await axios.get(url);
//         const holidays = response.data;
//         console.log(holidays);
//         return holidays; 
//     }


// }

// const gifAPI = new gifyAPI();


class cacheAPI {

    constructor() {
        this.baseURL = `https://retoolapi.dev/zXytKh/giphy=`;
    }

    async fetchCache() {
        const url = `https://retoolapi.dev/YbJflP/giphy=`;
        const response = await axios.get(url);
        const cache = response.data;
        //console.log(cache);
        return cache; 
    }

    async pushData(inputID, inputSentence) {
        const url = `https://retoolapi.dev/YbJflP/giphy=/${inputID}`;
        const response = await axios.put(url, { id: inputID, sentence: inputSentence });
        const cache = response.data;
        //console.log(cache);
        return cache; 
    } 

}

const cache = new cacheAPI();
cache.fetchCache()
