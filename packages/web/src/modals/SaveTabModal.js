import React from 'react';
import { changeTab } from '../utility/common';
import { useOpenedTabs, useSetOpenedTabs } from '../utility/globalState';
import keycodes from '../utility/keycodes';
import SaveFileModal from './SaveFileModal';

export default function SaveTabModal({ data, folder, format, modalState, tabid, tabVisible }) {
  const setOpenedTabs = useSetOpenedTabs();
  const openedTabs = useOpenedTabs();

  const name = openedTabs.find((x) => x.tabid == tabid).title;
  const onSave = (name) => changeTab(tabid, setOpenedTabs, (tab) => ({ ...tab, title: name }));

  const handleKeyboard = React.useCallback(
    (e) => {
      if (e.keyCode == keycodes.s && e.ctrlKey) {
        e.preventDefault();
        modalState.open();
      }
    },
    [modalState]
  );

  React.useEffect(() => {
    if (tabVisible) {
      document.addEventListener('keydown', handleKeyboard);
      return () => {
        document.removeEventListener('keydown', handleKeyboard);
      };
    }
  }, [tabVisible, handleKeyboard]);

  return (
    <SaveFileModal data={data} folder={folder} format={format} modalState={modalState} name={name} onSave={onSave} />
  );
}