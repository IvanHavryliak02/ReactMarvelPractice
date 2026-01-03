import { useState, useEffect, useRef } from 'react';
import './charInfo.scss';

import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import MarvelService from '../../services/MarvelService';

function CharInfo({charId}) {

    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const serviceRef = useRef(null)

    function onContentLoaded() {
        setLoading(false)
    }

    function onErrorOccurred() {
        setLoading(false)
        setError(true)
    }

    useEffect(() => {
        serviceInit()
    }, [])

    useEffect(() => {
        getNewChar()
    }, [charId])

    async function serviceInit() {
        try{
            serviceRef.current = await MarvelService.init();
            getNewChar();
            onContentLoaded();
        }catch(err){
            onErrorOccurred();
            console.error("Error during Marvel Service initialistaion in ChartInfo component")
            console.error(err)
        }
    }

    function getNewChar() {
        if(!serviceRef.current) {return}
        const character = serviceRef.current.getCharactById(charId);
        setCharacter(character)
    }


    const content = character ? <Content character={character}/> : null
    const loadingComp = loading ? <Spinner/> : null 
    const errorComp = error  ? <Error/> : null   
    return (
        <div className="char__info">
            {content}
            {loadingComp}
            {errorComp}
        </div>
    )

}

const Content = ({character}) => {
    const {name, thumbnail, description, urls, comics: {items}} = character;
    const _imgURL = `${thumbnail.path}.${thumbnail.extension}`;
    const comicsItem = items.map((comics,i) => {
        return (
            <li className="char__comics-item" key={i}>
                    {comics}            
            </li>
        )
    }) 
    return (
        <>
            <div className="char__basics">
            <img src={_imgURL} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={urls[0].url} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={urls[1].url} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsItem}
            </ul>
        </>
    )

    
}

export default CharInfo;