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
    <div className="flex gap-1 bg-[#EDE8DF] p-1 rounded-lg">
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors ${
            current === key
              ? "bg-white shadow text-[#1C1917]"
              : "text-[#A8A29E] hover:text-[#57534E]"
          }`}
        >
          {label}
          <span className="ml-1.5 text-xs bg-[#DDD7CE] px-1.5 py-0.5 rounded-full text-[#78716C]">
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  );
}
