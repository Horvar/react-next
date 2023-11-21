import '../index.css';
import { AppProps } from 'next/app';
import SearchProvider from '../context/searchContext';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider store={store}>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </ReduxProvider>
  );
};

export default App;
