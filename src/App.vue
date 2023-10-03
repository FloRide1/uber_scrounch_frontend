<script lang="ts">
import { mapState, storeToRefs } from 'pinia'
import { useUserStore } from './stores/user'
import { useCommandStore } from './stores/command'
import { useProductStore } from '@/stores/product'
import { useLocationStore } from './stores/location'
import { useDeliveryStore } from './stores/delivery'

export default {
    data() {
        return {
            drawer: false,
            ban: storeToRefs(useUserStore()).ban,
            email: storeToRefs(useUserStore()).email,
            command: storeToRefs(useCommandStore()).command
        }
    },
    computed: {
        email_inital(): null | string {
            if (this.email == null) return null

            let res = this.email[0] + this.email.split('.')[1][0]
            return res
        },
        command_number(): number {
            if (this.command == null) {
                return 0
            }
            return this.command.reduce((a, b) => a + b[1], 0)
        },
        ...mapState(useDeliveryStore, ['next_delivery_string'])
    },
    mounted() {
        useProductStore().update()
        useLocationStore().update()
        useUserStore().update()
        useDeliveryStore().update()
    }
}
</script>

<template>
    <v-app v-if="ban == false">
        <header>
            <v-app-bar density="compact">
                <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
                <v-btn icon="fa-solid fa-house" class="mr-2" to="/" />
                Next Delivery: {{ next_delivery_string }}
                <v-spacer />
                <v-btn icon v-if="command_number" to="/checkout">
                    <v-badge color="error" :content="command_number">
                        <v-icon icon="fa-solid fa-basket-shopping" />
                    </v-badge>
                </v-btn>
                <v-btn icon to="/user">
                    <v-avatar v-if="email == null" icon="fa-solid fa-circle-user" />
                    <v-avatar color="info" v-else> {{ email_inital }} </v-avatar>
                </v-btn>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" temporary>
                <v-list-item prepend-icon="md:dashboard" title="Home" value="home" to="/" />
            </v-navigation-drawer>
        </header>

        <v-main>
            <RouterView />
        </v-main>
    </v-app>
    <v-app v-else>
        <v-main>
            <v-alert class="mb-2" :type="'error'" title="PDTR t ban" />
        </v-main>
    </v-app>
</template>
