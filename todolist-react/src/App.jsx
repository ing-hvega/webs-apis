import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('')
    const [result, setResult] = useState({total: 0, completed: 0, pending: 0})

    const handledAddTask = () => {
        const newTask = {id: Date.now(), title: title, checked: false}
        setTasks([...tasks, newTask])
    }

    const handledTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleRemoveTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id)
        setTasks(newTasks)
    }

    const handleCheckedTask = (id) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                return {...task, checked: !task.checked}
            }
            return task
        })

        setTasks(newTasks)
    }

    useEffect(() => {

        const total = tasks.length
        const completed = tasks.filter((item) => item.checked).length

        setResult({total: total, completed: completed, pending: total - completed})

    }, [tasks]);

    return (
        <div className="app-todolist">
            <h1>Listado de tareas</h1>

            <div className="app-todolist-form">
                <div>
                    <input type="text" value={title} placeholder="Escribe una tarea"
                           onChange={handledTitleChange}/>
                </div>
                <div>
                    <button onClick={handledAddTask}>Agregar</button>
                </div>
            </div>

            <div className="app-todolist-tasks">

                <ul>
                    {
                        tasks.map((item) => (
                            <li className="app-todolist-task" key={item.id}>
                                <div><input onChange={() => handleCheckedTask(item.id)} value={item.checked}
                                            type="checkbox"/></div>
                                <div className="title">{item.title}</div>
                                <div>
                                    <button onClick={() => handleRemoveTask(item.id)}>X</button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className="app-todolist-result">
                <div>
                    {
                        `Total: ${result.total}`
                    }
                </div>
                <div>
                    {
                        `Completados: ${result.completed}`
                    }
                </div>
                <div>
                    {
                        `Pendientes: ${result.pending}`
                    }
                </div>
            </div>

        </div>
    )
}

export default App
