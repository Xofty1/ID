export interface Block {
  id: string
  title: string
  body: string
  colorClass: string
  glowClass: string
  textColor: string
  side: 'left' | 'right'
}

export interface AchievementGroup {
  id: number
  // ponytail: replace Unsplash placeholders with real Daria photos from @notdagge
  photo: string
  label: string
  blocks: Block[]
}

const base = import.meta.env.BASE_URL

export const achievementGroups: AchievementGroup[] = [
  {
    id: 0,
    photo: `${base}photos/1.jpg`,
    label: 'Работа',
    blocks: [
      {
        id: '0-0',
        title: 'Influence Marketing',
        body: 'Корреспондент в Didenok Team — агентстве полного цикла, работающем с топовыми брендами и инфлюенсерами',
        colorClass: 'bg-[#FF2D78]',
        glowClass: 'glow-pink',
        textColor: 'text-white',
        side: 'left',
      },
      {
        id: '0-1',
        title: 'Music Box',
        body: 'Опыт работы на федеральном музыкальном телеканале — первые шаги в медиа и прямые эфиры',
        colorClass: 'bg-[#C0FF33]',
        glowClass: 'glow-green',
        textColor: 'text-black',
        side: 'right',
      },
      {
        id: '0-2',
        title: 'ex. Ru.tv',
        body: 'Корреспондент на Ru.tv — интервью с артистами, репортажи с премий и работа в кадре',
        colorClass: 'bg-[#A855F7]',
        glowClass: 'glow-purple',
        textColor: 'text-white',
        side: 'left',
      },
    ],
  },
  {
    id: 1,
    photo: `${base}photos/2.jpg`,
    label: 'Учеба',
    blocks: [
      {
        id: '1-0',
        title: 'Журналистика',
        body: 'Профильное образование в сфере медиа и журналистики — база, на которой строится каждый материал',
        colorClass: 'bg-[#22D3EE]',
        glowClass: 'glow-cyan',
        textColor: 'text-black',
        side: 'right',
      },
      {
        id: '1-1',
        title: 'Практика в эфире',
        body: 'Параллельно с учёбой — живые репортажи, первые интервью и настоящая работа в кадре',
        colorClass: 'bg-[#FF2D78]',
        glowClass: 'glow-pink',
        textColor: 'text-white',
        side: 'left',
      },
      {
        id: '1-2',
        title: 'SMM & Digital',
        body: 'Изучила digital-маркетинг и аналитику — от контент-плана до разбора метрик и алгоритмов',
        colorClass: 'bg-[#C0FF33]',
        glowClass: 'glow-green',
        textColor: 'text-black',
        side: 'right',
      },
      {
        id: '1-3',
        title: 'Нетворкинг',
        body: 'Годы учёбы — это сотни знакомств, коллаборации с однокурсниками и первые проекты на публику',
        colorClass: 'bg-[#A855F7]',
        glowClass: 'glow-purple',
        textColor: 'text-white',
        side: 'left',
      },
    ],
  },
  {
    id: 2,
    photo: `${base}photos/3.jpg`,
    label: 'Вайб',
    blocks: [
      {
        id: '2-0',
        title: 'Эстетика',
        body: 'Чувство стиля, кадра и момента — то, что превращает обычный контент в нечто, от чего не оторваться',
        colorClass: 'bg-[#A855F7]',
        glowClass: 'glow-purple',
        textColor: 'text-white',
        side: 'left',
      },
      {
        id: '2-1',
        title: 'Энергия',
        body: 'Всегда в движении: события, премии, backstage — там, где происходит что-то важное',
        colorClass: 'bg-[#22D3EE]',
        glowClass: 'glow-cyan',
        textColor: 'text-black',
        side: 'right',
      },
      {
        id: '2-2',
        title: 'Свой голос',
        body: 'Узнаваемая подача, искренность в кадре и умение говорить с аудиторией на одном языке',
        colorClass: 'bg-[#FF2D78]',
        glowClass: 'glow-pink',
        textColor: 'text-white',
        side: 'left',
      },
    ],
  },
  {
    id: 3,
    photo: `${base}photos/4.jpg`,
    label: '🎂 День рождения',
    blocks: [
      {
        id: '3-0',
        title: '3 Года в деле',
        body: 'Путь от стажёра до ключевого корреспондента агентства: каждый год — новый уровень',
        colorClass: 'bg-[#FF2D78]',
        glowClass: 'glow-pink',
        textColor: 'text-white',
        side: 'left',
      },
      {
        id: '3-1',
        title: 'Личный Бренд',
        body: 'Узнаваемый стиль, свой голос в индустрии и сотни коллег-инсайдеров по всей стране',
        colorClass: 'bg-[#A855F7]',
        glowClass: 'glow-purple',
        textColor: 'text-white',
        side: 'right',
      },
      {
        id: '3-2',
        title: 'Впереди — звёзды',
        body: 'Новые проекты, вершины и незабываемые события ждут впереди. Сегодня — особенный день!',
        colorClass: 'bg-[#C0FF33]',
        glowClass: 'glow-green',
        textColor: 'text-black',
        side: 'left',
      },
    ],
  },
]
