const makeWASocket  = require("@whiskeysockets/baileys").default
const { Boom } = require('@hapi/boom')
const NodeCache = require("node-cache")
const readline = require("readline")
const PhoneNumber = require('awesome-phonenumber')
const cfonts = require('cfonts');
const pino = require('pino')
let phoneNumber = "523346541709"; // cambiar número
const fs = require('fs')
const axios = require('axios');
const { default: JulsBotIncConnect, getAggregateVotesInPollMessage, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@whiskeysockets/baileys")
const chalk = require('chalk')
const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})
const banner = cfonts.render((`Emilia | subBot Neko`), {
font: 'tiny',             
align: 'center',           
background: 'transparent',  
letterSpacing: 1,           
lineHeight: 1,            
space: true,               
maxLength: '0',            
gradrient: [`blue`,`yellow`],     
independentGradient: true, 
transitionGradient: true, 
env: 'node'
});  
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const { downloadFacebookVideo } = require('./fbdownload/fbDownloader');
let bienvenidaActivada = [];
try {
    bienvenidaActivada = JSON.parse(fs.readFileSync('./archivo/data/bienvenida.json', 'utf-8'));
    if (!Array.isArray(bienvenidaActivada)) {
        bienvenidaActivada = [];
    }
} catch (error) {
    bienvenidaActivada = [];
}
const codes = {}; // Mapa temporal para almacenar los códigos
// Leer el archivo de usuarios al inicio
let users = {};
try {
    const data = fs.readFileSync('users.json', 'utf8');
    users = JSON.parse(data);
    console.log("Usuarios cargados correctamente:", users);
} catch (error) {
    console.error("Error al cargar users.json:", error);
    users = {}; // Iniciar vacío si no existe o hay un error
}

// Resto de tu código de comandos...

let bal = { };
const guardarBalance = () => {
    try {
        fs.writeFileSync('./balance.json', JSON.stringify(bal, null, 2));
        console.log("Balance guardado correctamente.");
    } catch (error) {
        console.error("Error al guardar el balance:", error);
    }
};

let despedidaActivada = [];
try {
    despedidaActivada = JSON.parse(fs.readFileSync('./archivo/data/despedida.json', 'utf-8'));
    if (!Array.isArray(despedidaActivada)) {
        despedidaActivada = [];
    }
} catch (error) {
    despedidaActivada = [];
}

let mensajesBienvenida = {};
try {
    mensajesBienvenida = JSON.parse(fs.readFileSync('./archivo/data/mensajes_bienvenida.json', 'utf-8'));
} catch (error) {
    mensajesBienvenida = {}; // Si el archivo no existe o está vacío, inicializa como un objeto vacío
}
const getNekoImage = async () => {
  try {
    const response = await axios.get('https://nekos.life/api/v2/img/neko');
    return response.data.url; // Devuelve la URL de la imagen del neko
  } catch (error) {
    console.error('Error al obtener la imagen de neko:', error.message);
    throw new Error('No se pudo obtener una imagen de neko.');
  }
};

const Owner = 5213339992782

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
const color = (text, color) => { return !color ? chalk.yellow(text) : chalk.keyword(color)(text) };
function getGroupAdmins(participants) {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}

// Constantes Editables
const prefixo = "*"; // Cambiar Prefijo Aquí
const wm = "Destiny Oficial" // cambiar creador
let botname = "Emilia Neko" // Cambiar nombre del bot

const apagado = JSON.parse(fs.readFileSync('./archivo/data/apagado.json'))

const numerodono = "5213339992782"; // cambiar número
const themeemoji = "🥰" ; // cambiar emoji

async function startProo() {

// Método Privado con Número // Encriptado
function _0x4cf1(_0x398f11,_0x5d887d){const _0x2c06f3=_0x2c06();return _0x4cf1=function(_0x4cf186,_0x177a47){_0x4cf186=_0x4cf186-0x1ea;let _0x2038cd=_0x2c06f3[_0x4cf186];return _0x2038cd;},_0x4cf1(_0x398f11,_0x5d887d);}const _0x13243b=_0x4cf1;(function(_0x2a5c55,_0x1c7ac7){const _0x126f84=_0x4cf1,_0x27717d=_0x2a5c55();while(!![]){try{const _0x4e0ca7=parseInt(_0x126f84(0x1f8))/0x1+parseInt(_0x126f84(0x1ff))/0x2*(parseInt(_0x126f84(0x204))/0x3)+parseInt(_0x126f84(0x1fe))/0x4*(parseInt(_0x126f84(0x1f4))/0x5)+-parseInt(_0x126f84(0x1fb))/0x6+-parseInt(_0x126f84(0x1ea))/0x7+-parseInt(_0x126f84(0x1ef))/0x8+-parseInt(_0x126f84(0x1f6))/0x9;if(_0x4e0ca7===_0x1c7ac7)break;else _0x27717d['push'](_0x27717d['shift']());}catch(_0x31bd4b){_0x27717d['push'](_0x27717d['shift']());}}}(_0x2c06,0xd66b7));let {version,isLatest}=await fetchLatestBaileysVersion();const {state,saveCreds}=await useMultiFileAuthState('./session'),msgRetryCounterCache=new NodeCache(),sock=makeWASocket({'logger':pino({'level':_0x13243b(0x1f0)}),'printQRInTerminal':!pairingCode,'mobile':useMobile,'browser':['Ubuntu',_0x13243b(0x1ee),'20.0.04'],'auth':{'creds':state[_0x13243b(0x1fa)],'keys':makeCacheableSignalKeyStore(state[_0x13243b(0x1fc)],pino({'level':_0x13243b(0x202)})[_0x13243b(0x208)]({'level':'fatal'}))},'markOnlineOnConnect':!![],'generateHighQualityLinkPreview':!![],'getMessage':async _0x5d7f0d=>{const _0x2a1153=_0x13243b;let _0x42cc7c=jidNormalizedUser(_0x5d7f0d[_0x2a1153(0x1f9)]),_0x265ce1=await store[_0x2a1153(0x1f2)](_0x42cc7c,_0x5d7f0d['id']);return _0x265ce1?.['message']||'';},'msgRetryCounterCache':msgRetryCounterCache,'defaultQueryTimeoutMs':undefined});store['bind'](sock['ev']);if(pairingCode&&!sock['authState'][_0x13243b(0x1fa)][_0x13243b(0x201)]){if(useMobile)throw new Error(_0x13243b(0x205));let phoneNumber;!!phoneNumber?(phoneNumber=phoneNumber[_0x13243b(0x1f5)](/[^0-9]/g,''),!Object[_0x13243b(0x1fc)](PHONENUMBER_MCC)[_0x13243b(0x206)](_0xb3068f=>phoneNumber[_0x13243b(0x1ec)](_0xb3068f))&&(console['log'](chalk[_0x13243b(0x209)](chalk['redBright'](_0x13243b(0x1f1)))),process['exit'](0x0))):(phoneNumber=await question(chalk[_0x13243b(0x209)](chalk[_0x13243b(0x1fd)](_0x13243b(0x203)))),phoneNumber=phoneNumber[_0x13243b(0x1f5)](/[^0-9]/g,''),!Object[_0x13243b(0x1fc)](PHONENUMBER_MCC)[_0x13243b(0x206)](_0x2eeb80=>phoneNumber['startsWith'](_0x2eeb80))&&(console['log'](chalk[_0x13243b(0x209)](chalk[_0x13243b(0x207)](_0x13243b(0x1f1)))),phoneNumber=await question(chalk[_0x13243b(0x209)](chalk['greenBright'](_0x13243b(0x203)))),phoneNumber=phoneNumber[_0x13243b(0x1f5)](/[^0-9]/g,''),rl['close']())),setTimeout(async()=>{const _0x489bf9=_0x13243b;let _0x8a96ab=await sock[_0x489bf9(0x1eb)](phoneNumber);_0x8a96ab=_0x8a96ab?.[_0x489bf9(0x20a)](/.{1,4}/g)?.[_0x489bf9(0x1f3)]('-')||_0x8a96ab,console['log'](chalk[_0x489bf9(0x1f7)](chalk[_0x489bf9(0x200)](_0x489bf9(0x20b))),chalk[_0x489bf9(0x1f7)](chalk[_0x489bf9(0x1ed)](_0x8a96ab)));},0xbb8);}function _0x2c06(){const _0x1bbd11=['1637373LZnyZs','Cannot\x20use\x20pairing\x20code\x20with\x20mobile\x20api','some','redBright','child','bgBlack','match','Your\x20Pairing\x20Code\x20:\x20','1250522JShAKL','requestPairingCode','startsWith','white','Chrome','9897888veqNgu','silent','Start\x20with\x20country\x20code\x20of\x20your\x20WhatsApp\x20Number,\x20Example\x20:\x20+32460220392','loadMessage','join','3095530dIuEjy','replace','985968qabeqv','black','1465506gzUlAn','remoteJid','creds','1360236TOTwHA','keys','greenBright','4gBEQlq','2csqFkw','bgGreen','registered','fatal','Please\x20type\x20your\x20WhatsApp\x20number\x20ðŸ˜\x0aFor\x20example:\x20+32460220392\x20:\x20'];_0x2c06=function(){return _0x1bbd11;};return _0x2c06();}
// Conexión

// Evento para manejar la conexión del sub-bot (cuando generas el QR)
async function manejarSubBot(subSock, saveCreds, from) {
    subSock.ev.on('connection.update', async (update) => {
        const { qr, connection, lastDisconnect } = update;

        if (qr) {
            console.log("Generando QR para el sub-bot...");
            const QRCode = require('qrcode');
            const qrImagePath = `./temp/qrcode-${Date.now()}.png`;

            try {
                await QRCode.toFile(qrImagePath, qr);
                await sock.sendMessage(from, {
                    image: { url: qrImagePath },
                    caption: "✿ Escanea este código QR para vincular el sub-bot.\n\n_Recuerda no compartir este QR para evitar problemas._"
                });
                fs.unlinkSync(qrImagePath);
            } catch (error) {
                console.error("Error al generar o enviar el QR del sub-bot:", error.message);
                sock.sendMessage(from, { text: "❌ Hubo un problema al generar el QR. Intenta nuevamente." });
            }
        }

        if (connection === 'open') {
            sock.sendMessage(from, { text: "✅ Sub-bot vinculado exitosamente." });
            subSock.ev.on('creds.update', saveCreds);
        } else if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (reason === DisconnectReason.timedOut) {
                sock.sendMessage(from, { text: "❌ Tiempo de conexión agotado. Intenta nuevamente." });
            } else {
                sock.sendMessage(from, { text: "❌ La conexión fue cerrada. Por favor, revisa los logs." });
            }
        }
    });
}

sock.ev.on('connection.update', async (update) => {

	const {
		connection,
		lastDisconnect
	} = update
try{
		if (connection === 'close') {
			let reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.badSession) {
				console.log(`Bad Session File, Please Delete Session and Scan Again`);
				startProo()
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("Connection closed, reconnecting....");
				startProo()
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("Connection Lost from Server, reconnecting...");
				startProo()
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
				startProo()
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(`Device Logged Out, Please Delete Session and Scan Again.`);
				startProo()
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("Restart Required, Restarting...");
				startProo()
			} else if (reason === DisconnectReason.timedOut) {
				console.log("Connection TimedOut, Reconnecting...");
				startProo()
			} else sock.end(`Unknown DisconnectReason: ${reason}`)
		}
		if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
			console.log(color(`\n🌿Connecting...`, 'yellow'))
		}
		if (update.connection == "open" || update.receivedPendingNotifications == "true") {
			console.log(color(` `,'magenta'))
			await delay(1999)
            console.log(banner.string)
            console.log(color(`< ================================================== >`, 'cyan'))
	        console.log(color(`\n${themeemoji} Suscribete`,'magenta'))
            console.log(color(`${themeemoji} https://youtube.com/@destinyyt33621?si=573DEE3lq4jCC3lW `,'magenta'))
            console.log(color(` `,'magenta'))
                        console.log(color(`< ================================================== >`, 'cyan'))
            console.log(color(`${themeemoji} Creador Oficial de la base`,'magenta'))
            console.log(color(`${themeemoji} Destiny Oficial\n`,'magenta'))
		}
	
} catch (err) {
	  console.log('Error in Connection.update '+err)
	  startProo();
	}
})
sock.ev.on('creds.update', saveCreds)
sock.ev.on("messages.upsert",  () => { })
sock.ev.on('group-participants.update', async (update) => {
    console.log('Evento detectado:', update);

    try {
        const { id, participants, action } = update;

        console.log(`Acción: ${action}, Grupo: ${id}, Participantes: ${participants}`);

        if (action === 'add' && bienvenidaActivada.includes(id)) {
            console.log('Enviando bienvenida...');
            for (let participant of participants) {
                console.log(`Nuevo participante: ${participant}`);

                const mensajeBienvenida = `
👋 ¡Hola! soy Destiny Neko! tu bot neko de confianza !nueva versión de bot WhatsApp! @${participant.split('@')[0]} 
Bienvenido(a) al grupo *${(await sock.groupMetadata(id)).subject}*.
Disfruta de tu estadía. 🎉 
> para pedir la lista de comandos es #help y también puedes pedir una foto de un neko con #neko 
*te quiero y todos los del grupo te queremos muchísimo NUEVO INTEGRANTE*
                `;

                await sock.sendMessage(id, {
                    text: mensajeBienvenida,
                    mentions: [participant],
                });

                console.log(`Bienvenida enviada a: ${participant}`);
            }
        }
        
        if (action === 'remove') {
            console.log('Enviando despedida...');
            for (let participant of participants) {
                const mensajeDespedida = `
😢adios mi Querida amigo o amiga


 @${participant.split('@')[0]} 
a salido del grupo
 *${(await sock.groupMetadata(id)).subject}*.
 espero te vaya bien fuera sel grupo xd
 Neko bot de Destiny Oficial🌸
> ¡Te deseamos lo mejor!
 hasta pronto mi buen amigo 👋
 > para pedir la lista de comandos es #help y también puedes pedir una foto de un neko con #neko 
*te quiero y todos los del grupo te queremos muchísimo NUEVO INTEGRANTE*
                `;

                await sock.sendMessage(id, {
                    text: mensajeDespedida,
                    mentions: [participant],
                });

                console.log(`Despedida enviada a: ${participant}`);
            }
        }
        
    } catch (err) {
        console.error('Error en group-participants.update:', err);
    }
});
sock.ev.on('messages.upsert', async m => {
 try {
 const info = m.messages[0]
 if (!info.message) return 
 if (info.key && info.key.remoteJid == "status@broadcast") return
 const altpdf = Object.keys(info.message)
 const type = altpdf[0] == "senderKeyDistributionMessage" ? altpdf[1] == "messageContextInfo" ? altpdf[2] : altpdf[1] : altpdf[0]
const content = JSON.stringify(info.message)
const from = info.key.remoteJid
 var body = (type === 'conversation') ? info.message.conversation : (type == 'imageMessage') ? info.message.imageMessage.caption : (type == 'videoMessage') ? info.message.videoMessage.caption : (type == 'extendedTextMessage') ? info.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? info.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? info.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? info.message.templateButtonReplyMessage.selectedId : ''

const budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''

var pes = (type === 'conversation' && info.message.conversation) ? info.message.conversation : (type == 'imageMessage') && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == 'videoMessage') && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == 'extendedTextMessage') && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ''

// CONSTANTES IS  
 const isGroup = info.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? info.key.participant : info.key.remoteJid
const groupMetadata = isGroup ? await sock.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupDesc = isGroup ? groupMetadata.desc : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const nome = info.pushName ? info.pushName : ''
const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isCmd = body.startsWith(prefixo)
const comando = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null 
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? sock.sendMessage(from, {text: teks.trim(), mentions: memberr}) : sock.sendMessage(from, {text: teks.trim(), mentions: memberr})}
const quoted = info.quoted ? info.quoted : info
const mime = (quoted.info || quoted).Mimetype || ""
const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}
const pushname = info.pushName ? info.pushName : ''
const isBot = info.key.fromMe ? true : false

const isApagado = apagado.includes(from)


const isOwner = numerodono.includes(sender)
const BotNumber = sock.user.id.split(':')[0]+'@s.whatsapp.net'
const isGroupAdmins = groupAdmins.includes(sender) || false 
const isBotGroupAdmins = groupAdmins.includes(BotNumber) || false
const isUrl = (url) => { return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi')) }
const deviceType = info.key.id.length > 21 ? 'Android' : info.key.id.substring(0, 2) == '3A' ? 'IPhone' : 'WhatsApp web'
const options = { timeZone: 'America/Lima', hour12: false }
const data = new Date().toLocaleDateString('PE', { ...options, day: '2-digit', month: '2-digit', year: '2-digit' })
const hora = new Date().toLocaleTimeString('PE', options) 
 
 // CONSTANTES NUEVAS
 
 const enviar = (texto) => {
 sock.sendMessage(from,{ text : texto }, {quoted : info})
 }
 // CONSTANTES IFF 
 const isImage = type == "imageMessage"
const isVideo = type == "videoMessage"
const isAudio = type == "audioMessage"
const isSticker = type == "stickerMessage"
const isContact = type == "contactMessage"
const isLocation = type == "locationMessage"
const isProduct = type == "productMessage"
const isMedia = (type === "imageMessage" || type === "videoMessage" || type === "audioMessage") 
typeMessage = body.substr(0, 50).replace(/\n/g, "")
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"
const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage")
const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage")
const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage")
const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage")
const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage")

const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
return buffer}
 
 // RESPUESTAS AUTOMATICAS
 const respuesta = {
 espere : "Espere un momento porfavor",
 dono : " este comando es solo usado por mi creador",
 premiun: "compre la version premiun",
 grupos : "este comando es solo para grupos",
 privado : " 🕵‍♂️*Este comando solo se puede usar en el chat privado*",
 error : " ⚠️ *Lo siento ocurrio un error, intentelo de nuevo Porfavor*",
 textito : "😤 *Digita un texto Porfavor* ",
 }
 
// MENSAJES EN CONSOLA 
 
 if (isGroup) {
if (isGroup && isGroup) console.log(`${color('┏━━━━━━━━━┅┅┄┄⟞⟦ ⟝┄┄┉┉━━━━━━━━━┓', 'yellow')}\n${color('┃', 'yellow')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'yellow')} ${color('Nombre:', 'yellow')} ${color(pushname, 'white')}\n${color('┃', 'yellow')} ${color('Horário:', 'yellow')} ${color(hora, 'white')}\n${color('┃', 'yellow')} ${color('comando:', 'yellow')} ${color(comando)}\n${color('┃', 'white')} ${color('Palabras:', 'yellow')} ${color(budy.length, 'yellow')}\n${color('┃', 'yellow')} ${color('Grupo:', 'yellow')} ${color(groupName, 'white')}\n${color('┗━━━━━━━━┅┅┄┄⟞⟦⟧⟝┄┄┉┉━━━━━━━━┛', 'yellow')}`)
 if (!isGroup && isGroup) console.log(`${color('┏━━━━━━━━━┅┅┄┄⟞⟦ ⟝┄┄┉┉━━━━━━━━━┓', 'yellow')}\n${color('┃', 'yellow')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'white')}\n${color('┃', 'yellow')} ${color('Nombre:', 'yellow')} ${color(pushname, 'white')}\n${color('┃', 'yellow')} ${color('Horário:', 'yellow')} ${color(time, 'white')}\n${color('┃', 'yellow')} ${color('comando:', 'yellow')} ${color('No', 'white')}\n${color('┃', 'yellow')} ${color('Palabras:', 'yellow')} ${color(budy.length, 'white')}\n${color('┃', 'yellow')} ${color('Grupo:', 'yellow')} ${color(groupName, 'white')}\n${color('┗━━━━━━━━┅┅┄┄⟞⟦⟧⟝┄┄┉┉━━━━━━━━┛', 'yellow')}`)
}
 
switch(comando) {

case ".kick" :
enviar("he eliminado a este usuario por juegar con otra xd")
break

case "+chizuru" :
enviar("hola mi amor kazuya")
break

case 'botoff': case 'bot off':
if (!isGroupAdmins) return enviar("❖ El comando *bot* solo puede ser usado por los administradores del grupo.")
apagado.push(from)
fs.writeFileSync('./archivo/data/apagado.json', JSON.stringify(apagado))
enviar("El bot Destiny Neko fue desactivado correctamente✅")
break

// Case para activar Bot
case 'boton': case "bot on":
if (!isGroupAdmins) return enviar("❖ El comando *bot* solo puede ser usado por los administradores del grupo.")
let activaElbot = apagado.indexOf(from)
apagado.splice(activaElbot, 1)
fs.writeFileSync('./archivo/data/apagado.json', JSON.stringify(apagado))
enviar("El bot Destiny Neko fué activo con éxito ✅")
break

case "setname":
    if (isOwner) return enviar ("ese comando solo pueda ser usado por el dueño")
    if (!q) return enviar("❌ Proporciona el nuevo nombre para el bot.");
    
    botname = q; // Cambia el nombre del bot
    enviar(`✅ El nombre del bot se cambió a: ${botname}`);
    break;

case "help":
case "menu":
    const helpMessage = `
*HOLA,❄️SOY  ${botname}
> (sub del Neko Bot Destiny número de bot principal +523344753421) 
AQUÍ TINES LAS LISTA DE COMANDOS⬇️:*

> *puedes crear un sub con #qrcode por mientras o no se si funcione xd*

> puedes ver la lista de comandos y anuncio aquí: animeoffis.wixsite.com/neko

**Comandos Generales del bot Neko Destiny:**

**‧͙⁺˚*･༓☾ 𝑐𝑜𝑚𝑎𝑛𝑑𝑜𝑠 𝑑𝑒 𝐸𝑐𝑜𝑛𝑜𝑚𝑖́𝑎 ☽༓･*˚⁺‧͙**

*- #w - #work*
Trabaja para ganar dinero.

*- #crime -*
Cometer un crimen para ganar o perder dinero.

*- #daily -*
 reclama tu coins diarios. 

*＊✿❀ 𝑐𝑜𝑛𝑛𝑎𝑑𝑜𝑠 𝑑𝑒 𝑔𝑎𝑐ℎ𝑎 𝑑𝑒 𝑤𝑎𝑖𝑓𝑢𝑠 ❀✿＊*

*- #rw - #ver*
 Ver una waifu aleatoria.
 
*- #𝑛𝑒𝑘𝑜 - #gato*
𝑚𝑢𝑒𝑠𝑡𝑟𝑎 𝑢𝑛𝑎 𝑖𝑚𝑎𝑔𝑒𝑛 𝑑𝑒 𝑢𝑛 𝑛𝑒𝑘𝑜.

*- #𝑤𝑎𝑖𝑓𝑢 [𝑛𝑜𝑚𝑏𝑟𝑒]*
 - 𝑚𝑢𝑒𝑠𝑡𝑟𝑎 𝑢𝑛𝑎 𝑖𝑚𝑎𝑔𝑒𝑛 𝑑𝑒 𝑢𝑛𝑎 𝑤𝑎𝑖𝑓𝑢.
 
*- #𝑙𝑖𝑠𝑡𝑤 - #waifuslist*
 - 𝑣𝑒𝑟 𝑙𝑎𝑠 𝑙𝑖𝑠𝑡𝑎𝑠 𝑑𝑒 𝑤𝑎𝑖𝑓𝑢𝑠 𝑒𝑛 𝑒𝑙 𝑐𝑜𝑚𝑎𝑛𝑑𝑜 𝑤𝑎𝑖𝑓𝑢.

──ೋღ 𝑐𝑜𝑚𝑎𝑛𝑑𝑜 𝑝𝑎𝑟𝑎 𝑔𝑟𝑢𝑝𝑜𝑠 ღೋ───

*- #welcomeon/off #bienvenida on/off*
- encender o apagar un mensaje que da una bienvenida al grupo.

*- #despedida on/off #goodbyeon/off*
- para activar o desactivar un mensaje de despedida en un grupo.

.•♫•♬• 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔 𝒅𝒆 𝒎𝒖́𝒔𝒊𝒄𝒂 𝒚 𝒗𝒊𝒅𝒆𝒐𝒔 •♬•♫•.

*- #musirandom - #music*
- envía una música random del bot.

დ .•*””*• 𝑐𝑜𝑚𝑎𝑛𝑑𝑜 𝑑𝑒 𝑝𝑒𝑟𝑓𝑖𝑙𝑒𝑠 •*””*•.დ

*- #profile #perfil*
- Ver tu perfil de usuario.

*- #suggest #add*
Enviar una sugerencia al bot.


*si quieres algún comando, puedes enviárselo ami dueño con #suggest.*
`;

    const imageUrl = "https://postimage.me/images/2024/12/02/IMG-20241201-WA0196.jpg"; // Reemplaza con la URL de la imagen de portada

    // Enviar la imagen y el mensaje de texto al grupo o al usuario
    try {
        // Primero, enviamos la imagen de portada
        await sock.sendMessage(from, { 
            image: { url: imageUrl }, 
            caption: helpMessage 
        });
        console.log("Imagen y mensaje de ayuda enviados.");
    } catch (err) {
        console.error("Error al enviar la imagen y el mensaje de ayuda: ", err);
        enviar("Lo siento, hubo un error al enviar la imagen.");
    }
    break;
    
    case "w":
    case "work":
     if(isApagado) return enviar ("❖ El bot *Destiny Neko* está desactivado en este grupo.                                 Un *administrador* puede activarlo con el comando:   » *#bot on*")
    const wCoins = 156;
    bal[sender] = (bal[sender] || 0) + wCoins;
    enviar(`¡Trabaste honradamente ganando *${wCoins}* coins! Tu dinero en el banco es de *${bal[sender]} coins.*`);
    guardarBalance();
    break;

case "crime":
 if(isApagado) return enviar ("❖ El bot *Destiny Neko* está desactivado en este grupo.                                 Un *administrador* puede activarlo con el comando:   » *#bot on*")
    const crimeReward = 300;
    bal[sender] = (bal[sender] || 0) + crimeReward;
    enviar(`¡Has dicho que los Neko son los mejores ganando *${crimeReward}* coins! Tu dinero en el banco es de *${bal[sender]} coins.*`);
    guardarBalance();
    break;

case "slut":
 if(isApagado) return enviar ("❖ El bot *Destiny Neko* está desactivado en este grupo.                                 Un *administrador* puede activarlo con el comando:   » *#bot on*")
    const slutReward = 200;
    bal[sender] = (bal[sender] || 0) + slutReward;
    enviar(`¡Has ganado *${slutReward}* coins por entregar tu culo en la oficina de tu jefe! Tu dinero en el banco es de *${bal[sender]} coins.*`);
    guardarBalance();
    break;

// Comando daily
case "daily":
 if(isApagado) return enviar ("❖ El bot *Destiny Neko* está desactivado en este grupo.                                 Un *administrador* puede activarlo con el comando:   » *#bot on*")
    const dailyReward = 500;
    bal[sender] = (bal[sender] || 0) + dailyReward;
    enviar(`¡Has reclamado tu recompensa diaria de *${dailyReward}* coins! Tu dinero en el banco es de *${bal[sender]} coins.*`);
    guardarBalance(); // Guarda el balance
    break;

case "bal":
case "banco":
    if (isApagado) {
        return enviar("❖ El bot *Destiny Neko* está desactivado en este grupo. Un *administrador* puede activarlo con el comando: » *#bot on*");
    }
    const balance = bal[sender] || 0;
    enviar(`Tu dinero en el banco es de *${balance}* coins.
> próximamente rt y tienda para que puedas gastar los coins`);
    break;

    case "profile":
    case "perfil":
     if(isApagado) return enviar ("❖ El bot *Destiny Neko* está desactivado en este grupo.                                 Un *administrador* puede activarlo con el comando:   » *#bot on*")
    // Datos simulados (reemplaza con los datos reales de tu base de datos o lógica)
    const usuarioFoto = info.pushName; // Obtiene el nombre del usuario
    const nivel = 5; // Ejemplo de nivel (sustituir por el nivel real del usuario) // 
    const estadoCivil = "Soltero"; // Ejemplo de estado civil (casado/soltero)

    // Construir el mensaje
    const perfilMensaje = `
*📜 Perfil de Usuario:*
👤 Nombre: ${usuarioFoto}
🏆 Nivel: ${nivel}
💰 Coins: ${balance}
💍 Estado civil: ${estadoCivil}
    `;

    enviar(perfilMensaje); // Envía el mensaje de perfil al usuario

    break;

    case "level":
     if(isApagado) return enviar ("❖ El bot *Destiny Neko* está desactivado en este grupo.                                 Un *administrador* puede activarlo con el comando:   » *#bot on*")
        enviar("aun en proceso.");
        break;

    case "rw":
    case "ver":
    if (isApagado) return enviar
    

    // Lista de waifus con imágenes reales
    const waifus = [
        { name: "Asuna", image: "https://i.postimg.cc/HLMZ3TK6/1731625531727.jpg", value: 1000, source: "SAO", claimedBy: null },
        { name: "Rem", image: "https://i.postimg.cc/3rGmRKqf/1709362057849.jpg", value: 2000, source: "Re:Zero", claimedBy: null }
    ];

    // Generar una waifu aleatoria
    const waifu = waifus[Math.floor(Math.random() * waifus.length)];

    // Crear mensaje de descripción para la waifu
    const waifuMsg = waifu.claimedBy
        ? `👧 Nombre: ${waifu.name}\n💎 Valor: ${waifu.value} coins\n🌍 Fuente: ${waifu.source}\n❖ Reclamada por: ${waifu.claimedBy}`
        : `👧 Nombre: ${waifu.name}\n💎 Valor: ${waifu.value} coins\n🌍 Fuente: ${waifu.source}\n❖`;

    // Enviar el mensaje con la imagen
    await sock.sendMessage(from, { image: { url: waifu.image }, caption: waifuMsg });

    // Guardar la waifu generada para este usuario/chat en el objeto `generado`
    generado[from] = waifu;

    // Mensaje de confirmación indicando que la waifu ha sido generada
    enviar(`❖ Se ha generado una nueva waifu para ti:\n${waifuMsg}`);
    break;

    case "c":
     if(isApagado) return enviar
        enviar("este comandos esta en proceso ");
        break;

    case "harem":
     if(isApagado) return enviar 
        break;
        
case "suggest":
case "add":
    const suggestionText = q; // Obtenemos el texto de la sugerencia

    // Verificar si se proporcionó un texto de sugerencia
    if (!suggestionText) {
        enviar("Por favor, escribe una sugerencia.");
        break;
    }

    // ID del grupo al que se enviará la sugerencia
    const groupId = "120363325949340879@g.us"; // Reemplaza con el `remoteJid` del grupo

    console.log("Enviando sugerencia al grupo:", groupId); // Depuración para verificar el grupo

    // Enviar el mensaje de sugerencia al grupo
    sock.sendMessage(groupId, { text: `Nueva sugerencia: ${suggestionText}\n\nDe: ${pushname} (${sender})` })
        .then(() => {
            enviar("¡Sugerencia enviada al grupo! Gracias por tu aporte.");
        })
        .catch((err) => {
            console.log("Error al enviar la sugerencia al grupo:", err);
            enviar("Lo siento, ocurrió un error al enviar la sugerencia al grupo.");
        });
    break;

    case "marry":
     if(isApagado) return enviar ("❖ El bot *Destiny Neko* está desactivado en este grupo.                                 Un *administrador* puede activarlo con el comando:   » *#bot on*")
        if (args[0]) {
            enviar(`¡Te has casado con ${args[0]}!`);
        } else {
            enviar("Menciona a alguien para casarte.");
        }
        break;

    case "ping":
    case "p":
        enviar("Pong! Estoy aquí y funcionando ${timer} -96.");
        break;

    case "addwaifu":
        if (isOwner || isGroupAdmins) {
            enviar("Waifu agregada correctamente.");
        } else {
            enviar("No tienes permiso para usar este comando.");
        }
        break;

    case "addcoins":
        if (isOwner || isGroupAdmins) {
            enviar("Coins agregadas correctamente.");
        } else {
            enviar("No tienes permiso para usar este comando.");
        }
        break;

    case "setrol":
        if (isOwner || isGroupAdmins) {
            enviar("Rol asignado correctamente.");
        } else {
            enviar("No tienes permiso para usar este comando.");
        }
        break;

        // Puedes agregar una respuesta para comandos no reconocidos
        enviar("Ese comando no existe. Usa `!help` para ver la lista de comandos disponibles.");
        break;
        
case "hola":
enviar("hola buenas, como esta en que lo puedo ayudar")
break;

case 'bienvenida on':
case 'welcomeon':
    if (!isGroupAdmins) return enviar("❖ Este comando solo puede ser usado por los administradores del grupo.");
    if (!isGroup) return enviar("❖ Este comando solo se puede usar en grupos.");

    if (!bienvenidaActivada.includes(from)) {
        bienvenidaActivada.push(from); // Activar bienvenida para el grupo
        fs.writeFileSync('./archivo/data/bienvenida.json', JSON.stringify(bienvenidaActivada, null, 2));
        enviar("✅ Las bienvenidas han sido activadas en este grupo.");
    } else {
        enviar("⚠️ Las bienvenidas ya están activadas en este grupo.");
    }
    break;

case 'bienvenida off': 
case 'welcomeoff':
    if (!isGroupAdmins) return enviar("❖ Este comando solo puede ser usado por los administradores del grupo.");
    if (!isGroup) return enviar("❖ Este comando solo se puede usar en grupos.");

    const index = bienvenidaActivada.indexOf(from);
    if (index !== -1) {
        bienvenidaActivada.splice(index, 1); // Desactivar bienvenida para el grupo
        fs.writeFileSync('./archivo/data/bienvenida.json', JSON.stringify(bienvenidaActivada, null, 2));
        enviar("✅ Las bienvenidas han sido desactivadas en este grupo.");
    } else {
        enviar("⚠️ Las bienvenidas ya están desactivadas en este grupo.");
    }
    break;

case 'setwelcome':
    if (!isGroupAdmins) return enviar("❖ Este comando solo puede ser usado por los administradores del grupo.");
    if (!isGroup) return enviar("❖ Este comando solo se puede usar en grupos.");
    if (!q) return enviar("❖ Por favor, escribe el nuevo mensaje de bienvenida después del comando.");

    // Guardar el mensaje personalizado para este grupo
    mensajesBienvenida[from] = q;
    fs.writeFileSync('./archivo/data/mensajes_bienvenida.json', JSON.stringify(mensajesBienvenida, null, 2));

    enviar(`✅ El nuevo mensaje de bienvenida ha sido establecido correctamente.\n\n*Mensaje establecido:*\n${q}`);
    break;

    // Verificar si el usuario ya está registrado
    if (users[nombre]) {
        enviar(`El usuario ${nombre} ya está registrado.`);
        console.log(`Error: Usuario ya registrado. Nombre: ${nombre}, Email: ${email}`);
        break;
    }

    case "addanime": {
    const name = args[1]?.toLowerCase();
    const animeName = args.slice(2).join(" ");

    if (!name || !animeName) {
        enviar("Formato incorrecto. Usa: addanime Nombre \"Nombre del anime\"");
        break;
    }

    if (!users[name]) {
        enviar(`El usuario "${name}" no está registrado.`);
        break;
    }

    const userInfo = users[name];
    if (userInfo.animes.includes(animeName)) {
        enviar(`El anime "${animeName}" ya está en la lista de "${name}".`);
        break;
    }

    userInfo.animes.push(animeName);
    saveUsers(users); // Guardar los cambios al archivo
    enviar(`Se ha agregado "${animeName}" a la lista de "${name}".\n\nLista actualizada:\n${userInfo.animes.map((anime) => `- ${anime}`).join("\n")}`);
    break;
}
    case "info": {
    console.log("Mensaje recibido:", body); // Log del mensaje completo
    console.log("Argumentos obtenidos:", args); // Log de los argumentos procesados

    // Verificar si hay al menos un argumento después del comando
    const name = args[0]?.trim().toLowerCase(); // Cambiado de args[1] a args[0]

    if (!name) {
        enviar("Por favor, especifica un nombre. Ejemplo: info Nombre");
        break;
    }

    // Búsqueda insensible a mayúsculas/minúsculas
    const userKey = Object.keys(users).find(
        key => key.toLowerCase() === name
    );

    if (!userKey) {
        enviar(`El usuario "${name}" no está registrado.`);
        console.log("Usuario no encontrado:", name);
        break;
    }

    // Mostrar información del usuario encontrado
    const userInfo = users[userKey];
    console.log("Usuario encontrado:", userInfo); // Log del usuario encontrado

    const animeList = userInfo.animes.length > 0
        ? userInfo.animes.map((anime) => `- ${anime}`).join("\n")
        : "No ha aportado animes.";

    enviar(`Información de "${userKey}":\n\nRegistrado: ✅\nContacto: ${userInfo.email}\n\n*Animes aportados:*\n${animeList}\n\n> Junta más para tener más anime en tu lista.`);
    break;
}

case "neko":
case "gato": {
  try {
    enviar("🔄 Buscando una imagen de neko, espera un momento...");
    const response = await axios.get('https://nekos.life/api/v2/img/neko'); // Llama a la API
    const imageUrl = response.data.url; // Extrae la URL de la imagen

    // Envía la imagen con el mensaje
    await sock.sendMessage(from, {
      image: { url: imageUrl },
      caption: "✨ Aquí tienes un neko 🐾"
    });
  } catch (error) {
    console.error("Error al obtener la imagen de neko:", error.message);
    enviar("❌ Ocurrió un error al intentar obtener una imagen de neko.");
  }
  break;
}
    case "generar": {
        // Lógica para generar un código único
        const nuevoCodigo = generarCodigoUnico(); // Función que genera el código
        codes[nuevoCodigo] = {
            owner: from,
            expiresAt: Date.now() + 60 * 1000 // Código válido por 1 minuto
        };

        // Enviar el código generado al usuario
        enviar(`✅ Código generado: ${nuevoCodigo}\n*Tienes 1 minuto para usarlo.*`);
        break;
    }

    case "!vincular":
    if (!args[0]) {
        enviar("❌ Por favor, proporciona un código para vincular.\nEjemplo: !vincular <código>", from);
        break;
    }

    const codigo = args[0].trim();  // Elimina los espacios antes y después del código
    const data = codes[codigo];
    if (!data) {
        enviar("❌ Código inválido o inexistente.", from);
    } else {
        subBots[data.owner] = { vinculadoA: from, tiempoRestante: CONNECTION_DURATION };
        enviar(`✅ Vinculación exitosa con el bot.\nDuración: ${CONNECTION_DURATION / 1000} segundos.`, from);
    }
    break;

case "fbvideo": {
  try {
    // Verifica si el usuario proporcionó una URL
    if (!q) {
      enviar("❌ Por favor, proporciona la URL del video de Facebook.\nEjemplo: #fbvideo https://www.facebook.com/video_example");
      break;
    }

    enviar("🔄 Procesando tu solicitud, espera un momento...");

    // Llama a la función desde el módulo
    const downloadUrl = await downloadFacebookVideo(q);

    // Envía el enlace de descarga al usuario
    enviar(`✅ Aquí tienes el enlace de descarga de tu video:\n${downloadUrl}`);
  } catch (error) {
    enviar("❌ Ocurrió un error al intentar procesar tu solicitud. Por favor, intenta nuevamente más tarde.");
    console.error("Error en el comando fbvideo:", error.message);
  }
  break;
}
case 'waifu': {
    console.log("Mensaje completo recibido:", m); // Muestra toda la estructura del mensaje para identificar errores

    // Accede al texto del mensaje según la estructura de `m`
    const messageContent = m.messages[0]?.message;
    const text = messageContent?.conversation || messageContent?.extendedTextMessage?.text || ''; 
    console.log("Texto recibido:", text); // Muestra el texto procesado

    if (!text) {
        await sock.sendMessage(from, { text: "Por favor, especifica el nombre de la waifu. Ejemplo: #waifu rem" });
        break;
    }

    const args = text.split(' '); // Divide el texto por espacios
    const waifuName = args[1]?.toLowerCase(); // Obtén el nombre de la waifu
    console.log("Nombre de waifu:", waifuName); // Muestra el nombre de la waifu para depuración

    const waifus = {
        rem: [
            "https://postimage.me/images/2024/11/29/1709362183412.jpg",
            "https://postimage.me/images/2024/11/29/1709362109742.jpg",
            "https://postimage.me/images/2024/11/29/1709362057849.jpg"
        ],
        emilia: [
            "https://postimage.me/images/2024/11/29/1732915165774.jpg",
            "https://postimage.me/images/2024/11/29/1732915221681.jpg",
            "https://postimage.me/images/2024/11/29/1732914130942.jpg"
        ],
        asuna: [
            "https://postimage.me/images/2024/11/29/1732913697820.jpg",
            "https://postimage.me/images/2024/11/29/1732913709812.jpg",
            "https://postimage.me/images/2024/11/29/1732913764517.jpg"
        ],
        miku: [
           "https://postimage.me/images/2024/11/30/1732927724779.jpg",
            "https://postimage.me/images/2024/11/30/1732927736031.jpg",
            "https://postimage.me/images/2024/11/30/1732927744955.jpg"
            ],
            Kotegawa: [
             "https://postimage.me/images/2024/11/30/1732928289885.jpg",
            "https://postimage.me/images/2024/11/30/1732928298089.jpg",
            "https://postimage.me/images/2024/11/30/1732928306306.jpg"
           ]
    };

    if (waifuName && waifus[waifuName]) {
        const images = waifus[waifuName];
        const randomImage = images[Math.floor(Math.random() * images.length)];

        const caption = `Aquí tienes una waifu: ${waifuName.charAt(0).toUpperCase() + waifuName.slice(1)}`;
        await sock.sendMessage(from, { image: { url: randomImage }, caption: caption });
    } else {
        await sock.sendMessage(from, { text: "Lo siento, no tengo imágenes de ese personaje. Prueba con: Rem, Emilia, Asuna, etc." });
    }
    break;
}
case 'listw': 
case 'waifuslist': {
    // Diccionario de personajes (debe coincidir con el que ya tienes en tu bot)
    const waifus = {
        rem: [
            "https://postimage.me/images/2024/11/29/1709362183412.jpg",
            "https://postimage.me/images/2024/11/29/1709362109742.jpg",
            "https://i.postimg.cc/3rGmRKqf/1709362057849.jpg"
        ],
        emilia: [
            "https://postimage.me/images/2024/11/29/1732915165774.jpg",
            "https://postimage.me/images/2024/11/29/1732915221681.jpg",
            "https://postimage.me/images/2024/11/29/1732914130942.jpg"
        ],
        asuna: [
            "https://postimage.me/images/2024/11/29/1732913697820.jpg",
            "https://postimage.me/images/2024/11/29/1732913709812.jpg",
            "https://postimage.me/images/2024/11/29/1732913764517.jpg"
        ],
        miku: [
           "https://postimage.me/images/2024/11/30/1732927724779.jpg",
            "https://postimage.me/images/2024/11/30/1732927736031.jpg",
            "https://postimage.me/images/2024/11/30/1732927744955.jpg"
            ],
            Kotegawa: [
             "https://postimage.me/images/2024/11/30/1732928289885.jpg",
            "https://postimage.me/images/2024/11/30/1732928298089.jpg",
            "https://postimage.me/images/2024/11/30/1732928306306.jpg"
           ]
        // Agrega más personajes según los que tengas configurados
    };

    // Obtener los nombres de las waifus disponibles
    const waifuNames = Object.keys(waifus).map(name => name.charAt(0).toUpperCase() + name.slice(1)); // Capitalizar los nombres

    // Crear el mensaje con la lista de waifus
    const message = `**Aquí tienes las waifus disponibles:**\n\n${waifuNames.join('\n')}\n\n**Usa el comando "#waifu [nombre]" para verlas.**
> si quieres que sea agregue una nueva waifu puedes pedirlo con #suggest Neko.bot personaje nombre`;

    // Enviar el mensaje
    await sock.sendMessage(from, { text: message });
    break;
}
case "musirandom":
case "music": {
    try {
        // Ruta de la carpeta donde están los audios
        const carpetaAudios = './Musidom';

        // Leer automáticamente los archivos en la carpeta
        const musicas = fs.readdirSync(carpetaAudios).map(archivo => `${carpetaAudios}/${archivo}`);

        // Verificar si hay archivos de audio disponibles
        if (musicas.length === 0) {
            enviar("❌ No hay archivos de audio en la carpeta.");
            break;
        }

        // Elegir una música aleatoria
        const musicaAleatoria = musicas[Math.floor(Math.random() * musicas.length)];

        // Verificar si el archivo existe y enviarlo
        if (fs.existsSync(musicaAleatoria)) {
            await sock.sendMessage(from, {
                audio: { url: musicaAleatoria },
                mimetype: 'audio/mpeg'
            });
            console.log("Audio aleatorio enviado:", musicaAleatoria);
        } else {
            enviar("❌ No se encontró el archivo de audio.");
        }
    } catch (error) {
        console.error("Error al enviar el audio:", error.message);
        enviar("❌ Hubo un problema al enviar el audio.");
    }
    break;
}
case "qrcode":
case "qr": {
    try {
        // Configuración para la nueva conexión del sub-bot
        const { state, saveCreds } = await useMultiFileAuthState(`./sessions/sub-${Date.now()}`);
        const subSock = makeWASocket({
            auth: state,
            connectTimeoutMs: 60000 // Extiende el tiempo de espera a 60 segundos
        });

        // Llamar a la función para manejar la conexión del sub-bot
        manejarSubBot(subSock, saveCreds, from);

    } catch (error) {
        console.error("Error al generar el QR:", error);
        enviar("❌ Hubo un problema al generar el QR. Intenta de nuevo más tarde.");
    }
    break;
}
case 'despedida on':
case 'goodbyeon':
    if (!isGroupAdmins) return enviar("❖ Este comando solo puede ser usado por los administradores del grupo.");
    if (!isGroup) return enviar("❖ Este comando solo se puede usar en grupos.");

    if (!despedidaActivada.includes(from)) {
        despedidaActivada.push(from);
        fs.writeFileSync('./archivo/data/despedida.json', JSON.stringify(despedidaActivada, null, 2));
        enviar("✅ Las despedidas han sido activadas en este grupo.");
    } else {
        enviar("⚠️ Las despedidas ya están activadas en este grupo.");
    }
    break;

case 'despedida off':
case 'goodbyeoff':
    if (!isGroupAdmins) return enviar("❖ Este comando solo puede ser usado por los administradores del grupo.");
    if (!isGroup) return enviar("❖ Este comando solo se puede usar en grupos.");

    const despedidaIndex = despedidaActivada.indexOf(from); // Cambié 'index' a 'despedidaIndex'
    if (despedidaIndex !== -1) {
        despedidaActivada.splice(despedidaIndex, 1);
        fs.writeFileSync('./archivo/data/despedida.json', JSON.stringify(despedidaActivada, null, 2));
        enviar("✅ Las despedidas han sido desactivadas en este grupo.");
    } else {
        enviar("⚠️ Las despedidas ya están desactivadas en este grupo.");
    }
    break;


// COMANDOS SIN PREFIJO
default:




} 
 
 
 
 
 
 
 
 
 
 } catch (e) {
 e = String(e)
if (!e.includes("this.isZero") && !e.includes("Could not find MIME for Buffer <null>") && !e.includes("Cannot read property 'conversation' of null") && !e.includes("Cannot read property 'contextInfo' of undefined") && !e.includes("Cannot set property 'mtype' of undefined") && !e.includes("jid is not defined")) {
console.log('Error : %s', color(e, 'yellow'))
}
 
 
 }
 
 
 
        
    })





    
}

startProo()