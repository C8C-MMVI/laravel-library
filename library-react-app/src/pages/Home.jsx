
import { Link } from 'react-router-dom';

function Home() {
    const features = [
        {
            icon: 'bi-collection',
            title: 'My Books',
            description: 'Keep your favorite books organized in one place.',
            link: '/books',
            button: 'Explore Books',
        },
        {
            icon: 'bi-bookmark-star',
            title: 'Categories',
            description: 'Organize your collection by genre and category.',
            link: '/categories',
            button: 'Browse Categories',
        },
        {
            icon: 'bi-journal-text',
            title: 'My Notes',
            description: 'Save your thoughts, reflections, and favorite ideas.',
            link: '/notes',
            button: 'View Notes',
        },
        {
            icon: 'bi-graph-up',
            title: 'Dashboard',
            description: 'See your reading activity and library statistics.',
            link: '/dashboard',
            button: 'View Dashboard',
        },
    ];

    return (
        <div className="home-page">
            {/* Welcome Section */}
            <section
                className="rounded-4 p-4 p-md-5 mb-5"
                style={{
                    background: 'linear-gradient(135deg, #4B3025, #76513C)',
                    color: '#F8F4EC',
                }}
            >
                <div className="row align-items-center g-4">
                    <div className="col-lg-8">
                        <span className="text-uppercase small fw-semibold">
                            Welcome to your personal library
                        </span>

                        <h1
                            className="display-4 fw-bold my-3"
                            style={{ color: '#F8F4EC' }}
                        >
                            Your Reading Nook
                        </h1>

                        <p
                            className="fs-5 mb-4"
                            style={{ color: '#E9DDC9' }}
                        >
                            Every book has a story. Every reader has a
                            journey. Keep yours organized, remembered,
                            and treasured in one place.
                        </p>

                        <div className="d-flex flex-wrap gap-3">
                            <Link
                                to="/books"
                                className="btn btn-light btn-lg"
                            >
                                <i className="bi bi-book-half me-2"></i>
                                Explore My Books
                            </Link>

                            <Link
                                to="/dashboard"
                                className="btn btn-outline-light btn-lg"
                            >
                                My Dashboard
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 text-center">
                        <i
                            className="bi bi-book-half"
                            style={{
                                fontSize: 'clamp(100px, 15vw, 180px)',
                                color: '#E9DDC9',
                                opacity: 0.9,
                            }}
                        ></i>
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section className="text-center mb-5">
                <h2>Your Library, Your Story</h2>

                <p
                    className="page-description mx-auto"
                    style={{ maxWidth: '650px' }}
                >
                    A little space dedicated to the books you love,
                    the stories you discover, and the thoughts you
                    want to keep.
                </p>
            </section>

            {/* Navigation Cards */}
            <section className="mb-5">
                <div className="row g-4">
                    {features.map((feature) => (
                        <div className="col-sm-6 col-xl-3" key={feature.title}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body p-4 d-flex flex-column">
                                    <div
                                        className="stat-icon mb-3"
                                        style={{
                                            width: '55px',
                                            height: '55px',
                                            fontSize: '24px',
                                        }}
                                    >
                                        <i className={`bi ${feature.icon}`}></i>
                                    </div>

                                    <h4>{feature.title}</h4>

                                    <p className="text-muted flex-grow-1">
                                        {feature.description}
                                    </p>

                                    <Link
                                        to={feature.link}
                                        className="btn btn-outline-primary mt-2"
                                    >
                                        {feature.button}
                                        <i className="bi bi-arrow-right ms-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Closing Message */}
            <section
                className="text-center rounded-4 p-4 mb-4"
                style={{
                    backgroundColor: '#E9DDC9',
                    color: '#4B3025',
                }}
            >
                <i className="bi bi-quote fs-1"></i>

                <h4 className="mt-2">
                    "A room without books is like a body without a soul."
                </h4>

                <p className="mb-0 text-muted">
                    Make yourself at home, and happy reading!
                </p>
            </section>
        </div>
    );
}

export default Home;
