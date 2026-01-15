const { sequelize } = require("./src/config/database");
const Application = require("./src/models/Application");
const Job = require("./src/models/Job");

async function seedApplications() {
  try {
    console.log("Starting to seed sample applications...");

    // First, get some existing jobs
    const jobs = await Job.findAll({ limit: 5 });

    if (jobs.length === 0) {
      console.log("No jobs found. Please create some jobs first.");
      return;
    }

    console.log(`Found ${jobs.length} jobs to create applications for.`);

    // Sample applications with different statuses
    const sampleApplications = [
      {
        jobId: jobs[0].id,
        applicantName: "John Doe",
        applicantEmail: "john.doe@example.com",
        applicantPhone: "+1234567890",
        coverLetter:
          "I am very interested in this position and believe my skills match perfectly.",
        experience: "5 years of experience in software development",
        education: "Bachelor of Science in Computer Science",
        skills: "JavaScript, React, Node.js, Python",
        expectedSalary: "$80,000 - $100,000",
        availability: "2 weeks",
        status: "pending",
      },
      {
        jobId: jobs[0].id,
        applicantName: "Jane Smith",
        applicantEmail: "jane.smith@example.com",
        applicantPhone: "+1234567891",
        coverLetter: "Experienced developer looking for new challenges.",
        experience: "3 years of experience in frontend development",
        education: "Master of Science in Software Engineering",
        skills: "React, Vue.js, TypeScript, CSS",
        expectedSalary: "$90,000 - $110,000",
        availability: "1 month notice",
        status: "under_review",
      },
      {
        jobId: jobs[1]?.id || jobs[0].id,
        applicantName: "Mike Johnson",
        applicantEmail: "mike.johnson@example.com",
        applicantPhone: "+1234567892",
        coverLetter: "Passionate about creating great user experiences.",
        experience: "4 years of experience in full-stack development",
        education: "Bachelor of Science in Information Technology",
        skills: "React, Node.js, MongoDB, Express",
        expectedSalary: "$85,000 - $105,000",
        availability: "Immediate",
        status: "shortlisted",
      },
      {
        jobId: jobs[1]?.id || jobs[0].id,
        applicantName: "Sarah Wilson",
        applicantEmail: "sarah.wilson@example.com",
        applicantPhone: "+1234567893",
        coverLetter: "Looking for a challenging role in a growing company.",
        experience: "6 years of experience in backend development",
        education: "PhD in Computer Science",
        skills: "Python, Django, PostgreSQL, AWS",
        expectedSalary: "$120,000 - $140,000",
        availability: "2 weeks",
        status: "interview_scheduled",
      },
      {
        jobId: jobs[2]?.id || jobs[0].id,
        applicantName: "Tom Brown",
        applicantEmail: "tom.brown@example.com",
        applicantPhone: "+1234567894",
        coverLetter: "Experienced team lead with strong technical skills.",
        experience: "8 years of experience in software development",
        education: "Bachelor of Science in Computer Engineering",
        skills: "Java, Spring, Microservices, Kubernetes",
        expectedSalary: "$130,000 - $150,000",
        availability: "1 month notice",
        status: "offered",
      },
      {
        jobId: jobs[2]?.id || jobs[0].id,
        applicantName: "Emily Davis",
        applicantEmail: "emily.davis@example.com",
        applicantPhone: "+1234567895",
        coverLetter: "Recent graduate with strong academic background.",
        experience: "1 year of experience as a junior developer",
        education: "Bachelor of Science in Computer Science",
        skills: "JavaScript, React, HTML, CSS",
        expectedSalary: "$60,000 - $70,000",
        availability: "Immediate",
        status: "rejected",
      },
      {
        jobId: jobs[3]?.id || jobs[0].id,
        applicantName: "Chris Lee",
        applicantEmail: "chris.lee@example.com",
        applicantPhone: "+1234567896",
        coverLetter: "Experienced developer with a passion for innovation.",
        experience: "5 years of experience in mobile development",
        education: "Master of Science in Computer Science",
        skills: "React Native, Flutter, iOS, Android",
        expectedSalary: "$100,000 - $120,000",
        availability: "2 weeks",
        status: "interviewed",
      },
      {
        jobId: jobs[3]?.id || jobs[0].id,
        applicantName: "Alex Martinez",
        applicantEmail: "alex.martinez@example.com",
        applicantPhone: "+1234567897",
        coverLetter: "Senior developer looking for leadership opportunities.",
        experience: "10 years of experience in software architecture",
        education: "Bachelor of Science in Computer Science",
        skills: "System Design, Cloud Architecture, DevOps",
        expectedSalary: "$150,000 - $180,000",
        availability: "1 month notice",
        status: "accepted",
      },
    ];

    // Create applications
    for (const appData of sampleApplications) {
      await Application.create(appData);
      console.log(
        `Created application for ${appData.applicantName} with status: ${appData.status}`
      );
    }

    console.log(
      `Successfully created ${sampleApplications.length} sample applications!`
    );

    // Show summary
    const applications = await Application.findAll();
    const statusCounts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    console.log("\nApplication Status Summary:");
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`${status}: ${count}`);
    });
  } catch (error) {
    console.error("Error seeding applications:", error);
  } finally {
    await sequelize.close();
  }
}

// Run the seeding function
seedApplications();
