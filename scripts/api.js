
class gifyAPI {
    
    constructor() {
        this.baseURL = `https://api.giphy.com/v1/gifs/trending?api_key=Yci8EviZ0OXi2u79t2iadTY4Ta1EiZax&limit=15&offset=0&rating=g&bundle=messaging_non_clips`;
    }

    async fetchGif() {
        const url = `https://api.giphy.com/v1/gifs/trending?api_key=Yci8EviZ0OXi2u79t2iadTY4Ta1EiZax&limit=4&offset=0&rating=g&bundle=messaging_non_clips`;
        const response = await axios.get(url);
        const gif = response.data.data;
        console.log(gif);
        return gif; 
    }
}


const gifAPI = new gifyAPI();
gifAPI.fetchGif();

class cacheAPI {

    constructor() {
        // this.baseURL = `https://retoolapi.dev/zXytKh/giphy=`;  test api
        this.baseURL = `https://api-generator.retool.com/O5rvPz/gifgame`;
    }

    async fetchCache() {
        const url = `https://api-generator.retool.com/O5rvPz/gifgame`;
        const response = await axios.get(url);
        const cache = response.data;
        console.log(cache);
        return cache; 
    }

    async pushData(inputID, playerInput) {
        const url = `https://api-generator.retool.com/O5rvPz/gifgame/${inputID}`;
        const response = await axios.put(url, playerInput );
        const cache = response.data;
        //console.log(cache);
        return cache; 
    }
    
    async pushGif(object) {
        console.log("im pushing to API");
        
        for (let inputID = 1; inputID <= 4; inputID++) {
            const url = `https://api-generator.retool.com/O5rvPz/gifgame/${inputID}`;
            const response = await axios.put(url, object);
            const appData = response.data;
            console.log(appData);
        }
        console.log("Cache at the end", cache);
        
        return appData;  
    }

}

const cache = new cacheAPI();
cache.fetchCache()
