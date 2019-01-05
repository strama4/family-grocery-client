import React from "react";
import ListTitle from '../components/ListTitle';
import { Link } from 'react-router-dom';

class Lists extends React.Component {
    
    render() {
        const lists = this.props.lists ? JSON.parse(this.props.lists) : null;
            
        if (!lists) return <p>Loading...</p>
        return (             
            <div>
                {lists.map(list => (
                    <Link to={`/lists/${list.id}`}>
                        <ListTitle key={list.id} title={list.title} />
                    </Link>
                ))}
            </div>
        )
    }
}

export default Lists;

