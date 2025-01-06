import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { getPayloadClient } from "@/getPayload"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatPrice } from "@/lib/utils"
import { Check, Shield, X } from "lucide-react"
import Slider from "@/components/Slider"
import ProductReel from "@/components/ProductReel"
import AddCartButton from "@/components/AddToCartButton"
import { Category } from "../../../payload-types"


interface PageProps {
  params: {
    productId: string
  }
}

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Catalogo', href: '/products' },
]

const Page = async ({ params }: PageProps) => {
  const { productId } = params

  const payload = await getPayloadClient()

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  })

  const [product] = products
  if (!product) { return notFound() }

  const [category] = product.category as Category[]
  const label = category.name

  const validUrls = product.images
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[]

  return (
    <>
      <div className='bg-white'>
      <ol className='flex items-center mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl' >
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className='flex items-center text-sm'>
                    <Link
                      href={breadcrumb.href}
                      className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-18 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-6'>
          {/*imagen del producto*/}
          <div className="mt-10 lg:col-start-1 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              <Slider urls={validUrls} />
            </div>
          </div>

          {/* Product Details */}
          <div className='lg:max-w-lg lg:self-start lg:col-start-2'>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4x1">
                {product.name}
              </h1>

            <section className="pt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {formatPrice(product.price)}
                </p>

                <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                  {label}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-700">
                  {product.description}
                </p>
              </div>
            </section>
          </div>

          {/* añadir al carro */}
          <div className=" lg:col-start-2 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>

              <div className="mt-6 ">
                <AddCartButton product={product} />
              </div>
              
              <div className="mt-6 text center">
              </div>
            </div>
          </div>

        </div>

        <ProductReel href="/products"
          query={{ category: [category.name], limit: 4 }}
          title={`${label} Similares`}
          subtitle={`Productos similares a '${product.name}' para explorar.`}
        />

      </div>
    </>
  )
}
export default Page
