import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

export const ResourcesInventory = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Sample inventory data matching the image
    const inventoryItems = [
        { id: 1, name: 'Goat Feed', quantity: '13.00 pounds', value: '$38.00' },
        { id: 2, name: 'Green Garlic Hull Sauce', quantity: '24.00', value: '$156.00' },
        { id: 3, name: 'Hay', quantity: '215.00 pounds', value: '$500.00' },
        { id: 4, name: 'Insecticide', quantity: '17.00 fluid ounces', value: '' },
        { id: 5, name: 'Jalapeno Peppers', quantity: '85.00 pounds', value: '' },
        { id: 6, name: 'Jerking Supplies', quantity: '', value: '$70.00' },
        { id: 7, name: 'Large Square Bale', quantity: '6.00 bales', value: '' },
        { id: 8, name: 'Limes', quantity: '10.00 pounds', value: '$16.00' },
        { id: 9, name: 'Liquid Fertilizer', quantity: '21.00 gallons', value: '$1,200.00' },
        { id: 10, name: 'Milk', quantity: '10.50 gallons', value: '' },
        { id: 11, name: 'Oil', quantity: '5.00 quarts', value: '' },
        { id: 12, name: 'Peppers (Hot), Thai Dragon', quantity: '48.00 pounds', value: '$192.16' },
        { id: 13, name: 'Plant Fertilizer', quantity: '45.84 pounds', value: '' },
        { id: 14, name: 'Sheep Entraps', quantity: '', value: '$5.00' },
        { id: 15, name: 'String Round Bale', quantity: '6.00 bales', value: '' },
        { id: 16, name: 'Small Square Bale', quantity: '', value: '$8.00' },
        { id: 17, name: 'Tomatoes, San Marzano', quantity: '48.00 pounds', value: '$197.53', variety: 'San Marzano' }
    ];

    const filteredItems = inventoryItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Inventory</h1>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <Plus size={16} />
                        <span>Add Item</span>
                    </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pr-10 pl-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>

                {/* Inventory Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Item Name
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Value
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                                                    {item.name}
                                                </span>
                                                {item.variety && (
                                                    <span className="text-xs text-gray-500">{item.variety}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm text-gray-900">
                                            {item.quantity || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm text-gray-900">
                                            {item.value || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button className="text-blue-600 hover:text-blue-800 p-1">
                                                    <Edit size={14} />
                                                </button>
                                                <button className="text-red-600 hover:text-red-800 p-1">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm text-gray-700">
                            Displaying all {filteredItems.length} records
                        </p>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">Total Items</div>
                        <div className="text-2xl font-bold text-gray-800">{inventoryItems.length}</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">Items with Quantities</div>
                        <div className="text-2xl font-bold text-green-600">
                            {inventoryItems.filter(item => item.quantity).length}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="text-sm font-medium text-gray-600 mb-2">Items with Values</div>
                        <div className="text-2xl font-bold text-blue-600">
                            {inventoryItems.filter(item => item.value).length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

