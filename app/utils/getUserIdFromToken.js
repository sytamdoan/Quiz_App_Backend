const { decrypt } = require("../authentication/crypto");
const db = require("../models");
const Session = db.session;

async function getUserIdFromToken(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw { status: 401, message: "No token provided" };
  }

  const token = authHeader.split(" ")[1];
  const sessionId = await decrypt(token);
  const session = await Session.findByPk(sessionId);

  if (!session || !session.userId) {
    throw { status: 401, message: "Invalid session" };
  }

  return session.userId;
}

module.exports = getUserIdFromToken;