//se requiere file system

const { error, log } = require("console");
const fs = require("fs");

//ruta
const ruta = "./productos.json";
//se crea la clase

class ProductManager {
  static id = 0;

  constructor() {
    this.products = [];
    this.path = "./productos.json";
  }
  //metodo crear archivo
  createFile() {
    fs.writeFileSync("./productos.json", "[]");
  }
  //agregar producto
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      let productosActuales = await this.readProducts();
      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: ProductManager.id,
      };
      ProductManager.id++;
      productosActuales.push(newProduct);
      await this.saveProducts(productosActuales);
    } catch (error) {
      console.log("Error al agregar producto", error);
    }
  }
  //leer productos
  async readProducts() {
    try {
      const contenido = await fs.promises.readFile(this.path, "utf-8");
      let contenidoParseado = JSON.parse(contenido);
      return contenidoParseado;
    } catch (error) {
      console.log("Error al leer productos", error);
    }
  }
  //guarda el producto
  async saveProducts(arrayProductos) {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(arrayProductos, null, 2)
      );
    } catch (error) {
      console.log("No se pudo guardar el producto ", error);
    }
  }
  //trae la lista de productos
  async getProducts() {
    //verificar si el archivo existe
    let fileExist = fs.existsSync(ruta);
    if (!fileExist) {
      //si no extiste lo crea
      this.createFile();
    }
    try {
      const productos = await this.readProducts();
      console.log("Productos: ", productos);
    } catch (error) {
      console.log("No se pudo consultar el producto ", error);
    }
  }
  //busca por id
  async getProductById(id) {
    try {
      let products = await this.readProducts();
      let productoEncontrado = products.find((producto) => producto.id == id);
      productoEncontrado
        ? console.log(productoEncontrado)
        : console.log("Not found");
    } catch (error) {
      console.log(error);
    }
  }
  //fala completar esta funcion
  async updateProduct(id) {
    try {
      let products = await this.readProducts();
      let productoEncontrado = products.find((producto) => producto.id == id);
      console.log(productoEncontrado);
    } catch (error) {
      console.log(error);
    }
  }
  //falta terminar esta funcion
  async deleteProduct(id) {
    try {
      //encontrar producto
      let products = await this.readProducts();

      //encontrar indice
      let productIndex = products.findIndex((product) => product.id === id);
      //hacer el splice
      let newProducts = products.splice(productIndex);
      //ver array actualizado
      console.log(products);

      await this.saveProducts(products);
    } catch (error) {
      console.log(error);
    }
  }
}

//instanciamos
const productManager = new ProductManager();

//llamamos al getProducts
//productManager.getProducts();

// //agregamos un producto
// //nuevo producto:
// productManager.addProduct(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   "abc123",
//   25
// );
//probamos otro producto para chequear que el id no se repita
// productManager.addProduct(
//   "producto prueba 2",
//   "Este es OTRO producto prueba",
//   200,
//   "Sin imagen",
//   "abc124",
//   25
// );

// //consultamos nuevamente la base de productos:
//productManager.getProducts();

// buscamos producto por id
productManager.deleteProduct(1);
//el producto se encuentra
