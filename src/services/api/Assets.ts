import axios from 'axios';
import { ServicesName, getUrlApi } from '../../services/api/Servers';
import { CredInfoProps } from './Interface';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';

// http://34.69.151.182:8080/api/deals?userId=<userId>&tradeType=BUY&licenseType=ROYALTY&assetId=318&offset=0&limit=10

type Props = {
    tagId?: number;
    urlApi?: string;
};

interface LicenseProps {
    licenseType: string;
    buyerId: string;
    dabId: number;
    tagId: number;
    dealRevokeValue: string;
}

export interface LicensePropsMetadata extends LicenseProps {
    img: string;
}

type PropsAssets = CredInfoProps &
    Props & {
        userId: string;
    };

export interface RoyaltiesProps {
    tagId: number;
    dabId: string[];
}

/**
 * GET dabId
 * @param urlApi
 * @param tagId
 */
const getsDabId = ({ urlApi, tagId }: Props) => {
    return new Promise(async (resolve, reject) => {
        try {
            const urlRequest = `${urlApi}/sats?queryOption=list&satId=${tagId}&offset=0&limit=100`;

            const { data } = await axios.get(urlRequest);

            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
};

/**
 * Getting a list of your assets (tagId list)
 * @param userId
 * @param serverName
 */
// eslint-disable-next-line
export const getUserListAssets = ({ userId, serverName }: PropsAssets) => {
    return new Promise(async (resolve, reject) => {
        try {
            const urlApi = getUrlApi(serverName, ServicesName['PdsRest']);
            const urlRequest = `${urlApi}/deals?userId=${userId}&tradeType=BUY&licenseType=OWNERSHIP&offset=0&limit=100`;
            const { data } = await axios.get(urlRequest);
            const license = [];
            const pattern = new RegExp(/description:.*[a-zA-Z0-9]/);

            const sortedData = sortBy(data.deals, ['sellOfferId']);

            for await (const asset of sortedData) {
                if ('tagId' in asset) {
                    /**
                     * Return array dabId
                     */
                    const dabId = await getsDabId({
                        urlApi,
                        tagId: asset.tagId,
                    });

                    /**
                     * Choosing a license for the selected dabId
                     */
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    for await (const item of dabId) {
                        license.push(<LicenseProps>{
                            licenseType: asset.licenseType,
                            dealRevokeValue: asset.dealRevokeValue,
                            dabId: item,
                            tagId: asset.tagId,
                            buyerId: asset.buyerId,
                        });
                    }
                }
            }

            const non_duplicated_license = uniqBy(license, 'dabId');
            const dabIdArray = non_duplicated_license.map((item) => item.dabId);

            // console.log(data);

            // const down = await DownloadContent({ prvKey, pubKey, assetId, dabId, serverName, buyerId });

            // for await (const dabId of data) {
            //     await getTicket({
            //         userId,
            //         prvKey,
            //         pubKey,
            //         assetId,
            //         dabId,
            //         sellerId,
            //         buyerId,
            //         serverName,
            //         urlApi,
            //     });
            // }

            /**
             * Getting asset metadata (dab / tag metadata)
             */
            // assetContentType: ""
            // assetId: 318
            // createdAt: "2021-04-19T12:58:25.000Z"
            // custodians: []
            // dataHash: "0x0"
            // description: "6525fb685e.ed1aef1da30d1537a848f8d1187bd3e64cbe3e09b29a3ac52c9f02ce005a11a55212aebd7e5ffd71b7f8d5f199a03d6ed65e02e94371a23411284165c401df9eda0387291e41fc531721643663d14b07750039414abec0fc6e35346b0a0c2a9a979ce9efc273605f282da1bc7a6c32645286d0 (description: Foxy cat)"
            // img: "/static/media/demoImage.5cd6664e.png"
            // linkedDabId: "0"
            // ownerId: "0x613250e0384e60bc9cab2585d7799470b8415ede"
            if (non_duplicated_license.length) {
                const { data: dataMeta } = await axios.get(urlApi + '/assets?assetIds=' + dabIdArray.join(','));

                const TILE = [];

                // example
                // img: string;
                // title: string;
                // description: string;
                // assetId: number; === dabId: number;
                // buyerId: string;
                // tagId: number;
                for await (const license of non_duplicated_license) {
                    // await DownloadContent({
                    //     prvKey,
                    //     pubKey,
                    //     assetId: license.tagId,
                    //     dabId: license.dabId,
                    //     serverName,
                    //     buyerId: license.buyerId,
                    // });

                    for await (const item of dataMeta) {
                        if (Number(license.dabId) === Number(item.assetId)) {
                            /**
                             * TODO: will need to be removed when it comes to the backend
                             * clean the description hash
                             */
                            const descriptionMatch: string | null = item.description.match(pattern);
                            const description: string = !!descriptionMatch
                                ? descriptionMatch[0].replace(/description:/, '').trim()
                                : item.description;

                            const obg = Object.assign({}, item, <LicensePropsMetadata>{
                                img: '/thumbnail/' + +license.dabId + '.jpg',
                                description,
                                licenseType: license.licenseType,
                                dealRevokeValue: license.dealRevokeValue,
                                tagId: license.tagId,
                                dabId: license.dabId,
                                buyerId: license.buyerId,
                            });
                            TILE.push(obg);
                        }
                    }
                }
                resolve(TILE);
            } else {
                reject({
                    message: 'Content not found',
                });
            }
        } catch (err) {
            reject(err);
        }
    });
};
