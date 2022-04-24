import React from 'react';

export function useHashRouter() {
  const router = React.useContext(HashRouterContext);
  return router;
}

export function Redirect(props) {
  const router = useHashRouter();
  React.useEffect(() => router.redirect(props.to), []);
  return null;
}

export function Route({ path, ...props }) {
  const router = useHashRouter();
  if (path !== router.path) return null;
  if (props.children != null) return props.children;
  if (props.component != null) {
    return React.createElement(
      props.component,
      { ...props, router }
    );
  }
  return null;
}

export function HashRouter({ children }) {

  const [hash, setHash] = React.useState(window.location.hash);

  const router = React.useMemo(() => {
    const [path, search = ''] = hash.replace(/^#/, '').split('?');
    const params = Object.fromEntries(new URLSearchParams(search));
    return { path: '#' + path, params, redirect, navigate };
  }, [hash]);

  React.useEffect(() => {
    const handleHashchange = () => setHash(() => window.location.hash);
    window.addEventListener('hashchange', handleHashchange);
    return () => window.removeEventListener('hashchange', handleHashchange);
  }, []);

  return React.createElement(
    HashRouterContext.Provider,
    { value: router },
    children
  );
}

const redirect = hash => {
  const url = new URL(window.location.href);
  url.hash = hash;
  window.location.replace(url);
};

const navigate = hash => {
  window.location.hash = hash;
};

const HashRouterContext = React.createContext({
  path: '',
  params: {},
  navigate: () => {},
  redirect: () => {}
});
