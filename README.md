# Project Management CRM

**A full-stack project and task management system built with Laravel 11, React, and Inertia.js**

[![Laravel](https://img.shields.io/badge/Laravel-11.x-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://react.dev)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-1.x-purple.svg)](https://inertiajs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-cyan.svg)](https://tailwindcss.com)

---

## 🔹 About The Project

A production-ready CRM system for managing projects, tasks, and team assignments. Built with Laravel 11 backend, React frontend, and Inertia.js for seamless SPA navigation. Currently in active use for managing client relationships and project workflows.

### Key Features

* **Project Management** - Create, edit, and track projects with status monitoring
* **Task Management** - Assign tasks to users with priority levels and due dates
* **Dashboard Analytics** - Real-time statistics on pending, in-progress, and completed tasks
* **Advanced Filtering** - Search and sort by name, status, date, with persistent query strings
* **User Assignment** - Assign tasks to team members and track "My Tasks"
* **Image Uploads** - Attach images to projects and tasks with automatic storage management
* **Audit Trail** - Track who created and last updated each record
* **Flash Messages** - User feedback for all CRUD operations
* **Dark Mode UI** - Modern Tailwind CSS dark theme

---

## 🔹 Tech Stack

### Backend
* **Laravel 11** - PHP framework
* **MySQL** - Relational database
* **Eloquent ORM** - Database abstraction
* **Form Request Validation** - Server-side validation
* **API Resources** - Data transformation layer
* **Laravel Breeze** - Authentication scaffolding

### Frontend
* **React 18** - UI library
* **Inertia.js** - SPA framework (server-driven)
* **Tailwind CSS 3** - Utility-first CSS
* **Vite** - Frontend build tool

---

## 🔹 Getting Started

### Prerequisites

* PHP 8.2 or higher
* Composer
* Node.js 18+ & npm
* MySQL 5.7+ or MariaDB

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/monatemedia/laravel11-react-inertia.git
   cd laravel11-react-inertia
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies**
   ```bash
   npm install
   ```

4. **Create environment file**
   ```bash
   cp .env.example .env
   ```

5. **Configure database in `.env`**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=crm_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

6. **Generate application key**
   ```bash
   php artisan key:generate
   ```

7. **Run migrations**
   ```bash
   php artisan migrate
   ```

8. **Seed the database (optional)**
   ```bash
   php artisan db:seed
   ```

9. **Create symbolic link for storage**
   ```bash
   php artisan storage:link
   ```

10. **Build frontend assets**
    
    **Development:**
    ```bash
    npm run dev
    ```
    
    **Production:**
    ```bash
    npm run build
    ```

11. **Start the development server**
    ```bash
    php artisan serve
    ```

12. **Access the application**
    
    Open your browser to: `http://127.0.0.1:8000`

---

## 🔹 Database Schema

### Users Table (Laravel Breeze default)
- Authentication and authorization
- `name`, `email`, `password`
- Email verification support

### Projects Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | bigint | Primary key |
| `name` | string | Project name |
| `description` | longText | Project details (nullable) |
| `status` | string | pending, in_progress, completed |
| `due_date` | timestamp | Project deadline (nullable) |
| `image_path` | string | Project image (nullable) |
| `created_by` | foreignId | Creator user ID |
| `updated_by` | foreignId | Last updater user ID |
| `created_at`, `updated_at` | timestamps | Auto-managed |

### Tasks Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | bigint | Primary key |
| `name` | string | Task name |
| `description` | longText | Task details (nullable) |
| `image_path` | string | Task image (nullable) |
| `status` | string | pending, in_progress, completed |
| `priority` | string | low, medium, high |
| `due_date` | string | Task deadline (nullable) |
| `project_id` | foreignId | Parent project |
| `assigned_user_id` | foreignId | Assigned team member |
| `created_by` | foreignId | Creator user ID |
| `updated_by` | foreignId | Last updater user ID |
| `notes` | text | Additional notes (nullable) |
| `created_at`, `updated_at` | timestamps | Auto-managed |

### Relationships

**Project Model:**
```php
public function tasks() {
    return $this->hasMany(Task::class);
}

public function createdBy() {
    return $this->belongsTo(User::class, 'created_by');
}

public function updatedBy() {
    return $this->belongsTo(User::class, 'updated_by');
}
```

**Task Model:**
```php
public function project() {
    return $this->belongsTo(Project::class);
}

public function assignedUser() {
    return $this->belongsTo(User::class, 'assigned_user_id');
}

public function createdBy() {
    return $this->belongsTo(User::class, 'created_by');
}

public function updatedBy() {
    return $this->belongsTo(User::class, 'updated_by');
}
```

---

## 🔹 Key Features Explained

### 1. Dashboard Analytics

The dashboard provides real-time task statistics:

- **Total tasks** vs **My tasks** for each status
- Active tasks table showing latest assignments
- Color-coded status indicators (amber/blue/green)

**Backend (DashboardController):**
```php
$totalPendingTasks = Task::query()->where('status', 'pending')->count();
$myPendingTasks = Task::query()
    ->where('status', 'pending')
    ->where('assigned_user_id', $user->id)
    ->count();
```

### 2. Advanced Filtering & Sorting

**Query String Persistence:**
```javascript
const searchFieldChanged = (name, value) => {
    if (value) {
        queryParams[name] = value;
    } else {
        delete queryParams[name];
    }
    router.get(route("project.index"), queryParams);
};
```

**Backend Filtering:**
```php
$query = Project::query();

if (request("name")) {
    $query->where("name", "like", "%" . request("name") . "%");
}

if (request("status")) {
    $query->where("status", request("status"));
}

$projects = $query->orderBy($sortField, $sortDirection)
    ->paginate(10);
```

### 3. Image Upload Management

**Automatic Directory Creation:**
```php
if ($image) {
    $data['image_path'] = $image->store('project/' . Str::random(), 'public');
}
```

**Deletion with Cleanup:**
```php
if ($project->image_path) {
    Storage::disk('public')->deleteDirectory(dirname($project->image_path));
}
```

### 4. Inertia.js SPA Architecture

**Server-Side Rendering:**
```php
return inertia("Project/Index", [
    "projects" => ProjectResource::collection($projects),
    "queryParams" => request()->query() ?: null,
    "success" => session("success")
]);
```

**Client-Side Navigation:**
```javascript
<Link href={route("project.show", project.id)}>
    {project.name}
</Link>
```

### 5. Reusable React Components

**TableHeading Component (Sortable):**
```jsx
<TableHeading
    name="created_at"
    sort_field={queryParams.sort_field}
    sort_direction={queryParams.sort_direction}
    sortChanged={sortChanged}
>
    Create Date
</TableHeading>
```

**SelectInput Component:**
```jsx
<SelectInput
    className="w-full"
    defaultValue={queryParams.status}
    onChange={(e) => searchFieldChanged("status", e.target.value)}
>
    <option value="">Select Status</option>
    <option value="pending">Pending</option>
    <option value="in_progress">In Progress</option>
    <option value="completed">Completed</option>
</SelectInput>
```

---

## 🔹 Routes

### Authentication Routes (Laravel Breeze)
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `POST /logout` - Log out
- `GET /register` - Registration page
- `POST /register` - Create new user
- Password reset, email verification routes

### Application Routes (Auth Required)

| Method | URI | Action | Description |
|--------|-----|--------|-------------|
| GET | `/dashboard` | DashboardController@index | Dashboard with statistics |
| GET | `/project` | ProjectController@index | List all projects |
| GET | `/project/create` | ProjectController@create | Show create form |
| POST | `/project` | ProjectController@store | Store new project |
| GET | `/project/{id}` | ProjectController@show | Show project details + tasks |
| GET | `/project/{id}/edit` | ProjectController@edit | Show edit form |
| PUT | `/project/{id}` | ProjectController@update | Update project |
| DELETE | `/project/{id}` | ProjectController@destroy | Delete project |
| GET | `/task` | TaskController@index | List all tasks |
| GET | `/task/my-tasks` | TaskController@myTasks | List current user's tasks |
| GET | `/task/create` | TaskController@create | Show create form |
| POST | `/task` | TaskController@store | Store new task |
| GET | `/task/{id}` | TaskController@show | Show task details |
| GET | `/task/{id}/edit` | TaskController@edit | Show edit form |
| PUT | `/task/{id}` | TaskController@update | Update task |
| DELETE | `/task/{id}` | TaskController@destroy | Delete task |
| GET | `/user` | UserController@index | List all users |
| (CRUD routes for users similar to above) |

---

## 🔹 Usage

### Creating a Project

1. Navigate to `/project`
2. Click "Add new" button
3. Fill in project details:
   - Name (required)
   - Description (optional)
   - Status (pending/in_progress/completed)
   - Due date (optional)
   - Upload image (optional)
4. Click "Submit"

### Creating a Task

1. Navigate to `/task`
2. Click "Add new" button
3. Fill in task details:
   - Name (required)
   - Description (optional)
   - Project assignment (required)
   - Assigned user (required)
   - Status (required)
   - Priority (low/medium/high)
   - Due date (optional)
   - Upload image (optional)
   - Notes (optional)
4. Click "Submit"

### Filtering and Sorting

**Search by Name:**
- Type in the "Project Name" or "Task Name" filter field
- Press Enter or click outside the field

**Filter by Status:**
- Select from dropdown: Pending, In Progress, or Completed

**Sort by Column:**
- Click on column headers (ID, Name, Status, Create Date, Due Date)
- First click: ascending order
- Second click: descending order

**My Tasks View:**
- Navigate to `/task/my-tasks`
- Shows only tasks assigned to you
- All filtering/sorting features still work

---

## 🔹 Project Structure

```
laravel11-react-inertia/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/              # Laravel Breeze auth controllers
│   │   │   ├── DashboardController.php
│   │   │   ├── ProjectController.php
│   │   │   ├── TaskController.php
│   │   │   └── UserController.php
│   │   ├── Requests/              # Form validation classes
│   │   │   ├── StoreProjectRequest.php
│   │   │   ├── UpdateProjectRequest.php
│   │   │   ├── StoreTaskRequest.php
│   │   │   └── UpdateTaskRequest.php
│   │   └── Resources/             # API resource transformers
│   │       ├── ProjectResource.php
│   │       ├── TaskResource.php
│   │       └── UserResource.php
│   └── Models/
│       ├── Project.php
│       ├── Task.php
│       └── User.php
├── database/
│   ├── factories/                 # Model factories for seeding
│   ├── migrations/                # Database schema
│   └── seeders/                   # Database seeders
├── resources/
│   ├── js/
│   │   ├── Components/            # Reusable React components
│   │   │   ├── Pagination.jsx
│   │   │   ├── TableHeading.jsx
│   │   │   ├── SelectInput.jsx
│   │   │   └── TextInput.jsx
│   │   ├── Layouts/
│   │   │   ├── AuthenticatedLayout.jsx
│   │   │   └── GuestLayout.jsx
│   │   ├── Pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Project/           # Project CRUD pages
│   │   │   ├── Task/              # Task CRUD pages
│   │   │   └── User/              # User management pages
│   │   ├── constants.jsx          # Status/priority mappings
│   │   └── app.jsx                # Inertia.js entry point
│   ├── css/
│   │   └── app.css                # Tailwind CSS
│   └── views/
│       └── app.blade.php          # Inertia.js root template
└── routes/
    ├── web.php                    # Application routes
    └── auth.php                   # Authentication routes
```

---

## 🔹 Development Notes

### Form Request Validation

**StoreProjectRequest.php:**
```php
public function rules(): array
{
    return [
        'name' => ['required', 'string', 'max:255'],
        'image' => ['nullable', 'image'],
        'description' => ['nullable', 'string'],
        'due_date' => ['nullable', 'date'],
        'status' => ['required', 'in:pending,in_progress,completed'],
    ];
}
```

### API Resources

**ProjectResource.php:**
```php
public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'description' => $this->description,
        'status' => $this->status,
        'image_path' => $this->image_path 
            ? Storage::url($this->image_path) 
            : '',
        'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
        'createdBy' => new UserResource($this->createdBy),
        'updatedBy' => new UserResource($this->updatedBy),
    ];
}
```

### Constants for Status/Priority

**constants.jsx:**
```javascript
export const TASK_STATUS_CLASS_MAP = {
    pending: "bg-amber-500",
    in_progress: "bg-blue-500",
    completed: "bg-green-500",
};

export const TASK_PRIORITY_CLASS_MAP = {
    low: "bg-gray-600",
    medium: "bg-amber-600",
    high: "bg-red-600",
};
```

---

## 🔹 Deployment

### Production Build

1. **Build assets for production**
   ```bash
   npm run build
   ```

2. **Optimize Composer autoloader**
   ```bash
   composer install --optimize-autoloader --no-dev
   ```

3. **Cache configuration**
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

4. **Set proper permissions**
   ```bash
   chmod -R 755 storage bootstrap/cache
   ```

### Environment Configuration

**Production `.env` settings:**
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

# Database
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=your-db-name
DB_USERNAME=your-db-user
DB_PASSWORD=your-secure-password

# Session & Cache
SESSION_DRIVER=database
CACHE_DRIVER=file
QUEUE_CONNECTION=database
```

---

## 🔹 Future Enhancements

- [ ] Email notifications for task assignments
- [ ] File attachments (documents, PDFs)
- [ ] Comments/activity log on tasks
- [ ] Calendar view for deadlines
- [ ] Kanban board view
- [ ] Time tracking for tasks
- [ ] Task dependencies
- [ ] Recurring tasks
- [ ] Export to PDF/Excel
- [ ] Mobile app (React Native)
- [ ] Real-time updates (Laravel Echo + Pusher)
- [ ] Advanced reporting and analytics

---

## 🔹 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🔹 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🔹 Contact

Edward Baitsewe  
📧 edward@monatemedia.com  
🔗 [LinkedIn](https://www.linkedin.com/in/edwardbaitsewe)  
🌐 [Portfolio](https://monatemedia.com/portfolio)  
🐙 [GitHub](https://github.com/monatemedia)

**Project Link:** [https://github.com/monatemedia/laravel11-react-inertia](https://github.com/monatemedia/laravel11-react-inertia)

---

## 🔹 Acknowledgments

* [Laravel Documentation](https://laravel.com/docs)
* [Inertia.js Documentation](https://inertiajs.com)
* [React Documentation](https://react.dev)
* [Tailwind CSS Documentation](https://tailwindcss.com)
* [Laravel Breeze](https://laravel.com/docs/starter-kits#laravel-breeze)
* [The Codeholic - Laravel + React + Inertia Tutorial](https://www.youtube.com/c/TheCodeholic)
