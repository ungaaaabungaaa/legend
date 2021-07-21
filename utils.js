const { Octokit } = require("@octokit/core");

async function listPullRequests(params) {
    const {repo, owner} = params;
    const list = []
    console.log(repo,owner)
    const octokit = new Octokit({ auth: process.env.LEGEND_AUTH});
    const resp = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        owner,
        repo,
        per_page: 20,
        state: 'close'
      })
    const { data } = resp;
    for (const pr of data) {
        const prToAdd = {}
        // TODO only check PR that are updated less than 1hour or 5 min
        if (isMerged(octokit, owner, repo, pr)) {
            // console.log(pr)
            prToAdd.title = pr.title
            const userInfo = await getUserInfo(octokit, pr.user)
            if (userInfo.twitter === null) {
                continue
            }
            prToAdd.user = {...userInfo}
            list.push(prToAdd)
        }
    }
    return list
}

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
    return {twitter: data.twitter_username, login: data.login, name: data.name, avatar: data.avatar_url}
}

module.exports = { listPullRequests }

