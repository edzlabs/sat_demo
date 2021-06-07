import axios from 'axios';
import { getUrl, ServicesName } from './Servers';
import { DsdCrypto as dsdCrypto } from 'dsd-common-lib';
import { CredInfo, CredInfoProps } from './Interface';

/**
 * DOCS
 *
 * [Consumer Accesses the Asset] {@link http://35.184.253.93:81/tutorials/tutorial-sat/#apis}
 */

export type DownloadProps = CredInfo &
    CredInfoProps & {
        assetId: number;
        dabId: number;
        buyerId: string;
    };
// eslint-disable-next-line
const DownloadContent = ({ prvKey, pubKey, assetId, dabId, serverName, buyerId }: DownloadProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(prvKey + '\n', pubKey + '\n', assetId + '\n', dabId + '\n', serverName + '\n', buyerId + '\n');

            const params = {
                satId: assetId,
                dabId,
                buyerId,
            };

            const url = getUrl(serverName, ServicesName['PdsRpc']);
            const urlVault = getUrl(serverName, ServicesName['Vault']);

            const sig = dsdCrypto.signData(params, prvKey);

            /**
             * 1. Retrieval of an Access Ticket
             */
            const { data: request } = await axios.post(url, {
                jsonrpc: '2.0',
                method: 'getSatAccessTicket',
                id: 1,
                params: {
                    dabId,
                    satId: assetId,
                    buyerId: buyerId,
                    argsBuyerSignature: sig,
                    publicKey: pubKey,
                },
            });

            // download file
            // /**
            //  * 2. Create a Session
            //  */
            // const CreateSession = urlVault + `/getsession?ticket=${btoa(JSON.stringify(request.result))}`;
            //
            // const { headers: headersSession } = await axios.get(CreateSession);
            //
            // const vaultSessionId = encodeURIComponent(headersSession['vault-session-id']);
            //
            // /**
            //  * 3. Construct a Download URL
            //  */
            //
            // const { data: dataDownload } = await axios.get(`${urlVault}/download?sid=${vaultSessionId}`);
            //

            /**
             * getplayer file
             */

            const GetPlayerFile = urlVault + `/getplayer?ticket=${btoa(JSON.stringify(request.result))}`;
            // const GetPlayerFile =
            //     urlVault + `/getplayer?ticket=${+Buffer.from(JSON.stringify(request.result)).toString('base64')}`;

            resolve(GetPlayerFile);
        } catch (err) {
            reject(err);
        }
    });
};

export default DownloadContent;
