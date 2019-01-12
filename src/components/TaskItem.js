import React from 'react';

const TaskItem = ({ index, item, isCompleted, handleChecked, handleDelete }) => (
    <div>
        <span data-index={index}>{item}</span>
        <input data-index={index} type="checkbox" onChange={handleChecked} defaultChecked={isCompleted}></input>
        <button data-index={index} onClick={handleDelete}>Delete</button>
    </div>
)

export default TaskItem;
