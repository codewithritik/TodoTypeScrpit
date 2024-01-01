import { Draggable, Droppable } from "react-beautiful-dnd";

type todoLists = {
  id: number,
  content: string,
  completed: boolean
}

interface myProps {
  todoLists: todoLists[];
  setTodoLists: React.Dispatch<React.SetStateAction<todoLists[]>>
}
const TodoList: React.FC<myProps> = ({ todoLists, setTodoLists }: myProps) => {
  return <div className="width-50 bg-white min-height-500 main-cont">
    <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todoLists.map(({id, content}:todoLists, index) => (
              <Draggable key={id} draggableId={String(id)} index={index}>
                {(provided, snapshot) => (
                 <>
                  {content}
                 </>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
  </div>
}

export default TodoList;