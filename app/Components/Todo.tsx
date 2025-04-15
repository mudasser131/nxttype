import { Todo } from "../types/todo"; // Import the Todo type

// Define the props expected by the TodoItem component
interface Props {
  todo: Todo;                           // Single todo item
  toggleComplete: (id: number) => void; // Function to mark as complete
  deleteTodo: (id: number) => void;     // Function to delete todo
}

const TodoItem: React.FC<Props> = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className="flex justify-between items-center bg-gray-110 p-4 rounded-lg shadow">
      {/* Click on text to toggle completion */}
      <span
        className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </span>

      {/* Delete button */}
      <button className="text-red-500" onClick={() => deleteTodo(todo.id)}>
        ❌
      </button>
    </div>
  );
};

export default TodoItem;
