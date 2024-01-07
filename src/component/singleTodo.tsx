import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit, FaCheck, FaArrowAltCircleRight } from "react-icons/fa";
import { useEffect, useState } from "react";

type data = {
    id: number,
    content: string,
    completed: boolean,
    index: number,
    droppableProvided: DroppableProvided,
    isFromCompleted?: boolean
}

type todoLists = {
    id: number,
    content: string,
    completed: boolean
}

interface myProps {
    data: data;
    isFetchAgain: boolean;
    setIsFetch: React.Dispatch<React.SetStateAction<boolean>>;
    todoLists?: todoLists[];
    setTodoLists?: React.Dispatch<React.SetStateAction<todoLists[]>>
}


export const SingleTodo: React.FC<myProps> = ({ data, isFetchAgain, setIsFetch, setTodoLists }: myProps) => {
    const { id, content, completed, index, droppableProvided, isFromCompleted } = data;
    const [newTodo, setTodo] = useState<todoLists>({
        id: 0,
        content: "",
        completed: false
    });
    const [onEdit, setEdit] = useState<boolean>(false);
    const [todoList, setTodoList] = useState<todoLists[]>([]);

    useEffect(() => {
        const list: todoLists[] = localStorage.getItem("todoLists") && JSON.parse(localStorage.getItem("todoLists") ?? "");
        setTodoList(list);
    }, [isFetchAgain])

    const handleEdit = (ids: number) => {
        const toEdit: todoLists | undefined = (todoList && todoList.find((props: todoLists) => props.id === ids));
        toEdit && setTodo(toEdit);
        setEdit(!onEdit);
    }

    const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
        setTodo({ ...newTodo, content: e.currentTarget.value });
    }

    const onSave = () => {
        const updatedArray = todoList.map((obj) => obj.id === newTodo.id ? newTodo : obj);
        localStorage.setItem("todoLists", JSON.stringify(updatedArray));
        setTodoLists && setTodoLists(updatedArray)
        // setIsFetch(!isFetchAgain);

    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave();
        setEdit(!onEdit);
    }

    const handleCloseEdit = () => {
        setEdit(!onEdit);
        onSave();
    }

    const HandleDelete = (ids: number) => {
        const list: todoLists[] = localStorage.getItem("todoLists") && JSON.parse(localStorage.getItem("todoLists") || "") || [];

        // console.log("this is todolist", ids, list, todoList)
        const updatedArray = list.filter((obj) => obj.id !== ids);
        console.log("this is updatedarray", ids, updatedArray)
        localStorage.setItem("todoLists", JSON.stringify(updatedArray));
        setIsFetch(!isFetchAgain);
    }

    const handleComplete = (ids: number) => {
        console.log("this is todoall", todoList)
        const updatedArray = todoList.map((obj) => obj.id === ids ? { ...obj, completed: true } : obj);
        console.log('this is upadte', updatedArray)
        localStorage.setItem("todoLists", JSON.stringify(updatedArray));
        setIsFetch(!isFetchAgain);
    }


    return <Draggable key={id} draggableId={String(id)} index={index}>
        {(provided, snapshot) => (
            <div className={`${snapshot.isDragging ? "isDraggingTrue" : ""} list-wrapper ${isFromCompleted ? "isCompleted_div" : ""}`}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                {onEdit ? <form className="d-flex width-80" onSubmit={onSubmit}><input className="todo_edit_input" value={newTodo.content} onChange={onChangeInput} /></form> : <h3>{content}</h3>}
                {onEdit ? <FaCheck onClick={handleCloseEdit} /> : !completed && <div className="d-flex width-20 jus-space-between">
                    <FaEdit onClick={() => handleEdit(id)} />
                    <MdDeleteForever onClick={() => HandleDelete(id)} />
                    <FaArrowAltCircleRight onClick={() => handleComplete(id)} />
                </div>}
                {droppableProvided.placeholder}
            </div>
        )}
    </Draggable>
}