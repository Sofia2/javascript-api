
/*******************************************************************************
 * © Indra Sistemas, S.A.
 * 2013 - 2014  SPAIN
 * 
 * All rights reserved
 ******************************************************************************/
//global variables
var sessionKey = null;
var sibServer = pathToDwrServlet + '/';
var cipherKey;
var kpName;


var subscriptionsMap = {};
var subscriptionsOntology = {};



// JOIN Operation
function join(user, pass, instance, joinResponse) {
	var queryJoin = '{"body":{"instance":"'
			+ instance
			+ '","password":"'
			+ pass
			+ '","user":"'
			+ user
			+ '"},"direction":"REQUEST","ontology":null,"messageType":"JOIN","messageId":null,"sessionKey":null}';
	sendMessage("JOIN", queryJoin, false, joinResponse);
}


// JOIN Operationto renovate session key
function joinRenovateSessionKey(user, pass, instance, joinResponse) {
	var queryJoin = '{"body":{"instance":"'
			+ instance
			+ '","password":"'
			+ pass
			+ '","user":"'
			+ user
			+ '"},"direction":"REQUEST","ontology":null,"messageType":"JOIN","messageId":null,"sessionKey":"' + sessionKey + '"}';
	sendMessage("JOIN", queryJoin, false, joinResponse);
}



// JOIN Operation to renovate session key
function joinCipher(user, pass, instance, joinResponse) {
	var queryJoin = '{"body":{"instance":"'
			+ instance
			+ '","password":"'
			+ pass
			+ '","user":"'
			+ user
			+ '"},"direction":"REQUEST","ontology":null,"messageType":"JOIN","messageId":null,"sessionKey":null}';
	sendMessage("JOIN", queryJoin, true, joinResponse);

}

// JOIN Operation to renovate session key
function joinRenovateSessionCipher(user, pass, instance, joinResponse) {
	var queryJoin = '{"body":{"instance":"'
			+ instance
			+ '","password":"'
			+ pass
			+ '","user":"'
			+ user
			+ '"},"direction":"REQUEST","ontology":null,"messageType":"JOIN","messageId":null,"sessionKey":"' + sessionKey + '"}';
	sendMessage("JOIN", queryJoin, true, joinResponse);

}


//JOIN By Token
function joinToken(token, instance, joinResponse){
	var queryJoin = '{"body":{"instance":"'
		+ instance
		+ '","token":"'
		+ token
		+ '"},"direction":"REQUEST","ontology":null,"messageType":"JOIN","messageId":null,"sessionKey":null}';
	sendMessage("JOIN", queryJoin, false, joinResponse);
}


//JOIN By Token to renovate session key
function joinTokenRenovateSession(token, instance, joinResponse){
	var queryJoin = '{"body":{"instance":"'
		+ instance
		+ '","token":"'
		+ token
		+ '"},"direction":"REQUEST","ontology":null,"messageType":"JOIN","messageId":null,"sessionKey":"' + sessionKey + '"}';
	sendMessage("JOIN", queryJoin, false, joinResponse);
}


//JOIN By Token Operation
function joinTokenCipher(token, instance, joinResponse) {
	var queryJoin = '{"body":{"instance":"'
		+ instance
		+ '","token":"'
		+ token
		+ '"},"direction":"REQUEST","ontology":null,"messageType":"JOIN","messageId":null,"sessionKey":null}';
	sendMessage("JOIN", queryJoin, true, joinResponse);

}

//JOIN By Token Operation to renovate session key
function joinTokenRenovateSessionCipher(token, instance, joinResponse) {
	var queryJoin = '{"body":{"instance":"'
		+ instance
		+ '","token":"'
		+ token
		+ '"},"direction":"REQUEST","ontology":null,"messageType":"JOIN","messageId":null,"sessionKey":"' + sessionKey + '"}';
	sendMessage("JOIN", queryJoin, true, joinResponse);

}

// LEAVE Operation
function leave(leaveResponse) {

	var queryLeave = '{"body":"","direction":"REQUEST","ontology":null,"messageType":"LEAVE","messageId":null,"sessionKey":"'
			+ sessionKey + '"}';
	sendMessage("LEAVE", queryLeave, false, leaveResponse);
}


// LEAVE Operation
function leaveCipher(leaveResponse) {

	var queryLeave = '{"body":"","direction":"REQUEST","ontology":null,"messageType":"LEAVE","messageId":null,"sessionKey":"'
			+ sessionKey + '"}';
	sendMessage("LEAVE", queryLeave, true, leaveResponse);
}

function insert(data, ontology, insertResponse) {
	data=addQuotesToData(data);
	data = data.replace(/'/g, '"');
	var queryInsert = '{"body":{"data":'
			+ data
			+ ',"query":null},"direction":"REQUEST","messageId":null,"messageType":"INSERT","ontology":"'
			+ ontology + '","sessionKey":"' + sessionKey + '"}';
			
	sendMessage("INSERT", queryInsert, false, insertResponse);
}





// INSERT Operation
function insertWithQueryType(data, ontology, queryType, insertResponse) {
	var queryInsert = '';
	
	if(queryType=="NATIVE"){
		queryInsert = '{"body":{"data":"'
				+ data
				+ '","query":null,"queryType":"'+queryType+'"},"direction":"REQUEST","messageId":null,"messageType":"INSERT","ontology":"'
				+ ontology + '","sessionKey":"' + sessionKey + '"}';
	}else{
		queryInsert = '{"body":{"query":"'
					+ data
					+ '","data":null,"queryType":"'+queryType+'"},"direction":"REQUEST","messageId":null,"messageType":"INSERT","ontology":"'
					+ ontology + '","sessionKey":"' + sessionKey + '"}';
	}
	sendMessage("INSERT", queryInsert, false, insertResponse);
}

// INSERT Operation
function insertCipher(data, ontology, insertResponse) {
	data=addQuotesToData(data);
	data = data.replace(/'/g, '"');
	var queryInsert = '{"body":{"data":'
			+ data
			+ ',"query":null},"direction":"REQUEST","messageId":null,"messageType":"INSERT","ontology":"'
			+ ontology + '","sessionKey":"' + sessionKey + '"}';
	sendMessage("INSERT", queryInsert, true, insertResponse);
}

// INSERT Operation
function insertWithQueryTypeCipher(data, ontology, queryType, insertResponse) {
	var queryInsert = '';
	
	if(queryType=="NATIVE"){
		queryInsert = '{"body":{"data":"'
				+ data
				+ '","query":null,"queryType":"'+queryType+'"},"direction":"REQUEST","messageId":null,"messageType":"INSERT","ontology":"'
				+ ontology + '","sessionKey":"' + sessionKey + '"}';
	}else{
		queryInsert = '{"body":{"query":"'
					+ data
					+ '","data":null,"queryType":"'+queryType+'"},"direction":"REQUEST","messageId":null,"messageType":"INSERT","ontology":"'
					+ ontology + '","sessionKey":"' + sessionKey + '"}';
	}
	sendMessage("INSERT", queryInsert, true, insertResponse);
}


//##################################
// UPDATE Operation
function update(data, query, ontology, updateResponse) {
	var queryUpdate = '{"body":{"data":"'
			+ data
			+ '","query":"'
			+ query
			+ '"},"direction":"REQUEST","messageId":null,"messageType":"UPDATE","ontology":"'
			+ ontology + '","sessionKey":"' + sessionKey + '"}';
	
	sendMessage("UPDATE", queryUpdate, false, updateResponse);
}

// UPDATE Operation
function updateWithQueryType(data, query, ontology, queryType, updateResponse) {
	var queryUpdate = '{"body":{"data":"'
			+ data
			+ '","query":"'
			+query
			+'","queryType":"'
			+queryType+
			'"},"direction":"REQUEST","messageId":null,"messageType":"UPDATE","ontology":"'
			+ ontology + '","sessionKey":"' + sessionKey + '"}';
	sendMessage("UPDATE", queryUpdate, false, updateResponse);
}

// UPDATE Operation
function updateCipher(data, query, ontology, updateResponse) {
	var queryUpdate = '{"body":{"data":"'
			+ data
			+ '","query":"'
			+ query
			+ '"},"direction":"REQUEST","messageId":null,"messageType":"UPDATE","ontology":"'
			+ ontology + '","sessionKey":"' + sessionKey + '"}';
			
	sendMessage("UPDATE", queryUpdate, true, updateResponse);
}

// UPDATE Operation
function updateWithQueryTypeCipher(data, query, ontology, queryType, updateResponse) {
	var queryUpdate = '{"body":{"data":"'
			+ data
			+ '","query":"'
			+query
			+'","queryType":"'
			+queryType+
			'"},"direction":"REQUEST","messageId":null,"messageType":"UPDATE","ontology":"'
			+ ontology + '","sessionKey":"' + sessionKey + '"}';
			
	sendMessage("UPDATE", queryUpdate, true, updateResponse);
}

//REMOVE Operation
function remove(query, ontology, removeResponse) {
	var queryRemove = '{"body":{"data":null,"query":"'
			+ query
			+ '"},"direction":"REQUEST","messageId":null,"messageType":"DELETE","ontology":"'
			+ ontology + '","sessionKey":"' + sessionKey + '"}';
	sendMessage("DELETE", queryRemove, false, removeResponse);
}

//REMOVE Operation
function removeWithQueryType(query, ontology, queryType, removeResponse) {
	var queryRemove = '{"body":{"data":null,"query":"'
			+query
			+'","queryType":"'
			+queryType+
			'"},"direction":"REQUEST","messageId":null,"messageType":"DELETE","ontology":"'
			+ ontology + '","sessionKey":"' + sessionKey + '"}';
	sendMessage("DELETE", queryRemove, false, removeResponse);
}

//REMOVE Operation
function removeCipher(query, ontology, removeResponse) {
	var queryRemove = '{"body":{"data":null,"query":"'
			+ query
			+ '"},"direction":"REQUEST","messageId":null,"messageType":"DELETE","ontology":"'
			+ ontology + '","sessionKey":"' + sessionKey + '"}';
	sendMessage("DELETE", queryRemove, false, removeResponse);
}

//REMOVE Operation
function removeWithQueryTypeCipher(query, ontology, queryType, removeResponse) {
	var queryRemove = '{"body":{"data":null,"query":"'
			+query
			+'","queryType":"'
			+queryType+
			'"},"direction":"REQUEST","messageId":null,"messageType":"DELETE","ontology":"'
			+ ontology + '","sessionKey":"' + sessionKey + '"}';
	sendMessage("DELETE", queryRemove, false, removeResponse);
}
//##################################



// QUERY Operation
function query(query, ontology, queryResponse) {
	var querySib = '{"body":{"query":"' + query
			+ '"},"direction":"REQUEST","ontology":"' + ontology
			+ '","messageType":"QUERY","messageId":null,"sessionKey":"'
			+ sessionKey + '"}';
	sendMessage("QUERY", querySib, false, queryResponse);
}


// QUERY with queryType Operation
function queryWithQueryType(query, ontology, queryType, queryParams, queryResponse) {
	var querySib='';
	if(queryParams==null){
		var querySib = '{"body":{"query":"' 
			+ query
			+ '","queryType":"'
			+ queryType+'","queryParams": null},"direction":"REQUEST","ontology":"' 
			+ ontology
			+ '","messageType":"QUERY","messageId":null,"sessionKey":"'
			+ sessionKey + '"}';
		
	
	}else{
		var querySib = '{"body":{"query":"' 
			+ query
			+ '","queryType":"'
			+ queryType+'","queryParams":'
			+ JSON.stringify(queryParams)+'},"direction":"REQUEST","ontology":"' 
			+ ontology
			+ '","messageType":"QUERY","messageId":null,"sessionKey":"'
			+ sessionKey + '"}';
	}

	sendMessage("QUERY", querySib, false, queryResponse);
	
}




// QUERY Operation
function queryCipher(query, ontology, queryResponse) {
	var querySib = '{"body":{"query":"' + query
			+ '"},"direction":"REQUEST","ontology":"' + ontology
			+ '","messageType":"QUERY","messageId":null,"sessionKey":"'
			+ sessionKey + '"}';
			
	sendMessage("QUERY", querySib, true, queryResponse);
}

// QUERY Operation
function queryWithQueryTypeCipher(query, ontology, queryType, queryParams, queryResponse) {
	var querySib='';
	if(queryParams==null){
		var querySib = '{"body":{"query":"' 
			+ query
			+ '","queryType":"'
			+ queryType+'","queryParams": null},"direction":"REQUEST","ontology":"' 
			+ ontology
			+ '","messageType":"QUERY","messageId":null,"sessionKey":"'
			+ sessionKey + '"}';
		
	
	}else{
		var querySib = '{"body":{"query":"' 
			+ query
			+ '","queryType":"'
			+ queryType+'","queryParams":'
			+ JSON.stringify(queryParams)+'},"direction":"REQUEST","ontology":"' 
			+ ontology
			+ '","messageType":"QUERY","messageId":null,"sessionKey":"'
			+ sessionKey + '"}';
	}
	sendMessage("QUERY", querySib, true, queryResponse);
}

// SUBSCRIBE Operation
function subscribe(suscription, ontology, refresh) {

	var queryMongo = suscription;
	var querySubscribe = '{"body":{"query":"' + queryMongo
			+ '","msRefresh":"' + refresh
			+ '"},"direction":"REQUEST","ontology":"' + ontology
			+ '","messageType":"SUBSCRIBE","messageId":null,"sessionKey":"'
			+ sessionKey + '"}';

	if (suscription in subscriptionsMap) {
		return false;
	} else {
		sendMessage("SUBSCRIBE", querySubscribe, false, function(mensajeSSAP){
			if(mensajeSSAP.body.ok){
				subscriptionId=mensajeSSAP.body.data;
				subscriptionsMap[suscription] = subscriptionId;
				subscriptionsOntology[subscriptionId] = ontology;
				subscriptionWellLaunchedResponse(subscriptionId, suscription);
			
			}else{
				subscriptionWellLaunchedResponse(null, suscription)

			}
		});
		
		return true;
	}
	
}

// SUBSCRIBE Operation
function subscribeWithQueryType(suscription, ontology, queryType, refresh) {

	var queryMongo = suscription;
	var querySubscribe = '{"body":{"query":"' + queryMongo
			+ '","msRefresh":"' + refresh
			+ '","queryType":"'+queryType+'"},"direction":"REQUEST","ontology":"' + ontology
			+ '","messageType":"SUBSCRIBE","messageId":null,"sessionKey":"'
			+ sessionKey + '"}';

	if (suscription in subscriptionsMap) {
		return false;
	} else {
		
		sendMessage("SUBSCRIBE", querySubscribe, false, function(mensajeSSAP){
			if(mensajeSSAP.body.ok){
				subscriptionId=mensajeSSAP.body.data;
				subscriptionsMap[suscription] = subscriptionId;
				subscriptionsOntology[subscriptionId] = ontology;
				subscriptionWellLaunchedResponse(subscriptionId, suscription);
			
			}else{
				subscriptionWellLaunchedResponse(null, suscription)

			}
		});
		
		return true;
	}
	
}


// SUBSCRIBE Operation
function subscribeWithQueryTypeSibDefinedParams(suscription, ontology, queryType, queryParams, refresh) {

	var queryMongo = suscription;
	var querySubscribe="";
	if(queryParams==null){
		querySubscribe = '{"body":{"query":"' + queryMongo
				+ '","msRefresh":"' + refresh
				+ '","queryType":"'+queryType+'"},"direction":"REQUEST","ontology":"' + ontology
				+ '","messageType":"SUBSCRIBE","messageId":null,"sessionKey":"'
				+ sessionKey + '"}';
	}else{
		querySubscribe = '{"body":{"query":"' + queryMongo
				+ '","msRefresh":"' + refresh
				+ '","queryType":"'+queryType+'","queryParams":'
				+ JSON.stringify(queryParams)+'},"direction":"REQUEST","ontology":"' + ontology
				+ '","messageType":"SUBSCRIBE","messageId":null,"sessionKey":"'
				+ sessionKey + '"}';
	}

	if (suscription in subscriptionsMap) {
		return false;
	} else {
		
		sendMessage("SUBSCRIBE", querySubscribe, false, function(mensajeSSAP){
			if(mensajeSSAP.body.ok){
				subscriptionId=mensajeSSAP.body.data;
				subscriptionsMap[suscription] = subscriptionId;
				subscriptionsOntology[subscriptionId] = ontology;
				subscriptionWellLaunchedResponse(subscriptionId, suscription);
			
			}else{
				subscriptionWellLaunchedResponse(null, suscription)

			}
		});
		
		return true;
	}
	
}


// SUBSCRIBE Operation
function subscribeCipher(suscription, ontology, refresh) {

	var queryMongo = suscription;
	var querySubscribe = '{"body":{"query":"' + queryMongo
			+ '","msRefresh":"' + refresh
			+ '"},"direction":"REQUEST","ontology":"' + ontology
			+ '","messageType":"SUBSCRIBE","messageId":null,"sessionKey":"'
			+ sessionKey + '"}';

	if (suscription in subscriptionsMap) {
		return false;
	} else {
		
		sendMessage("SUBSCRIBE", querySubscribe, true, function(mensajeSSAP){
			if(mensajeSSAP.body.ok){
				subscriptionId=mensajeSSAP.body.data;
				subscriptionsMap[suscription] = subscriptionId;
				subscriptionsOntology[subscriptionId] = ontology;
				
				subscriptionWellLaunchedResponse(subscriptionId, suscription);
			}else{
				subscriptionWellLaunchedResponse(null, suscription)

			}
		});
		return true;
	}
}


// SUBSCRIBE Operation
function subscribeWithQueryTypeSibDefinedParamsCipher(suscription, ontology, queryType, queryParams, refresh) {

	var queryMongo = suscription;
	var querySubscribe="";
	if(queryParams==null){
		querySubscribe = '{"body":{"query":"' + queryMongo
				+ '","msRefresh":"' + refresh
				+ '","queryType":"'+queryType+'"},"direction":"REQUEST","ontology":"' + ontology
				+ '","messageType":"SUBSCRIBE","messageId":null,"sessionKey":"'
				+ sessionKey + '"}';
	}else{
		querySubscribe = '{"body":{"query":"' + queryMongo
				+ '","msRefresh":"' + refresh
				+ '","queryType":"'+queryType+'","queryParams":'
				+ JSON.stringify(queryParams)+'},"direction":"REQUEST","ontology":"' + ontology
				+ '","messageType":"SUBSCRIBE","messageId":null,"sessionKey":"'
				+ sessionKey + '"}';
	}

	if (suscription in subscriptionsMap) {
		return false;
	} else {
		
		sendMessage("SUBSCRIBE", querySubscribe, true, function(mensajeSSAP){
			if(mensajeSSAP.body.ok){
				subscriptionId=mensajeSSAP.body.data;
				subscriptionsMap[suscription] = subscriptionId;
				subscriptionsOntology[subscriptionId] = ontology;
				subscriptionWellLaunchedResponse(subscriptionId, suscription);
			
			}else{
				subscriptionWellLaunchedResponse(null, suscription)

			}
		});
		
		return true;
	}
	
}

// SUBSCRIBE Operation
function subscribeWithQueryTypeCipher(suscription, ontology, queryType, refresh) {

	var queryMongo = suscription;
	var querySubscribe = '{"body":{"query":"' + queryMongo
			+ '","msRefresh":"' + refresh
			+ '","queryType":"'+queryType+'"},"direction":"REQUEST","ontology":"' + ontology
			+ '","messageType":"SUBSCRIBE","messageId":null,"sessionKey":"'
			+ sessionKey + '"}';

	if (suscription in subscriptionsMap) {
		return false;
	} else {
		
		sendMessage("SUBSCRIBE", querySubscribe, true, function(mensajeSSAP){
			if(mensajeSSAP.body.ok){
				subscriptionId=mensajeSSAP.body.data;
				subscriptionsMap[suscription] = subscriptionId;
				subscriptionsOntology[subscriptionId] = ontology;
				
				subscriptionWellLaunchedResponse(subscriptionId, suscription);
			}else{
				subscriptionWellLaunchedResponse(null, suscription)

			}
		});
		return true;
	}
}

// UNSUBSCRIBE Operation
function unsubscribe(querySubs, unsubscribeResponse, unsubscribeMessages) {
	subscriptionId = subscriptionsMap[querySubs];
	ontology = subscriptionsOntology[subscriptionId];
	
	if (subscriptionId != null && ontology != null) {
		var queryUnsubscribe = '{"body":{"idSuscripcion":"'
				+ subscriptionId
				+ '"},"direction":"REQUEST","ontology":"'
				+ ontology
				+ '","messageType":"UNSUBSCRIBE","messageId":null,"sessionKey":"'
				+ sessionKey + '"}';
		sendMessage("UNSUBSCRIBE", queryUnsubscribe, false, function(mensajeSSAP) {
			if (mensajeSSAP != null && mensajeSSAP.body.data != null
					&& mensajeSSAP.body.ok == true) {
				delete subscriptionsMap[querySubs];
				delete subscriptionsOntology[subscriptionId];
			}
			unsubscribeResponse(mensajeSSAP);
		});
	}else {
		unsubscribeMessages("ERROR_1");
	}
}


// UNSUBSCRIBE Operation
function unsubscribeCipher(querySubs, unsubscribeResponse, unsubscribeMessages) {

	subscriptionId = subscriptionsMap[querySubs];
	ontology = subscriptionsOntology[suscriptionId];
	
	if (subscriptionId != null && ontology != null) {
		var queryUnsubscribe = '{"body":{"idSuscripcion":"'
				+ subscriptionId
				+ '"},"direction":"REQUEST","ontology":"'
				+ ontology
				+ '","messageType":"UNSUBSCRIBE","messageId":null,"sessionKey":"'
				+ sessionKey + '"}';
		sendMessage("UNSUBSCRIBE", queryUnsubscribe, true, function(mensajeSSAP) {
			if (mensajeSSAP != null && mensajeSSAP.body.data != null
					&& mensajeSSAP.body.ok == true) {
				delete subscriptionsMap[querySubs];
				delete subscriptionsOntology[suscriptionId];
			}
			unsubscribeResponse(mensajeSSAP);
		});
	}else {
		unsubscribeMessages("ERROR_1");
	}
}

// #################################################################
// Auxiliar functions
// #################################################################





// Sends a SSAP Message of any type
function sendMessage(tipoQuery, query, cipherMessage, responseCallback) {

	var mensajeSSAP = null;
	GatewayDWR._path = sibServer; // Avoid having GatewayDWR.js in local
	
	
	if(cipherMessage){
		if(tipoQuery=="JOIN"){
			query=kpName.length+"#"+kpName+ Base64.encode(XXTEA.encrypt(query, cipherKey), false);
			
		}else{
			query=Base64.encode(XXTEA.encrypt(query, cipherKey));
		}
	
	}
	
	GatewayDWR.process(query, function(data) {
	
		if(cipherMessage){
			data=XXTEA.decrypt(Base64.decode(data), cipherKey);
		}
		
		if(tipoQuery=="INSERT" || tipoQuery=="UPDATE" || tipoQuery=="DELETE"){
			mensajeSSAP = parsearMensajeSSAP(data);
		}else{
			mensajeSSAP = parsearMensajeSSAP(validarSSAPConDataString(data));
			}
			
		
		// Ok
		if (mensajeSSAP != null && mensajeSSAP.body.data != null
				&& mensajeSSAP.body.ok == true) {
			switch (tipoQuery) {
			case "JOIN":
				sessionKey = mensajeSSAP.sessionKey;
				responseCallback(mensajeSSAP);
				break;
			case "LEAVE":
				sessionKey = null;
				responseCallback(mensajeSSAP);
				break;
			case "INSERT":
				responseCallback(mensajeSSAP);
				break;
			case "QUERY":
				responseCallback(mensajeSSAP);
				break;
			case "SUBSCRIBE":
				responseCallback(mensajeSSAP);
				break;
			default:
				responseCallback(mensajeSSAP);
			}
		}
		// Error
		else {
			responseCallback(mensajeSSAP);
		}
	});

}

function setCipherKey(key){
	cipherKey=key;
}

function setKpName(name){
	kpName=name;
}



// Devuelve un mensaje SSAP JSON parseado a un objeto Javascript
function parsearMensajeSSAP(mensaje) {
	try {
		return $.parseJSON(mensaje.replace(/'/g, "\\\""));
	} catch (e) {
		return null;
	}
}

// Devuelve un string JSON SSAP v?lido
function validarSSAPConDataString(datos) {
	return datos.replace(/(body|data)\"\s*:\s*\"({|\[)/g, "$1\":$2").replace(
			/(}|])\"\s*,\s*\"(direction|ontology|message|session|error|ok)/g,
			"$1,\"$2").replace(/\\+\"/g, "\"");
}

function validarSSAP(datos) {
	
	return datos.replace(/\\+\"/g, "\"").replace(
			/(body|data)\"\s*:\s*\"({|\[)/g, "$1\":$2").replace(
			/(}|])\"\s*,\s*\"(direction|ontology|message|session|error|ok)/g,
			"$1,\"$2");
}

function escapeJSONObject(datos){
	return datos.replace(/\"/g, "\\\"").replace(/\\\\\"/g, "\\\\\\\"");
}

function addQuotesToData(data){
	if (data.indexOf("{")!=0)
		data="{"+data+"}";
		
	return data;
}
