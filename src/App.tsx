import React, { useEffect } from 'react';
import { MemoryRouter } from 'react-router';
import Layout from './components/Layout';
import Routes from './pages/Routes';
import { Provider } from './store/store';
import { listen } from '@tauri-apps/api/event';

function App() {
  useEffect(() => {
    let unlisten_ytdl_output: any;

    async function init_listeners() {
      unlisten_ytdl_output = await listen<any>('ytdl_output', event => {
        // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
        // event.payload is the payload object
        console.log('RECIEVED EVENT:', event);
      });
    }

    return () => {
      if (unlisten_ytdl_output) {
        unlisten_ytdl_output();
      }
    };
  }, []);

  return (
    <Provider>
      <MemoryRouter>
        <Layout>
          <Routes />
        </Layout>
      </MemoryRouter>
    </Provider>
  );
}

export default App;
