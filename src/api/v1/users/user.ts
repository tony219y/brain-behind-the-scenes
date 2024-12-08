import { Hono } from 'hono'
import { db } from '$db'
// import { usersTable } from '$schema'
const app = new Hono()

app.get('/', (c) => {
    return c.text('Hello edit!')
})

app.post('/createPortfolio', async(c) => {
  
    const {userID, context, picture_url} = await c.req.json();
  
    return c.json({userID, context, picture_url},200)
})

app.post('/updatePortfolioDetail', async(c) => {
    
    const {userID, portID, updated_detail} = await c.req.json();
  
    return c.json({userID, portID, updated_detail},200)
})


export default app;