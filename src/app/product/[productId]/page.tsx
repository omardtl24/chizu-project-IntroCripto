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

// Badge Component
const Badge = ({ children, className = '', variant = 'default', ...props }) => {
  const baseStyles = "inline-flex items-center rounded-md px-2 py-1 text-sm text-black font-medium ring-1 ring-inset";
  const variants = {
    default: "bg-blue-500 text-white ring-blue-600",
    secondary: "bg-gray-700 text-black-200 ring-gray-600"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

// Card Component
const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`rounded-lg  bg-card text-card-foreground shadow-xl ${className}`} {...props}>
      {children}
    </div>
  );
};

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
  const label = [category.name]

  product.reviews = product.reviews ?? [
    {
      username: 'PandaLunar12',
      rating: 5,
      comment: 'Excelente juego, me encantó. Muy recomendado.'
    },
    {
      username: 'Monika0922',
      rating: 4,
      comment: 'Muy buen juego, pero le faltan algunas mejoras.'
    }
  ]

  const validUrls = product.images
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[]

  return (
    <>
      <div className='bg-[#FCFCFC]'>
        {/* <ol className='flex items-center mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl' >
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
        </ol> */}

        <div className="min-h-screen bg-[#FCFCFC] xl:mx-20 lg:mx-14 md:mx-10 sm:mx-4">
          {/* Header */}
          <div className="w-full px-4 py-6">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#30AEB6] text-2xl pb-1">★</span>
                ))}
                <span className="ml-1 text-[#30AEB6]">{product.rating ?? 5}</span>
              </div>
              {label?.map((feature, index) => (
                <Badge key={index} variant="secondary" className="bg-opacity-20">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
            {/* Left Column - Media */}
            <div className="lg:col-span-2">
              {/* Imagen del producto */}
              <Slider urls={validUrls} />

            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6 lg:row-span-2">
              <img src="https://logowik.com/content/uploads/images/marvel-spider-man-miles-morales8114.logowik.com.webp" alt="miles morales" class="w-full 2xl:h-48 xl:h-40 lg:h-32 object-contain lg:block hidden" />

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  {product.price?.discount > 0 && (
                    <Badge className="bg-blue-500">-{product.price.discount}%</Badge>
                  )}
                  <div className="text-right">
                    {product.price?.original && (
                      <div className="line-through text-gray-400">
                        {formatPrice(product.price.original)}
                      </div>
                    )}

                    {/* Esto es solo demostrativo */}
                    {/*                     
                    {product.price?.discount ?? 23 > 0 && (
                    <Badge className="bg-blue-500">-{product.price.discount ?? 23}%</Badge>
                  )}
                  <div className="text-right">
                    {product.price?.original ?? 1 && (
                      <div className="line-through text-gray-400">
                        {formatPrice(product.price.original ?? 1)}
                      </div>
                    )} */}
                    <div className="text-2xl font-bold">
                      {formatPrice(product.price.current ?? product.price)}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="mt-6">
                    <AddCartButton product={product} />
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Desarrollador</span>
                      <span>{product.developer ?? "JuegosElPaquito"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fecha de lanzamiento</span>
                      <span>{product.releaseDate ?? "2024/12/12"}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="mt-4 space-y-6 lg:col-span-2">
              <p className="text-base text-gray-700">
                {product.description}
              </p>
            </div>
            <div className="mt-4 lg:col-span-3">
              {/* System Requirements */}
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Requisitos de Sistema</h2>
              <div className="bg-zinc-100 dark:bg-gray-700 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:border-r border-gray-600 pr-4 md:pr-4">
                    <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Mínimos</h3>
                    <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
                      <li><span className="font-light">OS<br /> </span> <span className="font-semibold ">{product.minRequirements?.os ?? "windows 21"}</span></li>
                      <li><span className="font-light">Processor<br /> </span> <span className="font-semibold ">{product.minRequirements?.processor ?? "intel i1"}</span></li>
                      <li><span className="font-light">Memory<br /> </span> <span className="font-semibold ">{product.minRequirements?.memory ?? "no muxha"}</span></li>
                      <li><span className="font-light">Graphics<br /> </span> <span className="font-semibold ">{product.minRequirements?.graphics ?? "humildes"}</span></li>
                      <li><span className="font-light">DirectX<br /> </span> <span className="font-semibold ">{product.minRequirements?.directX ?? "directo de kick"}</span></li>
                      <li><span className="font-light">Storage<br /> </span> <span className="font-semibold">{product.minRequirements?.storage ?? "una papa"}</span></li>
                    </ul>
                  </div>
                  <div className="border-gray-600 pl-0 md:pl-4 border-t sm:border-t-0">
                    <h3 className="font-bold mb-2 text-gray-900 dark:text-white pt-4 lg:pt-0">Recomendados</h3>
                    <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
                      <li><span className="font-light">OS<br /> </span> <span className="font-semibold ">{product.recommendedRequirements?.os ?? "windows 21"}</span></li>
                      <li><span className="font-light">Processor<br /> </span> <span className="font-semibold ">{product.recommendedRequirements?.processor ?? "intel i99"}</span></li>
                      <li><span className="font-light">Memory<br /> </span> <span className="font-semibold ">{product.recommendedRequirements?.memory ?? "muxha"}</span></li>
                      <li><span className="font-light">Graphics<br /> </span> <span className="font-semibold ">{product.recommendedRequirements?.graphics ?? "masimos"}</span></li>
                      <li><span className="font-light">DirectX<br /> </span> <span className="font-semibold ">{product.recommendedRequirements?.directX ?? "directo de twitch"}</span></li>
                      <li><span className="font-light">Storage<br /> </span> <span className="font-semibold">{product.recommendedRequirements?.storage ?? "una papa pro"}</span></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
            <div className="mt-4 lg:col-span-3">
                <div className="dark:bg-gray-900 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Últimas Reseñas</h2>
                  <div className="rounded-lg bg-zinc-100 space-y-4 px-6">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="border-b last:border-b-0 pb-4 first:pt-4 border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">{review.username}</span>
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i} className="text-[#30AEB6] text-2xl pb-1">★</span>
                            ))}
                            <span className="ml-1">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            <div className="py-6 space-y-6 lg:col-span-3">
              <ProductReel href="/products"
                query={{ category: [category.name], limit: 4 }}
                classNamesSlider="bg-zinc-100 px-6 rounded-lg py-4"
                title={`${label} Similares`}
                subtitle={`Productos similares a ${product.name} para explorar.`
              }
              />
            </div>
          </div>
        </div>




      </div>
    </>
  )
}
export default Page
