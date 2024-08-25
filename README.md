in this project we have 3 sub projects

1. TaskManagmentAPI
this project managed all the requests and the BL from project
The project was written in .NET 7 in a model of layers, the authentication managed by JWT and rhe the data is store in sqlserver DB

2. TaskManagmentClient
This project is written in React the state managment is managed by MOBX

2. RabbitMQ
this project have two project Sender, and Reciver.
the sender take from the DB all the tasks that their due date has arrived, and push them to Q.
the reciver is wait for the messages, and log them to the console