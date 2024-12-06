import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import register from './api/v1/auth/authorization.js'
import user from './api/v1/users/user.js'

const app = new Hono()

app.route('/api/v1/auth',register)
app.route('/api/v1/users',user)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
