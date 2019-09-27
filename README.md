# Corporate Event Planner - Backend

---

The server is hosted at: [https://planr-backend.herokuapp.com/](https://planr-backend.herokuapp.com/)

## Built With

---

- [Node.js](https://en.wikipedia.org/wiki/Node.js) - JavaScript runtime for executing JavaScript at the server outside the browser
- [Express.js](https://expressjs.com/) - Lightweight web framework to bootstrap Node.js APIs
- [SQLite](https://www.sqlite.org/index.html) - Super lightweight database to bootstrap development environments
- [PostgreSQL](https://www.postgresql.org/) - An advanced object-relational database for production environments
- [Knex.js](https://knexjs.org/) - A SQL query builder that helps abstracting migrations and DDLs for different database types into a single coherent structure
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - A module to help make passwords more secure
- [CORS](https://www.npmjs.com/package/cors) - A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [Helmet](https://www.npmjs.com/package/helmet) - A collection of 14 smaller middleware functions that set HTTP response headers.
- [JWT](https://jwt.io/) - JSON Web Token for authorization and client side tokens for security
- [Supertest](https://www.npmjs.com/package/supertest) - A test module for HTTP assertions
- [Jest](https://jestjs.io/) - A simple JavaScript testing framework

## Endpoints

---

### General

[http://localhost:8000/docs](http://localhost:8000/docs)

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware - extra responses below
- No passwords are returned they are not even stored in the database directly

<span style="color: green">Get All Users Response (200 OK)</span>:

```json
[
  {
    "id": 1,
    "name": "John Smith",
    "email": "test@example.com",
    "company": "Tester Inc.",
    "role": "tester"
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "email": "tester@example.com",
    "company": "Tester Inc.",
    "role": "front desk"
  }
]
```

<span style="color: red">Server error Response (500 SERVER ERROR)</span>:

```json
{
  "message": "Error occurred while getting all users.",
  err
}
```

###### GET [USER BY ID]

```
http://localhost:8000/api/users/:id
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- ID is defined over the used route at the end
- Authorization gets validated over restricted middleware - extra responses below
- USER ID gets validated over validateUserId middleware - extra responses below
- No passwords are returned they are not even stored in the database directly
