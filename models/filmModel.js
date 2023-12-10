import mongoose from "mongoose";

const filmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required:true
    },
    description: {
        type: String,
        required:true
    },
    ticketPrice:{
        type: Number,
        required: true
    },
    genre:{
        type:mongoose.ObjectId,
        ref: 'Genre',
        required:true
    },
    ticketsAmount:{
        type: Number,
        required:true
    },
    photo:{
        data: Buffer,
        contentType: String
    },
},
{timestamps: true}

);

export default mongoose.model("Film", filmSchema);