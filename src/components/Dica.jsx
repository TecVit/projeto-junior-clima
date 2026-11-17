import styles from './Dica.module.css';

function Dica({ icone, texto }) {
  return (
    <div className={styles.dica}>
      <span className={styles.icone}>{icone}</span>
      <span className={styles.texto}>{texto}</span>
    </div>
  );
}

export default Dica;
