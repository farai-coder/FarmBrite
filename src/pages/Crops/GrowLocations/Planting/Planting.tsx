import React, { useState } from 'react';

export const GrowLocationPlantings = () => {
    const [activeTab, setActiveTab] = useState('2022 Planting Year');
    const [expandedBeds, setExpandedBeds] = useState(new Set());
    const [expandedPlantings, setExpandedPlantings] = useState(new Set());

    // Sample planting data
    const plantingData = {
        'Bed: 01': {
            bedNumber: '801',
            status: 'debt free',
            statusColor: 'text-red-600',
            plantings: [
                {
                    id: 1,
                    crop: 'Lettuce, Head, Boston',
                    variety: 'LETTUCE/VARIETY | Bed: 01',
                    type: 'Type',
                    amount: '300.0 sqft',
                    amountColor: 'bg-gray-600',
                    start: 'Start Apr 25, 2022',
                    startDetails: 'Direct Seeded | Seed Seeded',
                    harvest: 'Expected Jun 11, 2022',
                    harvestDetails: '9 of 300 harvested',
                    harvestExpected: 'Expected Aug 21, 2022',
                    harvestExpectedDetails: '5 of 300 harvested',
                    detailedInfo: {
                        variety: 'LETTUCE/VARIETY',
                        bedLocation: 'Bed: 01',
                        plantingMethod: 'Direct Seeded',
                        seedType: 'Seed Seeded',
                        plantingDate: 'Apr 25, 2022',
                        expectedHarvestDate: 'Jun 11, 2022',
                        actualHarvestDate: 'Aug 21, 2022',
                        totalPlanted: 300,
                        harvested: 9,
                        harvestedSecond: 5,
                        status: 'Active'
                    }
                },
                {
                    id: 2,
                    crop: 'Lettuce, Head, Boston',
                    variety: 'LETTUCE/VARIETY | Bed: 02',
                    type: 'Type',
                    amount: '300.0 sqft',
                    amountColor: 'bg-gray-600',
                    start: 'Start Jun 13, 2022',
                    startDetails: 'Direct Seeded',
                    harvest: '',
                    harvestDetails: '',
                    harvestExpected: '',
                    harvestExpectedDetails: '',
                    detailedInfo: {
                        variety: 'LETTUCE/VARIETY',
                        bedLocation: 'Bed: 02',
                        plantingMethod: 'Direct Seeded',
                        seedType: 'Direct Seeded',
                        plantingDate: 'Jun 13, 2022',
                        expectedHarvestDate: 'Aug 01, 2022',
                        actualHarvestDate: '',
                        totalPlanted: 300,
                        harvested: 0,
                        harvestedSecond: 0,
                        status: 'Growing'
                    }
                }
            ]
        },
        'Bed: 02': {
            bedNumber: '802',
            status: 'debt free',
            statusColor: 'text-red-600',
            plantings: []
        },
        'Bed: 03': {
            bedNumber: '803',
            status: 'debt free',
            statusColor: 'text-red-600',
            plantings: []
        },
        'Bed: 04': {
            bedNumber: '804',
            status: 'debt free',
            statusColor: 'text-red-600',
            plantings: []
        },
        'Bed: 05': {
            bedNumber: '805',
            status: '33 sqft free',
            statusColor: 'text-gray-600',
            plantings: []
        }
    };

    const toggleBedExpansion = (bedKey: string) => {
        const newExpanded = new Set(expandedBeds);
        if (newExpanded.has(bedKey)) {
            newExpanded.delete(bedKey);
        } else {
            newExpanded.add(bedKey);
        }
        setExpandedBeds(newExpanded);
    };

    const togglePlantingExpansion = (plantingId: string) => {
        const newExpanded = new Set(expandedPlantings);
        if (newExpanded.has(plantingId)) {
            newExpanded.delete(plantingId);
        } else {
            newExpanded.add(plantingId);
        }
        setExpandedPlantings(newExpanded);
    };

    const renderBedIcons = (bedKey: 'Bed: 01' | 'Bed: 02' | 'Bed: 03' | 'Bed: 04' | 'Bed: 05') => {
        // Sample icons based on the bed
        const iconSets: Record<string, string[]> = {
            'Bed: 01': ['🌿', '🌿'],
            'Bed: 02': ['🌿', '⚪'],
            'Bed: 03': ['🌿', '🌿', '🌿', '⚪'],
            'Bed: 04': ['⚪', '🔶'],
            'Bed: 05': ['🔴']
        };

        return iconSets[bedKey] || [];
    };

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
                        New Planting
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                        Add Beds
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 p-2">
                        <i className="fas fa-th"></i>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                    {['2022 Planting Year', 'Future Plantings', 'Currently Planted', 'Harvested'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab
                                    ? 'border-green-500 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Beds List */}
            <div className="space-y-4">
                {Object.entries(plantingData).map(([bedKey, bedData]) => (
                    <div key={bedKey} className="bg-white border border-gray-200 rounded-lg">
                        {/* Bed Header */}
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleBedExpansion(bedKey)}>
                            <div className="flex items-center space-x-4">
                                <button className="text-gray-400">
                                    <i className={`fas ${expandedBeds.has(bedKey) ? 'fa-chevron-down' : 'fa-chevron-right'}`}></i>
                                </button>
                                <div>
                                    <h3 className="font-medium text-gray-900">{bedKey}</h3>
                                    <p className="text-sm text-gray-500">{bedData.bedNumber}</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                    {renderBedIcons(bedKey as 'Bed: 01' | 'Bed: 02' | 'Bed: 03' | 'Bed: 04' | 'Bed: 05').map((icon, index) => (
                                        <span key={index} className="text-sm">{icon}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className={`text-sm ${bedData.statusColor}`}>
                                    <i className="fas fa-exclamation-triangle mr-1"></i>
                                    {bedData.status}
                                </span>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                            </div>
                        </div>

                        {/* Expanded Bed Content */}
                        {expandedBeds.has(bedKey) && bedData.plantings.length > 0 && (
                            <div className="border-t border-gray-200">
                                <div className="p-4">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <th className="pb-3">Type</th>
                                                <th className="pb-3">Amount</th>
                                                <th className="pb-3">Start</th>
                                                <th className="pb-3">Harvest</th>
                                                <th className="pb-3"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="space-y-4">
                                            {bedData.plantings.map((planting) => (
                                                <React.Fragment key={planting.id}>
                                                    <tr className="border-t border-gray-100 hover:bg-gray-50">
                                                        <td className="py-3">
                                                            <div className="flex items-center">
                                                                <button
                                                                    onClick={() => togglePlantingExpansion(String(planting.id))}
                                                                    className="mr-2 text-gray-400 hover:text-gray-600"
                                                                >
                                                                    <i className={`fas ${expandedPlantings.has(planting.id) ? 'fa-chevron-down' : 'fa-chevron-right'} text-xs`}></i>
                                                                </button>
                                                                <div className="w-6 h-6 bg-green-500 rounded-full mr-3 flex items-center justify-center">
                                                                    <span className="text-white text-xs">🌿</span>
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-gray-900">{planting.crop}</p>
                                                                    <p className="text-sm text-gray-500">{planting.variety}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3">
                                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${planting.amountColor}`}>
                                                                {planting.amount}
                                                            </span>
                                                        </td>
                                                        <td className="py-3">
                                                            <div>
                                                                <p className="text-sm text-gray-900">{planting.start}</p>
                                                                <p className="text-xs text-gray-500">{planting.startDetails}</p>
                                                            </div>
                                                        </td>
                                                        <td className="py-3">
                                                            <div className="space-y-1">
                                                                {planting.harvest && (
                                                                    <div>
                                                                        <p className="text-sm text-gray-900">{planting.harvest}</p>
                                                                        <p className="text-xs text-gray-500">{planting.harvestDetails}</p>
                                                                    </div>
                                                                )}
                                                                {planting.harvestExpected && (
                                                                    <div>
                                                                        <p className="text-sm text-gray-900">{planting.harvestExpected}</p>
                                                                        <p className="text-xs text-gray-500">{planting.harvestExpectedDetails}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="py-3">
                                                            <button className="text-gray-400 hover:text-gray-600">
                                                                <i className="fas fa-ellipsis-v"></i>
                                                            </button>
                                                        </td>
                                                    </tr>

                                                    {/* Expanded Planting Details */}
                                                    {expandedPlantings.has(planting.id) && (
                                                        <tr className="bg-gray-50">
                                                            <td colSpan={5} className="px-6 py-4">
                                                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                                    <div className="flex items-center mb-4">
                                                                        <div className="w-8 h-8 bg-green-500 rounded-full mr-3 flex items-center justify-center">
                                                                            <span className="text-white text-sm">🌿</span>
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="font-medium text-gray-900">{planting.crop}</h4>
                                                                            <p className="text-sm text-gray-500">{planting.detailedInfo.variety} | {planting.detailedInfo.bedLocation}</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-4 gap-6">
                                                                        <div>
                                                                            <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Type</h5>
                                                                            <p className="text-sm text-gray-900">{planting.detailedInfo.variety}</p>
                                                                            <p className="text-xs text-gray-500">{planting.detailedInfo.bedLocation}</p>
                                                                        </div>

                                                                        <div>
                                                                            <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Amount</h5>
                                                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${planting.amountColor}`}>
                                                                                {planting.amount}
                                                                            </span>
                                                                        </div>

                                                                        <div>
                                                                            <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Start</h5>
                                                                            <p className="text-sm text-gray-900">{planting.detailedInfo.plantingDate}</p>
                                                                            <p className="text-xs text-gray-500">{planting.detailedInfo.plantingMethod} | {planting.detailedInfo.seedType}</p>
                                                                        </div>

                                                                        <div>
                                                                            <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Harvest</h5>
                                                                            {planting.detailedInfo.expectedHarvestDate && (
                                                                                <div className="mb-2">
                                                                                    <p className="text-sm text-gray-900">Expected {planting.detailedInfo.expectedHarvestDate}</p>
                                                                                    <p className="text-xs text-gray-500">{planting.detailedInfo.harvested} of {planting.detailedInfo.totalPlanted} harvested</p>
                                                                                </div>
                                                                            )}
                                                                            {planting.detailedInfo.actualHarvestDate && (
                                                                                <div>
                                                                                    <p className="text-sm text-gray-900">Expected {planting.detailedInfo.actualHarvestDate}</p>
                                                                                    <p className="text-xs text-gray-500">{planting.detailedInfo.harvestedSecond} of {planting.detailedInfo.totalPlanted} harvested</p>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                                                        <button className="text-gray-400 hover:text-gray-600">
                                                                            <i className="fas fa-ellipsis-h"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Add Planting Button */}
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <button className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium">
                                            <i className="fas fa-plus mr-2"></i>
                                            Add Planting to Bed
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Empty Bed Message */}
                        {expandedBeds.has(bedKey) && bedData.plantings.length === 0 && (
                            <div className="border-t border-gray-200 p-4">
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">No plantings in this bed yet</p>
                                    <button className="flex items-center justify-center mx-auto text-green-600 hover:text-green-700 text-sm font-medium">
                                        <i className="fas fa-plus mr-2"></i>
                                        Add Planting to Bed
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
