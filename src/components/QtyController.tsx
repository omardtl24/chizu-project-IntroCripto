import { trpc } from "../trpc/client";
import { CartItem, useCart } from "../hooks/use-cart";
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Loader2, Minus, Plus } from "lucide-react";

interface Props {
    item: CartItem;
}

const QuantityController = ({ item }: Props) => {

    const {removeItem, updateItem} = useCart()
    const max_items = item.product.qty

    return (
        <div className="mt-4 text-xs text-gray-600 flex items-center">

            <button
                onClick = { 
                    () => { 
                        if (item.qty === 1) {}
                        else{ 
                            item.qty = (item.qty ?? 1) - 1;
                            updateItem(item.product.id, item.qty);
                        }
                    } 
                }

                style = {{ fontSize: '15px', marginRight: '10px' }}

                className="text-gray-700"
                // disabled = {isLoading}
            >
                <Minus className="h-2.5 w-2.5 -mr-5 hover:text-red-700"/>
            </button>

            <span style={{ fontSize: '13px', margin: '0 10px' }}>
                {item.qty}
                {/* { isLoading ? (<Loader2 className='h-3 w-3 animate-spin mr-0 ml-0' />) : item.qty } */}
            </span>

            <button
                onClick = { 
                    () => {

                        if( (item.qty ?? 1) >= max_items ){
                            toast.error(`No quedan unidades de ${item.product.name} disponibles.`)
                        }
                        else{

                            item.qty = (item.qty ?? 1) + 1;
                            updateItem(item.product.id, item.qty);

                            if (item.qty === max_items) {
                                toast.warning(`No quedan unidades de ${item.product.name} disponibles.`)
                            }

                        }

                    } 
                }

                style = {{ fontSize: '15px', marginRight: '10px' }}

                className="text-gray-700"
                // disabled = {isLoading}
            >
                <Plus className="h-2.5 w-2.5 hover:text-green-700"/>
                {/* { isLoading ? 
                    (<Loader2 className='h-2.5 w-2.5 animate-spin mr-0 ml-0' />) 
                    : (<Plus className="h-2.5 w-2.5 hover:text-green-700"/>) 
                } */}
            </button>

        </div>
    );
};

export default QuantityController;
