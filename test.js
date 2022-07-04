const axios = require('axios').default;


// axios.get('http://api.ipstack.com/178.37.80.117?access_key=0f7ba6f6d09ad93440d332fc09e3f071').then((data) => {
//     console.log("data", data.data)
// })
axios.get('http://api.ipstack.com/check?access_key=0f7ba6f6d09ad93440d332fc09e3f071').then((data) => {
    console.log("data", data.data)
})