import React, {useEffect, useState, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {interpretAnswers} from '../../helpers/interpretAnswers';
import './Results.css';
import ResultsChart from './ResultsChart/ResultsChart';



const Results = () => {
  const {t} = useTranslation();
  const needs = t('needs:needs');
    const [answersData, setAnswersData] = useState({});
    const [results,
        setResults] = useState();
    const [answers,
        setAnswers] = useState([]);
    const [chartSeries,
        setChartSeries] = useState([]);
    const getFirstTwoNeeds = (results = []) => {
        const [firstNeed,
            secondNeed] = [...results].sort((a, b) => {
            return b.value - a.value
        });
        return {
            firstNeed: needs.find(need => need.id === firstNeed.id),
            secondNeed: secondNeed.id
        }
    }

    useEffect(() => {
       setAnswersData(JSON.parse(localStorage.getItem('answers')));
    }, []);

    useEffect(() => {
        if (!answers.length) {
            return;
        }
        setChartSeries(answers.map((answer) => {
            return answer.value
        }));
    }, [answers]);

    const getDisplayResults = useCallback((answers) => {
        if (!answers.length) {
            return;
        }
        const {
            firstNeed = {},
            secondNeed
        } = getFirstTwoNeeds(answers);
        const secondNeedData = !!firstNeed.secondNeed
            ? firstNeed
                .secondNeed
                .find(need => need.id === secondNeed)
            : {};
        return (
            <div>
                <h1 className="section"> {t('translation:results.firstNeed')} {firstNeed.name}</h1>
                <div className="title">{t('translation:results.beliefs')}</div>
                <div>{firstNeed.beliefs}</div>
        <div className="title">{t('translation:results.benefits')}</div>
                <div className="content">{firstNeed.benefits}</div>
                <div className={"title"}>{t('translation:results.risks')}</div>
                <div>{firstNeed.risks}</div>
                <div className={"title"}>{t('translation:results.consequences')}</div>
                <div className="content">{firstNeed.consequences}</div>   
                <h2 className="section">{t('translation:results.character.title')}</h2>
                {[  {name: t('translation:results.character.focus'), value: firstNeed.character.focus},
                    {name: t('translation:results.character.energy'), value: firstNeed.character.energy},
                    { name: t('translation:results.character.health'), value: firstNeed.character.health},
                    { name: t('translation:results.character.avoidance'), value: firstNeed.character.avoidance},
                    { name: t('translation:results.character.strengths'), value: firstNeed.character.strengths},
                    { name: t('translation:results.character.communicationStyle'), value: firstNeed.character.communicationStyle},
                    { name: t('translation:results.character.stress'), value: firstNeed.character.stress},
                    { name: t('translation:results.character.defensiveness'), value: firstNeed.character.defensiveness},
                    {name: t('translation:results.character.emotions'), value: firstNeed.character.emotions}
                    
                ].map((item, i) => (
                <div key={i}><div className="title">{item.name}</div><div className="content">{item.value}</div></div>
                ))} 
                <h3 className="section">{t('translation:results.growthBalance.title')}</h3>
                {[{name: t('translation:results.growthBalance.goal'), value: firstNeed.growthBalance.goal},
                  {name:  t('translation:results.growthBalance.do'), value: firstNeed.growthBalance.do}, 
                  {name:  t('translation:results.growthBalance.obstacles'), value: firstNeed.growthBalance.obstacles}, 
                  {name:  t('translation:results.growthBalance.support'), value: firstNeed.growthBalance.support}]
                .map((item, i) => <div key={i}><div className="title">{item.name}</div><div>{item.value}</div></div>)}

                <h4 className="section">{t('translation:results.secondNeedTitle')} {secondNeedData.name}</h4>
                <div>{secondNeedData.text}</div> 
                {secondNeedData.couples.length > 0 && <><h5 className="section">{t('translation:results.couples.title')}</h5>
                {secondNeedData.couples.map((couple, i) => (<div key={i} className="couple">
                    <div className="title">{t('translation:results.couples.para1')} <strong>{firstNeed.name}</strong> {t('translation:results.couples.para2')} <strong>{secondNeedData.name}</strong> {t('translation:results.couples.para3')} <strong>{couple.name}</strong>
                </div><div>{couple.text}</div>
                
                </div>))}
                </>}
            </div>
        );
    }, []);

    useEffect(() => {
        const interpretedAnswers = interpretAnswers(answersData);
        setAnswers(interpretedAnswers);
        setResults(getDisplayResults(interpretedAnswers));
    }, [getDisplayResults, answersData]);

    return (
        <div className="resultsContainer">
            <h1>{t('translation:results.title')}</h1>
            <div className="chart">
            {t('translation:results.subtitle')}
            <ResultsChart series={chartSeries}/>
            </div> 
            <div className="numbers">
                {t('translation:results.subtitle')}
                {[...answers].sort((a, b) => {
            return b.value - a.value
        }).map((answer, i) => (
                    <div key={i} className="need">
                        <strong>{answer.name}: </strong><span>{answer.value} / 140</span>
                    </div>
                ))} 
            </div>
            {results}
            <footer>
             <br/>
            <a href=" https://cloemadanes.com/" target="_blank" title="Cloé Madanes's site" rel="noopener noreferrer" ><strong>Cloé Madanes</strong></a> {t('translation:results.credit')}
            </footer>
        </div>
    );
};

export default Results;