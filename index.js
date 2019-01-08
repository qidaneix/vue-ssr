const Vue = require('vue');
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

server.get('*', async (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>访问的 URL 是：{{url}}</div>`
    })

    try {
        const html = await renderer.renderToString(app)
        res.end(html)
    } catch (error) {
        res.status(500).end('Internal Server Error')
    }

})

server.listen(8080)
