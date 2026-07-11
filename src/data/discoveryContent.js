export const podcastsMock = [
  {
    id: 'pod-1',
    name: 'Backstage em Foco',
    author: 'uMusic Editorial',
    category: 'Música',
    description: 'Bastidores, lançamentos e histórias curtas sobre o catálogo.',
    cover: '/img/albuns/1.jpg',
    episodes: [
      {
        id: 'pod-1-ep-1',
        title: 'Como montar a trilha certa para o dia',
        date: '12 jul 2026',
        duration: '18 min',
        description: 'Uma conversa rápida sobre clima, ritmo e intenção.',
        src: '/music/BomDiaFlorDoDia/Ketsa - 7AM.mp3',
      },
      {
        id: 'pod-1-ep-2',
        title: 'Playlists que funcionam',
        date: '10 jul 2026',
        duration: '24 min',
        description: 'Ideias simples para montar coleções coerentes.',
        src: '/music/CHILLING/Baners - Counting Sheep.mp3',
      },
    ],
  },
  {
    id: 'pod-2',
    name: 'Papo de Faixa',
    author: 'Estúdio uMusic',
    category: 'Entrevista',
    description: 'Episódios curtos com foco em faixas e artistas.',
    cover: '/img/albuns/2.jpg',
    episodes: [
      {
        id: 'pod-2-ep-1',
        title: 'Rap, clima e identidade',
        date: '08 jul 2026',
        duration: '21 min',
        description: 'Como selecionar faixas para uma narrativa de catálogo.',
        src: '/music/ThatsARap/Double-F the King - Ye.mp3',
      },
    ],
  },
  {
    id: 'pod-3',
    name: 'Sessão Relax',
    author: 'Curadoria interna',
    category: 'Bem-estar',
    description: 'Conteúdo calmo para acompanhar momentos mais leves.',
    cover: '/img/albuns/5.jpeg',
    episodes: [
      {
        id: 'pod-3-ep-1',
        title: 'No ritmo de um começo de manhã',
        date: '05 jul 2026',
        duration: '16 min',
        description: 'Trilha, pausa e foco: um formato simples de escuta.',
        src: '/music/BomDiaFlorDoDia/HoliznaCC0 - Morning Coffee.mp3',
      },
    ],
  },
];

export const radiosMock = [
  {
    id: 'rad-1',
    name: 'Rádio Horizonte',
    category: 'Música',
    city: 'São Paulo',
    live: true,
    description: 'Mistura de faixas leves e grooves atuais.',
    logo: '/img/albuns/7.jpeg',
    src: '/music/SUNNY/Scott Holmes Music - We Are One.mp3',
  },
  {
    id: 'rad-2',
    name: 'Cidade 104',
    category: 'Notícias',
    city: 'Recife',
    live: true,
    description: 'Boletins curtos e atualizações locais.',
    logo: '/img/albuns/4.jpeg',
    src: '/music/CHILLING/Double-F the King - Music Got Me High.mp3',
  },
  {
    id: 'rad-3',
    name: 'Arena Play',
    category: 'Esportes',
    city: 'Rio de Janeiro',
    live: true,
    description: 'Programação voltada para jogos e bastidores.',
    logo: '/img/albuns/3.jpg',
    src: '/music/ThatsARap/HoliznaRAPS - PTSD.mp3',
  },
  {
    id: 'rad-4',
    name: 'Cultura Livre',
    category: 'Cultura',
    city: 'Fortaleza',
    live: true,
    description: 'Debates, agenda e conteúdo cultural.',
    logo: '/img/albuns/6.jpeg',
    src: '/music/FESTINHA DE QUINTAL/Ketsa - Beautiful.mp3',
  },
];

export const favoritesMock = {
  musicas: [
    {
      id: 1,
      nome: 'Morning Coffee',
      cantor: 'HoliznaCC0',
      arquivo: '/music/BomDiaFlorDoDia/HoliznaCC0 - Morning Coffee.mp3',
    },
    {
      id: 2,
      nome: 'Counting Sheep',
      cantor: 'Baners',
      arquivo: '/music/CHILLING/Baners - Counting Sheep.mp3',
    },
  ],
  playlists: [
    {
      id: '4',
      nome: 'Festinha de quintal',
      capa: '/img/albuns/4.jpeg',
      musicas: [
        { id: 1, nome: 'Good Life ft. Macflowz', cantor: 'Double-F The King', arquivo: '/music/FESTINHA DE QUINTAL/Double-F the King - Good Life Ft. Macflowz.mp3' },
        { id: 2, nome: 'Beautiful', cantor: 'Ketsa', arquivo: '/music/FESTINHA DE QUINTAL/Ketsa - Beautiful.mp3' },
      ],
    },
  ],
  podcasts: [
    {
      id: 'pod-1',
      name: 'Backstage em Foco',
      author: 'uMusic Editorial',
      cover: '/img/albuns/1.jpg',
    },
  ],
  radios: [
    {
      id: 'rad-1',
      name: 'Rádio Horizonte',
      category: 'Música',
      logo: '/img/albuns/7.jpeg',
    },
  ],
};
