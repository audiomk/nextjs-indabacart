/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image'
import { useState, useRef } from 'react'

const ImageHover = ({
  src,
  hoverSrc,
  alt,
}: {
  src: string
  hoverSrc: string
  alt: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  // Use a ref to store the timeout ID so it persists across renders
  const hoverTimeoutRef = useRef<any>(null)

  const handleMouseEnter = () => {
    // Clear any existing timeout before starting a new one (safety check)
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)

    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true)
    }, 1000) // 1 second delay
  }

  const handleMouseLeave = () => {
    // Clear the timeout if the user leaves before the 1 second is up
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsHovered(false)
  }

  return (
    <div
      className='relative h-52'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes='80vw'
        className={`object-contain transition-opacity duration-500 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <Image
        src={hoverSrc}
        alt={alt}
        fill
        sizes='80vw'
        className={`absolute inset-0 object-contain transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

export default ImageHover
