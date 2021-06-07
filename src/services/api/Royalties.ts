import axios from 'axios';
import { getUrlApi, ServicesName } from '../../services/api/Servers';
import { CredInfoProps } from '../../services/api/Interface';

export interface PropsRoyalties extends CredInfoProps {
    tagId: number;
    licenseType: string;
    royaltiesSingle?: any;
}

export type PropsTagIdPercent = {
    tagId: number | string;
    tagIdPercent: number | string;
    dabIdParams: any[];
};

/**
 * I get originalDabOwnerRoyaltyPercent from dabId
 * we get for another license licenseType = SATCREATE
 * http://34.69.151.182:8080/api/deals?userId=${sellerId}&tradeType=BUY&licenseType=SATCREATE&assetId=${dabId}&offset=0&limit=100
 */
const GetPercentDabId = ({ urlApi, sellerId, dabId }: { urlApi: string; sellerId: string; dabId: string }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const urlRequest = `${urlApi}/deals?userId=${sellerId}&tradeType=BUY&licenseType=SATCREATE&assetId=${dabId}&offset=0&limit=100`;
            const {
                data: { deals },
            } = await axios.get(urlRequest);

            const originalDabOwnerRoyaltyPercent = deals[0]?.termSheetData?.originalDabOwnerRoyaltyPercent;

            const dabIdPercent = originalDabOwnerRoyaltyPercent
                ? (originalDabOwnerRoyaltyPercent / 10000).toFixed(2)
                : 0.0;

            resolve(dabIdPercent);
        } catch (err) {
            reject({
                status: 'error',
                code: 1,
                ...err,
            });
        }
    });
};

/**
 * {
    tagId: number | string;
    tagIdPercent: number | string;
    dabIdParams: any[];
    }
 */
// eslint-disable-next-line
const Royalties = ({userId, serverName, tagId, licenseType}: PropsRoyalties) => {
    return new Promise(async (resolve, reject) => {
        try {
            const urlApi = getUrlApi(serverName, ServicesName['PdsRest']);
            const result = <PropsTagIdPercent>{
                tagId,
            };

            /**
             * Get the percentage of tagId
             * http://34.69.151.182:8080/api/licenses/royalty?paidDabId=431
             */
            const urlRequest = `${urlApi}/licenses/royalty?paidDabId=${tagId}`;

            const { data: tagIdPercent } = await axios.get(urlRequest);

            result.tagIdPercent = (+tagIdPercent).toFixed(2);

            /**
             * We get the sellerId
             * http://34.69.151.182:8080/api/deals?userId=0xd54b75d4dfe459f4aca0cd4eda10fae2d52bc375&tradeType=BUY&licenseType=OWNERSHIP&assetId=431&offset=0&limit=100
             */
            const urlRequestSellerId = `${urlApi}/deals?userId=${userId}&tradeType=BUY&licenseType=${licenseType}&assetId=${tagId}&offset=0&limit=100`;

            const {
                data: { deals },
            } = await axios.get(urlRequestSellerId);

            const sellerId = deals[0].sellerId;

            /**
             * I get dabId by tagId
             * http://34.69.151.182:8080/api/sats?queryOption=list&satId=431&offset=0&limit=100 = dabid [388, 351]
             */
            const urlRequestDabIdArr = `${urlApi}/sats?queryOption=list&satId=${tagId}&offset=0&limit=100`;

            const { data: dataDabIdArr } = await axios.get(urlRequestDabIdArr);

            /**
             * I get originalDabOwnerRoyaltyPercent of dabId
             */
            const dabIdParams: any[] = [];

            for await (const dabId of dataDabIdArr) {
                const dabIdPercent = <{ dabIdPercent: string }>await GetPercentDabId({ urlApi, sellerId, dabId });
                dabIdParams.push({
                    dabId,
                    dabIdPercent,
                });
            }

            result.dabIdParams = dabIdParams;

            resolve(result);
        } catch (err) {
            reject({ status: 'error', code: 0, ...err });
        }
    });
};

export default Royalties;
