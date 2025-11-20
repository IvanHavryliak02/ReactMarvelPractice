

export default class MarvelService {

    _domain = 'https://marvel-server-zeta.vercel.app';
    _key = 'd4eecb0c66dedbfae4eab45d312fc1df';

    static _APIData = null;
    static _loadingPromise = null;

    static init = async () => {
        const instance = new MarvelService();
        if(!this.APIData && !this._loadingPromise){
            this._loadingPromise = instance.getDataFromAPI(`${instance._domain}/characters?apikey=${instance._key}`)
            .then((res) => {
                this.APIData = res;
            })
            .finally(() => {
                this._loadingPromise = null; 
            })
        }
        await this._loadingPromise;          
        return instance;
    }

    getDataFromAPI = async (url) => {
        const response = await fetch(url)

        if(!response.ok){
            throw new Error(`Error during request sending to API`);
        }

        return await response.json();
    }

    chooseRandCharact = () => {
        
        const findCharact = () => {
            const id = Math.floor(Math.random() * MarvelService.APIData.data.results.length);
            if(!MarvelService.APIData.data.results[id-1]){
                return findCharact();
            } else {
                return MarvelService.APIData.data.results[id-1]
            }
        }

        const character = findCharact();

        return {
            name: character.name,
            descr: character.description || 'no description',
            img: `${character.thumbnail.path}.${character.thumbnail.extension}`
        }
    }
}