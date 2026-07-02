"use client";

import { useState } from "react";
import { Plus } from 'lucide-react';

export default function Counter() {
    const [ count, setCount] = useState(0);

    return (
        <section className="mt-6 rounded-lg border border-gray-200 p-5">
        <h2 className="text-xl font-semibold">Counter</h2>

        <p className="mt-2 text-white">
            Current count: <strong>{count}</strong>
        </p>

        <button
            onClick={() => setCount(count + 1)}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
            <Plus />
        </button>
        </section>
    );
}