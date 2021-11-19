
import axios from 'axios'
import Noty from 'noty'

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