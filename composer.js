const {
    greetingsEmojiAll,
    greetingsAll,
    conclusionAll
} = require('./message-library/message-content');

// limit: 280 char per twitter message
function createTwitterMessage(params) {
    const { user: { twitter }, prTitle, repo, html_url: htmlUrl, repoTwitter } = params;

    let prTitle2 = prTitle.length > 15 ? prTitle.slice(0, 15) + '...' : prTitle;
    const cleanHtmlUrl = htmlUrl.replace('https://', '')

    const greetingsEmoji =
        greetingsEmojiAll[Math.floor(Math.random() * greetingsEmojiAll.length)];
    const greetings = greetingsAll[Math.floor(Math.random() * greetingsAll.length)]

    let message = `${greetings} @${twitter} ${greetingsEmoji}, `;
    message += `your pull request "${prTitle2}" has been merged on ${repo}! `;

    let conclusion;
    if (cleanHtmlUrl.length < 80)
        conclusion = conclusionAll[Math.floor(Math.random() * conclusionAll.length)] + ' ' + cleanHtmlUrl + ` @${repoTwitter}.`;
    else
        conclusion = conclusionAll[Math.floor(Math.random() * conclusionAll.length)] + ` @${repoTwitter}.`;

    message += conclusion;
    return message
}

module.exports = { createTwitterMessage }