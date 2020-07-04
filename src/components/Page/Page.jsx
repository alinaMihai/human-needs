import React, {Suspense} from 'react';
import LanguageChange from '../LanguageChange/LanguageChange';
import './Page.css';

// loading component for suspense fallback
const Loader = () => (
    <div className="App">
      <div>loading...</div>
    </div>
  );

const Page = ({ children }) => {
    return ( 
    <Suspense fallback={<Loader />}>    
    <div className="pageContainer">
      <div className="changeLanguage"><LanguageChange/></div>
         <div className="content">{children}</div>
    </div>
    </Suspense>
    );
}


export default Page;