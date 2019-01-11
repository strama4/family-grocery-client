import React from 'react';
import ListTitle from './ListTitle';
import TaskItem from './TaskItem';
import AddItem from './AddItem';
const io = require('socket.io-client');
const socket = io.connect('http://localhost:5000/');

class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listReceived: false,
            list: null
        }
    }
    handleSubmit = listId => e => {
        e.preventDefault();
        const newItem = document.querySelector("input[name='newItem'");
        socket.emit('addedItem', {
                    item: newItem.value,
                    completed: false,
                    listId: parseInt(listId)
                }
        );
    }

    handleDelete = listId => e => {

    }

    handleChecked = listId => e => {

    }
                
                    
    componentDidMount = () => {
        socket.on('updatedTasks', (list) => { this.setState({ 
            listReceived: true,
            list: list
         })})
    }               
                
        

    render() {
        const { lists, match } = this.props;
        if (!lists) return <p>Loading</p>
        
        const listId = parseInt(match.params.id);
        const list = lists.find(list => list.id === listId);

        if (this.state.list) {
            return (
                <div>
                <ListTitle title={list.title}/>
                {
                    this.state.list.items.map(item => (
                        <TaskItem item={item.item} isCompleted={item.completed} />
                    ))
                }
                <AddItem handleSubmit={(listId) => this.handleSubmit(listId)} listId={match.params.id} />
            </div>
            )
        }
        return (
            <div>
                <ListTitle title={list.title}/>
                {
                    list.items.map(item => (
                        <TaskItem item={item.item} isCompleted={item.completed} handleDelete={this.handleDelete}/>
                    ))
                }
                <AddItem handleSubmit={(listId) => this.handleSubmit(listId)} listId={match.params.id} />
            </div>
        )
    }
}

export default ListView;