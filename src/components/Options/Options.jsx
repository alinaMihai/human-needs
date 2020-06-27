import React, {useState, useEffect} from 'react';

const Options = ({onAnswer, selected, id}) => {
    const [selectedValue,
        setSelectedValue] = useState();

    useEffect(() => {
        setSelectedValue(selected);
    }, [id, selected]);
    return (
        <div id={id}>
            <label><input
                type='radio'
                value={10}
                name={id}
                checked={selectedValue === '10'}
                onChange={onAnswer}/>
                Yes</label>
            <label><input
                type='radio'
                value={5}
                name={id}
                checked={selectedValue === '5'}
                onChange={onAnswer}/>
                Partly</label>
            <label><input
                type='radio'
                value={0}
                name={id}
                checked={selectedValue === '0'}
                onChange={onAnswer}/>
                No</label>
        </div>
    );
};

export default Options;