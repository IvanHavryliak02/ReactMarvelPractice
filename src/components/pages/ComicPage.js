import AppBanner from '../appBanner/AppBanner';
import SingleItemDesc from '../singleItemDesc/SingleItemDesc';


export default function ComicPage({itemObj}) {
    return (
        <>
            <AppBanner/>
            <SingleItemDesc itemObj={itemObj}/>
        </>
    )
}