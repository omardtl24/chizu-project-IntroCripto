'use client'

import { Checkbox } from '@/components/ui/checkbox';
import { trpc } from '../../trpc/client';
import { Button } from '../../components/ui/button';
import ProductReel from './Components/ProductReelUser';
import { Dialog, Disclosure, Menu, Transition, TransitionChild, DialogPanel, MenuButton, DisclosureButton, DisclosurePanel, MenuItem, MenuItems } from '@headlessui/react'
import { Plus, X, Minus, ChevronDown, ListFilter, Search, CircleArrowDown, CircleArrowUp } from 'lucide-react'
import React, { useState, useEffect, Fragment } from 'react';



interface Category {
  name: string;
}

type Param = string | string[] | undefined

interface ProductsPageProps {
  searchParams: { [key: string]: Param }
  id_user: string;
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

const Products = ({ searchParams, id_user, }: ProductsPageProps) => {

  const defaultCategory = parse(searchParams.category);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortPrice, setSortPrice] = useState<'price' | '-price'>('price');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: allCategories } = trpc.getAllCategories.useQuery({ limit: 100 });

  const [selectedCategories, setSelectedCategories] = useState< Category[] >( () => { 
      return defaultCategory ? [{ name: defaultCategory }] : []
  });




  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen} as={Fragment}>
          <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >

              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-400 pb-6 pt-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Estadísticas de juegos publicados</h1>
            <div className="flex items-center">
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">


              {/* Product grid */}
              <div className="lg:col-span-4">
                <ProductReel
                  query={{
                    userID: Number(id_user),
                    limit: 20,
                    sort: sortPrice,
                    searchTerm,
                  }}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Products;