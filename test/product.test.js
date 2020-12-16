import Product from '../src/model/product';
import sell from '../src/service/sellProduct';

test('should validate product decrement stock in 1 on sell', () => {
    let product = new Product('Celular', 500.00, 900.00, 10);
    sell(product, 1);
    expect(product.stock).toBe(9);
})