import React from 'react';
import { io } from 'socket.io-client';
import { HashRouter, Route } from '../lib/hash-router';

export default function App() {

  const socketRef = React.useRef(null);

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
      <HashRouter>
        <Route path="#foo">
          <h1>Hello, Foo!</h1>
        </Route>
        <Route path="#bar">
          <h1>Hello, Bar!</h1>
        </Route>
        <Route path="#baz">
          <h1>Hello, Baz!</h1>
        </Route>
      </HashRouter>
    </>
  );
}
