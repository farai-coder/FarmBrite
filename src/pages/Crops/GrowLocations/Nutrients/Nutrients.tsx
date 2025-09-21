import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const GrowLocationNutrients = () => {
    const [selectedView, setSelectedView] = useState('all');

    // Sample data for the charts
    const nutrientData = [
        { date: '2021-06-15', nitrogen: 298, phosphorus: 145, potassium: 189, calcium: 62, sulfur: 51, boron: 68, magnesium: 25, iron: 45, pH: 6.5 },
        { date: '2021-07-01', nitrogen: 310, phosphorus: 130, potassium: 160, calcium: 55, sulfur: 45, boron: 63, magnesium: 12, iron: 35, pH: 6.0 },
        { date: '2021-07-15', nitrogen: 326, phosphorus: 152, potassium: 155, calcium: 68, sulfur: 72, boron: 80, magnesium: 27, iron: 42, pH: 6.7 },
        { date: '2021-08-01', nitrogen: 298, phosphorus: 126, potassium: 151, calcium: 58, sulfur: 62, boron: 81, magnesium: 22, iron: 36, pH: 7.1 },
        { date: '2021-08-15', nitrogen: 257, phosphorus: 126, potassium: 151, calcium: 58, sulfur: 62, boron: 81, magnesium: 22, iron: 36, pH: 7.1 },
        { date: '2021-09-01', nitrogen: 310, phosphorus: 130, potassium: 160, calcium: 55, sulfur: 45, boron: 63, magnesium: 12, iron: 35, pH: 6.0 },
    ];

    // Sample nutrient records data
    const nutrientRecords = [
        {
            id: 1,
            date: 'Sep. 17, 2021',
            action: 'Sampled',
            nitrogen: 298,
            phosphorus: 145,
            potassium: 189,
            magnesium: 62,
            sulfur: 51,
            calcium: 68,
            boron: 25,
            copper: 45,
            pH: 6.5,
            enteredBy: 'Chris'
        },
        {
            id: 2,
            date: 'Sep. 15, 2021',
            action: 'Fox Farm Beastie Bloom added +1250mg',
            nitrogen: 1,
            phosphorus: 10,
            potassium: 70,
            magnesium: 2,
            sulfur: 3,
            calcium: 6,
            boron: 8,
            copper: 4,
            pH: null,
            enteredBy: 'Chris'
        },
        {
            id: 3,
            date: 'Sep. 01, 2021',
            action: 'Fox Farm Big Bloom added +.5',
            nitrogen: 2,
            phosphorus: 5,
            potassium: 3,
            magnesium: 1,
            sulfur: 0,
            calcium: 4,
            boron: 3,
            copper: 1,
            pH: null,
            enteredBy: 'Chris'
        },
        {
            id: 4,
            date: 'Sep. 01, 2021',
            action: 'Sampled',
            nitrogen: 310,
            phosphorus: 130,
            potassium: 160,
            magnesium: 55,
            sulfur: 45,
            calcium: 63,
            boron: 12,
            copper: 35,
            pH: 6.0,
            enteredBy: 'Chris'
        },
        {
            id: 5,
            date: 'Aug. 18, 2021',
            action: 'Sampled',
            nitrogen: 326,
            phosphorus: 152,
            potassium: 155,
            magnesium: 68,
            sulfur: 72,
            calcium: 80,
            boron: 27,
            copper: 42,
            pH: 6.7,
            enteredBy: 'Chris'
        },
        {
            id: 6,
            date: 'Aug. 16, 2021',
            action: 'Growzilla added +.5',
            nitrogen: 4,
            phosphorus: 6,
            potassium: 10,
            magnesium: 1,
            sulfur: 1,
            calcium: 2,
            boron: 3,
            copper: 1,
            pH: null,
            enteredBy: 'Chris'
        },
        {
            id: 7,
            date: 'Aug. 04, 2021',
            action: 'NitroGro added +1gal',
            nitrogen: 7,
            phosphorus: 2,
            potassium: 4,
            magnesium: 2,
            sulfur: 2,
            calcium: 3,
            boron: 4,
            copper: 1,
            pH: null,
            enteredBy: 'Chris'
        },
        {
            id: 8,
            date: 'Jul. 24, 2021',
            action: 'Sampled',
            nitrogen: 257,
            phosphorus: 126,
            potassium: 151,
            magnesium: 58,
            sulfur: 62,
            calcium: 81,
            boron: 22,
            copper: 36,
            pH: 7.1,
            enteredBy: 'Chris'
        },
        {
            id: 9,
            date: 'Jul. 21, 2021',
            action: 'Fox Farm Big Bloom added +.5 L',
            nitrogen: 2,
            phosphorus: 5,
            potassium: 3,
            magnesium: 1,
            sulfur: 0,
            calcium: 4,
            boron: 3,
            copper: 1,
            pH: null,
            enteredBy: 'Chris'
        },
        {
            id: 10,
            date: 'Jul. 07, 2021',
            action: 'Fox Farm Grow Big added +.25 L',
            nitrogen: 5,
            phosphorus: 3,
            potassium: 6,
            magnesium: 3,
            sulfur: 2,
            calcium: 0,
            boron: 1,
            copper: 0,
            pH: null,
            enteredBy: 'Chris'
        },
        {
            id: 11,
            date: 'Jun. 15, 2021',
            action: 'No Bull Manure Treatment added +600Kg',
            nitrogen: null,
            phosphorus: null,
            potassium: null,
            magnesium: null,
            sulfur: null,
            calcium: null,
            boron: null,
            copper: null,
            pH: null,
            enteredBy: 'Chris'
        }
    ];

    const chartColors = {
        nitrogen: '#2563eb', // blue
        phosphorus: '#dc2626', // red
        potassium: '#16a34a', // green
        calcium: '#ea580c', // orange
        sulfur: '#7c3aed', // purple
        boron: '#0891b2', // cyan
        magnesium: '#be185d', // pink
        iron: '#059669', // emerald
        pH: '#1f2937' // gray
    };

    const renderChart = (title: string, dataKeys: string[], color: string) => (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                <div className="text-xs text-gray-500 bg-yellow-100 px-2 py-1 rounded">
                    N-P-K MEASUREMENTS
                </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={nutrientData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend />
                    {dataKeys.map((key, index) => (
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={Array.isArray(color) ? color[index] : color}
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

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
                        Add Nutrients
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                        Record Sample
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 p-2">
                        <i className="fas fa-print"></i>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 p-2">
                        <i className="fas fa-th"></i>
                    </button>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {renderChart(
                    'N-P-K MEASUREMENTS',
                    ['nitrogen', 'phosphorus', 'potassium'],
                    chartColors.nitrogen // Use a single color for the chart
                )}
                {renderChart(
                    'OTHER NUTRIENTS SAMPLE',
                    ['calcium', 'sulfur', 'boron', 'magnesium'],
                    chartColors.calcium // Use a single color for the chart
                )}
                {renderChart(
                    'PH MEASUREMENTS',
                    ['pH'],
                    chartColors.pH
                )}
            </div>

            {/* Data Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-yellow-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Action
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    N
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    P
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    K
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Mg
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    S
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Ca
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    B
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Cu
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    PH
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Entered By
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {nutrientRecords.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {record.date}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900 max-w-xs">
                                        {record.action.includes('Sampled') ? (
                                            <span className="text-blue-600 cursor-pointer hover:underline">
                                                {record.action} ▲
                                            </span>
                                        ) : (
                                            record.action
                                        )}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.nitrogen || '-'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.phosphorus || '-'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.potassium || '-'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.magnesium || '-'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.sulfur || '-'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.calcium || '-'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.boron || '-'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.copper || '-'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-center">
                                        {record.pH || '-'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {record.enteredBy}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                📝
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                ✗
                                            </button>
                                        </div>
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