/** @format */

import { useState, createContext } from 'react';

import { type_theme_values } from '../models/theme';

interface IUiContextType {
  modalActive: boolean;
  closeModal: () => void;
  theme: type_theme_values;
  changeTheme: (newTheme: type_theme_values) => void;
}

export const UiContext = createContext({} as IUiContextType);

interface IUiContextProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

export const UiContextProvider = (props: IUiContextProviderProps) => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [theme, setTheme] = useState<type_theme_values>('system');

  function closeModal() {
    setModalActive(false);
  }

  function changeTheme(newTheme: type_theme_values) {
    setTheme(newTheme);
  }

  const providerValue: IUiContextType = {
    modalActive,
    closeModal,
    theme,
    changeTheme,
  };

  return (
    <UiContext.Provider value={providerValue}>
      {props.children}
    </UiContext.Provider>
  );
};
