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
            user: storeToRefs(useUserStore()).user,
            command: storeToRefs(useCommandStore()).command
        }
    },
    computed: {
        email_inital(): null | string {
            if (this.user == null) return null

            let res = this.user.email[0] + this.user.email.split('.')[1][0]
            return res
        },
        ...mapState(useDeliveryStore, ['next_delivery_string']),
        ...mapState(useCommandStore, ['total_item'])
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
    <v-app v-if="user == null || user.ban == false">
        <header>
            <v-app-bar density="compact">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
                <!-- <v-btn icon="fa-solid fa-house" class="mr-2" to="/" /> -->
                Prochaine Livraison: {{ next_delivery_string }}
                <v-spacer />
                <v-btn icon v-if="total_item" to="/checkout">
                    <v-badge color="error" :content="total_item">
                        <v-icon icon="fa-solid fa-basket-shopping" />
                    </v-badge>
                </v-btn>
                <v-btn icon to="/user">
                    <v-avatar v-if="user == null" icon="fa-solid fa-circle-user" />
                    <v-avatar color="info" v-else> {{ email_inital }} </v-avatar>
                </v-btn>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" temporary>
                <v-list-item prepend-icon="md:dashboard" title="Home" value="home" to="/" />
                <v-list-item
                    :disabled="user == null"
                    prepend-icon="fa-solid fa-parachute-box"
                    title="Mes Commandes"
                    value="home"
                    to="/command"
                />
                <v-list-item
                    v-if="user != null && user.admin"
                    prepend-icon="fa-solid fa-wand-magic-sparkles"
                    title="Admin"
                    value="admin"
                    to="/admin"
                />
            </v-navigation-drawer>
        </header>

        <v-main>
            <RouterView />
        </v-main>
    </v-app>
    <v-app v-else>
        <v-main>
            PTDR t ban
            <img src="@/assets/ohsicrigolo.png" />
        </v-main>
    </v-app>
</template>
