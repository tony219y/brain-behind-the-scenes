import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import register from './api/v1/auth/authorization.js'
import user from './api/v1/users/user.js'
import profile from './api/v1/profile/profile.js'
import posts from './api/v1/post/post.js'
import manage from './api/v1/offerapply/work.js'
import attachments from './api/v1/attachments/attachments.js'

const app = new Hono()

app.route('/api/v1/auth',register)
app.route('/api/v1/users',user)
app.route('/api/v1/profiles',profile)
app.route('/api/v1/posts',posts)
app.route('/api/v1/manage',manage)
app.route('/api/v1/attachments', attachments)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})





const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
