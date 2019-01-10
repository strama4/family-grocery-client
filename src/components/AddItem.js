import React from 'react';


class AddItem extends React.Component {
    
    render() {
        const { handleSubmit, listId } = this.props;
        return ( 
            <div>
                <form onSubmit={handleSubmit(listId)}>
                    <input name="newItem" type="text" placeholder="Add an item" />
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}

export default AddItem;