export default function convert_to_display_price(price: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
    })

    return formatter.format(price)
}
