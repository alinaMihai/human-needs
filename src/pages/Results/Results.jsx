import React, {useEffect} from 'react';
import {interpretAnswers} from '../../helpers/interpretAnswers';

const Results = () => {
    
    useEffect(() => {
        const answers = JSON.parse(localStorage.getItem('answers'));
        const results = interpretAnswers(answers);
        console.log(results);
    }, []);

    return (
        <div>
            Hello Results
        </div>
    );
};

export default Results;