import React from 'react';

const TaskItem = ({ item, isCompleted }) => (
    <div>
        <span>{item}</span>
        <input type="checkbox" defaultChecked={isCompleted}></input>
    </div>
)

export default TaskItem;
