import React from 'react';
import { io } from 'socket.io-client';
import { useHashRouter } from '../lib/hash-router';

export default function App() {

  const router = useHashRouter();
  const socketRef = React.useRef(null);

  // eslint-disable-next-line no-console
  console.log('router path:', router.path);

  React.useEffect(() => {
    socketRef.current = io('/');
    return () => socketRef.current.disconnect();
  }, []);

  return (
    <>
      <h1>Dev Middleware</h1>
      <ul>
        <li><a href="#foo">Foo</a></li>
        <li><a href="#bar">Bar</a></li>
        <li><a href="#baz">Baz</a></li>
      </ul>
    </>
  );
}
