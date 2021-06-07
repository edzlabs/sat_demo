// import isDev from '../../utils/isDev';

export enum ServersName {
    Developer = 'Developer',
    Partners = 'Partners',
    Demo = 'Demo',
}

export interface PropsData {
    name: string;
    url: string;
    request: string;
}

/**
 * Servers
 */
const Servers: Array<PropsData> = [
    {
        name: ServersName.Developer,
        url: '34.69.151.182',
        request: 'http://',
    },
    {
        name: ServersName.Partners,
        url: 'partner.dase.io',
        request: 'https://',
    },
    {
        name: ServersName.Demo,
        url: 'demo.dase.io',
        request: 'https://',
    },
];

export enum ServicesName {
    PdsRest = 'PdsRest',
    PdsRpc = 'PdsRpc',
    Keychain = 'Keychain',
    Vault = 'Vault',
}

export enum ServicesPort {
    port1 = 'port1',
    port2 = 'port2',
}

/**
 * Services (all services are on each of the servers)
 */
export const Services = {
    /**
     * hangs on http (s) port 8080 (8081) - the main server with business logic with a REST interface
     */
    PdsRest: {
        port1: 8080,
        port2: 8081,
    },
    /**
     * hangs on http (s) port 5200 (5201) - the main server with business logic with an RPC interface
     */
    PdsRpc: {
        port1: 5200,
        port2: 5201,
    },
    /**
     * hangs on http (s) port 5110 (5111) - authorization server (contains a database with users)
     */
    Keychain: {
        port1: 5110,
        port2: 5111,
    },
    /**
     * hangs on http (s) port 5080 (5081) - data server - you need to receive files or upload files from it
     */
    Vault: {
        port1: 5080,
        port2: 5081,
    },
};

export const getServices = (services: ServicesName, port: ServicesPort): string => {
    return `:${Services[services][port]}`;
};

type ServerProps = string | undefined;

export const getServers = (Server?: ServerProps): Array<PropsData> => {
    return Server
        ? Servers.filter((serv: PropsData) => {
              if (Server in ServersName) {
                  return Server === serv.name;
              }
          })
        : Servers;
};

export const getUrl = (serverName: string, services: ServicesName): string => {
    const server = getServers(serverName)[0];
    const port =
        serverName === ServersName.Developer // if ServersName === Developer
            ? ServicesPort.port1
            : ServicesPort.port2;
    return server.request + server.url + getServices(services, port);
};

export const getUrlApi = (serverName: string, services: ServicesName): string => {
    return getUrl(serverName, services) + '/api';
};
