import { FINISH_SCREEN_PATH, STEPS } from "../../const";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { StepComponent } from "./step";
import { MainScreen } from "./main-screen";
import { FormDataType } from "../form/form";
import { useEffect } from "react";
import { StepDataType } from "../../types";
import { FinishScreen } from "./finish-screen";
import { useContext } from "react";
import { FormDataContext } from "../../context/form-data-context/form-data-context";

interface ContentProps {
  stepsData: StepDataType[] | null;
}

//TODO
/**
 * внутри компонента Content воспользоваться хуком для работы с контекстом FormDataContext,
 * а также хуками для работы с React Router
 * это позволит использовать весь закомментированный код и восстановить работу приложения
 */

export const Content = ({ stepsData }: ContentProps) => {
  const { saveFormData, getFormData, isIntroFormFilled } = useContext(FormDataContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onSave = (index: number, stepData: StepDataType, formData: FormDataType) => {
    /*раскомментировать этот код поможет использование контекста FormDataContext*/
    saveFormData(stepData.formName, formData);

    let path = FINISH_SCREEN_PATH;

    if (index < STEPS.length - 1) {
      path = STEPS[index + 1].path;
    }

    //TODO: с помощью навигации из React Router перейти на "path", в этой переменной уже лежит нужная часть URL
    navigate(path);
  }

  useEffect(() => {
    if (!isIntroFormFilled() && pathname !== "/") {
      navigate("/");
    }
  }, [pathname, isIntroFormFilled, navigate]);

  if (!stepsData) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      {stepsData ? STEPS.map((step, index) => {
        const stepData = stepsData[index];

        if (!stepData?.fields || !stepData?.formName) {
          return null;
        }

        return (
          <Route
            key={step.path}
            path={step.path}
            element={(
              <StepComponent
                step={step}
                /*раскомментировать этот код поможет использование контекста FormDataContext*/
                initialValues={getFormData(stepData.formName)}
                formFields={stepData.fields}
                onSave={(formData) => onSave(index, stepData, formData)}
              />
            )}
          />
        );
      }) : null}
      <Route path={FINISH_SCREEN_PATH} element={<FinishScreen />} />
    </Routes>
  );
}