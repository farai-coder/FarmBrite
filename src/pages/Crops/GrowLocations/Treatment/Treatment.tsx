import React, { useState } from 'react';

// This component would need to be imported in your App.tsx file like:
// import { GrowLocationTreatments } from './pages/Crops/GrowLocations/Treatments/Treatments';

export const GrowLocationTreatments = () => {
    const [selectedTreatments, setSelectedTreatments] = useState([]);

    // Sample treatment records data
    const treatmentRecords = [
        {
            id: 1,
            date: 'Sep. 14, 2021',
            type: 'Mold',
            typeColor: 'bg-blue-100 text-blue-800',
            detailsProduct: 'Break The Mold',
            amount: '25 oz',
            retreatDate: '',
            enteredBy: 'Chris'
        },
        {
            id: 2,
            date: 'Sep. 07, 2021',
            type: 'Pesticide',
            typeColor: 'bg-orange-100 text-orange-800',
            detailsProduct: 'Insect Incinerator',
            amount: '14g',
            retreatDate: '',
            enteredBy: 'Chris'
        },
        {
            id: 3,
            date: 'Sep. 02, 2021',
            type: 'Mildew',
            typeColor: 'bg-purple-100 text-purple-800',
            detailsProduct: 'Mildew Mitigator',
            amount: '5g',
            retreatDate: '',
            enteredBy: 'Chris'
        },
        {
            id: 4,
            date: 'Aug. 23, 2021',
            type: 'Fungus',
            typeColor: 'bg-yellow-100 text-yellow-800',
            detailsProduct: 'Fungus Fighter 3500 Max Xtreme',
            amount: '19g',
            retreatDate: 'Aug. 18, 2021',
            enteredBy: 'Chris'
        },
        {
            id: 5,
            date: 'Aug. 04, 2021',
            type: 'Herbicide',
            typeColor: 'bg-green-100 text-green-800',
            detailsProduct: 'Weed Cutter',
            amount: '3kt',
            retreatDate: 'Aug. 18, 2021',
            enteredBy: 'Chris'
        },
        {
            id: 6,
            date: 'Jul. 14, 2021',
            type: 'Mites',
            typeColor: 'bg-red-100 text-red-800',
            detailsProduct: 'Neem Oil',
            amount: '1L',
            retreatDate: '',
            enteredBy: 'Chris'
        },
        {
            id: 7,
            date: 'Jul. 05, 2021',
            type: 'Insect',
            typeColor: 'bg-indigo-100 text-indigo-800',
            detailsProduct: 'Bug-B-Gone',
            amount: '2bt',
            retreatDate: 'Jul. 19, 2021',
            enteredBy: 'Chris'
        }
    ];

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedTreatments(treatmentRecords.map(record => record.id));
        } else {
            setSelectedTreatments([]);
        }
    };

    const handleSelectTreatment = (id: number) => {
        setSelectedTreatments(prev => {
            if (prev.includes(id)) {
                return prev.filter(treatmentId => treatmentId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const isAllSelected = selectedTreatments.length === treatmentRecords.length;
    const isPartiallySelected = selectedTreatments.length > 0 && selectedTreatments.length < treatmentRecords.length;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Northwest Field A (CSA Shares)</h1>
                    <p className="text-sm text-gray-600">
                        2.5 Acre
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2">
                            Active
                        </span>
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                        New Treatment Record
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 p-2">
                        <i className="fas fa-print"></i>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 p-2">
                        <i className="fas fa-th"></i>
                    </button>
                </div>
            </div>

            {/* Data Table */}
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
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Details/Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Retreat Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Entered By
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {treatmentRecords.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedTreatments.includes(record.id)}
                                            onChange={() => handleSelectTreatment(record.id)}
                                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {record.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${record.typeColor}`}>
                                            {record.type} ▼
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <span className="flex items-center">
                                            {record.detailsProduct} ▼
                                            <span className="ml-1 font-medium">{record.amount}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {record.retreatDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {record.enteredBy}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                📋
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                ✗
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm text-gray-700">Displaying all 7 treatments</p>
                </div>
            </div>
        </div>
    );
};
