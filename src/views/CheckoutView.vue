<script lang="ts">
import { mapActions, mapState, storeToRefs } from 'pinia'
import { useCommandStore } from '@/stores/command'
import type { Product } from '@/misc/types'
import convert_to_display_price from '@/misc/utils'
import { useLocationStore } from '@/stores/location'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

import CheckoutDialog from '@/components/dialog/CheckoutDialog.vue'

export default {
    data() {
        return {
            command: storeToRefs(useCommandStore()).command,
            locations: storeToRefs(useLocationStore()).locations,
            loading: false,
            selected_location: null as number | null,
            dialog: false,
            error: false,
            status_code: 0,
            status_text: ''
        }
    },
    methods: {
        ...mapActions(useCommandStore, ['add_product', 'remove_product']),
        add(item: Product) {
            this.add_product(item)
        },
        remove(item: Product) {
            this.remove_product(item)
        },
        process() {
            this.loading = true

            // TODO : Throw error
            if (this.command == null || this.selected_location == null || this.locations == null)
                return

            let req = {
                location: this.locations[this.selected_location].id,

                items: this.command.items.map((x) => {
                    return {
                        id: x.product.id,

                        amount: x.amount
                    }
                })
            }

            axios
                .post('/api/command', req)
                .then((res) => {
                    this.status_code = res.status
                    this.command = null
                })
                .catch((res) => {
                    this.error = true
                    this.status_code = res.status
                })
                .finally(() => {
                    this.loading = false
                    this.dialog = true
                })
        },
        reset() {
            if (this.command == null) return
            this.command.items = []
        },
        convert_to_display_price(price: number): string {
            return convert_to_display_price(price)
        }
    },
    computed: {
        ...mapState(useCommandStore, ['total_price', 'total_item']),
        total_string(): string {
            return convert_to_display_price(this.total_price)
        }
    },
    mounted() {
        if (useUserStore().email == null) {
            this.$router.push('/user')
        }
    },
    components: {
        CheckoutDialog
    }
}
</script>

<template>
    <main>
        <CheckoutDialog
            v-model="dialog"
            :error="error"
            :status_code="status_code"
            status_message="status_message"
        />

        <v-alert
            v-if="selected_location == null"
            class="ma-2"
            :type="'warning'"
            variant="outlined"
            text="Merci de bien, sélectionnez votre salle."
        />
        <v-alert
            v-if="total_item >= 6"
            class="ma-2"
            :type="'warning'"
            variant="outlined"
            text="Pas plus de 6 items par commande :)."
        />
        <div class="d-flex justify-center">
            <v-slide-group v-model="selected_location" show-arrows mandatory>
                <v-slide-group-item v-for="item in locations" v-slot="{ isSelected, toggle }">
                    <v-btn
                        class="ma-2"
                        rounded
                        :color="isSelected ? 'primary' : undefined"
                        @click="toggle"
                    >
                        {{ item.name }}
                    </v-btn>
                </v-slide-group-item>
            </v-slide-group>
        </div>

        <v-container class="d-flex justify-center flex-wrap">
            <v-card
                :disabled="loading"
                class="rounded-lg ma-2"
                v-for="item in command?.items"
                width="250"
            >
                <v-card-title> {{ item.product.name }} </v-card-title>
                <v-card-subtitle class="mb-3">
                    {{ item.amount }} × {{ convert_to_display_price(item.product.price) }}
                </v-card-subtitle>
                <v-img :src="item.product.image_url" class="mx-2" aspect-ratio="1/1" />
                <v-card-actions class="d-flex justify-space-between mt-3">
                    <v-btn @click="remove(item.product)">
                        <v-icon size="x-large" icon="fa-solid fa-circle-minus" />
                    </v-btn>
                    <div></div>
                    <v-btn @click="add(item.product)" :disabled="total_item >= 6">
                        <v-icon size="x-large" icon="fa-solid fa-circle-plus" />
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>

        <v-bottom-navigation grow>
            <v-btn :disabled="loading" @click="reset()">
                <v-icon icon="md:restart_alt" />
                <span>Reset</span>
            </v-btn>
            <v-btn
                :disabled="
                    loading || total_price == 0 || total_item > 6 || selected_location == null
                "
                :loading="loading"
                @click="process"
            >
                <v-icon icon="fa-solid fa-circle-check" />
                <span>Valider</span>
                <span v-if="total_price != 0">{{ total_string }}</span>
            </v-btn>
        </v-bottom-navigation>
    </main>
</template>
