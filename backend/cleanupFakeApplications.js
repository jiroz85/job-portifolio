const { sequelize } = require("./src/config/database");
const Application = require("./src/models/Application");
const User = require("./src/models/User");

async function cleanupFakeApplications() {
  try {
    console.log("Starting cleanup of fake/demo applications...");

    // Connect to database
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Find all applications that don't have a valid userId (fake applications)
    const fakeApplications = await Application.findAll({
      where: {
        userId: null, // Applications without user association are likely fake
      },
    });

    console.log(
      `Found ${fakeApplications.length} applications without user association.`
    );

    // Remove fake applications
    if (fakeApplications.length > 0) {
      await Application.destroy({
        where: {
          userId: null,
        },
      });
      console.log(
        `Successfully removed ${fakeApplications.length} fake applications.`
      );
    }

    // Find applications with suspicious email patterns
    const suspiciousEmails = await Application.findAll({
      where: {
        applicantEmail: {
          [require("sequelize").Op.or]: [
            { [require("sequelize").Op.like]: "%jiregna%" },
            { [require("sequelize").Op.like]: "%john.smith11%" },
            { [require("sequelize").Op.like]: "%meseret%" },
          ],
        },
      },
    });

    console.log(
      `Found ${suspiciousEmails.length} applications with suspicious emails.`
    );

    // Remove suspicious applications
    if (suspiciousEmails.length > 0) {
      const suspiciousIds = suspiciousEmails.map((app) => app.id);
      await Application.destroy({
        where: {
          id: suspiciousIds,
        },
      });
      console.log(
        `Successfully removed ${suspiciousEmails.length} suspicious applications.`
      );
    }

    // Show remaining applications count
    const remainingApplications = await Application.count();
    console.log(`Remaining legitimate applications: ${remainingApplications}`);

    // Show applications by user
    const applicationsByUser = await Application.findAll({
      attributes: [
        "userId",
        [
          require("sequelize").fn("COUNT", require("sequelize").col("id")),
          "count",
        ],
      ],
      group: ["userId"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email", "role"],
        },
      ],
    });

    console.log("\nApplications by user:");
    applicationsByUser.forEach((result) => {
      if (result.user) {
        console.log(
          `- ${result.user.name} (${result.user.email}): ${result.dataValues.count} applications`
        );
      } else {
        console.log(
          `- Unknown user (ID: ${result.userId}): ${result.dataValues.count} applications`
        );
      }
    });

    console.log("\n✅ Cleanup completed successfully!");
    console.log("📊 System is now ready for real user-only applications.");
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
  } finally {
    await sequelize.close();
  }
}

// Run the cleanup
if (require.main === module) {
  cleanupFakeApplications();
}

module.exports = cleanupFakeApplications;
