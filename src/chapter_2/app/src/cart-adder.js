import userService from "./services/user.service"
import { CartButton } from "./styled"
import { useDispatch } from "react-redux"
import { updateCart } from "./actions/user"


const CartAdder = ({item, cart}) => {
    const dispatch = useDispatch()

    const add = (itemId, change) => {
        userService.addItem(itemId, change).then(() => {
            dispatch(updateCart())
        }).catch((err) => {
            console.log(err)
        })
    }

    const remove = (itemId, change, currentQuantity) => {
        if (currentQuantity > 1) {
            userService.addItem(itemId, change).then(() => {
                dispatch(updateCart())
            }).catch((err) => {
                console.log(err)
            })
        } else if (!cart) {
            userService.addItem(itemId, 'removeAll').then((response) => {
                dispatch(updateCart())
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return <div className="d-flex flex-row">
        <CartButton onClick={() => remove(item.id, -1, item.Cart.quantity)}>-</CartButton>
        <p style={{translate: '0 28%'}}>{item.Cart.quantity}</p>
        <CartButton onClick={() => add(item.id, 1)}>+</CartButton>
    </div>
}

export default CartAdder