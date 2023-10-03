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
        <v-container>
            <v-alert
                class="mb-2"
                :type="'error'"
                text="Nous tenons à vous rappeler qu'il reste interdit de manger en salle machine."
            >
                <div class="text-caption">
                    Ceci est un message de: <code>https://manger-ou-coder.epita.fr</code>
                </div>
            </v-alert>
            <v-alert :type="'warning'" text="Ce site est toujours en développement par moi :(">
                <div class="text-caption">
                    ALED <br />
                    Develop-ement, <br />
                    -- <br />
                    Un état Americain <br />Fail Netiquette
                </div>
            </v-alert>
        </v-container>
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
