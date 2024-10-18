# Модель прецедентів

Цей розділ містить загальну діаграму прецедентів, діаграми для кожної категорії користувачів системи та діаграми
діяльності для кожного сценарію використання

## Загальна діаграма прецедентів

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

    actor "Користувач" as User #e8e9ff
    actor "Учасник проєкту" as ProjectMember #e8ffe9
    actor "Проєктний менеджер" as ProjectManager #ffffc8
    actor "Адміністратор" as Admin #ffe8e8

    ProjectMember -u-|> User
    ProjectManager -u-|> ProjectMember
    Admin -u-|> ProjectManager

    usecase "Керувати\nакаунтом" as AccountManage #e8e9ff
    usecase "Надіслати запит\nна приєднання до проєкту" as SendProjectConnectRequest #e8e9ff
    usecase "Надіслати запит\nадміністратору за підтримкою" as SendHelpRequest #e8e9ff

    User -u-> AccountManage
    User -l-> SendProjectConnectRequest
    User -r-> SendHelpRequest

    usecase "Керувати\nзавданнями" as TaskManage #e8ffe9
    usecase "Вийти\nз проєкту" as LeaveProject #e8ffe9

    SendHelpRequest -d[hidden]-> LeaveProject
    SendProjectConnectRequest -d[hidden]-> TaskManage

    ProjectMember -l-> TaskManage
    ProjectMember -r-> LeaveProject

    usecase "Керувати\nпроєктами" as ProjectManage #ffffc8
    usecase "Керувати\nучасниками проєкту" as ProjectMemberManage #ffffc8
    usecase "Призначити\nзавдання учаснику" as AssignTask #ffffc8

    LeaveProject -d[hidden]-> ProjectManage
    ProjectMemberManage -u[hidden]-> TaskManage

    ProjectManager -u-> ProjectManage
    ProjectManager -l-> ProjectMemberManage
    ProjectManager -r-> AssignTask

    usecase "Керувати\nдозволами" as ManagePermissions #ffe8e8
    usecase "Відповісти\nна запит користувача" as AnswerUserQuestion #ffe8e8

    Admin -r-> ManagePermissions
    Admin -l-> AnswerUserQuestion

@enduml

</div>

### Діаграма прецедентів для користувача

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

    actor "Користувач" as User #e8e9ff

    usecase "Керувати\nакаунтом" as AccountManage #e8e9ff
    usecase "Надіслати запит\nна приєднання до проєкту" as SendProjectConnectRequest #e8e9ff
    usecase "Надіслати запит\nадміністратору за підтримкою" as SendHelpRequest #e8e9ff
    
    User -u-> AccountManage
    User -l-> SendProjectConnectRequest
    User -r-> SendHelpRequest
    
    usecase "Створити\nакаунт" as CreateAccount
    usecase "Увійти\nв акаунт" as LogInAccount
    usecase "Редагувати\nдані акаунту" as EditAccount
    usecase "Видалити\nакаунт" as DeleteAccount
    
    AccountManage <.u. CreateAccount : extends
    AccountManage <.u. LogInAccount : extends
    AccountManage <.u. EditAccount : extends
    AccountManage <.u. DeleteAccount : extends

@enduml

</div>

### Діаграма прецедентів для учасника проєкту

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;
    width: fit-content;
    margin: 0 auto;">

@startuml

    actor "Учасник проєкту" as ProjectMember #e8ffe9

    usecase "Управління завданнями" as TaskManagement #e4ffdb

    usecase "Створити завдання" as CreateTask 
    usecase "Редагувати завдання" as EditTask 
    usecase "Видалити завдання" as DeleteTask 
    usecase "Коментувати завдання" as CommentTask 
    usecase "Вийти з проєкту" as LogOut #e4ffdb


    ProjectMember -l-> LogOut
    ProjectMember -r-> TaskManagement

    TaskManagement <.u. CreateTask :extends
    TaskManagement <.d. EditTask :extends
    TaskManagement <.d. CommentTask :extends
    TaskManagement <.u. DeleteTask :extends

@enduml

</div>

### Діаграма прецедентів для проєктного менеджера

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

    actor "Проєктний менеджер" as ProjectManager #ffffc8
    
    usecase "Керування проєктом" as ProjectManage #ffffc8
    usecase "Звіт проєкту" as ProjectReport
    usecase "Створити проєкт" as CreateProject
    usecase "Редагувати проєкт" as EditProject
    usecase "Видалити проєкт" as DeleteProject
    
    usecase "Керування учасниками проєкту" as ProjectMemberManagement #ffffc8
    usecase "Додати учасника" as AddMember
    usecase "Видалити учасника" as DeleteMember
    usecase "Прийняти запит користувача\nна приєднання до проєкту" as AcceptUserConnectRequest
    
    usecase "Призначити\nзавдання учаснику" as AssignTaskToMember #ffffc8
    
    ProjectManager -r-> ProjectManage
    ProjectManager -l-> ProjectMemberManagement
    ProjectManager -d-> AssignTaskToMember
    
    ProjectManage <.u. ProjectReport :extends
    ProjectManage <.u. CreateProject :extends
    ProjectManage <.d. EditProject :extends
    ProjectManage <.d. DeleteProject :extends
    
    ProjectMemberManagement <.u. AddMember :extends
    ProjectMemberManagement <.u. DeleteMember :extends
    ProjectMemberManagement <.d. AcceptUserConnectRequest
    
    CreateProject -[hidden]--> EditProject

@enduml

</div>

### Діаграма прецедентів для адміністратора

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;
    width: fit-content;
    margin: 0 auto;">

@startuml

    actor "Адміністратор" as Admin #ffcccb

    usecase "Керувати дозволами" as PermissionsManage #ffcccb

    usecase "Заблокувати користувача" as BlockUser
    usecase "Розблокувати користувача" as UnblockUser
    usecase "Відповісти на запит користувача" as RespondUserRequest #ffcccb


    Admin -l-> RespondUserRequest
    Admin -r-> PermissionsManage

    PermissionsManage <.u. BlockUser :extends
    PermissionsManage <.d. UnblockUser :extends

@enduml

</div>

## Сценарії використання

### Створити обліковий запис

| <div style="text-align: left">ID</div> | <div style="text-align: left">`CreateAccount`</div>                                                                                                                                                                                                                                                                            |
|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| НАЗВА                                  | Створити обліковий запис                                                                                                                                                                                                                                                                                                       |
| УЧАСНИКИ                               | Користувач, система                                                                                                                                                                                                                                                                                                            |
| ПЕРЕДУМОВИ                             | Користувач не має облікового запису в системі                                                                                                                                                                                                                                                                                  |
| РЕЗУЛЬТАТ                              | Створений обліковий запис користувача                                                                                                                                                                                                                                                                                          |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | <ul><li>`CreateAccount_AlreadyRegisteredEXC`<br>обліковий запис з таким ім'ям користувача вже зареєстровано</li><li>`CreateAccount_MissingDataEXC`<br>користувач заповнив не всі обов'язкові поля у формі реєстрації</li><li>`CreateAccount_InvalidDataEXC`<br>користувач ввів некоректні дані у реєстраційній формі</li></ul> |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Користувач|
start;
:Натискає кнопку\n"Створити обліковий запис";

|#e6f3ff|Система|
:Відкриває сторінку\nз формою реєстрації\nоблікового запису;

|Користувач|
:Вписує реєстраційні\nдані в поля форми;
:Натискає кнопку\n"Підтвердити";

|Система|

:Отримує запит на реєстрацію\nта дані реєстраційної форми;
:Перевіряє коректність\nданих, отриманих з\nреєстраційної форми користувача;

note right #ffb3b3
CreateAccount_MissingDataEXC
CreateAccount_InvalidDataEXC
end note

:Перевіряє ім'я\nкористувача на унікальність;

note right #ffb3b3
CreateAccount_AlreadyRegisteredEXC
end note

:Створює новий обліковий запис;
:Повідомляє користувача про\nуспішне створення та вхід\nв обліковий запис;

|Користувач|
:Завершує взаємодію\nз системою;
stop;

@enduml

</div>

### Увійти в обліковий запис

| <div style="text-align: left">ID</div> | <div style="text-align: left">`Login`</div>                                                                                                                                                                                                                        |
|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| НАЗВА                                  | Увійти в обліковий запис                                                                                                                                                                                                                                           |
| УЧАСНИКИ                               | Користувач, система                                                                                                                                                                                                                                                |
| ПЕРЕДУМОВИ                             | Користувач має обліковий запис в системі                                                                                                                                                                                                                           |
| РЕЗУЛЬТАТ                              | Вхід в обліковий запис користувача                                                                                                                                                                                                                                 |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | <ul><li>`Login_NotRegisteredEXC`<br>обліковий запис з таким ім'ям користувача не зареєстровано</li><li>`Login_MissingDataEXC`<br>користувач заповнив не всі поля у формі входу</li><li>`Login_InvalidPasswordEXC`<br>користувач ввів неправильний пароль</li></ul> |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Користувач|
start;
:Натискає на кнопку "Вхід";

|#e6f3ff|Система|
:Відкриває сторінку з формою\nвходу в обліковий запис;

|Користувач|
:Вводить ім'я користувача та пароль;
:Натискає кнопку "Увійти";

|Система|
:Перевіряє існування облікового\nзапису та коректність введених даних;

note right #ffb3b3
Login_NotRegisteredEXC
Login_MissingDataEXC
Login_InvalidPasswordEXC
end note

:Авторизує користувача;
:Перенаправляє користувача\nна головну сторінку;

|Користувач|
:Завершує взаємодію з системою;
stop;

@enduml

</div>

### Редагувати дані облікового запису

| <div style="text-align: left">ID</div> | <div style="text-align: left">`EditProfile`</div>                                                                                                                                                        |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| НАЗВА                                  | Редагувати дані в облікового запису                                                                                                                                                                      |
| УЧАСНИКИ                               | Користувач, система                                                                                                                                                                                      |
| ПЕРЕДУМОВИ                             | <ul><li>Користувач має обліковий запис в системі</li><li>Користувач увійшов в обліковий запис</li></ul>                                                                                                  |
| РЕЗУЛЬТАТ                              | Змінені дані облікового запису                                                                                                                                                                           |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | <ul><li>`EditProfile_MissingDataEXC`<br>користувач змінив значення якогось із полів на порожній рядок</li><li>`EditProfile_InvalidDataEXC`<br>користувач ввів некоректні дані для деяких полів</li></ul> |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Користувач|
start;
:Натискає кнопку\n"Редагувати профіль";

|#e6f3ff|Система|
:Відкриває сторінку\nредагування профілю;

|Користувач|
:Змінює дані в будь-якому з полів;
:Натискає кнопку "Зберегти";

|Система|
:Перевіряє коректність\nданих, які були змінені;

note right #ffb3b3
EditProfile_MissingDataEXC
EditProfile_InvalidDataEXC
end note

:Зберігає дані, змінені користувачем;

|Користувач|
:Завершує взаємодію з системою;
stop;

@enduml

</div>

### Видалити обліковий запис

| <div style="text-align: left">ID</div> | <div style="text-align: left">`DeleteAccount`</div>                                                     |
|----------------------------------------|---------------------------------------------------------------------------------------------------------|
| НАЗВА                                  | Видалити обліковий запис                                                                                |
| УЧАСНИКИ                               | Користувач, система                                                                                     |
| ПЕРЕДУМОВИ                             | <ul><li>Користувач має обліковий запис в системі</li><li>Користувач увійшов в обліковий запис</li></ul> |
| РЕЗУЛЬТАТ                              | Видалений обліковий запис                                                                               |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | `DeleteAccount_InvalidPasswordEXC`<br>користувач ввів неправильний пароль                               |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Користувач|
start;
:Натискає кнопку\n"Видалити обліковий запис";

|#e6f3ff|Система|
:Відкриває сторінку\nз полем для введення пароля;

|Користувач|
:Вводить пароль;

|Система|
:Перевіряє правильність пароля;

note right #ffb3b3
DeleteAccount_InvalidPasswordEXC
end note

:Повідомляє про успішне\nвидалення облікового запису;

|Користувач|
:Завершує взаємодію з системою;
stop;

@enduml

</div>

### Надіслати запит на приєднання до проєкту

| <div style="text-align: left">ID</div> | <div style="text-align: left">`JoinProjectRequest`</div>                                                                                             |
|----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| НАЗВА                                  | Надіслати запит на приєднання до проєкту                                                                                                             |
| УЧАСНИКИ                               | Користувач, система                                                                                                                                  |
| ПЕРЕДУМОВИ                             | <ul><li>Користувач має обліковий запис в системі</li><li>Користувач увійшов в обліковий запис</li></ul>                                              |
| РЕЗУЛЬТАТ                              | Запит на приєднання до обраного проєкту надіслано                                                                                                    |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | <ul><li>`JoinProject_AlreadyMemberEXC`<br>Користувач вже є учасником проєкту</li><li>`JoinProject_RequestExistsEXC`<br>Запит уже надіслано</li></ul> |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Користувач|
start;
:Натискає на кнопку "Проєкти";

|#e6f3ff|Система|
:Відображає список доступних проєктів;

|Користувач|
:Обирає проєкт та\nнатискає "Приєднатися";

|Система|
:Перевіряє, чи не є\nкористувач уже учасником;

note right #ffb3b3
JoinProject_AlreadyMemberEXC
end note

:Перевіряє, чи не існує вже запиту;

note right #ffb3b3
JoinProject_RequestExistsEXC
end note

:Надсилає запит на приєднання\nдо проєкту;

|Користувач|
:Отримує повідомлення про успішне\nнадсилання запиту або помилку;

:Завершує взаємодію з системою;
stop;

@enduml

</div>

### Надіслати запит адміністратору за підтримкою

| <div style="text-align: left">ID</div> | <div style="text-align: left">`SupportRequest`</div>                           |
|----------------------------------------|--------------------------------------------------------------------------------|
| НАЗВА                                  | Надіслати запит адміністратору за підтримкою                                   |
| УЧАСНИКИ                               | Користувач, система                                                            |
| ПЕРЕДУМОВИ                             | Користувач має обліковий запис у системі                                       |
| РЕЗУЛЬТАТ                              | Запит надісланий адміністратору                                                |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | `SupportRequest_MissingDataEXC`<br>Користувач не заповнив усі обов'язкові поля |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Користувач|
start;
:Натискає на кнопку "Підтримка";

|#e6f3ff|Система|
:Відображає форму для запиту\nна підтримку;

|Користувач|
:Заповнює поля запиту та\nнатискає "Надіслати";

|Система|
:Перевіряє, чи всі поля заповнено;

note right #ffb3b3
SupportRequest_MissingDataEXC
end note

:Надсилає запит адміністратору;

|Користувач|
:Отримує підтвердження про\nуспішне надсилання запиту;

:Завершує взаємодію з системою;
stop;

@enduml

</div>

### Створити завдання

| <div style="text-align: left">ID</div> | <div style="text-align: left">`CreateTask`</div>                                                                                                                                                                                                                                         |
|----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| НАЗВА                                  | Створити завдання                                                                                                                                                                                                                                                                        |
| УЧАСНИКИ                               | Учасник проєкту, система                                                                                                                                                                                                                                                                 |
| ПЕРЕДУМОВИ                             | <ul><li>Учасник проєкту авторизований</li><li>Учасник проєкту обрав проєкт для створення завдання</li></ul>                                                                                                                                                                              |
| РЕЗУЛЬТАТ                              | Завдання створене                                                                                                                                                                                                                                                                        |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | <ul><li>`CreateTask_AccessDeniedEXC`<br>учасник проєкту не має прав на створення завдання</li><li>`CreateTask_MissingDataEXC`<br>учасник проєкту не заповнив необхідні поля</li><li>`CreateTask_InvalidDataEXC`<br>учасник проєкту надав некоректні дані для створення проєкту</li></ul> |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Учасник проєкту|
start;
:Натискає кнопку \n"Створити завдання";

|#e6f3ff|Система|
:Перевіряє права учасника ;

note right #ffb3b3
CreateTask_AccessDeniedEXC
end note

:Виводить форму \nдля створення завдання;

|Учасник проєкту|
:Заповнює форму;
:Натискає кнопку "Створити";

|Система|
:Перевіряє коректність \nнаведених полів;

note right #ffb3b3
CreateTask_MissingDataEXC
CreateTask_InvalidDataEXC
end note

:Створює і відображає завдання ;

|Учасник проєкту|
:Завершує взаємодію з системою;
stop;

@enduml

</div>

### Додати коментар до завдання

| <div style="text-align: left">ID</div> | <div style="text-align: left">`CommentTask`</div>                                                                                                                              |
|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| НАЗВА                                  | Додати коментар до завдання                                                                                                                                                    |
| УЧАСНИКИ                               | Учасник проєкту, система                                                                                                                                                       |
| ПЕРЕДУМОВИ                             | Користувач є учасником проєкту                                                                                                                                                 |
| РЕЗУЛЬТАТ                              | Доданий коментар до завдання                                                                                                                                                   |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | <ul><li>`CommentTask_TooShortEXP`<br>учасник проєкту ввів занадто короткий коментар</li><li>`CommentTask_TooLongEXP`<br>учасник проєкту ввів занадто довгий коментар</li></ul> |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Учасник проєкту|
start;

:Натискає на кнопку\nз назвою завдання;

|#e6f3ff|Система|
:Відкриває вибране завдання;

|Учасник проєкту|
:Натискає на кнопку\n"Додати коментар";

|Система|
:Відкриває нотатку\nдля введення коментаря;

|Учасник проєкту|
:Вводить коментар;

:Натискає кнопку\n"Підтвердити";

|Система|
:Перевіряє правильність\nнаписання коментаря;

note right #ffb3b3
CommentTask_TooShortEXP
CommentTask_TooLongEXP
end note

:Введений коментар з'являється у завданні;

|Учасник проєкту|
:Завершує взаємодію з системою;

stop;

@enduml

</div>

### Редагувати завдання

| <div style="text-align: left">ID</div> | <div style="text-align: left">`EditTask`</div>                                                                                                                                                                                                                  |
|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| НАЗВА                                  | Редагувати завдання                                                                                                                                                                                                                                             |
| УЧАСНИКИ                               | Учасник проєкту, система                                                                                                                                                                                                                                        |
| ПЕРЕДУМОВИ                             | <ul><li>Учасник проєкту авторизований</li><li>Учасник проєкту обрав завдання</li></ul>                                                                                                                                                                          |
| РЕЗУЛЬТАТ                              | Завдання відредаговане                                                                                                                                                                                                                                          |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | <ul><li>`EditTask_AccessDeniedEXC`<br>учасник проєкту не має прав на редагування завдання</li><li>`EditTask_MissingDataEXC`<br>учасник проєкту не заповнив необхідні поля</li><li>`EditTask_InvalidDataEXC`<br>учасник проєкту надав некоректні дані </li></ul> |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Учасник проєкту|
start;
:Натискає кнопку \n"Редагувати завдання";

|#e6f3ff|Система|
:Перевіряє права учасника ;

note right #ffb3b3
EditTask_AccessDeniedEXC
end note

:Виводить форму \nдля редагування завдання;

|Учасник проєкту|
:Редагує завдання;
:Натискає кнопку "Зберегти";

|Система|
:Перевіряє коректність \nвведених даних;

note right #ffb3b3
EditTask_MissingDataEXC
EditTask_InvalidDataEXC
end note

:Зберігає внесені зміни та відображає\nвідредаговане завдання;

|Учасник проєкту|
:Завершує взаємодію з системою;
stop;

@enduml

</div>

### Видалити завдання

| <div style="text-align: left">ID</div> | <div style="text-align: left">`DeleteTask`</div>                                       |
|----------------------------------------|----------------------------------------------------------------------------------------|
| НАЗВА                                  | Видалити завдання                                                                      |
| УЧАСНИКИ                               | Учасник проєкту, система                                                               |
| ПЕРЕДУМОВИ                             | <ul><li>Учасник проєкту авторизований</li><li>Учасник проєкту обрав завдання</li></ul> |
| РЕЗУЛЬТАТ                              | Завдання видалене                                                                      |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | `DeleteTask_AccessDeniedEXC`<br>учасник проєкту не має прав на видалення завдання      |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Учасник проєкту|
start;
:Натискає кнопку \n"Видалити завдання";

|#e6f3ff|Система|
:Перевіряє права учасника ;

note right #ffb3b3
DeleteTask_AccessDeniedEXC
end note

:Виводить вікно для \nпідтвердження видалення;

|Учасник проєкту|
:Натискає кнопку "Підтвердити";

|Система|
:Видаляє завдання;

|Учасник проєкту|
:Завершує взаємодію з системою;
stop;

@enduml

</div>

### Покинути проєкт

| <div style="text-align: left">ID</div> | <div style="text-align: left">`LeaveProject`</div>                                              |
|----------------------------------------|-------------------------------------------------------------------------------------------------|
| НАЗВА                                  | Покинути проєкт                                                                                 |
| УЧАСНИКИ                               | Учасник проєкту, система                                                                        |
| ПЕРЕДУМОВИ                             | Користувач є учасником проєкту                                                                  |
| РЕЗУЛЬТАТ                              | Вихід із проєкту                                                                                |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | `LeaveProject_InvalidPasswordEXC`<br>учасник проєкту ввів неправильний пароль облікового запису |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Учасник проєкту|
start;
:Натискає на кнопку\n"Проєкти";

|#e6f3ff|Система|
:Відкриває сторінку з проєктами,\nв яких даний користувач бере участь;

|Учасник проєкту|
:Напроти відповідного проєкту\nнатискає на кнопку "Залишити";

|Система|
:Відкриває вікно з полем вводу\nпароля облікового запису;

|Учасник проєкту|
:Вводить пароль;

|Система|
:Перевіряє\nправильність пароля;

note right #ffb3b3
LeaveProject_InvalidPasswordEXC
end note

:Прибирає видалений проєкт\nзі списку дійсних проєктів;

|Учасник проєкту|
:Завершує взаємодію з системою;

stop;

@enduml

</div>

### Створити проєкт

| <div style="text-align: left">ID</div> | <div style="text-align: left">`CreateProject`</div>                                                                                                                                                  |
|----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| НАЗВА                                  | Створити проєкт                                                                                                                                                                                      |
| УЧАСНИКИ                               | Проєктний менеджер, система                                                                                                                                                                          |
| ПЕРЕДУМОВИ                             | <ul><li>Проєктний менеджер має обліковий запис в системі</li><li>Проєктний менеджер увійшов в обліковий запис</li></ul>                                                                              |
| РЕЗУЛЬТАТ                              | Створений проєкт                                                                                                                                                                                     |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | <ul><li>`CreateProject_InvalidProjectDataEXC`<br>проєктний менеджер ввів некоректні дані проєкту</li><li>`CreateProject_MissingDataEXC`<br>проєктний менеджер не заповнив обов'язкові поля</li></ul> |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Проєктний менеджер|
start;
:Натискає на кнопку\n"Створити новий проєкт";

|#e6f3ff|Система|
:Відкриває сторінку з полями\nдля створення проєкту;

|Проєктний менеджер|
:Вводить інформацію\nпро проєкт;

:Натискає кнопку\n"Підтвердити";

|Система|
:Перевіряє правильність\nвведеної інформації;

note right #ffb3b3
CreateProject_InvalidProjectDataEXC
CreateProject_MissingDataEXC
end note

:Відкриває сторінку з\nполем введення пароля;

|Проєктний менеджер|
:Вводить пароль;

|Система|
:Перевіряє правильність пароля;

note right #ffb3b3
LeaveProject_InvalidPasswordEXC
end note

:Додає новий проєкт в\nсписок створених проєктів;

|Проєктний менеджер|
:Завершує взаємодію з системою;

stop;

@enduml

</div>

### Редагувати проєкт

| <div style="text-align: left">ID</div> | <div style="text-align: left">`EditProject`</div>                                                                                                                                                |
|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| НАЗВА                                  | Редагувати проєкт                                                                                                                                                                                |
| УЧАСНИКИ                               | Проєктний менеджер, система                                                                                                                                                                      |
| ПЕРЕДУМОВИ                             | Проєктний менеджер створив проєкт                                                                                                                                                                |
| РЕЗУЛЬТАТ                              | Відредагований проєкт                                                                                                                                                                            |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | <ul><li>`EditProject_InvalidDataEXC`<br>проєктний менеджер ввів некоректні дані</li><li>`EditProject_InvalidPasswordEXC`<br>учасник проєкту ввів неправильний пароль облікового запису</li></ul> |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Проєктний менеджер|
start;

:Натискає на кнопку\n"Редагувати проєкт";

|#e6f3ff|Система|
:Відкриває сторінку з\nінформацією про проєкт;

|Проєктний менеджер|
:Змінює потрібні\nйому параметри;

:Натискає кнопку\n"Підтвердити";

|Система|
:Перевіряє коректність\nзмін проєкту;

note right #ffb3b3
EditProject_InvalidDataEXC
end note

:Відкриває сторінку з\nполем вводу пароля;

|Проєктний менеджер|
:Вводить пароль;

:Натискає кнопку\n"Підтвердити";

|Система|
:Перевіряє\nправильність пароля;

note right #ffb3b3
EditProject_InvalidPasswordEXC
end note

:Вносить зміни в проєкт;

|Проєктний менеджер|
:Завершує взаємодію з системою;

stop;

@enduml

</div>

### Видалити проєкт

| <div style="text-align: left">ID</div> | <div style="text-align: left">`DeleteProject`</div>                                                 |
|----------------------------------------|-----------------------------------------------------------------------------------------------------|
| НАЗВА                                  | Видалити проєкт                                                                                     |
| УЧАСНИКИ                               | Проєктний менеджер, система                                                                         |
| ПЕРЕДУМОВИ                             | Проєктний менеджер створив проєкт                                                                   |
| РЕЗУЛЬТАТ                              | Видалений проєкт                                                                                    |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | `DeleteProject_InvalidPasswordEXC`<br>проєктний менеджер ввів неправильний пароль облікового запису |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Проєктний менеджер|
start;

:Натискає на кнопку\n"Видалити проєкт";

|#e6f3ff|Система|
:Відкриває сторінку з\nполем вводу пароля;

|Проєктний менеджер|
:Вводить пароль;

:Натискає кнопку\n"Підтвердити";

|Система|
:Перевіряє правильність пароля;

note right #ffb3b3
DeleteProject_InvalidPasswordEXC
end note

:Прибирає видалений проєкт\nзі списку створених проєктів;

|Проєктний менеджер|
:Завершує взаємодію з системою;

stop;

@enduml

</div>

### Отримати звіт проєкту

| <div style="text-align: left">ID</div> | <div style="text-align: left">`GetProjectReport`</div>                                |
|----------------------------------------|---------------------------------------------------------------------------------------|
| НАЗВА                                  | Отримати звіт проєкту                                                                 |
| УЧАСНИКИ                               | Проєктний менеджер, система                                                           |
| ПЕРЕДУМОВИ                             | Проєктний менеджер створив проєкт                                                     |
| РЕЗУЛЬТАТ                              | Отриманий звіт проєкту                                                                |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | `GetProjectReport_MissingDataEXC`<br>в проєкті не зібрано або не додано потрібні дані |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Проєктний менеджер|
start;

:Натискає на кнопку\n"Створити звіт проєкту";

|#e6f3ff|Система|
:Збирає та додає\nпотрібні дані у звіт;

note right #ffb3b3
GetProjectReport_MissingDataEXC
end note

:Відкриває вікно зі звітом;

|Проєктний менеджер|
:Натискає кнопку\n"Завантажити";

|Система|
:Відкриває посилання\nдля завантаження звіту;

|Проєктний менеджер|
:Завершує взаємодію з системою;

stop;

@enduml

</div>
### Прийняти запит користувача на приєднання до проєкту

| <div style="text-align: left">ID</div> | <div style="text-align: left">`AcceptUserConnectRequest`</div> |
|----------------------------------------|----------------------------------------------------------------|
| НАЗВА                                  | Прийняти запит користувача на приєднання до проєкту            |
| УЧАСНИКИ                               | Проєктний менеджер, система                                    |
| ПЕРЕДУМОВИ                             | Проєктний менеджер створив проєкт                              |
| РЕЗУЛЬТАТ                              | Прийнято користувача до проєкту                                |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | Немає                                                          |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;
    width: fit-content;">

@startuml

|#e6feff|Проєктний менеджер|
start;

:Натискає на кнопку "Прийняти запит на приєднання";

|#e6f3ff|Система|
:Відкриває сторінку підтвердження дії;

|Проєктний менеджер|
:Натискає кнопку "Підтвердити";

|Система|

:Додає користувача до проєкту;

:Оновлює список учасників проєкту;

|Проєктний менеджер|
:Завершує взаємодію з системою;

stop;

@enduml

</div>

### Додати учасника

| <div style="text-align: left">ID</div> | <div style="text-align: left">`AddMember`</div>            |
|----------------------------------------|------------------------------------------------------------|
| НАЗВА                                  | Додати учасника                                            |
| УЧАСНИКИ                               | Проєктний менеджер, система                                |
| ПЕРЕДУМОВИ                             | Користувач має обліковий запис в системі                   |
| РЕЗУЛЬТАТ                              | Учасника додано до проєкту                                 |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | `AddMember_AccountNotFound`<br>обліковий запис не знайдено |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;
    width: fit-content;">

@startuml

|#e6feff|Проєктний менеджер|
start;

:Натискає на кнопку "Додати учасника";

|#e6f3ff|Система|
:Відкриває сторінку з полем для\nвведення імені користувача нового учасника;

|Проєктний менеджер|
:Вводить ім'я користувача нового учасника;

:Натискає кнопку "Підтвердити";

|Система|
:Перевіряє існування облікового\nзапису з таким ім'ям користувача;

note right #ffb3b3
AddMember_AccountNotFound
end note

:Додає користувача до проєкту;

:Оновлює список учасників проєкту;

|Проєктний менеджер|
:Завершує взаємодію з системою;

stop;

@enduml

</div>

### Видалити учасника

| <div style="text-align: left">ID</div> | <div style="text-align: left">`DeleteMember`</div> |
|----------------------------------------|----------------------------------------------------|
| НАЗВА                                  | Видалити учасника                                  |
| УЧАСНИКИ                               | Проєктний менеджер, система                        |
| ПЕРЕДУМОВИ                             | Користувач є учасником проєкту                     |
| РЕЗУЛЬТАТ                              | Учасника видалено                                  |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | Немає                                              |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;
    width: fit-content;">

@startuml

|#e6feff|Проєктний менеджер|
start;

:Натискає на кнопку "Видалити учасника";

|#e6f3ff|Система|
:Відкриває сторінку зі списком для вибору учасника, якого потрібно видалити;

|Проєктний менеджер|
:Вибирає учасника зі списку;

:Натискає кнопку "Підтвердити";

|Система|
:Перевіряє чи існує учасник у проєкті;

:Видаляє користувача з проєкту;

:Оновлює список учасників проєкту;

|Проєктний менеджер|
:Завершує взаємодію з системою;

stop;

@enduml

</div>

### Призначити завдання учаснику

| <div style="text-align: left">ID</div> | <div style="text-align: left">`AssignTaskToMember`</div> |
|----------------------------------------|----------------------------------------------------------|
| НАЗВА                                  | Призначити завдання учаснику                             |
| УЧАСНИКИ                               | Проєктний менеджер, система                              |
| ПЕРЕДУМОВИ                             | Наявність учасника в проєкті                             |
| РЕЗУЛЬТАТ                              | Завдання призначено                                      |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | Немає                                                    |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;
    width: fit-content;">

@startuml

|#e6feff|Проєктний менеджер|
start;

:Натискає на кнопку "Завдання";

|#e6f3ff|Система|
:Відкриває сторінку зі списком завдань;

|Проєктний менеджер|
:Вибирає завдання зі списку;

:Натискає на кнопку "Призначити учаснику";

|Система|
:Відкриває сторінку зі списком учасників проєкту;

|Проєктний менеджер|
:Вибирає учасника зі списку;

|Система|
:Оновлює інформацію про завдання;

|Проєктний менеджер|
:Завершує взаємодію з системою;

stop;

@enduml

</div>

### Відповісти на запит підтримки користувача

| <div style="text-align: left">ID</div> | <div style="text-align: left">`SupportResponse`</div> |
|----------------------------------------|-------------------------------------------------------|
| НАЗВА                                  | Відповісти на запит підтримки користувача             |
| УЧАСНИКИ                               | Адміністратор, система                                |
| ПЕРЕДУМОВИ                             | Запит на підтримку надісланий користувачем            |
| РЕЗУЛЬТАТ                              | Відповідь на запит надіслана користувачеві            |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | Немає                                                 |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Адміністратор|
start;
:Натискає на кнопку "Модерація";

|#e6f3ff|Система|
:Відкриває панель модерації;

|Адміністратор|
:Натискає на гіперпосилання запиту;

|Система|
:Відображає деталі запиту на підтримку;

|Адміністратор|
:Заповнює відповідь та натискає "Надіслати";

|Система|
:Надсилає відповідь користувачеві;

|Адміністратор|
:Отримує підтвердження про успішне надсилання відповіді;

:Завершує взаємодію з системою;
stop;

@enduml

</div>

### Заблокувати користувача

| <div style="text-align: left">ID</div> | <div style="text-align: left">`BlockUser`</div>              |
|----------------------------------------|--------------------------------------------------------------|
| НАЗВА                                  | Заблокувати користувача                                      |
| УЧАСНИКИ                               | Адміністратор, система                                       |
| ПЕРЕДУМОВИ                             | Користувач має обліковий запис у системі                     |
| РЕЗУЛЬТАТ                              | Обліковий запис користувача заблокований у системі           |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | `BlockMember_AccountNotFound`<br>обліковий запис не знайдено |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Адміністратор|
start;
:Натискає на кнопку "Модерація";

|#e6f3ff|Система|
:Відкриває панель модерації;

|Адміністратор|
:Натискає на кнопку "Заблокувати користувача";

|Система|
:Відображає поле для введення імені користувача;

|Адміністратор|
:Вводить ім'я користувача;

:Натискає кнопку "Підтвердити";

|Система|
:Перевіряє існування облікового\nзапису з даним ім'ям;

note right #ffb3b3
BlockMember_AccountNotFound
end note

:Блокує користувача від користування системою;

:Оновлює список учасників всіх проєктів,\nу яких брав участь даний користувач;

|Адміністратор|
:Отримує підтвердження про\nуспішне заблокування користувача;

:Завершує взаємодію з системою;
stop;

@enduml

</div>

### Розблокувати користувача

| <div style="text-align: left">ID</div> | <div style="text-align: left">`UnblockUser`</div>              |
|----------------------------------------|----------------------------------------------------------------|
| НАЗВА                                  | Розблокувати користувача                                       |
| УЧАСНИКИ                               | Адміністратор, система                                         |
| ПЕРЕДУМОВИ                             | Користувач має обліковий запис у системі                       |
| РЕЗУЛЬТАТ                              | Обліковий запис користувача розблокований у системі            |
| ВИКЛЮЧНІ СИТУАЦІЇ                      | `UnblockMember_AccountNotFound`<br>обліковий запис не знайдено |

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

|#e6feff|Адміністратор|
start;
:Натискає на кнопку "Модерація";

|#e6f3ff|Система|
:Відкриває панель модерації;

|Адміністратор|
:Натискає на кнопку\n"Розблокувати користувача";

|Система|
:Відображає поле для введення імені користувача;

|Адміністратор|
:Вводить ім'я користувача;

:Натискає кнопку "Підтвердити";

|Система|
:Перевіряє існування облікового\nзапису з даним ім'ям;

note right #ffb3b3
UnblockMember_AccountNotFound
end note

:Розблоковує користувача;

|Адміністратор|
:Отримує підтвердження про\nуспішне розблокування користувача;

:Завершує взаємодію з системою;
stop;

@enduml

</div>
