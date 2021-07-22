const Twitter = require("twitter-lite");
const Twitterclient = new Twitter({
  subdomain: "api",
  version: "1.1",
  consumer_key: process.env.LEGEND_API_KEY_TWITTER,
  consumer_secret: process.env.LEGEND_API_SECRET_KEY_TWITTER,
  access_token_key: process.env.LEGEND_ACCESS_TOKEN_TWITTER,
  access_token_secret: process.env.LEGEND_ACCESS_TOKEN_SECRET_TWITTER,
});

const owners = require("./repo.json");
const { listPullRequests } = require("./utils");
const { createTwitterMessage } = require("./composer");
const { blackList } = require("./blackList");

async function tweetToPrList(params) {
  const { prList, repo, repoTwitter } = params;
  for (const pr of prList) {
    const {
      user: { twitter: twitterHandle },
    } = pr;
    if (blackList.includes(twitterHandle.toLowerCase())) {
      continue;
    }
    const status = createTwitterMessage({ ...pr, repo, repoTwitter });
    console.log("🐦", status);
    let resp;
    // resp = await Twitterclient.post("statuses/update", {
    //     status,
    //   });
    if (!resp?.created_at) {
      console.log("🔴 error tweeting:'", status, "'");
    }
  }
}

async function main() {
  for (const owner in owners) {
    const repo = owners[owner].repo;
    const repoTwitter = owners[owner].twitter;
    const prList = await listPullRequests({ owner, repo });
    tweetToPrList({ prList, repo, repoTwitter });
  }
}

main();
