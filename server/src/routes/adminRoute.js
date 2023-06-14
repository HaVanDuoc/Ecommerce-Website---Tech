const productControllers = require("../controllers/adminControllers/productControllers")
const databaseControllers = require("../controllers/adminControllers/databaseControllers")
const displayControllers = require("../controllers/adminControllers/display")
const { listBrand } = require("../controllers/adminControllers/admin")
const router = require("express").Router()

router.post("/", (req, res) => res.status(200).json({ msg: "Admin Page" }))
router.get("/listBrand", listBrand)

// Product
router.post("/product/newProduct", productControllers.createNewProduct) // Create new products
router.get("/product/:productId", productControllers.getProduct) // Get a product
router.put("/product/update/:productId", productControllers.updateProduct) // update product
router.delete("/product/:productId", productControllers.deleteProduct) // Delete a product
router.post("/product/newProduct/listSelectBrand", productControllers.getListSelectBrand) // List brand

// ---- Display
router.get("/display/category", displayControllers.listCategories)
router.post("/display/category/newCategory", displayControllers.createNewCategory)
router.get("/display/category/:categoryId", displayControllers.getCategory)
router.put("/display/category/:categoryId", displayControllers.updateCategory)
router.get("/display/brand", displayControllers.listBrand)
router.post("/display/brand/newBrand", displayControllers.createNewBrand)
router.post("/display/updateCategory/:categoryId/setBrandForCategories", displayControllers.setBrandForCategories)
router.get("/display/category/updateCategory/:categoryId/selectedBrands", displayControllers.selectedBrands)
router.get("/display/brand/:brandId", displayControllers.getBrand)
router.put("/display/brand/update/:brandId", displayControllers.updateBrand)

// Database
router.post("/database/newCategory", databaseControllers.createNewCategory) // Create new category
router.post("/database/newStatus", databaseControllers.createNewStatus) // Create new status
router.post("/database/newRole", databaseControllers.createNewRole) // Create new role

module.exports = router
