import { KeyboardEvent, useState } from "react";
import { IoMdAdd } from "react-icons/io";

type todoLists = {
    id: number,
    content: string,
    completed: boolean
}

interface myProps {
    todoLists: todoLists[];
    setTodoLists: React.Dispatch<React.SetStateAction<todoLists[]>>
}

const SearchBox: React.FC<myProps> = ({ todoLists, setTodoLists }: myProps) => {
    const [todoStr, setTodoStr] = useState<string>("");

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newValue = e.currentTarget.value;
        setTodoStr(newValue)
    }

    const onHandleAdd = () => {
        const existingEntries = localStorage.getItem("todoLists") && JSON.parse(localStorage.getItem("todoLists") || "") || [];
        const newObj: todoLists = {
            id: existingEntries?.length || 1,
            content: todoStr,
            completed: false
        }
        const newXyz = [...todoLists, newObj]
        setTodoLists(newXyz);
        localStorage.setItem("todoLists", JSON.stringify([...todoLists, newObj]));
    }

    const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
        // Do something
        if (e.code === "Enter") {
            onHandleAdd();
        }
    };



    return <div className="fade-in-down" onKeyDown={handleKeyboardEvent}>
        <input placeholder="your todo here" value={todoStr} onChange={handleChange} />
        <IoMdAdd onClick={onHandleAdd} size={40} className="course-pointer" style={{ color: "white" }} />
    </div>
}
export default SearchBox;