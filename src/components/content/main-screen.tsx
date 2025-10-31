import { Form, FormDataType, FormField } from "../form/form";
import { STEPS } from "../../const";
import { useContext } from "react";
import { FormDataContext } from "../../context/form-data-context/form-data-context";
import { FormName } from "../../context/form-data-context/types";
import { useNavigate } from "react-router-dom";

const NAME_FIELD: FormField<"input"> = { type: "input", label: "Имя", maxLength: 20, placeholder: "Как вас зовут?" };
const EMAIL_FIELD: FormField<"input"> = {
  type: "input",
  label: "Email",
  maxLength: 40,
  placeholder: "Почта для связи"
};
const BUSINESS_FIELD: FormField<"textarea"> = {
  type: "textarea", label: "Род занятий", maxLength: 100, placeholder: "Кем работаете или где учитесь?"
};

//TODO
/**
 * внутри компонента MainScreen воспользоваться хуком для работы с контекстом FormDataContext,
 * а также хуками для работы с React Router
 * это позволит использовать весь закомментированный код и восстановить работу приложения
 */
export const MainScreen = () => {
  const { saveFormData, getFormData } = useContext(FormDataContext);
  const navigate = useNavigate();
  const onSave = (formData: FormDataType) => {
    /*раскомментировать этот код поможет использование контекста FormDataContext*/
    saveFormData(FormName.Introduction, formData);

    const path = STEPS[0].path;
    //TODO: с помощью навигации из React Router перейти на "path", в этой переменной уже лежит нужная часть URL
    navigate(path);
  }

  return (
    <div>
      <h2>Спасибо, что согласились принять участие в нашем опросе!</h2>

      <h4>Пожалуйста, представьтесь и расскажите немного о себе</h4>
      <Form
        fields={[NAME_FIELD, EMAIL_FIELD, BUSINESS_FIELD]}
        /*раскомментировать этот код поможет использование контекста FormDataContext*/
        initialValues={getFormData(FormName.Introduction)}
        FooterComponent={(formData) => (
          <button disabled={!Object.values(formData).some(v => v)} onClick={() => onSave(formData)}>
            Начать!
          </button>
        )}
      />
    </div>
  );
}