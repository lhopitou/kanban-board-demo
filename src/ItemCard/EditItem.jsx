import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { Input } from "@mantine/core"
import { useState } from "react"
import PropTypes from "prop-types"

EditItem.propTypes = {
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    description: PropTypes.string,
}

export default function EditItem({ onSave, onCancel, onDelete, description = '' }) {
    const [itemValue, setItemValue] = useState(description)

    return <>
        <Input value={itemValue} onChange={(e) => setItemValue(e.target.value)} />
        <div className="options-container">
            <CheckOutlined className="btn-options" onClick={() => onSave(itemValue)} />
            <CloseOutlined className="btn-options" onClick={() => description === '' ? onDelete() : onCancel()} />
        </div>
    </>
}