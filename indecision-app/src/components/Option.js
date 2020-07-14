import React from 'react';
const Option = (props) => {
    return (
                <div className="option">
                {props.index}. {props.optionText} <button className="button--link" onClick={() => {
                props.handleOptionDelete(props.optionText)
                }}>Remove</button>
                </div>
    );
}

export default Option;