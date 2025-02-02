import { ItemCard } from "../ItemCard"
import PropTypes from "prop-types"
import { Container } from "@mantine/core"
import { useCardList } from "../contexts/CardListContext"

CardList.propTypes = {
    index: PropTypes.string,
}

export default function CardList(props) {
    const { index } = props

    const { list } = useCardList(index)

    return <>
        <Container className="card-list">
            {list.map((item, i) => (
                <ItemCard key={`${index}-${i}`} location={index} order={i} description={item.description} edit={item.edit} />
            ))}
        </Container>
    </>
}