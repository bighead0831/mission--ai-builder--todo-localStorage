"use client";

import { Todo } from "../types";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#E8E2D9] group shadow-sm">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 accent-[#1C1917] cursor-pointer flex-shrink-0"
      />
      <span
        className={`flex-1 text-sm break-all ${
          todo.completed ? "line-through text-[#C4BDB4]" : "text-[#1C1917]"
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-[#C4BDB4] hover:text-red-400 transition-all text-lg leading-none"
        aria-label="삭제"
      >
        ×
      </button>
    </li>
  );
}
