'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type SwiperType from 'swiper'
import { useEffect, useState } from 'react'
import { Pagination } from 'swiper/modules'
import { cn } from '@/lib/utils'


interface Props {
  urls: string[],
}


const Slider = (props: Props) => {
  const { urls } = props

  const [swiper, setSwiper] = useState<null | SwiperType>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeStyles = 'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300'
  const inactiveStyles = 'hidden text-gray-400'

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  })

  useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {

      setActiveIndex(activeIndex)
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      })

    })
  }, [swiper, urls])

  return (
    // <div className='group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl w-3/4 h-3/4'>
    <div className='group relative bg-white-100 aspect-video overflow-hidden rounded-xl'>

      <div className='absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition'>

        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slideNext()
          }}
          className={cn(
            activeStyles,
            'right-3 transition', {
            [inactiveStyles]: slideConfig.isEnd,
            'hover:bg-primary-300 text-primary-800 opacity-100': !slideConfig.isEnd,
          }
          )}
          aria-label='next image'>
          <ChevronRight className='h-4 w-4 text-zinc-700' />{' '}
        </button>

        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slidePrev()
          }}
          className={cn(
            activeStyles,
            'left-3 transition', {
            [inactiveStyles]: slideConfig.isBeginning,
            'hover:bg-primary-300 text-primary-800 opacity-100': !slideConfig.isBeginning,
          }
          )}
          aria-label='previous image'>
          <ChevronLeft className='h-4 w-4 text-zinc-700' />{' '}
        </button>

      </div>

      <Swiper
        className='aspect-video'
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`
          },
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        modules={[Pagination]}
        slidesPerView={1}
      >
        {urls.map((url, i) => (
          <SwiperSlide
            key={i}
            className='relative h-full w-full'>
            <div className='relative aspect-video w-full'>
              <Image
                fill
                loading='eager'
                className='h-full w-full object-cover object-center'
                src={url}
                alt='product-image'
                placeholder='blur'
                blurDataURL='/path/to/placeholder.jpg'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
}

export default Slider
