import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'

export default class CharList extends Component {

    state = {
        characters: [],
        loading: true,
        error: false,
        firstCharacterId: 1,
        lastCharacterId: 9,
        buttonHidden: false,
    }

    componentDidMount = () => {
        this.serviceInit();
    }

    onLoadingFinished = () => {
        this.setState({
            loading: false,
        })
    }

    onErrorOccured = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    serviceInit = async () => {
        try{
            this.marvelService = await MarvelService.init();
            this.createCardsArr();
            this.onLoadingFinished();
        }catch(err){
            this.onErrorOccured();
            console.error(`Error during Marvel Service initialistaion in ChartList component`);
        }
    }

    createCardsArr = () => {
        try {
            const newCharacters = [], marvelService = this.marvelService;
            for(let id = this.state.firstCharacterId; id <= this.state.lastCharacterId; id++){
                const character = marvelService.getCharactById(id)
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
                this.setState(() => ({
                    characters: [...this.state.characters, ...newCharacters],
                    firstCharacterId: this.state.lastCharacterId + 1,
                    lastCharacterId: this.state.lastCharacterId + 9,
                    buttonHidden: hideButton
                }))
            }
        }catch(err){
            this.onErrorOccured();
            console.error(err);
        }
    }

    createCards = () => {
        const {onChoosedCharact} = this.props
        return this.state.characters.map((item) => {
            const imgSrc = `${item.thumbnail.path}.${item.thumbnail.extension}`
            return (
                <li className="char__item" 
                    key={item.id}
                    onClick={() => {onChoosedCharact(item.id)}}
                >
                    <img src={imgSrc} alt="character"/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
    }

    render(){

        const charactersCards = this.createCards();
        const content = charactersCards.length ? charactersCards : null;
        const error = this.state.error ? <Error/> : null;
        const loading = this.state.loading ? <Spinner/> : null;
        const button = this.state.buttonHidden ? null : <Button onClickCallback={this.createCardsArr}/>
        return (
            <div className="char__list">
                {error}
                {loading}
                <ul className="char__grid">
                    {content}    
                </ul>
                {button}
            </div>
        )
    }

    
    
}

const Button = ({onClickCallback}) => {
    return (
        <button onClick={onClickCallback} className="button button__main button__long">
            <div className="inner">load more</div>
        </button>
    )
}