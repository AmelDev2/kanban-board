# Kanban Task Management Web Application

A feature-rich Kanban task management web application built with React, allowing users to efficiently organize tasks, manage multiple boards, customize columns, and seamlessly drag and drop tasks across columns.

🔗 **Live Preview:** [https://kanban-board-one-liard.vercel.app/](https://kanban-board-one-liard.vercel.app/)[cite: 1]

---

## 🚀 Features

- **Multi-Board Management**: Create, edit, and delete multiple boards dynamically with persistent state using `localStorage`.
- **Dynamic Columns & Tasks**: Add, customize, and remove workflow columns and individual tasks within each board.
- **Advanced Drag and Drop**: Powered by `@dnd-kit` with support for sorting items locally and moving tasks across different columns seamlessly.
- **State Management & Immutability**: Utilizes **Immer** for clean, predictable state updates paired with React Context API.
- **Accessible UI Primitives**: Built using **Radix UI** primitives (Dialogs and Dropdowns) for robust and accessible components.
- **Modern UI Design**: Styled with **Tailwind CSS** and custom typography variables.

> **⚠️ Note on Responsiveness**: This application is currently optimized and designed for desktop screens and larger viewports.

---

## 🛠️ Tech Stack

- **React** (Component-based architecture & Hooks)
- **Tailwind CSS** (Styling, layout, and custom theme configuration)
- **@dnd-kit** (Core, Sortable, and Utilities for Drag and Drop mechanics)
- **Immer** (Immutable state management updates)
- **Radix UI** (Accessible primitives for modals and dropdown menus)
- **Context API** (Global state sharing across components)

---

## ⚙️ Getting Started

To run this project locally, follow these steps:

**1. Clone the repository:**
   ```bash
   git clone [https://github.com/AmelDev2/kanban-board.git](https://github.com/AmelDev2/kanban-board.git)
   ```

**2. Navigate to the project directory: **
```bash 
cd kanban-board
```


**3. Install dependencies:**
```bash 
npm install
```


**4. Run the development server:**

```bash 
npm run dev
```

**5. Open your browser:**

Visit the local development URL provided in your terminal (usually http://localhost:5173).
