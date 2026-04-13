import Spinner from './../components/spinner/Spinner'
import Error from './../components/error/Error'

const setContent = (process, Component, props) => {
    switch(process){
        case 'idle': 
            return null
        case 'loading':
            return <Spinner/>
        case 'success':
            return <Component {...props} />
        case 'error': 
            return Error
        default:
            throw new Error('Unexpected process state')
    }
}

export default setContent