// The client id and secret will be provided by Photector
// and will be unique to your account. These are required to
// use the API, in addition to your username and password.
// They are stored here, alongside the API url access points.

const SERVER_LIST = {
    dev: { // variable name must match 'value' in the radio list
        LOGIN_URL: 'https://dev.peirmobile.com/oauth/token',
        CLIENT_ID: '3',
        CLIENT_SECRET: 'dk12BYcAvpNV1dKbm2UN8QYuTTwNvvCS9firomSX',
        OTE_URL: 'https://dev.peirmobile.com/api/v1/oneTimeEvents'
    },
    prod: { // variable name must match 'value' in the radio list
        LOGIN_URL: 'https://app.peirmobile.com/oauth/token',
        CLIENT_ID: '3',
        CLIENT_SECRET: 'XnItzgbNQtdJQV7DewhejI1p2TYq5Zb1lk7AeaXj',
        OTE_URL: 'https://app.peirmobile.com/api/v1/oneTimeEvents'
    }
};
