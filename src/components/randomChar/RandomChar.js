import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png'
import useMarvelService from '../../services/useMarvelService';
import setContent from './../../utils/setContent'
import {useState, useEffect} from 'react';

function RandomChar(){

    const [character, setCharacter] = useState(null)
    const {serviceInit, serviceRef, process} = useMarvelService()

    useEffect(() => {
        serviceInit(onCharactChange, 'RandomChar');
    }, [])

    function onCharactChange() {
        const character = serviceRef.current.chooseRandCharact()
        setCharacter(character)
    }
    
    return (
        <div className="randomchar">
            {setContent(process, Content, {character})}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={onCharactChange} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="decoration" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const Content = ({character}) => {
    const {name, descr, img, homepage, wiki} = character;
    return (
        <div className="randomchar__block">
            <img src={img} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {descr}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage.url} target='_blank' className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki.url} target='_blank' className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;