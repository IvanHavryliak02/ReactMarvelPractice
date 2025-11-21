import styled from 'styled-components'
import spinner from './loading.svg'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const SpinnerEl = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function Spinner(){
    return (
        <Container>
            <SpinnerEl>
                <img alt="spinner" src={spinner}/>
            </SpinnerEl>
        </Container>
        
    )
}

export {Container};