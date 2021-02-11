import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import './Options.css';
const Options = ({onAnswer, selected, id}) => {
    const {t} = useTranslation();
    const [selectedValue,
        setSelectedValue] = useState();

    useEffect(() => {
        setSelectedValue(selected);
    }, [id, selected]);
    return (
        <div id={id} className="optionsContainer">
            <label><input
                type='radio'
                value={10}
                name={id}
                checked={selectedValue === '10'}
                onChange={onAnswer}/>
                <span>{t('translation:optionYes')}</span>
            </label>
            <label><input
                type='radio'
                value={5}
                name={id}
                checked={selectedValue === '5'}
                onChange={onAnswer}/>
                <span>{t('translation:optionPartly')}</span>
            </label>
            <label><input
                type='radio'
                value={0}
                name={id}
                checked={selectedValue === '0'}
                onChange={onAnswer}/>
                <span>{t('translation:optionNo')}</span>
            </label>
        </div>
    );
};

export default Options;