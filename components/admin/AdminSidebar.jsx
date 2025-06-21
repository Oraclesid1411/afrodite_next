'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
const links = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Mannequins', href: '/admin/mannequins' },
    { label: 'Hôtesses', href: '/admin/hotesses' },
    { label: 'Concours', href: '/admin/concours' },
    { label: 'vlogs', href: '/admin/vlogs' },
  ];

const AdminSidebar = () => {
    const pathname = usePathname();
  
    return (
      <nav className="sidebar_menu">
        <h2 className="sidebar_title">AFRODITE Admin</h2>
        <ul className="sidebar_links">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`sidebar_link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default AdminSidebar;