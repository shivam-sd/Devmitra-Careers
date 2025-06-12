import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 

export default function PostJobs() {
  const [form, setForm] = useState({
    title: '',
    category: '',
    location: '',
    type: '',
    salaryRange: '',
    description: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      // Convert salary range string to object
      let salaryRange = form.salaryRange;
      if (typeof salaryRange === "string" && salaryRange.includes("-")) {
        const [min, max] = salaryRange.split("-").map(s => s.trim());
        salaryRange = { min, max };
      }

      // Prepare payload
      const data = {
        title: form.title,
        description: form.description,
        category: form.category,
        location: form.location,
        type: form.type,
        salaryRange,
      };

      // Get token
      const token = localStorage.getItem('token');
      if (!token) {
        setError("You must be logged in as admin to post a job.");
        return;
      }

      // Send POST request
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/private/jobs/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('✅ Job posted successfully!');
      setForm({
        title: '',
        category: '',
        location: '',
        type: '',
        salaryRange: '',
        description: ''
      });
      navigate("/"); // Redirect to jobs page after posting
    } catch (err) {
      setError(
        err.response?.data?.msg || "❌ Failed to post job."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Post New Job
        </h2>

        {success && <div className="text-green-600 mb-2">{success}</div>}
        {error && <div className="text-red-600 mb-2">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border rounded-md p-3 w-full"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category (e.g., SEO, Marketing)"
            value={form.category}
            onChange={handleChange}
            className="border rounded-md p-3 w-full"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="border rounded-md p-3 w-full"
            required
          />

          <input
            type="text"
            name="type"
            placeholder="Internship / Full Time"
            value={form.type}
            onChange={handleChange}
            className="border rounded-md p-3 w-full"
            required
          />

          <input
            type="text"
            name="salaryRange"
            placeholder="Salary Range (e.g., 10000 - 20000)"
            value={form.salaryRange}
            onChange={handleChange}
            className="border rounded-md p-3 w-full"
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Describe the role, requirements and responsibilities..."
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="mt-4 border rounded-md p-3 w-full"
          required
        ></textarea>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() =>
              setForm({
                title: '',
                category: '',
                location: '',
                type: '',
                salaryRange: '',
                description: ''
              })
            }
            className="px-6 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-amber-600 text-white hover:bg-amber-700"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
}
