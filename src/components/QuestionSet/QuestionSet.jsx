import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import './QuestionSet.css';
import Question from '../Question/Question';
const questionsNo = 84;

const QuestionSet = ({handleSubmit, onNextQuestion}) => {
    const {t} = useTranslation();
    const data = t('questions:questions');
    const [answers,
        setAnswers] = useState({});
    const [currentQuestion,
        setCurrentQuestion] = useState(data[0]);
    const [currentIndex,
        setCurrentIndex] = useState(1);
    const handleChooseAnswer = (number) => {
        return (value) => {
            setAnswers({
                ...answers,
                [number]: value
            });
        }
    };

    const goNext = () => {
        if (currentIndex < questionsNo) {
            setCurrentIndex(currentIndex + 1);
            setCurrentQuestion(data[currentIndex - 1 + 1]);
            onNextQuestion(currentIndex);
        }
    }

    const goPrev = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            setCurrentQuestion(data[newIndex - 1]);
        }
    }

    const isNextDisabled = () => {
        return !answers[currentIndex] || currentIndex > questionsNo;
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
                onAnswer={handleChooseAnswer(currentIndex)}/>
            <div className='nav'>
                <button
                    type="button"
                    className="prevBtn"
                    onClick={goPrev}
                    disabled={isPrevDisabled()}>
                    {t('translation:previous')}
                </button>
                {currentIndex < questionsNo && <button
                    type="button"
                    className="nextBtn"
                    onClick={goNext}
                    disabled={isNextDisabled()}>
                    {t('translation:next')}
                </button>
}
                {currentIndex === questionsNo && <button
                    type="button"
                    disabled={isSubmitDisabled()}
                    onClick={() => handleSubmit(answers)}>
                    {t('translation:seeResults')}
                </button>
}
            </div>
        </div>
    );
};

export default QuestionSet;