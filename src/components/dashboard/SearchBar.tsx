'use client';

import { debounce } from '@/lib/functions';
import { useState, useCallback } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const SearchBar = ({ onSearch, initialValue = '' }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="max-w-lg">
      <input
        type="search"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBar;
