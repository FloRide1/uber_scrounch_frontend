export type Product = {
    id: number
    name: string
    image_url: string
    description: null | string
    price: number
    product: number
    stock: number
}

export type Command = {
    items: [Product, number][]
}

export type Location = {
    id: number
    name: string
}

export type Delivery = {
    id: number
    time: Date
}
