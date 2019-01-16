import React from 'react';


class AddItem extends React.Component {
    
    render() {
        const { handleSubmit, type } = this.props;
        return ( 
            <div>
                <form onSubmit={handleSubmit}>
                    <input className="w3-input w3-margin-top" name="newItem" type="text" placeholder={`Enter ${type} description`} />
                    <button className="w3-button w3-teal w3-margin-top" type="submit">Add {type}</button>
                </form>
            </div>
        )
    }
}

export default AddItem;