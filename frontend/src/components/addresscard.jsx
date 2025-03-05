import PropTypes from "prop-types";

export default function AddressCard({
    country,
    city,
    address1,
    address2,
    zipCode,
    addressType,
}) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="p-6">
                <div className="flex flex-wrap gap-6">
                    {/* Address Type Badge */}
                    <div className="w-full flex justify-between items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            {addressType || 'Default'}
                        </span>
                    </div>

                    {/* Address Details Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2 p-4 rounded-lg bg-gray-50 transform transition duration-300 hover:bg-blue-50">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Country</h3>
                            <p className="text-lg font-semibold text-gray-900">{country || 'Not specified'}</p>
                        </div>

                        <div className="space-y-2 p-4 rounded-lg bg-gray-50 transform transition duration-300 hover:bg-blue-50">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">City</h3>
                            <p className="text-lg font-semibold text-gray-900">{city || 'Not specified'}</p>
                        </div>

                        <div className="space-y-2 p-4 rounded-lg bg-gray-50 transform transition duration-300 hover:bg-blue-50">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">ZIP Code</h3>
                            <p className="text-lg font-semibold text-gray-900">{zipCode || 'Not specified'}</p>
                        </div>

                        <div className="space-y-2 p-4 rounded-lg bg-gray-50 md:col-span-2 lg:col-span-3 transform transition duration-300 hover:bg-blue-50">
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Address Line 1</h3>
                            <p className="text-lg font-semibold text-gray-900">{address1 || 'Not specified'}</p>
                        </div>

                        {address2 && (
                            <div className="space-y-2 p-4 rounded-lg bg-gray-50 md:col-span-2 lg:col-span-3 transform transition duration-300 hover:bg-blue-50">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Address Line 2</h3>
                                <p className="text-lg font-semibold text-gray-900">{address2}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

AddressCard.propTypes = {
    country: PropTypes.string,
    city: PropTypes.string,
    address1: PropTypes.string,
    address2: PropTypes.string,
    zipCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    addressType: PropTypes.string,
};