const { Octokit } = require("@octokit/core");
var moment = require('moment');

const INTERVALS = 2000

async function listPullRequests(params) {
    const { repo, owner } = params;
    const list = []
    console.log(repo, owner)
    const octokit = new Octokit({ auth: process.env.LEGEND_AUTH });
    try {
    const resp = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        owner,
        repo,
        per_page: 100,
        state: 'close'
    })
    const { data } = resp;
    for (const pr of data) {
        const prToAdd = {}

        if (!pr.merged_at) {
            continue
        }
        var duration = moment().diff(moment(pr.merged_at), 'minutes');
        // If PR is less than n minutes ago then it should be mentionned
        if (duration < INTERVALS) {
            prToAdd.prTitle = pr.title
            prToAdd.html_url = pr.html_url
            prToAdd.merged_at = pr.merged_at
            prToAdd.labels = pr.labels?.map(label => label?.name).join(', ')
            const userInfo = await getUserInfo(octokit, pr.user)
            if (userInfo.twitter === null) {
                continue
            }
            prToAdd.user = { ...userInfo }
            list.push(prToAdd)
        }
    }
        return list
    } catch (error) {
        console.log("error listPullRequests", error)        
    }
}

// this verifies that a PR has been merged
async function isMerged(octokit, owner, repo, pr) {
    const merged = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/merge', {
        owner,
        repo,
        pull_number: pr.number
    })
    if (merged.status === 204) {
        return true
    } else {
        return false
    }
}

async function getUserInfo(octokit, user) {
    const resp = await octokit.request('GET /users/{username}', {
        username: user.login
    })
    const { data } = resp;
    return { twitter: data.twitter_username, login: data.login, name: data.name, avatar: data.avatar_url }
}

module.exports = { listPullRequests }

