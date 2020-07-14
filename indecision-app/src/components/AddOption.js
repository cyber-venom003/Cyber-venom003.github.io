import React from 'react';

export default class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
    }
    handleFormSubmission(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        e.target.elements.option.value = "";
        this.props.handleAdd(option);
        console.log("Form Submits")
    }
    render(){
        return (
            <div className="container">
                <form className="add-option" onSubmit={this.handleFormSubmission}>
                <input type="text" name="option" className="add-option__input"></input> 
                <button className="button">Add Option</button> 
                </form>
            </div>
        );
    }
}