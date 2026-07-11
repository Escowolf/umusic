import logo from '../../Pages/img/logoUmus.png';
import './AuthLayout.css';

function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <main className="auth-shell">
      <section className="auth-hero" aria-hidden="true">
        <div className="auth-hero__overlay" />
        <div className="auth-hero__content">
          <img src={logo} className="auth-hero__logo" alt="" />
          <p className="auth-hero__eyebrow">uMusic</p>
          <h2>Experiência musical mais limpa, rápida e atual.</h2>
          <p>
            Um fluxo de acesso com identidade visual mais sofisticada, pronto para
            signin e signup.
          </p>
        </div>
      </section>

      <section className="auth-card">
        <div className="auth-card__header">
          {eyebrow ? <span className="auth-card__eyebrow">{eyebrow}</span> : null}
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>

        <div className="auth-card__body">{children}</div>
        {footer ? <div className="auth-card__footer">{footer}</div> : null}
      </section>
    </main>
  );
}

export default AuthLayout;
