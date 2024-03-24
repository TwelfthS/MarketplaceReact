import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userService from "./services/user.service"

function Product() {
    const params = useParams()
    const itemId = params.itemId
    const [data, setData] = useState({})
    useEffect(() => {
        userService.GetProduct(itemId)
            .then((response) => {
                setData(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [itemId])
    if (!data) {
        return <p>Item not found</p>
    }
    return (
        <div>
            <p>{data.name}</p>
            <p>{data.description}</p>
        </div>
    )
}


export default Product