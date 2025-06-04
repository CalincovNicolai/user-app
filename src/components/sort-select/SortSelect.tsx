'use client';

import { ISortSelectModel } from '@/utils/types';
import { Field, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { sortOptions } from '@/utils/constants';

export default function SortSelect({ value, onChange, loading = false }: ISortSelectModel) {
  return (
    <Field disabled={loading}>
      <Listbox value={value} onChange={onChange}>
        <div className="relative w-44 text-sm">
          <ListboxButton className="w-full px-3 py-1.5 border border-gray-300 rounded-md bg-white flex justify-between items-center shadow-sm">
            <span>{sortOptions.find((opt) => opt.value === value)?.label}</span>
            <ChevronUpDownIcon className="w-4 h-4 text-gray-400" />
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            {sortOptions.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className={({ focus }) =>
                  `cursor-pointer px-4 py-2 ${focus ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`
                }
              >
                {({ selected }) => (
                  <div className="flex justify-between items-center">
                    <span>{option.label}</span>
                    {selected && <CheckIcon className="w-4 h-4 text-blue-600" />}
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </Field>
  );
}
