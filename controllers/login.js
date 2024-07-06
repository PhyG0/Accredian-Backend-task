const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username: username },
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Compare provided password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Password is valid, user is authenticated
    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_SECRET,
      { expiresIn: '1d' }
    )
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.json({ message: 'Login successful', userId: user.id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error logging in' })
  }
}

module.exports = handleLogin
