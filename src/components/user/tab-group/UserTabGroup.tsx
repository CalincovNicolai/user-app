'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { tabs, TAB_KEY } from '@/utils/constants';
import { useEffect, useState } from 'react';

export default function UserTabGroup() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(TAB_KEY);
    if (saved !== null) {
      const index = parseInt(saved);
      if (!isNaN(index) && index >= 0 && index < tabs.length) {
        setSelectedIndex(index);
      }
    }
  }, []);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
    localStorage.setItem(TAB_KEY, index.toString());
  };

  return (
    <div className="mx-auto px-4 py-8">
      <TabGroup selectedIndex={selectedIndex} onChange={handleTabChange} className="w-full">
        <TabList className="w-full flex gap-2 bg-gray-100 p-1 rounded-lg shadow-inner flex-wrap xl:flex-nowrap">
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              className={({ selected }) =>
                clsx(
                  'w-full px-4 py-2 text-xl lg:text-sm font-medium rounded-md focus:outline-none transition-all',
                  selected
                    ? 'bg-white shadow text-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white/60',
                )
              }
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.label}>{tab.component}</TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
