import React from 'react';


class AddItem extends React.Component {
    
    render() {
        const { handleSubmit, type } = this.props;
        return ( 
            <div>
                <form onSubmit={handleSubmit}>
                    <input name="newItem" type="text" placeholder={`Enter ${type} description`} />
                    <button type="submit">Add {type}</button>
                </form>
            </div>
        )
    }
}

export default AddItem;