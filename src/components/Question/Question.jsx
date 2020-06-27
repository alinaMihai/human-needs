import React from 'react';
import Options from '../Options/Options';

const Question = ({text, number, onAnswer, selected}) => {
    const handleChooseOption = (e) => {
        const {value} = e.target;
        return onAnswer(value)
    }
    return (
        <div>
            {number}. {text}
            <Options id={number} onAnswer={handleChooseOption} selected={selected}/>
        </div>
    );
};


export default Question;