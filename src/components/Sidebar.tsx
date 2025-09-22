import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../authentication/AuthProvider';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  role: string;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  role,
  activeMenu,
  setActiveMenu,
}) => {
  const [accountingOpen, setAccountingOpen] = useState(false);
  const [cropsOpen, setCropsOpen] = useState(false);
  const [livestockOpen, setLivestockOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);
  const [climateOpen, setClimateOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Sync activeMenu with current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/') {
      setActiveMenu('schedule');
    } else if (path.startsWith('/schedule')) {
      setActiveMenu('schedule');
    } else if (path.startsWith('/tasks')) {
      setActiveMenu('tasks');
    } else if (path.startsWith('/livestock')) {
      setActiveMenu('livestock');
    } else if (path.startsWith('/crops')) {
      setActiveMenu('crops');
      setCropsOpen(true);
    } else if (path.startsWith('/livestock')) {
      setActiveMenu('livestock');
      setLivestockOpen(true);
    } else if (path.startsWith('/resources')) {
      setActiveMenu('resources');
      setResourcesOpen(true);
    } else if (path.startsWith('/accounting')) {
      setActiveMenu('accounting');
      setAccountingOpen(true);
    } else if (path.startsWith('/transactions')) {
      setActiveMenu('accounting');
      setAccountingOpen(true);
    } else if (path.startsWith('/market')) {
      setActiveMenu('market');
      setMarketOpen(true);
    } else if (path.startsWith('/contacts')) {
      setActiveMenu('contacts');
    } else if (path.startsWith('/farm-map')) {
      setActiveMenu('farm-map');
    } else if (path.startsWith('/reports')) {
      setActiveMenu('reports');
    } else if (path.startsWith('/climate')) {
      setActiveMenu('climate');
      setClimateOpen(true);
    }
  }, [location.pathname, setActiveMenu]);

  const menuItems = [
    { id: 'schedule', icon: 'fa-calendar-alt', label: 'Schedule', path: '/schedule' },
    { id: 'tasks', icon: 'fa-tasks', label: 'Tasks', path: '/tasks' },
    // { id: 'livestock', icon: 'fa-horse', label: 'Livestock', hasSub: true, path: '/livestock' },
    { id: 'crops', icon: 'fa-seedling', label: 'Crops', hasSub: true, path: '/crops' },
    { id: 'resources', icon: 'fa-tractor', label: 'Resources', hasSub: true, path: '/resources' },
    { id: 'accounting', icon: 'fa-calculator', label: 'Accounting', hasSub: true, path: '/accounting' },
    { id: 'market', icon: 'fa-store', label: 'Market', hasSub: true, path: '/market' },
    { id: 'climate', icon: 'fa-cloud-sun', label: 'Climate', hasSub: true, path: '/climate' },
    { id: 'contacts', icon: 'fa-address-book', label: 'Contacts', path: '/contacts' },
    { id: 'farm-map', icon: 'fa-map', label: 'Farm Map', path: '/farm-map' },
    { id: 'reports', icon: 'fa-chart-bar', label: 'Reports', path: '/reports' },
  ];

  const cropsSubItems = [
    { id: 'my-crops', icon: 'fa-list', label: 'My Crops', path: '/crops/my-crops' },
    { id: 'grow-locations', icon: 'fa-map-marker-alt', label: 'Grow Locations', path: '/crops/grow-locations' },
    { id: 'crop-plan', icon: 'fa-calendar-check', label: 'Crop Plan', path: '/crops/crop-plan' },
    { id: 'location-map', icon: 'fa-map', label: 'Location Map', path: '/crops/location-map' },
    { id: 'yield-comparison', icon: 'fa-chart-line', label: 'Yield Comparison', path: '/crops/yield-comparison' },
  ];

  const livestockSubItems = [
    { id: 'animals', icon: 'fa-paw', label: 'Animals', path: '/livestock/animals' },
    { id: 'groups', icon: 'fa-layer-group', label: 'Groups', path: '/livestock/groups' },
    { id: 'breeding', icon: 'fa-heart', label: 'Breeding', path: '/livestock/breeding' },
    { id: 'health', icon: 'fa-stethoscope', label: 'Health', path: '/livestock/health' },
  ];

  const resourcesSubItems = [
    { id: 'equipment', icon: 'fa-tractor', label: 'Equipment', path: '/resources/equipment' },
    { id: 'warehouse', icon: 'fa-warehouse', label: 'Warehouse', path: '/resources/warehouse' },
    { id: 'inventory', icon: 'fa-boxes', label: 'Inventory', path: '/resources/inventory' },
  ];

  const accountingSubItems = [
    { id: 'transactions', icon: 'fa-exchange-alt', label: 'Transactions', path: '/accounting/transactions' },
    { id: 'pnl', icon: 'fa-chart-line', label: 'P&L Statement', path: '/accounting/pnl' },
    { id: 'cashflow', icon: 'fa-coins', label: 'Cash Flow', path: '/accounting/cashflow' },
    { id: 'balance-sheet', icon: 'fa-balance-scale', label: 'Balance Sheet', path: '/accounting/balance-sheet' },
    { id: 'budgeting', icon: 'fa-wallet', label: 'Budgeting', path: '/accounting/budgeting' },
  ];

  const marketSubItems = [
    { id: 'dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard', path: '/market/dashboard' },
    { id: 'products', icon: 'fa-box', label: 'Products', path: '/market/products' },
    { id: 'orders', icon: 'fa-shopping-bag', label: 'Orders', path: '/market/orders' },
  ];

  const climateSubItems = [
    { id: 'weather-history', icon: 'fa-history', label: 'Weather History', path: '/climate/weather-history' },
    { id: 'gauges', icon: 'fa-tachometer-alt', label: 'Gauges', path: '/climate/gauges' },
    { id: 'weather-logs', icon: 'fa-clipboard-list', label: 'Weather Logs', path: '/climate/weather-logs' },
    { id: 'weather-map', icon: 'fa-map-marked-alt', label: 'Weather Map', path: '/climate/weather-map' },
  ];

  const { logout } = useAuth();

  const handleLogout = () => {
    console.log('Logout button clicked');
    logout();
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
              <i className="fas fa-leaf text-white text-sm"></i>
            </div>
            <span className="text-xl font-semibold text-gray-800">farm</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400 text-sm"></i>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Quick Add Button */}
          <div className="relative">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
              <span>Quick Add</span>
              <i className="fas fa-chevron-down text-xs"></i>
            </button>
          </div>

          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-gray-50"
            >
              <i className="fas fa-user-circle text-lg text-gray-600"></i>
              <span className="text-sm font-medium">Account</span>
              <i className="fas fa-chevron-down text-xs"></i>
            </button>

            {accountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Account Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Billing
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Initial/Avatar */}
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            K
          </div>

          {/* Help */}
          <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <i className="fas fa-question-circle text-lg"></i>
            <span className="ml-1 text-sm">Help</span>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-40 w-64 flex flex-col h-screen shadow-sm mt-16">
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1">
              <div
                onClick={() => {
                  if (item.hasSub) {
                    if (item.id === 'accounting') {
                      setAccountingOpen(!accountingOpen);
                    } else if (item.id === 'crops') {
                      setCropsOpen(!cropsOpen);
                    } else if (item.id === 'livestock') {
                      setLivestockOpen(!livestockOpen);
                    } else if (item.id === 'resources') {
                      setResourcesOpen(!resourcesOpen);
                    } else if (item.id === 'market') {
                      setMarketOpen(!marketOpen);
                    } else if (item.id === 'climate') {
                      setClimateOpen(!climateOpen);
                    }
                  } else {
                    navigate(item.path);
                    setActiveMenu(item.id);
                  }
                }}
                className={`mx-3 flex items-center px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200 group ${activeMenu === item.id
                  ? 'bg-green-50 text-green-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <div className="flex items-center justify-center w-5 h-5 mr-3">
                  <i className={`fas ${item.icon} text-sm ${activeMenu === item.id ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-600'
                    }`}></i>
                </div>
                <span className="text-sm font-medium truncate flex-1">{item.label}</span>
                {item.hasSub && (
                  <i className={`fas ml-2 text-xs transition-transform duration-200 ${(item.id === 'accounting' && accountingOpen) ||
                    (item.id === 'crops' && cropsOpen) ||
                    (item.id === 'livestock' && livestockOpen) ||
                    (item.id === 'resources' && resourcesOpen) ||
                    (item.id === 'market' && marketOpen) ||
                    (item.id === 'climate' && climateOpen)
                    ? 'fa-chevron-up' : 'fa-chevron-down'
                    } text-gray-400`}></i>
                )}
              </div>

              {/* Submenus */}
              {item.id === 'crops' && cropsOpen && (
                <div className="ml-8 mr-3 mt-1 space-y-1">
                  {cropsSubItems.map((subItem) => (
                    <Link
                      key={subItem.id}
                      to={subItem.path}
                      onClick={() => setActiveMenu('crops')}
                      className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      {/* <i className={`fas ${subItem.icon} mr-3 w-4 text-xs text-gray-500`}></i> */}
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}

              {item.id === 'livestock' && livestockOpen && (
                <div className="ml-8 mr-3 mt-1 space-y-1">
                  {livestockSubItems.map((subItem) => (
                    <Link
                      key={subItem.id}
                      to={subItem.path}
                      onClick={() => setActiveMenu('livestock')}
                      className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      {/* <i className={`fas ${subItem.icon} mr-3 w-4 text-xs text-gray-500`}></i> */}
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}

              {item.id === 'resources' && resourcesOpen && (
                <div className="ml-8 mr-3 mt-1 space-y-1">
                  {resourcesSubItems.map((subItem) => (
                    <Link
                      key={subItem.id}
                      to={subItem.path}
                      onClick={() => setActiveMenu('resources')}
                      className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      {/* <i className={`fas ${subItem.icon} mr-3 w-4 text-xs text-gray-500`}></i> */}
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}

              {item.id === 'market' && marketOpen && (
                <div className="ml-8 mr-3 mt-1 space-y-1">
                  {marketSubItems.map((subItem) => (
                    <Link
                      key={subItem.id}
                      to={subItem.path}
                      onClick={() => setActiveMenu('market')}
                      className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      {/* <i className={`fas ${subItem.icon} mr-3 w-4 text-xs text-gray-500`}></i> */}
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Submenu for Accounting */}
              {item.id === 'accounting' && accountingOpen && (
                <div className="ml-8 mr-3 mt-1 space-y-1">
                  {accountingSubItems.map((subItem) => (
                    <Link
                      key={subItem.id}
                      to={subItem.path}
                      onClick={() => setActiveMenu('accounting')}
                      className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      {/* <i className={`fas ${subItem.icon} mr-3 w-4 text-xs text-gray-500`}></i> */}
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Submenu for Climate */}
              {item.id === 'climate' && climateOpen && (
                <div className="ml-8 mr-3 mt-1 space-y-1">
                  {climateSubItems.map((subItem) => (
                    <Link
                      key={subItem.id}
                      to={subItem.path}
                      onClick={() => setActiveMenu('climate')}
                      className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      {/* <i className={`fas ${subItem.icon} mr-3 w-4 text-xs text-gray-500`}></i> */}
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};