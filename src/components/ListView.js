import React from 'react';
import ListTitle from './ListTitle';

class ListView extends React.Component {
    
    render() {

        if (!this.props.lists) return <p>Loading</p>
        
        const listId = parseInt(this.props.match.params.id);
        const list = JSON.parse(this.props.lists).find(list => list.id === listId);

        
        return (
            <div>
                <ListTitle title={list.title}/>
                {
                    list.items.map(item => (
                        <li>{item.item} Got it?: {item.completed ? 'Yup': 'Nope'}</li>
                    ))
                }
            </div>
        )
    }
}

export default ListView;