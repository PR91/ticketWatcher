var admin = require("firebase-admin");

//var admin = require("firebase-admin");

//var serviceAccount = require("~/firebase/gfir-test-3b14a-firebase-adminsdk-k66ne-3658dce733.json");

/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-test-3b14a.firebaseio.com/"
}); */

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "ticket-watch",
    "private_key_id": "77346295b1adf0ef629dcae86ed125e3395b679a",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxa2pgqLxpgu3K\nPLFiykEz+SwWTVlF/HoRur3z5mDAU9yonThwDDpRMpiGEsYRjeHg7X00lyWMaDI0\nW6xMjRe9EC845qkG3TgiwSHeOgwpNkAILgdso66XaleBo3BLjniM+mKewIZ8PWIy\nZY2VY8YzRT4It7EbjPuPI4EUl+W/qhg36XM+B7QqOyBZtr7c7IXr8yAw3LQ0Bf4/\nw6AD3vgG2KwDQ5A9iWi3ckfDXKmQtpqTB/QbYrBDtnFN2S+QBtUrVaLLVAbWokm7\nUKlrJvz0laBmY/gZFM28ob3i/9CP9aBjYW2Og9dDAH/1NJhIGQurcxK+IoVEpjqr\nEo5ggV37AgMBAAECggEAVBAdGydX/nY2zPfs5G4IbuPE69xCTFLQU84zanjhpr8V\nch7sOsrQZuCePAhxKKgdOkHMbTqgY+KKxxwYizze3onolgFUXRg8HNt9fJnsYSp/\nNGD6y5LSipOsWpRiBKrAm6uXRrjZ/8vl1xMe/oWDx48rUV4X4IHwP2YHJwbBqQnY\n3shMUKoNBCvljfCkxOWBd/Py6F/9phVpGi8GK3pZb4m1mfSQHLa+DTIG7xQZ3M/2\nNnaCPvVdX54K3TsWZTsAIWS0bdgWtuHKbsJgqLlewQZ9tyhWHBws3amNxmhA7ddR\n8HN4l18fhQ77oPHiu2ue2hj0Aw9rPhsvOD1YuS10QQKBgQDbGejTUad9zgDYrtaK\n/aoIs8LhmwcpNYVfkalKVTxA7bPr1V4ssh+0jJZEEZKtQRpr9kwfDrZtChnyw141\nWlzwpx2hXcOf8K45UvrMkIMAb5XnOCIBYTkVeJR5IC6sArCeF5Ro44657FNUovXK\nTY0z1FYfd7cQBEGsD+hGQ76oGQKBgQDPTH2EDMXM6icjm8mGbwU7QOpooNMWAgF3\nq/VU5y/Q51KL2P7c7BPob7bygR98rsQ5YC6eflj+Oqvfw1EIpqGSPFrpwzNvcqD7\n/YQzOmONw2GLGSsiHLdFsFQCPzBznP9dDO9nkz/ZeHUJa+wAjfd+fdiazD6wdy4z\nO1RaMiUJMwKBgBP/s27Gf0FOcmlU3CRnrwOIVPt+yRKL3haxFwC/8vYCPHAEU8pE\nn/w88OJZsEe8L4s3Og+DqkcdquyrxIeeLemRd3TpOBf7QgvddSMC9dIuXUJzrzbt\nBubc0MCVnWz5+eEUSemhC8AQwDJzhXfnyEG42fuZU85UdSIdeZggSuDRAoGACHBo\nu7N5afouVbjF338ti1f9Mv05GrBCNwj9F9PBkpOYPLE8zumdddz2abDwAzdqLZvI\nyhMCtHbXAGkHJ38BHN7wJIwZz/OushOECkHaQ68sjWkc5Gqe22tuQBkqc8p0aulX\n5bOM6eGJgjSuiuc8qB2fb83Yz35KlzNXH8Ti1RkCgYBoWT3VmWp6tRUCbTkXqGzc\npUiL5CpZcMxmhiy/UnjXQdpHzSyAIHRpohqOUl4T4LL45lH8Hr1jRYV/oGYM+z1y\nYbWxz2wex9F6BBgoNviQvBlxwxIm97WBkbDdt3xvWMPxrgHLFVvGS34Cph8dvn33\nRKE7xPosx6BCseaj1lSAAg==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-m8yvd@ticket-watch.iam.gserviceaccount.com",
    "client_id": "111096545434425323431",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-m8yvd%40ticket-watch.iam.gserviceaccount.com"
  }
),
  databaseURL: "https://ticket-watch.firebaseio.com/"
});





// The topic name can be optionally prefixed with "/topics/".
var topic = "allTickets";

//var registrationToken = "fcRYQEC52qE:APA91bFk_5fiJSrgmMrzVqThjaPAaV7TGZ6U0nzAHeYLMlkJzYCckUGtxP0cYaq57dIO4kArN6dzpWvoTE-xl4Zhw5YdPzomi1d3eVziEiSOY21_RlTkjIZSuk6tsIjXg3G4XqGgi5jC";


// See the "Defining the message payload" section below for details
// on how to define a message payload.
/*var payload = {
  "notification" : {
      "body" : "great match!",
      "title" : "Portugal vs. Denmark",
      "sound" : "activated"
    }
}; */

var equipa1 = "FC Porto";
var equipa2 = "RB Leipzig"

var gameTime = "Quarta Feira, 29 de Outubro"
var gamePlace = "Estádio do Dragão";


var payload = {
  "notification": {
    "body": gameTime.concat("\n", "Bilhetes Já Disponíveis!"),
    "title": equipa1.concat(" vs ", equipa2),
    "sound" : "hino_porto",
    "icon" : "porto_notification_medium",
    "color" : "#00529F"
  }
};

// Send a message to devices subscribed to the provided topic.
admin.messaging().sendToTopic(topic, payload)
  .then(function(response) {
    // See the MessagingTopicResponse reference documentation for the
    // contents of response.
    console.log("Successfully sent message:", response);
    process.exit();
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
    process.exit();
  });
