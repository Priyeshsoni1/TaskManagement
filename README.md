## Structure Patter

1. Following MVC Pattern
2. Start -> Index.js -> Apply middleware-> routing -> controllers

## Postman Collection Link (google drive)

https://drive.google.com/file/d/1QliijaGh4KQiLC-KohvhZnS4saSYtk4c/view?usp=sharing

## Scalable In Future Perspective

1. APIs can be decoupled (embedded documents are not ideal for scalability).
2. Integrate rate limiting (authorize using token/key; unauthenticated access can be rate-limited by IP address).
3. Add indexes on frequently filtered database columns.
4. Add a caching layer like Redis on top of the database.
5. Integrate a message queue system like RabbitMQ for asynchronous processing.
6. Integrate Nodemailer for sending task and subtask notifications to users.
7. Response can be more Structure, API responses in a consistent JSON pattern, for example:
   {
   "data": [],
   "error": "",
   "message": "Success",
   "statusCode": 200,
   "meta": {}
   }

## APIs

# Auth

1. register -> https://taskmanagement-i7y1.onrender.com/api/v1/auth/register
   {
   "name": "John Doe",
   "email": "john@example.com",
   "password": "123456"
   }
2. login - > https://taskmanagement-i7y1.onrender.com/api/v1/auth/login
   {
   "email": "john@example.com",
   "password": "123456"
   }

# Task (Get the Token from Login/Register Call)

1.  Get Task -> https://taskmanagement-i7y1.onrender.com/api/v1/tasks
2.  Post Task -> https://taskmanagement-i7y1.onrender.com/api/v1/tasks
    {
    "subject": "Priyesh",
    "deadline": "2025-07-30",
    "status": "pending", // enum: ["pending", "in-progress", "completed"],
    "subtasks": [
    {
    "subject": "Subtask A",
    "deadline": "2025-07-28",
    "status": "in-progress" // enum: ["pending", "in-progress", "completed"],
    }
    ]

}

3. Put Task -> https://taskmanagement-i7y1.onrender.com/api/v1/tasks/68815c07876735c3636d75d5
   {
   "subject": "Priyesh Soni",
   "deadline": "2025-07-30",
   "status": "pending" // enum: ["pending", "in-progress", "completed"],

}

4. Delete Task- > https://taskmanagement-i7y1.onrender.com/api/v1/tasks/68815a6e876735c3636d75ad

# Subtask

1. Get Subtask -> https://taskmanagement-i7y1.onrender.com/api/v1/tasks/68815bec876735c3636d75c5/subtasks

2. put Subtask -> https://taskmanagement-i7y1.onrender.com/api/v1/tasks/68815bec876735c3636d75c5/subtasks

{
"subtasks": [
{

"subject": "Task 1",
"deadline": "2025-07-30",
"status": "pending" // enum: ["pending", "in-progress", "completed"],
},
{

"subject": "Task 1",
"deadline": "2025-07-30",
"status": "pending" // enum: ["pending", "in-progress", "completed"],
}
]
}
