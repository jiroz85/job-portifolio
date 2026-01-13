import React, { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          fullName: "",
          email: "",
          phone: "",
          location: "",
          bio: "",
          skills: [],
          experience: [],
          education: [],
          resume: null,
          linkedin: "",
          github: "",
          portfolio: "",
          jobPreferences: {
            jobTypes: [],
            locations: [],
            salaryRange: "",
            remote: false,
          },
          notifications: {
            jobAlerts: true,
            applicationUpdates: true,
            newsletter: false,
          },
        };
  });

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  // Update profile
  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  // Add skill
  const addSkill = (skill) => {
    if (!profile.skills.includes(skill)) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  // Remove skill
  const removeSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Update skills
  const updateSkills = (newSkills) => {
    setProfile((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  // Add experience
  const addExperience = (experience) => {
    setProfile((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...experience, id: Date.now() }],
    }));
  };

  // Update experience
  const updateExperience = (id, updates) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    }));
  };

  // Remove experience
  const removeExperience = (id) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // Add education
  const addEducation = (education) => {
    setProfile((prev) => ({
      ...prev,
      education: [...prev.education, { ...education, id: Date.now() }],
    }));
  };

  // Update education
  const updateEducation = (id, updates) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...updates } : edu
      ),
    }));
  };

  // Remove education
  const removeEducation = (id) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Update job preferences
  const updateJobPreferences = (preferences) => {
    setProfile((prev) => ({
      ...prev,
      jobPreferences: { ...prev.jobPreferences, ...preferences },
    }));
  };

  // Update notification settings
  const updateNotificationSettings = (settings) => {
    setProfile((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...settings },
    }));
  };

  // Get profile completion percentage
  const getProfileCompletion = () => {
    const fields = [
      profile.fullName,
      profile.email,
      profile.phone,
      profile.location,
      profile.bio,
      profile.skills.length > 0,
      profile.experience.length > 0,
      profile.education.length > 0,
      profile.resume,
    ];

    const completedFields = fields.filter(
      (field) => field && field !== ""
    ).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  // Get skill recommendations based on profile
  const getSkillRecommendations = () => {
    const allSkills = [
      "JavaScript",
      "TypeScript",
      "React",
      "Vue.js",
      "Angular",
      "Node.js",
      "Python",
      "Java",
      "C#",
      "PHP",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "AWS",
      "Google Cloud",
      "Azure",
      "Docker",
      "Kubernetes",
      "Git",
      "CI/CD",
      "Agile",
      "Scrum",
      "REST APIs",
      "GraphQL",
      "Machine Learning",
      "Data Science",
      "DevOps",
    ];

    return allSkills.filter((skill) => !profile.skills.includes(skill));
  };

  // Get job recommendations based on skills and preferences
  const getJobRecommendations = (availableJobs) => {
    if (!availableJobs || availableJobs.length === 0) return [];

    return availableJobs
      .map((job) => {
        let score = 0;

        // Score based on skills match
        const jobRequirements = job.requirements.toLowerCase();
        profile.skills.forEach((skill) => {
          if (jobRequirements.includes(skill.toLowerCase())) {
            score += 10;
          }
        });

        // Score based on location preference
        if (profile.jobPreferences.locations.includes(job.location)) {
          score += 5;
        }

        // Score based on job type preference
        if (profile.jobPreferences.jobTypes.includes(job.type)) {
          score += 5;
        }

        // Score based on salary preference
        if (profile.jobPreferences.salaryRange) {
          const [min, max] = profile.jobPreferences.salaryRange
            .split("-")
            .map((s) => parseInt(s.trim()));
          const jobSalary = job.salary.match(/\d+/g);
          if (jobSalary && jobSalary.length > 0) {
            const jobMin = parseInt(jobSalary[0]) * 1000;
            if (jobMin >= min && jobMin <= max) {
              score += 5;
            }
          }
        }

        return { ...job, matchScore: score };
      })
      .filter((job) => job.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);
  };

  const value = {
    profile,
    updateProfile,
    addSkill,
    removeSkill,
    updateSkills,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    updateJobPreferences,
    updateNotificationSettings,
    getProfileCompletion,
    getSkillRecommendations,
    getJobRecommendations,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileContext;
