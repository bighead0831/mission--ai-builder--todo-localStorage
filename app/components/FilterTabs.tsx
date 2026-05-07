"use client";

import { FilterType } from "../types";

interface Props {
  current: FilterType;
  onChange: (filter: FilterType) => void;
  counts: { all: number; active: number; completed: number };
}

const TABS: { key: FilterType; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "active", label: "미완료" },
  { key: "completed", label: "완료" },
];

export default function FilterTabs({ current, onChange, counts }: Props) {
  return (
    <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
            current === key
              ? "bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400"
              : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          {label}
          <span className="ml-1.5 text-xs bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded-full">
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  );
}
