import type { UserResponse } from '@/misc/response_type'
import type { User } from '@/misc/types'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({ user: null as null | User }),
    actions: {
        async update() {
            axios
                .get('/api/user/me')
                .then((res) => {
                    if (res.status == 200) {
                        let data: UserResponse = res.data
                        this.user = {
                            id: data.id,

                            email: data.email,

                            ban: data.ban != null ? data.ban : false
                        }
                    }
                })
                .catch((_err) => {
                    // Do nothing, you're just not connected
                })
        }
    }
})
