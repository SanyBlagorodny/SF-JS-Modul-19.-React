import { createContext, PropsWithChildren, useState } from "react";
import { FormDataType } from "../../components/form/form";
import { FormContextType, FormDataContextResult, FormDataContextType, FormName } from "./types";

//TODO
/**
 * createContext ожидает значение по-умолчанию, и это должен быть не просто пустой объект, как сейчас
 * TypeScript подскажет, чего в этом объекте не хватает
 * нужно заполнить объект, с которым вызывается createContext, соответствующими полями
 */
export const FormDataContext = createContext<FormContextType>({
  saveFormData: () => undefined,
  getFormData: () => undefined,
  getAllForms: () => [],
  isIntroFormFilled: () => false,
});

export const FormDataContextWrapper = ({ children }: PropsWithChildren) => {
  const [forms, setFormsData] = useState<FormDataContextType>({});

  const saveFormData = (name: FormName, data: FormDataType) => {
    setFormsData(prev => ({ ...prev, [name]: data }));
  }

  const getFormData = (name: FormName): FormDataType | undefined => {
    return forms[name];
  };

  const getAllForms = (): FormDataContextResult => {
    return Array.from(Object.entries(forms));
  }

  const isIntroFormFilled = (): boolean => {
    const intro = forms[FormName.Introduction];
    if (!intro) return false;
    return Object.values(intro).some(v => Boolean(v));
  }

  return (
    <FormDataContext.Provider value={{ ...forms, saveFormData, getFormData, getAllForms, isIntroFormFilled }}>
      {children}
    </FormDataContext.Provider>
  );
}