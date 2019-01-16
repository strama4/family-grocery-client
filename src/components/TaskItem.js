import React from 'react';

const TaskItem = ({ index, item, isCompleted, handleChecked, handleDelete }) => (
    <div className="w3-margin-right">
        <input className="w3-check" data-index={index} type="checkbox" onChange={handleChecked} checked={isCompleted}></input>
        <span className="w3-xlarge w3-padding-small" data-index={index}>{item}</span>
        <button className="w3-button w3-teal" data-index={index} onClick={handleDelete}>Delete</button>
    </div>
)

export default TaskItem;
