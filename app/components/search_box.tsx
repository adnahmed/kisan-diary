import React, {FC, useRef, useState} from 'react';
import './SearchBox.scss';

interface SearchBoxProps {
}

const SearchBox: FC<SearchBoxProps> = (props) => {
    const [value, setValue] = useState('');
    const handleChange = event => {
        setValue(event.target.value)
    }
    return (
        <div className="Search">
            <input type="search" value={value} className="SearchBox" onChange={handleChange}/>
            <span className="SearchForeground">
                Search
            </span>
        </div>
    );
}

export default SearchBox;