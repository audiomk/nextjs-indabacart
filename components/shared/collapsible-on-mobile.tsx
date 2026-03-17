'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import useDeviceType from '@/hooks/use-device-type'
import { Button } from '../ui/button'

export default function CollapsibleOnMobile({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()
  const deviceType = useDeviceType()

  // 1. Initialize state based on deviceType to avoid the first "cascading" render
  const [open, setOpen] = useState(deviceType === 'desktop')

  // 2. Only use useEffect for the "Side Effect" of closing when filters change
  useEffect(() => {
    if (deviceType === 'mobile') {
      setOpen(false)
    }
  }, [searchParams, deviceType])
  // We remove the 'else if desktop' logic from the effect because
  // desktop should stay open regardless of search param changes.

  if (deviceType === 'unknown') return null

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        {deviceType === 'mobile' ? (
          <Button
            variant={'outline'}
            className='w-full'
            // Let the CollapsibleTrigger handle the toggle naturally
            // or use onOpenChange on the Root.
          >
            {title}
          </Button>
        ) : (
          /* On desktop, we still need a trigger for accessibility 
             but we can hide it or make it non-functional */
          <div className='font-bold pb-2'>{title}</div>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  )
}
