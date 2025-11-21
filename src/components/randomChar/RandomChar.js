import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png'
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'
import Error from '../error/Error';
import {Component} from 'react';

class RandomChar extends Component{

    componentDidMount(){
        this.charactInit();
    }

    state = {
        character: {},
        loading: true,
        error: false
    }

    charactInit = async () => {
        try{
            this.marvelService = await MarvelService.init();
            const character = this.marvelService.chooseRandCharact()
            this.setState({
                character,
                loading: false
            })
        }catch(err){
            this.setState({
                loading: false,
                error: true
            });
            console.error(err)
        }
    }

    onCharactChange = () => {
        const character = this.marvelService.chooseRandCharact()
        this.setState({character})
    }

    render () {
        const {loading, error, character} = this.state;
        
        const content = !(loading || error) ? <View character={character}/> : null;
        const loadingContent = loading ? <Spinner/> : null;
        const errorContent = error ? <Error/> : null;
        return (
            <div className="randomchar">
                {content}
                {loadingContent}
                {errorContent}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.onCharactChange} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="decoration" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }

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