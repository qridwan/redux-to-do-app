import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";

function App() {
  const [colorFilter, setColorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  return (
    <Provider store={store}>
      <div className="grid place-items-center bg-blue-100 h-screen px-6 font-sans">
        <Navbar />
        <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
          <Header />
          <hr className="mt-4" />
          <TodoList colorFilter={colorFilter} statusFilter={statusFilter} />
          <hr className="mt-4" />
          <Footer
            setColorFilter={setColorFilter}
            setStatusFilter={setStatusFilter}
            colorFilter={colorFilter}
            statusFilter={statusFilter}
          />
        </div>
      </div>
    </Provider>
  );
}

export default App;
