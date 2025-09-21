import React, { useState } from 'react';
import { Plus, List, LayoutGrid, Search, ChevronDown, X, Circle, User, Calendar } from 'lucide-react';

export const Tasks = () => {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'board'
    const [selectedUser, setSelectedUser] = useState('All Users');
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    // Mock tasks data
    const tasks = [
        {
            id: 1,
            title: "Plant Basil - Brazilian in Carrot bed Field",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "Feb. 12, 2021",
            category: "planting"
        },
        {
            id: 2,
            title: "Start seeds for Basil - Brazilian from Carrot bed field",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "Feb. 12, 2021",
            category: "seeding"
        },
        {
            id: 3,
            title: "Plant Arugula Green in Test field",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "Feb. 20, 2021",
            category: "planting"
        },
        {
            id: 4,
            title: "Start seeds for Arugula, Green from Test Field",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "Feb. 20, 2021",
            category: "seeding"
        },
        {
            id: 5,
            title: "Crop location A, seeds",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "Mar. 08, 2021",
            category: "seeding"
        },
        {
            id: 6,
            title: "Crop field",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "Mar. 09, 2021",
            category: "field"
        },
        {
            id: 7,
            title: "Weekly to-do List",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "Mar. 10, 2021",
            category: "planning"
        },
        {
            id: 8,
            title: "Start seeds for Hemp, Rainbow from Hemp Field",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "Mar. 16, 2021",
            category: "seeding"
        },
        {
            id: 9,
            title: "Harvest Corn, Asdif from Black not location",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "Apr. 15",
            category: "harvest"
        },
        {
            id: 10,
            title: "Start seeds for Basil - Chicago from Northwest planting field",
            assignee: "Chris Doe (creator)",
            status: "In Progress",
            due: "Apr. 16",
            category: "seeding"
        },
        {
            id: 11,
            title: "Plant Corn in New field sorround",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "Apr. 20",
            category: "planting"
        },
        {
            id: 12,
            title: "Plant Broccoli, Calabrese in SS new field",
            assignee: "Chris Doe (creator)",
            status: "In Progress",
            due: "Apr. 22",
            category: "planting"
        },
        {
            id: 13,
            title: "Start seeds for Corn from New Field location",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "Apr. 25",
            category: "seeding"
        },
        {
            id: 14,
            title: "Start seeds for Hemp, Cloudberry from Hemp pleasant T field",
            assignee: "Chris Doe (creator)",
            status: "In Progress",
            due: "Apr. 28",
            category: "seeding"
        },
        {
            id: 15,
            title: "Start Cocoa, Trinidad in Cocoa orchard location",
            assignee: "Chris Doe (creator)",
            status: "In Progress",
            due: "Apr. 30",
            category: "planting"
        },
        {
            id: 16,
            title: "Plant Corn, Asdif to Black x0 location",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "May 02",
            category: "planting"
        },
        {
            id: 17,
            title: "Start seeds for Corn, Asdif from Black x0 field",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "May 05",
            category: "seeding"
        },
        {
            id: 18,
            title: "Plant trees",
            assignee: "Chris Doe (creator)",
            status: "To Do",
            due: "May 10",
            category: "planting"
        }
    ];

    // Group tasks by status for board view
    const groupedTasks = {
        'To Do': tasks.filter(task => task.status === 'To Do'),
        'In Progress': tasks.filter(task => task.status === 'In Progress'),
        'Done': tasks.filter(task => task.status === 'Done')
    };

    const users = ['All Users', 'Chris Doe', 'John Smith', 'Sarah Johnson'];

    const ListView = () => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                <div className="col-span-1"></div>
                <div className="col-span-5">TASK</div>
                <div className="col-span-2">ASSIGNEE</div>
                <div className="col-span-2">STATUS</div>
                <div className="col-span-2">DUE</div>
            </div>

            {/* Task Rows */}
            <div className="divide-y divide-gray-200">
                {tasks.map((task) => (
                    <div key={task.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                        <div className="col-span-1 flex items-center">
                            <Circle className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="col-span-5">
                            <div className="text-sm font-medium text-gray-900">{task.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{task.category}</div>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-600">To Do</span>
                        </div>
                        <div className="col-span-2 flex items-center">
                            <span className="text-sm text-gray-600">{task.status}</span>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <span className="text-sm text-gray-600">{task.due}</span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <button className="text-red-500 hover:text-red-700">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const BoardView = () => (
        <div className="grid grid-cols-3 gap-6">
            {Object.entries(groupedTasks).map(([status, statusTasks]) => (
                <div key={status} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-800 flex items-center">
                            {status.toUpperCase()}
                            <span className="ml-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                                {statusTasks.length}
                            </span>
                        </h3>
                        {status === 'Done' && (
                            <div className="flex items-center text-green-600">
                                <span className="text-sm">ALL COMPLETED</span>
                                <div className="ml-2 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        {statusTasks.map((task) => (
                            <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-800 mb-2">{task.title}</h4>
                                <div className="text-xs text-gray-500 mb-3">{task.category}</div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 bg-gray-300 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-600">{task.assignee.split(' ')[0]}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{task.due}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Tasks: All Users</h1>
                    <div className="flex items-center space-x-3">
                        {/* View Toggle */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-colors duration-200 flex items-center space-x-2 ${viewMode === 'list'
                                        ? 'bg-white text-gray-800 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <List className="w-4 h-4" />
                                <span className="text-sm font-medium">List View</span>
                            </button>
                            <button
                                onClick={() => setViewMode('board')}
                                className={`p-2 rounded-md transition-colors duration-200 flex items-center space-x-2 ${viewMode === 'board'
                                        ? 'bg-white text-gray-800 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                                <span className="text-sm font-medium">Board View</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        {/* New Task Button */}
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
                            <Plus className="w-4 h-4" />
                            <span>New Task</span>
                        </button>

                        {/* Print Button */}
                        <button className="text-gray-600 hover:text-gray-800 p-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zM5 14H4v-3h1v3zm1 0v2h8v-2H6z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* User Filter */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserDropdown(!showUserDropdown)}
                                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <span>{selectedUser}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {showUserDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                                    <div className="py-1">
                                        {users.map((user) => (
                                            <button
                                                key={user}
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setShowUserDropdown(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                {user}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Filter Button */}
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                            Filter
                        </button>

                        {/* Search */}
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <Search className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder=""
                                className="pr-10 pl-4 py-2 w-64 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                {viewMode === 'list' ? <ListView /> : <BoardView />}
            </div>
        </div>
    );
};
