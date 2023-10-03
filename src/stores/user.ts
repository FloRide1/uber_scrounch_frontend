import type { UserResponse } from '@/misc/response_type'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', {
    state: () => ({ email: null as string | null, ban: false }),
    actions: {
        async update() {
            axios
                .get('/api/user/me')
                .then((res) => {
                    if (res.status == 200) {
                        let data: UserResponse = res.data
                        this.change_mail(data.email)
                        this.ban = data.ban != null ? data.ban : false
                    }
                })
                .catch((_err) => {
                    // Do nothing, you're just not connected
                })
        },
        change_mail(email: string) {
            this.email = email
        }
    }
})
