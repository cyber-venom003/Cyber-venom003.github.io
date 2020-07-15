"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAdd = _this.handleAdd.bind(_this);
        _this.handleIndividualDelete = _this.handleIndividualDelete.bind(_this);
        _this.state = {
            options: props.options
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var json = localStorage.getItem("optionsJson");
            var options = JSON.parse(json);
            if (options) {
                this.setState(function () {
                    return { options: options };
                });
            }
            console.log("My React App!");
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem("optionsJson", json);
                console.log("Components updating!");
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            console.log("Component Unmounted!");
        }
    }, {
        key: "handleDeleteOptions",
        value: function handleDeleteOptions() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: "handlePick",
        value: function handlePick() {
            var random = Math.floor(Math.random() * this.state.options.length);
            alert(this.state.options[random]);
        }
    }, {
        key: "handleAdd",
        value: function handleAdd(option) {
            if (!option) {
                alert("Enter Valid Option");
                return;
            } else if (this.state.options.indexOf(option) > -1) {
                alert("Option Exists Already!");
                return;
            }
            this.setState(function (prevState) {
                return { options: prevState.options.concat([option]) };
            });
        }
    }, {
        key: "handleIndividualDelete",
        value: function handleIndividualDelete(optionToRemove) {
            this.setState(function (prevState) {
                return { options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    }) };
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Header, { subtitle: "Keep your life in the hands of computer" }),
                React.createElement(Action, { hasOptions: this.state.options.length > 0, handlePick: this.handlePick }),
                React.createElement(Options, { options: this.state.options, handleDeleteOptions: this.handleDeleteOptions, handleOptionDelete: this.handleIndividualDelete }),
                React.createElement(AddOption, { handleAdd: this.handleAdd })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
    options: []
};

var Header = function Header(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            "h3",
            null,
            props.subtitle
        )
    );
};

Header.defaultProps = {
    title: "Indecision"
};

var Action = function Action(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            { onClick: props.handlePick, disabled: !props.hasOptions },
            "What should I do?"
        )
    );
};

var Option = function Option(props) {
    return React.createElement(
        "span",
        null,
        React.createElement(
            "li",
            null,
            props.optionText,
            " ",
            React.createElement(
                "button",
                { onClick: function onClick() {
                        props.handleOptionDelete(props.optionText);
                    } },
                "Remove"
            )
        )
    );
};

var Options = function Options(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            { onClick: props.handleDeleteOptions },
            "Remove All"
        ),
        React.createElement(
            "p",
            null,
            "Here are the options! Total Options : ",
            props.options.length
        ),
        React.createElement(
            "ul",
            null,
            props.options.map(function (option) {
                return React.createElement(Option, { key: option, optionText: option, handleOptionDelete: props.handleOptionDelete });
            })
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleFormSubmission = _this2.handleFormSubmission.bind(_this2);
        return _this2;
    }

    _createClass(AddOption, [{
        key: "handleFormSubmission",
        value: function handleFormSubmission(e) {
            e.preventDefault();
            var option = e.target.elements.option.value.trim();
            e.target.elements.option.value = "";
            this.props.handleAdd(option);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.handleFormSubmission },
                React.createElement("input", { type: "text", name: "option" }),
                "\xA0",
                React.createElement(
                    "button",
                    null,
                    "Add Option"
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById("Paragraph"));
