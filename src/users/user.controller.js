const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const prisma = require('../db')
const dotenv = require('dotenv')

dotenv.config()

const getAllUser = async (req, res) => {
  const user = await prisma.user.findMany()

  res.send(user)
}

const Register = async (req, res) => {
  try {
    const { name, email, password, type } = req.body

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        type: type,
      },
    })

    res.send({
      error: 'false',
      message: 'User Created',
    })
  } catch (error) {
    console.log(error)
  }
}

const Login = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        email: req.body.email,
      },
    })

    const match = await bcrypt.compare(req.body.password, user[0].password)

    if (!match) return res.status(400).send('Wrong Password!')

    const userId = user[0].id
    const name = user[0].name
    const email = user[0].email

    const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '3600s',
    })

    res.send({
      error: 'false',
      loginResult: {
        id: userId,
        name: name,
        token: accessToken,
      },
      message: 'Success',
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getAllUser, Register, Login }
