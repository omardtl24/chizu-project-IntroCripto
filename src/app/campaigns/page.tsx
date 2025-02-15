'use client'

import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, Disclosure, Transition, TransitionChild, DialogPanel, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Plus, X, Minus, ListFilter, Search, CircleArrowDown, CircleArrowUp } from 'lucide-react'
import React, { useState, Fragment, useEffect } from 'react';

const Products = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortPrice, setSortPrice] = useState<'up' | 'down'>('up');
  const [searchTerm, setSearchTerm] = useState('');

  const handlePeti = () => {
    const url = new URL("/api/get-campaigns", window.location.origin);

    fetch(url.toString())
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching payment status:", error);
      });
  }
  // Datos de ejemplo
  const sampleCategories = [
    { name: 'Categoría 1' },
    { name: 'Categoría 2' },
    { name: 'Categoría 3' },
  ];

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
                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4 mt-20">
                    <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Cerrar Menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="mt-4 border-t border-gray-400">
                    
                    <Disclosure as="div" key="categorias-movil" className="border-t border-gray-400 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">Categorias</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <Minus className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <Plus className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>

                          <DisclosurePanel className="pt-6">
                            <div className="space-y-6">
                              {sampleCategories.map(category => (
                                <div key={category.name} className="flex items-center">
                                  <Checkbox
                                    className='h-4 w-4 rounded border-gray-300'
                                  />
                                  <label className="ml-3 text-sm text-gray-600">
                                    {category.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>

                    <Disclosure as="div" key="valores-movil" className="border-t border-gray-400 px-4 py-6" defaultOpen>
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">Valor</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <Minus className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <Plus className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>

                          <DisclosurePanel className="pt-6">
                            <div className="space-y-4">
                              <div key="precio-mayor" className="flex items-center">
                                <button onClick={() => setSortPrice('up')} >
                                  <CircleArrowUp className={`h-5 w-5 ${sortPrice === 'up' ? 'text-teal-700' : 'text-gray-500'}`} />
                                </button>
                                <label className="ml-3 text-sm text-gray-600">
                                  Menor a Mayor
                                </label>
                              </div>

                              <div key="precio-menor" className="flex items-center">
                                <button onClick={() => setSortPrice('down')} >
                                  <CircleArrowDown className={`h-5 w-5 ${sortPrice === 'down' ? 'text-teal-700' : 'text-gray-500'}`} />
                                </button>
                                <label className="ml-3 text-sm text-gray-600">
                                  Mayor a Menor
                                </label>
                              </div>
                            </div>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-400 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Campañas</h1>
            <div className="flex items-center">
              {/* Barra de búsqueda */}
              <div className="relative w-full text-gray-700">
                <input
                  type="search"
                  name="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Busca tu campaña  :)"
                  className="bg-white h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none border border-gray-400 hover:border-gray-700 focus:border-gray-700"
                />
                <div className='absolute -left-8 top-0 mt-2 mr-4'>
                  <Search
                    aria-hidden='true'
                    className='h-6 w-6 flex-shrink-0 text-gray-600'
                  />
                </div>
              </div>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <ListFilter className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">Products</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="hidden lg:block">
                <Disclosure as="div" key="categorias" className="border-b border-gray-400 py-6" defaultOpen>
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-600">
                          <span className="font-medium text-gray-900">Categorias</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <Minus className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <Plus className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {sampleCategories.map(category => (
                            <div key={category.name} className="flex items-center">
                              <Checkbox
                                className='h-4 w-4 rounded border-gray-300'
                              />
                              <label className="ml-3 text-sm text-gray-600">
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure as="div" key="valores" className="border-b border-gray-400 py-6" defaultOpen>
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-600">
                          <span className="font-medium text-gray-900">Valor</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <Minus className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <Plus className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          <div key="precio-mayor" className="flex items-center">
                            <button onClick={() => setSortPrice('up')} >
                              <CircleArrowUp className={`h-5 w-5 ${sortPrice === 'up' ? 'text-teal-700' : 'text-gray-500'}`} />
                            </button>
                            <label className="ml-3 text-sm text-gray-600">
                              Menor a Mayor
                            </label>
                          </div>
                          <div key="precio-menor" className="flex items-center">
                            <button onClick={() => setSortPrice('down')} >
                              <CircleArrowDown className={`h-5 w-5 ${sortPrice === 'down' ? 'text-teal-700' : 'text-gray-500'}`} />
                            </button>
                            <label className="ml-3 text-sm text-gray-600">
                              Mayor a Menor
                            </label>
                          </div>
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
              <button onClick={() => handlePeti()}>Petición</button>
                {/* Aquí puedes colocar un componente placeholder para el grid de productos */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Placeholder para productos */}
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="h-64 rounded-lg border-2 border-gray-200 bg-gray-50"></div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Products;