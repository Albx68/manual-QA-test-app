import "./App.css";
import BuggyTodoApp from "./components/BuggyTodo";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BuggyTodoApp />
      </ThemeProvider>
    </>
  );
}

export default App;
