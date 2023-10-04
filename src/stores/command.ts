import type { Command, Product } from '@/misc/types'
import { defineStore } from 'pinia'

export const useCommandStore = defineStore('command', {
    state: () => ({
        command: null as null | Command,
        past_commands: null as null | Command[]
    }),
    actions: {
        add_product(product: Product) {
            if (this.command == null) {
                this.command = {
                    id: 0,
                    confirmed: false,
                    canceled: false,
                    delivered: false,
                    delivery: null,
                    items: [{ product: product, amount: 1 }]
                }
            } else if (this.command.items.reduce((a, b) => a + b.amount, 0) >= 6) {
                return
            } else if (this.command.items.some((x) => x.product.id == product.id)) {
                let index = this.command.items.findIndex((x) => x.product.id == product.id)

                this.command.items[index].amount++
            } else {
                this.command.items.push({ product: product, amount: 1 })
            }
        },
        remove_product(product: Product) {
            if (this.command == null) return
            if (!this.command.items.some((x) => x.product.id == product.id)) return

            let index = this.command.items.findIndex((x) => x.product.id == product.id)
            if (this.command.items[index].amount <= 1) {
                this.command.items.splice(index, 1)
            } else {
                this.command.items[index].amount--
            }
        }
    },

    getters: {
        total_item(): number {
            if (this.command == null) return 0
            return this.command.items.reduce((a, b) => a + b.amount, 0)
        },
        total_price(): number {
            if (this.command == null) return 0
            return this.command.items.reduce((a, b) => a + b.product.price * b.amount, 0)
        }
    }
})
