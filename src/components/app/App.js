import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import ComicPage from "../pages/ComicPage";
import Page404 from "../pages/page404";
import { Routes, Route } from "react-router";

function App(){

    const [charId, setCharId] = useState(1);
    const [comicObj, setComicObj] =  useState(null);
    const [findedCharObj, setFindedCharObj] = useState(null);

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <Routes>
                    <Route index element={<MainPage setCharId={setCharId} charId={charId} setFindedCharObj={setFindedCharObj}/>}/>
                    <Route path="comics" element={<ComicsPage setComicObj={setComicObj}/>}/>
                    <Route path="comic" element={<ComicPage itemObj={comicObj}/>}/>
                    <Route path="character" element={<ComicPage itemObj={findedCharObj}/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </main>
        </div>
    )
    
}

export default App;