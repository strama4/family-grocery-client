import React from 'react';

const TaskItem = ({ item, isCompleted, handleDelete }) => (
    <div>
        <span>{item}</span>
        <input type="checkbox" defaultChecked={isCompleted}></input>
        <button onClick={handleDelete}>Delete</button>
    </div>
)

export default TaskItem;
