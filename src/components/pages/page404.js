import Error from "../error/Error"
import styled from "styled-components"

const TextMessage = styled.span`
    font-size: 24px;
    font-weight: 700;
    margin-top: 25px;
`

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center
`

export default function Page404() {
    return (
        <Wrap>
            <Error/>
            <TextMessage>This page doesn't exist</TextMessage>
        </Wrap>
    )
}