const db = require("../models")
const { v4: uuidv4 } = require("uuid")
const calculatePayment = require("../utils/calculatePayment")

exports.getProducts = async (req) => {
    try {
        const category = req.body.category
        const brand = req.body.brand
        const page = req.body.page || 1
        const sortBy = req.body.sortBy || "createdAt"
        const limit = req.body.limit || 12

        const offset = limit * (page - 1)

        const [list] = await db.sequelize.query(`
            select
                products.id as product_id,
                products.productId,
                products.name as product_name,
                products.price as product_price,
                products.discount as product_discount,
                products.stock as product_stock,
                brands.name as product_brand,
                categories.name as product_category,
                categories.link as category_link,
                products.files as product_image
            from
                products
                left join categories on categories.categoryId = products.categoryId
                left join brands on brands.brandId = products.brandId
            where
                products.id > 0
                ${category ? 'and categories.link = "' + category + '"' : ""}
                ${brand ? 'and brands.name = "' + brand + '"' : ""}
            order by 
                products.${sortBy} desc
            limit
                ${limit}
            offset
                ${offset};
        `)

        const [counter] = await db.sequelize.query(`
            select
                count(*) as counter_products
            from
                products
                left join categories on categories.categoryId = products.categoryId
                left join brands on brands.brandId = products.brandId
            where
                products.id > 0
                ${category ? 'and categories.link = "' + category + '"' : ""}
                ${brand ? 'and brands.name = "' + brand + '"' : ""};
        `)

        let response = new Object()
        const counterProduct = counter[0].counter_products

        response["limitOfPage"] = limit
        response["currentPage"] = page
        response["counterPage"] = Math.ceil(counterProduct / limit)
        response["counterProduct"] = counterProduct
        response["list"] = list

        return {
            err: response ? 0 : 1,
            msg: response ? "Get products successfully" : "Get products failure",
            data: response ? response : null,
        }
    } catch (error) {
        return error
    }
}

exports.getProduct = async (req) => {
    try {
        const productId = req.body.productId
        const productName = req.body.nameProduct
        const user = req.user

        const [product] = await db.sequelize.query(`
            select
                products.id as id,
                products.productId as code,
                products.name as name,
                products.price as price,
                products.discount as discount,
                products.stock as stock,
                products.rating as rating,
                products.isActive as status,
                brands.name as brand,
                categories.name as category,
                categories.link as category_link,
                products.files as images
            from
                products
                left join categories on categories.categoryId = products.categoryId
                left join brands on brands.brandId = products.brandId
            where
                products.id > -1
                ${productId ? 'and products.productId = "' + productId + '"' : ""}
                ${productName ? 'and products.name = "' + productName + '"' : ""};
        `)

        if (user) {
            // Check product has in cart
            const product_id = product[0].id
            const user_id = user.id

            const [response] = await db.sequelize.query(`
                select
                    *
                from
                    cart_sessions
                    left join cart_items on cart_sessions.id = cart_items.cart_session_id
                    left join users on users.id = cart_sessions.user_id
                where
                    users.id = ${user_id}
                    and cart_items.product_id = ${product_id};
            `)

            if (response && response.length) {
                product[0]["inCart"] = true // has in cart
            } else {
                product[0]["inCart"] = false // no has in cart
            }
        }

        return {
            err: product ? 0 : 1,
            msg: product ? "Get products successfully" : "Get products failure",
            data: product ? product[0] : null,
        }
    } catch (error) {
        return error
    }
}

exports.updateImage = async (productId, files, deleted) => {
    try {
        const response = await db.Product.findOne({
            where: { productId },
            attributes: ["files"],
            raw: true,
        })

        let available = response.files

        if (!available) available = []

        const deleteImages = (available, deleted) => {
            for (let i = 0; i < deleted.length; i++) {
                available = available.filter((item) => item.path !== deleted[i].path)
            }
            return available
        }

        if (deleted) available = deleteImages(available, deleted)

        const addImages = (available, files) => {
            return [...available, ...files]
        }

        if (files) available = addImages(available, files)

        const update = await db.Product.update({ files: available }, { where: { productId } })

        return {
            err: update !== 0 ? 0 : 1,
            msg: update !== 0 ? "Đã cập nhật hình ảnh sản phẩm!" : "Lỗi: Cập nhật thất bại!",
            data: update !== 0 ? update : null,
            latest: update !== 0 ? null : files,
        }
    } catch (error) {
        return error
    }
}

exports.updateInfo = async (data) => {
    try {
        const { name, stock, price, discount, productId } = data

        let newData = { name, stock, price, discount }

        // Kiểm tra tên đã sủ dụng hay chưa
        if (name) {
            const [response] = await db.sequelize.query(`select * from products where name = '${name}' limit 1`)

            if (response.length > 0)
                return {
                    err: 1,
                    msg: "Tên sản phẩm này đã được sử dụng!",
                    data: null,
                }
        }

        // Lấy cái stock cũ cộng với stock được thêm vào
        if (stock) {
            const [response] = await db.sequelize.query(
                `select stock from products where productId = '${productId}' limit 1`
            )

            newData.stock = Number(response[0]?.stock) + Number(stock)
        }

        const response = await db.Product.update(newData, {
            where: { productId },
        })

        return {
            err: response ? 0 : 1,
            msg: response ? "Cập nhật thành công!" : "Cập nhật thất bại!",
            data: response ? response : null,
        }
    } catch (error) {
        return error
    }
}

exports.getProductsAdmin = async (page) => {
    try {
        const limit = 3
        const offset = (page - 1) * limit || 0

        const [amount] = await db.sequelize.query(`select count(*) as 'count' from products`)

        const [response] = await db.sequelize.query(`
            select
                products.id,
                products.productId,
                products.name,
                products.files,
                products.price,
                products.stock,
                products.isActive
            from
                products
            order by
                products.createdAt desc
            limit ${limit} 
            offset ${offset};
        `)

        return {
            err: response ? 0 : 1,
            msg: response ? "Get data successfully" : "Get data failure",
            limit: limit ? limit : 1,
            all: amount ? amount[0].count : null,
            counterPage: response ? Math.ceil(amount[0].count / limit) : null,
            images: response ? response : null,
        }
    } catch (error) {
        return error
    }
}

exports.addCart = async (req) => {
    try {
        const user_id = req.user.id
        const product_id = req.body.product_id

        if (!user_id && !product_id) return

        // First, find `cart_session_id`
        const cart_session_id = await db.Cart_Session.findOne({
            where: { user_id },
            attributes: ["id"],
            raw: true,
        })

        // Second, check to see if the product is already in shopping cart
        // if yes, delete it otherwise, add it
        const checkAdd = await db.Cart_Item.findOrCreate({
            where: { cart_session_id: cart_session_id.id, product_id },
            defaults: {
                cart_session_id: cart_session_id.id,
                product_id,
                quantity: 1,
            },
        })

        if (!checkAdd[1]) {
            const destroy = await db.Cart_Item.destroy({
                where: { cart_session_id: cart_session_id.id, product_id },
            })

            resolve({
                err: destroy ? 0 : 1,
                msg: destroy && "Đã xóa sản phẩm khỏi giỏ hàng",
            })
        }

        return {
            err: checkAdd ? 0 : 1,
            msg: checkAdd && "Đã thêm sản phẩm vào giỏ hàng",
            // data: checkAdd ? checkAdd[0] : null,
        }
    } catch (error) {
        return error
    }
}

exports.order = async (req) => {
    try {
        const uuid = uuidv4() // code for order details
        const user_id = req.user.id
        const orders = req.body.orders

        if (!user_id || !orders) return { err: 1, msg: "Lỗi!" }

        // First, create order
        const [createOrder, created] = await db.Order_Detail.findOrCreate({
            where: { code: uuid },
            defaults: {
                user_id,
                status_id: 1, // default 1 - Chờ xác nhận
                total: 0,
                code: uuid,
            },
            raw: true,
        })

        if (!created) return { err: 1, msg: "Không khởi tạo được đơn hàng. Vui lòng thử lại!" }

        // Tạo order_item vào đơn hàng trên
        orders.map(async (item) => {
            const product = await db.Product.findOne({
                where: { id: item.product_id },
                attributes: ["id", "price", "discount"],
                raw: true,
            })

            await db.Order_Item.create({
                order_detail_id: createOrder.dataValues.id,
                product_id: item.product_id,
                quantity: item.quantity,
                pay: calculatePayment(product.price, item.quantity, product.discount),
            })

            const pay = calculatePayment(product.price, item.quantity, product.discount)

            // get current total of order then plus with pay of new item order
            const getTotalOrder = await db.Order_Detail.findOne({
                where: { id: createOrder.dataValues.id },
                attributes: ["total"],
                raw: true,
            })

            const totalPayment = Number(getTotalOrder.total) + Number(pay)

            await db.Order_Detail.update(
                { total: totalPayment },
                {
                    where: { id: createOrder.dataValues.id },
                }
            )

            // Đặt hàng rồi thì vô giỏ hàng xóa nó đi
            const [[user]] = await db.sequelize.query(`
                select
                    users.id,
                    cart_sessions.id as 'cart_sessions_id'
                from
                    users
                    left join cart_sessions on cart_sessions.user_id = users.id
                where
                    users.id = ${user_id};
            `)

            if (user.cart_session_id && item.product_id) {
                await db.Cart_Item.destroy({
                    where: {
                        cart_session_id: user.cart_sessions_id,
                        product_id: item.product_id,
                    },
                })
            }
        })

        return {
            err: createOrder ? 0 : 1,
            msg: createOrder ? "Cảm ơn quý khách (づ￣ 3￣)づ" : "Đặt hàng thất bại!",
        }
    } catch (error) {
        return error
    }
}
