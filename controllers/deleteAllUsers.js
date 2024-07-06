const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const deleteAllUsers = async (req, res) => {
  if (req.body.password != process.env.ADMIN_PASSWORD) {
    console.error('Error deleting users:', error)
    res.status(500).json({ message: 'Error deleting users' })
  }

  try {
    await prisma.reward.deleteMany({})
    const deletedUsers = await prisma.user.deleteMany({})
    console.log(`Deleted ${deletedUsers.count} users.`)
    res.json({
      message: `Successfully deleted all user data`,
      count: deletedUsers.count,
    })
  } catch (error) {
    console.error('Error deleting users:', error)
    res.status(500).json({ message: 'Error deleting users' })
  }
}

module.exports = deleteAllUsers
