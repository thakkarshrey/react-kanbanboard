# react-kanbanify

[![npm version](https://img.shields.io/npm/v/react-kanbanify.svg)](https://www.npmjs.com/package/react-kanbanify)  
[![license](https://img.shields.io/npm/l/react-kanbanify.svg)](LICENSE)  
[![npm downloads](https://img.shields.io/npm/dm/react-kanbanify.svg)](https://www.npmjs.com/package/react-kanbanify)

**react-kanbanify** is a user-friendly Kanban board library for React, enabling effortless task management and workflow visualization.

---

## **Features**

- 🖱️ **Drag-and-Drop Functionality**: Organize tasks with ease.
- ⚛️ **React-Friendly**: Built with React for smooth integration into your projects.
- 📋 **Dynamic Task Management**: Add, edit, or delete tasks seamlessly.

---

## **Installation**

Install the library via npm:

```bash
npm install react-kanbanify
```

## **Screenshot**

![App Screenshot](./assets/react-kanbanify.png)

## **Basic Usage**

```tsx
import { useState } from "react";
import { ColumnProps, Kanban, TaskProps } from "react-kanbanboard";
import "react-kanbanboard/dist/styles.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, content: "Analyze the new requirements.", columnId: "todo" },
    {
      id: 2,
      content: "Arrange a web metting with the customer.",
      columnId: "todo",
    },
    {
      id: 3,
      content: "Improve application performance.",
      columnId: "in_progress",
    },
    {
      id: 4,
      content: "Fix the issues reported in the IE browser.",
      columnId: "in_progess",
    },
    {
      id: 5,
      content: "Fix the issues reported by the customer.",
      columnId: "testing",
    },
    {
      id: 6,
      content: "Check login page validation.",
      columnId: "testing",
    },
    { id: 7, content: "Login and sign up flow.", columnId: "done" },
  ]);

  const columns = [
    { id: "todo", label: "To do" },
    { id: "in_progress", label: "In Progess" },
    { id: "testing", label: "Testing" },
    { id: "done", label: "Done" },
  ];

  return (
    <>
      <Kanban
        ColumnComponent={ColumnComponent}
        TaskComponent={TaskComponent}
        tasks={tasks}
        setTasks={setTasks}
        columns={columns}
      />
    </>
  );
}

export default App;
```

```tsx
const TaskComponent = ({ task }: TaskProps) => {
  return <div className="task-container">{task.content}</div>;
};
```

```tsx
const ColumnComponent = ({ column }: ColumnProps) => {
  return (
    <>
      <div className="column-container">{column.label}</div>
      <hr />
    </>
  );
};
```

## **Props**

| Prop              | Type            | Description                                                         | Default     |
| ----------------- | --------------- | ------------------------------------------------------------------- | ----------- |
| `ColumnComponent` | `ReactNode`     | Custom component to render each column in the Kanban board.         | `null`      |
| `TaskComponent`   | `ReactNode`     | Custom component to render each task inside a column.               | `null`      |
| `tasks`           | `array<object>` | Array of task objects. See [tasks](#tasks) for the structure.       | `[]`        |
| `setTasks`        | `function`      | Function to update the list of tasks dynamically.                   | `undefined` |
| `columns`         | `array<object>` | Array of column objects. See [columns](#columns) for the structure. | `[]`        |

Following is the detailed representation of tasks and columns :

### tasks

`tasks` is an array of objects. Each object represents a task with the following keys:

| Key        | Type     | Description                                 | Example                          |
| ---------- | -------- | ------------------------------------------- | -------------------------------- |
| `id`       | `string` | Unique identifier for the task.             | `"1"`                            |
| `content`  | `string` | Content of the task.                        | `"Analyze the new requirements"` |
| `columnId` | `string` | Status or column to which the task belongs. | `"in_progress"`                  |

**Example:**

```json
[
  {
    "id": 2,
    "content": "Arrange a web metting with the customer.",
    "columnId": "todo"
  },
  {
    "id": 3,
    "content": "Improve application performance.",
    "columnId": "in_progress"
  }
]
```

---

### columns

`columns` is an array of objects. Each object represents a column with the following keys:

| Key     | Type     | Description                       | Example   |
| ------- | -------- | --------------------------------- | --------- |
| `id`    | `string` | Unique identifier for the column. | `"1"`     |
| `label` | `string` | Label of the column.              | `"To Do"` |

**Example:**

```json
[
  {
    "id": "todo",
    "label": "To do"
  },
  {
    "id": "in_progress",
    "label": "In Progess"
  }
]
```

## **Styling**

To use the default styles, ensure you import the CSS file:

```tsx
import "react-kanbanify/dist/styles.css";
```

## **Contributing**

We welcome contributions! Here’s how you can help:

1. **Fork this repository**: Click on the "Fork" button at the top of this repository to create your own copy.

2. **Make your changes**: Clone your fork, create a new branch, and make your changes.

3. **Submit a pull request**: Push your changes to your forked repository and create a pull request to this repository.

For major changes, please **open an issue first** to discuss what you’d like to change. This helps us review and address your suggestions more efficiently.

Thank you for contributing to `react-kanbanify`! 💙

## **Support**

We’re here to help! If you encounter any issues or have questions:

- **File an Issue**: Please report bugs or feature requests by [filing an issue](https://github.com/thakkarshrey/react-kanbanboard/issues).
- **Contact**: For additional support, email us at [thakkarshrey10.st@gmail.com](mailto:thakkarshrey10.st@gmail.com).
