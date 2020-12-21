import express from 'express'
import cors from 'cors'
import {uuid} from 'uuidv4'

const app = express();
let products = [];
app.use(express.json());
app.use(cors());

app.post('/products', ( request, response ) => {
    const { code, description, buyPrice, sellPrice, tags } = request.body
    const p = products.find((v) => v.code === code);
    const lovers = p ? p.lovers : 0
    const product = {
        id: uuid(),
        code,
        description,
        buyPrice,
        sellPrice,
        tags,
        lovers
    }
    products.push(product);
    response.status(201).json(product);
})

app.put('/products/:id', (request, response) => {
  const { id } = request.params
  const { description, buyPrice, sellPrice, tags } = request.body

  const p = products.find((v) => v.id === id);
  if(p) {
    p.description = description;
    p.buyPrice = buyPrice;
    p.sellPrice = sellPrice;
    p.tags = tags;

    response.json(p);
  } else {
    response.status(400).send();
  }

})

export default app