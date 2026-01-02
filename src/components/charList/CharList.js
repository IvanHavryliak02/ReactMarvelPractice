import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'

export default function CharList(props) {

    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [firstCharacterId, setFirstCharacterId] = useState(1)
    const [lastCharacterId, setLastCharacterId] = useState(9)
    const [buttonHidden, setButtonHidden] = useState(false)

    const serviceRef = useRef(null)

    useEffect(() => {
        serviceInit();
    }, [])

    function onErrorOccured() {
        setLoading(false);
        setError(true)
    }

    async function serviceInit() {
        try{
            serviceRef.current = await MarvelService.init();
            createCardsArr();
            setLoading(false);
        }catch(err){
            onErrorOccured();
            console.error(`Error during Marvel Service initialistaion in ChartList component`);
            console.error(err)
        }
    }

    function createCardsArr() {
        try {
            const newCharacters = [];
            for(let id = firstCharacterId; id <= lastCharacterId; id++){
                const character = serviceRef.current.getCharactById(id)
                if(!character) {
                    continue;
                }
                newCharacters.push(character) 
            }
            if(newCharacters.length > 0) {
                let hideButton = false;
                if(newCharacters.length < 7) {
                    hideButton = true;
                }
                setCharacters(() => [...characters, ...newCharacters])
                setFirstCharacterId(lastCharacterId + 1)
                setLastCharacterId(lastCharacterId + 9)
                setButtonHidden(hideButton)
            }
        }catch(err){
            onErrorOccured();
            console.error(err);
        }
    }

    function createCards () {
        const {onChoosedCharact} = props
        return characters.map((item) => {
            const imgSrc = `${item.thumbnail.path}.${item.thumbnail.extension}`
            let selector = 'char__item '
            selector += item.id === props.choosedCharactId ? "char__item_selected" : ''
            return (
                <li className={selector} 
                    key={item.id}
                    onClick={ () => {
                        onChoosedCharact(item.id)
                    }}
                    tabIndex={item.id}
                >
                    <img src={imgSrc} alt="character"/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
    }

    
    const charactersCards = createCards();
    const content = charactersCards.length ? charactersCards : null;
    const errorComp = error ? <Error/> : null;
    const loadingComp = loading ? <Spinner/> : null;
    const button = buttonHidden ? null : <Button onClickCallback={createCardsArr}/>

    return (
        <div className="char__list">
            {errorComp}
            {loadingComp}
            <ul className="char__grid">
                {content}    
            </ul>
            {button}
        </div>
    )
    
}

const Button = ({onClickCallback}) => {
    return (
        <button onClick={onClickCallback} className="button button__main button__long">
            <div className="inner">load more</div>
        </button>
    )
}