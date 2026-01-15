const { sequelize } = require("./src/config/database");
const User = require("./src/models/User");

async function checkAllUsers() {
  try {
    const users = await User.findAll();
    console.log("All users in database:");
    users.forEach((user) => {
      console.log(
        `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Role: ${user.role}`
      );
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
}

checkAllUsers();
