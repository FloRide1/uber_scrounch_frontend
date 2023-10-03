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
