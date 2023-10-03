import type { LocationResponse } from '@/misc/response_type'
import type { Location } from '@/misc/types'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', {
    state: () => ({ locations: null as null | Location[] }),
    actions: {
        async update() {
            let locations = [] as Location[]
            axios.get('/api/location/all').then((res) => {
                if (res.status == 200) {
                    locations = res.data.map((x: LocationResponse) => {
                        return {
                            id: x.id,
                            name: x.name
                        }
                    })
                }
                this.locations = locations
            })
        }
    }
})
