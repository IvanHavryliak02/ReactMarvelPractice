import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png'


function MainPage({setCharId, charId}) {
    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            
            <div className="char__content">
                <CharList onChoosedCharact={setCharId} charId={charId}/>
                <CharInfo charId={charId}/>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage