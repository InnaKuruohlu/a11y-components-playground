import { useState } from "react";
import { Modal } from "../playground/Modal/Modal";
import { Tabs } from "../playground/Tabs/Tabs";
import { Disclosure } from "../playground/Disclosure/Disclosure";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Example Modal">
        <p>This is modal content.</p>
        <input placeholder="Try tabbing here" />
      </Modal>

      <div style={{ marginTop: "2rem" }}>
        <Tabs
          tabs={[
            { id: "tab1", label: "First Tab", content: <p>Content for first tab</p> },
            { id: "tab2", label: "Second Tab", content: <p>Content for second tab</p> },
            { id: "tab3", label: "Third Tab", content: <p>Content for third tab</p> },
          ]}
        />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Disclosure summary="Click to expand">
          <p>This content is hidden until expanded.</p>
        </Disclosure>
      </div>
    </div>
  );
}

export default App;