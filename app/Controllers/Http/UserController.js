'use strict'

const Database = use('Database')
const User = use('App/Models/User')
// const crypto = require('crypto')
// const Mail = use('Mail')

class UserController {
  async store({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const addresses = request.input('addresses')

    const trx = await Database.beginTransaction()

    // const userToken = crypto.randomBytes(10).toString('hex')
    // const user = await User.create({ ...data, token: userToken })

    const user = await User.create(data, trx)

    await user.addresses().createMany(addresses, trx)

    await trx.commit()

    /* await Mail.send(
      ['emails.forgot_password'],
      {
        email: data.email,
        token: 'tokenteste',
        link: 'link'
      },
      (message) => {
        message
          .to(data.email)
          .from('joao@goatspace.co', 'João Castro')
          .subject('Aprovação de usuário')
      }
    ) */

    return user
  }
}

module.exports = UserController
