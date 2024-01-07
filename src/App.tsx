import { useEffect, useState } from 'react';
import './App.css';
import SearchBox from './component/searchBox';
import TodoList from './component/todoList';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CompletedTodo from './component/completedTodo';

type todoLists = {
  id: number,
  content: string,
  completed: boolean
}

function App() {
  const [todoLists, setTodoLists] = useState<todoLists[]>([]);
  const [cmpTodo, setCmpTodo] = useState<todoLists[]>([]);
  const [isFetchAgain, setIsFetch] = useState<boolean>(false);

  useEffect(() => {
    const existingEntries = localStorage.getItem("todoLists") && JSON.parse(localStorage.getItem("todoLists") || "") ||[];
    setTodoLists(existingEntries);
    setCmpTodo(existingEntries);
    debugger;
  }, [isFetchAgain])

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log("this is result", result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if(result.reason === "DROP"){
      
    }

    let add;
    let active = todoLists;
    let complete = cmpTodo;
    // Source Logic
    if (source.droppableId === "todoIncomplete") {
      add = active[source.index];
      // console.log("this is add", add)
      active.splice(source.index, 1);
      // console.log("this is  active.splice",  active.splice(source.index, 1))
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "todoIncomplete") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    // localStorage.setItem("todoLists", JSON.stringify([active, complete]));

    setCmpTodo(complete);
    setTodoLists(active);
    // setIsFetch(!isFetchAgain)
  }

  return (
    <div className='App'>
      <SearchBox todoLists={todoLists} setTodoLists={setTodoLists} isFetchAgain={isFetchAgain} setIsFetch={setIsFetch} />
      <div className='width-80 mr-auto mr-top-5 d-flex jus-space-between'>
        <DragDropContext onDragEnd={onDragEnd}>
          <TodoList todoLists={todoLists} setTodoLists={setTodoLists} isFetchAgain={isFetchAgain} setIsFetch={setIsFetch}  />
          <CompletedTodo cmpTodo={cmpTodo} setCmpTodo={setCmpTodo}  isFetchAgain={isFetchAgain} setIsFetch={setIsFetch}/>
        </DragDropContext>

      </div>
    </div>
  );
}

export default App;
