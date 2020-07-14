import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './OptionsList';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleIndividualDelete = this.handleIndividualDelete.bind(this);
        this.handleModalPop = this.handleModalPop.bind(this);
        this.state = {
            options: props.options,
            selectedOption: undefined
        }
    }
    componentDidMount(){
        const json = localStorage.getItem("optionsJson");
        const options = JSON.parse(json);
        if(options){
            this.setState(() => ({options}));
        }
    }
    componentDidUpdate(prevProps , prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("optionsJson" , json);
            console.log("Components updating!");
        }
    }
    componentWillUnmount(){
        console.log("Component Unmounted!");
    }
    handleDeleteOptions(){
        this.setState(() => ({options: []}));
    }
    handlePick(){
        const random = Math.floor(Math.random() * this.state.options.length);
        this.setState(() => ({
            selectedOption: this.state.options[random]
        }));
    }
    handleAdd(option){
        if(!option){
            alert("Enter Valid Option");
            return;
        }
        else if(this.state.options.indexOf(option) > -1){
            alert("Option Exists Already!");
            return;
        }
        this.setState((prevState) => ({options: prevState.options.concat([option])}));
    }
    handleIndividualDelete(optionToRemove){
        this.setState((prevState) => ({options: prevState.options.filter((option) => {
            return (optionToRemove !== option);
        })}));
    }
    handleModalPop(){
        this.setState(() => ({
            selectedOption: undefined
        }));
    }
    render(){
        return (
            <div>
                <Header subtitle="Keep your life in the hands of computer" />
                <div className="container">
                    <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
                    <div className="widget">
                        <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} handleOptionDelete={this.handleIndividualDelete}/>
                        <AddOption handleAdd = {this.handleAdd}/>
                    </div>
                </div>
                <OptionModal selectedOption={this.state.selectedOption} handlePop={this.handleModalPop}/>
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
}

Header.defaultProps = {
    title: "Indecision",
}

export default IndecisionApp;