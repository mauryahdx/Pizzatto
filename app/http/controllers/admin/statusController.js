const Order = require('../../../models/order')

function statusController() {
    return {

        update(req, res) {

            Order.updateOne({_id: req.body.orderId}, {status: req.body.status}, (err, data)=>{
                if(err){
                    return res.redirect('/admin/orders')
                }
                // Emit Event 
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status })
                //console.log('Event Emitted')
                return res.redirect('/admin/orders')
            })

        }

    }
}

module.exports = statusController