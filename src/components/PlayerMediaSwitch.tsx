import clsx from 'clsx';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import React from 'react';
import useNavigate from '../hooks/useNavigate';
import { PlayerType } from '../store/models/Player';
import { useMst } from '../store/store';

const tabs = [
  { name: 'YouTube', value: PlayerType.YOUTUBE },
  { name: 'Local Media', value: PlayerType.LOCAL }
];

function PlayerMediaSwitch() {
  const { navigate } = useNavigate();
  const { playerInfo } = useMst();

  const handleChangeTab = (item: typeof tabs[0]) => {
    playerInfo.setType(item.value);
    navigate(`/${item.value.toLowerCase()}`);
  };

  return (
    <nav className="flex space-x-3">
      {tabs.map((tab, i) => {
        const selected = tab.value === playerInfo.type;

        return (
          <button
            key={tab.name}
            onClick={() => handleChangeTab(tab)}
            className={clsx(
              selected
                ? 'text-brand-600 dark:text-brand-500'
                : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-300',
              'relative whitespace-nowrap p-1 font-medium text-xs transition-colors duration-200'
            )}
          >
            <span>{tab.name}</span>

            {selected && (
              <motion.div
                className="bg-blue-500 absolute bottom-[-1px] left-0 right-0 h-[2px]"
                layoutId="underline"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

export default observer(PlayerMediaSwitch);
