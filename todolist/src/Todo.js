import { useState } from 'react';

function Todo() {
    const [activity, setActivity] = useState('');
    const [edit, setEdit] = useState({});
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState('');
  
    function generateId() {
      return Date.now();
    }
  
    function saveToDoHandler(event) {
      event.preventDefault();
  
      if(!activity) {
        return setMessage('Jangan diisi kosong!')
      }
  
      setMessage('')
  
      if (edit.id) {
        const updateTodo = {
          ...edit,
          activity,
        };
  
        const editTodoIndex = todos.findIndex(function(todo) {
          return todo.id === edit.id
        });
  
        const updatedTodos = [...todos];
        updatedTodos[editTodoIndex] = updateTodo;
  
        setTodos(updatedTodos);
  
        return cancelEditHandler();
      }
  
      setTodos([...todos, {
        id: generateId(),
        activity,
        done: false,
      }]);
      
      setActivity('');
    }
  
    function removeToDoHandler(todoId) {
      const filteredTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(filteredTodos);
      if(edit.id) cancelEditHandler()
    }
  
    function editToDoHanler(todo) {
      setActivity(todo.activity);
      setEdit(todo);
    }
  
    function cancelEditHandler() {
      setEdit({});
      setActivity('');
    }
  
    function doneTodoHandler(todo) {
      const updatedTodo = {
        ...todo,
        done: todo.done ? false : true
      }
      const editTodoIndex = todos.findIndex(function(currentTodo) {
        return currentTodo.id === todo.id
      });
  
      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
  
      setTodos(updatedTodos);
  
    }
  
    return (
      <>
        <h1>Simple To-Do List</h1>
        {message && <div style={{ color: 'red'}}>{message}</div>}
        <form onSubmit={saveToDoHandler}>
          <input
            type="text"
            placeholder="Nama aktifitas"
            value={activity}
            onChange={function (event) {
              setActivity(event.target.value);
            }}
          />
          <button type="submit">
            {edit.id ? 'Simpan Perubahan' : 'Tambah'}
          </button>
          {edit.id
            && <button onClick={cancelEditHandler}>Batal Edit</button>}
        </form>
        {todos.length > 0 ?
          <ul>
          {todos.map(function (todo) {
            return (
              <li key={todo.id}>
              <input type="checkbox" checked={todo.done} onChange={doneTodoHandler.bind(this, todo)} />
                {todo.activity}
                ({todo.done ? 'Selesai' : 'Belum'})
                <button onClick={editToDoHanler.bind(this, todo)}>Edit</button>
                <button onClick={removeToDoHandler.bind(this, todo.id)}>Hapus</button>
              </li>
            );
          })}
        </ul>
        : (<p><i>Tidak ada todo</i></p>)}
       
      </>
    );
  }

export default Todo;