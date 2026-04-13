import './comicsList.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/useMarvelService'
import setContent from './../../utils/setContent'
import { NavLink } from 'react-router';

const ComicsList = ({setComicObj}) => {

    const {process, serviceRef, serviceInit} = useMarvelService();
    const [comicsList, setComicsList] = useState(null);
    const [lastId, setLastId] = useState(0)
    const [buttonHidden, setButtonHidden] = useState(false)
    

    useEffect(() => {
        serviceInit(() => {
            setLastId(8)
        }, 'ComicsList')
    }, [])

    useEffect(() => {
        createComicsList()
    }, [lastId])

    function createComicsList() {

        const res = []
        let emptyCounter = 0;
        const firstId = lastId > 8 ? lastId - 7 : 1

        for(let i = firstId; i <= lastId; i++){
            const comic = serviceRef.current.getEntityById(i, 'comics')
            if (comic === null) {
                emptyCounter++
            } else {
                res.push(comic)
                emptyCounter = 0
            }

            if(emptyCounter > 3){
                setButtonHidden(true)
                break
            }
        }
        setComicsList(prevRes => [...(prevRes || []), ...res])
    }

    function createListItem(comic) {

        if(!comic) { return }

        const {title, prices, thumbnail, id} = comic

        const price = prices[0].price.toFixed(2)
        
        return (
            <li 
                className="comics__item" 
                key = {id} 
                onClick={
                    () => {
                        setComicObj(comic)
                    }
                }
            >
                <NavLink to='/comic'>
                    <img src={`${thumbnail.path}.${thumbnail.extension}`} alt="comic" className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{`${price} $`}</div>
                </NavLink>
            </li>
        )
    }
    
    const contentProps = {
        comicsList,
        createListItem,
        setLastId,
        buttonHidden
    }


    return (
        <div className="comics__list">
            {setContent(process, Content, contentProps)}
        </div>
    )
}

function Content({comicsList, createListItem, setLastId, buttonHidden}) {

    return (
        <>
            <ul className="comics__grid">
                {comicsList.map(item => createListItem(item))}
            </ul>
            {!buttonHidden && (
                <button 
                className="button button__main button__long"
                onClick={() => {setLastId(prev => prev + 8);}}
                >
                    <div className="inner">load more</div>
                </button>
            )}
        </>
    )
}

export default ComicsList;