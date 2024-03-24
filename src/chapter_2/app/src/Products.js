import { useEffect, useState } from "react"
import userService from "./services/user.service"
import { Link } from "react-router-dom"


function Products() {
    const [data, setData] = useState([])
    useEffect(() => {
        userService.GetProducts().then((response) => {
            setData(response.data)
        })
    }, [])
    const addCart = (itemId) => {
        userService.addCart(itemId).then(() => {
            console.log('success')
        }).catch((err) => {
            console.log('fail')
        })
    }
    return (
        <div className="d-flex justify-content-start flex-wrap">
            {data.map((item) => {
                return <div key={item.id} className="card border border-dark m-5" style={{width: "18rem", minWidth: "100px"}}>
                    <div className="card-body">
                        <Link to={"/products/" + item.id}>{item.name}</Link>
                        <p className="card-text">{item.description}</p>
                        <button onClick={() => addCart(item.id)}>Add to cart</button>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Products