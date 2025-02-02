import { Container, Text, Title } from "@mantine/core"
import CardList from "./CardList"
import { useDrop } from "react-dnd"
import PropTypes from "prop-types"
import { useCardList } from "../contexts/CardListContext"
import { useCallback } from "react"

Column.propTypes = {
    index: PropTypes.string,
    title: PropTypes.string,
}

export default function Column(props) {
    const { index, title } = props

    // const { open } = useDetails()
    // const [itemList, setItemList] = useState([])
    const { dispatch } = useCardList(index)

    const handleDropItem = useCallback((item) => {
        dispatch('move', item.location, index, item.order)
    }, [dispatch, index])

    const [collectedProps, drop] = useDrop(() => ({
        accept: 'CARD',
        collect: (monitor) => monitor,
        drop: handleDropItem,
    }), [handleDropItem])

    // const dispatch = (action, ...args) => {
    //     switch (action) {
    //         case 'add': {
    //             break
    //         }
    //         case 'edit': {
    //             break
    //         }
    //         case 'save': {
    //             const [location, order, value] = args

    //             setItemList(oldList => {
    //                 return oldList.toSpliced(order, 1, { ...oldList[order], description: value, edit: false })
    //             })
    //             break
    //         }
    //         case 'delete': {
    //             break
    //         }
    //         default: {
    //             break
    //         }
    //     }
    // }

    const initCard = () => {
        dispatch('init', index)
    }

    return <>
        <Container className="column-container" fluid ref={drop}>
            <Title className="column-title" size={'h2'}>{title}</Title>
            <CardList index={index} />
            <Text className={'btn-add-card'} onClick={initCard}>+ Add another card</Text>
        </Container>
    </>
}
