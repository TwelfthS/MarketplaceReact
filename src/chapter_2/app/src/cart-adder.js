import { useState } from "react"
import userService from "./services/user.service"
import { CartButton, RemoveAllButton } from "./styled"


const CartAdder = ({item}) => {

    const [quantity, setQuantity] = useState(item.Cart.quantity)

    const add = (itemId, change) => {
        userService.addItem(itemId, change).then(() => {
            setQuantity(q => q + 1)
        }).catch((err) => {
            console.log(err)
        })
    }

    const remove = (itemId, change, currentQuantity) => {
        if (currentQuantity > 1) {
            userService.addItem(itemId, change).then(() => {
                setQuantity(q => q - 1)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return <div>
        <p>Quantity: {quantity}</p>
        <CartButton onClick={() => remove(item.id, -1, quantity)}>-</CartButton>
        <CartButton onClick={() => add(item.id, 1)}>+</CartButton>
    </div>
}

export default CartAdder