
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Categories from './pages/Categories';
import Notes from './pages/Notes';

import BookForm from './components/books/BookForm';
import BookDetails from './components/books/BookDetails';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    {/* Home Page */}
                    <Route path="/" element={<Home />} />

                    {/* Dashboard */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Books */}
                    <Route path="/books" element={<Books />} />
                    <Route path="/books/create" element={<BookForm />} />
                    <Route path="/books/:id" element={<BookDetails />} />
                    <Route path="/books/:id/edit" element={<BookForm />} />

                    {/* Categories */}
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/:id" element={<Categories />} />

                    {/* Notes */}
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/notes/:id" element={<Notes />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
