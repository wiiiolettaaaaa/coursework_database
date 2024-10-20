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
    entity Project.id #b3ffc6
    entity Project.name #b3ffc6
    entity Project.description #b3ffc6
    entity Project.status #b3ffc6

    Project.id -d-* Project
    Project.name -d-* Project
    Project.description -d-* Project
    Project.status -d-* Project

    entity Task #4dffd2
    entity Task.id #b3ffec
    entity Task.name #b3ffec
    entity Task.description #b3ffec
    entity Task.status #b3ffec
    entity Task.deadline #b3ffec

    Task.id -d-* Task
    Task.name -d-* Task
    Task.description -d-* Task
    Task.status -d-* Task
    Task.deadline -d-* Task

    entity SupportRequest #ff4dd3
    entity SupportRequest.id #ffb3ec
    entity SupportRequest.description #ffb3ec
    entity SupportRequest.topic #ffb3ec

    SupportRequest.id -u-* SupportRequest
    SupportRequest.topic -u-* SupportRequest
    SupportRequest.description -u-* SupportRequest

    entity SupportRequestAnswer #ff4d4d
    entity SupportRequestAnswer.id #ffb3b3
    entity SupportRequestAnswer.feedback #ffb3b3

    SupportRequestAnswer.id -d-* SupportRequestAnswer
    SupportRequestAnswer.feedback -d-* SupportRequestAnswer

    User "1,1" -d-- "0,*" ProjectMember
    Grant "1,1" -r- "0,*" Role

    ProjectMemberRole "0,*" -l-- "1,1" Role
    ProjectMemberRole "0,*" -u-- "1,1" ProjectMember
    ProjectMember "0,*" -u-- "1,1" Project
    Project "1,1" -u-- "0,*" Task
    Task -l[hidden]-> User
    SupportRequest.topic -l[hidden]-> Project.status

    SupportRequest "0,*" -r-- "1,1" User
    SupportRequestAnswer "0,*" -r-- "0,1" SupportRequest

@enduml

## ER-модель

## Реляційна схема

