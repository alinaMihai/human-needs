import React, {useState} from 'react';
import {useHistory, withRouter} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import QuestionSet from '../../components/QuestionSet/QuestionSet';
import {Line} from 'rc-progress';
import './Quiz.css';

const questionsCount = 84;
const colorMap = {
  start: '#FE8C6A',
  middle: '#3FC7FA',
  finish: '#85D262'
}

const getProgressColor = (index, total = questionsCount, colors = colorMap) => {
  if (index < total / 2) {
    return colors.start;
  } else if (index >= total / 2 && index <= total / 2 + 20) {
    return colors.middle;
  } else {
    return colors.finish;
  }
}

const getPercentage = (index, total = questionsCount) => {
  return Math.ceil((index * 100) / total);
}

const Quiz = () => {
  const {t} = useTranslation();
  const history = useHistory();
  const [progressPercentage,
    setProgressPercentage] = useState('0');
  const [showTest,
    setShowTest] = useState(false);
  const [color,
    setColor] = useState(colorMap.start);

  const changeState = (index) => {
    setProgressPercentage(getPercentage(index));
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
          <p>{t('translation:startTest')} {" "}
            <button onClick={onShowTest}>Start</button>
          </p>
        </span>}
        {showTest && <div className={'test'}>
          <div className={'progressBar'}>
            {t('translation:progress')}
            {progressPercentage}
            %
          </div>
          <Line percent={progressPercentage} strokeWidth="4" strokeColor={color}/>
          <QuestionSet handleSubmit={handleSubmit} onNextQuestion={changeState}/>
        </div>}
      </main>
    </div>
  );
}

export default withRouter(Quiz);