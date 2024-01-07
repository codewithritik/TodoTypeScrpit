import { KeyboardEvent, useState } from "react";
import { IoMdAdd } from "react-icons/io";

type todoLists = {
    id: number,
    content: string,
    completed: boolean
}

interface myProps {
    todoLists: todoLists[];
    setTodoLists: React.Dispatch<React.SetStateAction<todoLists[]>>;
    isFetchAgain: boolean;
    setIsFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBox: React.FC<myProps> = ({ isFetchAgain, setIsFetch }: myProps) => {
    const [todoStr, setTodoStr] = useState<string>("");

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newValue = e.currentTarget.value;
        setTodoStr(newValue)
    }

    const onHandleAdd = () => {
        const existingEntries: todoLists[] = localStorage.getItem("todoLists") && JSON.parse(localStorage.getItem("todoLists") || "") || [];

        const newObj: todoLists = {
            id: Date.now(),
            content: todoStr,
            completed: false
        }
        localStorage.setItem("todoLists", JSON.stringify([...existingEntries, newObj]));
        setTodoStr("")
        setIsFetch(!isFetchAgain)
    }

    const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
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