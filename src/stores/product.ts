import type { ProductResponse } from '@/misc/response_type'
import type { Command, Product } from '@/misc/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// TODO: Move it move it ;)

export const useProductStore = defineStore('product', {
    state: () => ({ products: [] as Product[] }),
    actions: {
        async update() {
            let products = [] as Product[]
            let res = await axios.get('/api/product/all')

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
        }
    }
})
