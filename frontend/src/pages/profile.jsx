import { useEffect, useState } from "react";
import Navbar from "../components/nav.jsx";
import AddressCard from "../components/addresscard.jsx";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [personalDetails, setPersonalDetails] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        avatarUrl: "",
    });
    const [address, setAddress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/api/v2/user/profile?email=${'coco@gmail.com'}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                return res.json();
            })
            .then((data) => {
                setPersonalDetails(data.user);
                setAddress(data.addresses || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const avatarUrl = personalDetails.avatarUrl
        ? `http://localhost:8000${personalDetails.avatarUrl}`
        : 'https://via.placeholder.com/150';

    const handleAddAddress = () => {
        navigate('/create-address');
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
                <Navbar />
                <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
                <Navbar />
                <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    {/* Personal Details Section */}
                    <div className="p-8 border-b border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 relative">
                            Personal Details
                            <span className="absolute bottom-0 left-0 w-20 h-1 bg-blue-600 rounded-full"></span>
                        </h2>
                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="w-full md:w-1/3">
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full opacity-50 group-hover:opacity-100 transition duration-300 blur"></div>
                                    <img
                                        src={avatarUrl}
                                        alt="Profile"
                                        className="relative w-40 h-40 mx-auto rounded-full object-cover shadow-lg transform transition duration-300 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/150';
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-2/3 space-y-8">
                                <div className="transform transition duration-300 hover:translate-x-2">
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Name</h3>
                                    <p className="mt-2 text-xl font-semibold text-gray-900">{personalDetails.name || 'Not provided'}</p>
                                </div>
                                <div className="transform transition duration-300 hover:translate-x-2">
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Email</h3>
                                    <p className="mt-2 text-xl font-semibold text-gray-900">{personalDetails.email || 'Not provided'}</p>
                                </div>
                                <div className="transform transition duration-300 hover:translate-x-2">
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Phone Number</h3>
                                    <p className="mt-2 text-xl font-semibold text-gray-900">{personalDetails.phoneNumber || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Addresses Section */}
                    <div className="bg-gradient-to-br from-gray-50 to-white p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 relative">
                                Addresses
                                <span className="absolute bottom-0 left-0 w-16 h-1 bg-blue-600 rounded-full"></span>
                            </h2>
                            <button
                                onClick={handleAddAddress}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold
                                    transform transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-lg
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                    active:scale-95"
                            >
                                Add New Address
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            {address.length === 0 ? (
                                <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">No addresses found</h3>
                                    <p className="mt-2 text-gray-500">Click the button above to add your first address</p>
                                </div>
                            ) : (
                                address.map((addr, index) => (
                                    <AddressCard key={index} {...addr} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}