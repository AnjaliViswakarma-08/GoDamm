import { AuthProvider } from './context/AuthContext';
import { useTheme } from './hooks/useTheme';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <AuthProvider>
      <AppRoutes darkMode={darkMode} onToggleTheme={toggleTheme} />
    </AuthProvider>
  );
}

export default App;