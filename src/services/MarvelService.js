

export default class MarvelService {

    _domain = 'https://marvel-server-zeta.vercel.app';
    _key = 'd4eecb0c66dedbfae4eab45d312fc1df';

    static _APIData = null;
    static _loadingPromise = null;

    static init = async () => {
        const instance = new MarvelService();
        if(!(this._APIData || this._loadingPromise )){
            this._loadingPromise = instance.getDataFromAPI(`${instance._domain}/characters?apikey=${instance._key}`)
            .then((res) => {
                this._APIData = res;
            })
        }
        await this._loadingPromise;          
        return instance;
    }

    getDataFromAPI = async (url) => {
        const response = await fetch(url)

        if(!response.ok){
            throw new Error(`Error during request sending to API: ${response.status}`);
        }

        return await response.json();
    }

    chooseRandCharact = () => {
        
        const findCharact = () => {
            const id = Math.floor(Math.random() * MarvelService._APIData.data.results.length);
            if(!MarvelService._APIData.data.results[id-1]){
                return findCharact();
            } else {
                return MarvelService._APIData.data.results[id-1]
            }
        }

        const character = findCharact();

        return {
            name: character.name || 'noname',
            descr: character.description || 'no description',
            img: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage: character.urls[0],
            wiki: character.urls[1]
        }
    }

    getCharactById = (id) => {
        if(!MarvelService._APIData){
            throw new Error(`Method getCharactById can't find API data`)
        }
        if(!MarvelService._APIData.data.results[id-1]){
            throw new Error(`Method getCharactById can't find character with id: ${id}`)
        }
        return MarvelService._APIData.data.results[id-1];
    }
}