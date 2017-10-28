var fs = require('fs');
var iconv = require('iconv-lite');
var parse5 = require('parse5');
var admin = require("firebase-admin");
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://pedrobrito14%40gmail.com:edugztdwmsmqilms@smtp.gmail.com');


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
  }),
  databaseURL: "https://ticket-watch.firebaseio.com/"
});

var topic = "allTickets";

var games = [];

var requestSettings = {
  method: 'GET',
  url: 'http://loja.fcporto.pt/LojaAssociado/Bilhetes/eventos.asp',
  encoding: null
}


var request = require('request');
request(requestSettings, function(error, response, body) {
  if (!error && response.statusCode == 200) {


    var body = iconv.decode(body, "ISO-8859-1");

    var parsed = parse5.parse(body);

    //parsed = JSON.stringify(parsed);


    // fs.writeFile("./object.txt", parsed, function(err) {
    //              if(err) {
    //                      return console.log(err);
    //              }
    //      });

    //console.log(parsed.childNodes[1].childNodes[2].childNodes[1].childNodes[2].childNodes[6].childNodes[0].childNodes[0].childNodes[0]);






    //var equipa1 = parsed.childNodes[1].childNodes[2].childNodes[1].childNodes[2].childNodes[6].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0]./*EQUIPA*/childNodes[0].childNodes[2].childNodes[0].value;
    //var equipa2 = parsed.childNodes[1].childNodes[2].childNodes[1].childNodes[2].childNodes[6].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[2].childNodes[0].value;
    //console.log(parsed.childNodes[1].childNodes[2].childNodes[1].childNodes[2].childNodes[6].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0]./*EQUIPA*/childNodes[0].childNodes[2].childNodes[0].value);
    //console.log(parsed.childNodes[1].childNodes[2].childNodes[1].childNodes[2].childNodes[6].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[2].childNodes[0].value);

    //console.log(equipa1 + ' vs ' + equipa2);

    //console.log(parsed.childNodes[1].childNodes[2].childNodes[1].childNodes[2].childNodes[6].childNodes[0].childNodes[0].childNodes.length);

    try {

      for (i = 0; i < parsed.childNodes[1].childNodes[2].childNodes[1].childNodes[2].childNodes[6].childNodes[0].childNodes[0].childNodes.length; i = i + 2) {

        var equipa1 = parsed.childNodes[1].childNodes[2].childNodes[1].childNodes[2].childNodes[6].childNodes[0].childNodes[0].childNodes[i].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0]. /*EQUIPA*/ childNodes[0].childNodes[2].childNodes[0].value;
        var equipa1_pic = 'http://loja.fcporto.pt' + parsed.childNodes[1].childNodes[2].childNodes[1].childNodes[2].childNodes[6].childNodes[0].childNodes[0].childNodes[i].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0]. /*EQUIPA*/ childNodes[0].childNodes[0].attrs[1].value;
        var equipa2 = parsed.childNodes[1].childNodes[2].childNodes[1].childNodes[2].childNodes[6].childNodes[0].childNodes[0].childNodes[i].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[2].childNodes[0].value;
        var equipa2_pic = 'http://loja.fcporto.pt' + parsed.childNodes[1].childNodes[2].childNodes[1].childNodes[2].childNodes[6].childNodes[0].childNodes[0].childNodes[i].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0].attrs[1].value;
        var data = parsed.childNodes[1].childNodes[2].childNodes[1].childNodes[2].childNodes[6].childNodes[0].childNodes[0].childNodes[i].childNodes[0].childNodes[0].childNodes[4].childNodes[0].childNodes[2].value;
        var hora = parsed.childNodes[1].childNodes[2].childNodes[1].childNodes[2].childNodes[6].childNodes[0].childNodes[0].childNodes[i].childNodes[0].childNodes[0].childNodes[4].childNodes[0].childNodes[0].value;
        hora = hora.replace('\t\t\t\t\t\t\t\t\n\t\t\t\t', '');

        var game = {
          homeTeam: {
            name: equipa1,
            picture: equipa1_pic
          },
          awayTeam: {
            name: equipa2,
            picture: equipa2_pic
          },
          gameTime: data,
          gamePlace: hora
        };

        games.push(game);
      }


      fs.readFile('./games.txt', 'utf8', function(err, data) {
        if (err) {
          fs.writeFile("./games.txt", JSON.stringify(games, null, 2), function(err) {});
        }

        if (data == JSON.stringify(games, null, 2))
          console.log('No Changes Detected');

        else {
          console.log('Something Changed, Sending Email!');
          fs.writeFile("./games.txt", JSON.stringify(games, null, 2), function(err) {
            if (err) {
              return console.log(err);
            }
          });

          /*	var mailOptions = {
          	    from: '"TicketWatch"', // sender address
          	    to: '1100471@isep.ipp.pt', // list of receivers
          	    subject: 'Changes Detected on The Ticket Website', // Subject line
          	    text: JSON.stringify(games, null, 2), // plaintext body
          	};


          	transporter.sendMail(mailOptions, function(error, info){
          	    if(error){
          	        return console.log(error);
          	    }
          	    console.log('Message sent: ' + info.response);
          	}); */

          // See the "Defining the message payload" section below for details
          // on how to define a message payload.
          var payload = {
            "notification": {
              "body": "Time: ".concat(gameTime, " @ ", gamePlace),
              "title": equipa1.concat(" vs ", equipa2),
              "sound": "activated"
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






        }

      });

    } catch (err) {

      fs.writeFile("./games.txt", "No Tickets Available", function(err) {
        if (err) {
          return console.log(err);
        }
      });

    }
  }
});
