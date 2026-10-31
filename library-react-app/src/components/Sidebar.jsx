import { NavLink } from 'react-router-dom';

function Sidebar() {
    const menuItems = [
        { name: 'Home', path: '/', icon: 'bi-house-door' },
        { name: 'Dashboard', path: '/dashboard', icon: 'bi-grid' },
        { name: 'My Books', path: '/books', icon: 'bi-book' },
        { name: 'Categories', path: '/categories', icon: 'bi-collection' },
        { name: 'My Notes', path: '/notes', icon: 'bi-journal-text' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <i className="bi bi-book-half brand-icon"></i>
                <div>
                    <h4>The Reading Nook</h4>
                    <small>YOUR PERSONAL LIBRARY</small>
                </div>
            </div>

            <div className="sidebar-section-label">
                LIBRARY MENU
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <i className={`bi ${item.icon}`}></i>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <i className="bi bi-bookmark-heart"></i>
                <span>A home for your stories.</span>
            </div>
        </aside>
    );
}

export default Sidebar;
