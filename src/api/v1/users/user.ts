import { Hono } from 'hono'
import { db } from '$db'
import * as table from '$schema'
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

app.post('/updatePortfolioPicture', async(c) => {
    
    const {userID, portID, updated_picture} = await c.req.json();
  
    return c.json({userID, portID, updated_picture},200)
})

app.get('/see-user', async (c)=>{
    console.log("Hello")
    const response = await db.select().from(table.users)

    return c.json({response})
})
app.put('/edit', async (c) => {
    const { name, skill, education, facebook, github, x } = await c.req.json();
    console.log(name + " from back");

    return c.json({ 
        name: name, 
        skill:skill, 
        education:education, 
        facebook:facebook,
        github:github,
        x:x
    }, 200)
})

export default app;