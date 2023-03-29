export type BridgeConfigType = {
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
};

type Backup = {
	status: string;
	errorcode: number;
};

type Internetservices = {
	internet: string;
	remoteaccess: string;
	time: string;
	swupdate: string;
};

type Portalstate = {
	signedon: boolean;
	incoming: boolean;
	outgoing: boolean;
	communication: string;
};

type Swupdate2 = {
	checkforupdate: boolean;
	lastchange: string;
	bridge: Bridge;
	state: string;
	autoinstall: Autoinstall;
};

type Autoinstall = {
	updatetime: string;
	on: boolean;
};

type Bridge = {
	state: string;
	lastinstall: string;
};

type Swupdate = {
	updatestate: number;
	checkforupdate: boolean;
	devicetypes: Devicetypes;
	url: string;
	text: string;
	notify: boolean;
};

type Devicetypes = {
	bridge: boolean;
	lights: any[];
	sensors: any[];
};
