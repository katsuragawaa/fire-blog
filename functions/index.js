const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addAdminRole = functions.https.onCall(async (data) => {
  try {
		const user = await admin
			.auth()
			.getUserByEmail(data.email);
		await admin.auth().setCustomUserClaims(user.uid, {
			admin: true,
		});
		return { message: `Sucesso! ${data.email} é agora um admin` };
	} catch (err) {
		console.log(err);
	}
});
