import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";
import ComicPage from "../pages/ComicPage";
import { Routes, Route } from "react-router";

function App(){

    const [charId, setCharId] = useState(1);
    const [comicObj, setComicObj] =  useState(null);

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <Routes>
                    <Route index element={<MainPage setCharId={setCharId} charId={charId}/>}/>
                    <Route path="comics" element={<ComicsPage setComicObj={setComicObj}/>}/>
                    <Route path="comic" element={<ComicPage comicObj={comicObj}/>}/>
                </Routes>
            </main>
        </div>
    )
    
}

export default App;