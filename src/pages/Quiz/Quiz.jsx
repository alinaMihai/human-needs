import React, {useState} from 'react';
import {useHistory, withRouter} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import QuestionSet from '../../components/QuestionSet/QuestionSet';
import { Line } from 'rc-progress';
import './Quiz.css';

const questionsCount = 84;

const Quiz = () => {
  const {t} = useTranslation();
  const [progressPercentage, setProgressPercentage] = useState('0');
  const [showTest, setShowTest] = useState(false);
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

  const onShowTest = () => {
    setShowTest(true);
  }

  return (
    <div>
      <header>
  <h1>{t('translation:title')}</h1>
      </header>
      <main>
        {!showTest && <span className="subtitle">
        {t('translation:subtitle')}
        <p>{t('translation:startTest')} <button onClick={onShowTest}>Start</button></p> 
        </span>}
        {showTest && <div className={'test'}>
          <div className={'progressBar'}>
          {t('translation:progress')} {progressPercentage} %
          </div>
          <Line percent={progressPercentage} strokeWidth="4" strokeColor={color} />
          <QuestionSet handleSubmit={handleSubmit} nextQuestion={changeState}/>
        </div>}
      </main>
    </div>
  );
}

export default withRouter(Quiz);