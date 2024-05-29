'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { FormElementInstance } from './FormElements';

type FormContextType = {
  elements: FormElementInstance[];
  setElements: Dispatch<SetStateAction<[] | FormElementInstance[]>>;
  addElement: (index: number, element: FormElementInstance) => void;

  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;

  removeElement: (id: string) => void;
  updateElement: (id: string, element: FormElementInstance) => void;
};

export const FormContext = createContext<FormContextType | null>(null);

const FormContextProvider = ({ children }: { children: ReactNode }) => {
  const [elements, setElements] = useState<FormElementInstance[] | []>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  const addElement = (index: number, element: FormElementInstance) => {
    setElements(prev => {
      const newElement = [...prev];
      newElement.splice(index, 0, element);
      return newElement;
    });
  };

  const removeElement = (id: string) => {
    setElements(prev => prev.filter(element => element.id !== id));
  };

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements(prev => {
      const elements = [...prev];
      const index = elements.findIndex(el => el.id === id);
      elements[index] = element;

      return elements;
    });
  };

  return (
    <FormContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        selectedElement,
        setSelectedElement,
        updateElement,
        removeElement,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('Must be use inside context provider');

  return context;
};
