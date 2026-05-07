"use client";

import { useState } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoInput from "./components/TodoInput";
import FilterTabs from "./components/FilterTabs";
import TodoItem from "./components/TodoItem";
import { FilterType } from "./types";

export default function Home() {
  const { todos, initialized, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">할일 리스트</h1>
          <p className="text-sm text-gray-500 mt-1">로컬 스토리지에 자동 저장됩니다</p>
        </div>

        <TodoInput onAdd={addTodo} />

        <FilterTabs current={filter} onChange={setFilter} counts={counts} />

        {!initialized ? (
          <p className="text-center text-gray-400 py-8">불러오는 중...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            {filter === "completed" ? "완료된 항목이 없습니다" : "할일을 추가해보세요!"}
          </p>
        ) : (
          <ul className="space-y-2">
            {filtered.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        )}

        {counts.completed > 0 && (
          <div className="text-right">
            <button
              onClick={clearCompleted}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              완료된 항목 모두 삭제 ({counts.completed})
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
