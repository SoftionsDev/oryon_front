import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { Theme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';

const App = () => {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <Theme>
        <AuthProvider>{content}</AuthProvider>
      </Theme>
    </SettingsProvider>
  );
};

export default App;
