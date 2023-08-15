import { useEffect } from "react";
import { styled } from "styled-components/native";
import ListCards from "./listCard";

export default function Cards({ forecast, reload }) {

    useEffect(() => {
    }, [reload])

    function renderItem({ item }) {
        return (<ListCards data={item} reload={reload} />)
    }

    return (
        <Container>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={forecast.list}
                keyExtractor={item => String(item.dt)}
                renderItem={renderItem}
            />
        </Container>
    )
}

const Container = styled.View``;

const FlatList = styled.FlatList`
margin: 0 20px 20px 20px;
`;
