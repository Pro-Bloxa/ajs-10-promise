#CI Test
[![Build status](https://ci.appveyor.com/api/projects/status/tg1n2yh1b4kle5rc?svg=true)](https://ci.appveyor.com/project/Pro-Bloxa/ajs-10-promise)

Домашнее задание к лекции «Promises, async/await»
Важные моменты
Каждая задача выполняется в виде отдельного проекта с собственным GitHub-репозиторием.
Код должен проходить ESLint без ошибок.
Тесты должны обеспечивать 100-процентное покрытие тестируемых функций по строкам.
Решения должны быть построены на базе шаблона webpack.
В личном кабинете на сайте netology.ru в поле комментария к домашней работе добавьте ссылки на ваши GitHub-проекты.

Promises
Легенда
JavaScript живёт в асинхронном мире, и большинство операций в нём так же выполняются асинхронно. Вы реализовали возможность экспорта сохранённого прогресса игры в виде JSON. Теперь нужно реализовать загрузку из файла.

Описание
Для вас реализованы функции-заглушки, которые эмулируют чтение файла и преобразование прочитанного в JSON. Ваша задача — реализовать класс GameSavingLoader с методом load, который загружает данные с помощью функции read, парсит их с помощью функции json() и создаёт объект типа GameSaving.

Модуль parser.js:

export default function json(data) {
  return new Promise((resolve, reject) => {
    // эмуляция обработки ArrayBuffer
    setTimeout(() => {
      resolve(String.fromCharCode.apply(null, new Uint16Array(data)));
    }, 500);
  });
}
Модуль reader.js:

export default function read() {
  return new Promise((resolve, reject) => {
    // эмуляция чтения файла
    setTimeout(() => {
      const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
      return (input => {
        const buffer = new ArrayBuffer(input.length * 2);
        const bufferView = new Uint16Array(buffer);
        for (let i = 0; i < input.length; i++) {
          bufferView[i] = input.charCodeAt(i);
        }
        resolve(buffer);
      })(data);
    }, 1000); 
  });
}
Пример использования класса, если бы это был синхронный код:

export default class GameSavingLoader {
  static load() {
    const data = read(); // возвращается Promise!
    const value = json(data); // возвращается Promise!
    return value;
  }
}
Вам нужно переписать метод load так, чтобы он возвращал Promise с данными (см. формат ниже).

Спецификации объекта типа GameSaving:

{
  "id": <number>, // id сохранения
  "created": <timestamp>, // timestamp создания
  "userInfo": {
    "id": <number>, // user id
    "name": <string>, // user name
    "level": <number>, // user level
    "points": <number> // user points
  }
}
Т. е. ваш итоговый код должен работать так (модуль app.js):

GameSavingLoader.load().then((saving) => {
  // saving объект класса GameSaving
}, (error) => {
  // ...
});

