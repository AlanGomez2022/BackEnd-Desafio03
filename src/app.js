import express from 'express'
import ProductManager from './productManager.js'

//--------------------------------------------------------------------------------CREO EL SERVIDOR
const app = express()

app.get('/', (request, response) =>{
    response.send('<h1>HOLA</h1>')
})

app.listen(8080,() => console.log('server UP...'))

const listProducts = new ProductManager('./productos.json')


app.get('/products', async (request,response)=>{
    const id = request.query.id
    const products = await listProducts.getProducts()
    if(!id){
        response.send(products)
    }else{
        response.send(products.slice(0,id))
    }
    
})
app.get('/products/:pid', async (request,response)=>{
    const pid = request.params.pid
   
    if (!await listProducts.getProductById(pid)){
        response.send({"error":"PRODUCTO NO ENCONTRADO"})
    }else{
        response.send(await listProducts.getProductById(pid))
    }
})

