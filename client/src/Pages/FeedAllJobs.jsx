import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import ApplyForm from "./ApplyForm"; 

const FeedAllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null); // <-- Add state for selected job

  useEffect(() => {
    fetchAllJobs();
    // eslint-disable-next-line
  }, []);
  
  const fetchAllJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/private/jobs`);
      setJobs(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch jobs");
      setJobs([]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center bg-black text-white py-12 px-4">
        <h2 className="text-yellow-400 text-lg font-semibold tracking-wide mb-1 uppercase">
          Devmitra Solutions Careers
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold">Current Job Openings</h1>
        <p className="mt-2 text-sm md:text-base max-w-2xl mx-auto">
          Discover exciting opportunities to grow your career at{" "}
          <strong>Devmitra Solutions</strong>. We’re always hiring talented
          individuals to join our innovative team.
        </p>
        <button className="mt-4 bg-yellow-400 text-black hover:bg-yellow-500 px-6 py-2 rounded-md font-medium">
          Apply Now
        </button>
      </div>

      {/* Job Cards */}
      <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-4 md:px-20">
        {jobs.filter((job) => job.status === "Open").map((job, index) => (
          <div
            key={index}
            className="border rounded-md p-5 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
            <div className="text-sm text-gray-500 mb-2">{job.category}</div>
            <ul className="text-sm space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <FaBriefcase className="text-gray-500" /> {job.type}
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" /> {job.location}
              </li>
              <li className="flex items-center gap-2">
                <FaClock className="text-gray-500" /> {job.experienceRequired || job.experience} experience
              </li>
              <li className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" /> Posted on {job.createdAt ? job.createdAt.slice(0,10) : job.posted}
              </li>
            </ul>
            <button
              className="bg-yellow-400 text-black hover:bg-yellow-500 w-full px-4 py-2 rounded-md font-medium cursor-pointer"
              onClick={() => setSelectedJob(job)} // <-- Open ApplyForm for this job
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Show ApplyForm popup if a job is selected */}
      {selectedJob && (
        <ApplyForm job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}

      {/* Footer Note */}
      <div className="mt-16 text-center text-sm text-gray-500 pb-10 px-4">
        You are viewing the official careers page of{" "}
        <strong className="text-black">Devmitra Solutions</strong>. All
        applications will be directly reviewed by our hiring team.
      </div>
    </div>
  );
};

export default FeedAllJobs;