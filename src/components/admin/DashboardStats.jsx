import { FiBriefcase, FiUsers, FiFileText, FiDollarSign } from "react-icons/fi";
import useAdmin from "../../hooks/useAdmin";

const DashboardStats = () => {
  const { users, jobs, loading } = useAdmin();

  // Calculate real statistics from data
  const totalJobs = jobs ? jobs.length : 0;
  const totalUsers = users ? users.length : 0;

  const stats = [
    {
      id: 1,
      name: "Total Jobs",
      value: totalJobs.toString(),
      icon: FiBriefcase,
      change: "+12.5%",
      changeType: "increase",
    },
    {
      id: 2,
      name: "Total Users",
      value: totalUsers.toString(),
      icon: FiUsers,
      change: "+5.2%",
      changeType: "increase",
    },
    {
      id: 3,
      name: "Applications",
      value: "2,345", // Will be implemented when application data is available
      icon: FiFileText,
      change: "-2.3%",
      changeType: "decrease",
    },
    {
      id: 4,
      name: "Revenue",
      value: "$34,567", // Will be implemented when payment data is available
      icon: FiDollarSign,
      change: "+8.1%",
      changeType: "increase",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6 animate-pulse"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
              <div className="ml-5 w-0 flex-1">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-md bg-indigo-500 bg-opacity-10">
              <stat.icon
                className="w-6 h-6 text-indigo-600"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </div>
                <div
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.changeType === "increase" ? (
                    <svg
                      className="self-center flex-shrink-0 w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="self-center flex-shrink-0 w-5 h-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className="sr-only">
                    {stat.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                    by
                  </span>
                  {stat.change}
                </div>
              </dd>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
