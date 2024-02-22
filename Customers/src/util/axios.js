const axios = require('axios');

module.exports.MakeAxiosRequest = async (url, data) => {
    const options = {
        method: 'GET',
        url: url,
        params: { 'api-version': '3.0' },
        headers: {
            'content-type': 'application/json'
        },
        data
    };

    const res = await axios.request(options).then(function(response){
        return response.data;
    }).catch(function (err){
        console.log(err);
    })

    return res;
}