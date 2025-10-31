import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { FormLabel } from "./form-label";
import "./form.css";

export type FormOption = { label?: string, value: string };

export interface FormField<T extends "input" | "options" | "textarea"> {
  label: string;
  type: T;
  options?: T extends "options" ? FormOption[] : never;
  placeholder?: T extends "options" ? never : string;
  maxLength?: T extends "options" ? never : number;
}

export interface FormProps {
  fields: FormField<any>[];
  initialValues?: FormDataType;
  FooterComponent: (formData: FormDataType) => ReactNode;
}

export type FormDataType = { [key: string]: string };

const initFormState = (fields: FormField<any>[], initialValues?: FormDataType): FormDataType => {
  return (fields || []).reduce<FormDataType>((formState, _, index) => {
    formState[index] = initialValues?.[index] || "";
    return formState;
  }, {});
}

export const Form = ({ fields, FooterComponent, initialValues }: FormProps) => {
  const [formData, setData] = useState<FormDataType>(initFormState(fields, initialValues));

  useEffect(() => {
    setData(initFormState(fields, initialValues));
  }, [fields, initialValues]);

  if (!fields) {
    return null;
  }

  return (
    <div className="form">
      {fields.map(({ label, type, placeholder, options, maxLength }, index) => {
        const htmlFor = index.toString();
        const labelProps = { htmlFor, label, key: index };
        const commonProps = {
          placeholder,
          maxLength,
          id: htmlFor,
          value: formData[index],
          "data-testid": htmlFor,
          onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setData(prev => ({
            ...prev,
            [index]: e.target.value
          }))
        }

        if (type === "input") {
          return (
            <FormLabel {...labelProps}>
              <input {...commonProps} type="text" />
            </FormLabel>
          );
        }

        if (type === "textarea") {
          return (
            <FormLabel {...labelProps}>
              <textarea {...commonProps} />
            </FormLabel>
          );
        }

        if (type === "options") {
          return (
            <div className="form-options-group" key={index}>
              <FormLabel {...labelProps}>
                {options?.map?.(({ label, value }, optionIndex) => (
                  <span className="form-option" key={optionIndex}>
                  <input
                    type="radio"
                    id={htmlFor + optionIndex}
                    name={index.toString()}
                    checked={formData[index] === value}
                    onChange={() => setData(prev => ({ ...prev, [index]: value }))}
                  />
                  <label className="inline-label" htmlFor={htmlFor + optionIndex}>
                    {label || value}
                  </label>
                </span>
                ))}
              </FormLabel>
            </div>
          );
        }

        return null;
      })}

      {FooterComponent(formData)}
    </div>
  );
}