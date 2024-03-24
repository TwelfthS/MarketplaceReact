const models = require("../models/index.js")

const User = models.User
const Item = models.Item
const Cart = models.Cart

exports.getProducts = (req, res) => {
    Item.findAll({raw: true}).then((items) => {
        res.json(items)
    })
}

exports.getProduct = (req, res) => {
    Item.findOne({
        where: {
            id: req.params.itemId
        }
    }).then((item) => {
        res.status(200).send(item)
    }).catch((err) => {
        res.status(404).send({message: "Item not found"})
    })
}

exports.getCart = (req, res) => {
    console.log(req.userId)
    User.findOne({
        where: {
            id: req.userId
        }
    }).then((user) => {
        console.log("hello")
        user.getAddedItem().then((items) => {
            console.log("in")
            res.status(200).send(items)
            // getQuantity(user.id, items).then(() => {
            //     res.status(200).send(items)
            // })
        })
        .catch((err) => {
            res.status(404).send({message: err})
        })
    }).catch((err) => {
        res.status(404).send({message: "User not found"})
    })
}

const getQuantity = async (userId, items) => {
    for (let i in items) {
        const record = await Cart.findOne({
            where: {
                userId: userId,
                itemId: items[i].id
            }
        })
        items[i].quantiy = record.quantity
    }
    console.log(items)
}

exports.addCart = (req, res) => {
    Item.findOne({
        where: {
            id: req.body.itemId
        }
    }).then((item) => {
        User.findOne({
            where: {
                id: req.userId
            }
        }).then((user) => {
            user.addAddedItem(item)
            .then(() => {
                item.addBuyer(user)
                .then(() => {
                    res.status(200).send()
                })
            })
        })
    }).catch((err) => {
        res.status(404).send()
    })
}

exports.addItem = (req, res) => {
    Cart.findOne({
        where: {
            userId: req.userId,
            itemId: req.body.itemId
        }
    }).then((record) => {
        record.update({
            quantity: record.quantity + req.body.change
        }).then(() => {
            res.status(200).send()
        })
    })
    // Item.findOne({
    //     where: {
    //         id: req.body.itemId
    //     }
    // }).then((item) => {
    //     User.findOne({
    //         where: {
    //             id: req.userId
    //         }
    //     }).then((user) => {
    //         user.addAddedItem(item, {through: })
    //     })
    // })
}