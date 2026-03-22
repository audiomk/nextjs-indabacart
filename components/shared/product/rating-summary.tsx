'use client'

import { Progress } from '@/components/ui/progress'
import Rating from './rating'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { ChevronDownIcon } from 'lucide-react'

type RatingSummaryProps = {
  asPopover?: boolean
  avgRating: number
  numReviews: number
  ratingDistribution: {
    rating: number
    count: number
  }[]
}

// 1. Define this OUTSIDE the main component
const RatingDistribution = ({
  ratingDistribution,
  numReviews,
  avgRating,
}: Omit<RatingSummaryProps, 'asPopover'>) => {
  const t = useTranslations()
  const ratingPercentageDistribution = ratingDistribution.map((x) => ({
    ...x,
    // Fix: Handle division by zero
    percentage: numReviews > 0 ? Math.round((x.count / numReviews) * 100) : 0,
  }))

  return (
    <>
      <div className='flex flex-wrap items-center gap-1 cursor-help'>
        <Rating rating={avgRating} />
        <span className='text-lg font-semibold'>
          {t('Product.avgRating out of 5', {
            avgRating: avgRating.toFixed(1),
          })}
        </span>
      </div>
      <div className='text-lg '>
        {t('Product.numReviews ratings', { numReviews })}
      </div>

      <div className='space-y-3'>
        {ratingPercentageDistribution
          .sort((a, b) => b.rating - a.rating)
          .map(({ rating, percentage }) => (
            <div
              key={rating}
              className='grid grid-cols-[50px_1fr_30px] gap-2 items-center'
            >
              <div className='text-sm'>
                {' '}
                {t('Product.rating star', { rating })}
              </div>
              <Progress value={percentage} className='h-4' />
              <div className='text-sm text-right'>{percentage}%</div>
            </div>
          ))}
      </div>
    </>
  )
}

export default function RatingSummary({
  asPopover,
  avgRating = 0,
  numReviews = 0,
  ratingDistribution = [],
}: RatingSummaryProps) {
  const t = useTranslations() // ← add this
  const distributionProps = { ratingDistribution, numReviews, avgRating }
  // ...rest unchanged

  return asPopover ? (
    <div className='flex items-center gap-1'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='ghost' className='px-2 [&_svg]:size-6 text-base'>
            <span>{avgRating.toFixed(1)}</span>
            <Rating rating={avgRating} />
            <ChevronDownIcon className='w-5 h-5 text-muted-foreground' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-4' align='end'>
          <div className='flex flex-col gap-2'>
            {/* 3. Render the external component with props */}
            <RatingDistribution {...distributionProps} />
            <Separator />

            <Link className='highlight-link text-center' href='#reviews'>
              {t('Product.See customer reviews')}
            </Link>
          </div>
        </PopoverContent>
      </Popover>
      <div className=' '>
        <Link href='#reviews' className='highlight-link'>
          {t('Product.numReviews ratings', { numReviews })}
        </Link>
      </div>
    </div>
  ) : (
    <RatingDistribution {...distributionProps} />
  )
}
