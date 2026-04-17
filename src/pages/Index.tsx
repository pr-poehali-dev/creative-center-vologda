import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/3eb85f6c-1aea-4dab-86ee-01a67fd82db9/files/0a6c2dcf-721d-4cbe-9114-8842508a12c1.jpg";

/* ── Цветовые токены Мой бизнес ── */
const BLUE = "hsl(218,73%,35%)";
const BLUE_DARK = "hsl(220,78%,22%)";
const ORANGE = "hsl(23,89%,55%)";
const GRAY_BG = "hsl(218,20%,96%)";

const NAV_ITEMS = [
  { id: "about", label: "О центре" },
  { id: "directions", label: "Направления" },
  { id: "projects", label: "Проекты" },
  { id: "registry", label: "Реестр" },
  { id: "events", label: "События" },
  { id: "contacts", label: "Контакты" },
];

const DIRECTIONS = [
  {
    icon: "Hammer",
    color: "#1A4F9C",
    label: "01",
    title: "Ремесло и народно-художественные промыслы",
    desc: "Поддержка мастеров и ремесленников, сохранение традиционных технологий, развитие рынка аутентичных изделий.",
    tags: ["Керамика", "Ткачество", "Ювелирное дело", "Резьба"],
  },
  {
    icon: "UtensilsCrossed",
    color: "#F26522",
    label: "02",
    title: "Гастрономия и сфера гостеприимства",
    desc: "Развитие ресторанного бизнеса, гастрономического туризма и HoReCa-индустрии в регионе.",
    tags: ["Рестораны", "Туризм", "Отельный бизнес", "Фермерство"],
  },
  {
    icon: "Scissors",
    color: "#2E6DC2",
    label: "03",
    title: "Мода и дизайн",
    desc: "Поддержка дизайнеров одежды и аксессуаров, развитие локальных брендов, выход на федеральный рынок.",
    tags: ["Одежда", "Аксессуары", "Брендинг", "Текстиль"],
  },
  {
    icon: "Brush",
    color: "#F26522",
    label: "04",
    title: "АРТ-искусство",
    desc: "Поддержка художников, скульпторов, арт-объединений, развитие галерейного рынка и паблик-арта.",
    tags: ["Живопись", "Скульптура", "Инсталляции", "Графика"],
  },
];

const PROJECTS = [
  { tag: "Выставка", title: "Руки мастера", desc: "Региональная выставка изделий народно-художественных промыслов. 45 участников из 12 районов.", year: "2024" },
  { tag: "Фестиваль", title: "Вкус региона", desc: "Гастрономический фестиваль с участием 30 шеф-поваров, представивших локальные кулинарные традиции.", year: "2024" },
  { tag: "Показ", title: "Местный бренд", desc: "Первый региональный показ коллекций дизайнеров одежды — участников программы центра.", year: "2023" },
  { tag: "Арт-резиденция", title: "Открытая студия", desc: "Трёхмесячная программа поддержки художников: мастерские, наставники, выставка итоговых работ.", year: "2023" },
];

const EVENTS_DATA: Record<string, { title: string; type: string; time: string }[]> = {
  "2026-04-17": [{ title: "Мастер-класс: Роспись по дереву", type: "Мастер-класс", time: "11:00" }],
  "2026-04-19": [{ title: "Лекция: Как открыть ресторан", type: "Лекция", time: "15:00" }],
  "2026-04-22": [{ title: "Питчинг локальных брендов", type: "Мероприятие", time: "17:00" }],
  "2026-04-24": [{ title: "Арт-воркшоп: Монотипия", type: "Воркшоп", time: "12:00" }],
  "2026-04-26": [{ title: "Нетворкинг для ремесленников", type: "Нетворкинг", time: "18:00" }],
  "2026-04-28": [{ title: "Семинар: Гастротуризм 2026", type: "Семинар", time: "14:00" }],
  "2026-05-03": [{ title: "Мастер-класс: Ювелирное дело", type: "Мастер-класс", time: "12:00" }],
  "2026-05-07": [{ title: "Открытие выставки «Ремесло»", type: "Выставка", time: "17:00" }],
  "2026-05-10": [{ title: "Лекция: Маркетинг для дизайнеров", type: "Лекция", time: "16:00" }],
  "2026-05-15": [{ title: "Форум «Креативный регион»", type: "Форум", time: "09:00" }],
  "2026-05-20": [{ title: "Питчинг арт-проектов", type: "Мероприятие", time: "16:00" }],
  "2026-05-24": [{ title: "Мастер-класс: Гончарное искусство", type: "Мастер-класс", time: "11:00" }],
};

const EVENT_TYPE_COLORS: Record<string, string> = {
  "Лекция": "bg-blue-100 text-blue-800",
  "Мастер-класс": "bg-amber-100 text-amber-800",
  "Воркшоп": "bg-green-100 text-green-800",
  "Мероприятие": "bg-purple-100 text-purple-800",
  "Семинар": "bg-sky-100 text-sky-800",
  "Нетворкинг": "bg-teal-100 text-teal-800",
  "Выставка": "bg-rose-100 text-rose-800",
  "Форум": "bg-indigo-100 text-indigo-800",
};

const MONTH_NAMES = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
    setSelectedDate(null);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
    setSelectedDate(null);
  };

  const getDateKey = (day: number) =>
    `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const hasEvent = (day: number) => !!EVENTS_DATA[getDateKey(day)];
  const selectedEvents = selectedDate ? (EVENTS_DATA[selectedDate] || []) : [];

  return (
    <div className="min-h-screen bg-background font-body">

      {/* NAV */}
      <nav style={{ background: BLUE }} className="fixed top-0 left-0 right-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-wide text-white">
              Мой<span style={{ color: ORANGE }}>Бизнес</span>
            </span>
            <span className="hidden sm:block text-white/40 text-xs font-body">/ Центр Креативных Индустрий</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link">{item.label}</button>
            ))}
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileOpen(o => !o)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4" style={{ background: BLUE }}>
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => { scrollTo(item.id); setMobileOpen(false); }} className="nav-link text-left">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative h-screen flex items-end overflow-hidden">
        <img src={HERO_IMAGE} alt="Центр Креативных Индустрий" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${BLUE_DARK} 0%, ${BLUE}99 40%, transparent 100%)` }} />

        {/* Декоративная полоса */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: ORANGE }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 w-full">
          <div className="max-w-3xl" style={{ animation: "fadeUp 0.8s ease 0.2s both" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ORANGE }} />
              <p className="font-body text-xs tracking-[0.35em] uppercase text-white/80">
                Мой бизнес · Центр Креативных Индустрий
              </p>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-[1.1] mb-6">
              Творчество как<br />
              <em className="italic" style={{ color: ORANGE }}>основа бизнеса</em>
            </h1>
            <p className="font-body text-white/70 text-lg font-light leading-relaxed mb-10 max-w-xl">
              Центр поддержки предпринимателей в сфере креативных индустрий. Ремесло, гастрономия, мода и арт — ваш путь к успешному делу.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("directions")} className="btn-primary">Наши направления</button>
              <button onClick={() => scrollTo("events")} className="btn-outline">Календарь событий</button>
            </div>
          </div>
        </div>
        <button onClick={() => scrollTo("about")} className="absolute bottom-8 right-10 text-white/40 hover:text-white transition-colors animate-bounce z-10">
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: ORANGE }} />
                <p className="font-body text-xs tracking-[0.3em] uppercase" style={{ color: ORANGE }}>О центре</p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-6 orange-line" style={{ color: BLUE }}>
                Поддержка предпринимателей в сфере творческих индустрий
              </h2>
            </div>
            <div className="space-y-5">
              <p className="font-body text-[hsl(218,15%,35%)] leading-relaxed">
                Центр Креативных Индустрий — специализированное подразделение центра «Мой бизнес», созданное для поддержки предпринимателей в наиболее быстрорастущих секторах экономики: народных промыслах, гастрономии, моде и арт-индустрии.
              </p>
              <p className="font-body text-[hsl(218,15%,35%)] leading-relaxed">
                Мы предоставляем консультации, образовательные программы, помощь в получении грантов и субсидий, а также инфраструктуру для реализации ваших проектов.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[hsl(218,20%,88%)]">
                {[["200+", "Участников"], ["4", "Направления"], ["60+", "Проектов"]].map(([num, label]) => (
                  <div key={label}>
                    <p className="font-display text-3xl font-semibold" style={{ color: BLUE }}>{num}</p>
                    <p className="font-body text-xs tracking-wide uppercase mt-1" style={{ color: ORANGE }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section id="directions" className="section-padding" style={{ background: GRAY_BG }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE }} />
              <p className="font-body text-xs tracking-[0.3em] uppercase" style={{ color: ORANGE }}>Направления</p>
              <div className="h-px w-8" style={{ background: ORANGE }} />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light orange-line-center" style={{ color: BLUE }}>
              Четыре сферы поддержки
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {DIRECTIONS.map((dir) => (
              <div key={dir.title} className="bg-white p-8 border border-[hsl(218,20%,88%)] card-hover group cursor-pointer relative overflow-hidden">
                {/* Цветная полоска слева */}
                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: dir.color }} />
                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <p className="font-display text-5xl font-light" style={{ color: `${dir.color}22` }}>{dir.label}</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded flex items-center justify-center" style={{ background: `${dir.color}15` }}>
                        <Icon name={dir.icon} size={17} fallback="Layers" style={{ color: dir.color }} />
                      </div>
                      <h3 className="font-display text-xl font-semibold leading-tight" style={{ color: BLUE }}>{dir.title}</h3>
                    </div>
                    <p className="font-body text-sm text-[hsl(218,15%,45%)] leading-relaxed mb-4">{dir.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {dir.tags.map(tag => (
                        <span key={tag} className="font-body text-xs px-2 py-1 rounded-sm border border-[hsl(218,20%,85%)] text-[hsl(218,15%,50%)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-[hsl(218,20%,90%)] flex items-center gap-2 text-xs font-body font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: ORANGE }}>
                  Узнать о программах <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section-padding" style={{ background: BLUE }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE }} />
              <p className="font-body text-xs tracking-[0.3em] uppercase" style={{ color: ORANGE }}>Проекты</p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white orange-line">
              Результаты наших участников
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {PROJECTS.map((p) => (
              <div key={p.title} className="border border-white/10 p-8 card-hover group bg-white/5 hover:bg-white/10">
                <div className="flex items-start justify-between mb-5">
                  <span className="font-body text-xs tracking-widest uppercase px-3 py-1 border" style={{ color: ORANGE, borderColor: `${ORANGE}60` }}>
                    {p.tag}
                  </span>
                  <span className="font-body text-xs text-white/30">{p.year}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-white mb-3">{p.title}</h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">{p.desc}</p>
                <div className="mt-6 border-t border-white/10 pt-5 flex items-center gap-2 text-xs font-body tracking-widest uppercase" style={{ color: ORANGE }}>
                  <span>Подробнее</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRY */}
      <section id="registry" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left: header + intro */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: ORANGE }} />
                <p className="font-body text-xs tracking-[0.3em] uppercase" style={{ color: ORANGE }}>Реестр</p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-6 orange-line" style={{ color: BLUE }}>
                Реестр креативных индустрий
              </h2>
              <p className="font-body text-[hsl(218,15%,38%)] leading-relaxed mb-6">
                Внесение в реестр — официальное признание вашей деятельности как субъекта креативной экономики. Это открывает доступ к специальным мерам господдержки, грантам и льготным программам центра «Мой бизнес».
              </p>
              {/* Benefit cards */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: "BadgeCheck", text: "Приоритетный доступ к грантам и субсидиям" },
                  { icon: "Users", text: "Участие в федеральных выставках и форумах" },
                  { icon: "BookOpen", text: "Бесплатные образовательные программы" },
                  { icon: "Handshake", text: "База партнёров и корпоративных заказчиков" },
                ].map(b => (
                  <div key={b.text} className="flex gap-3 p-4 border border-[hsl(218,20%,88%)] bg-[hsl(218,20%,97%)]">
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded" style={{ background: `${ORANGE}18` }}>
                      <Icon name={b.icon} size={15} fallback="Check" style={{ color: ORANGE }} />
                    </div>
                    <p className="font-body text-xs text-[hsl(218,15%,38%)] leading-snug">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: conditions */}
            <div>
              <div className="border-l-4 pl-6 mb-8" style={{ borderColor: BLUE }}>
                <h3 className="font-display text-2xl font-semibold mb-1" style={{ color: BLUE }}>Условия включения в реестр</h3>
                <p className="font-body text-sm text-[hsl(218,15%,50%)]">Необходимо соответствовать всем критериям</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    num: "01",
                    title: "Регистрация субъекта МСП",
                    desc: "ИП или юридическое лицо, зарегистрированное на территории региона и включённое в реестр МСП ФНС России.",
                  },
                  {
                    num: "02",
                    title: "Вид деятельности — ОКВЭД",
                    desc: "Основной или дополнительный ОКВЭД должен соответствовать перечню видов деятельности, отнесённых к креативным индустриям.",
                  },
                  {
                    num: "03",
                    title: "Фактическое ведение деятельности",
                    desc: "Подтверждённая деятельность в одном из направлений: ремесло, гастрономия, мода и дизайн или арт-искусство — не менее 6 месяцев.",
                  },
                  {
                    num: "04",
                    title: "Отсутствие задолженностей",
                    desc: "Отсутствие задолженности по налогам, сборам и иным обязательным платежам в бюджет на дату подачи заявки.",
                  },
                  {
                    num: "05",
                    title: "Пакет документов",
                    desc: "Заявление установленного образца, копии учредительных документов, портфолио или перечень реализованных проектов (не менее 3).",
                  },
                ].map(c => (
                  <div key={c.num} className="flex gap-4 p-5 border border-[hsl(218,20%,88%)] hover:border-[hsl(218,73%,35%)] transition-colors group">
                    <span className="font-display text-2xl font-light shrink-0 w-8 leading-none mt-0.5" style={{ color: `${BLUE}40` }}>{c.num}</span>
                    <div>
                      <p className="font-body text-sm font-semibold mb-1" style={{ color: BLUE }}>{c.title}</p>
                      <p className="font-body text-sm text-[hsl(218,15%,45%)] leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 p-6 border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: ORANGE, background: `${ORANGE}08` }}>
                <div>
                  <p className="font-body text-sm font-semibold" style={{ color: BLUE }}>Готовы подать заявку?</p>
                  <p className="font-body text-xs text-[hsl(218,15%,50%)] mt-0.5">Срок рассмотрения — до 15 рабочих дней</p>
                </div>
                <button onClick={() => scrollTo("contacts")} className="btn-primary shrink-0">
                  Подать заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="section-padding bg-white" style={{ background: GRAY_BG }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE }} />
              <p className="font-body text-xs tracking-[0.3em] uppercase" style={{ color: ORANGE }}>События</p>
              <div className="h-px w-8" style={{ background: ORANGE }} />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light orange-line-center" style={{ color: BLUE }}>
              Интерактивный календарь
            </h2>
            <p className="font-body text-[hsl(218,15%,50%)] mt-6 text-sm">
              Выберите дату, чтобы увидеть запланированные мероприятия
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-3">
              <div className="border border-[hsl(218,20%,88%)] overflow-hidden shadow-sm">
                <div className="px-6 py-4 flex items-center justify-between" style={{ background: BLUE }}>
                  <button onClick={prevMonth} className="text-white/60 hover:text-white transition-colors p-1">
                    <Icon name="ChevronLeft" size={20} />
                  </button>
                  <span className="font-display text-xl font-semibold text-white tracking-wide">
                    {MONTH_NAMES[calMonth]} {calYear}
                  </span>
                  <button onClick={nextMonth} className="text-white/60 hover:text-white transition-colors p-1">
                    <Icon name="ChevronRight" size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-7 border-b border-[hsl(218,20%,88%)]">
                  {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map(d => (
                    <div key={d} className="py-3 text-center font-body text-xs tracking-widest uppercase text-[hsl(218,15%,55%)]">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`e-${i}`} className="h-12 border-b border-r border-[hsl(218,20%,88%)]/50" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const key = getDateKey(day);
                    const isToday = calYear === today.getFullYear() && calMonth === today.getMonth() && day === today.getDate();
                    const hasEv = hasEvent(day);
                    const isSelected = selectedDate === key;
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(isSelected ? null : key)}
                        className="h-12 flex flex-col items-center justify-center relative border-b border-r border-[hsl(218,20%,88%)]/50 transition-colors"
                        style={isSelected ? { background: BLUE } : undefined}
                        onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = GRAY_BG; }}
                        onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = ""; }}
                      >
                        <span className={`font-body text-sm ${isSelected ? "text-white" : isToday ? "font-bold" : "text-[hsl(218,15%,40%)]"}`}
                          style={isToday && !isSelected ? { color: BLUE } : undefined}>
                          {day}
                        </span>
                        {hasEv && (
                          <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full" style={{ background: ORANGE }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Event panel */}
            <div className="lg:col-span-2">
              {selectedDate && selectedEvents.length > 0 ? (
                <div className="space-y-4">
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-[hsl(218,15%,50%)] mb-6">
                    {selectedDate.split("-")[2]}.{selectedDate.split("-")[1]} — {MONTH_NAMES[parseInt(selectedDate.split("-")[1]) - 1]}
                  </p>
                  {selectedEvents.map((ev, idx) => (
                    <div key={idx} className="border border-[hsl(218,20%,88%)] p-6 card-hover bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-body text-xs px-2 py-0.5 rounded ${EVENT_TYPE_COLORS[ev.type] || "bg-gray-100 text-gray-800"}`}>
                          {ev.type}
                        </span>
                        <span className="font-body text-sm font-medium" style={{ color: BLUE }}>{ev.time}</span>
                      </div>
                      <h4 className="font-display text-xl font-semibold leading-tight mb-4" style={{ color: BLUE }}>{ev.title}</h4>
                      <button className="btn-primary text-xs py-2 px-5">Зарегистрироваться</button>
                    </div>
                  ))}
                </div>
              ) : selectedDate ? (
                <div className="flex items-center justify-center text-center py-16 border border-[hsl(218,20%,88%)]">
                  <div>
                    <Icon name="CalendarX" size={36} className="text-[hsl(218,15%,70%)] mx-auto mb-3" />
                    <p className="font-body text-sm text-[hsl(218,15%,50%)]">В этот день мероприятий нет</p>
                  </div>
                </div>
              ) : (
                <div className="border border-[hsl(218,20%,88%)] p-8 min-h-[320px] flex flex-col justify-between" style={{ background: GRAY_BG }}>
                  <div>
                    <p className="font-body text-xs tracking-[0.2em] uppercase mb-3" style={{ color: ORANGE }}>Ближайшие события</p>
                    <h3 className="font-display text-2xl font-light mb-6 leading-tight" style={{ color: BLUE }}>
                      Нажмите на дату<br />с оранжевой точкой
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(EVENTS_DATA).slice(0, 5).map(([dateKey, evs]) => (
                        <button
                          key={dateKey}
                          onClick={() => setSelectedDate(dateKey)}
                          className="w-full text-left flex items-center gap-3 py-2 border-b border-[hsl(218,20%,88%)] group"
                        >
                          <span className="font-body text-xs text-[hsl(218,15%,55%)] w-12 shrink-0">
                            {dateKey.split("-")[2]}.{dateKey.split("-")[1]}
                          </span>
                          <span className="font-body text-sm text-[hsl(218,15%,35%)] group-hover:text-[hsl(218,73%,35%)] transition-colors leading-tight">
                            {evs[0].title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-body tracking-widest uppercase mt-6 cursor-pointer" style={{ color: ORANGE }}>
                    <span>Все события</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="section-padding" style={{ background: GRAY_BG }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: ORANGE }} />
                <p className="font-body text-xs tracking-[0.3em] uppercase" style={{ color: ORANGE }}>Контакты</p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-10 orange-line" style={{ color: BLUE }}>
                Свяжитесь с нами
              </h2>
              <div className="space-y-6">
                {[
                  { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Творческая, 1" },
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                  { icon: "Mail", label: "E-mail", value: "info@cki-center.ru" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 09:00–21:00\nСб–Вс: 10:00–18:00" },
                ].map(c => (
                  <div key={c.label} className="flex gap-4">
                    <div className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${BLUE}12` }}>
                      <Icon name={c.icon} size={15} fallback="Info" style={{ color: BLUE }} />
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-wider uppercase text-[hsl(218,15%,50%)] mb-1">{c.label}</p>
                      <p className="font-body text-sm text-[hsl(218,15%,30%)] whitespace-pre-line">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-[hsl(218,20%,88%)] p-8 shadow-sm">
              <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: BLUE }}>Отправить запрос</h3>
              <div className="space-y-4">
                {[
                  { label: "Имя", type: "text", placeholder: "Ваше имя" },
                  { label: "E-mail", type: "email", placeholder: "your@email.com" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="font-body text-xs tracking-wider uppercase text-[hsl(218,15%,50%)] block mb-2">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full border border-[hsl(218,20%,88%)] px-4 py-3 font-body text-sm focus:outline-none transition-colors bg-white"
                      style={{ color: BLUE }}
                      onFocus={e => (e.target.style.borderColor = BLUE)}
                      onBlur={e => (e.target.style.borderColor = "")}
                    />
                  </div>
                ))}
                <div>
                  <label className="font-body text-xs tracking-wider uppercase text-[hsl(218,15%,50%)] block mb-2">Сообщение</label>
                  <textarea
                    rows={4}
                    placeholder="Ваш вопрос или запрос..."
                    className="w-full border border-[hsl(218,20%,88%)] px-4 py-3 font-body text-sm focus:outline-none transition-colors resize-none bg-white"
                    style={{ color: BLUE }}
                    onFocus={e => (e.target.style.borderColor = BLUE)}
                    onBlur={e => (e.target.style.borderColor = "")}
                  />
                </div>
                <button className="btn-primary w-full justify-center">
                  Отправить сообщение
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 px-6 md:px-12" style={{ background: BLUE }}>
        {/* Оранжевая полоса сверху */}
        <div className="h-1 -mt-10 mb-10 -mx-6 md:-mx-12" style={{ background: ORANGE }} />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-bold text-white">
              Мой<span style={{ color: ORANGE }}>Бизнес</span>
            </span>
            <span className="text-white/30 text-xs font-body hidden md:block">· Центр Креативных Индустрий</span>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="font-body text-xs text-white/50 hover:text-white/80 transition-colors tracking-wide">
                {item.label}
              </button>
            ))}
          </div>
          <p className="font-body text-xs text-white/30">© 2026 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}