
function Navbar() {
    return (
        <header className="top-navbar">
            <div>
                <span className="navbar-subtitle">
                    PERSONAL LIBRARY MANAGEMENT
                </span>
            </div>

            <div className="navbar-right">
                <div className="navbar-date">
                    <i className="bi bi-bookmark"></i>
                    <span>My Reading Space</span>
                </div>

                <div className="navbar-avatar">
                    <i className="bi bi-person-fill"></i>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
