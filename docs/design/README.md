# Проєктування бази даних

## Модель бізнес-об'єктів

@startuml

left to right direction

    entity User #ffd24d
    entity User.id #ffe699
    entity User.username #ffe699
    entity User.password #ffe699
    entity User.email #ffe699
    entity User.first_name #ffe699
    entity User.last_name #ffe699
    entity User.avatar #ffe699

    User.id -d-* User
    User.username -d-* User
    User.password -d-* User
    User.email -d-* User
    User.first_name -d-* User
    User.last_name -d-* User
    User.avatar  --* User


    entity Grant #a64dff
    entity Grant.id #d9b3ff
    entity Grant.permission #d9b3ff

    Grant.id --* Grant
    Grant.permission --* Grant


    entity Role #4d79ff
    entity Role.id #b3c6ff
    entity Role.name #b3c6ff

    Role.id -d-* Role
    Role.name -d-* Role


    entity ProjectMemberRole #4dffff
    entity ProjectMemberRole.id #b3ffff

    ProjectMemberRole.id --* ProjectMemberRole


    entity ProjectMember #a6ff4d
    entity ProjectMember.id #d9ffb3

    ProjectMember.id -r-* ProjectMember


    entity Project #4dff79
    entity ProjectReport #ffff4d
    entity Task #4dffd2
    entity SupportRequest #ff4dd3
    entity SupportRequestAnswer #ff4d4d




    User "1,1" -d-- "0,*" ProjectMember
    Grant "1,1" -r- "0,*" Role

    ProjectMemberRole "0,*" -l-- "1,1" Role
    ProjectMemberRole "0,*" -u-- "1,1" ProjectMember

@enduml

## ER-модель

## Реляційна схема

