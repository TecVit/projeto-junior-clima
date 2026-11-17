import { useState } from 'react';
import styles from './Form.module.css';
import { supabase, TEMA } from '../lib/supabase.js';

const OPCOES = ['Piorou muito', 'Piorou um pouco', 'Não mudou', 'Não sei dizer'];
const NOTAS = [1, 2, 3, 4, 5];

function Form({ irParaResultados }) {
  const [calor, setCalor] = useState('');
  const [impacto, setImpacto] = useState(0);
  const [sugestao, setSugestao] = useState('');

  const [status, setStatus] = useState('parado');

  const podeEnviar = calor !== '' && impacto !== 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!podeEnviar) return;

    setStatus('enviando');

    try {
      const { error } = await supabase.from('opinioes').insert({
        tema: TEMA,
        resposta_1: calor,
        resposta_2: impacto,
        resposta_3: sugestao.trim() === '' ? null : sugestao.trim(),
      });

      if (error) {
        console.error('Falha ao gravar:', error.message);
        setStatus('erro');
        return;
      }

      setStatus('enviado');
    } catch (erro) {
      console.error('Falha ao gravar:', erro);
      setStatus('erro');
    }
  }

  if (status === 'enviado') {
    return (
      <section className={styles.formulario}>
        <div className={styles.card}>
          <h2 className={styles.titulo}>Obrigado!</h2>
          <p className={styles.sucesso}>Sua resposta foi registrada.</p>
          <button className={styles.botao} onClick={irParaResultados}>
            Ver os resultados
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.formulario}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.titulo}>Mudanças climáticas em Araraquara</h2>

        <fieldset className={styles.grupo}>
          <legend className={`${styles.pergunta} ${styles.legenda}`}>
            Você sente que o calor em Araraquara mudou nos últimos anos?
          </legend>

          {OPCOES.map((opcao) => (
            <label key={opcao} className={styles.opcao}>
              <input
                type='radio'
                name='calor'
                value={opcao}
                checked={calor === opcao}
                onChange={() => setCalor(opcao)}
              />
              {opcao}
            </label>
          ))}
        </fieldset>

        <div className={styles.grupo}>
          <p className={styles.pergunta}>
            De 1 a 5, quanto as mudanças climáticas afetam a sua rotina hoje?
          </p>

          <div className={styles.notas}>
            {NOTAS.map((nota) => (
              <button
                key={nota}
                type='button'
                className={
                  impacto === nota
                    ? `${styles.nota} ${styles.notaAtiva}`
                    : styles.nota
                }
                onClick={() => setImpacto(nota)}
              >
                {nota}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grupo}>
          <label htmlFor='sugestao' className={styles.pergunta}>
            O que o campus poderia fazer para diminuir o impacto do calor no dia a dia?
          </label>
          <input
            id='sugestao'
            className={styles.texto}
            type='text'
            placeholder='Escreva sua sugestão (opcional)'
            value={sugestao}
            onChange={(e) => setSugestao(e.target.value)}
          />
        </div>

        <button
          className={styles.botao}
          type='submit'
          disabled={!podeEnviar || status === 'enviando'}
        >
          {status === 'enviando' ? 'Enviando, aguarde...' : 'Enviar'}
        </button>

        {status === 'erro' && (
          <p className={styles.erro}>Não foi possível enviar, tente novamente.</p>
        )}
      </form>
    </section>
  );
}

export default Form;
