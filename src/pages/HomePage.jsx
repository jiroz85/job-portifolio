import { Link } from "react-router-dom";
import {
  FaSearch,
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { useJobs } from "../context/JobContext";

const HomePage = () => {
  const { getPublishedJobs } = useJobs();
  const publishedJobs = getPublishedJobs();
  const recentJobs = publishedJobs.slice(0, 6); // Show latest 6 jobs
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-12 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover thousands of job opportunities with all the information you
            need. It's your future. Come find it.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-2 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Location"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded transition-colors">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Recent Jobs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Recent Job Postings</h2>
            <Link
              to="/jobs"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Jobs →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 font-medium">{job.company}</p>
                  </div>

                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <FaBriefcase className="mr-2" />
                      {job.type}
                    </div>
                    {job.salary && (
                      <div className="flex items-center">
                        <FaDollarSign className="mr-2" />
                        {job.salary}
                      </div>
                    )}
                    <div className="flex items-center">
                      <FaClock className="mr-2" />
                      {job.posted || "Recently posted"}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FaBriefcase className="text-gray-300 text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No jobs posted yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Be the first to post a job opportunity!
                </p>
                <Link
                  to="/admin/add-job"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post a Job
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { title: "Software Development", count: 1243 },
              { title: "Marketing", count: 845 },
              { title: "Design", count: 721 },
              { title: "Sales", count: 563 },
              { title: "Healthcare", count: 459 },
              { title: "Finance", count: 342 },
              { title: "Education", count: 287 },
              { title: "Customer Service", count: 198 },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <FaBriefcase className="text-blue-600 text-2xl mb-3" />
                <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.count} jobs available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBriefcase className="text-4xl text-blue-600 mb-4" />,
                title: "Create an Account",
                description:
                  "Sign up for free and create your profile to get started.",
              },
              {
                icon: <FaSearch className="text-4xl text-blue-600 mb-4" />,
                title: "Search Jobs",
                description:
                  "Browse thousands of job listings to find the perfect match.",
              },
              {
                icon: <FaBuilding className="text-4xl text-blue-600 mb-4" />,
                title: "Apply Now",
                description:
                  "Apply to jobs with just one click and track your applications.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-md"
              >
                <div className="flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to find your dream job?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of companies and job seekers already using our
            platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/jobs"
              className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Browse Jobs
            </Link>
            <Link
              to="/jobs"
              className="border-2 border-white text-white hover:bg-blue-700 font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
