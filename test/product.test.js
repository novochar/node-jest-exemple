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
});

test("should not update product if not exist", async () => {
  await request(app)
    .put('/products/4354645644')
    .expect(400);
});

test('should not be possible delete product if not exists', async() => {
  await request(app)
  .delete('/products/4354645644')
  .expect(400); 
});

test("should remove product if exist and return status 204", async() => {
  const response = await request(app)
    .post('/products')
    .send(products[0]);
  
  await request(app)
  .delete(`/products/${response.body.code}`)
  .expect(204); 
})

test("should be possible list all products", async() => {
  const  response = await request(app)
    .post('/products')
    .send(products[0]);

  const responseGet = await request(app)
    .get('/products')
  
  expect(responseGet.body).toHaveLength(1);
});

test('should remove all product by code', async () => {
  await request(app)
    .post('/products')
    .send(products[0]);
  
  await request(app)
    .post('/products')
    .send(products[0]);
  
  await request(app)
    .post('/products')
    .send(products[1]);

  await request(app)
    .delete(`/products/${products[0].code}`)
  
  const responseAll = await request(app)
    .get('/products');
  
  expect(responseAll.body).toHaveLength(1);
})

test('should be possible love a product', async () => {
  const response = await request(app)
    .post('/products')
    .send(products[0]);
  
  const responseLove = await request(app)
    .post(`/products/${response.body.code}/love`)
    .send(response.body)
  
  expect(responseLove.body).toMatchObject({
    lovers: 1
  })
})