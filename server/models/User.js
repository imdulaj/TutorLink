import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        //required: true,
        unique: true,
        trim: true
      },
      stream: {
        type: String,
        required: true,
        enum: ['science', 'maths', 'art', 'commerce', 'tech']
      },
     
      registrationNumber: {
        type: String,
        required: true,
        unique: true
      },
      contactNumber: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      role:{
        type: String,
        default:"user"
      },
      subscription:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
      }]

},
{
    timestamps: true,
})

export const User = mongoose.model("User", schema)