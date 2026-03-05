import AppBanner from '../appBanner/AppBanner';
import SingleComic from '../singleComic/SingleComic';


export default function ComicPage({comicObj}) {
    return (
        <>
            <AppBanner/>
            <SingleComic comicObj={comicObj}/>
        </>
    )
}