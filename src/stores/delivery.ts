import type { DeliveryResponse } from '@/misc/response_type'
import type { Delivery } from '@/misc/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDeliveryStore = defineStore('delivery', {
    state: () => ({ deliveries: null as Delivery[] | null }),
    actions: {
        async update() {
            axios
                .get('/api/delivery/all')
                .then((res) => {
                    if (res.status == 200) {
                        this.deliveries = res.data.map((x: DeliveryResponse) => {
                            return {
                                id: x.id,

                                time: new Date(x.time)
                            }
                        })
                        console.log(this.deliveries)
                    }
                })
                .catch((_err) => {
                    // Do nothing, you're just not connected
                })
        }
    },
    getters: {
        next_delivery(): null | Delivery {
            if (this.deliveries == null) return null

            return this.deliveries[0]
        },
        next_delivery_string(): null | string {
            if (this.next_delivery == null) return null

            let time = this.next_delivery.time
            return time.toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' })
        }
    }
})
