type todoLists = {
    id: number,
    content: string,
    completed: boolean
}

interface myProps {
    todoLists: todoLists[];
    setTodoLists: React.Dispatch<React.SetStateAction<todoLists[]>>
}

export const CompletedTodo: React.FC<myProps> = ({ todoLists, setTodoLists }: myProps) => {
    return <>

    </>
}