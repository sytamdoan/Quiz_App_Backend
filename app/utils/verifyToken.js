const { decrypt } = require("../authentication/crypto");
const db = require("../models");
const Session = db.session;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.slice(7);
  let sessionId;

  try {
    sessionId = await decrypt(token);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const session = await Session.findByPk(sessionId);
  if (!session) {
    return res.status(401).json({ message: "Session not found" });
  }

    req.userId = session.userId;
    console.log("Verified userId:", session.userId);
  next();
};

module.exports = verifyToken;
