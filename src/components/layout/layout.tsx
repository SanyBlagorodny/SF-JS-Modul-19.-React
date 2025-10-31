import { ReactNode } from "react";
import { Loader } from "../loader/loader";
import "./layout.css";

export interface LayoutProps {
  showLoader: boolean;
  HeaderComponent: ReactNode;
  NavComponent: ReactNode;
  ContentComponent: ReactNode;
  FooterComponent?: ReactNode;
}

//TODO
/**
 * извлеките все недостающие пропсы и расставьте их по нужным местам,
 * чтобы компонент Layout заработал корректно
 */
export const Layout = ({ showLoader, HeaderComponent, NavComponent, ContentComponent, FooterComponent }: LayoutProps) => {
  return (
    <div className="layout">
      <div className="header">{HeaderComponent}</div>

      <div className="nav">{NavComponent}</div>

      <div className="layout-content">
        <Loader isActive={showLoader} />

        <div className="layout-content-inner">{ContentComponent}</div>
      </div>

      {FooterComponent}
    </div>
  );
}
