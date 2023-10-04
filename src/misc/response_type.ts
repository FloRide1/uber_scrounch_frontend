export type ProductResponse = {
    id: number

    name: string

    image_url: string

    description: null | string

    price: number

    stock: number
}

export type LocationResponse = {
    id: number

    name: string
}

export type DeliveryResponse = {
    id: number

    time: number
}

export type UserResponse = {
    id: number

    email: string

    ban: boolean | null
}

export type CommandResponse = {
    id: number

    confirmed: boolean

    delivered: boolean

    canceled: boolean

    delivery: number | null

    items: CommandItemResponse[]
}

export type CommandItemResponse = {
    id: number

    product_name: string

    amount: number

    price: number

    image_url: string
}
