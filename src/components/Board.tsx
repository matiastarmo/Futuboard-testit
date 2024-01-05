import { Box } from "@mui/material";
import { DragDropContext, DropResult, ResponderProvided } from '@hello-pangea/dnd';
import { useParams } from "react-router";

import Column from "./Column"
import { useGetColumnsByBoardIdQuery } from "../state/apiSlice";



const Board: React.FC = () => {
    let { id } = useParams()
    if (!id) {
        id = 'default-id'
    }


    const { data: columns, isSuccess } = useGetColumnsByBoardIdQuery(id)
    console.log(columns)

    const handleOnDragEnd = (result: DropResult, provided: ResponderProvided) => {
        console.log(result, provided)
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Box style={{ display: 'inline-flex', height: '100vh', width: 'fit-content', margin: '25px' }} >
                {isSuccess && columns.map((column, index) => (
                    <Column key={column.columnid} column={column} index={index} />
                ))}
            </Box>
        </DragDropContext>

    );
};

export default Board