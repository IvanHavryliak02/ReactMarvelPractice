import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component{

    state = {
        choosedCharactId: 1
    }

    onChoosedCharact = (id) => {
        this.setState({
            choosedCharactId: id
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    
                    <div className="char__content">
                        <CharList onChoosedCharact={this.onChoosedCharact}/>
                        <CharInfo charactId={this.state.choosedCharactId}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
    
}

export default App;