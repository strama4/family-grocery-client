import React from 'react';
import { getApiURL } from '../apiAdapter';
const io = require('socket.io-client');
const socket = io.connect(getApiURL());


class TaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEdit: false,
            value: ''
       }
    } 

    handleChange = (e) => {
        this.setState({ value: e.target.value})
    }
    
    toggleEdit = (e) => {
        const itemId = e.target.dataset.index;
        const itemSpan = document.querySelector(`span[data-index='${itemId}']`);
        if (this.state.showEdit) {
            const item = {id: itemId, description: this.state.value}
            socket.emit('updateItem', {item, listId: this.props.listId})
        } else {
            this.setState({ value: itemSpan.innerHTML })
        }
        this.setState({ showEdit: !this.state.showEdit })
    }

    render() {
        const { index, item, isCompleted, handleChecked, handleDelete } = this.props;
        return (
            <div className="w3-row-padding w3-margin-right">

                <input className="w3-check w3-col m1" data-index={index} type="checkbox" onChange={handleChecked} checked={isCompleted}></input>
                {
                    this.state.showEdit ? 
                    <span className="w3-col m4">
                        <div className="w3-row-padding">
                            <input className="w3-col m8 w3-input w3-padding-small" value={this.state.value} onChange={this.handleChange}></input>
                            <button className="w3-button w3-teal" data-index={index} onClick={this.toggleEdit}>Save</button>
                        </div>
                    </span>
                    :
                    <span className="w3-col m4">
                        <div className="w3-row-padding">
                            <span className="w3-col m8 w3-xlarge w3-padding-small" data-index={index}>{item}</span>
                            <button className="w3-button m4 w3-teal w3-right" data-index={index} onClick={this.toggleEdit}>Edit</button>
                        </div>
                    </span>

                }
                <button className="w3-button m1 w3-teal" data-index={index} onClick={handleDelete}>Delete</button>
            </div>

        )
    }

} 

export default TaskItem;
