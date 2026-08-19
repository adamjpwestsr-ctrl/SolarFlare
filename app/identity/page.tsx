import NewExplorer from "./NewExplorer";
import ReturningExplorer from "./ReturningExplorer";

export const metadata = {
  hideNav: true,
  title: "Cosmic Identity Terminal"
};

export default function IdentityPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <IdentitySelector />
    </div>
  );
}

// Client component moved OUTSIDE the page
function IdentitySelector() {
  "use client";

  // Import INSIDE the client component
  const { useState } = require("react");

  const [mode, setMode] = useState<"new" | "return" | null>(null);

  return (
    <>
      {!mode && (
        <>
          <h1 className="text-4xl font-bold mb-6">Cosmic Identity Terminal</h1>
          <p className="opacity-80 mb-10">Who are you, explorer?</p>

          <div className="flex gap-6">
            <button
              onClick={() => setMode("new")}
              className="bg-indigo-700 hover:bg-indigo-600 p-4 rounded-2xl text-xl"
            >
              Yes, I’m new!
            </button>

            <button
              onClick={() => setMode("return")}
              className="bg-purple-700 hover:bg-purple-600 p-4 rounded-2xl text-xl"
            >
              No, I’ve been here before.
            </button>
          </div>
        </>
      )}

      {mode === "new" && <NewExplorer />}
      {mode === "return" && <ReturningExplorer />}
    </>
  );
}
