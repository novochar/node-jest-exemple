import request from 'supertest'
import app from '../src/app'

let products
beforeEach(() => {
    products = [
        {
            code: 12,
            description: 'Macbook pro retina 2020',
            buyPrice: 4000,
            sellPrice: 8000,
            tags: ['tecnologia', 'Apple', 'computador']
        },
        {
            code: 99,
            description: 'Positivo retina 2020',
            buyPrice: 1000,
            sellPrice: 2000,
            tags: ['tecnologia', 'Positivo', 'computador']
        }
    ]

})
test("should be possible add new product", async () => {
  const respose = await request(app)
    .post('/products')
    .send(products[0]);

  expect(respose.body).toMatchObject({ ...products[0], lovers: 0});
});

test("should status code be 201 to new product", async () => {
  await request(app)
    .post('/products')
    .send(products[0]);
  
  expect(201);
});

test("should update product", async () => {
  const response = await request(app)
    .post('/products')
    .send(products[0]);
  
  const updateProduct = {
    ...products[0], description: 'Dell Vostro'
  }

  const resposeUpdate = await request(app)
    .put(`/products/${response.body.id}`)
    .send(updateProduct)
  expect(resposeUpdate.body).toMatchObject(updateProduct);
})
