import fs from 'fs'

export default class ProductManager{
    #path
    #format
    
    constructor (path){
        this.#path = path;
        this.#format = 'utf-8'
    }

     
    generateId= (productos) =>{
        return (productos.length === 0) ? 1 : productos[productos.length-1].id + 1
    }
    
    addProduct = async (product) => {
        const productos = await this.getProducts()
        console.log(productos)
        productos.push({id:this.generateId(productos)})
        return await fs.promises.writeFile(this.#path,JSON.stringify(productos,null,'\t'))
    }
    updateProduct = async (id, producto)=> {
       
        const productos = await this.getProducts()
        console.log('llego aca')
        let encontrado = await this.getProductById(id)
        if( encontrado !== false){
            let nuevo = { // creo un nuevo producto guardandome el ID anterior
                id:      id,
                title:   producto.title,
                price:   producto.price,
                thumnail:producto.thumnail,
                code:    producto.code,
                stock:   producto.stock
            }
            let nuevosProductos = productos.filter(produ =>produ.code!==id) // filtro y saco al que no me sirve
           
            nuevosProductos.push(nuevo)// agrego el producto actualizado al array
            
            return await fs.promises.writeFile(this.#path, JSON.stringify(nuevosProductos,null,'\t')) //grabo en archivo
        }return false
       
    }
    deleteProduct = async (id) => {
        const productos = await this.getProducts()
        const yaEliminado = productos.filter(product => product.code!==id)
        return await fs.promises.writeFile(this.#path, JSON.stringify(yaEliminado,null,'\t')) //grabo en archivo
    }

    getProducts = async () =>{
        return JSON.parse(await fs.promises.readFile(this.#path,this.#format))
        
    }
    getProductById = async (id) => {
        const productos = await this.getProducts()
        let encontrado = productos.find((producto)=> producto.code==id)
        if (encontrado===undefined){
            console.log('el producto no existe')
            return false // si no lo encontre devuelve falso
        }else{
            console.log(encontrado)
            return encontrado // si lo encontre devuelve el objeto
        }
    }
    

}

