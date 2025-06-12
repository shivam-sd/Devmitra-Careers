import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Paused: "bg-yellow-100 text-yellow-700",
  Closed: "bg-red-100 text-red-700",
  Open: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); // "name" or "id"
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllJobs();
    // eslint-disable-next-line
  }, []);

  const fetchAllJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/private/jobs");
      setJobs(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch jobs");
      setJobs([]);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let res;
      if (searchType === "name") {
        res = await axios.get(
          `http://localhost:5000/private/jobs/search/byname?title=${encodeURIComponent(searchTerm)}`
        );
      } else if (searchType === "id") {
        res = await axios.get(
          `http://localhost:5000/private/jobs/${searchTerm}`
        );
        // The ID route returns a single job, so wrap it in an array
        res.data = res.data ? [res.data] : [];
      }
      setJobs(res.data);
    } catch (err) {
      setError("No jobs found.");
      setJobs([]);
    }
    setLoading(false);
  };

  // Calculate summary stats
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(job => job.status === "Active" || job.status === "Open").length;
  const totalApplications = jobs.reduce((sum, job) => sum + (job.applications || 0), 0);
  const pendingReviews = jobs.filter(job => job.status === "Pending").length;

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Job Management Dashboard</h1>
          <p className="text-sm text-gray-600">Manage job postings and applications</p>
        </div>
        <button
          onClick={() => navigate("/PostJobs")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow"
        >
          + Post New Job
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Total Job Openings" count={totalJobs} />
        <SummaryCard label="Active Jobs" count={activeJobs} />
        <SummaryCard label="Total Applications" count={totalApplications} />
        <SummaryCard label="Pending Reviews" count={pendingReviews} />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-2 ${activeTab === "overview" ? "text-orange-500 font-medium border-b-2 border-orange-500" : "text-gray-400"} cursor-pointer`}
          >
            Job Overview
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`pb-2 ${activeTab === "applications" ? "text-orange-500 font-medium border-b-2 border-orange-500" : "text-gray-400"} cursor-pointer`}
          >
            Applications
          </button>
        </nav>
      </div>

      {activeTab === "overview" ? (
        <div>
          {/* Search and Filter */}
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
            <div className="flex items-center w-full md:w-1/2 border rounded-md px-3 py-2 bg-white">
              <FiSearch className="text-gray-500 mr-2" />
              <select
                value={searchType}
                onChange={e => setSearchType(e.target.value)}
                className="border rounded-md px-2 py-1 mr-2"
              >
                <option value="name">Search by Name</option>
                <option value="id">Search by ID</option>
              </select>
              <input
                type="text"
                placeholder={searchType === "name" ? "Enter job name..." : "Enter job ID..."}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full focus:outline-none"
              />
              <button
                type="submit"
                className="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded-md"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => { setSearchTerm(""); fetchAllJobs(); }}
                className="ml-2 border px-3 py-1 rounded-md"
              >
                Reset
              </button>
            </div>
            <div className="flex items-center border rounded-md px-3 py-2 bg-white">
              <FiFilter className="text-gray-500 mr-2" />
              <select className="bg-transparent focus:outline-none">
                <option>All Status</option>
                <option>Active</option>
                <option>Paused</option>
                <option>Closed</option>
              </select>
            </div>
          </form>

          {/* Job Listings */}
          <div className="space-y-4">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : jobs.length === 0 ? (
              <div>No jobs found.</div>
            ) : (
              jobs.map((job, index) => (
                <div key={index} className="bg-white shadow p-4 rounded-md border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <div className="flex flex-wrap text-sm text-gray-600 space-x-4">
                        <span>{job.category}</span>
                        <span>{job.location}</span>
                        <span>Posted: {job.posted}</span>
                        <span>{job.type}</span>
                      </div>
                      <div className="text-green-600 text-sm mt-1">{job.salary}</div>
                      <a href="#" onClick={() => setActiveTab("applications")} className="text-blue-600 text-sm underline mt-1 inline-block">
                        👥 {job.applications} applications
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-sm rounded-full ${statusStyles[job.status]}`}>{job.status}</span>
                      <FiEdit className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                      <FiTrash2 className="text-gray-600 hover:text-red-600 cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <ApplicationsPage />
      )}
    </div>
  );
}

function SummaryCard({ label, count }) {
  return (
    <div className="bg-white p-4 rounded-md shadow text-center border">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-semibold text-orange-600">{count}</p>
    </div>
  );
}

function ApplicationsPage() {
  const applications = [
    {
      name: "John Smith",
      jobTitle: "Senior React Developer",
      email: "john.smith@email.com",
      phone: "+1-555-0123",
      experience: "5 years",
      appliedDate: "5/25/2024",
      resume: "John_smith_resume.pdf",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
      {applications.map((app, index) => (
        <div key={index} className="bg-white shadow rounded-md p-4 border">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
            <div>
              <p className="font-semibold">{app.name}</p>
              <p className="text-sm text-gray-600">Applied for: {app.jobTitle}</p>
            </div>
            <div className="mt-2 md:mt-0 px-2 py-1 text-sm rounded-full inline-block bg-yellow-100 text-yellow-700">
              {app.status}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-700">
            <p>Email: {app.email}</p>
            <p>Phone: {app.phone}</p>
            <p>Experience: {app.experience}</p>
            <p>Applied: {app.appliedDate}</p>
            <p className="sm:col-span-2 md:col-span-1">Resume: <a href="#" className="text-blue-600 underline">{app.resume}</a></p>
            <div className="sm:col-span-2 md:col-span-1 flex justify-end">
              <select defaultValue={app.status} className="border px-2 py-1 rounded-md text-sm">
                <option value="Pending">Pending</option>
                <option value="Interview">Interview</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}