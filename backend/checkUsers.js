const { sequelize } = require("./src/config/database");
const User = require("./src/models/User");

async function checkUsers() {
  try {
    const users = await User.findAll({ where: { role: "job_seeker" } });
    console.log("Existing job seekers:");
    users.forEach((user) => {
      console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
}

checkUsers();
