const bcrypt = require("bcryptjs");
const { sequelize } = require("../config/database");
const User = require("../models/User");

const seedUsers = async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log("Database connection established for seeding.");

    // Clear existing users (optional - remove if you want to keep existing data)
    await User.destroy({ where: {} });
    console.log("Cleared existing users.");

    // Sample users data
    const users = [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
        status: "active",
        phone: "+1234567890",
        location: "New York, USA",
        bio: "System administrator with full access to all features.",
      },
      {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "admin",
        status: "active",
        phone: "+1234567891",
        location: "San Francisco, USA",
        bio: "Senior administrator managing user accounts and system operations.",
      },
      {
        name: "Tech Corp HR",
        email: "hr@techcorp.com",
        password: "password123",
        role: "employer",
        status: "active",
        phone: "+1234567892",
        location: "Seattle, USA",
        bio: "Human Resources manager at Tech Corp.",
        employerDetails: JSON.stringify({
          company: "Tech Corp",
          industry: "Technology",
          companySize: "1000-5000",
          website: "https://techcorp.com",
        }),
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "password123",
        role: "jobseeker",
        status: "active",
        phone: "+1234567893",
        location: "Austin, USA",
        bio: "Software developer looking for new opportunities.",
        skills: JSON.stringify([
          "JavaScript",
          "React",
          "Node.js",
          "Python",
          "SQL",
        ]),
        experience: JSON.stringify([
          {
            company: "StartupXYZ",
            position: "Senior Developer",
            duration: "2 years",
            description: "Led development of web applications",
          },
          {
            company: "TechCo",
            position: "Developer",
            duration: "3 years",
            description: "Developed and maintained software solutions",
          },
        ]),
      },
      {
        name: "Mike Johnson",
        email: "mike.j@example.com",
        password: "password123",
        role: "jobseeker",
        status: "active",
        phone: "+1234567894",
        location: "Boston, USA",
        bio: "Marketing professional with 5+ years of experience.",
        skills: JSON.stringify([
          "Digital Marketing",
          "SEO",
          "Content Strategy",
          "Analytics",
        ]),
      },
      {
        name: "Sarah Wilson",
        email: "sarah.w@example.com",
        password: "password123",
        role: "employer",
        status: "active",
        phone: "+1234567895",
        location: "Chicago, USA",
        bio: "Recruiter at Global Solutions Inc.",
        employerDetails: JSON.stringify({
          company: "Global Solutions Inc",
          industry: "Consulting",
          companySize: "500-1000",
          website: "https://globalsolutions.com",
        }),
      },
      {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "jobseeker",
        status: "inactive",
        phone: "+1234567896",
        location: "Miami, USA",
        bio: "Test user account for demonstration purposes.",
      },
      {
        name: "Blocked User",
        email: "blocked@example.com",
        password: "password123",
        role: "jobseeker",
        status: "blocked",
        phone: "+1234567897",
        location: "Los Angeles, USA",
        bio: "This user account has been blocked.",
      },
    ];

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // Insert users into database
    await User.bulkCreate(hashedUsers);
    console.log(`Successfully created ${hashedUsers.length} users.`);

    // Display created users
    const createdUsers = await User.findAll({
      attributes: ["id", "name", "email", "role", "status"],
    });

    console.log("\nCreated Users:");
    createdUsers.forEach((user) => {
      const role = user.role || "jobseeker";
      console.log(`- ${user.name} (${user.email}) - ${role} - ${user.status}`);
    });
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await sequelize.close();
    console.log("Database connection closed.");
  }
};

// Run the seeder
if (require.main === module) {
  seedUsers();
}

module.exports = seedUsers;
