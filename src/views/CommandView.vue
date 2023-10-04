<script lang="ts">
import type { Command, CommandItem, Product } from '@/misc/types'
import convert_to_display_price from '@/misc/utils'
import { useCommandStore } from '@/stores/command'
import { storeToRefs, mapActions, mapState } from 'pinia'

export default {
    data() {
        return {
            drawer: false,
            commands: storeToRefs(useCommandStore()).past_commands
        }
    },
    methods: {
        ...mapActions(useCommandStore, ['update']),

        command_hour_display(item: Command): string {
            if (item.delivery == null) return ''
            return item.delivery.toLocaleTimeString('fr-FR', {
                hour: 'numeric',
                minute: 'numeric'
            })
        },

        command_date_display(item: Command): string {
            if (item.delivery == null) return ''
            return item.delivery.toLocaleDateString('fr-FR', {
                hour: 'numeric',
                minute: 'numeric'
            })
        },

        command_item_display(item: CommandItem): string {
            return item.product.name + ' × ' + item.amount
        }
    },
    computed: {
        commands_ordered() {
            return this.commands?.sort((a, b) => {
                if (a.delivered || a.canceled) {
                    return 1 // a is delivered or canceled, so b comes first or remains unchanged
                } else if (b.delivered || b.canceled) {
                    return -1 // b is delivered or canceled, so a comes first
                } else {
                    if (!a.confirmed && b.confirmed) {
                        return -1 // a is unconfirmed and b is confirmed, so a comes first
                    } else if (a.confirmed && !b.confirmed) {
                        return 1 // b is unconfirmed and a is confirmed, so b comes first
                    } else {
                        return 0 // Both are in the same state (confirmed or unconfirmed)
                    }
                }
            })
        }
    },
    mounted() {
        this.update()
        setInterval(() => this.update(), 10000)
    }
}
</script>

<template>
    <main>
        <v-container>
            <div v-for="item in commands_ordered">
                <v-alert
                    class="mb-3"
                    :type="item.confirmed ? 'success' : 'info'"
                    v-if="!item.canceled && !item.delivered"
                >
                    <h4 v-if="item.confirmed">Validé pour : {{ command_hour_display(item) }}</h4>
                    <h4 v-else>En cours de validation: <v-progress-circular indeterminate /></h4>
                    <h6 v-for="i in item.items">
                        {{ command_item_display(i) }}
                    </h6>
                </v-alert>
                <v-alert
                    class="mb-3"
                    variant="outlined"
                    :type="item.canceled ? 'error' : 'success'"
                    v-else
                >
                    <h4 v-if="item.confirmed">
                        Livré le {{ command_date_display(item) }} a
                        {{ command_hour_display(item) }}
                    </h4>
                    <h4 v-else>Commande Annulé</h4>
                    <h6 v-for="i in item.items">
                        {{ command_item_display(i) }}
                    </h6>
                </v-alert>
            </div>
        </v-container>
    </main>
</template>
