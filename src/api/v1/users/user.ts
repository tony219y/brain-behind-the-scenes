import { Hono } from 'hono'
const app = new Hono()


app.get('/', (c) => {
    return c.text('Hello edit!')
})




// Example
app.post('/test', async(c) => {

    const {text} = await c.req.json();

    return c.json({newtext: text},200)
  })


export default app;