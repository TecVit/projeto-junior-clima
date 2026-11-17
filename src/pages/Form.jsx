import Form from '../components/Form';
import styles from './Form.module.css';

function FormularioPage({ irParaResultados }) {
  return (
    <section className={styles.home}>
      <Form irParaResultados={irParaResultados} />
    </section>
  );
}

export default FormularioPage;