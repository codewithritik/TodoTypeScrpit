import { Draggable, Droppable } from "react-beautiful-dnd";
import { SingleTodo } from "./singleTodo";

type cmpTodo = {
  id: number,
  content: string,
  completed: boolean
}

interface myProps {
  cmpTodo: cmpTodo[];
  setCmpTodo: React.Dispatch<React.SetStateAction<cmpTodo[]>>
  isFetchAgain:boolean;
  setIsFetch:React.Dispatch<React.SetStateAction<boolean>>;
}

const CompletedTodo: React.FC<myProps> = ({ cmpTodo, isFetchAgain, setIsFetch }: myProps) => {
  return <div className="width-45 bg-white main-cont isCompleted_cont">
    <h1 className="h1-main-cont">Completed Tasks</h1>
    <Droppable droppableId="CompleteTodo">
        {(droppableProvided) => (
          <div className="height-100" {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
            {cmpTodo.filter((element) =>  element.completed === true ).map((items, index) => (
              <SingleTodo key={index} data={{...items, index, droppableProvided, isFromCompleted:true}} isFetchAgain={isFetchAgain} setIsFetch={setIsFetch} />
            ))}
          </div>
        )}
      </Droppable>
  </div>
}

export default CompletedTodo;