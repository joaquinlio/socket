const express = require('express')
const next = require('next')

const http = require('http')
const socketIo = require('socket.io')


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  const server2 = http.createServer(server);
  const io = socketIo(server2);

  io.on('connection',socket => {
    console.log('socket conectado: ', socket.id);

    socket.on('message',body => {
      socket.broadcast.emit('message',{
        body,
        from: socket.id.slice(8)
      })
    })

  })


  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server2.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
