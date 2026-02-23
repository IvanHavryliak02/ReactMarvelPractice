import './appHeader.scss';
import React from 'react';

const AppHeader = ({choosedPage, setChoosedPage}) => {

    const pageNames = ['Character', 'Comics']

    const createLI = (name) => {
        const selector = choosedPage.toLowerCase() === name.toLowerCase() ? 'choosed' : ''
        return <li className={selector} onClick={() => setChoosedPage(name)}>
                    <a href="#">{name}</a>
                </li>
    }

    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    {pageNames.map((item, i) => 
                        <React.Fragment key={item}>
                            {createLI(item)}
                            {i < pageNames.length - 1 ? '/' : null}
                        </React.Fragment>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;