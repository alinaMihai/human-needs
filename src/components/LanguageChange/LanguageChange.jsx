import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import emojiSupport from 'detect-emoji-support';
import ReactFlagsSelect from 'react-flags-select';
//import css module
import 'react-flags-select/css/react-flags-select.css';
import './LanguageChange.css';

const storedLang = localStorage.getItem('i18nextLng');

const LanguageChange = () => {
    const [selectedLanguage,
        setSelectedLanguage] = useState(storedLang || 'US');
    const {t, i18n} = useTranslation();

    const changeLanguage = e => {
        let lng = '';
        if(typeof e === 'string') {
           lng = e;
        } else {
              lng = e.target.value;
        }
        i18n.changeLanguage(lng);
        setSelectedLanguage(lng);
    }

    const displaySelect = () => {
        if (emojiSupport()) {
            return  <ReactFlagsSelect
            countries={["US", "RO"]}
            customLabels={{"EN": "RO"}}
            defaultCountry={selectedLanguage.toLocaleUpperCase()}
            showSelectedLabel={true}
            showOptionLabel={true}
            selectedSize={18}
            optionsSize={14}
            onSelect={changeLanguage} 
            />
    } else {
        return <select value={selectedLanguage} onChange={changeLanguage}><option value = "en" > English </option>
            <option value="ro">Română</option > </select>
    }
}

return (
    <div className="languageChangeContainer">
        <span>{t('languageChange')}</span>{displaySelect()}
    </div>
);
};

export default LanguageChange;