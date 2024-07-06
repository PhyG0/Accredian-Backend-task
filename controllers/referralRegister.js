const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

async function addReferralReward(username, rewardType, amount, description) {
  try {
    const newReward = await prisma.reward.create({
      data: {
        type: rewardType,
        amount: amount,
        description: description,
        user: {
          connect: {
            username: username,
          },
        },
      },
    })

    console.log(`New reward added for user ${username}:`, newReward)
  } catch (error) {
    console.error('Error adding reward:', error)
    throw error
  }
}

// Register route
const handleReferralRegister = async (req, res) => {
  try {
    const { username, firstName, lastName, password } = req.body
    const { referralCode } = req.params

    if (!referralCode) {
      return res
        .status(500)
        .json({ message: 'Something went wrong. Try again.' })
    }

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

    // Apply Referral code
    const referrer = await prisma.user.findUnique({
      where: { referralCode: referralCode },
    })

    if (!referrer || referrer.isReferralCodeUsed === true) {
      return res.status(400).json({ message: 'Referral code expired' })
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

    if (!newUser) {
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please try again later.' })
    }

    const refreshToken = jwt.sign({ username }, process.env.REFRESH_SECRET, {
      expiresIn: '1d',
    })

    // Reward for referrer
    await addReferralReward(
      referrer.username,
      'PRIZE',
      1000,
      'For successfull referring the code to new user.'
    )
    const result = await prisma.user.updateMany({
      where: { username: referrer.username },
      data: { isReferralCodeUsed: true },
    })
    if (!result) {
      return res
        .status(500)
        .json({ message: 'Something went wrong. Please try again later.' })
    }
    // Reward for referee
    await addReferralReward(
      newUser.username,
      'DISCOUNT',
      500,
      'For successfully redeeming the referral code.'
    )

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res
      .status(201)
      .json({ message: 'User registered successfully', userId: newUser.id })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error registering user' })
  }
}

module.exports = handleReferralRegister
