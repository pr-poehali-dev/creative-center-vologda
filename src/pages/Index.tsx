import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/3eb85f6c-1aea-4dab-86ee-01a67fd82db9/files/0a6c2dcf-721d-4cbe-9114-8842508a12c1.jpg";

const NAV_ITEMS = [
  { id: "about", label: "О центре" },
  { id: "directions", label: "Направления" },
  { id: "projects", label: "Проекты" },
  { id: "events", label: "События" },
  { id: "contacts", label: "Контакты" },
];

const DIRECTIONS = [
  { icon: "Palette", title: "Дизайн и визуальные искусства", desc: "Графический дизайн, иллюстрация, брендинг, UI/UX. Программы для профессионалов и начинающих." },
  { icon: "Music", title: "Музыка и звук", desc: "Звукозапись, продюсирование, музыкальная журналистика. Современные техники и классические основы." },
  { icon: "Film", title: "Кино и медиа", desc: "Сценарное мастерство, режиссура, монтаж. От идеи до экрана — полный цикл создания контента." },
  { icon: "BookOpen", title: "Литература и сторителлинг", desc: "Художественный и документальный нарратив, сценарии, журналистика. Развитие авторского голоса." },
  { icon: "Globe", title: "Цифровые медиа", desc: "Контент-стратегия, SMM, подкасты, видеопроизводство. Инструменты цифровой эпохи." },
  { icon: "TrendingUp", title: "Управление в креативных индустриях", desc: "Продюсирование проектов, культурный менеджмент, монетизация творческих идей." },
];

const PROJECTS = [
  { tag: "Выставка", title: "Образ города", desc: "Групповая выставка фотографов и иллюстраторов об архитектурной идентичности российских городов.", year: "2024" },
  { tag: "Альбом", title: "Новые голоса", desc: "Сборник дебютных треков 12 музыкантов, прошедших программу центра. Доступен на всех площадках.", year: "2024" },
  { tag: "Документальный фильм", title: "Индустрия будущего", desc: "Документальный проект о трансформации творческих профессий в эпоху цифровых технологий.", year: "2023" },
  { tag: "Антология", title: "Первые слова", desc: "Литературная антология рассказов и стихотворений 30 авторов из мастерских центра.", year: "2023" },
];

const EVENTS_DATA: Record<string, { title: string; type: string; time: string }[]> = {
  "2026-04-17": [{ title: "Открытая лекция: Дизайн-мышление", type: "Лекция", time: "18:00" }],
  "2026-04-19": [{ title: "Мастер-класс по фотографии", type: "Мастер-класс", time: "12:00" }],
  "2026-04-22": [{ title: "Питчинг творческих проектов", type: "Мероприятие", time: "17:00" }],
  "2026-04-24": [{ title: "Кинопоказ + обсуждение", type: "Кино", time: "19:30" }],
  "2026-04-26": [{ title: "Воркшоп: Сторителлинг в цифре", type: "Воркшоп", time: "11:00" }],
  "2026-04-28": [{ title: "Нетворкинг для творческих", type: "Нетворкинг", time: "19:00" }],
  "2026-05-03": [{ title: "Лекция: Управление культурными проектами", type: "Лекция", time: "18:00" }],
  "2026-05-07": [{ title: "Мастер-класс по звукозаписи", type: "Мастер-класс", time: "14:00" }],
  "2026-05-10": [{ title: "Открытие выставки «Новый взгляд»", type: "Выставка", time: "17:00" }],
  "2026-05-15": [{ title: "Воркшоп: Режиссура короткого метра", type: "Воркшоп", time: "10:00" }],
  "2026-05-20": [{ title: "Форум креативных индустрий", type: "Форум", time: "09:00" }],
  "2026-05-24": [{ title: "Питчинг стартапов в сфере культуры", type: "Мероприятие", time: "16:00" }],
};

const EVENT_TYPE_COLORS: Record<string, string> = {
  "Лекция": "bg-blue-100 text-blue-800",
  "Мастер-класс": "bg-amber-100 text-amber-800",
  "Воркшоп": "bg-green-100 text-green-800",
  "Мероприятие": "bg-purple-100 text-purple-800",
  "Кино": "bg-red-100 text-red-800",
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,45%,15%)] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-display text-2xl font-semibold tracking-wide text-white">
            ЦКИ<span className="text-[hsl(45,80%,52%)]">.</span>
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
          <div className="md:hidden bg-[hsl(220,45%,15%)] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
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
        <img src={HERO_IMAGE} alt="ЦКИ" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,45%,8%)] via-[hsl(220,45%,12%)]/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 w-full">
          <div className="max-w-3xl" style={{ animation: "fadeUp 0.8s ease 0.2s both" }}>
            <p className="font-body text-xs tracking-[0.35em] uppercase text-[hsl(45,80%,52%)] mb-5">
              Центр Креативных Индустрий
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-[1.1] mb-6">
              Место, где идеи<br />
              <em className="italic text-[hsl(45,70%,65%)]">становятся</em> реальностью
            </h1>
            <p className="font-body text-white/65 text-lg font-light leading-relaxed mb-10 max-w-xl">
              Профессиональная среда для развития творческих индустрий, реализации проектов и формирования сообщества.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("directions")} className="btn-gold">Наши направления</button>
              <button onClick={() => scrollTo("events")} className="btn-outline-gold">Ближайшие события</button>
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
              <p className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(45,80%,52%)] mb-4">О центре</p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-[hsl(220,45%,15%)] leading-tight mb-6 gold-line">
                Профессиональная платформа для творческих профессионалов
              </h2>
            </div>
            <div className="space-y-5">
              <p className="font-body text-[hsl(220,15%,35%)] leading-relaxed">
                Центр Креативных Индустрий — это институция, объединяющая профессионалов в сфере дизайна, музыки, кино, литературы и цифровых медиа. Мы создаём условия для развития творческого потенциала, реализации амбициозных проектов и построения устойчивых карьер.
              </p>
              <p className="font-body text-[hsl(220,15%,35%)] leading-relaxed">
                Наша миссия — стать ведущим центром развития креативной экономики, предоставляя участникам доступ к экспертизе, ресурсам и партнёрским связям на региональном и федеральном уровне.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[hsl(220,20%,88%)]">
                {[["150+", "Участников"], ["6", "Направлений"], ["50+", "Проектов"]].map(([num, label]) => (
                  <div key={label}>
                    <p className="font-display text-3xl font-semibold text-[hsl(220,45%,15%)]">{num}</p>
                    <p className="font-body text-xs text-[hsl(220,15%,50%)] tracking-wide uppercase mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section id="directions" className="section-padding" style={{ background: "hsl(40,20%,96%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(45,80%,52%)] mb-4">Направления</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[hsl(220,45%,15%)] gold-line-center">
              Шесть сфер развития
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIRECTIONS.map((dir) => (
              <div key={dir.title} className="bg-white p-8 border border-[hsl(220,20%,88%)] card-hover group cursor-pointer">
                <div className="w-10 h-10 rounded flex items-center justify-center mb-5 bg-[hsl(220,45%,15%)]/5 group-hover:bg-[hsl(45,80%,52%)]/15 transition-colors">
                  <Icon name={dir.icon} size={18} className="text-[hsl(220,45%,15%)] group-hover:text-[hsl(45,65%,42%)] transition-colors" fallback="Layers" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[hsl(220,45%,15%)] mb-3 leading-tight">{dir.title}</h3>
                <p className="font-body text-sm text-[hsl(220,15%,45%)] leading-relaxed">{dir.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-[hsl(45,65%,42%)] text-xs font-body font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Узнать подробнее <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section-padding bg-[hsl(220,45%,15%)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(45,80%,52%)] mb-4">Проекты</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white gold-line">
              Результаты наших участников
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {PROJECTS.map((p) => (
              <div key={p.title} className="border border-white/10 p-8 card-hover group bg-white/5 hover:bg-white/10">
                <div className="flex items-start justify-between mb-5">
                  <span className="font-body text-xs tracking-widest uppercase text-[hsl(45,80%,52%)] border border-[hsl(45,80%,52%)]/40 px-3 py-1">
                    {p.tag}
                  </span>
                  <span className="font-body text-xs text-white/30">{p.year}</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-white mb-3">{p.title}</h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">{p.desc}</p>
                <div className="mt-6 border-t border-white/10 pt-5 flex items-center gap-2 text-[hsl(45,80%,52%)] text-xs font-body tracking-widest uppercase">
                  <span>Подробнее</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(45,80%,52%)] mb-4">События</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[hsl(220,45%,15%)] gold-line-center">
              Интерактивный календарь
            </h2>
            <p className="font-body text-[hsl(220,15%,50%)] mt-6 text-sm">
              Выберите дату, чтобы увидеть запланированные мероприятия
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-3">
              <div className="border border-[hsl(220,20%,88%)] overflow-hidden shadow-sm">
                <div className="bg-[hsl(220,45%,15%)] px-6 py-4 flex items-center justify-between">
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
                <div className="grid grid-cols-7 border-b border-[hsl(220,20%,88%)]">
                  {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map(d => (
                    <div key={d} className="py-3 text-center font-body text-xs tracking-widest uppercase text-[hsl(220,15%,55%)]">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`e-${i}`} className="h-12 border-b border-r border-[hsl(220,20%,88%)]/50" />
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
                        className={`h-12 flex flex-col items-center justify-center relative border-b border-r border-[hsl(220,20%,88%)]/50 transition-colors
                          ${isSelected ? "bg-[hsl(220,45%,15%)] text-white" : "hover:bg-[hsl(40,20%,96%)]"}`}
                      >
                        <span className={`font-body text-sm ${isSelected ? "text-white" : isToday ? "font-bold text-[hsl(220,45%,15%)]" : "text-[hsl(220,15%,40%)]"}`}>
                          {day}
                        </span>
                        {hasEv && (
                          <span className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-[hsl(45,80%,52%)]" />
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
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-[hsl(220,15%,50%)] mb-6">
                    {selectedDate.split("-").slice(1).reverse().join(".")} — {MONTH_NAMES[parseInt(selectedDate.split("-")[1]) - 1]}
                  </p>
                  {selectedEvents.map((ev, idx) => (
                    <div key={idx} className="border border-[hsl(220,20%,88%)] p-6 card-hover bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-body text-xs px-2 py-0.5 rounded ${EVENT_TYPE_COLORS[ev.type] || "bg-gray-100 text-gray-800"}`}>
                          {ev.type}
                        </span>
                        <span className="font-body text-sm font-medium text-[hsl(220,45%,15%)]">{ev.time}</span>
                      </div>
                      <h4 className="font-display text-xl font-semibold text-[hsl(220,45%,15%)] leading-tight mb-4">{ev.title}</h4>
                      <button className="btn-gold text-xs py-2 px-5">Зарегистрироваться</button>
                    </div>
                  ))}
                </div>
              ) : selectedDate ? (
                <div className="flex items-center justify-center text-center py-16 border border-[hsl(220,20%,88%)]">
                  <div>
                    <Icon name="CalendarX" size={36} className="text-[hsl(220,15%,70%)] mx-auto mb-3" />
                    <p className="font-body text-sm text-[hsl(220,15%,50%)]">В этот день мероприятий нет</p>
                  </div>
                </div>
              ) : (
                <div className="border border-[hsl(220,20%,88%)] p-8 min-h-[320px] flex flex-col justify-between" style={{ background: "hsl(40,20%,96%)" }}>
                  <div>
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-[hsl(45,65%,42%)] mb-3">Ближайшие события</p>
                    <h3 className="font-display text-2xl font-light text-[hsl(220,45%,15%)] mb-6 leading-tight">
                      Нажмите на дату с золотой точкой
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(EVENTS_DATA).slice(0, 5).map(([dateKey, evs]) => (
                        <button
                          key={dateKey}
                          onClick={() => setSelectedDate(dateKey)}
                          className="w-full text-left flex items-center gap-3 py-2 border-b border-[hsl(220,20%,88%)] group"
                        >
                          <span className="font-body text-xs text-[hsl(220,15%,55%)] w-12 shrink-0">
                            {dateKey.split("-")[2]}.{dateKey.split("-")[1]}
                          </span>
                          <span className="font-body text-sm text-[hsl(220,15%,35%)] group-hover:text-[hsl(220,45%,15%)] transition-colors leading-tight">
                            {evs[0].title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[hsl(45,65%,42%)] text-xs font-body tracking-widest uppercase mt-6 cursor-pointer">
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
      <section id="contacts" className="section-padding" style={{ background: "hsl(40,20%,96%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(45,80%,52%)] mb-4">Контакты</p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-[hsl(220,45%,15%)] leading-tight mb-10 gold-line">
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
                    <div className="w-9 h-9 bg-[hsl(220,45%,15%)]/8 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name={c.icon} size={15} className="text-[hsl(220,45%,15%)]" fallback="Info" />
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-wider uppercase text-[hsl(220,15%,50%)] mb-1">{c.label}</p>
                      <p className="font-body text-sm text-[hsl(220,15%,30%)] whitespace-pre-line">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-[hsl(220,20%,88%)] p-8 shadow-sm">
              <h3 className="font-display text-2xl font-semibold text-[hsl(220,45%,15%)] mb-6">Отправить запрос</h3>
              <div className="space-y-4">
                {[
                  { label: "Имя", type: "text", placeholder: "Ваше имя" },
                  { label: "E-mail", type: "email", placeholder: "your@email.com" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="font-body text-xs tracking-wider uppercase text-[hsl(220,15%,50%)] block mb-2">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full border border-[hsl(220,20%,88%)] px-4 py-3 font-body text-sm text-[hsl(220,35%,15%)] focus:outline-none focus:border-[hsl(220,45%,15%)] transition-colors bg-white"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-body text-xs tracking-wider uppercase text-[hsl(220,15%,50%)] block mb-2">Сообщение</label>
                  <textarea
                    rows={4}
                    placeholder="Ваш вопрос или запрос..."
                    className="w-full border border-[hsl(220,20%,88%)] px-4 py-3 font-body text-sm text-[hsl(220,35%,15%)] focus:outline-none focus:border-[hsl(220,45%,15%)] transition-colors resize-none bg-white"
                  />
                </div>
                <button className="btn-gold w-full justify-center">
                  Отправить сообщение
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(220,45%,15%)] border-t border-white/10 py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-semibold text-white">
              ЦКИ<span className="text-[hsl(45,80%,52%)]">.</span>
            </span>
            <span className="text-white/30 text-xs font-body hidden md:block">Центр Креативных Индустрий</span>
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