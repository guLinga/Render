import { WechatyBuilder } from 'wechaty'
import qrcode from 'qrcode-terminal'

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
      qrcode.generate(code, { small: true })
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
