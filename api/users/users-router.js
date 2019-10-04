const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./users-model.js");
const Auth = require("../middleware/auth-middleware.js");
const Validate = require("../middleware/validation-middleware.js");

const router = express.Router();

/**
 * @api {post} /users/register Register user
 * @apiName Auth - Register User
 * @apiGroup Auth
 *
 * @apiParam {String} email email, must be unique
 * @apiParam {String} password password
 *
 * @apiParamExample Example body:
 * {
 *   "email": "janedoe@example.com",
 *   "password": "thisisabadpassword",
 * }
 *
 * @apiSuccess (201) {String} message welcome message
 * @apiSuccess (201) {Integer} user_id user's id
 * @apiSuccess (201) {String} token JSON web token
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 201 CREATED
 *   {
 *      "message": "Welcome Jane Doe!",
 *      "user_id": 3,
 *      "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE1NjkzMDA3NTUsImV4cCI6MTU2OTM4NzE1NX0.MqSP9WknoX-hqVuhPxcqgeMDUyt9DA4nU34OjTQLo2k"
 *   }
 */

router.post(
  "/register",
  Validate.validateUniqueEmail,
  Validate.validateUser,
  (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    Users.addUser(user)
      .then(newUser => {
        const token = Auth.generateToken(newUser);
        console.log(newUser);
        res.status(201).json({
          message: `Welcome ${newUser.name}!`,
          user_id: newUser.id,
          role_name: newUser.role_name,
          token
        });
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ message: "Error occurred while registering a user.", err });
      });
  }
);

/**
 * @api {post} /users/login Login user
 * @apiName Auth - Login User
 * @apiGroup Auth
 *
 * @apiParam {String} email email, must be unique
 * @apiParam {String} password password
 * @apiParam {String} name name
 * @apiParam {Integer} role_id user's role_id
 *
 * @apiParamExample Example body:
 * {
 *   "email": "janedoe@example.com",
 *   "password": "thisisabadpassword",
 *   "name": "Jane Doe",
 *   "role_id": 3
 * }
 *
 * @apiSuccess {String} message welcome message
 * @apiSuccess {Integer} user_id user's id
 * @apiSuccess {String} token JSON web token
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 *   {
 *      "message": "Welcome Jane Doe!",
 *      "user_id": 3,
 *      "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE1NjkzMDA3NTUsImV4cCI6MTU2OTM4NzE1NX0.MqSP9WknoX-hqVuhPxcqgeMDUyt9DA4nU34OjTQLo2k"
 *   }
 *
 * @apiError {404} UnauthorizedUser The user's credentials are invalid
 *
 * @apiErrorExample Error-Example
 * HTTP/1.1 404 Unauthorized
 * {
 *   "message": "Invalid credentials."
 * }
 */

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  Users.getUsersBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = Auth.generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.name}!`,
          user_id: user.id,
          role_id: user.role_id,
          token
        });
      } else {
        res.status(401).json({ message: "Incorrect credentials." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: "Error occurred while logging in." });
    });
});

/**
 * @api {get} /users Get users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {Object[]} events Array of users
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 *
 * [
 *   {
 *     "id": 1,
 *     "name": "John Smith",
 *     "email": "john@test.com",
 *     "role_id": 1
 *   },
 *   {
 *     "id": 2,
 *     "name": "Jane Doe",
 *     "email": "jane@test.com",
 *     "role_id": 1
 *   }
 * ]
 */

router.get("/", Auth.restricted, (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while getting all users.", err });
    });
});

/**
 * @api {get} /users Get user (expanded) by id
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiSuccess {Integer} id user id
 * @apiSuccess {String} name user's name
 * @apiSuccess {String} email user's email
 * @apiSuccess {Integer} role_id user's role_id
 * @apiSuccess {Object[]} createdEvents Array of events created by the user
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 *  {
 *   "id": 1,
 *   "name": "John Smith",
 *   "email": "john@test.com",
 *   "role_id": 1,
 *   "role_name": "admin",
 *   "createdEvents": [
 *     {
 *       "event_id": 1,
 *       "event_name": "Company Party"
 *     },
 *     {
 *       "event_id": 3,
 *       "event_name": "Surprise Birthday"
 *     }
 *   ]
 * }
 */

// GET /api/users/:id
router.get("/:id", Auth.restricted, Validate.validateUserId, (req, res) => {
  res.status(200).json(req.validUser);
});

// PUT /api/users/:id
router.put(
  "/:id",
  Auth.restricted,
  Validate.validateUserId,
  Validate.validateUniqueEmail,
  Validate.validateUser,
  (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const hash = bcrypt.hashSync(changes.password, 14);
    changes.password = hash;

    Users.updateUser(changes, id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "Error occurred while updating user.", err });
      });
  }
);

// DELETE /api/user/:id
router.delete("/:id", Auth.restricted, Validate.validateUserId, (req, res) => {
  const { id } = req.params;

  Users.deleteUser(id)
    .then(_ => {
      res
        .status(200)
        .json({ message: `User with the id ${id} successfully deleted.` });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error occurred while deleting user.", err });
    });
});

// GET /api/user/logout
// router.get('/logout', restricted, (request, response) => {
//   request.session.destroy(() => {
//     response.status(200).json({ message: 'You have been logged out' })
//   })
// })

module.exports = router;
