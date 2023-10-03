<script lang="ts">
import { mapActions, storeToRefs } from 'pinia'
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
            if (this.command == null) return

            let req = {
                location: this.selected_location,

                items: this.command.map((x) => {
                    return {
                        id: x[0].id,

                        amount: x[1]
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
            this.command = []
        },
        convert_to_display_price(price: number): string {
            return convert_to_display_price(price)
        }
    },
    computed: {
        total(): number {
            if (this.command == null) return 0
            return this.command.reduce((a, b) => a + b[0].price * b[1], 0)
        },
        total_string(): string {
            return convert_to_display_price(this.total)
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
            <v-card :disabled="loading" class="rounded-lg ma-2" v-for="item in command" width="250">
                <v-card-title> {{ item[0].name }} </v-card-title>
                <v-card-subtitle class="mb-3">
                    {{ item[1] }} × {{ convert_to_display_price(item[0].price) }}
                </v-card-subtitle>
                <v-img :src="item[0].image_url" class="mx-2" aspect-ratio="1/1" />
                <v-card-actions class="d-flex justify-space-between mt-3">
                    <v-btn @click="remove(item[0])">
                        <v-icon size="x-large" icon="fa-solid fa-circle-minus" />
                    </v-btn>
                    <div></div>
                    <v-btn @click="add(item[0])">
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
                :disabled="loading || total == 0 || selected_location == null"
                :loading="loading"
                @click="process"
            >
                <v-icon icon="fa-solid fa-circle-check" />
                <span>Validate</span>
                <span v-if="total != 0">{{ total_string }}</span>
            </v-btn>
        </v-bottom-navigation>
    </main>
</template>
