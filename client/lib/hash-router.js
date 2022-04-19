import React from 'react'

export function useHashRouter() {
  const router = React.useContext(HashRouterContext)
  return router
}

export function Redirect(props) {
  const router = useHashRouter()
  useEffect(() => router.redirect(props.to), [])
}

export function HashRouter({ children }) {

  const [hash, setHash] = React.useState(window.location.hash)

  const router = React.useMemo(() => {
    const hashRoute = hash.replace(/^#/, '')
    const [path, search = ''] = hashRoute.split('?')
    const params = new URLSearchParams(search)
    return { path, params, redirect, navigate }
  }, [hash])

  React.useEffect(() => {
    const handleHashchange = () => setHash(() => window.location.hash)
    window.addEventListener('hashchange', handleHashchange)
    return () => window.removeEventListener('hashchange', handleHashchange)
  }, [])

  return React.createElement(HashRouterContext.Provider, {
    value: router,
    children
  })
}

const redirect = hash => {
  const url = new URL(window.location.href)
  url.hash = hash
  window.location.replace(url)
}

const navigate = hash => {
  window.location.hash = hash
}

const HashRouterContext = React.createContext({
  path: '',
  params: new URLSearchParams,
  navigate: hash => { },
  redirect: hash => { }
})
