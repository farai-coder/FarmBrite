import React, { useState } from 'react';

export const ResourcesEquipmentPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState([]);

    // Sample equipment data
    const equipment = [
        {
            id: 1,
            name: 'Tiller',
            type: 'Tiller',
            brandModel: 'Honda 22-16',
            status: 'In Use',
            statusColor: 'bg-blue-100 text-blue-800',
            lastService: '',
            icon: '🚜'
        },
        {
            id: 2,
            name: 'Quality Suburban',
            type: 'SUV',
            brandModel: 'Chevrolet Suburban 1500',
            status: 'Loaned Out',
            statusColor: 'bg-orange-100 text-orange-800',
            lastService: 'Feb. 02, 2024',
            icon: '🚗'
        },
        {
            id: 3,
            name: 'Ford Bronco',
            type: 'SUV',
            brandModel: 'Ford Bronco 2020',
            status: 'Sold',
            statusColor: 'bg-red-100 text-red-800',
            lastService: 'Dec. 05, 2023',
            icon: '🚙'
        },
        {
            id: 4,
            name: 'Ford Raptor R',
            type: 'Pick Up',
            brandModel: 'Ford Raptor 2024',
            status: 'In Use',
            statusColor: 'bg-blue-100 text-blue-800',
            lastService: 'Feb. 11, 2024',
            icon: '🛻'
        },
        {
            id: 5,
            name: 'Grow Light',
            type: 'Greenhouse Equipment',
            brandModel: '',
            status: '',
            statusColor: '',
            lastService: 'Dec. 07, 2023',
            icon: '💡'
        },
        {
            id: 6,
            name: 'JK Wrangler',
            type: 'SUV',
            brandModel: 'Jeep 2020',
            status: '',
            statusColor: '',
            lastService: '',
            icon: '🚙'
        },
        {
            id: 7,
            name: 'Jeep CJ5',
            type: '',
            brandModel: 'Jeep Willys 1976',
            status: 'Decommissioned',
            statusColor: 'bg-gray-100 text-gray-800',
            lastService: 'Oct. 03, 2023',
            icon: '🚙'
        },
        {
            id: 8,
            name: 'John Deere 5070E',
            type: 'Tractor',
            brandModel: 'John Deere 5070E',
            status: '',
            statusColor: '',
            lastService: '',
            icon: '🚜'
        },
        {
            id: 9,
            name: 'KS Blazer',
            type: 'SUV For Plow',
            brandModel: 'Chevrolet KS Blazer 1993',
            status: 'Maintenance',
            statusColor: 'bg-yellow-100 text-yellow-800',
            lastService: '',
            icon: '🚙'
        },
        {
            id: 10,
            name: 'Rover',
            type: 'Side by Side UTV',
            brandModel: 'Mahindra Roxor 2024',
            status: 'In Use',
            statusColor: 'bg-blue-100 text-blue-800',
            lastService: 'Feb. 01, 2024',
            icon: '🏍️'
        },
        {
            id: 11,
            name: 'Snow Plow',
            type: '',
            brandModel: '',
            status: 'At Dealer',
            statusColor: 'bg-purple-100 text-purple-800',
            lastService: 'Nov. 08, 2023',
            icon: '❄️'
        }
    ];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedEquipment(equipment.map(item => item.id));
        } else {
            setSelectedEquipment([]);
        }
    };

    const handleSelectEquipment = (id) => {
        setSelectedEquipment(prev => {
            if (prev.includes(id)) {
                return prev.filter(itemId => itemId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const filteredEquipment = equipment.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brandModel.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isAllSelected = selectedEquipment.length === filteredEquipment.length;
    const isPartiallySelected = selectedEquipment.length > 0 && selectedEquipment.length < filteredEquipment.length;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Equipment</h1>
                <div className="flex items-center space-x-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                        New Equipment
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Equipment"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-search text-gray-400"></i>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Filter ▼</button>
                </div>
            </div>

            {/* Equipment Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        ref={input => {
                                            if (input) input.indeterminate = isPartiallySelected;
                                        }}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name ▲
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Brand/Model
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Service
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredEquipment.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedEquipment.includes(item.id)}
                                            onChange={() => handleSelectEquipment(item.id)}
                                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-lg">{item.icon}</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.type}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.brandModel}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.status && (
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.statusColor}`}>
                                                {item.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.lastService}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <i className="fas fa-ellipsis-v"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

