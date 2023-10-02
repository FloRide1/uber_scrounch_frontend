import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', {
    state: () => ({ email: null as string | null }),
    actions: {
        async update() {
            axios
                .get('/api/user/me')
                .then((res) => {
                    if (res.status == 200) {
                        this.change_mail(res.data.email)
                        console.log(res.data.email)
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
