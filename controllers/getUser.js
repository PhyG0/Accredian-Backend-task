const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getUser = async (req, res) => {
  try {
    const { username } = req.params

    if (!username) {
      return res.status(400).json({ message: 'Please provide username' })
    }

    const user = await prisma.user.findUnique({
      where: { username: username },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        referralRewards: true,
        referralCode: true,
        isReferralCodeUsed: true,
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error retrieving user data' })
  }
}

module.exports = getUser
