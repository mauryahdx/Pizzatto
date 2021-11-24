
import axios from 'axios'
import Noty from 'noty'
import moment from 'moment'
import  { initAdmin } from './admin'

let cartCounter = document.querySelector('#cartCounter')
let addToCart = document.querySelectorAll('.add-to-cart')
//console.log(cartCounter)
function updateCart(pizza){
    axios.post('update-cart', pizza).then(res =>{
        //console.log()
        //console(res.data.totalQty)
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Items Added to cart',
            progressBar: false,
            layout:'topLeft'
        }).show();
    }).catch(err => {

        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something Went Wrong',
            progressBar: false,
            layout:'topLeft'
        }).show();

    })
}

//document.querySelector('#cartCounter')



addToCart.forEach((btn) => {
    //console.log("button listener")
    btn.addEventListener('click', (e)=>{
        let pizza =JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        // console.log(pizza)
        //console.log(e)
    })
})
//console.log(addToCart.length)

const alertMsg = document.querySelector('#success-alert')

if(alertMsg) {
    setTimeout(()=>{
        alertMsg.remove()
    }, 2000)
}



// Change Order Status



let hiddeninput = document.querySelector('#hiddenInput')

let order = hiddeninput ? hiddeninput.value : null

order = JSON.parse(order)

let time = document.createElement('small')
let statuses = document.querySelectorAll('.status_line')
function updateStatus(order){
    let stepCompleted =true;
    

    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    } )

    statuses.forEach((status)=>{
        let dataProp = status.dataset.status
        if(stepCompleted) {
            status.classList.add('step-completed')
        }

        if(dataProp === order.status){
            stepCompleted = false
            time.innerText =moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }
            
        }
     })
}





//Socket

let socket = io()


//Join
if(order){
    socket.emit('join', `order_${order._id}`)
}

let adminAreaPath = window.location.pathname

if(adminAreaPath.includes('admin')){
    initAdmin(socket)
    socket.emit('join', 'adminRoom')
}

socket.on('orderUpdated', (data)=>{
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    //console.log(updatedOrder)
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order Updated',
        progressBar: false,
        layout:'topLeft'
    }).show();

})



updateStatus(order);