import type { Command, Product } from '@/misc/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCommandStore = defineStore('command', {
    state: () => ({ command: null as null | Command }),
    actions: {
        add_product(product: Product) {
            if (this.command == null) {
                this.command = [[product, 1]]
            } else if (this.command.some((x) => x[0].id == product.id)) {
                let index = this.command.findIndex((x) => x[0].id == product.id)
                this.command[index][1]++
            } else {
                this.command.push([product, 1])
            }
        },
        remove_product(product: Product) {
            if (this.command == null) return
            if (!this.command.some((x) => x[0].id == product.id)) return
            let index = this.command.findIndex((x) => x[0].id == product.id)
            if (this.command[index][1] <= 1) {
                this.command.splice(index, 1)
            } else {
                this.command[index][1]--
            }
        }
    }
})
