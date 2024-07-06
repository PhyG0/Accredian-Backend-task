const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

// Register route
const handleRegister = async (req, res) => {
  try {
    const { username, firstName, lastName, password } = req.body

    if (!username || !firstName || !lastName || !password) {
      return res.status(400).json({
        message:
          'Need username, firstname, lastname and password to create and account!',
      })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    })

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        password: hashedPassword,
        referralCode: uuidv4(),
      },
    })

    const refreshToken = jwt.sign({ username }, process.env.REFRESH_SECRET, {
      expiresIn: '1d',
    })
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    })

    res
      .status(201)
      .json({ message: 'User registered successfully', userId: newUser.id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error registering user' })
  }
}

module.exports = handleRegister
