import axios from 'axios';
import { DsdCrypto as dsdCrypto } from 'dsd-common-lib';
import { ServicesName, getUrl } from '../../services/api/Servers';
import { CredInfo, LoginProps } from './Interface';

// eslint-disable-next-line
export const Login = ({ serverName, login, password }: LoginProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = getUrl(serverName, ServicesName['Keychain']);

            /**
             * Request an authorization code.
             */
            const { data: challengeData } = await axios.post(url, {
                jsonrpc: '2.0',
                method: 'getChallenge',
                id: 1,
                params: [login],
            });

            if ('error' in challengeData) {
                reject({
                    status: 'error',
                    ...challengeData.error,
                });
            }

            /**
             * Prepare a user data request
             */
            const hashPwd = dsdCrypto.hash(password + '' + login);
            const challengeResult = challengeData.result;
            const challengeResponse = dsdCrypto.hash(hashPwd + challengeResult, true);

            /**
             * Request user data
             */
            const { data: encryptedKeyData } = await axios.post(url, {
                jsonrpc: '2.0',
                method: 'getEncryptedKeyData',
                id: 2,
                params: [login, challengeResponse],
            });

            if ('error' in encryptedKeyData) {
                reject({
                    status: 'error',
                    ...challengeData.error,
                });
            }

            const encryptedData = encryptedKeyData.result;
            const myCredInfo = dsdCrypto.decryptKeychain(encryptedData, password + '' + login);

            const { userId, prvKey, pubKey }: CredInfo = myCredInfo;

            resolve({ status: 'success', userId, prvKey, pubKey });
        } catch (err) {
            reject(err);
        }
    });
};
