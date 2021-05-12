const { Router } = require("express");
const UserService = require("../services/userService");
const {
  createUserValid,
  updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");
const e = require("express");

const router = Router();

// TODO: Implement route controllers for user
router
  .get(
    "/",
    (req, res, next) => {
      try {
        const users = UserService.getAll();
        if (!users) {
          res.data = users;
        } else {
          throw { msg: "No data", status: 404 };
        }
      } catch (err) {
        res.err = err;
      } finally {
        next();
      }
    },
    responseMiddleware
  )

  .get(
    "/:id",
    (req, res, next) => {
      try {
        const user = UserService.search({ id: req.params.id });
        if (!user) {
          res.data = user;
        } else {
          throw { msg: "User not found", status: 404 };
        }
      } catch (err) {
        res.err = err;
      } finally {
        next();
      }
    },
    responseMiddleware
  )

  .delete(
    "/:id",
    (req, res, next) => {
      try {
        const user = UserService.delete(req.params.id);
        if (!user) {
          res.data = user;
        } else {
          throw { msg: "There is no user with such id", status: 404 };
        }
      } catch (err) {
        res.err = err;
      } finally {
        next();
      }
    },
    responseMiddleware
  )

  .post(
    "/",
    createUserValid,
    (req, res, next) => {
      try {
        const user = UserService.create(req.body);
        if (!user) {
          res.data = user;
        } else {
          throw { msg: "User already exist", status: 400 };
        }
      } catch (err) {
        res.err = err;
      } finally {
        next();
      }
    },
    responseMiddleware
  )

  .put(
    "/:id",
    updateUserValid,
    (req, res, next) => {
      try {
        const user = UserService.update(req.params.id, req.body);
        if (!user) {
          res.data = user;
        } else {
          throw { msg: "User update error", status: 400 };
        }
      } catch (err) {
        res.err = err;
      } finally {
        next();
      }
    },
    responseMiddleware
  );

module.exports = router;
