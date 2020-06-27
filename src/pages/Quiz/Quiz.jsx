import React from 'react';
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import QuestionSet from '../../components/QuestionSet/QuestionSet';


const Quiz = () => {
    const history = useHistory();
    const handleSubmit = (answers) => {
         localStorage.setItem('answers', JSON.stringify(answers));
         history.push("/results");
    };

    return ( <div>
        <header>
          The 6 Human Needs Test     
          <QuestionSet handleSubmit={handleSubmit} />
        </header> 
        </div>
    );
}

export default withRouter(Quiz);