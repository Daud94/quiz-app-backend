## Description

This is a quiz app (backend) developed using NestJS framework, PostgreSQL database, and Sequelize ORM for database
mapping.

The app comprises two main modules - Admin and User and there are four tables (Admins, Roles, Users, Questions, and
Attempts).

Admin adds questions to the databases; users can take a quiz by entering number of questions he wants to answer. After
quiz completion, user can then submit answered questions as attempts which is then evaluated and scored acordingly
before being stored on the Attempts table. Users can have several attempts - meaning they can take the quiz several
times.

## Installation

To run this application locally, make sure you have Node.js and PostgreSQL installed on your system.

1. Clone this repository:
   ```bash
   $ git clone https://github.com/Daud94/quiz-app-backend.git
   ```
2. Navigate into the project directory:

   ```bash
   $ cd quiz-app-backend
   ```
3. Install dependencies

   ```bash
   $ npm install
   ```

## Database Configuration

Before running the application, ensure that you have PostgreSQL installed and create a database named `quiz-app` for the
application.

## Environment Variables

onfigure the application using environment variables. Create a `.env` file in the root of the project and define the
following variables:

```
DEV_USERNAME=  Username of the postgres database
DEV_PASSWORD=  Postgres password
DATABASE_NAME=  Name of the database (quiz-app)
DEV_DB_PORT=  postgres port (5432)
DEV_HOST= Host e.g localhost
ENCRYPTION_KEY= String of characters that is 32 bytes in length when encoded in UTF-8
JWT_SECRET= JWT secret for signing payload
PROD_USERNAME= Postgres production username
PROD_PASSWORD= Postgres production password
PROD_DB_PORT= Postgres production port
PROD_HOST= Production host
DEV_API_PORT= Local Development API port - 3001 for local deployment
PROD_API_PORT= Production API port
SALT_OR_ROUNDS= Salt or rounds for passwoed hashing
NODE_ENV= "development" or "production"
SUPER_ADMIN_PASSWORD= Super Admin password for seeding into the database.
SUPER_ADMIN_EMAIL= Super Admin email for seeding into the database
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

When the app has been successfully started, the following should be done:

1. Navigate into the database folder to carry out initial migration.

```bash
   $ npx sequelize-cli db:migrate
```

2. Navigate into the database folder to carry out seeding of Super Admin details (email and password in .env file) into
   the database, and the Role and allowable Permissions.

```bash
   $ npx sequelize-cli db:seed:all
```

## API Documentation

The API documentation `Quiz App.postman_collection.json` for this can be found in the project directory. It should be
imported into Postman to test all API endpoints.

## Integration guide

Admin is required to signin in before being able to add questions through the "Add Question" endpoint. All required
fields are provided in the documentation. A question can any of these formats:

MULTIPLE CHOICE:

```angular2html
{
"subject": "Current Affairs",
"question": "What is the federal capital of Nigeria?",
"options": [
"Abuja",
"Ilorin",
"Ikeja",
"Osogbo"
],
"difficulty": "EASY",
"correctOption": "Abuja",
"type": "MULTIPLE_CHOICE",
"mark": 10
}
```

TRUE OR FALSE:

```angular2html
{
"subject": "English",
"question": "Verb is a part of speech",
"options": [
"true",
"false"
],
"difficulty": "EASY",
"correctOption": "Abuja",
"type": "TRUE_OR_FALSE",
"mark": 10
}
```

Users are expected to signup by providing their `firstName, lastName, email and password`. They can then take quiz. The
app is flexible to allow users to select the subject they would like to be tested on, the number of questions, the
difficulty, they type of question (TRUE_OR_FALSE or MULTIPLE_CHOICE). These are optionals as default values are used if.
they are not provided.

Questions should be returned to the user in this pattern:

```angular2html
[
{
"id": "2",
"subject": "English",
"question": "Verb is a part of speech",
"type": "TRUE_OR_FALSE",
"difficulty": "EASY",
"options": [
"true",
"false"
],
"correctOption": "f19ef3af9ddf0970e842249a581d38cbb3721e9fe9701eb172e0b7e58dbab532",
"mark": 10,
},
{
"id": "1",
"subject": "Current Affairs",
"question": "What is the federal capital of Nigeria?",
"type": "MULTIPLE_CHOICE",
"difficulty": "EASY",
"options": [
"Abuja",
"Ilorin",
"Ikeja",
"Osogbo"
],
"correctOption": "608321c0dfba4c553340281133fe421cabf6ce1c882326d7be0f1cd93fe0f31f",
"mark": 10,
}
]
```

Correction option is encrypted when questions are fetched and returned to the users. However, it is not to be displayed
but will be required when users submit questions after an attempt. Questions fetched are also shuffled before being
returned. Submitted questions should like this:

 ```
 [
    {
        "subject": "Current Affairs",
        "question": "What is the federal capital of Nigeria?",
        "type": "MULTIPLE_CHOICE",
        "difficulty": "EASY",
        "selectedOption": "Abuja",
        "correctOption": "821d76c10e254c35576c0885e2aa3ebe80eeb0ec20ab438d3144823554b373d2",
        "mark": 10
    },
    {
        "subject": "Current Affairs",
        "question": "What is the federal capital of Nigeria?",
        "type": "MULTIPLE_CHOICE",
        "difficulty": "EASY",
        "selectedOption": "Abuja",
        "correctOption": "7197f3c458da016e16e1e9f1875c0cfb33214325d69c1978f777b90e0c30b8ac",
        "mark": 10
    },
    {
        "subject": "English",
        "question": "Verb is a part of speech",
        "type": "TRUE_OR_FALSE",
        "difficulty": "EASY",
        "selectedOption": "true",
        "correctOption": "f19ef3af9ddf0970e842249a581d38cbb3721e9fe9701eb172e0b7e58dbab532",
        "mark": 10
    }
]
 ```

Upon submission `correctOption` will be decrypted and checked against `selectedOption` in order to score the user; and
the user's attempt and overall score are then stored in the database.

There are also endpoints to get user's profile and user's attempts.


