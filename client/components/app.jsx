import React from 'react';
import { io } from 'socket.io-client';
import { Router, Route, Link } from '../lib/router';

export default function App() {

  const socketRef = React.useRef(null);

  React.useEffect(() => {
    socketRef.current = io('/');
    return () => socketRef.current.disconnect();
  }, []);

  return (
    <Router>
      <h1>Dev Middleware</h1>
      <ul>
        <li><Link href="/foo">Foo</Link></li>
        <li><Link href="/bar">Bar</Link></li>
        <li><Link href="/baz">Baz</Link></li>
      </ul>
      <Route path="/">
        <h1>Home</h1>
      </Route>
      <Route path="/foo">
        <h1>Hello, Foo!</h1>
      </Route>
      <Route path="/bar">
        <h1>Hello, Bar!</h1>
      </Route>
      <Route path="/baz">
        <h1>Hello, Baz!</h1>
      </Route>
    </Router>
  );
}
