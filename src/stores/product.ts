import type { ProductResponse } from '@/misc/response_type'
import type { Product } from '@/misc/types'
import axios from 'axios'
import { defineStore } from 'pinia'

// TODO: Move it move it ;)

export const useProductStore = defineStore('product', {
    state: () => ({ products: [] as Product[] }),
    actions: {
        update() {
            let products = [] as Product[]
            axios.get('/api/product/all').then((res) => {
                if (res.status == 200) {
                    products = res.data.map((x: ProductResponse) => {
                        return {
                            id: x.id,
                            name: x.name,
                            image_url: x.image_url,
                            description: x.description,
                            price: x.price,
                            stock: x.stock
                        }
                    })
                }
                this.products = products
            })
        }
    }
})
