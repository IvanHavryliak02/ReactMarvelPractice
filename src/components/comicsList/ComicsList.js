import './comicsList.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/useMarvelService'
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

const ComicsList = () => {

    const {loading, error, serviceRef, serviceInit} = useMarvelService();
    const [comicsList, setComicsList] = useState(null);
    const [lastId, setLastId] = useState(0)
    const [buttonHidden, setButtonHidden] = useState(false)
    

    useEffect(() => {
        serviceInit(() => {
            createComicsList()
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
            console.log(i)
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

    function createListItem(comics) {

        if(!comics) { return }

        const {title, prices, thumbnail, id} = comics

        const price = prices[0].price.toFixed(2)
        
        return (
            <li className="comics__item" key = {id}>
                <a href="#">
                    <img src={`${thumbnail.path}.${thumbnail.extension}`} alt="comics" className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{`${price} $`}</div>
                </a>
            </li>
        )
    }
    
    const contentProps = {
        comicsList,
        createListItem,
        setLastId,
        buttonHidden
    }

    const content = (comicsList && !(loading || error)) ? <Content {...contentProps} /> : null
    const loadingComp = loading ? <Spinner/> : null 
    const errorComp = error  ? <Error/> : null 

    return (
        <div className="comics__list">
            {content}
            {loadingComp}
            {errorComp}
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