import Profile from '../database/models/Profile.js'
import validator from 'validator'
import User from '../database/models/User.js'

export const updateUserProfile = async (input) => {
    try {
        const isValidEmail = validator.isEmail(input.email)
        if (!isValidEmail) {
            throw new Error('The provided email address is not Valid')
        }
        const profile = await Profile.findOneAndUpdate({ user: input.userId }, { ...input }, { new: true })
        if (!profile) {
            const newProfile = new Profile({
                ...input,
                user: input.userId
            })
            const result = newProfile.save()

            return result
        }

        return profile
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const fetchUserProfile = async (parent, loaders) => {
    try {
        const profile = await loaders.user.load(parent)
        return profile
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
