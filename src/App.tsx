import { useState } from "react";
import { Modal } from "../playground/Modal/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Example Modal">
        <p>This is modal content.</p>
        <input placeholder="Try tabbing here" />
      </Modal>
    </div>
  );
}

export default App;