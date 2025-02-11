import React from 'react';
import Header from '../Header/Header';
import Footer from '../LandingPage/Footer';
import Homeheader from '../Webapp/Notices/Homewebheader';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white">
            <Homeheader/>
            <main className="mt-16 max-w-4xl mx-auto py-12 px-6 sm:px-8 lg:px-10">
                <div className="bg-white  p-8">
                    <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Privacy Policy</h1>
                    
                    <div className="space-y-12">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We are committed to protecting your privacy. This policy outlines our practices concerning
                                the collection, use, and protection of your personal information.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                            <p className="text-gray-700 mb-4">We collect the following types of information:</p>
                            <ul className="ml-6 space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Personal identifiers (e.g., name, email address)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Account information</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>IP address</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Usage data</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Device information</span>
                                </li>
                            </ul>
                        </section>

                        {/* How We Use Your Information */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                            <p className="text-gray-700 mb-4">We use your information to:</p>
                            <ul className="ml-6 space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Provide and maintain our services</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Improve user experience</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Communicate with you about our services</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Ensure the security of our platform</span>
                                </li>
                            </ul>
                        </section>

                        {/* Information Sharing */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
                            <p className="text-gray-700 mb-4">We may share your information with:</p>
                            <ul className="ml-6 space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Our service providers</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Legal authorities when required by law</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Other users (only information you choose to make public)</span>
                                </li>
                            </ul>
                            <p className="mt-4 text-gray-700">
                                We do not sell your personal information to third parties.
                            </p>
                        </section>

                        {/* Your Rights */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
                            <p className="text-gray-700 mb-4">You have the right to:</p>
                            <ul className="ml-6 space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Access your personal data</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Correct inaccuracies in your data</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Request deletion of your data</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-black mr-2">•</span>
                                    <span>Opt-out of marketing communications</span>
                                </li>
                            </ul>
                        </section>

                        {/* Security Measures */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Measures</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We implement industry-standard security measures to protect your data, including
                                encryption and access controls.
                            </p>
                        </section>

                        {/* Changes to Policy */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We may update this policy periodically. Significant changes will be notified to you
                                via email or website notice.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;