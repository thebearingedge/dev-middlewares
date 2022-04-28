import React from 'react';
import { io } from 'socket.io-client';
import { Router, Route, Link } from '../lib/hook-router';

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
        <li><Link href="/">Home</Link></li>
        <li><Link href="/foo">Foo</Link></li>
        <li><Link href="/bar">Bar</Link></li>
        <li><Link href="/baz">Baz</Link></li>
      </ul>
      <Route path="/">
        <h2>Home</h2>
      </Route>
      <Route path="/foo">
        <h2>Hello, Foo!</h2>
      </Route>
      <Route path="/bar">
        <h2>Hello, Bar!</h2>
      </Route>
      <Route path="/baz">
        <h2>Hello, Baz!</h2>
      </Route>
    </Router>
  );
}
