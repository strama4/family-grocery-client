import React from 'react';
import ListTitle from './ListTitle';
import TaskItem from './TaskItem';
import AddItem from './AddItem';
const io = require('socket.io-client');
const socket = io.connect('https://family-grocery-api.herokuapp.com/');

class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listReceived: false,
            list: null,
            listId: this.props.match.params.id
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        const newItem = document.querySelector("input[name='newItem'");
        socket.emit('addedItem', {
                    description: newItem.value,
                    listId: parseInt(this.state.listId)
                }
        );
        newItem.value = "";
    }

    handleDelete = (e) => {
        const itemId = e.target.dataset.index
        socket.emit('deletedItem', {id: itemId, listId: this.state.listId})
    }
    
    handleChecked = (e) => {
        const itemId = e.target.dataset.index;
        const updatedStatus = document.querySelector(`input[data-index='${itemId}']`).checked;
        console.log(updatedStatus)
        const item = {id: itemId, status: updatedStatus}
        socket.emit('updateItem', { item, listId: this.state.listId})
    }
            
    getListItems = () => {
        fetch(`https://family-grocery-api.herokuapp.com/lists/${this.state.listId}`)
        .then(res => res.json())
        .then(data => {
            this.setState({ list: data })
        })
    }
                    
    componentDidMount = () => {
        this.getListItems();
        socket.on('updatedTasks', (list) => { 
            this.setState({ 
                listReceived: true,
                list: list
            })
        })
    }               
                
        

    render() {
        const { list } = this.state;
        if (!list) return <p>Loading</p>
        return (
            <div>
                <ListTitle title={list.title} />
                {
                    list.items.map(item => (
                        <TaskItem key={item.id} index={item.id} item={item.description} isCompleted={item.complete} handleDelete={this.handleDelete} handleChecked={this.handleChecked}/>
                    ))
                }
                <AddItem type="Item" handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default ListView;