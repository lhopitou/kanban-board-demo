import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Text } from "@mantine/core";

export const ViewItem = ({ onEdit, onDelete, description }) => {
    return (
        <>
            <Text size="sm">
                {description}
            </Text>
            <div className="options-container">
                <EditFilled className="btn-options" onClick={() => onEdit()} />
                <DeleteFilled className="btn-options" onClick={() => onDelete()} />
            </div>
        </>
    )
}