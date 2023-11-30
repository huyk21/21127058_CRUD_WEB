const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};
controller.addUser = async (req, res) => {
  let { username, firstName, lastName, email, mobile, isAdmin } = req.body;
  try {
    await models.User.create({
      username: username,
      firstName: firstName,
      lastName: lastName,

      mobile: mobile,
      isAdmin: isAdmin ? true : false,
    });
    res.redirect("/users");
  } catch (error) {
    res.send("Can not add user!");
    console.error(error);
  }
};
controller.editUser = async (req, res) => {
  let { id, firstName, lastName, mobile, isAdmin } = req.body;
  try {
    await models.User.update(
      {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        isAdmin: isAdmin ? true : false,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.send("Edit user successfully!");
  } catch (error) {
    res.send("Can not edit user!");
    console.error(error);
  }
};
controller.deleteUser = async (req, res) => {
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try {
    await models.User.destroy({
      where: {
        id: id,
      },
    });
    res.send("Delete user successfully!");
  } catch (error) {
    res.send("Can not delete user!");
    console.error(error);
  }
};
module.exports = controller;
