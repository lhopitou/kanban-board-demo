import { Card } from "@mantine/core"
import PropTypes from "prop-types"
import { useDrag } from "react-dnd"
import { ViewItem } from "./ViewItem"
import EditItem from "./EditItem"
import { useCardList } from "../contexts/CardListContext"

ItemCard.propTypes = {
    location: PropTypes.string,
    order: PropTypes.number,
    description: PropTypes.string,
    edit: PropTypes.bool,
    dispatch: PropTypes.func,
}

export default function ItemCard(props) {
    const { location, order, description, edit } = props
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'CARD',
        item: {
            order: order,
            location: location,
        },
        canDrag: () => !edit,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }), [order, location, edit])

    const { dispatch } = useCardList(location)

    const onSave = (value) => {
        dispatch('save', location, order, value)
    }

    const onCancel = () => {
        dispatch('cancel', location, order)
    }

    const onEdit = () => {
        dispatch('edit', location, order)
    }

    const onDelete = () => {
        dispatch('delete', location, order)
    }

    return <>
        <Card className={'item-card'} shadow={"sm"} padding="lg" radius={"md"} withBorder ref={drag}>
            {edit ?
                <EditItem onSave={onSave} onCancel={onCancel} onDelete={onDelete} description={description} />
                :
                <ViewItem onEdit={onEdit} onDelete={onDelete} description={description} />
            }
        </Card>
    </>
}