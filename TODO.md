# Wails Todo App - Development Tasks

This document outlines the tasks to build a fully-featured Todo application using Wails, Go, and the Next.js 15 frontend template with the App Router.

## Important Considerations for Wails + Next.js App Router

- **`"use client"` Directive:** The Next.js App Router uses React Server Components by default. Since a Wails application is a client-side application, you **must** add the `"use client";` directive at the top of any component file that uses client-side interactivity, such as `useState`, `useEffect`, or event handlers. For this project, you will need to add it to `frontend/app/page.tsx`.
- **Static Export:** Wails works with a statically exported version of your Next.js application. This means that Next.js features requiring a Node.js server, such as API Routes, Server-Side Rendering (SSR), and middleware, are **not supported**.
- **Backend in Go:** All backend logic, including data processing, file system access, and any other server-like functionality, must be implemented in Go.
- **Frontend-Backend Communication:** The communication between your Next.js frontend and Go backend is exclusively handled by the Wails JavaScript bridge. You will call Go functions directly from your TypeScript code.
- **Routing:** The application will be a single-page application. The main entry point is `frontend/app/page.tsx`. The `frontend/app/layout.tsx` file can be used to define the overall structure and styling of the application.

## Phase 1: Core Functionality

### Task 1: Basic UI Setup
- **Goal:** Create the basic user interface for the Todo app.
- **Steps:**
    1. In the `frontend` directory, open `app/page.tsx` and add the `"use client";` directive at the very top of the file.
    2. Modify the component to include:
        - A title for the application (e.g., "Wails Todo").
        - An input field for adding new tasks.
        - A button to submit the new task.
        - An empty list (`<ul>` or `<div>`) where the tasks will be displayed.

### Task 2: Backend Task Structure
- **Goal:** Define the data structure for a task in the Go backend.
- **Steps:**
    1. In `app.go`, define a `Task` struct. It should include fields like:
        - `ID` (int): A unique identifier for each task.
        - `Title` (string): The description of the task.
        - `Completed` (bool): The status of the task.

### Task 3: Create and Read Tasks
- **Goal:** Implement the backend logic to create and retrieve tasks.
- **Steps:**
    1. In `app.go`, create a slice to store the tasks in memory (for now).
    2. Create a Go function `GetTasks() []*Task` that returns the current list of tasks.
    3. Create a Go function `AddTask(title string) *Task` that creates a new task, adds it to the list, and returns the new task.
    4. Remember to add these new methods to the `App` struct and bind the `App` struct in `main.go`.

### Task 4: Frontend-Backend Integration
- **Goal:** Connect the frontend UI to the Go backend.
- **Steps:**
    1. The Wails CLI will automatically generate TypeScript definitions for your Go methods in the `frontend/wailsjs/go/main/App.d.ts` file.
    2. In `app/page.tsx`, import your Go functions: `import { GetTasks, AddTask } from '../../wailsjs/go/main/App';`
    3. Use a `useEffect` hook to call `GetTasks()` when the component mounts and store the tasks in the component's state.
    4. Render the list of tasks from the state.
    5. When the "add task" button is clicked, call `AddTask()` with the value from the input field.
    6. After adding a task, refresh the task list to display the new task.

## Phase 2: State Management and Persistence

### Task 5: Update and Delete Tasks
- **Goal:** Implement the logic to mark tasks as complete and to delete them.
- **Steps:**
    1. In `app.go`, create the following functions:
        - `ToggleTask(id int) error`: Finds a task by its ID and toggles its `Completed` status.
        - `DeleteTask(id int) error`: Removes a task from the list by its ID.
    2. In the frontend, for each task, add:
        - A checkbox that calls `ToggleTask()` when clicked.
        - A delete button that calls `DeleteTask()` when clicked.
    3. Update the UI to reflect the changes (e.g., strike-through for completed tasks).

### Task 6: Data Persistence
- **Goal:** Save the tasks to a file so they are not lost when the app closes.
- **Steps:**
    1. In `app.go`, create two helper functions:
        - `loadTasks()`: Reads tasks from a JSON file (e.g., `tasks.json`). If the file doesn't exist, it should start with an empty list.
        - `saveTasks()`: Writes the current list of tasks to the JSON file.
    2. Call `loadTasks()` when the application starts up (e.g., in the `startup` lifecycle method of your `App` struct).
    3. Call `saveTasks()` after any modification to the tasks list (add, toggle, delete).

## Phase 3: UI/UX Enhancements

### Task 7: Filtering
- **Goal:** Allow users to filter tasks by their completion status.
- **Steps:**
    1. Add filter buttons to the UI (e.g., "All", "Active", "Completed").
    2. In the frontend, implement the logic to filter the displayed tasks based on the selected filter. This can be done client-side by manipulating the state.

### Task 8: Styling
- **Goal:** Improve the visual appearance of the application.
- **Steps:**
    1. Use CSS (e.g., `app/globals.css` and Tailwind CSS which is included in the template) to style the application.
    2. Focus on creating a clean and intuitive layout.
    3. Ensure that completed tasks are visually distinct from active tasks.

### Task 9 (Optional): Editing Tasks
- **Goal:** Allow users to edit the title of an existing task.
- **Steps:**
    1. Add an `EditTask(id int, newTitle string) error` function to the backend.
    2. In the frontend, add an "Edit" button to each task.
    3. When "Edit" is clicked, show an input field with the current title. On save, call the `EditTask` function and update the UI.
