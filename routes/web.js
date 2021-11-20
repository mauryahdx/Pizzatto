const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const guest = require('../app/http/middleware/guest')


function initRoutes(app) {


    app.get('/', homeController().index)
    
    app.get('/cart', cartController().index)
    
    app.get('/login', guest, authController().login)

    app.post('/login', guest, authController().loginPost)
    
    app.get('/register', guest,  authController().register)

    app.post('/register', guest,  authController().registerPost)

    app.post('/update-cart', cartController().update)

    app.get('/logout', authController().logout)
}


module.exports = initRoutes