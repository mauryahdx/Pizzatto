// import  controllers
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController =  require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')

// import middleware

const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const authAdmin = require('../app/http/middleware/admin/authAdmin')

function initRoutes(app) {


    app.get('/', homeController().index)

    //auth routes
    
    app.get('/login', guest, authController().login)

    app.post('/login', guest, authController().loginPost)
    
    app.get('/register', guest,  authController().register)

    app.post('/register', guest,  authController().registerPost)

    app.get('/logout', authController().logout)

    // cutomer routes

    app.post('/update-cart', cartController().update)

    app.get('/cart', cartController().index)
    
    app.post('/order', auth, orderController().store)

    app.get('/customer/orders', auth, orderController().index)

    app.get('/customer/orders/:id', auth, orderController().show)
    
    //Adimn routes

    app.get('/admin/orders', authAdmin, adminOrderController().index)
    app.post('/admin/order/status', authAdmin, statusController().update)
}


module.exports = initRoutes