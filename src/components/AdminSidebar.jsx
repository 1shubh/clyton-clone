import React from 'react'

export const AdminSidebar = ({ currentView, onNavigate, onLogout }) => {
    const menuItems = [
        { label: 'Property List', view: 'properties' },
        { label: 'Add New Property', view: 'addProduct' },
        {
          label: 'Orders',
          view: 'orders',
        }
        // Add more navigation options as needed
      ];
  return (
    <div className="bg-gray-800 text-white w-[15%] p-5 h-screen sticky top-0">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.view}
            className={`cursor-pointer p-2 rounded ${
              currentView === item.view ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
            onClick={() => onNavigate(item.view)}
          >
            {item.label}
          </li>
        ))}
        {/* <li
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
          onClick={onLogout}
        >
          Logout
        </li> */}
      </ul>
    </div>
  )
}
