# 4.2 Создаем интерактивное справочное руководство

* Опишем модульный компонент (т.е. его легко интегрировать и легко вырезать), который позволит легко документировать элементы в DOM древе активной страницы.

* Заложим масштабируемость: можно прокидывать массив с подсказками сразу для всех страниц, если селекторы html-элементов уникальны и не повторяются. Просто те элементы, которых нет на активной странице будут пропущены => нет проблем независимо от вашего роутинга

* Заметим, что было бы полезно оставлять ссылки на доп. доку (более подробную), если она есть.

* Полезно было бы заложить для генерируемого компонента возможность прокидывать контент строкой или разметкой (если нам нужна картинка).

* Хорошо было бы дописать логику обработку кейсов выхода подсказок за границы видимой части экрана