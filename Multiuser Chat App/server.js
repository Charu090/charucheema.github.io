const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const users = require('./users');
const messages = require('./messages');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

app.get('/api/session', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if (!sid || !users.isValid(username)) {
		res.status(401).json({
			error: 'auth-missing'
		});
		return;
	}
	res.json({
		username
	});
});

app.post('/api/session', (req, res) => {
	const {
		username
	} = req.body;
	if (!users.isValid(username)) {
		res.status(400).json({
			error: 'required-username'
		});
		return;
	}
	if (username === 'dog') {
		res.status(403).json({
			error: 'auth-insufficient'
		});
		return;
	}
	if (username.length>20) {
	    res.status(400).json({
        error: 'invalid-username-length'
    	});
    	return;
	}
	const sid = sessions.addSession(username);
	res.cookie('sid', sid);
	res.json({
		username
	});
});

app.delete('/api/session', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if (sid) {
		res.clearCookie('sid');
	}
	if (username) {
		sessions.deleteSession(sid);
	}
	res.json({
		username
	});
});

app.get('/api/users', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if (!sid || !users.isValid(username)) {
		res.status(401).json({
			error: 'auth-missing'
		});
		return;
	}
	let currentOnlineUsers = sessions.getOnlineUsers();
	return res.json(currentOnlineUsers);
});

app.get('/api/messages', (req, res) => {
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !users.isValid(username)) {
		res.status(401).json({
			error: 'auth-missing'
		});
		return;
	}
	const updatedMessages = messages.getMessages();
	return res.json(updatedMessages);
});

app.post('/api/messages', (req, res) => {
	const {
		message
	} = req.body;
	const sid = req.cookies.sid;
	const username = sid ? sessions.getSessionUser(sid) : '';
	if(!sid || !users.isValid(username)) {
		res.status(401).json({
			error: 'auth-missing'
		});
		return;
	}
	if(!message || message == '') {
		res.status(400).json({
			error: 'required-message'
		});
		return;
	}
	messages.addMessage(username, message);
	const updatedMessages = messages.getMessages();
	return res.json(updatedMessages);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));