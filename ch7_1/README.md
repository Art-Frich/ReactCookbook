# Защищаем запросы, а не маршруты

Суть рецепта в том, чтобы состояние логининга дублировалось на бэкенде. Т.е. создавалось своего рода "сессионное состояние". Для чего?

Мы создаем мидлвару на бэке, суть которой - проверять, данная "ручка" защищена? Входит в список "открытых"? Или же требует логинининга?

Если ручка открыта - запрос успешен в любом случае, что на фронте мы и обрабатываем. Но если ручка защищена, то сначала бэк смотрит, пользователь в текущей сессии уже логинился? Если нет, то вернуть запрос с ошибкой, а на фронте мы меняем ЛОКАЛЬНОЕ значение isLogged на 'false'. 

Ввиду предложенной автором архитектуры, пользователь тут же будет выброшен из приложения до авторизации. Т.е. вернуться к "открытым" данным у него тоже не получится - недостататок предложенной архитектуры.

Это любопытная идея - создавать на бэкенд свою копию состояния, но большого смысла она не имеет в наше время, т.к. эту функцию на себя берет jwt токен =)

P.S. бэкэнд автор не выдал, а мы и не писали.