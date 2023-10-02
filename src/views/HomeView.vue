<script lang="ts">
import type { Product } from '@/misc/types'
import convert_to_display_price from '@/misc/utils'
import { useCommandStore } from '@/stores/command'
import { useProductStore } from '@/stores/product'
import { mapActions, storeToRefs } from 'pinia'

export default {
    data() {
        return {
            drawer: false,
            products: storeToRefs(useProductStore()).products
        }
    },
    methods: {
        ...mapActions(useCommandStore, ['add_product']),
        add(item: Product) {
            this.add_product(item)
        },
        convert_to_display_price(price: number): string {
            return convert_to_display_price(price)
        }
    }
}
</script>

<template>
    <main>
        <v-container class="d-flex justify-center flex-wrap">
            <v-card width="250" class="ma-2" @click="" v-for="item in products">
                <v-card-title> {{ item.name }} </v-card-title>
                <v-card-subtitle> {{ convert_to_display_price(item.price) }} </v-card-subtitle>
                <v-img :src="item.image_url" class="mx-2" max-height="200" aspect-ratio="1/1" />
                <v-card-actions class="d-flex justify-center">
                    <v-btn variant="tonal" color="info" @click="add(item)"> Add </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </main>
</template>
Nom du Produit Nom du Produit
