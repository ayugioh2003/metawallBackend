const { Schema, model } = require('mongoose');

const MessageSchema = () => {
  return new Schema(
    {
      content: {
        type: String,
        require: [true, '訊息內容需填寫'],
      },
      type:{
        type:String,
        require:[true,'訊息種類必填'],
        enum: {
          values: ['global-message', 'notification'],
          message: '僅接受 global-message, notification',
        },
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      chatroom: {
        type: Schema.Types.ObjectId,
        ref: 'Chatroom',
      },
    },
    {
      versionKey: false,
    }
  );
};

const MessageModel = model('Message', MessageSchema());

module.exports = { MessageModel };
