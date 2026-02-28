import './singleComic.scss';

const SingleComic = ({setChoosedPage, comicObj}) => {
    console.log(comicObj)
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
            <a href="#" className="single-comic__back" onClick={() => {setChoosedPage('Comics')}}>Back to all</a>
        </div>
    )
}

export default SingleComic;