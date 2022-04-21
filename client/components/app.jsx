import React from 'react';
import { useHashRouter } from '../lib/hash-router';

export default function App() {

  const router = useHashRouter();

  // eslint-disable-next-line no-console
  console.log('router path:', router.path);

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
