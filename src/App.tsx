import { Header } from "./components/Header";
import { useToggleTheme } from "./hooks/useToggleTheme";

function App() {
    const { theme, toggleTheme } = useToggleTheme();
    
    return (
        <div class="container mx-auto p-4 max-w-lg min-h-screen">
            <Header theme={theme} toggleTheme={toggleTheme} />
        </div>
    );
}

export default App;
