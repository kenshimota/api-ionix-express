const { Router } = require("express");
const router = Router();
const Users = require("../../services/users");
const AuthHeaders = require("../../middlewares/auth-headers");

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
router.post("/", AuthHeaders, async function (req, res) {
  try {
    const params = req.body;
    const users = new Users();
    const response = await users.create(params);
    res.status(201);
    res.json(response);
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
    const users = new Users();
    const response = await users.getId(id);
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
router.put("/:id", AuthHeaders, async function (req, res) {
  try {
    const params = { ...req.body, ...req.params };
    const users = new Users();
    const response = await users.update(params);

    res.status(202);
    res.json(response);
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
router.delete("/:id", AuthHeaders, async function (req, res) {
  try {
    const { id } = req.params;
    if (id == req.currentUser.id)
      throw new Error("sorry, you don't delete yourself");

    const users = new Users();
    const response = await users.delete(id);
    res.status(204);
    res.json(response);
  } catch (error) {
    res.status(422);
    res.json({ message: error.message });
  }
});

module.exports = router;
