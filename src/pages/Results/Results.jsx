import React, {useEffect, useState, useCallback} from 'react';
import {interpretAnswers} from '../../helpers/interpretAnswers';
import needs from '../../data/needs.json';
import './Results.css';
import ResultsChart from './ResultsChart/ResultsChart';

const answersData = JSON.parse(localStorage.getItem('answers'));

const Results = () => {
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
                <h1 className="section"> Your first need is for {firstNeed.name}</h1>
                <div className="title">YOUR BELIEFS</div>
                <div>{firstNeed.beliefs}</div>
                <div className="title">How this Belief Serves You</div>
                <div className="content">{firstNeed.benefits}</div>
                <div className={"title"}>The Principles You Lost Sight Of</div>
                <div>{firstNeed.risks}</div>
                <div className={"title"}>The Consequences of Losing Sight of This Principle</div>
                <div className="content">{firstNeed.consequences}</div>   
                <h2 className="section">Character</h2>
                {[  {name: 'Focus', value: firstNeed.character.focus},
                    {name: "Energy", value: firstNeed.character.energy},
                    { name: "Health", value: firstNeed.character.health},
                    { name: "What You Avoid", value: firstNeed.character.avoidance},
                    { name: "Strengths", value: firstNeed.character.strengths},
                    { name: "Communication Style", value: firstNeed.character.communicationStyle},
                    { name: "Stress", value: firstNeed.character.stress},
                    { name: "Defensiveness", value: firstNeed.character.defensiveness},
                    {name: "Emotions", value: firstNeed.character.emotions}
                    
                ].map((item, i) => (
                <div key={i}><div className="title">{item.name}</div><div className="content">{item.value}</div></div>
                ))} 
                <h3 className="section">Growth and Balance</h3>
                {[{name: "Your Goal", value: firstNeed.growthBalance.goal},
                  {name: "What To Do", value: firstNeed.growthBalance.do}, 
                  {name: "What Interferes with Your Goal", value: firstNeed.growthBalance.obstacles}, 
                  {name: "How Others Can Support You In Your Goal", value: firstNeed.growthBalance.support}]
                .map((item, i) => <div key={i}><div className="title">{item.name}</div><div>{item.value}</div></div>)}

                <h4 className="section">Your Second Need is for {secondNeedData.name}</h4>
                <div>{secondNeedData.text}</div> 
                {secondNeedData.couples.length > 0 && <><h5 className="section">Couples by First Two Needs</h5>
                {secondNeedData.couples.map((couple, i) => (<div key={i} className="couple">
                    <div className="title">If your first two needs are for <strong>{firstNeed.name}</strong> and <strong>{secondNeedData.name}</strong> and your partner's first two needs are for <strong>{couple.name}</strong>
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
    }, [getDisplayResults]);

    return (
        <div className="resultsContainer">
            <h1>Here is the Interpretation of your answers</h1>
            <div className="chart">
            <ResultsChart series={chartSeries}/>
            </div> 
            <div className="numbers">
                {[...answers].sort((a, b) => {
            return b.value - a.value
        }).map((answer, i) => (
                    <div key={i} className="need">
                        <strong>{answer.name}: </strong><span>{answer.value}</span>
                    </div>
                ))} 
            </div>
            {results}
        </div>
    );
};

export default Results;