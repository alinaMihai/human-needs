import React, {useEffect, useState, useCallback} from 'react';
import {interpretAnswers} from '../../helpers/interpretAnswers';
import needs from '../../data/needs.json';

const Results = () => {
    const [results, setResults] = useState();
    const getFirstTwoNeeds = (results) => {
        const [firstNeed, secondNeed] = results.sort((a, b) => {
            return b.value - a.value
        });
        return {
            firstNeed: needs.find(need => need.id === firstNeed.id),
            secondNeed: secondNeed.id
        }
    }

    const getDisplayResults = useCallback((answers) => {
        const {firstNeed, secondNeed} = getFirstTwoNeeds(answers);
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
           <><h4>{couple.name}</h4>
        <h4>{couple.text}</h4></> 
        ))}</h4>
        </div>
        );
    }, []);
    
    useEffect(() => {
        const answers = JSON.parse(localStorage.getItem('answers'));
        setResults(getDisplayResults(interpretAnswers(answers)));
    }, [getDisplayResults]);

    return (
        <div>
            Hello Results
            {results}
        </div>
    );
};

export default Results;