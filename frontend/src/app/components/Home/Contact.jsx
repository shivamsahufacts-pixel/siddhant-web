"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContact, resetContactState, clearError } from "../../../../store/slice/contactSlice";
import { toast } from "react-hot-toast"; // If using react-hot-toast

const ContactForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error, message, submittedData } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Reset success state after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetContactState());
        resetForm();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  // Clear errors after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";

    if (formData.phone && !/^[\d\s\-\+\(\)]{10,15}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) errors.message = "Message is required";
    else if (formData.message.trim().length < 10) errors.message = "Message must be at least 10 characters";

    return errors;
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    });
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Clear previous errors
    setFormErrors({});
    dispatch(clearError());

    // Submit form
    dispatch(submitContact(formData));
  };

  return (
    <div className="bg-[var(--card-bg)] text-[var(--text-color)] px-6 py-10 mx-auto border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-3xl m-auto rounded-xl p-5 shadow-2xl border border-[var(--border)]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[var(--accent)]">
          Get in Touch
        </h2>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                  Message Sent Successfully!
                </h3>
                <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                  <p>{message}</p>
                  {submittedData && (
                    <p className="mt-1 text-xs">
                      Reference ID: {submittedData.id}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
                <span className="text-gray-700 dark:text-gray-300">Sending your message...</span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-2 border ${
                  formErrors.fullName ? 'border-red-500' : 'border-[var(--border)]'
                } bg-[var(--card-bg)] text-[var(--text-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]`}
                disabled={loading}
              />
              {formErrors.fullName && (
                <p className="mt-1 text-xs text-red-500">{formErrors.fullName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 border ${
                  formErrors.email ? 'border-red-500' : 'border-[var(--border)]'
                } bg-[var(--card-bg)] text-[var(--text-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]`}
                disabled={loading}
              />
              {formErrors.email && (
                <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={`w-full px-4 py-2 border ${
                  formErrors.phone ? 'border-red-500' : 'border-[var(--border)]'
                } bg-[var(--card-bg)] text-[var(--text-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]`}
                disabled={loading}
              />
              {formErrors.phone && (
                <p className="mt-1 text-xs text-red-500">{formErrors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full px-4 py-2 border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Write your message... (Minimum 10 characters)"
              className={`w-full px-4 py-2 border ${
                formErrors.message ? 'border-red-500' : 'border-[var(--border)]'
              } bg-[var(--card-bg)] text-[var(--text-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)]`}
              disabled={loading}
            ></textarea>
            {formErrors.message && (
              <p className="mt-1 text-xs text-red-500">{formErrors.message}</p>
            )}
            <div className="text-right mt-1 text-xs text-gray-500 dark:text-gray-400">
              {formData.message.length}/1000 characters
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-md ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[var(--accent)] hover:opacity-90'
              } text-white font-semibold transition shadow-md flex items-center justify-center mx-auto`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Submit Enquiry'
              )}
            </button>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              We'll get back to you within 24-48 hours
            </p>
          </div>
        </form>

        {/* Success Animation (Optional) */}
        {success && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Thank You!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Your message has been delivered successfully.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              We'll contact you at {submittedData?.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;