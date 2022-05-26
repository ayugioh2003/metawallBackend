const { Schema, model } = require('mongoose');

const MessageSchema = () => {
  return new Schema(
    {
      content: {
        type: String,
        require: [true, '訊息內容需填寫'],
      },
      userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      chatroomid: {
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
