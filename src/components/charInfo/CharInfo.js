import { Component } from 'react';
import './charInfo.scss';

import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {

    state = {
        character: null,
        loading: true,
        error: false
    }

    onContentLoaded = () => {
        this.setState({
            loading: false
        })
    }

    onErrorOccurred = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    componentDidMount = () => {
        this.serviceInit();
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.charactId !== this.props.charactId) {
            this.getNewChar();
        }
    }

    serviceInit = async () => {
        try{
            this.marvelService = await MarvelService.init();
            this.getNewChar();
            this.onContentLoaded();
        }catch(err){
            this.onErrorOccurred();
            console.error("Error during Marvel Service initialistaion in ChartInfo component")
        }
    }

    getNewChar = () => {
        if(!this.props.charactId || !this.marvelService){
            return
        }
        const character = this.marvelService.getCharactById(this.props.charactId);
        this.setState({
            character
        })
    }

    render() {
        const { character } = this.state;
        const content = character ? <Content character={character}/> : null
        const loading = this.state.loading ? <Spinner/> : null 
        const error = this.state.error  ? <Error/> : null   
        return (
            <div className="char__info">
                {content}
                {loading}
                {error}
            </div>
        )
    }

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