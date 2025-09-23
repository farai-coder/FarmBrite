import React, { useState } from 'react'; 
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'; 
import moment from 'moment'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import { X, Plus, Paperclip, Search, Edit, Trash2, Clock, User } from 'lucide-react'; 

export const SchedulePage = () => { 
  const localizer = momentLocalizer(moment); 
  const [currentView, setCurrentView] = useState(Views.MONTH); 
  const [activeTab, setActiveTab] = useState('calendar'); 
  const [showDropdown, setShowDropdown] = useState(false); 
  const [listView, setListView] = useState(false); 
  const [showModal, setShowModal] = useState(false); 
  const [modalType, setModalType] = useState(''); // 'event' or 'task'
  const [showEventDetailModal, setShowEventDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Form state with all the fields from the image 
  const [formData, setFormData] = useState({ 
    title: '', 
    assignedTo: 'Gift', 
    startDate: '', 
    startTime: '4 AM', 
    startMinute: '00', 
    allDay: false, 
    endDate: '', 
    endTime: '5 AM', 
    endMinute: '00', 
    description: '', 
    invitedUsers: [], 
    repeats: 'Does not repeat', 
    associatedTo: '', 
    color: '#6B7280', // Default gray color 
    attachments: [] 
  }); 

  // Color palette from the image 
  const colorOptions = [ 
    '#6B7280', // Gray 
    '#EF4444', // Red 
    '#EC4899', // Pink 
    '#8B5CF6', // Purple 
    '#3B82F6', // Blue 
    '#06B6D4', // Cyan 
    '#10B981', // Emerald 
    '#84CC16', // Lime 
    '#EAB308', // Yellow 
    '#F59E0B', // Amber 
    '#F97316', // Orange 
    '#DC2626', // Red-600 
    '#7C2D12', // Brown 
    '#475569' // Slate 
  ]; 

  // Time options 
  const timeOptions = Array.from({ length: 24 }, (_, i) => { 
    const hour = i === 0 ? 12 : i > 12 ? i - 12 : i; 
    const period = i < 12 ? 'AM' : 'PM'; 
    return `${hour} ${period}`; 
  }); 

  const minuteOptions = ['00', '15', '30', '45']; 

  // Events state 
  const [events, setEvents] = useState([ 
    { 
      id: 1, 
      title: 'Watering', 
      start: new Date(2025, 8, 23, 3, 0), 
      end: new Date(2025, 8, 23, 4, 0), 
      color: '#10B981', 
      assignedTo: 'Gift', 
      description: '100ml per bed', 
      allDay: false 
    }, 
    { 
      id: 2, 
      title: 'Seeding', 
      start: new Date(2025, 8, 23, 7, 0), 
      end: new Date(2025, 8, 23, 7, 30), 
      color: '#F59E0B', 
      assignedTo: 'Gift', 
      description: '', 
      allDay: false 
    }, 
    { 
      id: 3, 
      title: 'Milking', 
      start: new Date(2025, 8, 23, 13, 0), 
      end: new Date(2025, 8, 23, 15, 0), 
      color: '#3B82F6', 
      assignedTo: 'Gift', 
      description: '', 
      allDay: false 
    }, 
  ]); 

  // Handle opening modal 
  const openModal = (type) => { 
    // Reset form data first 
    const today = moment().format('YYYY-MM-DD'); 
    setFormData({ 
      title: '', 
      assignedTo: 'Gift', 
      startDate: today, 
      startTime: '4 AM', 
      startMinute: '00', 
      allDay: false, 
      endDate: today, 
      endTime: '5 AM', 
      endMinute: '00', 
      description: '', 
      invitedUsers: [], 
      repeats: 'Does not repeat', 
      associatedTo: '', 
      color: '#6B7280', 
      attachments: [] 
    }); 
    // Then set modal type and show modal 
    setModalType(type); 
    setShowModal(true); 
  }; 

  // Handle closing modal 
  const closeModal = () => { 
    setShowModal(false); 
    setModalType(''); 
  }; 

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetailModal(true);
  };

  // Handle closing event detail modal
  const closeEventDetailModal = () => {
    setShowEventDetailModal(false);
    setSelectedEvent(null);
  };

  // Handle delete event
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(prev => prev.filter(event => event.id !== selectedEvent.id));
      closeEventDetailModal();
    }
  };

  // Handle edit event
  const handleEditEvent = () => {
    if (selectedEvent) {
      // Pre-fill form with event data
      const startMoment = moment(selectedEvent.start);
      const endMoment = moment(selectedEvent.end);
      
      setFormData({
        title: selectedEvent.title.replace(` (${selectedEvent.assignedTo})`, ''),
        assignedTo: selectedEvent.assignedTo,
        startDate: startMoment.format('YYYY-MM-DD'),
        startTime: startMoment.format('h A'),
        startMinute: startMoment.format('mm'),
        allDay: selectedEvent.allDay,
        endDate: endMoment.format('YYYY-MM-DD'),
        endTime: endMoment.format('h A'),
        endMinute: endMoment.format('mm'),
        description: selectedEvent.description,
        invitedUsers: [],
        repeats: 'Does not repeat',
        associatedTo: '',
        color: selectedEvent.color,
        attachments: []
      });
      
      setModalType('event');
      setShowModal(true);
      closeEventDetailModal();
    }
  };

  // Handle input changes 
  const handleInputChange = (field, value) => { 
    setFormData(prev => ({ ...prev, [field]: value })); 
  }; 

  // Handle form submission 
  const handleSubmit = () => { 
    if (!formData.title || !formData.startDate || !formData.endDate) { 
      alert('Please fill in all required fields'); 
      return; 
    } 

    // Parse time helper 
    const parseTime = (timeStr, minute) => { 
      const [hour, period] = timeStr.split(' '); 
      let hourNum = parseInt(hour); 
      if (period === 'PM' && hourNum !== 12) hourNum += 12; 
      if (period === 'AM' && hourNum === 12) hourNum = 0; 
      return { hour: hourNum, minute: parseInt(minute) }; 
    }; 

    const startTime = parseTime(formData.startTime, formData.startMinute); 
    const endTime = parseTime(formData.endTime, formData.endMinute); 

    const startDateTime = moment(formData.startDate) 
      .hour(startTime.hour) 
      .minute(startTime.minute) 
      .toDate(); 

    const endDateTime = moment(formData.endDate) 
      .hour(endTime.hour) 
      .minute(endTime.minute) 
      .toDate(); 

    const newEvent = { 
      id: Date.now(), 
      title: `${formData.title} (${formData.assignedTo})`, 
      start: startDateTime, 
      end: endDateTime, 
      color: formData.color, 
      assignedTo: formData.assignedTo, 
      description: formData.description, 
      allDay: formData.allDay 
    }; 

    setEvents(prev => [...prev, newEvent]); 
    closeModal(); 
  }; 

  // Custom event style function 
  const eventStyleGetter = (event) => { 
    return { 
      style: { 
        backgroundColor: event.color, 
        borderColor: event.color, 
        color: 'white' 
      } 
    }; 
  }; 

  // ListView component 
  const ListView = () => ( 
    <div className="space-y-4"> 
      <h2 className="text-lg font-semibold">Schedule List</h2> 
      {events.map(ev => ( 
        <div key={ev.id} className="p-4 border rounded-lg bg-white shadow-sm cursor-pointer" onClick={() => handleEventClick(ev)}>
          <div className="flex items-center space-x-2"> 
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ev.color }} ></div> 
            <h3 className="font-medium">{ev.title}</h3> 
          </div> 
          <p className="text-sm text-gray-600"> 
            {moment(ev.start).format('MMM D, YYYY h:mm A')} -{' '} 
            {moment(ev.end).format('h:mm A')} 
          </p> 
          {ev.description && ( 
            <p className="text-sm text-gray-500 mt-1">{ev.description}</p> 
          )} 
        </div> 
      ))} 
    </div> 
  ); 

  // Event Detail Modal
  const EventDetailModal = () => {
    if (!showEventDetailModal || !selectedEvent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md">
          {/* Header with color tab */}
          <div className="h-2 rounded-t-lg" style={{ backgroundColor: selectedEvent.color }}></div>
          
          <div className="p-6">
            {/* Title and Actions */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{selectedEvent.title}</h2>
              <div className="flex space-x-2">
                <button onClick={handleEditEvent} className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                  <Edit size={16} />
                </button>
                <button onClick={handleDeleteEvent} className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                  <Trash2 size={16} />
                </button>
                <button onClick={closeEventDetailModal} className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Date and Time */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock size={16} />
                <span>
                  {moment(selectedEvent.start).format('MMM D, YYYY h:mm A')} -{' '}
                  {moment(selectedEvent.end).format('h:mm A')}
                </span>
              </div>

              {/* Assigned To */}
              <div className="flex items-center space-x-2 text-gray-600">
                <User size={16} />
                <span>Assigned to: {selectedEvent.assignedTo}</span>
              </div>

              {/* Description */}
              {selectedEvent.description && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">{selectedEvent.description}</p>
                </div>
              )}

              {/* Created/Updated Info */}
              <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                <p>Created Sep. 23, 2025 | Created by {selectedEvent.assignedTo}</p>
                <p>Updated Sep. 23, 2025</p>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button 
                onClick={closeEventDetailModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Modal component - FIXED SCROLLING ISSUE
  const Modal = () => { 
    if (!showModal) return null; 
    return ( 
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[85vh] flex flex-col">
          {/* Header */} 
          <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
            <h2 className="text-xl font-semibold text-gray-800"> 
              New {modalType === 'event' ? 'Event' : 'Task'} 
            </h2> 
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"> 
              <X size={24} /> 
            </button> 
          </div> 
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> 
                {/* Left Column */} 
                <div className="space-y-4"> 
                  {/* Title */} 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-2"> 
                      Title 
                    </label> 
                    <input 
                      type="text" 
                      value={formData.title} 
                      onChange={(e) => handleInputChange('title', e.target.value)} 
                      placeholder={`Example: ${modalType === 'event' ? 'Vet Appointment' : 'Feed Cattle'}`} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    /> 
                  </div> 
                  
                  {/* Starting */} 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-2"> 
                      Starting 
                    </label> 
                    <div className="space-y-2"> 
                      <input 
                        type="date" 
                        value={formData.startDate} 
                        onChange={(e) => handleInputChange('startDate', e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      /> 
                      <div className="flex space-x-2"> 
                        <select 
                          value={formData.startTime} 
                          onChange={(e) => handleInputChange('startTime', e.target.value)} 
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        > 
                          {timeOptions.map(time => ( 
                            <option key={time} value={time}>{time}</option> 
                          ))} 
                        </select> 
                        <select 
                          value={formData.startMinute} 
                          onChange={(e) => handleInputChange('startMinute', e.target.value)} 
                          className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        > 
                          {minuteOptions.map(minute => ( 
                            <option key={minute} value={minute}>{minute}</option> 
                          ))} 
                        </select> 
                      </div> 
                      <div className="flex items-center space-x-2"> 
                        <input 
                          type="checkbox" 
                          id="allDay" 
                          checked={formData.allDay} 
                          onChange={(e) => handleInputChange('allDay', e.target.checked)} 
                          className="rounded border-gray-300" 
                        /> 
                        <label htmlFor="allDay" className="text-sm text-gray-600">All Day</label> 
                      </div> 
                      <p className="text-xs text-blue-500">Mountain Time (US & Canada)</p> 
                    </div> 
                  </div> 
                  
                  {/* Ending */} 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-2"> 
                      Ending 
                    </label> 
                    <div className="space-y-2"> 
                      <input 
                        type="date" 
                        value={formData.endDate} 
                        onChange={(e) => handleInputChange('endDate', e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      /> 
                      <div className="flex space-x-2"> 
                        <select 
                          value={formData.endTime} 
                          onChange={(e) => handleInputChange('endTime', e.target.value)} 
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        > 
                          {timeOptions.map(time => ( 
                            <option key={time} value={time}>{time}</option> 
                          ))} 
                        </select> 
                        <select 
                          value={formData.endMinute} 
                          onChange={(e) => handleInputChange('endMinute', e.target.value)} 
                          className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        > 
                          {minuteOptions.map(minute => ( 
                            <option key={minute} value={minute}>{minute}</option> 
                          ))} 
                        </select> 
                      </div> 
                    </div> 
                  </div> 
                </div> 
                
                {/* Right Column */} 
                <div className="space-y-4"> 
                  {/* Assigned To */} 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-2"> 
                      Assigned To 
                    </label> 
                    <select 
                      value={formData.assignedTo} 
                      onChange={(e) => handleInputChange('assignedTo', e.target.value)} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    > 
                      <option value="Gift">Gift</option> 
                      <option value="John">John</option> 
                      <option value="Mary">Mary</option> 
                      <option value="Peter">Peter</option> 
                    </select> 
                  </div> 
                  
                  {/* Invited Users */} 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-2"> 
                      Invited Users 
                    </label> 
                    <button className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400 hover:bg-gray-50 flex items-center justify-center"> 
                      <Plus size={20} /> 
                    </button> 
                  </div> 
                  
                  {/* Repeats */} 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-2"> 
                      Repeats 
                    </label> 
                    <select 
                      value={formData.repeats} 
                      onChange={(e) => handleInputChange('repeats', e.target.value)} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    > 
                      <option value="Does not repeat">Does not repeat</option> 
                      <option value="Daily">Daily</option> 
                      <option value="Weekly">Weekly</option> 
                      <option value="Monthly">Monthly</option> 
                      <option value="Yearly">Yearly</option> 
                    </select> 
                  </div> 

                  {/* Color */} 
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-2"> 
                      Color 
                    </label> 
                    <div className="flex flex-wrap gap-2"> 
                      {colorOptions.map(color => ( 
                        <button 
                          key={color} 
                          onClick={() => handleInputChange('color', color)} 
                          className={`w-8 h-8 rounded-full border-2 ${ 
                            formData.color === color ? 'border-gray-800' : 'border-gray-200' 
                          }`} 
                          style={{ backgroundColor: color }} 
                        /> 
                      ))} 
                    </div> 
                  </div>
                </div> 
              </div> 
              
              {/* Full Width Sections */}
              <div className="grid grid-cols-1 gap-6">
                {/* Description */} 
                <div> 
                  <label className="block text-sm font-medium text-gray-700 mb-2"> 
                    Description 
                  </label> 
                  <div className="border border-gray-300 rounded-md"> 
                    <div className="border-b border-gray-200 px-3 py-2 bg-gray-50 flex items-center space-x-2"> 
                      <select className="text-sm border-0 bg-transparent"> 
                        <option>Normal</option> 
                      </select> 
                      <div className="flex space-x-1"> 
                        <button className="p-1 hover:bg-gray-200 rounded"> 
                          <strong>B</strong> 
                        </button> 
                        <button className="p-1 hover:bg-gray-200 rounded"> 
                          <em>I</em> 
                        </button> 
                        <button className="p-1 hover:bg-gray-200 rounded"> 
                          <u>U</u> 
                        </button> 
                      </div> 
                    </div> 
                    <textarea 
                      value={formData.description} 
                      onChange={(e) => handleInputChange('description', e.target.value)} 
                      placeholder="Add some details or a description..." 
                      className="w-full px-3 py-2 border-0 rounded-b-md focus:outline-none resize-none" 
                      rows="3" 
                    /> 
                  </div> 
                </div> 

                {/* Associated To */} 
                <div> 
                  <label className="block text-sm font-medium text-gray-700 mb-2"> 
                    Associated To 
                  </label> 
                  <div className="relative"> 
                    <Search size={16} className="absolute left-3 top-3 text-gray-400" /> 
                    <input 
                      type="text" 
                      value={formData.associatedTo} 
                      onChange={(e) => handleInputChange('associatedTo', e.target.value)} 
                      placeholder="Find Animal, Equipment" 
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    /> 
                  </div> 
                </div> 

                {/* Add Attachment */} 
                <div> 
                  <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"> 
                    <Paperclip size={16} /> 
                    <span>Add Attachment</span> 
                  </button> 
                </div> 
              </div>
            </div> 
          </div>

          {/* Footer */} 
          <div className="flex justify-end space-x-3 px-6 py-4 border-t bg-gray-50 flex-shrink-0"> 
            <button onClick={closeModal} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50" > 
              Close 
            </button> 
            <button onClick={handleSubmit} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" > 
              Create 
            </button> 
          </div> 
        </div> 
      </div> 
    ); 
  }; 

  return ( 
    <div className="p-6 bg-gray-50 min-h-screen"> 
      <div className="mb-6 flex justify-between items-center"> 
        <h1 className="text-2xl font-semibold text-gray-800">Schedule</h1> 
      </div> 
      <div className="bg-white rounded-lg shadow-sm border"> 
        <div className="border-b"> 
          <div className="flex justify-between items-center p-4"> 
            {/* Tabs */} 
            <div className="flex space-x-2"> 
              <button className={`px-4 py-2 rounded-md ${activeTab === 'calendar' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setActiveTab('calendar')} > 
                Calendar 
              </button> 
              <button className={`px-4 py-2 rounded-md ${activeTab === 'timesheets' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setActiveTab('timesheets')} > 
                Timesheets 
              </button> 
            </div> 
            {/* Right controls */} 
            <div className="flex space-x-2 relative"> 
              <button onClick={() => openModal('event')} className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700" > 
                Add Event 
              </button> 
              <button onClick={() => openModal('task')} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50" > 
                Add Task 
              </button> 
              {/* Three dots dropdown */} 
              <div className="relative"> 
                <button onClick={() => setShowDropdown(!showDropdown)} className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100" > 
                  ⋮ 
                </button> 
                {showDropdown && ( 
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10"> 
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"> 
                      Add Activity Journal 
                    </button> 
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"> 
                      Download All Records 
                    </button> 
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"> 
                      Publish Calendar 
                    </button> 
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"> 
                      Download Calendar 
                    </button> 
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"> 
                      Print 
                    </button> 
                  </div> 
                )} 
              </div> 
            </div> 
          </div> 
        </div> 
        {/* Calendar + List toggle */} 
        <div className="p-4"> 
          <div className="flex space-x-2 mb-4"> 
            <button onClick={() => { 
              setListView(false); 
              setCurrentView(Views.DAY); 
            }} className={`px-4 py-2 rounded-md ${!listView && currentView === Views.DAY ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`} > 
              Day 
            </button> 
            <button onClick={() => { 
              setListView(false); 
              setCurrentView(Views.WEEK); 
            }} className={`px-4 py-2 rounded-md ${!listView && currentView === Views.WEEK ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`} > 
              Week 
            </button> 
            <button onClick={() => { 
              setListView(false); 
              setCurrentView(Views.MONTH); 
            }} className={`px-4 py-2 rounded-md ${!listView && currentView === Views.MONTH ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`} > 
              Month 
            </button> 
            <button onClick={() => setListView(true)} className={`px-4 py-2 rounded-md ${listView ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`} > 
              List 
            </button> 
          </div> 
          {/* Switch between list and calendar */} 
          {listView ? ( 
            <ListView /> 
          ) : ( 
            <div className="h-[calc(100vh-160px)]"> 
              <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                view={currentView}
                onView={setCurrentView}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleEventClick}
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          )} 
        </div> 
      </div> 
      {/* Modals */} 
      <Modal /> 
      <EventDetailModal />
    </div> 
  ); 
};