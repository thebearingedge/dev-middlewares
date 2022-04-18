import React from 'react'
import io from 'socket.io-client'

export default function App() {

  const socketRef = React.useRef(null)
  const [clicks, setClicks] = React.useState(0)

  const handleClick = React.useCallback(() => {
    setClicks(clicks => clicks + 1)
  }, [])

  React.useEffect(() => {
    socketRef.current = io('/')
    return () => { socketRef.current.disconnect() }
  }, [])

  return (
    <>
      <h1>Dev Middleware</h1>
      <button onClick={handleClick}>Clicks {clicks}</button>
    </>
  )
}
