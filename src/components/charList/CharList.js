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
            const characters = [], marvelService = this.marvelService;
            for(let id = 1; id <= 9; id++){
                characters.push(marvelService.getCharactById(id)) 
            }
            this.setState({
                characters
            })
        }catch(err){
            this.onErrorOccured();
            console.error(err);
        }
    }

    createCards = () => {
        return this.state.characters.map((item) => {
            const imgSrc = `${item.thumbnail.path}.${item.thumbnail.extension}`
            return (
                <li className="char__item" key={item.id}>
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

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {content}
                    {error}
                    {loading}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}