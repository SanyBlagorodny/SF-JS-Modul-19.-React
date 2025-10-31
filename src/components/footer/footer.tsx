import "./footer.css";

export const Footer = () => {
  const year = new Date().getFullYear();
  const logoUrl = `${process.env.PUBLIC_URL}/AS.jpg.jpg`;
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__line" />
      <div className="footer__content">
        <p className="footer__text">Сделано в рамках практического задания</p>
        <div className="footer__copyright">
          <img src={logoUrl} alt="Логотип AS" className="footer__logo" />
          <span className="footer__text">Aleksandr Seliverstov © {year}</span>
        </div>
      </div>
    </footer>
  );
}
