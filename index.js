const Twitter = require('twitter-lite');
const Twitterclient = new Twitter({
    subdomain: "api",
    version: "1.1",
    consumer_key: process.env.LEGEND_API_KEY_TWITTER,
    consumer_secret: process.env.LEGEND_API_SECRET_KEY_TWITTER,
    access_token_key: process.env.LEGEND_ACCESS_TOKEN_TWITTER,
    access_token_secret: process.env.LEGEND_ACCESS_TOKEN_SECRET_TWITTER,
})

const owners = require('./repo.json');
const { listPullRequests } = require('./utils');
const { createTwitterMessage } = require('./composer')

async function main() {
    for (const owner in owners) {
        const prList = await listPullRequests({owner, repo: owners[owner]})
        for (const pr of prList) {
            const status = createTwitterMessage({...pr, repo: owners[owner]})
            console.log("🐦", status)
            const resp = await Twitterclient.post("statuses/update", {
                status,
              });
            console.log("resp", resp)
            if (!resp.created_at) {
                console.log("🔴 error tweeting status", status)
            }
        }
    }

}

main()

