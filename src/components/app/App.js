import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

import decoration from '../../resources/img/vision.png';

function App(){

    const [charId, setCharId] = useState(1);
    const [choosedPage, setChoosedPage] = useState('Character');

    return (
        <div className="app">
            <AppHeader choosedPage={choosedPage} setChoosedPage={setChoosedPage}/>
            <main>
                {choosedPage === 'Character' ? characterMain({setCharId, charId}) : null}
                {choosedPage === 'Comics' ? comicsMain() : null}
            </main>
        </div>
    )
    
}

function comicsMain() {
    return (
        <>
            <AppBanner/>
            <ComicsList/>
        </>
        
    )
}

function characterMain(props) {
    const {setCharId, charId} = props
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

export default App;