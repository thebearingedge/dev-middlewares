import React from 'react';

const RouterContext = React.createContext({
  url: new URL('/', window.location.href),
  navigate: () => {},
  redirect: () => {}
});

export function Router({ children }) {
  const [url, setUrl] = React.useState(() => new URL(window.location.href));
  const router = React.useMemo(() => ({
    url,
    navigate: to => {
      const url = new URL(to, window.location.href);
      if (url.href === window.location.href) return;
      window.history.pushState(null, '', url);
      setUrl(() => url);
    },
    redirect: to => {
      const url = new URL(to, window.location.href);
      if (url.href === window.location.href) return;
      window.history.replaceState(null, '', url);
      setUrl(() => url);
    }
  }), [url]);
  React.useEffect(() => {
    const handlePopState = () => setUrl(() => new URL(window.location.href));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  return React.createElement(
    RouterContext.Provider,
    { value: router },
    children
  );
}

export function Redirect({ to }) {
  const router = React.useContext(RouterContext);
  React.useEffect(() => router.redirect(to), []);
  return null;
}

export function Route({ path, component, children }) {
  const router = React.useContext(RouterContext);
  if (path !== router.url.pathname) return null;
  if (component) return React.createElement(component, { router });
  if (children) return children;
  return null;
}

export const Link = React.forwardRef(Object.assign((props, ref) => {
  const router = React.useContext(RouterContext);
  const onClick = React.useCallback(event => {
    event.preventDefault();
    router.navigate(event.target.href);
  }, []);
  return React.createElement('a', { ...props, ref, onClick });
}, { displayName: 'Link' }));

export function useRouter() {
  return React.useContext(RouterContext);
}
