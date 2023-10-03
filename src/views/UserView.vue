<script lang="ts">
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { mapActions, storeToRefs } from 'pinia'

export default {
    data() {
        return {
            user: storeToRefs(useUserStore())
        }
    },
    methods: {
        async connect() {
        }
    },
    computed: {
        email_inital(): null | string {
            if (this.user.email == null) return null

            let res = (this.user.email[0] + this.user.email.split('.')[1][0]).toUpperCase()
            return res
        }
    },
}
</script>

<template>
    <v-container class="d-flex justify-center">
        <v-btn
            prepend-icon="fa-brands fa-windows"
            class="px-10"
            href="/api/login"
            v-if="user.email == null"
        >
            Login
        </v-btn>
        <v-card class="px-3" v-else>
            <v-container class="d-flex flex-column align-center">
                <v-avatar color="info"> {{ email_inital }} </v-avatar>
                <p class="text-caption">{{ user.email }}</p>
                <v-btn class="mt-10"> Logout </v-btn>
            </v-container>
        </v-card>
    </v-container>
</template>
