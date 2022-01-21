const { Router, response } = require("express");
const Users = require("../../services/users");
const router = Router();

router.get("/", async function (req, res) {
  try {
  } catch (error) {
    res.status(422);
    res.json({ message: error.message });
  }
});

/**
 * # POST /api/users/
 * Function that create an user
 * @param {String} username
 * @param {String} email
 * @param {String} firstname
 * @param {String} lastname
 * @param {String} password
 * @return {SequelizeModel}
 */
router.post("/", async function (req, res) {
  try {
    const params = req.body;
    const users = new Users();
    const response = await users.update(params);
    return response;
  } catch (error) {
    res.status(422);
    res.json({ message: error.message });
  }
});

/**
 * # GET /api/users/:id
 * Function that get an users for id
 * @param {Number} id
 * @return {SequelizeModel}
 */
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const users = Users;
    const response = await users.findId(id);
    res.json(response);
  } catch (error) {
    res.status(422);
    res.json({ message: error.message });
  }
});

/**
 * # UPDATE /api/users/:id
 * Function that update an user
 * @param {Number} id
 * @param {String} email
 * @param {String} firstname
 * @param {String} lastname
 * @return {SequelizeModel}
 */
router.update("/:id", async function (req, res) {
  try {
    const params = { ...req.body, ...req.params };
    const users = new Users();
    const response = await users.update(params);
    return response;
  } catch (error) {
    res.status(422);
    res.json({ message: error.message });
  }
});

/**
 * # DELETE /api/users/:id
 * Function that delete an user for id
 * @param {Number} id
 * @return {SequelizeModel}
 */
router.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const users = Users;
    const response = await users.delete(id);
    res.status(204);
    res.json(response);
  } catch (error) {
    res.status(422);
    res.json({ message: error.message });
  }
});

module.exports = router;
