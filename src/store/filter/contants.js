export const GENRES_OPTIONS = [
  { type: 8, name: "драма" },
  { type: 6, name: "комедия" },
  { type: 22, name: "биография" },
  { type: 16, name: "криминал" },
  { type: 3, name: "боевик" },
  { type: 4, name: "триллер" },
  { type: 11, name: "семейный" },
  { type: 2, name: "фантастика" },
  { type: 10, name: "приключения" },
  { type: 14, name: "мультфильм" },
  { type: 17, name: "детектив" },
  { type: 5, name: "фэнтези" },
  { type: 7, name: "мелодрама" },
  { type: 23, name: "история" },
  { type: 19, name: "военный" },
  { type: 13, name: "вестерн" },
  { type: 21, name: "музыка" },
  { type: 9, name: "мюзикл" },
  { type: 24, name: "спорт" },
];

export const SORT_OPTIONS = [
  { name: "сначала новые", type: "yearDesk" },
  { name: "сначала старые", type: "yearAsk" },
  { name: "от А до Я", type: "titleAsk" },
  { name: "от Я до А", type: "titleDesk" },
  { name: "сначала высокий рейтинг", type: "ratingDesk" },
  { name: "сначала низкий рейтинг", type: "ratingAsk" },
];

export const RAITING_OPTIONS = [
  { name: "топ 250", type: "top250" },
  { name: "рейтинг от 8", type: "gte8" },
  { name: "рейтинг от 7", type: "gte7" },
  { name: "рейтинг от 6", type: "gte6" },
];

export const YEAR_OPTIONS = [
  { name: new Date().getFullYear().toString(), type: 'current' },
  { name: (new Date().getFullYear() - 1).toString(), type: 'last' },
  { name: `2020 - ${new Date().getFullYear() - 2}`, type: 'from2020' },
  { name: "2010 - 2019", type: 'from2010' },
  { name: "2000 - 2009", type: 'from2000' },
  { name: "до 2000", type: 'less2000' },
];
