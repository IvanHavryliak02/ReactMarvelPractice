import ComicsList from '../comicsList/ComicsList'
import AppBanner from '../appBanner/AppBanner'

export default function ComicsPage({setComicObj}){
    return (
        <>
            <AppBanner/>
            <ComicsList setComicObj={setComicObj}/>
        </>
    )
}