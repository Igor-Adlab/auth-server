import Mongoose, { Schema } from 'mongoose';
import PassportMongoose from 'passport-local-mongoose';

const SocialConnectSchema = new Schema({
  provider: { type: String, required: true },
  id: { type: String, required: true },
  profile: Object,
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  emails: { type: [String] },
  connects: { type: [SocialConnectSchema] },
});

UserSchema.plugin(PassportMongoose, {});

export default Mongoose.model('User', UserSchema);
