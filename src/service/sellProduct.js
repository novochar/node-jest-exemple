export default function sellProduct(product, amount){
    product.stock -= amount;
    return product; 
}