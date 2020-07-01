import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {withRouter} from "react-router";
import QuestionSet from '../../components/QuestionSet/QuestionSet';
import { Line } from 'rc-progress';
import './Quiz.css';

const questionsCount = 84;

const Quiz = () => {
  const [progressPercentage, setProgressPercentage] = useState('0');
  const [color, setColor] = useState('#FE8C6A');
  const history = useHistory();

  const getProgressColor = (index) => {
    if(index < questionsCount/2) {
      return '#FE8C6A'; 
    } else if (index >= questionsCount/2 && index <= questionsCount/2 + 20) {
        return '#3FC7FA';
    } else {
      return '#85D262';
    }
  }

  const changeState = (index) => {
    const value = Math.ceil((index*100)/questionsCount);
    setProgressPercentage(value);
    setColor(getProgressColor(index));
  }
  const handleSubmit = (answers) => {
    localStorage.setItem('answers', JSON.stringify(answers));
    history.push("/results");
  };

  return (
    <div>
      <header>
        <h1>The 6 Human Needs Test</h1>
      </header>
      <main>
        <div className={'progressBar'}>
        Progress {progressPercentage} %
        </div>
        <Line percent={progressPercentage} strokeWidth="4" strokeColor={color} />
        <QuestionSet handleSubmit={handleSubmit} nextQuestion={changeState}/>
      </main>
    </div>
  );
}

export default withRouter(Quiz);