const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");
const userService = require("../services/userService");

const router = Router();

// TODO: Implement route controllers for fighter
router
  .get(
    "/",
    (req, res, next) => {
      try {
        const fighters = FighterService.getAll();
        if (!fighters) {
          res.data = fighters;
        } else {
          throw { msg: "No data", status: 400 };
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
        const fighter = FighterService.search({ id: req.params.id });
        if (!fighter) {
          res.data = fighter;
        } else {
          throw { msg: "Fighter not found", status: 400 };
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
      } catch (err) {
        const fighter = FighterService.delete(req.params.id);
        if (!fighter) {
          res.data = fighter;
        } else {
          throw { msg: "There is no fighter with such id", status: 404 };
        }
        res.err = err;
      } finally {
        next();
      }
    },
    responseMiddleware
  )

  .post(
    "/",
    createFighterValid,
    (req, res, next) => {
      try {
        const fighter = FighterService.create(req.body);
        if (!fighter) {
          res.data = fighter;
        } else {
          throw { msg: "Fighter already exist", status: 400 };
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
    updateFighterValid,
    (req, res, next) => {
      try {
        const fighter = FighterService.update(req.params.id, req.body);
        if (!fighter) {
          res.data = fighter;
        } else {
          throw { msg: "Fighter update error", status: 400 };
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
