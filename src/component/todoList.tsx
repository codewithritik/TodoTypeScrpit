import { Draggable, Droppable } from "react-beautiful-dnd";
import { SingleTodo } from "./singleTodo";

type todoLists = {
  id: number,
  content: string,
  completed: boolean
}

interface myProps {
  todoLists: todoLists[];
  setTodoLists: React.Dispatch<React.SetStateAction<todoLists[]>>;
  isFetchAgain:boolean;
  setIsFetch:React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoList: React.FC<myProps> = ({ todoLists, isFetchAgain, setIsFetch, setTodoLists}: myProps) => {
  return <div className="width-45 bg-white main-cont">
    <h1 className="h1-main-cont">Active Tasks</h1>
    <Droppable droppableId="todoIncomplete">
        {(droppableProvided) => (
          <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
            {todoLists.filter((element) =>  element.completed === false ).map((items, index) => (
              <SingleTodo key={index} data={{...items, index, droppableProvided}} isFetchAgain={isFetchAgain} setIsFetch={setIsFetch} todoLists={todoLists} setTodoLists={setTodoLists} />
            ))}
          </div>
        )}
      </Droppable>
  </div>
}

export default TodoList;