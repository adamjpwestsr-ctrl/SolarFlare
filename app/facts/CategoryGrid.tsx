"use client";

import { useRouter } from "next/navigation";

interface Props {
  categories: string[];
}

export default function CategoryGrid({ categories }: Props) {
  const router = useRouter();

  function handleClick(category: string) {
    router.push(`/facts/${encodeURIComponent(category)}`);
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className="bg-indigo-800 rounded-2xl p-4 text-center shadow-lg hover:bg-indigo-600 transition text-lg"
        >
          {category}
        </button>
      ))}
    </div>
  );
}
