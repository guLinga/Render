import { WechatyBuilder } from 'wechaty'
import qrcode from 'qrcode-terminal'
import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.options('*', cors())

const port = 4000

app.get('/', (req, res) => {
  res.send('你好')
})

app.get('/test', (req, res) => {
  class weChaty {
    bot = null
    constructor() {
      this.bot = WechatyBuilder.build({
        name: 'wechat-assistant', // generate xxxx.memory-card.json and save login data for the next login
        puppetOptions: {
          uos: true,
        },
      })
      this.bot.on('scan', (code) => {
        const qrcodeImageUrl = `https://wechaty.js.org/qrcode/${encodeURIComponent(
          code
        )}`
        qrcode.generate(code, { small: true }, (data) => {
          console.log(data)
        })
        res.send(qrcodeImageUrl)
      })
      this.bot.on('login', (user) => console.log(`User ${user} logged in`))
      this.bot.on('message', this.onMessage.bind(this))
    }
    onMessage(message) {
      const room = message.room()
      if (
        room &&
        message.payload.roomId ===
          '@@3028fee88f1f1dba1507039875d73c7f6448fd3c3759fb27b5d79fc97072af13'
      ) {
        room.say('你好')
      }
    }
    run() {
      this.bot.start()
    }
  }
  new weChaty().run()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
