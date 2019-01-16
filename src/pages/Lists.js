import React from "react";
import ListTitle from '../components/ListTitle';
import { Link } from 'react-router-dom';
import AddItem from "../components/AddItem";
import { getApiURL } from '../apiAdapter';
const io = require('socket.io-client');
const socket = io.connect(getApiURL());

class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: ''
        }
    }
    // getUserLists = () => {
    //     fetch(`http://localhost:5000/lists/`)
    //     .then(res => {
    //         res.json().then(data => {
    //         const lists = data.filter(list => list.userId === this.props.user)
    //             this.setState({ lists })
    //         })
    //     })
    // }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const newListValue = document.querySelector("input[name='newItem']").value;
        console.log(newListValue)
        socket.emit('addedList', {title: newListValue, userId: this.props.user});
    }

    componentDidMount = () => {
        // this.getUserLists()
        socket.emit('getUserList', this.props.user);
        socket.on('updatedUserLists', (data) => {
            this.setState({ lists: data})
        })
    }
    render() {
        const { lists } = this.state;
        if (!lists) return <p>Loading...</p>
        return (             
            <div>
                {lists.map((list, index) => (
                    <Link key={index} to={`/lists/${list.id}`}>
                        <ListTitle fontSize={'xxlarge'} key={list.id} title={list.title} />
                    </Link>
                ))}
                <AddItem type={"List"} handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default Lists;

