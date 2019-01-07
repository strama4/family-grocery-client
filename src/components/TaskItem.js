import React from 'react';

const TaskItem = ({ item, isCompleted }) => (
    <div>
        <span>{item}</span>
        <input type="checkbox" value={isCompleted}>{isCompleted}</input>
    </div>
)

export default TaskItem;
