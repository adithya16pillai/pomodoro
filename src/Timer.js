import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Timer = (props) => {
    return (
        <div className = 'timer-container'>
            <h3>{props.title}</h3>
            <div className = 'set-timer actions'>
                <button onClick={props.handleDecrease}><FontAwesomeIcon icon={faMinus} /></button>
                <span>{props.count}</span>
                <button onClick={props.handleIncrease}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </div>
    );
};

export default Timer;