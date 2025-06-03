# user_Todolist

        # 📝 Personal User TodoList

A React + Supabase-based Todo app where each user can manage their own personal task list securely. It supports user authentication and private todo management—each user's data is only visible to them.

---

## 🔧 Tech Stack

- ⚛️ React (with functional components & hooks)
- 🎨 Tailwind CSS (for styling)
- 🛡 Supabase (Auth + Database)

---

## 📁 Folder Structure

        
---

## 🧠 How It Works

### 🔁 Authentication Flow

- **Root.jsx**  
  - Checks if a user session exists using Supabase Auth.
  - If user is logged in: renders `App.jsx`.
  - If not: renders `Signup.jsx` for login or signup.

- **Signup.jsx**  
  - Provides UI to sign up or log in.
  - On success, updates `Root.jsx` with the current user session.

---

### ✅ Todo Functionality

- **App.jsx**  
  - Fetches todos where `user_id` equals the logged-in user's ID.
  - Allows adding, editing, deleting, and toggling task completion.

- **TodoForm.jsx**  
  - A simple form to add new tasks to the current user's list.

- **TodoList.jsx**  
  - Displays all tasks.
  - Each item includes:
    - Toggle complete
    - Edit task
    - Delete task

---

## 🛠 Setup Instructions

### 1. Clone the Project

```bash
git clone https://github.com/yourusername/personal-user-todolist.git
cd personal-user-todolist

