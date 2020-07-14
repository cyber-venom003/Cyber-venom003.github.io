
class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleIndividualDelete = this.handleIndividualDelete.bind(this);
        this.state = {
            options: props.options
        }
    }
    componentDidMount(){
        const json = localStorage.getItem("optionsJson");
        const options = JSON.parse(json);
        if(options){
            this.setState(() => ({options}));
        }
        console.log("My React App!");
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
        alert(this.state.options[random]);
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
    render(){
        return (
            <div>
                <Header subtitle="Keep your life in the hands of computer" />
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
                <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} handleOptionDelete={this.handleIndividualDelete}/>
                <AddOption handleAdd = {this.handleAdd}/>
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h3>{props.subtitle}</h3>}
        </div>
    );
}

Header.defaultProps = {
    title: "Indecision",
}

const Action = (props) => {
    return (
        <div>
            <button onClick={props.handlePick} disabled={!props.hasOptions}>
                What should I do?
            </button>
        </div>
    );
}

const Option = (props) => {
    return (
        <span>
            <li>{props.optionText} <button onClick={() => {
                props.handleOptionDelete(props.optionText)
            }}>Remove</button></li>
            
        </span>
    );
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            <p>Here are the options! Total Options : {props.options.length}</p>
            <ul>
                    {
                        props.options.map((option) => <Option key={option} optionText={option} handleOptionDelete={props.handleOptionDelete}/>)
                    }
            </ul>
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
    }
    handleFormSubmission(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        e.target.elements.option.value = "";
        this.props.handleAdd(option);
    }
    render(){
        return (
            <form onSubmit={this.handleFormSubmission}>
                <input type="text" name="option"></input> 
                &nbsp;
                <button>Add Option</button> 
            </form>
        );
    }
}

ReactDOM.render(<IndecisionApp /> , document.getElementById("Paragraph"));