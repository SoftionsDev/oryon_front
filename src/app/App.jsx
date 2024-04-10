import '../fake-db';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { Theme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Store } from './redux/Store';
import routes from './routes';

const App = () => {
  const content = useRoutes(routes);

  return (
    <Provider store={Store}>
      <SettingsProvider>
        <Theme>
          <AuthProvider>{content}</AuthProvider>
        </Theme>
      </SettingsProvider>
    </Provider>
  );
};

export default App;
