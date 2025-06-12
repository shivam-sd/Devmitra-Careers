import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApplyForm = ({ job, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contactNumber: "",
    github: "",
    linkedin: "",
    resume: "",
    coverLetter: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Submit application
      await axios.post(`${import.meta.env.VITE_BASE_URL}/applications`, {
        ...form,
        job: job._id,
      });

      // Send email to applicant
      await axios.post(`${import.meta.env.VITE_BASE_URL}/applications/send-email`, {
        name: form.name,
        email: form.email,
      });

      setSuccess("Application submitted! Redirecting...");
      
      // Optional delay for success message display
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Failed to submit application or send email."
      );
      console.error("Error submitting application:", err);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>×</button>
        <h2 className="text-xl font-bold mb-4">Apply for {job.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border p-2 rounded"
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border p-2 rounded"
            name="contactNumber"
            placeholder="Contact Number"
            value={form.contactNumber}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border p-2 rounded"
            name="github"
            placeholder="Portfolio, GitHub, Behance, etc. Link"
            value={form.github}
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded"
            name="linkedin"
            placeholder="LinkedIn Profile Link"
            value={form.linkedin}
            onChange={handleChange}
          />
          <input
            className="w-full border p-2 rounded"
            name="resume"
            placeholder="Resume Link"
            value={form.resume}
            onChange={handleChange}
            required
          />
          <textarea
            className="w-full border p-2 rounded"
            name="coverLetter"
            placeholder="Cover Letter"
            value={form.coverLetter}
            onChange={handleChange}
          />
          <button
            className="bg-yellow-400 text-black px-4 py-2 rounded w-full cursor-pointer hover:bg-yellow-500 transition-colors duration-300"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
          {success && <div className="text-green-600 text-center">{success}</div>}
          {error && <div className="text-red-600 text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
