// import { useEffect, useState } from 'react'

// function useIsMounted() {
//   const [isMounted, setIsMounted] = useState(false)

//   useEffect(() => {
//     setIsMounted(true)
//   }, [])

//   return isMounted
// }

// export default useIsMounted

import { useEffect, useState } from 'react'

function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // requestAnimationFrame ensures the update happens
    // after the initial paint, satisfying the "no-cascade" rule.
    const frame = requestAnimationFrame(() => {
      setIsMounted(true)
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  return isMounted
}

export default useIsMounted
