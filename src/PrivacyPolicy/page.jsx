import React from 'react';
import Header from '../Header/Header';
import Footer from '../LandingPage/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="mt-16 max-w-5xl mx-auto py-12 px-6 sm:px-8 lg:px-10">
                <h1 className="text-4xl font-bold text-[#001A3B] text-center mt-6 mb-6">Privacy Policy</h1>
                <div className="bg-white p-2">
                    <div className="space-y-8">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#001A3B] mb-4">Introduction</h2>
                            <p className="text-[#001A3B]/80">
                                We are committed to protecting your privacy. This policy outlines our practices concerning
                                the collection, use, and protection of your personal information.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#001A3B] mb-4">Information We Collect</h2>
                            <p className="text-[#001A3B]/80 mb-3">We collect the following types of information:</p>
                            <ul className="list-disc pl-6 space-y-2 text-[#001A3B]/80">
                                <li>Personal identifiers (e.g., name, email address)</li>
                                <li>Account information</li>
                                <li>IP address</li>
                                <li>Usage data</li>
                                <li>Device information</li>
                            </ul>
                        </section>

                        {/* How We Use Your Information */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#001A3B] mb-4">How We Use Your Information</h2>
                            <p className="text-[#001A3B]/80 mb-3">We use your information to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-[#001A3B]/80">
                                <li>Provide and maintain our services</li>
                                <li>Improve user experience</li>
                                <li>Communicate with you about our services</li>
                                <li>Ensure the security of our platform</li>
                            </ul>
                        </section>

                        {/* Information Sharing */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#001A3B] mb-4">Information Sharing</h2>
                            <p className="text-[#001A3B]/80 mb-3">We may share your information with:</p>
                            <ul className="list-disc pl-6 space-y-2 text-[#001A3B]/80">
                                <li>Our service providers</li>
                                <li>Legal authorities when required by law</li>
                                <li>Other users (only information you choose to make public)</li>
                            </ul>
                            <p className="mt-3 text-[#001A3B]/80">
                                We do not sell your personal information to third parties.
                            </p>
                        </section>

                        {/* Your Rights */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#001A3B] mb-4">Your Rights</h2>
                            <p className="text-[#001A3B]/80 mb-3">You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-[#001A3B]/80">
                                <li>Access your personal data</li>
                                <li>Correct inaccuracies in your data</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of marketing communications</li>
                            </ul>
                        </section>

                        {/* Security Measures */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#001A3B] mb-4">Security Measures</h2>
                            <p className="text-[#001A3B]/80">
                                We implement industry-standard security measures to protect your data, including
                                encryption and access controls.
                            </p>
                        </section>

                        {/* Changes to Policy */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#001A3B] mb-4">Changes to This Policy</h2>
                            <p className="text-[#001A3B]/80">
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