// "use client";

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   FaCode,
//   FaLaptopCode,
//   FaUserTie,
//   FaRocket,
//   FaMobile,
//   FaPalette,
//   FaShieldAlt,
//   FaLightbulb,
//   FaCogs
// } from "react-icons/fa";
// import { SiAirtable } from "react-icons/si";

// import { fetchServices } from "../../../../store/slice/serviceSlice";

// /* =========================
//    ICON MAPPER (Backend Safe)
// ========================= */
// const iconMap = {
//   frontend: <FaLaptopCode className="text-3xl" />,
//   fullstack: <FaCode className="text-3xl" />,
//   client: <FaUserTie className="text-3xl" />,
//   ai: <SiAirtable className="text-3xl" />,
//   mobile: <FaMobile className="text-3xl" />,
//   uiux: <FaPalette className="text-3xl" />,
//   performance: <FaRocket className="text-3xl" />,
//   security: <FaShieldAlt className="text-3xl" />
// };

// const ServicesSection = () => {
//   const dispatch = useDispatch();
//   // const dispatch = useDispatch();


//  const { services, loading, error } = useSelector((state) => state.service);


//   const [activeService, setActiveService] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);

//   /* =========================
//      FETCH SERVICES
//   ========================= */
//   useEffect(() => {
//     dispatch(fetchServices());
//     setIsVisible(true);
//   }, [dispatch]);

//   /* =========================
//      AUTO ROTATE SERVICE
//   ========================= */
//   useEffect(() => {
//     if (!services?.length) return;

//     const interval = setInterval(() => {
//       setActiveService((prev) => (prev + 1) % services.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [services]);

//   /* =========================
//      LOADING STATE
//   ========================= */
//   if (loading) {
//     return (
//       <section className="py-20 text-center">
//         <p className="opacity-70">Loading services...</p>
//       </section>
//     );
//   }

//   /* =========================
//      ERROR STATE
//   ========================= */
//   if (error) {
//     return (
//       <section className="py-20 text-center text-red-500">
//         {error}
//       </section>
//     );
//   }

//   return (
//     <section className="relative py-20 px-4 bg-[var(--bg)] text-[var(--text-color)] border-b border-[var(--border)] overflow-hidden">
//       <div className="max-w-7xl mx-auto relative z-10">

//         {/* ========================= HEADER ========================= */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)] bg-opacity-10 border border-[var(--accent)] border-opacity-20 mb-4">
//             <FaCogs className="text-[var(--accent)] text-sm" />
//             <span className="text-sm font-medium text-white">
//               Comprehensive Services
//             </span>
//           </div>

//           <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[var(--text-color)] to-[var(--accent)] bg-clip-text text-transparent">
//             My Services
//           </h2>

//           <p className="text-xl opacity-80 max-w-3xl mx-auto">
//             End-to-end digital solutions combining cutting-edge technology with user-centered design.
//           </p>
//         </div>

//         {/* ========================= SERVICES GRID ========================= */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//           {services?.map((service, index) => (
//             <div
//               key={service._id}
//               onMouseEnter={() => setActiveService(index)}
//               className={`transition-all duration-500 ${
//                 isVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-8"
//               }`}
//             >
//               <div
//                 className={`bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--border)]
//                 shadow-lg hover:shadow-2xl hover:scale-105 transition-all
//                 ${
//                   activeService === index
//                     ? "ring-2 ring-[var(--accent)]"
//                     : ""
//                 }`}
//               >
//                 {/* ICON */}
//                 <div
//                   className={`mb-4 p-3 rounded-xl bg-gradient-to-r ${
//                     service.gradient || "from-blue-500 to-cyan-500"
//                   } w-fit mx-auto`}
//                 >
//                   <div className="text-white">
//                     {iconMap[service.iconKey] || (
//                       <FaCode className="text-3xl" />
//                     )}
//                   </div>
//                 </div>

//                 {/* TITLE */}
//                 <h3 className="text-xl font-bold mb-3 text-center">
//                   {service.title}
//                 </h3>

//                 {/* DESCRIPTION */}
//                 <p className="text-sm opacity-80 text-center">
//                   {service.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ========================= FOOTER CTA ========================= */}
//         <div className="text-center mt-12">
//           <div className="inline-flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl px-6 py-4">
//             <FaLightbulb className="text-[var(--accent)] text-xl" />
//             <span className="opacity-80">
//               Have a project in mind? Let's build something amazing!
//             </span>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default ServicesSection;
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FaCode,
  FaLaptopCode,
  FaUserTie,
  FaRocket,
  FaMobile,
  FaPalette,
  FaShieldAlt,
  FaLightbulb,
  FaCogs
} from "react-icons/fa";
import { SiAirtable } from "react-icons/si";

import { fetchServices } from "../../../../store/slice/serviceSlice";

/* =========================
   ICON MAPPER (Backend Safe)
========================= */
const iconMap = {
  frontend: <FaLaptopCode className="text-3xl" />,
  fullstack: <FaCode className="text-3xl" />,
  client: <FaUserTie className="text-3xl" />,
  ai: <SiAirtable className="text-3xl" />,
  mobile: <FaMobile className="text-3xl" />,
  uiux: <FaPalette className="text-3xl" />,
  performance: <FaRocket className="text-3xl" />,
  security: <FaShieldAlt className="text-3xl" />
};

const ServicesSection = () => {
  const dispatch = useDispatch();
  // const dispatch = useDispatch();


 const { services, loading, error } = useSelector((state) => state.service);


  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  /* =========================
     FETCH SERVICES
  ========================= */
  useEffect(() => {
    dispatch(fetchServices());
    setIsVisible(true);
  }, [dispatch]);

  /* =========================
     AUTO ROTATE SERVICE
  ========================= */
  useEffect(() => {
    if (!services?.length) return;

    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [services]);

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="opacity-70">Loading services...</p>
      </section>
    );
  }

  /* =========================
     ERROR STATE
  ========================= */
  if (error) {
    return (
      <section className="py-20 text-center text-red-500">
        {error}
      </section>
    );
  }

  return (
    <section className="relative py-20 px-4 bg-[var(--bg)] text-[var(--text-color)] border-b border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* ========================= HEADER ========================= */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)] bg-opacity-10 border border-[var(--accent)] border-opacity-20 mb-4">
            <FaCogs className="text-[var(--accent)] text-sm" />
            <span className="text-sm font-medium text-white">
              Comprehensive Services
            </span>
          </div>

          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[var(--text-color)] to-[var(--accent)] bg-clip-text text-transparent">
            My Services
          </h2>

          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            End-to-end digital solutions combining cutting-edge technology with user-centered design.
          </p>
        </div>

        {/* ========================= SERVICES GRID ========================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services?.map((service, index) => (
            <div
              key={service._id}
              onMouseEnter={() => setActiveService(index)}
              className={`transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div
                className={`bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--border)]
                shadow-lg hover:shadow-2xl hover:scale-105 transition-all
                ${
                  activeService === index
                    ? "ring-2 ring-[var(--accent)]"
                    : ""
                }`}
              >
                {/* ICON */}
                <div
                  className={`mb-4 p-3 rounded-xl bg-gradient-to-r ${
                    service.gradient || "from-blue-500 to-cyan-500"
                  } w-fit mx-auto`}
                >
                  <div className="text-white">
                    {iconMap[service.iconKey] || (
                      <FaCode className="text-3xl" />
                    )}
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold mb-3 text-center">
                  {service.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm opacity-80 text-center">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ========================= FOOTER CTA ========================= */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl px-6 py-4">
            <FaLightbulb className="text-[var(--accent)] text-xl" />
            <span className="opacity-80">
              Have a project in mind? Let's build something amazing!
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
