# ToDoList-App

# API Documentation

## Create User

Request :
- Method : POST
- Endpoint : `/users/register`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "username" : "string",
    "email" : "string",
    "password" : "string"
}
```

Response :

```json 
{
    "message": "User created successfully"
}
```

## Login

Request :
- Method : POST
- Endpoint : `/users/login`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "email" : "string",
    "password" : "string"
}
```

Response :

```json 
{
    "message": "Successful Login",
    "token": "token"
}
```

## Create Todo

Request :
- Method : POST
- Endpoint : `/todos`
- Authorization: `Bearer token`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
  "title": "string",
  "description": "string"
}
```

Response :

```json 
{
    "message": "Todo created successfully",
    "data": {
        "_id": "unique",
        "title": "string",
        "description": "string",
        "userId": "unique",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
}
```

## Get List Todos

Request :
- Method : GET
- Endpoint : `/todos`
- Authorization: `Bearer token`

Response :

```json 
{
    "message": "Get all todo successfully",
    "data": [
      {
          "_id": "unique",
          "title": "string",
          "description": "string",
          "userId": "unique",
          "createdAt": "timestamp",
          "updatedAt": "timestamp"
      },
       {
          "_id": "unique",
          "title": "string",
          "description": "string",
          "userId": "unique",
          "createdAt": "timestamp",
          "updatedAt": "timestamp"
      },
    ]
}
```

## Get Detail Todo

Request :
- Method : GET
- Endpoint : `/todos/:id`
- Authorization: `Bearer token`

Response :

```json 
{
    "message": "Get detail todo successfully",
    "data": {
        "_id": "unique",
        "title": "string",
        "description": "string",
        "userId": "unique",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
}
```

## Update Todo

Request :
- Method : PUT
- Endpoint : `/todos/:id`
- Authorization: `Bearer token`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
  "title": "string",
  "description": "string"
}
```

Response :

```json 
{
    "message": "Todo updated successfully",
    "data": {
        "_id": "unique",
        "title": "string",
        "description": "string",
        "userId": "unique",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
}
```

## Delete Todo

Request :
- Method : DELETE
- Endpoint : `/todos/:id`
- Authorization: `Bearer token`

Response :

```json 
{
    "message": "Todo deleted successfully"
}
```

## Delete All Todo

Request :
- Method : DELETE
- Endpoint : `/todos`
- Authorization: `Bearer token`

Response :

```json 
{
    "message": "All Todo deleted successfully"
}
```
