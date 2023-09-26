const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {

  for (const sid of Object.keys(sessions)) {
    const user = sessions[sid].username;
    if (user === username) {
      return sid;
    }
  }

  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
};

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

function getOnlineUsers() {
  const users = [];

  for (const sid of Object.keys(sessions)) {
    const user = sessions[sid].username;
    users.push(user);
  }

  return users;
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  getOnlineUsers,
};
