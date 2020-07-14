import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        onRequestClose={props.handlePop}
        contentLabel="Selected Option"
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="modal"
    >
        <h2 className="modal__title">Selected Option</h2>
        <p className="model__content">{props.selectedOption}</p>
        <button onClick={props.handlePop} className="button">Okay!</button>
    </Modal>
);

export default OptionModal;