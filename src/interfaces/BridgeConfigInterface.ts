export default interface BridgeConfigInterface {
	name: string;
	zigbeechannel: number;
	bridgeid: string;
	mac: string;
	dhcp: boolean;
	ipaddress: string;
	netmask: string;
	gateway: string;
	proxyaddress: string;
	proxyport: number;
	UTC: string;
	localtime: string;
	timezone: string;
	modelid: string;
	datastoreversion: string;
	swversion: string;
	apiversion: string;
	swupdate: Swupdate;
	swupdate2: Swupdate2;
	linkbutton: boolean;
	portalservices: boolean;
	portalconnection: string;
	portalstate: Portalstate;
	internetservices: Internetservices;
	factorynew: boolean;
	replacesbridgeid?: any;
	backup: Backup;
	starterkitid: string;
	whitelist: {
		[key: string]: {
			"last use date": string;
			"create date": string;
			name: string;
		};
	};
}

interface Backup {
	status: string;
	errorcode: number;
}

interface Internetservices {
	internet: string;
	remoteaccess: string;
	time: string;
	swupdate: string;
}

interface Portalstate {
	signedon: boolean;
	incoming: boolean;
	outgoing: boolean;
	communication: string;
}

interface Swupdate2 {
	checkforupdate: boolean;
	lastchange: string;
	bridge: Bridge;
	state: string;
	autoinstall: Autoinstall;
}

interface Autoinstall {
	updatetime: string;
	on: boolean;
}

interface Bridge {
	state: string;
	lastinstall: string;
}

interface Swupdate {
	updatestate: number;
	checkforupdate: boolean;
	devicetypes: Devicetypes;
	url: string;
	text: string;
	notify: boolean;
}

interface Devicetypes {
	bridge: boolean;
	lights: any[];
	sensors: any[];
}
