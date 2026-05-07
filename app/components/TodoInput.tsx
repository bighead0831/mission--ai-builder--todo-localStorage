"use client";

import { useState } from "react";

interface Props {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    onAdd(value);
    setValue("");
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          // isComposing prevents double-submit on Korean/CJK IME Enter confirmation
          if (e.key === "Enter" && !e.nativeEvent.isComposing) handleSubmit();
        }}
        placeholder="할일을 입력하세요..."
        className="flex-1 px-4 py-2 rounded-lg border border-[#DDD5C8] bg-white text-[#1C1917] placeholder-[#B5AEA7] focus:outline-none focus:ring-2 focus:ring-[#1C1917]"
      />
      <button
        onClick={handleSubmit}
        className="px-5 py-2 bg-[#1C1917] hover:bg-[#44403C] text-white rounded-lg font-medium transition-colors"
      >
        추가
      </button>
    </div>
  );
}
