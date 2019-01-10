import React from 'react';
import ListTitle from './ListTitle';
import TaskItem from './TaskItem';
import AddItem from './AddItem';

class ListView extends React.Component {
    
    render() {
        const { lists, match } = this.props;
        if (!lists) return <p>Loading</p>
        
        const listId = parseInt(match.params.id);
        const list = lists.find(list => list.id === listId);

        
        return (
            <div>
                <ListTitle title={list.title}/>
                {
                    list.items.map(item => (
                        <TaskItem item={item.item} isCompleted={item.completed} />
                    ))
                }
                <AddItem listId={match.params.id} />
            </div>
        )
    }
}

export default ListView;