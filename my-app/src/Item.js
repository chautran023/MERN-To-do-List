import React from 'react'

const Item = (props) => {
    const onEdit = (e) => {
        if (props.onEdit && typeof props.onEdit === 'function') {
            e.preventDefault();
            props.onEdit(props._id);
        }};    
    
    const onDelete = (e) => {
        if (props.onDelete && typeof props.onDelete === 'function') {
            e.preventDefault();
            props.onDelete(props._id);
        }}; 
  return (
    <div>
        <div className={`single-task ${props.completed && 'task-completed'}`}>
                <h5>{props.name}</h5>
                <h5>{props.completed}</h5>
                <div>
                    <button type="button" className="edit-link" onClick={onEdit}>Edit</button>
                    <button type="button" className="delete-btn" onClick={onDelete}>Delete</button>
                </div>
        </div>
    </div>
  )
}

export default Item
