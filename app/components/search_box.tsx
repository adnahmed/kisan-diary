import React, { FC, useState } from 'react';

interface SearchBoxProps {}

const SearchBox: FC<SearchBoxProps> = (props) => {
    const [value, setValue] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    return (
        <div className="relative w-full max-w-md group">
            <input 
                type="search" 
                value={value} 
                onChange={handleChange}
                placeholder="Search..."
                className="w-full px-4 py-2 pl-10 rounded-full border border-surface-300 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-transparent focus:placeholder-surface-400 peer text-surface-900"
            />
             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-surface-400 peer-focus:text-primary-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <span className="absolute left-10 top-2 text-surface-500 text-sm transition-all peer-focus:opacity-0 peer-not-placeholder-shown:opacity-0 pointer-events-none">
                Search
            </span>
        </div>
    );
}

export default SearchBox;