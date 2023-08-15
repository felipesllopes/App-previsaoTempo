import styled from 'styled-components/native';

export default function Loading() {
    return (
        <Container>
            <Logo source={require('../../img/logo.png')} />
        </Container>
    )
}

const Container = styled.SafeAreaView`
flex: 1;
align-items: center;
justify-content: center;
`;

const Logo = styled.Image`
height: 350px;
width: 350px;
`;
