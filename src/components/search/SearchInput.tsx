'use client';

import { useEffect, useState } from 'react';
import { ISearchModel, ISortEnum } from '@/utils/types';
import RefreshButton from '../refresh-button/RefreshButton';
import SortSelect from '@/components/sort-select/SortSelect';

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  onRefresh,
  loading = false,
  refreshCooldown = 0,
  debounceDelay = 300,
  sortBy = ISortEnum.NAME,
  onSortChange,
}: ISearchModel) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [debounceDelay, inputValue, onChange, value]);

  return (
    <div className="flex items-center gap-2 justify-between mb-6">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-50"
        disabled={loading}
      />

      <div className="flex items-center gap-2">
        <SortSelect value={sortBy} onChange={onSortChange} loading={loading} />

        {onRefresh && (
          <RefreshButton onClick={onRefresh} loading={loading} cooldownLeft={refreshCooldown} />
        )}
      </div>
    </div>
  );
}
