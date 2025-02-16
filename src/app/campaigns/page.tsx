'use client'

import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, Disclosure, Transition, TransitionChild, DialogPanel, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Plus, X, Minus, ListFilter, Search, CircleArrowDown, CircleArrowUp } from 'lucide-react'
import React, { useState, Fragment, useEffect } from 'react';
import { ProductCard } from './components/ProductCard';
import { Product } from './types';
import { useRouter } from 'next/navigation';

const Products = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortPrice, setSortPrice] = useState<'up' | 'down'>('up');
  const [searchTerm, setSearchTerm] = useState('');
  const [campaigns, setCampaigns] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // Función para manejar el clic en el ProductCard
  const handleCardClick = (id: number) => {
    router.push(`/campaign/${id}`);
  };

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/get-campaigns", window.location.origin);
      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // Asegúrate de que 'data.campaigns' es un array
      if (Array.isArray(data.campaigns)) {
        console.log("Campaigns fetched:", data.campaigns);
        setCampaigns(data.campaigns as Product[]);
      } else {
        console.error("Expected an array but received:", data);
        // Maneja el caso donde la respuesta no es un array
        setCampaigns([]);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    fetchCampaigns();
  }, []);

  const filteredAndSortedCampaigns = React.useMemo(() => {
    let filtered = Array.isArray(campaigns) ? campaigns : [];

    // Aplicar búsqueda
    if (searchTerm) {
      filtered = filtered.filter(campaign =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar por precio
    return filtered.sort((a, b) => {
      const priceA = sortPrice === 'up' ? (a.min_price ?? 0) : (a.max_price ?? 0);
      const priceB = sortPrice === 'up' ? (b.min_price ?? 0) : (b.max_price ?? 0);
      return sortPrice === 'up' ? priceA - priceB : priceB - priceA;
    });
  }, [campaigns, searchTerm, sortPrice]);


  // Datos de ejemplo para las categorías
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
          {/* ... (mantener el código del diálogo móvil igual) ... */}
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
                {isLoading ? (
                  // Grid de esqueletos de carga
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="h-64 rounded-lg border-2 border-gray-200 bg-gray-50 animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  // Grid de productos reales
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredAndSortedCampaigns.map((campaign, index) => (
                      <div key={index} onClick={() => handleCardClick(campaign.id)}>
                        <ProductCard
                          key={index}
                          product={campaign}
                          style="cosmic-origami-blue"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Products;