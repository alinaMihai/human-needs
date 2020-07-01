import React, {useState } from 'react';
import 'rc-progress/assets/index.css';
import './QuestionSet.css';
import Question from '../Question/Question';
import data from '../../data/questions.json';

const QuestionSet = ({handleSubmit, nextQuestion}) => {
   const [answers, setAnswers] = useState({});
   const [currentQuestion, setCurrentQuestion] = useState(data[0]);
   const [currentIndex, setCurrentIndex] = useState(1);
    const handleChooseaAnswer = (number) => {
       return (value) => {
           setAnswers({...answers,[number]: value});
       }
    };

    const goNext = () => {
        if(currentIndex < data.length) {
            setCurrentIndex(currentIndex+1);
            setCurrentQuestion(data[currentIndex - 1 + 1]);
            nextQuestion(currentIndex);
        }
    }

    const goPrev = () => {
        if(currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            setCurrentQuestion(data[newIndex - 1]);
        }
    }

    const isNextDisabled = () => {
        return !answers[currentIndex] || currentIndex > data.length;
    }
    const isPrevDisabled = () => {
        return currentIndex - 2 < 0;
    }

    const isSubmitDisabled = () => {
        return !answers[currentIndex];
    }

    return (
        <div className="questionSetContainer">
            <Question 
            text={currentQuestion}
            number={currentIndex}
            selected={answers[currentIndex]}
            onAnswer={handleChooseaAnswer(currentIndex)} 
            />
            <div className='nav'>
            <button type="button" className="prevBtn" onClick={goPrev} disabled={isPrevDisabled()}>
              Previous
            </button>
             {currentIndex < data.length && <button type="button" className="nextBtn" onClick={goNext} disabled={isNextDisabled()}>
              Next
            </button>}
            {currentIndex === data.length && <button type="button" disabled={isSubmitDisabled()} onClick={() => handleSubmit(answers)}>See results</button>}
            </div>
        </div>
    );
};


export default QuestionSet;