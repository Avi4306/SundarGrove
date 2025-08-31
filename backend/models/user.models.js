// server/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { Schema, model } = mongoose;

const badgeSchema = new Schema({
  name: { type: String, required: true },
  awardedAt: { type: Date, default: Date.now },
  meta: { type: Schema.Types.Mixed }
}, { _id: false });

const userSchema = new Schema({
  name: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true, unique: true, sparse: true },
  password: { type: String },
  phone: { type: String, trim: true },
  provider: { type: String, enum: ["local", "google"], default: "local" },
  providerId: { type: String },
  role: { type: String, enum: ["guardian", "admin"], default: "guardian" },

  points: { type: Number, default: 0 },
  badges: { type: [badgeSchema], default: [] },
  verifiedReports: { type: Number, default: 0 },
  reportedCount: { type: Number, default: 0 },

  isActive: { type: Boolean, default: true }
});

// Pre-save hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// JWT
userSchema.methods.generateJWT = function () {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in environment");
  }
  const payload = { id: this._id, role: this.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Gamification helpers
userSchema.methods.addPoints = function (n = 0) {
  this.points += n;
  return this.save();
};

userSchema.methods.awardBadge = function (name, meta = {}) {
  this.badges.push({ name, meta });
  return this.save();
};

userSchema.methods.incrementVerifiedReports = function (n = 1) {
  this.verifiedReports += n;
  return this.save();
};

// Remove sensitive fields when sending JSON
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export default model("User", userSchema);