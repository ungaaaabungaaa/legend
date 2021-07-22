const owners = require("./repo.json");
const { listPullRequests } = require("./utils");
const { createTwitterMessage } = require("./composer");
const { initializeMediaUpload } = require('./media-upload')
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
    await initializeMediaUpload(status)
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

module.exports = { main };