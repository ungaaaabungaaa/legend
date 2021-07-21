

function createTwitterMessage(params) {
    const { user: {twitter}, prTitle, repo, html_url} = params;
    return `Congrats @${twitter}, your pull request "${prTitle}" has been merged on ${repo} repository! Check it out on ${html_url}`
}

module.exports = { createTwitterMessage }