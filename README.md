SAT Gallery Demo Application

   Allows to view users' assets and associated Serialized Asset Tockens
   Shows meta information 
   Shows royalties and certification

Repository Overview

   - uses standrd react application folder structure
   - public - thumbnails for assets (static for now, to be replaced with dymanic view later)
   - src/services - PDS API calls


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### `yarn server`

the static server starts
`Running on http://0.0.0.0:8080`

----

#Folder with the assembled project

> #### build/
> 
> in the server config you need to link to build / index.html
> 
> Thumbnails need to be added to folders
> - #### build/thumbnail/
> - #### public/thumbnail/

## How to get royalties
1. http://34.69.151.182:8080/api/deals?userId=0xd54b75d4dfe459f4aca0cd4eda10fae2d52bc375&tradeType=BUY&licenseType=OWNERSHIP&assetId=431&offset=0&limit=100

2. http://34.69.151.182:8080/api/sats?queryOption=list&satId=431&offset=0&limit=100 -> dabid [388, 351]
   two dubs

> #### 0x5b084976Cf236C4Ac4DEA67df999F583D15d904E - this is "sellerId" from the first request

http://34.69.151.182:8080/api/deals?userId=0x5b084976Cf236C4Ac4DEA67df999F583D15d904E&tradeType=BUY&licenseType=SATCREATE&assetId=388&offset=0&limit=100

http://34.69.151.182:8080/api/deals?userId=0x5b084976Cf236C4Ac4DEA67df999F583D15d904E&tradeType=BUY&licenseType=SATCREATE&assetId=351&offset=0&limit=100


> #### 0x613250e0384E60BC9cAb2585d7799470B8415eDe - this is "sellerId" from the first request http://34.69.151.182:8080/api/deals?userId=0x5b084976Cf236C4Ac4DEA67df999F583D15d904E&tradeType=BUY&licenseType=SATCREATE&assetId=388&offset=0&limit=100

http://34.69.151.182:8080/api/deals?userId=0x613250e0384E60BC9cAb2585d7799470B8415eDe&tradeType=BUY&licenseType=OWNERSHIP&assetId=388&offset=0&limit=100

http://34.69.151.182:8080/api/deals?userId=0x613250e0384E60BC9cAb2585d7799470B8415eDe&tradeType=BUY&licenseType=OWNERSHIP&assetId=351&offset=0&limit=100

# Strategy:

> - ROYALTY TREE 1 -> tagid = 431
DIGITAL ASSET BADGE 1 tagid->dabid = 388
>
> - CERTIFICATION 1 <-    tagid->dabid->tagid some tag
SUBTAG 1 <-    tagid->dabid->tagid->dabid
>
> - DIGITAL ASSET BADGE 2 tagid->dabid = 351

> - CERTIFICATION 2 <-- have not received yet
> - SUBTAG 2 <-- have not received yet


# Docker address
> - http://0.0.0.0:8080
