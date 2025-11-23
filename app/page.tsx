'use client'

import React, { useEffect } from 'react';
import {
   
    Trash2,
    Filter,
    Droplet,
    Factory,
    Home as HomeIcon, // Renaming Home to avoid conflict
    Globe,
    Hospital,
    Building,
    ShoppingBag,
    Award,
    Crosshair
} from 'lucide-react';

// Custom CSS for the gradient background and fade animation transition
const customStyles = `
    .hero-bg {
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

const Home = () => {

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

        // Manually trigger the hero section immediately (since it's usually visible on load)
        const heroElement = document.querySelector('.hero-bg .fade-in-element');
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

           

            {/* Hero Section */}
            <section className="hero-bg text-white py-24 md:py-36 text-center shadow-2xl">
                <div className="max-w-4xl mx-auto px-4 fade-in-element">
                    <h1 className="text-4xl sm:text-6xl font-black mb-4 leading-tight">
                        Welcome to <span className="text-emerald-300">Ecomatrix</span>  <span className="text-sky-300">Solution</span>
                    </h1>
                    <p className="text-xl sm:text-2xl font-light mb-8 opacity-90">
                        Precision Engineering for Highly Accurate, Cost-Optimized Environmental Solutions.
                    </p>
                    <a href="#solutions" className="inline-block px-10 py-4 bg-emerald-500 text-white font-semibold text-lg rounded-xl hover:bg-emerald-600 transition duration-300 transform hover:scale-105 shadow-xl">
                        Explore Our Products
                    </a>
                </div>
            </section>

            {/* Core Philosophy / Values Section */}
            <section id="values" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 fade-in-element">Our Core Ideology</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                        {/* Value 1: Excellence */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-emerald-500 fade-in-element">
                            <div className="flex justify-center mb-4">
                                <Award className="w-10 h-10 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-3">Excellence</h3>
                            <p className="text-gray-600 text-center">
                                We drive to provide the highest quality products, cut above market standards, ensuring unparalleled performance and durability.
                            </p>
                        </div>

                        {/* Value 2: Precision */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-sky-500 fade-in-element" style={{ transitionDelay: '0.1s' }}>
                            <div className="flex justify-center mb-4">
                                <Crosshair className="w-10 h-10 text-sky-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-3">Precision</h3>
                            <p className="text-gray-600 text-center">
                                Our solutions are designed for highly accurate results, combining the latest technologies with proven methods for maximum effectiveness.
                            </p>
                        </div>

                        {/* Value 3: Flexibility */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-slate-500 fade-in-element" style={{ transitionDelay: '0.2s' }}>
                            <div className="flex justify-center mb-4">
                                <Globe className="w-10 h-10 text-slate-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-center mb-3">Flexibility</h3>
                            <p className="text-gray-600 text-center">
                                We provide customized solutions that match the unique needs of your ecosystem and adhere strictly to mandatory governing requirements.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Solutions & Expertise Section */}
            <section id="solutions" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 fade-in-element">
                        <span className="text-sm font-semibold text-emerald-600 uppercase">Product Portfolio</span>
                        <h2 className="text-4xl font-bold text-gray-900 mt-2">Engineered for Every Environmental Need</h2>
                    </div>

                    <div className="space-y-12">
                        {/* Product Group 1: Solid Waste (Garbage Chute System) */}
                        <div className="p-8 bg-gray-50 rounded-2xl shadow-lg border-l-8 border-slate-500 fade-in-element">
                            <h3 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                                <Trash2 className="w-6 h-6 mr-3 text-slate-500" />
                                Solid Waste Handling: Garbage Chute Systems
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Modern, highly efficient systems for handling solid waste in residential and commercial spaces. Engineered for hygiene and convenience.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 list-inside font-medium">
                                <span className="flex items-center"><Filter className="w-4 h-4 mr-2 text-emerald-500" /> Basic Chute Systems</span>
                                <span className="flex items-center"><Filter className="w-4 h-4 mr-2 text-emerald-500" /> Dry & Wet Segregated Chutes</span>
                                <span className="flex items-center"><Filter className="w-4 h-4 mr-2 text-emerald-500" /> Twin Type Systems</span>
                            </div>
                        </div>

                        {/* Product Group 2: Water Treatment Plants */}
                        <div className="p-8 bg-gray-50 rounded-2xl shadow-lg border-l-8 border-sky-500 fade-in-element" style={{ transitionDelay: '0.1s' }}>
                            <h3 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                                <Droplet className="w-6 h-6 mr-3 text-sky-500" />
                                Water Treatment Plants (WTP)
                            </h3>
                            <p className="text-gray-600 mb-4">
                                A comprehensive range of products and complete plants for clean, process-ready water, designed for optimal purity.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700 list-inside font-medium">
                                <span className="flex items-center"><Filter className="w-4 h-4 mr-2 text-emerald-500" /> Filters & Tube Settlers</span>
                                <span className="flex items-center"><Filter className="w-4 h-4 mr-2 text-emerald-500" /> Softeners & DM Plants</span>
                                <span className="flex items-center"><Filter className="w-4 h-4 mr-2 text-emerald-500" /> UF & RO Purification Plants</span>
                            </div>
                        </div>

                        {/* Product Group 3: Wastewater Treatment Plants */}
                        <div className="p-8 bg-gray-50 rounded-2xl shadow-lg border-l-8 border-emerald-500 fade-in-element" style={{ transitionDelay: '0.2s' }}>
                            <h3 className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                                <Factory className="w-6 h-6 mr-3 text-emerald-500" />
                                Wastewater Treatment Plants (WWTP)
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Custom-designed plants to treat and recycle sewage and effluent, meeting the strictest regulatory and ecological standards.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700 list-inside font-medium">
                                <span className="flex items-center"><Filter className="w-4 h-4 mr-2 text-emerald-500" /> Sewage Treatment Plants (STP)</span>
                                <span className="flex items-center"><Filter className="w-4 h-4 mr-2 text-emerald-500" /> Greywater Recycle Systems</span>
                                <span className="flex items-center"><Filter className="w-4 h-4 mr-2 text-emerald-500" /> Effluent Treatment Plants (ETP)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sectors Catered Section */}
            <section id="sectors" className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 fade-in-element">
                        <span className="text-sm font-semibold text-sky-600 uppercase">Trusted Across Industries</span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-2">Who We Serve</h2>
                        <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
                            ECOMATRIX SOLUTIONS delivers highly effective, customized environmental management across a wide spectrum of sectors.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Sector 1 */}
                        <div className="p-4 bg-white rounded-xl shadow-md flex items-center fade-in-element border-l-4 border-emerald-500">
                            <HomeIcon className="text-emerald-500 mr-3 w-5 h-5" />
                            <span className="font-medium text-gray-700">Residential & Townships</span>
                        </div>
                        {/* Sector 2 */}
                        <div className="p-4 bg-white rounded-xl shadow-md flex items-center fade-in-element border-l-4 border-sky-500" style={{ transitionDelay: '0.1s' }}>
                            <Factory className="text-sky-500 mr-3 w-5 h-5" />
                            <span className="font-medium text-gray-700">Process & Mechanical Industries</span>
                        </div>
                        {/* Sector 3 */}
                        <div className="p-4 bg-white rounded-xl shadow-md flex items-center fade-in-element border-l-4 border-emerald-500" style={{ transitionDelay: '0.2s' }}>
                            <Building className="text-emerald-500 mr-3 w-5 h-5" />
                            <span className="font-medium text-gray-700">Hospitality (Hotels, Resorts)</span>
                        </div>
                        {/* Sector 4 */}
                        <div className="p-4 bg-white rounded-xl shadow-md flex items-center fade-in-element border-l-4 border-sky-500" style={{ transitionDelay: '0.3s' }}>
                            <Hospital className="text-sky-500 mr-3 w-5 h-5" />
                            <span className="font-medium text-gray-700">Hospitals & Healthcare</span>
                        </div>
                        {/* Sector 5 */}
                        <div className="p-4 bg-white rounded-xl shadow-md flex items-center fade-in-element border-l-4 border-emerald-500" style={{ transitionDelay: '0.4s' }}>
                            <Building className="text-emerald-500 mr-3 w-5 h-5" />
                            <span className="font-medium text-gray-700">IT Parks & Commercial Est.</span>
                        </div>
                        {/* Sector 6 */}
                        <div className="p-4 bg-white rounded-xl shadow-md flex items-center fade-in-element border-l-4 border-sky-500" style={{ transitionDelay: '0.5s' }}>
                            <ShoppingBag className="text-sky-500 mr-3 w-5 h-5" />
                            <span className="font-medium text-gray-700">Malls & Shopping Complexes</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact & Testimonial/Stats */}
            <section className="py-20 bg-sky-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center fade-in-element">
                        <h2 className="text-4xl font-extrabold mb-4">Proven Impact in a Short Span</h2>
                        <p className="text-xl font-light mb-8 opacity-80 max-w-2xl mx-auto">
                            Our commitment to innovative engineering and customer focus has driven rapid adoption across the industry.
                        </p>
                        <div className="flex justify-center mt-10">
                            <div className="bg-white text-sky-700 p-8 rounded-2xl shadow-2xl fade-in-element" style={{ transitionDelay: '0.3s' }}>
                                <span className="text-6xl font-black block">200+</span>
                                <span className="text-xl font-semibold mt-2 block">Successful Installations</span>
                                <p className="text-sm mt-1">and growing list of valuable clients</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;