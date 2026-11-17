import styles from './Navbar.module.css';
import Logo from '../assets/logo.svg';

import Dia from '../components/Dia';

function Navbar({ page, irParaInicio, irParaFormulario, irParaResultados }) {
  function classe(nome) {
    return nome === page ? `${styles.link} ${styles.linkActive}` : styles.link;
  }

  return (
    <>
      <header className={styles.navbar}>
        <img className={styles.logo} src={Logo} alt='Logo' />

        <nav className={styles.links}>
          <button className={classe('home')} onClick={irParaInicio}>Início</button>
          <button className={classe('form')} onClick={irParaFormulario}>Formulário</button>
          <button className={classe('results')} onClick={irParaResultados}>Resultados</button>
        </nav>
      </header>
      <div className={styles.hours}>
        <Dia />
      </div>
    </>
  );
}

export default Navbar;