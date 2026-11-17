import styles from './Home.module.css';
import Dica from '../components/Dica';
import CardFormulario from '../components/CardFormulario';
import FotoAraraquara from '../assets/Araraquara_on_July_2016_02.jpg';

const fatos = [
  { nome: 'Principal causa', valor: 'Queima de petroleo, carvão e gas' },
  { nome: 'Como funciona', valor: 'Efeito estufa' },
  { nome: 'Na cidade', valor: 'Ilha de calor' },
  { nome: 'Apelido de Araraquara', valor: 'Morada do Sol' },
];

const dicas = [
  { icone: '🌳', texto: 'Plantar arvores' },
  { icone: '💧', texto: 'Bebedouros' },
  { icone: '🏫', texto: 'Salas ventiladas' },
  { icone: '🚲', texto: 'Menos carro' },
];

const fontes = [
  'IPCC. Sexto Relatório de Avaliação (AR6), Grupo de Trabalho I, 2021. Disponível em: ipcc.ch/report/ar6/wg1',
  'EPA (Agência de Proteção Ambiental dos EUA). Heat Island Effect. Disponível em: epa.gov/heatislands',
];

function Home({ irParaFormulario }) {
  return (
    <section className={styles.home}>
      <article className={styles.row}>
        <section className={`${styles.card} ${styles.principal}`}>
          <div className={styles.temperatura}>
            <span className={styles.grau}>+1,1°</span>
            <span className={styles.condicao}>
              <span className={styles.iconeCondicao}>🌡️</span>
              Aquecimento do planeta
            </span>
            <span className={styles.minmax}>
              Em relação ao periodo antes da industrialização (IPCC, 2021)
            </span>
          </div>

          <ul className={styles.detalhes}>
            {fatos.map((item) => (
              <li key={item.nome} className={styles.detalhe}>
                <span>{item.nome}</span>
                <strong>{item.valor}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${styles.card} ${styles.hoje}`}>
          <h2 className={styles.titulo}>Mudanças climáticas</h2>

          <p className={styles.aviso}>
            As mudanças climaticas são alterações no clima da Terra causadas
            principalmente pelas pessoas, com a queima de petroleo, carvão e gás.
            Esses combustiveis soltam gases que prende o calor na atmosfera, o
            chamado efeito estufa. Segundo o IPCC o planeta ja esquentou cerca
            de 1,1 °C.
          </p>

          <p className={styles.aviso}>
            Araraquara é conhecida como Morada do Sol e sempre foi uma cidade
            quente. Nas cidades o asfalto, o concreto e a falta de arvores
            guarda ainda mais calor, o que é chamado de ilha de calor. Por isso
            queremos saber se voce sente que o calor mudou e o que o campus
            poderia fazer pra ajudar.
          </p>

          <div className={styles.dicas}>
            {dicas.map((item) => (
              <Dica key={item.texto} icone={item.icone} texto={item.texto} />
            ))}
          </div>
        </section>
      </article>

      <CardFormulario
        imagem={FotoAraraquara}
        irParaFormulario={irParaFormulario}
      />

      <section className={`${styles.card} ${styles.hoje} ${styles.fontes}`}>
        <h2 className={styles.titulo}>Fontes</h2>
        <ul className={styles.lista}>
          {fontes.map((fonte) => (
            <li key={fonte}>{fonte}</li>
          ))}
          <li>Imagem: Sturm, Araraquara on July 2016, Wikimedia Commons, licença CC BY-SA 4.0. Disponível em: commons.wikimedia.org/wiki/File:Araraquara_on_July_2016_02.jpg</li>
        </ul>
      </section>
    </section>
  );
}

export default Home;
