"use client"

import React, { useEffect } from 'react';
import {
    Mail,
    Phone,
    MapPin,
    MessageSquare,
    Send,
    Briefcase
} from 'lucide-react';

// Custom CSS for the gradient background and fade animation transition, mirrored from Home/About.jsx
const customStyles = `
    .contact-hero-bg {
        background: linear-gradient(-45deg, #0f172a, #065f46, #0284c7, #059669);
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
        const heroElement = document.querySelector('.contact-hero-bg .fade-in-element');
        if (heroElement) {
            heroElement.classList.add('is-visible');
        }

        // Cleanup function
        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []); // Run only once on mount

    /**
     * Placeholder function for form submission.
     * @param {React.FormEvent<HTMLFormElement>} e The form event object, explicitly typed for TypeScript compatibility.
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // In a real application, you would handle form data submission here (e.g., via Firestore or an API).
        console.log("Contact form submitted (placeholder action).");
        // Display a submission message
        const messageBox = document.getElementById('submission-message');
        if (messageBox) {
            messageBox.textContent = "Thank you for your inquiry! We will contact you shortly.";
            messageBox.classList.remove('hidden');
            setTimeout(() => messageBox.classList.add('hidden'), 5000);
        }
    };

    return (
        <div className="text-gray-800">
            {/* Inject custom styles for animations */}
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />

            {/* Contact Hero Section */}
            <section className="contact-hero-bg text-white py-24 md:py-36 text-center shadow-2xl">
                <div className="max-w-4xl mx-auto px-4 fade-in-element">
                    <h1 className="text-5xl sm:text-7xl font-black mb-4 leading-tight">
                        Let Engineer Your <span className="text-emerald-300">Solution</span>
                    </h1>
                    <p className="text-xl sm:text-2xl font-light mb-8 opacity-90">
                        Reach out to our experts to discuss your water, wastewater, or solid waste management requirements.
                    </p>
                </div>
            </section>

            {/* Main Contact Content - Form and Details */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Contact Information Column */}
                        <div className="lg:col-span-1 space-y-8 fade-in-element">
                            <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-6">
                                <Briefcase className="w-8 h-8 mr-3 text-sky-600" />
                                General Inquiries
                            </h2>
                            
                            {/* Email */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-500">
                                <Mail className="w-6 h-6 text-emerald-600 mb-2" />
                                <h3 className="text-xl font-semibold">Email Us</h3>
                                <p className="text-gray-600">For general questions and support.</p>
                                <a href="mailto:info@ecomatrix.com" className="font-medium text-sky-600 hover:text-sky-800 transition">sachin@ecomatrix.in</a>
                            </div>

                            {/* Phone */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sky-500">
                                <Phone className="w-6 h-6 text-sky-600 mb-2" />
                                <h3 className="text-xl font-semibold">Call Our Team</h3>
                                <p className="text-gray-600">Available Mon - Fri, 9am - 5pm.</p>
                                <a href="tel:+15551234567" className="font-medium text-sky-600 hover:text-sky-800 transition">+91 9766474241 </a>
                            </div>
                            
                            {/* Address */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-slate-500">
                                <MapPin className="w-6 h-6 text-slate-600 mb-2" />
                                <h3 className="text-xl font-semibold"> Headquarters</h3>
                                <p className="text-gray-600">
                                    Flat No. 03, Third Floor, Shastri Heritage,<br/> Opposite Tata Motors, Chinchwad, Pune - 411033, MH, India
                                </p>
                            </div>
                        </div>

                        {/* Contact Form Column */}
                        <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-2xl shadow-2xl fade-in-element" style={{ transitionDelay: '0.1s' }}>
                            <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-6">
                                <MessageSquare className="w-8 h-8 mr-3 text-emerald-600" />
                                Project Inquiry Form
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Please fill out the details below so we can accurately assess your needs and prepare the most relevant solution.
                            </p>

                            {/* Submission message box */}
                            <div id="submission-message" className="hidden mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded font-medium" role="alert">
                                
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name / Company Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="E.g., Acme Manufacturing Co."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            placeholder="you@company.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="+1 (555) 555-5555"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">Area of Interest</label>
                                    <select
                                        id="interest"
                                        name="interest"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                                    >
                                        <option value="">-- Select a primary need --</option>
                                        <option value="wastewater">Wastewater Treatment (STP/ETP)</option>
                                        <option value="water">Water Treatment (RO/UF/Filters)</option>
                                        <option value="solidwaste">Solid Waste Management (Chutes/OWC)</option>
                                        <option value="general">General Inquiry / Consultation</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        // rows="4"
                                        required
                                        placeholder="Briefly describe your current challenge or the scale of the system you require."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition duration-300 transform hover:scale-[1.01] shadow-lg"
                                >
                                    <Send className="w-5 h-5 mr-3" />
                                    Submit Inquiry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Map Placeholder */}
            <section className="py-12 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl font-bold mb-4 fade-in-element">Find Our Office</h3>
                    <div className="bg-gray-200 h-64 w-full rounded-xl shadow-inner flex items-center justify-center text-gray-500 italic fade-in-element" style={{ transitionDelay: '0.1s' }}>
                        [Placeholder for Interactive Map]
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Page;