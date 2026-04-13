import { useState, useEffect } from 'react';
import './charInfo.scss';
import setContent from './../../utils/setContent'

import useMarvelService from '../../services/useMarvelService';
import FindCharacter from '../findCharacter/FindCharacter';

function CharInfo({charId, setFindedCharObj}) {

    const [character, setCharacter] = useState(null)
    const {serviceInit, serviceRef, process} = useMarvelService()

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

    return (
        
        <div className="char__container">
            <div className="char__info">
                {setContent(process, Content, {character})}
            </div>
            <FindCharacter setFindedCharObj={setFindedCharObj}/>
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