'use client'

import React, { useEffect } from 'react';
import {
  Target,
  Zap,
  Users,
  Ruler,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  BarChart3
} from 'lucide-react';

// Custom CSS for the gradient background and fade animation transition, mirrored from Home.jsx
const customStyles = `
    .about-hero-bg {
        background: linear-gradient(-45deg, #0284c7, #065f46, #0f172a, #059669);
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
    }

    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .fade-in-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .fade-in-element.is-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Page = () => {

  // Use IntersectionObserver for performant scroll-based fade-in effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      },
      {
        threshold: 0.1, // Start fading in when 10% of element is visible
        rootMargin: '0px 0px -100px 0px' // Trigger slightly early
      }
    );

    // Observe all elements that need fading in
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach((el) => observer.observe(el));

    // Manually trigger the hero section immediately
    const heroElement = document.querySelector('.about-hero-bg .fade-in-element');
    if (heroElement) {
      heroElement.classList.add('is-visible');
    }

    // Cleanup function
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []); // Run only once on mount

  return (
    <div className="text-gray-800">
      {/* Inject custom styles for animations */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* About Hero Section */}
      <section className="about-hero-bg text-white py-24 md:py-36 text-center shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 fade-in-element">
          <h1 className="text-5xl sm:text-7xl font-black mb-4 leading-tight">
            A <span className="text-emerald-300">New Age</span> Engineering Company
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-8 opacity-90">
            ECOMATRIX SOLUTIONS is committed to providing safe industrial solutions, driving sustainability across the manufacturing and supply chain.
          </p>
        </div>
      </section>

      {/* Core Identity & Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Core Identity */}
            <div className="fade-in-element">
              <Briefcase className="w-12 h-12 text-sky-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Identity</h2>
              <p className="text-lg text-gray-600 mb-4">
                ECOMATRIX SOLUTIONS is a new age engineering company involved in the manufacturing, supply, and export of environmental products. We are a crucial cog in the business machine, committed to providing safe industrial solutions to many factories.
              </p>
              <p className="text-lg font-semibold text-gray-700">
                Water & Solid Waste Management are the future concerns, and we are built to address them head-on.
              </p>
            </div>
            {/* Mission */}
            <div className="p-8 bg-gray-50 rounded-2xl shadow-xl border-l-8 border-emerald-500 fade-in-element" style={{ transitionDelay: '0.1s' }}>
              <Target className="w-12 h-12 text-emerald-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Aim & Focus</h2>
              <p className="text-lg text-gray-600">
                Driven by the core ideology of **Excellence & Precision**, our mission is to provide the highest quality products, cut above market standards, and deliver the most effective, cost-effective environmental solutions. We combine the latest technologies with established ones to perfectly match the needs of our ecosystem and the mandatory requirements set by governing bodies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise & Know-How Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 fade-in-element">The ECOMATRIX Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Process Depth */}
            <div className="p-6 bg-white rounded-xl shadow-lg fade-in-element">
              <BarChart3 className="w-8 h-8 text-sky-600 mb-3" />
              <h3 className="text-xl font-semibold mb-2">In-Depth Process Knowledge</h3>
              <p className="text-gray-600 text-sm">
                Our solutions are backed by deep understanding of environmental processes, ensuring system design is scientifically sound and regulatory compliant.
              </p>
            </div>
            {/* Feature 2: Mechanical Expertise */}
            <div className="p-6 bg-white rounded-xl shadow-lg fade-in-element" style={{ transitionDelay: '0.1s' }}>
              <Ruler className="w-8 h-8 text-emerald-600 mb-3" />
              <h3 className="text-xl font-semibold mb-2">High-Quality Mechanical Build</h3>
              <p className="text-gray-600 text-sm">
                This process knowledge is integrated and supported by the experience of mechanical engineering know-how to manufacture durable, high-quality systems.
              </p>
            </div>
            {/* Feature 3: Quality & Service */}
            <div className="p-6 bg-white rounded-xl shadow-lg fade-in-element" style={{ transitionDelay: '0.2s' }}>
              <Zap className="w-8 h-8 text-slate-600 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Timely Service and Quality</h3>
              <p className="text-gray-600 text-sm">
                We prioritize good quality products and timely service to ensure our clients experience reliable, efficient, and continuous operation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Placeholder Section (Kept for completeness) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-in-element">
            <Users className="w-10 h-10 text-sky-600 mx-auto mb-3" />
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Leaders</h2>
            <p className="text-gray-600 mt-3">Driven by experience, guided by vision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Leader 1 */}
            <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md fade-in-element">
              <div className="w-32 h-32 bg-sky-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-sky-700">
                JP
              </div>
              <h3 className="text-xl font-semibold">Jaya Prakash</h3>
              <p className="text-emerald-600 font-medium">Chief Executive Officer</p>
              <p className="text-gray-500 text-sm mt-2">
                Over 20 years in large-scale industrial water and waste management.
              </p>
            </div>
            {/* Leader 2 */}
            <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md fade-in-element" style={{ transitionDelay: '0.1s' }}>
              <div className="w-32 h-32 bg-emerald-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-emerald-700">
                AT
              </div>
              <h3 className="text-xl font-semibold">Anjali Taneja</h3>
              <p className="text-sky-600 font-medium">Head of Engineering & R&D</p>
              <p className="text-gray-500 text-sm mt-2">
                Specializing in sustainable process optimization and regulatory compliance.
              </p>
            </div>
            {/* Leader 3 */}
            <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md fade-in-element" style={{ transitionDelay: '0.2s' }}>
              <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-slate-700">
                SK
              </div>
              <h3 className="text-xl font-semibold">Samuel Klein</h3>
              <p className="text-emerald-600 font-medium">Chief Financial Officer</p>
              <p className="text-gray-500 text-sm mt-2">
                Ensuring the economic viability and cost-effectiveness of all client projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact CTA Section */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in-element">
          <h3 className="text-3xl font-bold mb-3 text-emerald-500">Ready to partner with a New Age Engineering leader?</h3>
          <p className="text-lg text-gray-400 mb-8">
            Lets discuss how our blend of process knowledge and mechanical engineering can provide you with the best environmental solution.
          </p>
          <a href="/contact" className="inline-block px-10 py-4 bg-sky-600 text-white font-semibold text-lg rounded-xl hover:bg-sky-700 transition duration-300 transform hover:scale-105 shadow-xl">
            Start a Project Inquiry
          </a>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-emerald-500" />
              sachin@ecomatrix.in
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-emerald-500" />
              +91 9766474241
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
              Flat No. 03, Third Floor, Shastri Heritage, Opposite Tata Motors, Chinchwad, Pune - 411033, MH, India
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;