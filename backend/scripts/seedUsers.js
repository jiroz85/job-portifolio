const bcrypt = require("bcryptjs");
const {
  sequelize,
  createDatabaseIfNotExists,
} = require("../src/config/database");
const User = require("../src/models/User");

const seedUsers = async () => {
  try {
    // Create database if it doesn't exist
    await createDatabaseIfNotExists();

    // Sync database
    await sequelize.sync({ force: false });

    // Users to create
    const users = [
      {
        name: "Admin User",
        email: "admin@jobportal.com",
        password: "admin123",
        role: "admin",
        status: "active",
      },
      {
        name: "Tech Corp Employer",
        email: "employer@techcorp.com",
        password: "employer123",
        role: "employer",
        status: "active",
      },
      {
        name: "John Smith",
        email: "john.smith@gmail.com",
        password: "jobseeker123",
        role: "jobseeker",
        status: "active",
      },
    ];

    for (const userData of users) {
      // Check if user already exists
      const existingUser = await User.findOne({
        where: { email: userData.email },
      });

      if (existingUser) {
        console.log(`User ${userData.email} already exists. Skipping...`);
        continue;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Create user
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });

      console.log(`✅ Created ${userData.role} user: ${userData.email}`);
      console.log(
        `   Redirects to: ${
          userData.role === "admin"
            ? "/admin"
            : userData.role === "employer"
            ? "/employer"
            : "/dashboard"
        }`
      );
    }

    console.log("\n🎉 User seeding completed!");
    console.log("\nLogin credentials:");
    console.log("┌─────────────────────────────────────────────────┐");
    console.log("│ Email                    │ Password    │ Role   │");
    console.log("├─────────────────────────────────────────────────┤");
    console.log("│ admin@jobportal.com      │ admin123    │ admin  │");
    console.log("│ employer@techcorp.com    │ employer123 │ employer│");
    console.log("│ john.smith@gmail.com     │ jobseeker123│ jobseeker│");
    console.log("└─────────────────────────────────────────────────┘");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await sequelize.close();
  }
};

// Run if called directly
if (require.main === module) {
  seedUsers();
}

module.exports = seedUsers;
