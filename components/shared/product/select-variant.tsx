import { Button } from '@/components/ui/button'
import { IProduct } from '@/lib/db/models/product.model'
import Link from 'next/link'

export default function SelectVariant({
  product,
  size,
  color,
}: {
  product: IProduct
  color: string
  size: string
}) {
  // Fallback to first available option if none selected
  const selectedColor =
    color || (product.colors.length > 0 ? product.colors[0] : '')
  const selectedSize =
    size || (product.sizes.length > 0 ? product.sizes[0] : '')

  return (
    <>
      {product.colors.length > 0 && (
        <div className='space-y-2'>
          <div className='text-sm font-medium'>Color:</div>
          <div className='flex flex-wrap gap-2'>
            {product.colors.map((x: string) => (
              <Button
                asChild
                variant='outline'
                size='sm'
                className={
                  selectedColor === x ? 'border-2 border-primary' : 'border-2'
                }
                key={x}
              >
                <Link
                  replace
                  scroll={false}
                  href={`?${new URLSearchParams({
                    color: x,
                    ...(selectedSize && { size: selectedSize }),
                  })}`}
                >
                  <div
                    style={{ backgroundColor: x.toLowerCase() }}
                    className='h-4 w-4 rounded-full border border-muted-foreground mr-2'
                  ></div>
                  {x}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div className='mt-4 space-y-2'>
          <div className='text-sm font-medium'>Size:</div>
          <div className='flex flex-wrap gap-2'>
            {product.sizes.map((x: string) => (
              <Button
                asChild
                variant='outline'
                size='sm'
                className={
                  selectedSize === x ? 'border-2 border-primary' : 'border-2'
                }
                key={x}
              >
                <Link
                  replace
                  scroll={false}
                  href={`?${new URLSearchParams({
                    ...(selectedColor && { color: selectedColor }),
                    size: x,
                  })}`}
                >
                  {x}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
