// let country = 'UK';
// let year = '2024';
// let type = '';


class gifyAPI {
    
    constructor() {
        this.baseURL = `https://api.giphy.com/v1/gifs/trending?api_key=Yci8EviZ0OXi2u79t2iadTY4Ta1EiZax&limit=15&offset=0&rating=g&bundle=messaging_non_clips`;
    }

    async fetchGif() {
        const url = `https://api.giphy.com/v1/gifs/trending?api_key=Yci8EviZ0OXi2u79t2iadTY4Ta1EiZax&limit=15&offset=0&rating=g&bundle=messaging_non_clips`;
        const response = await axios.get(url);
        const gif = response.data;
        console.log(gif);
        return gif; 
    }
}


const gifAPI = new gifyAPI();
gifAPI.fetchGif();


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
