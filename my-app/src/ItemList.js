import axios from 'axios'
import {useState, useEffect} from 'react'
import React from 'react'
import Item from './Item'

const ItemList = () => {
    const [task, setTask] = useState({
        id:'',
        name:'',
        completed:false,
    })
    const [tasks, setTasks] = useState([])
    const [length, setLength] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [alert, setAlert] = useState(false)
    const [alertText, setAlertText] = useState('')

    const completedTasks = tasks.filter(task => task.completed === true)


    const fetchData = async() => {
    try {
      const {data} = await axios.get('/api/v1/tasks')
      const {length, tasks} = data
      setTasks(tasks)
      setLength(length)
      console.log(completedTasks)
    } catch(e) {
      console.log(e)
    }
    }
    useEffect(() => {
        fetchData()
    },[])

    const handleDelete = async (id) => {
        try{
          const {data} = await axios.delete(`/api/v1/tasks/${id}`)
          console.log(data)
          fetchData()
        }catch(e){
          console.log(e)
        }
    }
    const onEdit = async (id) => {
        setIsEditing(true)
        console.log(id)

        try{
            const {data} = await axios.get(`/api/v1/tasks/${id}`)
            const {name, completed} = data.task
            console.log(name)
            setTask({
                ...task,
                id:id,
                name: name,
                completed: completed
              });            
              console.log(task)
          }catch(e){
            console.log(e)
          }
    }
    const handleChange =  (event) => {
        if(event.target.value.length > 19) {
            setAlert(true)
            setAlertText('task should not exceed 20 characters')
        }
        if(event.target.value.length <= 19) {
            setAlert(false)
        }
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setTask({
          ...task,
          [fieldName]: fieldValue,
        });
        console.log('task changed', task, task.name.length)
      };
    const handleCB = (e) => {
        setTask({
            ...task,
            completed:e.target.checked
        });
    }
    const handleEditSubmit = async (event) => {
        console.log('task edited', task)
        if(!task.name) {
            setAlert(true)
            setAlertText('Please fill in the task name')
        }
        else {
            try{
                const {data} = await axios.patch(`/api/v1/tasks/${task.id}`,{name:task.name, completed:task.completed})
                console.log(data)
            }catch(e){
                console.log(e)
            }
            setIsEditing(false)
            }
        }
    const handleAddSubmit = async (event) => {
            console.log('task added', task)
            if(!task.name) {
                setAlert(true)
                setAlertText('Please fill in the task name')
            } else {
            try{
                const {data} = await axios.post(`/api/v1/tasks`,{name:task.name})
                console.log(data)
                fetchData()
            }catch(e){
                console.log(e)
              }
            }
        }
        
  return (
    <div className="tasks-container">
        {!isEditing ?
        <>
            <form className="task-form">
                <h4>Add item</h4>
                <div className="form-control">
                    <input
                    type="text"
                    name="name"
                    className="task-input"
                    placeholder="e.g. wash dishes"
                    maxLength='20'
                    onChange={handleChange}
                    />
                    <button type="submit" className="btn submit-btn" disabled={alert} onClick={handleAddSubmit}>submit</button>
                </div>
                <div className={`${alert && 'form-alert'}`}>{alert && alertText}</div>
            </form>
            <h5>You have completed {completedTasks.length} out of total {length} tasks!</h5>
            <div className="tasks">
                {tasks.map((item) => {
                    return (
                        <Item 
                            key={item._id}{...item}
                            onEdit={onEdit}
                            onDelete={handleDelete}
                            >
                        </Item>
                    )
                })}
            </div> 
        </>
        :
        <div className="container">
            <form className="single-task-form">
                <h4>Edit Item</h4>
                <div className="form-control">
                <label>Task ID</label>
                <p className="task-edit-id"></p>
                </div>
                <div className="form-control">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" className="task-edit-name" maxLength='20' value={task.name} onChange={handleChange}/>
                </div>
                <div className="form-control">
                <label htmlFor="completed">completed</label>
                <input type="checkbox" name="completed" className="task-edit-completed" checked={task.completed} onChange={handleCB} />
                </div>
                <button type="submit" className="block btn task-edit-btn" disabled={alert} onClick={handleEditSubmit}>edit</button>
                <div className={`${alert && 'form-alert'}`}>{alert && alertText}</div>
            </form>
        </div> }
    </div>
    )
}

export default ItemList