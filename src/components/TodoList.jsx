import { useEffect, useState } from 'react'
import './TodoList.css'
import TodoItem from './TodoItem'

function TodoList() {
    const [todos, setTodos] = useState(() => {
        return JSON.parse(localStorage.getItem('todos')) || []
    })

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = () => {
        const newTodo = document.getElementById('newTodo').value
        if (newTodo === '') return
        const newTodos = [...todos, { id: localStorage.getItem('index'), label: newTodo, completed: false }]
        setTodos(newTodos)
        localStorage.setItem('index', parseInt(localStorage.getItem('index')) + 1 || parseInt(todos.length) + 1)
        document.getElementById('newTodo').value = ''
    }

    const deleteTodo = (id) => {
        const newTodos = todos.filter(todo => todo.id !== id ? todo : null)
        //const newTodos = todos.filter(todo => {
        //    if(todo.id !== id)
        //        return todo
        //})
        setTodos(newTodos)
    }

    const selectAllTodos = () => {
        const newTodos = todos.map(todo => todo.completed !== true ? { ...todo, completed: true } : todo)
        setTodos(newTodos)
    }

    const deselectAllTodos = () => {
        const newTodos = todos.map(todo => todo.completed === true ? { ...todo, completed: false } : todo)
        setTodos(newTodos)
    }

    const deleteSelected = () => {
        const newTodos = todos.filter(todo => todo.completed === true ? null : todo)
        setTodos(newTodos)
    }

    const deleteAll = () => {
        setTodos([])
        localStorage.setItem('index', 0)
    }

    const moveTodo = (id, direction) => {
        let startIndex = 0

        todos.forEach((todo, index) => {
            if (todo.id === id) {
                startIndex = index
            }
        })

        if(startIndex + direction < todos.length && startIndex + direction > -1) {
            const newTodos = todos

            let firstTodoToMove = todos[startIndex]
            let secondTodoToMove = todos[startIndex + direction]

            newTodos.splice(startIndex, 1, secondTodoToMove)
            newTodos.splice(startIndex + direction, 1, firstTodoToMove)

            setTodos(todos.map(todo => todo))
        }
    }

    const editTodo = (id) => {
        const inputs = document.querySelectorAll('#in')
        const newTodos = todos.map(todo => {
            let textToEdit
            if(todo.id === id) {
                inputs.forEach(input => {
                    input.classList.toggle('hidden')
                })
                textToEdit = prompt("Edit", todo.label)
            }
            return todo.id === id ? {...todo, label: textToEdit} : todo
        })
        setTodos(newTodos)
    }

    const confirm = () => {

    }

    const toggleTaskCompleted = (id) => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        setTodos(newTodos)
        //const newTodos = todos.map(todo => {
        //  const newTodo = todo
        //  if(todo.id === id) {
        //    newTodo.completed = !newTodo.completed
        //  }
        //  return newTodo
        //})
        //setTodos(newTodos)
    }
    return (
        <>
            <input type="text" id='newTodo' placeholder='Skriv' />
            <button onClick={() => { addTodo() }}> Lägg till</button>
            <button onClick={() => { deleteAll() }}> Ta bort allt</button>
            <button onClick={() => { selectAllTodos() }}>Välj alla</button>
            <button onClick={() => { deselectAllTodos() }}>Släpp alla</button>
            <button onClick={() => { deleteSelected() }}>Ta bort alla valda</button>
            <ul className='todo-list'>
                {todos.map((todo, index) =>
                    <TodoItem
                        key={index}
                        id={todo.id}
                        label={todo.label}
                        completed={todo.completed}
                        toggleTaskCompleted={toggleTaskCompleted}
                        deleteTodo={deleteTodo}
                        moveTodo={moveTodo}
                        editTodo={editTodo}
                        confirm={confirm}
                    />
                )}
            </ul>
        </>
    )
}

export default TodoList