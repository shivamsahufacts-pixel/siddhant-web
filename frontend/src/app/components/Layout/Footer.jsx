"use client";

import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[var(--bg)] text-[var(--text-color)] pt-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {/* Brand */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-lg p-6">
          <img
            src="/logos.png"
            alt="Logo"
            className="h-10 "
          />
          <p className="text-sm leading-relaxed text-[var(--text-color)]/80">
            I’m a Front-End Developer & UI/UX Designer delivering
            modern, scalable and user-centric digital experiences
            with high performance and clean design.
          </p>

          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP].map(
              (Icon, i) => (
                <span
                  key={i}
                  className="p-2 rounded-full bg-[var(--accent)] text-white cursor-pointer hover:scale-110 transition"
                >
                  <Icon size={14} />
                </span>
              )
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {["Home", "About", "Services", "Projects", "Contact"].map(
              (item) => (
                <li
                  key={item}
                  className="cursor-pointer hover:text-[var(--accent)] transition"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Support */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-sm">
            {[
              "FAQs",
              "Testimonials",
              "Blog",
              "Privacy Policy",
              "Terms & Conditions",
            ].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-[var(--accent)] transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>

          <ul className="space-y-4 text-sm">
            <li>
              <span className="font-medium">Email:</span>{" "}
            Siddhantsahu503@gmail.com
            </li>
            <li>
              <span className="font-medium">Phone:</span>{" "}
              +91 7389338475
            </li>
            <li>
              <span className="font-medium">Address:</span>{" "}
              Indore, Madhya Pradesh, India
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="mt-16 border-t border-[var(--border)] py-6 text-center text-sm text-[var(--text-color)]/70">
        © {new Date().getFullYear()} Siddhant Sahu. All rights reserved.
        <span className="block mt-1">
          Crafted with ❤️ by{" "}
          <span className="text-[var(--accent)] font-medium">
            Siddhant
          </span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
