import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png'
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'
import Error from '../error/Error';
import {useState, useEffect, useRef} from 'react';

function RandomChar(){

    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const serviceRef = useRef(null)

    useEffect(() => {
        charactInit();
    }, [])

    async function charactInit() {
        try{
            serviceRef.current = await MarvelService.init();
            const character = serviceRef.current.chooseRandCharact()
            setCharacter(character)
            setLoading(false)
        }catch(err){
            setLoading(false)
            setError(true)
            console.error('Error during Marvel Service initialistion in RandomChar component')
            console.error(err)
        }
    }

    function onCharactChange() {
        const character = serviceRef.current.chooseRandCharact()
        setCharacter(character)
    }
    
    const content = !(loading || error) ? <View character={character}/> : null;
    const loadingComp = loading ? <Spinner/> : null;
    const errorComp = error ? <Error/> : null;
    return (
        <div className="randomchar">
            {content}
            {loadingComp}
            {errorComp}
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

const View = ({character}) => {
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