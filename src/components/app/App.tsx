import React, { useEffect, useState } from 'react';
import { Layout } from "../layout/layout";
import { Navigation } from "../navigation/navigation";
import { Content } from "../content/content";
import { FormDataContextWrapper } from "../../context/form-data-context/form-data-context";
import { Header } from "../header/header";
import { loadQuestions } from "../../api/questions-api";
import { StepDataType } from "../../types";
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Footer } from "../footer/footer";

//TODO
/**
 * для начала корректной работы приложения необходимо:
 * 1) вызвать функцию load один раз после монтирования компонента App
 *
 * 2) разобраться с пропсом showLoader компонента Layout, чтобы лоадер не показывался вечно (как сейчас)
 *
 * 3) весь рендер компонента App должен быть обернут в соответствующий верхнеуровневый компонент React Router
 *    для инициализации роутера и его корректной работы роутинга в приложении
 */
function App() {
  const [stepsData, setStepsData] = useState<StepDataType[] | null>(null);

  const load = async () => {
    const result = await loadQuestions();
    setStepsData(result);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <BrowserRouter>
      <FormDataContextWrapper>
        <div className="App">
          <Layout
            // TODO
            // значение showLoader должно напрямую зависеть от наличия данных в стейте stepsData
            // как только данные в стейт stepsData появляются, лоадер должен исчезать
            showLoader={!stepsData}
            HeaderComponent={<Header />}
            NavComponent={<Navigation />}
            ContentComponent={<Content stepsData={stepsData} />}
            FooterComponent={<Footer />}
          />
        </div>
      </FormDataContextWrapper>
    </BrowserRouter>
  );
}

export default App;
