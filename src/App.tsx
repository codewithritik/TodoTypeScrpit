import { useEffect, useState } from 'react';
import './App.css';
import SearchBox from './component/searchBox';
import TodoList from './component/todoList';
import { CompletedTodo } from './component/completedTodo';
import { DragDropContext } from "react-beautiful-dnd";

type todoLists = {
  id: number,
  content: string,
  completed: boolean
}

function App() {
  const [todoLists, setTodoLists] = useState<todoLists[]>([]);
  const [cmpTodo, setcmpTodo] = useState<todoLists[]>([]);

  useEffect(() => {
    const existingEntries = localStorage.getItem("todoLists") && JSON.parse(localStorage.getItem("todoLists") || "") || [];
    setTodoLists(existingEntries);
  }, [])

  const onDragEnd = () => {

  }



  return (
    <div className='App'>
      <SearchBox todoLists={todoLists} setTodoLists={setTodoLists} />
      <div className='width-80 mr-auto mr-top-5'>
        <DragDropContext onDragEnd={onDragEnd}>
          <TodoList todoLists={todoLists} setTodoLists={setTodoLists} />
          <CompletedTodo todoLists={todoLists} setTodoLists={setTodoLists} />
        </DragDropContext>

      </div>
    </div>
  );
}

export default App;
