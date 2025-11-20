import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png'
import MarvelService from '../../services/MarvelService';
import {Component} from 'react';

class RandomChar extends Component{

    constructor(props){
        super(props)
        this.onCharactChange();
    }

    state = {
        character: {},
        loading: true
    }

    onCharactChange = async () => {
        const marvelService = await MarvelService.init();
        const character = marvelService.chooseRandCharact()
        this.setState({character})
    }

    render () {
        const {name, descr, img} = this.state.character;
        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={img} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {descr}
                        </p>
                        <div className="randomchar__btns">
                            <a href="#" className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href="#" className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="decoration" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }

}

export default RandomChar;