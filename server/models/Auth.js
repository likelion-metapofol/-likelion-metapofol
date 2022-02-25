const mongoose = require('mongoose');
const authSchema = mongoose.Schema({
	address: { type: String},
	auth_status: { type: String, default: '01'},
	auth_dtm: { type: Date, default: Date.now },
	ctg_id: { type: String },
	auth_title: { type: String },
	auth_description: { type: String },
	image_file1: { type: String },
	cre_id: { type: String, default: 'ADMIN'},
	cre_dtm: { type: Date, default: Date.now },
	upd_id: { type: String, default: 'ADMIN' },
	upd_dtm: { type: Date, default: Date.now },
});

const Auth = mongoose.model('Auth', authSchema);

module.exports = { Auth };