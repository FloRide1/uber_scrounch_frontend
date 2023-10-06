export type Product = {
    id: number
    name: string
    image_url: string
    description: null | string
    price: number
    stock: number
}

export type Command = {
    id: number

    confirmed: boolean

    delivered: boolean

    canceled: boolean

    delivery: Date | null

    items: CommandItem[]
}

export type CommandItem = {
    product: Product

    amount: number
}

export type Location = {
    id: number
    name: string
}

export type Delivery = {
    id: number
    time: Date
}

export type User = {
    id: number

    email: string

    ban: boolean

    admin: boolean
}
