import React, {useEffect, useState, useCallback} from 'react';
import {interpretAnswers} from '../../helpers/interpretAnswers';
import needs from '../../data/needs.json';
import ResultsChart from './ResultsChart/ResultsChart';

const answersData = JSON.parse(localStorage.getItem('answers'));

const Results = () => {
    const [results, setResults] = useState();
    const [answers, setAnswers] = useState([]);
    const [chartSeries, setChartSeries] = useState([]);
    const getFirstTwoNeeds = (results = []) => {
        const [firstNeed, secondNeed] = [...results].sort((a, b) => {
            return b.value - a.value
        });
        return {
            firstNeed: needs.find(need => need.id === firstNeed.id),
            secondNeed: secondNeed.id
        }
    }


    useEffect(() => {
      if(!answers.length) {
          return;
      }
        setChartSeries(answers.map((answer) => {
          return answer.value
        }));
    }, [answers]);

    const getDisplayResults = useCallback((answers) => {
        if(!answers.length) {
            return;
        }
        const {firstNeed = {}, secondNeed} = getFirstTwoNeeds(answers);
        const secondNeedData = !!firstNeed.secondNeed ? firstNeed.secondNeed.find(need=> need.id === secondNeed) : {};
        return (
        <div>
        <h1>{firstNeed.name}</h1>
        <h4>{firstNeed.beliefs}</h4>
        <h4>{firstNeed.risks}</h4>
        <h4>{firstNeed.consequences}</h4>
        <h2>Character</h2>
        <h4>{firstNeed.character.focus}</h4>
        <h4>{firstNeed.character.energy}</h4>
        <h4>{firstNeed.character.health}</h4>
        <h4>{firstNeed.character.avoidance}</h4>
        <h4>{firstNeed.character.strengths}</h4>
        <h4>{firstNeed.character.communicationStyle}</h4>
        <h4>{firstNeed.character.stress}</h4>
        <h4>{firstNeed.character.defensiveness}</h4>
        <h4>{firstNeed.character.emotions}</h4>
        <h2>Growth and Balance</h2>
        <h4>{firstNeed.growthBalance.goal}</h4>
        <h4>{firstNeed.growthBalance.do}</h4>
        <h4>{firstNeed.growthBalance.obstacles}</h4>
        <h4>{firstNeed.growthBalance.support}</h4>
        <h2>Second Need</h2>
        <h4>{secondNeedData.name}</h4>
        <h4>{secondNeedData.text}</h4>
        <h2>Couples</h2>
        <h4>{secondNeedData.couples.map(couple => (
           <><div>{couple.name}</div>
        <div>{couple.text}</div></> 
        ))}</h4>
        </div>
        );
    }, []);
    
    useEffect(() => {       
        const interpretedAnswers = interpretAnswers(answersData);
        setAnswers(interpretedAnswers);
        setResults(getDisplayResults(interpretedAnswers));
    }, [getDisplayResults]);

    return (
        <div>
        <h1>Results</h1>    
        <ResultsChart series={chartSeries}/>    
        {results}
        </div>
    );
};

export default Results;