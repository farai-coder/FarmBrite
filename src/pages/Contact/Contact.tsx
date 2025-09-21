import React, { useState } from 'react';
import { Plus, Search, X, ChevronDown } from 'lucide-react';

export const ContactsPage = () => {
    const [showNewContactModal, setShowNewContactModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactType: '',
        website: '',
        primaryPhone: '',
        mobilePhone: '',
        fax: '',
        company: '',
        address: '',
        city: '',
        country: '',
        stateProvince: '',
        postalCode: '',
        description: ''
    });

    // Mock contacts data
    const contacts = [
        {
            id: 1,
            name: "Worthington, Carla",
            type: "Buyer",
            company: "American Hearts",
            email: "carla@americanheartsfarmequipment.com",
            phone: "(208) 555-5772",
            city: "Cobden"
        },
        {
            id: 2,
            name: "Vaughan Champ",
            type: "Contractor",
            company: "Altona Contracting LLC",
            email: "cvaughan@altonacontractingllc.com",
            phone: "(208) 555-8783",
            city: "Waucoma"
        },
        {
            id: 3,
            name: "White, Walter",
            type: "Wholesale Customer",
            company: "Rosin and Post Company",
            email: "walt@rosinandpostcompany.com",
            phone: "(208) 555-7955",
            city: "Rosenfield"
        },
        {
            id: 4,
            name: "Wallace, Craig",
            type: "Customer",
            company: "",
            email: "craig@wallaceco.com",
            phone: "(308) 555-6249",
            city: "LaFayette"
        },
        {
            id: 5,
            name: "Schafer, James",
            type: "Employee",
            company: "Copperdale Farms",
            email: "james@copperdalefarms.com",
            phone: "(308) 555-9885",
            city: "Superior"
        },
        {
            id: 6,
            name: "Nelson, Regina",
            type: "Veterinarian",
            company: "Happy Tale Animal Clinic",
            email: "regina@happytaleactiveclinic.net",
            phone: "(308) 555-8546",
            city: "Nimet"
        },
        {
            id: 7,
            name: "Miller, Otto",
            type: "CenStar",
            company: "Boulder County",
            email: "otto@bouldercountyvet.com",
            phone: "(308) 555-8429",
            city: "Newkirk"
        }
    ];

    const contactTypes = [
        'Buyer',
        'Contractor',
        'Customer',
        'Employee',
        'Veterinarian',
        'Supplier',
        'Wholesale Customer',
        'Other'
    ];

    const countries = [
        'United States',
        'Canada',
        'United Kingdom',
        'Australia',
        'Other'
    ];

    const stateProvinces = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Handle saving the contact
        console.log('Saving contact:', formData);
        setShowNewContactModal(false);
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            contactType: '',
            website: '',
            primaryPhone: '',
            mobilePhone: '',
            fax: '',
            company: '',
            address: '',
            city: '',
            country: '',
            stateProvince: '',
            postalCode: '',
            description: ''
        });
    };

    const handleCancel = () => {
        setShowNewContactModal(false);
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            contactType: '',
            website: '',
            primaryPhone: '',
            mobilePhone: '',
            fax: '',
            company: '',
            address: '',
            city: '',
            country: '',
            stateProvince: '',
            postalCode: '',
            description: ''
        });
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Contacts</h1>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        {/* New Contact Button */}
                        <button
                            onClick={() => setShowNewContactModal(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>New Contact</span>
                        </button>

                        {/* Print Button */}
                        <button className="text-gray-600 hover:text-gray-800 p-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zM5 14H4v-3h1v3zm1 0v2h8v-2H6z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <Search className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search Contacts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10 pl-4 py-2 w-64 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Contacts Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                        <div className="col-span-2">NAME</div>
                        <div className="col-span-2">TYPE</div>
                        <div className="col-span-2">COMPANY</div>
                        <div className="col-span-3">EMAIL</div>
                        <div className="col-span-2">PHONE</div>
                        <div className="col-span-1">CITY</div>
                    </div>

                    {/* Contact Rows */}
                    <div className="divide-y divide-gray-200">
                        {filteredContacts.map((contact) => (
                            <div key={contact.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                                <div className="col-span-2">
                                    <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-sm text-gray-600">{contact.type}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-sm text-gray-600">{contact.company}</span>
                                </div>
                                <div className="col-span-3">
                                    <span className="text-sm text-blue-600 hover:text-blue-800">{contact.email}</span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-sm text-gray-600">{contact.phone}</span>
                                </div>
                                <div className="col-span-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">{contact.city}</span>
                                        <button className="text-red-500 hover:text-red-700">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* New Contact Modal */}
                {showNewContactModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">New Contact</h2>
                                <button
                                    onClick={handleCancel}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-6">
                                    {/* First Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Contact Type */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Type</label>
                                        <select
                                            name="contactType"
                                            value={formData.contactType}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="">Select a contact type...</option>
                                            {contactTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Website */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                                        <input
                                            type="url"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            placeholder="http://www.example.com"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Primary Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Primary Phone</label>
                                        <input
                                            type="tel"
                                            name="primaryPhone"
                                            value={formData.primaryPhone}
                                            onChange={handleInputChange}
                                            placeholder="555-555-5555"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Mobile Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Phone</label>
                                        <input
                                            type="tel"
                                            name="mobilePhone"
                                            value={formData.mobilePhone}
                                            onChange={handleInputChange}
                                            placeholder="555-555-5555"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Fax */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Fax</label>
                                        <input
                                            type="tel"
                                            name="fax"
                                            value={formData.fax}
                                            onChange={handleInputChange}
                                            placeholder="555-555-5555"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Company */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Country */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="">United States</option>
                                            {countries.map(country => (
                                                <option key={country} value={country}>{country}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* State/Province */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                                        <select
                                            name="stateProvince"
                                            value={formData.stateProvince}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        >
                                            <option value="">Montana</option>
                                            {stateProvinces.map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Postal Code */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
