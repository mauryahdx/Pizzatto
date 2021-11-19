function cartController(){
    return {
       index(req, res){
           res.render('customers/cart')
       }, 

       update(req, res){
//             let cart ={
//                             items: {
//                                 pizzaId: {item: pizzaObject, qty:0},
//                             },
//                              totalQty:0,
//                              totalPrice:0
//                     }
                //console.log("no session")
                if(!req.session.cart){
                            req.session.cart = {
                                items: { },
                                totalQty: 0,
                                totalPrice: 0
                            }
                          //console.log("Cart in cookie")  

                            }
                        let cart = req.session.cart
                        //console.log(cart.items)
                        //console.log(cart.items)  
                         if((cart.items[req.body._id]==null)){
                             console.log("inside if")
                             cart.items[req.body._id] = {
                                item: req.body,
                                qty:1 
                             }
                             cart.totalQty =cart.totalQty+1
                             cart.totalPrice = cart.totalPrice + req.body.price
                         } else {
                             console.log("inside else")
                             cart.items[req.body._id].qty +=1
                             console.log("inside else2")
                             cart.totalQty = cart.totalQty + 1
                             cart.totalPrice = cart.totalPrice + req.body.price
                         }
                            console.log(req.body)
                            console.log(cart)
                            console.log('/////////')
                            return res.json({ totalQty: req.session.cart.totalQty})
                        }
}


}
module.exports = cartController