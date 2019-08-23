const axios = require('axios')

setInterval( () => {
    axios.get('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js').then((res) => {
        console.log ( Date(), '🤩 成功')
    }).catch( (e) => {
        console.log ( Date(), '😕 失败')
    })
}, 1000)