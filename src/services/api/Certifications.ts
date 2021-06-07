import axios from 'axios';
import { getUrlApi, ServicesName } from '../../services/api/Servers';
import { CredInfoProps } from '../../services/api/Interface';

export interface PropsCertifications extends CredInfoProps {
    dabId: number;
}

/**
 * Obtaining certificates
 * satId === dabId
 * @param userId
 * @param serverName
 * @param dabId
 * @constructor
 *
 * EXAMPLE:
 [
    {
        "tagId": 19,
        "ownerId": "0x75f980eb2cb2a1d450664ee271806853126bf6ed",
        "description": "TAG description",
        "custodians": [

        ],
        "createdAt": "2021-04-14T18:18:38.000Z"
    }
 ]
 */
// eslint-disable-next-line
const Certifications = ({ userId, serverName, dabId }: PropsCertifications) => {
    return new Promise(async (resolve, reject) => {
        try {
            const urlApi = getUrlApi(serverName, ServicesName['PdsRest']);

            const urlRequest = `${urlApi}/tags?queryOption=labels&userId=${userId}&dabId=${dabId}`;

            const { data } = await axios.get(urlRequest);

            resolve(data);
        } catch (err) {
            reject({ status: 'error', ...err });
        }
    });
};

export default Certifications;
