// src/App.tsx

import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import Login from './authentication/login';
import SignUp from './authentication/signUp';
import Verification from './authentication/Verification';
import { AuthProvider } from './authentication/AuthProvider';
import ProtectedRoute from './authentication/RouteProtector';
import { useAuth } from './authentication/AuthProvider';
import { CropPlan } from './pages/Crops/CropPlan/CropPlan';
import { YieldComparison } from './pages/Crops/CropPlan/YieldComparison/YieldComparison';
import { LocationMap } from './pages/Crops/LocationMap/LocationMap';
import { GrowLocationTasks } from './pages/Crops/GrowLocations/Tasks/Tasks';
import { GrowLocationCalendar } from "./pages/Crops/GrowLocations/Calendar/Calendar";
import { GrowLocationNutrients } from "./pages/Crops/GrowLocations/Nutrients/Nutrients";
import { GrowLocationTreatments } from "./pages/Crops/GrowLocations/Treatment/Treatment";
import { GrowLocationPlantings } from "./pages/Crops/GrowLocations/Planting/Planting";
import { MyCropsHarvests } from './pages/Crops/MyCrops/Harvest/Harvest';
import { GrowLocationNotes } from "./pages/Crops/GrowLocations/Notes/Notes";
import { GrowLocationAccounting } from "./pages/Crops/GrowLocations/Accounting/Accounting";
import { GrowLocationImages } from "./pages/Crops/GrowLocations/Images/Images";
import { MyCurrentPlantings } from "./pages/Crops/MyCrops/CurrentPlanting/CurrentPlanting";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks/Tasks";
import { ContactsPage } from "./pages/Contact/Contact"
import { SchedulePage } from './pages/Schedule/Schedule';
import { CashFlowPage } from './pages/Accounting/Cashflow/Cashflow';
import { PnLStatementPage } from './pages/Accounting/PnLStatement/PnLStatement';
import { TransactionsPage } from './pages/Accounting/Transactions/Transaction';
import { MarketDashboardPage } from './pages/Marketing/Dashboard/MarketingDashboard'
import { MarketProductsPage } from './pages/Marketing/Products/Products'
import { MarketOrdersPage } from './pages/Marketing/MarketOrders/MarketOrders'

// Crops Secondary Sidebar Component
const CropsSecondarySidebar: React.FC<{ activeSubmenu: string; setActiveSubmenu: (submenu: string) => void }> = ({
  activeSubmenu,
  setActiveSubmenu
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const cropsMenuItems = [
    { id: 'details', label: 'Details', path: '/crops/my-crops/details' },
    { id: 'current-plantings', label: 'Current Plantings', path: '/crops/my-crops/current-plantings' },
    { id: 'future-plantings', label: 'Future Plantings', path: '/crops/my-crops/future-plantings' },
    { id: 'history', label: 'History', path: '/crops/my-crops/history' },
    { id: 'harvests', label: 'Harvests', path: '/crops/my-crops/harvests' },
    { id: 'yield-comparison', label: 'Yield Comparison', path: '/crops/my-crops/yield-comparison' },
    { id: 'accounting', label: 'Accounting', path: '/crops/my-crops/accounting' },
    { id: 'photos', label: 'Photos', path: '/crops/my-crops/photos' },
  ];

  React.useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = cropsMenuItems.find(item => currentPath.includes(item.id));
    if (activeItem) {
      setActiveSubmenu(activeItem.id);
    }
  }, [location.pathname, setActiveSubmenu]);

  return (
    <div className="bg-gray-50 w-48 flex-shrink-0 relative h-full">
      <div className="absolute right-0 top-0 h-screen w-px bg-gray-200"></div>
      <div className="py-4">
        {cropsMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              navigate(item.path);
              setActiveSubmenu(item.id);
            }}
            className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 relative ${activeSubmenu === item.id
              ? 'bg-white text-green-700 font-medium'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            {item.label}
            {activeSubmenu === item.id && (
              <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-green-600"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Grow Locations Secondary Sidebar Component
const GrowLocationsSecondarySidebar: React.FC<{ activeSubmenu: string; setActiveSubmenu: (submenu: string) => void }> = ({
  activeSubmenu,
  setActiveSubmenu
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const growLocationsMenuItems = [
    { id: 'details', label: 'Details', path: '/crops/grow-locations/details' },
    { id: 'plantings', label: 'Plantings', path: '/crops/grow-locations/plantings' },
    { id: 'crop-plan', label: 'Crop Plan', path: '/crops/grow-locations/crop-plan' },
    { id: 'planting-history', label: 'Planting History', path: '/crops/grow-locations/planting-history' },
    { id: 'grazing', label: 'Grazing', path: '/crops/grow-locations/grazing' },
    { id: 'treatments', label: 'Treatments', path: '/crops/grow-locations/treatments' },
    { id: 'nutrients', label: 'Nutrients', path: '/crops/grow-locations/nutrients' },
    { id: 'calendar', label: 'Calendar', path: '/crops/grow-locations/calendar' },
    { id: 'tasks', label: 'Tasks', path: '/crops/grow-locations/tasks' },
    { id: 'notes', label: 'Notes', path: '/crops/grow-locations/notes' },
    { id: 'map', label: 'Map', path: '/crops/grow-locations/map' },
    { id: 'accounting', label: 'Accounting', path: '/crops/grow-locations/accounting' },
    { id: 'images', label: 'Images', path: '/crops/grow-locations/images' },
  ];

  React.useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = growLocationsMenuItems.find(item => currentPath.includes(item.id));
    if (activeItem) {
      setActiveSubmenu(activeItem.id);
    }
  }, [location.pathname, setActiveSubmenu]);

  return (
    <div className="bg-gray-50 w-48 flex-shrink-0 relative h-full">
      <div className="absolute right-0 top-0 h-screen w-px bg-gray-200"></div>
      <div className="py-4">
        {growLocationsMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              navigate(item.path);
              setActiveSubmenu(item.id);
            }}
            className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 relative ${activeSubmenu === item.id
              ? 'bg-white text-green-700 font-medium'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            {item.label}
            {activeSubmenu === item.id && (
              <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-green-600"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// New component for the protected layout
const ProtectedLayout: React.FC = () => {
  const { userRole } = useAuth();
  const [activeMenu, setActiveMenu] = useState('crops');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCropsSubmenu, setActiveCropsSubmenu] = useState('details');
  const [activeGrowLocationsSubmenu, setActiveGrowLocationsSubmenu] = useState('details');
  const [showCropsSubmenu, setShowCropsSubmenu] = useState(false);
  const [showGrowLocationsSubmenu, setShowGrowLocationsSubmenu] = useState(false);

  const location = useLocation();

  // Check which secondary sidebar to show
  React.useEffect(() => {
    const isInMyCropsSection = location.pathname.startsWith('/crops/my-crops');
    const isInGrowLocationsSection = location.pathname.startsWith('/crops/grow-locations');

    setShowCropsSubmenu(isInMyCropsSection);
    setShowGrowLocationsSubmenu(isInGrowLocationsSection);

    // Reset submenus when not in their respective sections
    if (!isInMyCropsSection && !isInGrowLocationsSection) {
      setShowCropsSubmenu(false);
      setShowGrowLocationsSubmenu(false);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        role={userRole || 'none'}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Main Content Area */}
      <div className="ml-64 flex min-h-screen">
        {/* Secondary Sidebar for My Crops */}
        {showCropsSubmenu && (
          <div className="pt-16 flex-shrink-0 h-screen">
            <CropsSecondarySidebar
              activeSubmenu={activeCropsSubmenu}
              setActiveSubmenu={setActiveCropsSubmenu}
            />
          </div>
        )}

        {/* Secondary Sidebar for Grow Locations */}
        {showGrowLocationsSubmenu && (
          <div className="pt-16 flex-shrink-0 h-screen">
            <GrowLocationsSecondarySidebar
              activeSubmenu={activeGrowLocationsSubmenu}
              setActiveSubmenu={setActiveGrowLocationsSubmenu}
            />
          </div>
        )}

        {/* Content area with top padding to account for fixed header */}
        <main className="pt-20 p-6 bg-gray-50 min-h-screen flex-1">
          <Routes>
            {/* <Route path="/schedule" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Schedule</h1>
                <p className="text-gray-600">Manage your farm schedule and activities</p>
              </div>
            } /> */}
            {/* <Route path="/tasks" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Tasks</h1>
                <p className="text-gray-600">Track and manage farm tasks</p>
              </div>
            } /> */}
            <Route path="/livestock" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Livestock</h1>
                <p className="text-gray-600">Manage your livestock inventory and health</p>
              </div>
            } />

            {/* My Crops Routes */}
            <Route path="/crops/my-crops/*" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                {activeCropsSubmenu === 'details' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Crops - Details</h1>
                    <p className="text-gray-600">View detailed information about your crops</p>
                  </>
                )}
                {activeCropsSubmenu === 'current-plantings' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Current Plantings</h1>
                    <p className="text-gray-600">Manage and track current crop plantings</p>
                  </>
                )}
                {activeCropsSubmenu === 'future-plantings' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Future Plantings</h1>
                    <p className="text-gray-600">Plan and schedule future crop plantings</p>
                  </>
                )}
                {activeCropsSubmenu === 'history' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Planting History</h1>
                    <p className="text-gray-600">View historical planting data and records</p>
                  </>
                )}
                {activeCropsSubmenu === 'harvests' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Harvests</h1>
                    <p className="text-gray-600">Track and manage crop harvests</p>
                  </>
                )}
                {activeCropsSubmenu === 'yield-comparison' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Yield Comparison</h1>
                    <p className="text-gray-600">Compare yields across different plantings and seasons</p>
                  </>
                )}
                {activeCropsSubmenu === 'accounting' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Crops Accounting</h1>
                    <p className="text-gray-600">Track crop-related financial data and expenses</p>
                  </>
                )}
                {activeCropsSubmenu === 'photos' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Crop Photos</h1>
                    <p className="text-gray-600">View and manage photos of your crops</p>
                  </>
                )}
              </div>
            } />

            {/* Grow Locations Routes */}
            <Route path="/crops/grow-locations/*" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                {activeGrowLocationsSubmenu === 'details' && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Northwest Field A (CSA Shares)</h1>
                        <p className="text-sm text-gray-600">2.5 Acre <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2">Active</span></p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                          New Treatment Record
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          <i className="fas fa-print"></i>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          <i className="fas fa-th"></i>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details/Product</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retreat Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entered By</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sep. 14, 2021</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                  Mold ▼
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Break The Mold ▼ 175 oz</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Chris</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 mr-2">📋</button>
                                <button className="text-red-600 hover:text-red-900">✗</button>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sep. 07, 2021</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                  Pesticide ▼
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Insect Incinerator ▼ 14g</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Chris</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 mr-2">📋</button>
                                <button className="text-red-600 hover:text-red-900">✗</button>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Aug. 23, 2021</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                  Fungus ▼
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Fungus Fighter 3500 Max Xtreme ▼ 19g</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Aug. 18, 2021</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Chris</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 mr-2">📋</button>
                                <button className="text-red-600 hover:text-red-900">✗</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm text-gray-700">Displaying all 7 treatments</p>
                      </div>
                    </div>
                  </>
                )}
                {activeGrowLocationsSubmenu === 'plantings' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Grow Locations - Plantings</h1>
                    <p className="text-gray-600">Manage plantings for this grow location</p>
                  </>
                )}
                {activeGrowLocationsSubmenu === 'crop-plan' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Grow Locations - Crop Plan</h1>
                    <p className="text-gray-600">Plan and schedule crops for this location</p>
                  </>
                )}
                {activeGrowLocationsSubmenu === 'planting-history' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Grow Locations - Planting History</h1>
                    <p className="text-gray-600">View historical planting data for this location</p>
                  </>
                )}
                {activeGrowLocationsSubmenu === 'grazing' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Grow Locations - Grazing</h1>
                    <p className="text-gray-600">Manage grazing activities for this location</p>
                  </>
                )}
                {activeGrowLocationsSubmenu === 'treatments' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Grow Locations - Treatments</h1>
                    <p className="text-gray-600">Track treatments and applications for this location</p>
                  </>
                )}
                {activeGrowLocationsSubmenu === 'nutrients' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Grow Locations - Nutrients</h1>
                    <p className="text-gray-600">Monitor nutrient levels and fertilization</p>
                  </>
                )}
                {activeGrowLocationsSubmenu === 'calendar' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Grow Locations - Calendar</h1>
                    <p className="text-gray-600">View calendar events for this location</p>
                  </>
                )}
                {activeGrowLocationsSubmenu === 'tasks' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Grow Locations - Tasks</h1>
                    <p className="text-gray-600">Manage tasks specific to this location</p>
                  </>
                )}
                {activeGrowLocationsSubmenu === 'notes' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Grow Locations - Notes</h1>
                    <p className="text-gray-600">View and add notes for this location</p>
                  </>
                )}
                {activeGrowLocationsSubmenu === 'map' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Grow Locations - Map</h1>
                    <p className="text-gray-600">View location on map</p>
                  </>
                )}
                {activeGrowLocationsSubmenu === 'accounting' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Grow Locations - Accounting</h1>
                    <p className="text-gray-600">Track financial data for this location</p>
                  </>
                )}
                {activeGrowLocationsSubmenu === 'images' && (
                  <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Grow Locations - Images</h1>
                    <p className="text-gray-600">View and manage images for this location</p>
                  </>
                )}
              </div>
            } />


            {/* Other routes remain the same */}
            <Route path="/crops/*" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Crops</h1>
                <p className="text-gray-600">Manage your crop operations</p>
              </div>
            } />
            <Route path="/resources" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Resources</h1>
                <p className="text-gray-600">Manage farm equipment and resources</p>
              </div>
            } />
            <Route path="/accounting" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Accounting</h1>
                <p className="text-gray-600">Track farm finances and expenses</p>
              </div>
            } />
            <Route path="/transactions" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Transactions</h1>
                <p className="text-gray-600">Record and track financial transactions</p>
              </div>
            } />
            <Route path="/pnl" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">P&L Statement</h1>
                <p className="text-gray-600">View profit and loss statements</p>
              </div>
            } />
            <Route path="/cashflow" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Cash Flow</h1>
                <p className="text-gray-600">Monitor cash flow and financial health</p>
              </div>
            } />
            <Route path="/market" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Market</h1>
                <p className="text-gray-600">Manage sales and market activities</p>
              </div>
            } />
            {/* <Route path="/contacts" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Contacts</h1>
                <p className="text-gray-600">Manage vendors, customers, and other contacts</p>
              </div>
            } /> */}
            <Route path="/farm-map" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Farm Map</h1>
                <p className="text-gray-600">View and manage your farm layout</p>
              </div>
            } />
            <Route path="/reports" element={
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reports</h1>
                <p className="text-gray-600">Generate and view farm reports</p>
              </div>
            } />
            <Route path="/crops/crop-plan" element={<CropPlan />} />
            <Route path="/crops/yield-comparison" element={<YieldComparison />} />
            <Route path="/crops/location-map" element={<LocationMap />} />
            <Route path="/crops/grow-locations/tasks" element={<GrowLocationTasks />} />
            <Route path="/crops/grow-locations/calendar" element={<GrowLocationCalendar />} />
            <Route path="/crops/grow-locations/nutrients" element={<GrowLocationNutrients />} />
            <Route path="/crops/grow-locations/treatments" element={<GrowLocationTreatments />} />
            <Route path="/crops/grow-locations/plantings" element={<GrowLocationPlantings />} />
            <Route path="/crops/my-crops/harvests" element={< MyCropsHarvests />} />
            <Route path="/crops/grow-locations/notes" element={<GrowLocationNotes />} />
            <Route path="/crops/grow-locations/accounting" element={<GrowLocationAccounting />} />
            <Route path="/crops/my-crops/photos" element={<GrowLocationImages />} />
            <Route path="/crops/my-crops/current-plantings" element={<MyCurrentPlantings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/accounting/cashflow" element={<CashFlowPage />} />
            <Route path="/accounting/pnl" element={<PnLStatementPage />} />
            <Route path="/accounting/transactions" element={<TransactionsPage />} />
            <Route path="/market/dashboard" element={<MarketDashboardPage />} />
            <Route path="/market/products" element={<MarketProductsPage />} />
            <Route path="/market/orders" element={<MarketOrdersPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verification" element={<Verification />} />
        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;