import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userService from "./services/user.service"

import { MarginedDiv } from "./styled"

function Product() {
    const params = useParams()
    const itemId = params.itemId
    const [data, setData] = useState({})
    const [date, setDate] = useState('')
    useEffect(() => {
        userService.GetProduct(itemId)
            .then((response) => {
                if (response.data) {
                    setData(response.data)
                    if (response.data.createdAt) {
                        setDate(new Date(response.data.createdAt).toLocaleString('ru', { dateStyle: 'short', timeStyle: 'short' }))
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [itemId])
    if (!data) {
        return <p>Item not found</p>
    }
    return (
        <MarginedDiv>
            <p>{data.name}</p>
            <p>{data.description}</p>
            <p>{data.price}</p>
            <p>Posted: {date}</p>
        </MarginedDiv>
    )
}


export default Product