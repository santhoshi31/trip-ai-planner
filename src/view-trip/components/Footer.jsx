import React from 'react';

function Footer({trip}) {
    return (
        <footer className=" py-8 mt-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* About Section */}
                <div>
                    <h2 className="font-bold text-lg mb-4">About Us</h2>
                    <p className="text-sm">
                        We are dedicated to bringing you the best travel experiences, providing detailed itineraries, and helping you explore the world.
                    </p>
                </div>
                
                {/* Quick Links Section */}
                <div>
                    <h2 className="font-bold text-lg mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:underline">Home</a></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h2 className="font-bold text-lg mb-4">Contact</h2>
                    <ul className="space-y-2 text-sm">
                        <li>📞 Phone: +919876543210</li>
                        <li>✉️ Email: wanderweaver@gmail.com</li>
                        <li>
                            <a href="https://facebook.com" className="hover:underline">Facebook</a> | 
                            <a href="https://twitter.com" className="hover:underline ml-2">Twitter</a> | 
                            <a href="https://instagram.com" className="hover:underline ml-2">Instagram</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 border-gray-600 pt-4 text-center text-sm">
                <p>&copy; 2024 Wander Weaver. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
