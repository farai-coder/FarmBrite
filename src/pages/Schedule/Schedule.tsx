import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const SchedulePage = () => {
    const localizer = momentLocalizer(moment);
    const [currentView, setCurrentView] = useState(Views.MONTH);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [activeTab, setActiveTab] = useState('calendar');

    // Sample events data
    const events = [
        {
            id: 1,
            title: 'Farmers Market - Downtown',
            start: new Date(2023, 8, 15, 8, 0),
            end: new Date(2023, 8, 15, 14, 0),
            type: 'event',
            assignedTo: 'Sarah Johnson',
            status: 'confirmed',
            location: 'Downtown Market',
            description: 'Sell produce at the weekly farmers market',
            associatedResources: ['Northwest Field A', 'Farm Stand'],
        },
        {
            id: 2,
            title: 'Vet Visit - Cattle Herd',
            start: new Date(2023, 8, 18, 10, 0),
            end: new Date(2023, 8, 18, 12, 0),
            type: 'event',
            assignedTo: 'Dr. Miller',
            status: 'scheduled',
            location: 'North Pasture',
            description: 'Annual checkup and vaccinations for cattle herd',
            associatedResources: ['Cattle Herd B'],
        },
        {
            id: 3,
            title: 'Harvest Tomatoes',
            start: new Date(2023, 8, 20, 9, 0),
            end: new Date(2023, 8, 20, 12, 0),
            type: 'task',
            assignedTo: 'Farm Team A',
            status: 'pending',
            location: 'Greenhouse 2',
            description: 'Harvest ripe tomatoes and prepare for distribution',
            associatedResources: ['Greenhouse 2', 'Tomato Plants'],
            priority: 'high',
        },
        {
            id: 4,
            title: 'Weekly Team Meeting',
            start: new Date(2023, 8, 22, 9, 0),
            end: new Date(2023, 8, 22, 10, 0),
            type: 'event',
            assignedTo: 'All Staff',
            status: 'confirmed',
            location: 'Main Office',
            description: 'Weekly operations meeting',
            recurrence: 'weekly',
        },
    ];

    // Sample tasks data
    const tasks = [
        {
            id: 101,
            title: 'Irrigation System Check',
            dueDate: new Date(2023, 8, 16),
            assignedTo: 'Michael Chen',
            status: 'in-progress',
            priority: 'medium',
            estimatedHours: 2,
            actualHours: null,
            description: 'Check all irrigation lines for leaks and proper function',
            associatedResources: ['North Field Irrigation'],
        },
        {
            id: 102,
            title: 'Plant Winter Cover Crop',
            dueDate: new Date(2023, 8, 25),
            assignedTo: 'Farm Team B',
            status: 'pending',
            priority: 'high',
            estimatedHours: 6,
            actualHours: null,
            description: 'Plant winter rye in prepared fields',
            associatedResources: ['Northwest Field A', 'East Field'],
        },
    ];

    const EventModal = ({ event, onClose }) => {
        if (!event) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">{event.title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                    </div>
                    <div className="space-y-3">
                        <p><span className="font-medium">Type:</span> {event.type}</p>
                        <p><span className="font-medium">When:</span> {moment(event.start).format('MMMM D, YYYY h:mm A')} - {moment(event.end).format('h:mm A')}</p>
                        <p><span className="font-medium">Assigned to:</span> {event.assignedTo}</p>
                        <p><span className="font-medium">Location:</span> {event.location}</p>
                        <p><span className="font-medium">Description:</span> {event.description}</p>
                        {event.associatedResources && (
                            <p><span className="font-medium">Resources:</span> {event.associatedResources.join(', ')}</p>
                        )}
                        {event.recurrence && (
                            <p><span className="font-medium">Repeats:</span> {event.recurrence}</p>
                        )}
                    </div>
                    <div className="mt-6 flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-gray-200 rounded-md">Edit</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Log Time</button>
                    </div>
                </div>
            </div>
        );
    };

    const TaskCard = ({ task }) => (
        <div className="bg-white border rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-600">Due: {moment(task.dueDate).format('MMM D, YYYY')}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                    {task.status}
                </span>
            </div>
            <div className="mt-2 text-sm">
                <p>Assigned to: {task.assignedTo}</p>
                <p>Priority: <span className={
                    task.priority === 'high' ? 'text-red-600' :
                        task.priority === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                }>{task.priority}</span></p>
            </div>
            <div className="mt-3 flex justify-between items-center">
                <button className="text-blue-600 text-sm hover:underline">View Details</button>
                <button className="px-3 py-1 bg-gray-100 rounded-md text-sm">Log Time</button>
            </div>
        </div>
    );

    // Custom component to highlight today's date with blueish color
    const CustomDay = ({ date, ...props }) => {
        const isToday = moment(date).isSame(moment(), 'day');
        return (
            <div
                {...props}
                style={isToday ? {
                    backgroundColor: '#e0f2fe',
                    borderRadius: '4px',
                    ...props.style
                } : props.style}
            />
        );
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Schedule</h1>
                <p className="text-gray-600">Manage your farm schedule and activities</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
                <div className="border-b">
                    <div className="flex justify-between items-center p-4">
                        <div className="flex space-x-2">
                            <button
                                className={`px-4 py-2 rounded-md ${activeTab === 'calendar' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('calendar')}
                            >
                                Calendar
                            </button>
                         
                            <button
                                className={`px-4 py-2 rounded-md ${activeTab === 'timesheets' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('timesheets')}
                            >
                                Timesheets
                            </button>
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                                New Event
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50">
                                New Task
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    {activeTab === 'calendar' && (
                        <div className="h-96">
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                views={['month', 'week', 'day']}
                                view={currentView}
                                onView={setCurrentView}
                                onSelectEvent={(event) => {
                                    setSelectedEvent(event);
                                    setShowEventModal(true);
                                }}
                                eventPropGetter={(event) => {
                                    let backgroundColor = event.type === 'task' ? '#f59e0b' : '#3b82f6';
                                    if (event.status === 'completed') backgroundColor = '#10b981';
                                    return { style: { backgroundColor } };
                                }}
                                components={{
                                    dayWrapper: CustomDay,
                                }}
                            />
                        </div>
                    )}

                    {activeTab === 'tasks' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h2 className="font-medium text-gray-700 mb-3">To Do</h2>
                                {tasks.filter(t => t.status === 'pending').map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                            <div>
                                <h2 className="font-medium text-gray-700 mb-3">In Progress</h2>
                                {tasks.filter(t => t.status === 'in-progress').map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                            <div>
                                <h2 className="font-medium text-gray-700 mb-3">Completed</h2>
                                {tasks.filter(t => t.status === 'completed').map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'timesheets' && (
                        <div className="p-4">
                            <h2 className="text-lg font-medium mb-4">Time Tracking</h2>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="text-gray-600">No timesheets pending approval</p>
                            </div>
                            <div className="mt-6">
                                <h3 className="font-medium mb-3">Recent Time Entries</h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Person</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Sep 14, 2023</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">Harvest Tomatoes</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">Sarah Johnson</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">3.5</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Approved</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Sep 13, 2023</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">Irrigation Repair</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">Michael Chen</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">2.0</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Approved</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showEventModal && (
                <EventModal
                    event={selectedEvent}
                    onClose={() => {
                        setShowEventModal(false);
                        setSelectedEvent(null);
                    }}
                />
            )}
        </div>
    );
};