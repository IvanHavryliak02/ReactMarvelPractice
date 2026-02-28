import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import SingleComic from '../singleComic/SingleComic'

import decoration from '../../resources/img/vision.png';

function App(){

    const [charId, setCharId] = useState(1);
    const [choosedPage, setChoosedPage] = useState('Character');
    const [comicObj, setComicObj] =  useState({});

    return (
        <div className="app">
            <AppHeader choosedPage={choosedPage} setChoosedPage={setChoosedPage}/>
            <main>
                {choosedPage === 'Comics' || choosedPage === 'SingleComic' ? <AppBanner/> : null}
                {choosedPage === 'Character' ? <CharacterMain setCharId={setCharId} charId={charId}/> : null}
                {choosedPage === 'Comics' ? <ComicsList setChoosedPage={setChoosedPage} setComicObj={setComicObj}/> : null}
                {choosedPage === 'SingleComic' ? <SingleComic setChoosedPage={setChoosedPage} comicObj={comicObj}/> : null}
            </main>
        </div>
    )
    
}

function CharacterMain({setCharId, charId}) {
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