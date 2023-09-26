const messages = [];
const uuid = require('uuid').v4;

function addMessage(username, message) {
	const id = uuid();
	messages.push({
		id,
		username,
		message,
	});
}

function getMessages() {
	return messages;
}
module.exports = {
	addMessage,
	getMessages,
};