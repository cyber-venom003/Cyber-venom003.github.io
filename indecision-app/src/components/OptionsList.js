import React from 'react';
import Option from './Option';

const Options = (props) => {
    return (
        <div>
            <div className="widget-header">
                <h3 className="widget-header__title">Your Options: {props.options.length}</h3>
                <button className="button--link" onClick={props.handleDeleteOptions}>Remove All</button>
            </div>
            {props.options.length === 0 && <div className="widget__subtitle">
                <p>Please add your options</p>
            </div>}
            <ol>
                    {
                        props.options.map((option , index) => <Option key={option} index={index+1} optionText={option} handleOptionDelete={props.handleOptionDelete}/>)
                    }
            </ol>
        </div>
    );
}

export default Options;