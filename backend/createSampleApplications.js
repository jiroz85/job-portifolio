const { sequelize } = require("./src/config/database");
const Application = require("./src/models/Application");
const Job = require("./src/models/Job");

async function createSampleApplicationsForNewUser(userEmail, userName) {
  try {
    console.log(
      `Creating sample applications for new job seeker: ${userName} (${userEmail})`
    );

    // Get some existing jobs
    const jobs = await Job.findAll({ limit: 3 });

    if (jobs.length === 0) {
      console.log("No jobs found. Cannot create sample applications.");
      return;
    }

    // Create diverse sample applications to show different dashboard stats
    const sampleApplications = [
      {
        jobId: jobs[0].id,
        applicantName: userName,
        applicantEmail: userEmail,
        applicantPhone: "+1234567890",
        coverLetter:
          "I am very interested in this position and believe my skills match perfectly.",
        experience: "3 years of experience in the field",
        education: "Bachelor degree in relevant field",
        skills: "JavaScript, React, Node.js, Communication",
        expectedSalary: "$70,000 - $90,000",
        availability: "2 weeks",
        status: "pending", // This will show as "Applications"
      },
      {
        jobId: jobs[1]?.id || jobs[0].id,
        applicantName: userName,
        applicantEmail: userEmail,
        applicantPhone: "+1234567890",
        coverLetter: "Experienced professional looking for new challenges.",
        experience: "5 years of professional experience",
        education: "Master degree in Computer Science",
        skills: "Python, Django, PostgreSQL, Leadership",
        expectedSalary: "$80,000 - $100,000",
        availability: "1 month notice",
        status: "interview_scheduled", // This will show as "Interviews"
      },
      {
        jobId: jobs[2]?.id || jobs[0].id,
        applicantName: userName,
        applicantEmail: userEmail,
        applicantPhone: "+1234567890",
        coverLetter: "Senior candidate with strong technical background.",
        experience: "7 years of experience in software development",
        education: "PhD in Computer Science",
        skills: "System Architecture, Cloud, DevOps, Management",
        expectedSalary: "$120,000 - $140,000",
        availability: "2 weeks",
        status: "offered", // This will show as "Offers"
      },
    ];

    // Create sample applications
    for (const appData of sampleApplications) {
      await Application.create(appData);
      console.log(`Created sample application with status: ${appData.status}`);
    }

    console.log(
      `Successfully created ${sampleApplications.length} sample applications for ${userName}!`
    );

    // Show what their dashboard will display
    const stats = {
      applied: 1, // pending
      interviews: 1, // interview_scheduled
      offers: 1, // offered
      rejected: 0,
    };

    console.log("\nDashboard Preview for New User:");
    console.log(`Applications: ${stats.applied}`);
    console.log(`Interviews: ${stats.interviews}`);
    console.log(`Offers: ${stats.offers}`);
    console.log(`Rejected: ${stats.rejected}`);
  } catch (error) {
    console.error("Error creating sample applications:", error);
  } finally {
    await sequelize.close();
  }
}

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: node createSampleApplications.js <userEmail> <userName>");
  console.log(
    'Example: node createSampleApplications.js "newuser@example.com" "John Doe"'
  );
  process.exit(1);
}

const userEmail = args[0];
const userName = args[1];

// Run the function
createSampleApplicationsForNewUser(userEmail, userName);
