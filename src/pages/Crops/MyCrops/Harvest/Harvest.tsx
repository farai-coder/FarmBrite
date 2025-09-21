import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Edit, Plus, Trash2 } from 'lucide-react';

export const MyCropsHarvests = () => {

    // Sample data for harvest charts
    const harvestData = [
        { date: '2021-06-01', pounds: 15 },
        { date: '2021-06-15', pounds: 20 },
        { date: '2021-07-01', pounds: 25 },
        { date: '2021-07-15', pounds: 30 },
        { date: '2021-08-01', pounds: 28 },
        { date: '2021-08-15', pounds: 32 },
        { date: '2021-09-01', pounds: 35 },
        { date: '2021-09-15', pounds: 30 },
        { date: '2021-10-01', pounds: 25 },
        { date: '2021-10-15', pounds: 20 },
        { date: '2021-11-01', pounds: 15 },
        { date: '2021-11-15', pounds: 10 },
        { date: '2021-12-01', pounds: 5 },
        { date: '2021-12-15', pounds: 8 },
        { date: '2022-01-01', pounds: 12 }
    ];

    const weeklyYieldData = [
        { week: 'Week 1', northwest: 5 },
        { week: 'Week 2', northwest: 8 },
        { week: 'Week 3', northwest: 12 },
        { week: 'Week 4', northwest: 15 },
        { week: 'Week 5', northwest: 18 },
        { week: 'Week 6', northwest: 22 },
        { week: 'Week 7', northwest: 25 },
        { week: 'Week 8', northwest: 28 },
        { week: 'Week 9', northwest: 30 },
        { week: 'Week 10', northwest: 35 },
        { week: 'Week 11', northwest: 32 },
        { week: 'Week 12', northwest: 28 }
    ];

    // Sample table data for harvest records
    const harvestRecords = [
        {
            date: 'Jan. 07, 2022',
            harvested: '25.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$50.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEPPER-PH-NW01'
        },
        {
            date: 'Jan. 05, 2022',
            harvested: '13.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$39.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEPPER-PH-NW01'
        },
        {
            date: 'Jan. 01, 2022',
            harvested: '16.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$32.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEPPER-PH-NW01'
        },
        {
            date: 'Dec. 22, 2021',
            harvested: '20.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$60.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Dec. 15, 2021',
            harvested: '27.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$54.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Dec. 01, 2021',
            harvested: '30.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$60.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Nov. 18, 2021',
            harvested: '25.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$50.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Nov. 05, 2021',
            harvested: '32.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$64.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Sep. 30, 2021',
            harvested: '19.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$38.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Sep. 21, 2021',
            harvested: '23.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$46.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        },
        {
            date: 'Sep. 13, 2021',
            harvested: '40.00',
            harvestedFrom: 'Northwest Field A',
            estValue: '$120.00',
            addedToInventory: 'Add to Inventory',
            enteredBy: 'Chris',
            traceNumber: 'PEP-PEPTH-PH-NW1'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            🌶️
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">Peppers (Hot), Thai Dragon</h1>
                            <p className="text-sm text-gray-600">Capsicum annuum, Hot</p>
                            <span className="inline-block bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs">PERTH</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="text-gray-600 hover:text-gray-800 px-3 py-1 text-sm">Edit Plant</button>
                        <button className="text-gray-600 hover:text-gray-800 px-3 py-1 text-sm">New Planting</button>
                        <button className="text-green-600 hover:text-green-800 px-3 py-1 text-sm">New Harvest</button>
                        <button className="text-red-600 hover:text-red-800 p-1">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-1">Harvest History</h2>
                <p className="text-sm text-gray-600 mb-6">Jan. 01, 2017 - Jan. 12, 2022</p>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Harvests Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="bg-yellow-300 text-black px-3 py-1 rounded text-sm font-medium mb-4 inline-block">
                            HARVESTS
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={harvestData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="date"
                                        tick={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        domain={[0, 40]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="pounds"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        dot={{ r: 3 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center space-x-1 mt-2 text-xs">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>NORTHWEST FIELD</span>
                        </div>
                    </div>

                    {/* Weekly Yield by Location Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="bg-yellow-300 text-black px-3 py-1 rounded text-sm font-medium mb-4 inline-block">
                            WEEKLY YIELD BY LOCATION
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weeklyYieldData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="week"
                                        tick={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        domain={[0, 40]}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Bar
                                        dataKey="northwest"
                                        fill="#10b981"
                                        radius={[2, 2, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex items-center space-x-1 mt-2 text-xs">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>NORTHWEST FIELD</span>
                        </div>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-800">274</div>
                        <div className="text-sm text-gray-600">Harvested</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-800">11</div>
                        <div className="text-sm text-gray-600">Harvested From</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-800">$713</div>
                        <div className="text-sm text-gray-600">Est. Value</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-800">11</div>
                        <div className="text-sm text-gray-600">Added To Inventory</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-800">0</div>
                        <div className="text-sm text-gray-600">Loss</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-800">1</div>
                        <div className="text-sm text-gray-600">Entered By Total Numbers</div>
                    </div>
                </div>

                {/* Harvest Records Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harvested</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harvested From</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Value</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added To Inventory</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loss</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entered By</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trace Number</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {harvestRecords.map((record, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-900">{record.date}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{record.harvested}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{record.harvestedFrom}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{record.estValue}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                                {record.addedToInventory}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-900">-</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{record.enteredBy}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                                {record.traceNumber}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex items-center space-x-1">
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
                </div>
            </div>
        </div>
    );
};
