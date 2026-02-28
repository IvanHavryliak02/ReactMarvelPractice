import { useState, useEffect } from 'react';
import './charInfo.scss';

import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import useMarvelService from '../../services/useMarvelService';

function CharInfo({charId}) {

    const [character, setCharacter] = useState(null)
    const {serviceInit, serviceRef, loading, error} = useMarvelService()

    useEffect(() => {
        serviceInit(getNewChar, 'CharInfo')
    }, [])

    useEffect(() => {
        if(serviceRef.current) {getNewChar()}
    }, [charId])

    function getNewChar() {
        const character = serviceRef.current.getEntityById(charId);
        setCharacter(character)
    }

    const content = (character && !(loading || error)) ? <Content character={character}/> : null
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