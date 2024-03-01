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
        this.proxyURL = `https://cors-anywhere.herokuapp.com/`;
    }

    async fetchCache() {
        const url = `${this.proxyURL}https://retoolapi.dev/YbJflP/giphy=`;
        const response = await axios.get(url, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        const cache = response.data;
        //console.log(cache);
        return cache; 
    }

    async pushData(inputID, inputSentence) {
        const url = `${this.proxyURL}https://retoolapi.dev/YbJflP/giphy=/${inputID}`;
        const response = await axios.put(url, { id: inputID, sentence: inputSentence }, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        const cache = response.data;
        //console.log(cache);
        return cache; 
    } 

}

const cache = new cacheAPI();
cache.fetchCache()
