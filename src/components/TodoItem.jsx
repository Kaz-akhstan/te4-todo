import './TodoItem.css'

function TodoItem(props) {
    let { id, completed, label } = props

    return (
        <li className="todo-item">
            <div>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => { props.toggleTaskCompleted(id) }}
                />
                <label id='in'>{label}</label>
                <input id='in' className='hidden' type="text" placeholder={label} />
                <button id='in' className='hidden' onClick={() => { props.confirm() }}>Verkställ</button>
            </div>
            <div>
                <button onClick={() => { props.editTodo(id) }}>Redigera</button>
                <button onClick={() => { props.moveTodo(id, -1) }}>^</button>
                <button onClick={() => { props.moveTodo(id, 1) }}>v</button>
                <button onClick={() => { props.deleteTodo(id) }}>Ta bort</button>
            </div>
        </li>
    )
}

export default TodoItem