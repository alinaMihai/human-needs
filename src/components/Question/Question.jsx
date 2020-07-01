import React from 'react';
import Options from '../Options/Options';
import './Question.css';
const Question = ({text, number, onAnswer, selected}) => {
    const handleChooseOption = (e) => {
        const {value} = e.target;
        return onAnswer(value)
    }
    return (
        <div className="questionContainer">
            <div className="questionText">{number}. {text}</div>
            <Options id={number} onAnswer={handleChooseOption} selected={selected}/>
        </div>
    );
};


export default Question;