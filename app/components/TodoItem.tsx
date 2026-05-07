"use client";

import { Todo } from "../types";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 accent-blue-500 cursor-pointer flex-shrink-0"
      />
      <span
        className={`flex-1 text-sm break-all ${
          todo.completed ? "line-through text-gray-400" : "text-gray-800 dark:text-gray-200"
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all text-lg leading-none"
        aria-label="삭제"
      >
        ×
      </button>
    </li>
  );
}
