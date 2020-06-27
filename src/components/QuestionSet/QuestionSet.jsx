import React, {useState } from 'react';
import Question from '../Question/Question';
import data from '../../data/questions.json';

const QuestionSet = ({handleSubmit}) => {
   const [answers, setAnswers] = useState({});
    const canSubmit = () => {
        const countAnswers = Object.keys(answers).length;
        return data.length !== countAnswers;
    }
    const handleChooseaAnswer = (number) => {
       return (value) => {
           setAnswers({...answers,[number]: value});
       }
    };
    return (
        <div>
            {data.map((question, index) => <Question 
            key={index}
            text={question}
            number={index+1}
            selected={answers[index+1]}
            onAnswer={handleChooseaAnswer(index+1)} 
             /> )}
            <button disabled={canSubmit()} onClick={() => handleSubmit(answers)}>See results</button>
        </div>
    );

};


export default QuestionSet;