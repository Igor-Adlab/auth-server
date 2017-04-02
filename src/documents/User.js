import Mongoose, { Schema } from 'mongoose';
import PassportMongoose from 'passport-local-mongoose';

const SocialConnectSchema = new Schema({
  provider: { type: String, required: true },
  id: { type: String, required: true },
  profile: Object,
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  profile: { type: Object, default: {} },
  emails: { type: [String] },
  connects: { type: [SocialConnectSchema] },
  access_token: { type: String },
  provider: { type: String },
});

UserSchema.plugin(PassportMongoose, {});

export default Mongoose.model('User', UserSchema);
