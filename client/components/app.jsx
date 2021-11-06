import React from 'react'

export default function App() {

  const [clicks, setClicks] = React.useState(0)

  const handleClick = React.useCallback(() => {
    setClicks(clicks => clicks + 1)
  }, [])

  return (
    <>
      <h1>Dev Middlewares</h1>
      <button onClick={handleClick}>Clicks {clicks}</button>
    </>
  )
}
