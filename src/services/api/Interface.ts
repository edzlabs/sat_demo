export interface CredInfo {
    userId?: string;
    prvKey?: string;
    pubKey?: string;
}

export interface LoginProps {
    serverName: string;
    login: string;
    password: string;
}

export interface CredInfoProps extends CredInfo {
    serverName: string;
}
