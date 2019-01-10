import React from 'react';

class AddItem extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const newItem = document.querySelector("input[name='newItem'");
        fetch(`http://localhost:5000/lists/${this.props.listId}/add`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                item: newItem.value,
                completed: false
            })
        })
    }
    render() {
        return ( 
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="newItem" type="text" placeholder="Add an item" />
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}

export default AddItem;