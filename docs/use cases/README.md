# Модель прецедентів

Цей розділ містить загальну діаграму прецедентів, діаграми для кожної категорій користувачів системи та діаграми
діяльності для кожного сценарію використання

## Загальна діаграма прецедентів

<div style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    padding: 1em;">

@startuml

    actor "Користувач" as User #e8e9ff
    actor "Учасник проєкту" as ProjectMember #e8ffe9
    actor "Проєктний менеджер" as ProjectManager #ffffe8
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

    usecase "Керувати\nпроєктами" as ProjectManage #ffffe8
    usecase "Керувати\nучасниками проєкту" as ProjectMemberManage #ffffe8
    usecase "Призначити\nзавдання учаснику" as AssignTask #ffffe8

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

### Діаграма прецедентів для учасника проєкту

### Діаграма прецедентів для проєктного менеджера

### Діаграма прецедентів для адміністратора

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
| ВИКЛЮЧНІ СИТУАЦІЇ                      | <ul><li>`DeleteAccount_InvalidPasswordEXC`<br>користувач ввів неправильний пароль</li></ul>             |

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
