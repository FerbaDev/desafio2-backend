//se requiere file system

const { error } = require("console");
const fs = require("fs").promises;

//se crea la clase
const ruta = "./productos.json";
class ProductManager {
  static id = 0;
  constructor(path) {
    this.products = [];
    this.path = ruta;
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
      productManager.id++;
      productosActuales.push(newProduct);
      await this.saveProduts(productosActuales);
    } catch (error) {
      console.log("Error al agregar prodcuto", error);
    }
  }
  //leer productos
  async readProducts() {
    try {
      const contenido = await fs.readFile(this.path, "utf-8");
      let contenidoParseado = JSON.parse(contenido);
      return contenidoParseado;
    } catch (error) {
      console.log("Error al leer productos", error);
    }
  }
  async saveProduts(arrayProductos) {
    await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    try {
    } catch (error) {
      console.log("No se pudo guardar el producto ", error);
    }
  }
  async getProducts() {
    try {
      const productos = await this.readProducts();
      console.log("Productos: ", productos);
    } catch (error) {
      console.log("No se pudo consultar el producto ", error);
    }
  }

  getProductById(id) {
    let prodcuto = this.products.find((producto) => producto.id === id);
    prodcuto ? { prodcuto } : console.log("Not found");
  }

  updateProduct() {}

  deleteProduct() {}
}

//instanciamos
const productManager = new ProductManager();

//agregamos un producto
//nuevo producto:
let encendedor = {
  title: "encendedor",
  description: "Marca BIC",
  price: 2000,
  thumbnail: "",
  code: "ABC123",
  stock: 100,
};
productManager.addProduct(encendedor);

//consultamos producto:

productManager.getProducts();
