import { Hono } from 'hono'

const app = new Hono();


app.get('/connect')

app.put('/profile', async (c) => {
    const {name} = await c.req.json();
    console.log(name + " from back");

    return c.json({message : name}, 200)
})

app.post('/profile/:username', async (c) => {
    const { name } = await c.req.json();
    // const { username } = await c.req.param;
    console.log(name)
    // return c.json({message : name}, 200)
})

export default app;