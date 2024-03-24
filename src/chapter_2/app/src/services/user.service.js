import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8000/'

class UserService {
    GetProducts() {
        return axios.get(API_URL)
    }

    GetProduct(itemId) {
        return axios.get(API_URL + "products/" + itemId)
    }

    getCart() {
        return axios.get(API_URL + "cart/", { headers: authHeader() })
    }

    addCart(itemId) {
        return axios.post(API_URL + "cart/", { itemId }, { headers: authHeader() })
    }

    addItem(itemId, change) {
        return axios.put(API_URL + "cart/", { itemId, change }, {headers: authHeader() })
    }
}

const userService = new UserService()

export default userService