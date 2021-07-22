

function createTwitterMessage(params) {
    const { user: {twitter}, prTitle, repo, html_url, repoTwitter} = params;
    return `Congrats @${twitter}, your pull request "${prTitle}" has been merged on ${repo} of ${repoTwitter} repository! Check it out on ${html_url}`
}

module.exports = { createTwitterMessage }