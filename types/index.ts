import { ProductInputSchema } from '@/lib/validator'
import { z } from 'zod'

// This defines the type once using the schema from your validator
export type IProductInput = z.infer<typeof ProductInputSchema>

export type Data = {
  products: IProductInput[]
  headerMenus: {
    name: string
    href: string
  }[]
  carousels: {
    image: string
    url: string
    title: string
    buttonCaption: string
    isPublished: boolean
  }[]
}
