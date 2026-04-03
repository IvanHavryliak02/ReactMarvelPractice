import './singleItemDesc.scss';
import { NavLink } from 'react-router';

const SingleItemDesc = ({itemObj}) => {
    
    if(!itemObj){return null}

    const {title, name, description, pageCount, textObjects, prices, thumbnail} = itemObj
    const price = prices ? prices[0].price.toFixed(2) : null

    const heading = title ? title : name;
    

    return (
        <div className="single-comic">
            <img src={`${thumbnail?.path}.${thumbnail?.extension}`} alt="item" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{heading}</h2>
                <p className="single-comic__descr">{description}</p>
                {pageCount ? <p className="single-comic__descr">{pageCount} pages</p> : null}
                {textObjects?.languages ? <p className="single-comic__descr">Language: {textObjects.languages}</p> : null}
                {price ? <div className="single-comic__price">{price} $</div> : null}
            </div>
            <NavLink to="/comics" className="single-comic__back">
                Back to all
            </NavLink>
        </div>
    )
}

export default SingleItemDesc