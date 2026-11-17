import { useEffect, useState } from 'react';
import { supabase, TEMA } from '../lib/supabase.js';
import Barra from './Barra.jsx';
import styles from './Results.module.css';

const OPCOES = ['Piorou muito', 'Piorou um pouco', 'Não mudou', 'Não sei dizer'];
const CORES = ['#f87171', '#fbbf24', '#a78bfa', '#94a3b8'];

function Resultados() {
  const [respostas, setRespostas] = useState([]);
  const [status, setStatus] = useState('carregando');

  useEffect(() => {
    async function carregar() {
      try {
        const { data, error } = await supabase
          .from('opinioes')
          .select('id, resposta_1, resposta_2, resposta_3, criado_em')
          .eq('tema', TEMA)
          .order('criado_em', { ascending: false });

        if (error) {
          console.error('Falha ao ler:', error.message);
          setStatus('erro');
          return;
        }

        setRespostas(data);
        setStatus('pronto');
      } catch (erro) {
        console.error('Falha ao ler:', erro);
        setStatus('erro');
      }
    }

    carregar();
  }, []);

  if (status === 'carregando') {
    return (
      <section className={styles.resultados}>
        <section className={`${styles.card} ${styles.topo}`}>
          <div className={styles.skeletonTextos}>
            <div className={`${styles.skeleton} ${styles.skeletonTitulo}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonLinha}`}></div>
          </div>
          <div className={`${styles.skeleton} ${styles.skeletonDestaque}`}></div>
        </section>

        <section className={styles.card}>
          <div className={`${styles.skeleton} ${styles.skeletonSubtitulo}`}></div>

          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={styles.skeletonBarra}>
              <div className={`${styles.skeleton} ${styles.skeletonLinha}`}></div>
              <div className={`${styles.skeleton} ${styles.skeletonTrilho}`}></div>
            </div>
          ))}
        </section>
      </section>
    );
  }

  if (status === 'erro') {
    return (
      <section className={styles.resultados}>
        <section className={styles.card}>
          <p className={styles.avisoErro}>
            Não deu para carregar os resultados. Recarregue a página.
          </p>
        </section>
      </section>
    );
  }

  const total = respostas.length;

  if (total === 0) {
    return (
      <section className={styles.resultados}>
        <section className={styles.card}>
          <h1 className={styles.titulo}>Ainda não há respostas</h1>
          <p className={styles.texto}>
            Seja a primeira pessoa a responder. Os números aparecem aqui
            assim que chegar a primeira resposta.
          </p>
        </section>
      </section>
    );
  }

  const media = respostas.reduce((soma, r) => soma + r.resposta_2, 0) / total;
  const comentarios = respostas.filter((r) => r.resposta_3);

  return (
    <section className={styles.resultados}>
      <section className={`${styles.card} ${styles.topo}`}>
        <div>
          <h1 className={styles.titulo}>Calor em Araraquara</h1>
          <p className={styles.texto}>
            {total} {total === 1 ? 'resposta registrada' : 'respostas registradas'}
          </p>
        </div>

        <div className={styles.destaque}>
          <span className={styles.numero}>{media.toFixed(1)}</span>
          <span className={styles.rotulo}>impacto médio na rotina (1 a 5)</span>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.subtitulo}>
          O calor mudou nos últimos anos?
        </h2>

        {OPCOES.map((opcao, i) => (
          <Barra
            key={opcao}
            rotulo={opcao}
            valor={respostas.filter((r) => r.resposta_1 === opcao).length}
            total={total}
            cor={CORES[i]}
          />
        ))}
      </section>

      {comentarios.length > 0 && (
        <section className={styles.card}>
          <h2 className={styles.subtitulo}>
            Sugestões para o campus
          </h2>

          <div className={styles.comentarios}>
            {comentarios.map((r) => (
              <blockquote key={r.id} className={styles.comentario}>
                {r.resposta_3}
              </blockquote>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

export default Resultados;
