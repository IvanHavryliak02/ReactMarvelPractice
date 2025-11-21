import styled from "styled-components";
import errorImg from './error.svg';
import { Container } from '../spinner/Spinner';

const ErrorEl = styled.div`
    width: 100px;
    height: 100px;
`

export default function Error() {
    return (
        <Container>
            <ErrorEl>
                <img src={errorImg} alt="error" />
            </ErrorEl>
        </Container>
    )
}