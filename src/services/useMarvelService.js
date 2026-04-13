import useAPI from '../hooks/api.hook'
import { useRef } from 'react';

const _domain = 'https://marvel-server-zeta.vercel.app';
const _key = 'd4eecb0c66dedbfae4eab45d312fc1df';


let _APIData = null;
let _loadingPromise = null;

export default function useMarvelService() {

    const {process, setProcess, getDataFromAPI} = useAPI();

    const serviceRef = useRef(null)

    async function request() {
        
        if(!(_APIData || _loadingPromise)){
            _APIData = {};
            _loadingPromise = Promise.all([
                startPromise(`${_domain}/characters?apikey=${_key}`),
                startPromise(`${_domain}/comics?apikey=${_key}`),
            ]).then((resArr) => {
                _APIData.characters = resArr[0].data.results
                _APIData.comics = resArr[1].data.results
            }).catch(err => {
                throw new Error(err)
            })
        }
        await _loadingPromise;
        
        return {chooseRandCharact, getEntityById, findCharByName}

        function startPromise(url){
            return getDataFromAPI(url).then(res => res)
        }
    }

    async function serviceInit(successCallback, componentName) {
        try{
            setProcess('loading')
            serviceRef.current = await request();
            successCallback();
            setProcess('success')
        }catch(err){
            console.error(`Error during Marvel Service initialistaion in ${componentName} component, ${err}`);
            setProcess('error')
        }
    }

    function chooseRandCharact() {

        const APIRes = _APIData.characters;
        
        const findCharact = () => {
            const id = Math.floor(Math.random() * APIRes.length);
            if(!APIRes[id-1]){
                return findCharact();
            } else {
                return APIRes[id-1]
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

    function getEntityById(id, entity) {
        const APIRes = entity === 'comics' ? _APIData.comics : _APIData.characters;
        if(!APIRes){
            throw new Error(`Method getEntityById can't find ${entity === 'comics' ? 'comics' : 'character' }. It's must be empty or unreachable`)
        }
        if(!APIRes[id-1]){
            return null;
        }
        return APIRes[id-1];
    }

    function findCharByName(charName){
        if(_APIData){
            for(let value of _APIData.characters){
                if(charName.toLowerCase() === value.name.toLowerCase()){
                    return value
                }
                console.log('iteration')
            }
        }
    }

    return {serviceInit, serviceRef, process}
}