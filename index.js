const owners = require("./repo.json");
const { listPullRequests } = require("./utils");
const { createTwitterMessage } = require("./composer");
const { initializeMediaUpload, publishStatusUpdateOnly } = require('./media-upload')
const { blackList } = require("./blackList");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function tweetToPrList(params) {
  const { prList, repo, repoTwitter } = params;
  const tweetPromise = []
  for (const pr of prList) {
    const {
      user: { twitter: twitterHandle },
    } = pr;
    if (blackList.includes(twitterHandle.toLowerCase())) {
      continue;
    }
    const status = createTwitterMessage({ ...pr, repo, repoTwitter });
    // TODO
    // initializeMediaUpload
    // tweetPromise.push(publishStatusUpdateOnly(status))
    console.log("🐦", status);
  }
  try {
    console.log('#', tweetPromise.length, 'to tweet')
    await Promise.all(tweetPromise)
    await sleep(30)
  } catch (error) {
    console.log("Tweet Promise Error", error)
  }
}

async function main() {
  for (const owner in owners) {
    const repo = owners[owner].repo;
    const repoTwitter = owners[owner].twitter;
    const prList = await listPullRequests({ owner, repo });
    console.log("prList.length", prList.length)
    if (prList)
      tweetToPrList({ prList, repo, repoTwitter });
  }
}

module.exports = { main };