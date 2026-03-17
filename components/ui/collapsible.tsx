'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

// Radix Root component for the collapsible state
const Collapsible = CollapsiblePrimitive.Root

// The Trigger supports the 'asChild' prop for your Search filters
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

// The Content handles the sliding height animations via CSS variables
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
