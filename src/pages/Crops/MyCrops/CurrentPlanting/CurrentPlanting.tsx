import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Edit, Plus, Trash2, MoreHorizontal, ChevronDown } from 'lucide-react';

export const MyCurrentPlantings = () => {
    const [showDetailedView, setShowDetailedView] = useState(false);

    // Sample data for expected pounds per week chart
    const expectedPoundsData = [
        { date: 'Feb 18, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Mar 04, 2022', northwest: 310, northwestB: 0, northwestC: 0 },
        { date: 'Mar 18, 2022', northwest: 0, northwestB: 320, northwestC: 0 },
        { date: 'Apr 01, 2022', northwest: 0, northwestB: 0, northwestC: 410 },
        { date: 'Apr 15, 2022', northwest: 0, northwestB: 470, northwestC: 0 },
        { date: 'Apr 29, 2022', northwest: 510, northwestB: 0, northwestC: 0 },
        { date: 'May 13, 2022', northwest: 0, northwestB: 580, northwestC: 0 },
        { date: 'May 27, 2022', northwest: 640, northwestB: 0, northwestC: 0 },
        { date: 'Jun 10, 2022', northwest: 0, northwestB: 620, northwestC: 0 },
        { date: 'Jun 24, 2022', northwest: 0, northwestB: 0, northwestC: 680 },
        { date: 'Jul 08, 2022', northwest: 0, northwestB: 0, northwestC: 740 },
        { date: 'Jul 22, 2022', northwest: 820, northwestB: 0, northwestC: 0 },
        { date: 'Aug 05, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Aug 19, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Sep 02, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Sep 16, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Sep 30, 2022', northwest: 0, northwestB: 0, northwestC: 0 },
        { date: 'Oct 14, 2022', northwest: 0, northwestB: 0, northwestC: 0 }
    ];

    // Sample plantings data
    const plantingsData = [
        {
            id: 1,
            location: 'Northwest Field A',
            totalPlanted: '266.67 sqft',
            plantedDate: 'Last Plant',
            harvestStatus: '222 of 1,200 Harvested',
            financialInfo: '$584.00 of $2,840.00 Planned',
            expectedDate: 'Expected Sep. 17, 2022',
            plantingDetails: '$364.00 of $1,840.00 Planned',
            progressPercentage: 85,
            expanded: false
        },
        {
            id: 2,
            location: 'Northwest Field B',
            totalPlanted: '266.67 sqft',
            plantedDate: 'Last Plant',
            harvestStatus: '',
            financialInfo: '',
            expectedDate: 'Expected Sep. 17, 2022',
            plantingDetails: '$800.00 Planned',
            progressPercentage: 65,
            expanded: false
        },
        {
            id: 3,
            location: 'Northwest Field C',
            totalPlanted: '266.67 sqft',
            plantedDate: 'Last Plant',
            harvestStatus: '',
            financialInfo: '',
            expectedDate: 'Expected Sep. 20, 2022',
            plantingDetails: '$ of 400 Harvested\n$800.00 Planned',
            progressPercentage: 45,
            expanded: false
        }
    ];

    const [plantings, setPlantings] = useState(plantingsData);

    const togglePlantingExpanded = (id) => {
        setPlantings(plantings.map(p =>
            p.id === id ? { ...p, expanded: !p.expanded } : p
        ));
    };

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

                {!showDetailedView ? (
                    <>
                        {/* Chart View */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-1">3 Locations Planted</h2>
                            <p className="text-sm text-gray-600 mb-4">Planned Jan. 01, 2022 - Jan. 12, 2022</p>
                            <p className="text-sm text-gray-600 mb-6">EXPECTED POUNDS PER WEEK</p>
                        </div>

                        {/* Chart */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={expectedPoundsData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="date"
                                            tick={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            domain={[0, 900]}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="northwest"
                                            stroke="#10b981"
                                            strokeWidth={2}
                                            dot={{ r: 3 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="northwestB"
                                            stroke="#3b82f6"
                                            strokeWidth={2}
                                            dot={{ r: 3 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="northwestC"
                                            stroke="#84cc16"
                                            strokeWidth={2}
                                            dot={{ r: 3 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex items-center space-x-4 mt-4 text-xs">
                                <div className="flex items-center space-x-1">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span>Northwest Field A</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span>Northwest Field B</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
                                    <span>Northwest Field C</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => setShowDetailedView(true)}
                                className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                View Detailed Plantings
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Back Button */}
                        <div className="mb-4">
                            <button
                                onClick={() => setShowDetailedView(false)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                ← Back to Chart View
                            </button>
                        </div>

                        {/* Detailed Plantings View */}
                        <div className="mb-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                                <div className="h-32">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={expectedPoundsData.slice(0, 10)}>
                                            <XAxis
                                                dataKey="date"
                                                tick={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                domain={[0, 700]}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 10 }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="northwest"
                                                stroke="#10b981"
                                                strokeWidth={2}
                                                dot={{ r: 2 }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="northwestB"
                                                stroke="#3b82f6"
                                                strokeWidth={2}
                                                dot={{ r: 2 }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="northwestC"
                                                stroke="#84cc16"
                                                strokeWidth={2}
                                                dot={{ r: 2 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Summary Stats */}
                            <div className="bg-gray-100 rounded-lg p-4 mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-sm text-gray-600">222 of 1,200 Harvested</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-gray-800">800.01 sqft</div>
                                        <div className="text-sm text-gray-600">TOTAL PLANTED</div>
                                        <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs">Last Plant</div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600 mt-2">
                                    $584.00 of $2,840.00 Planned
                                </div>
                            </div>

                            {/* Plantings List */}
                            <div className="space-y-4">
                                {plantings.map((planting) => (
                                    <div key={planting.id} className="bg-yellow-200 rounded-lg border border-gray-300">
                                        <div
                                            className="p-4 cursor-pointer flex items-center justify-between"
                                            onClick={() => togglePlantingExpanded(planting.id)}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <ChevronDown
                                                    size={16}
                                                    className={`transform transition-transform ${planting.expanded ? 'rotate-180' : ''}`}
                                                />
                                                <span className="font-medium text-gray-800">{planting.location}</span>
                                                <div className="w-3 h-3 bg-black rounded-full"></div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="text-sm text-gray-600">
                                                    TOTAL PLANTED<br />
                                                    <span className="font-semibold">{planting.totalPlanted}</span><br />
                                                    <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs">{planting.plantedDate}</span>
                                                </div>
                                                <div className="text-right text-sm">
                                                    <div className="text-blue-600 font-medium">{planting.expectedDate}</div>
                                                    <div className="text-gray-600">{planting.plantingDetails}</div>
                                                </div>
                                                <button className="text-gray-400 hover:text-gray-600 p-1">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        {planting.expanded && (
                                            <div className="px-4 pb-4 border-t border-gray-300 pt-4">
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-gray-600">Harvest Status:</p>
                                                        <p className="font-medium">{planting.harvestStatus || 'Not started'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-600">Financial Info:</p>
                                                        <p className="font-medium">{planting.financialInfo || 'No data'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};