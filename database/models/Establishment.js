import mongoose from 'mongoose'
import unique from 'mongoose-unique-validator'

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'You need to provide a Name for the Establishment'],
            min: [2, 'Establishment Name should contain at least 2 characters'],
            unique: true
        }
    },
    {
        timestamps: true
    }
)

schema.plugin(unique)

export const EstablishmentSchema = mongoose.model('Establishment', schema)
