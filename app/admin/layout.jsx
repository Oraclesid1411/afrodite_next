'use client';

import { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import './admin.css'; // ton fichier CSS pour tout styliser

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
  
    return (
      <div className="admin_layout">
        {/* Sidebar fixe à gauche */}
        <div className={`admin_sidebar ${sidebarOpen ? 'show' : 'hide'}`}>
          <AdminSidebar />
        </div>
  
        <div className="admin_main">
          <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
          <main className="admin_content">
            {children}
          </main>
        </div>
      </div>
    );
  }