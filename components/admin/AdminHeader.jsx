'use client';

const AdminHeader = ({ toggleSidebar, sidebarOpen }) => {
  return (
    <header className="admin_header">
      <div className="header_left">
        <button onClick={toggleSidebar} className="toggle_sidebar_btn">
          {sidebarOpen ? '✖️' : '☰'}
        </button>
        <h1 className="page_title">Dashboard Admin</h1>
      </div>
      <div className="header_right">
        <span className="admin_name">Admin</span>
        <button className="logout_btn">Déconnexion</button>
      </div>
    </header>
  );
};

export default AdminHeader;
