const { Schema, model } = require('mongoose');;

const ChatroomSchema = () => {
  return new Schema(
    {
      creator:{
        type:String,
      },
      users: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      messages: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Message',
        },
      ],
      createdAt: {
        type: Date,
        default: new Date,
      },
    },
    {
      versionKey: false,
    }
  );
};

const ChatroomModel = model('Chatroom', ChatroomSchema());

module.exports = { ChatroomModel };
