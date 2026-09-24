import { useState } from "react";
import { Modal } from "../playground/Modal/Modal";
import { Tabs } from "../playground/Tabs/Tabs";
import { Disclosure } from "../playground/Disclosure/Disclosure";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-gray-100">
      <h1 className="mb-8 text-2xl font-bold text-white">Accessible Components Playground</h1>

      <section className="mb-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Browse by Genre</h2>
        <Tabs
          tabs={[
            {
              id: "fiction",
              label: "Fiction",
              content: <p>Browse novels, short stories, and literary fiction from our collection.</p>,
            },
            {
              id: "nonfiction",
              label: "Non-fiction",
              content: <p>Explore biographies, history, and essays grounded in real events.</p>,
            },
            {
              id: "scifi",
              label: "Sci-Fi",
              content: <p>Discover speculative fiction, space opera, and dystopian futures.</p>,
            },
          ]}
        />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Details</h2>
        <Disclosure summary="Book description">
          <p>
            A gripping story about a young wizard discovering his magical
            heritage, and the friends and adventures he finds along the way.
          </p>
        </Disclosure>
      </section>
    </div>
  );
}

export default App;