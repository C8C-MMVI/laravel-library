
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Personal Library')</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background-color: #f5f6fa;
            font-family: Arial, sans-serif;
        }

        .sidebar {
            min-height: 100vh;
            background-color: #212529;
        }

        .sidebar a {
            display: block;
            color: #adb5bd;
            text-decoration: none;
            padding: 12px 18px;
            border-radius: 6px;
            margin-bottom: 5px;
        }

        .sidebar a:hover,
        .sidebar a.active {
            background-color: #343a40;
            color: white;
        }

        .main-content {
            padding: 30px;
        }

        .stat-card {
            border: none;
            border-radius: 12px;
        }
    </style>
</head>
<body>

<div class="container-fluid">
    <div class="row">

        <aside class="col-md-2 sidebar p-3">
            <h4 class="text-white mb-4">My Library</h4>

            <a href="{{ url('/') }}">Dashboard</a>
            <a href="{{ route('books.index') }}">Books</a>
            <a href="{{ route('categories.index') }}">Categories</a>
            <a href="{{ route('notes.index') }}">Notes</a>
        </aside>

        <main class="col-md-10 main-content">

            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3>@yield('heading', 'Dashboard')</h3>
                <span class="text-muted">Personal Library Management</span>
            </div>

            @if(session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @endif

            @if($errors->any())
                <div class="alert alert-danger">
                    <ul class="mb-0">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            @yield('content')

        </main>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
