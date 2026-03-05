import './singleComic.scss';
import { NavLink } from 'react-router';

const SingleComic = ({comicObj}) => {
    
    if(!comicObj){return null}

    const {title, description, pageCount, textObjects, prices, thumbnail} = comicObj
    const price = prices[0].price.toFixed(2)

    return (
        <div className="single-comic">
            <img src={`${thumbnail.path}.${thumbnail.extension}`} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {textObjects.languages}</p>
                <div className="single-comic__price">{price} $</div>
            </div>
            <NavLink to="/comics" className="single-comic__back">
                Back to all
            </NavLink>
        </div>
    )
}

export default SingleComic;