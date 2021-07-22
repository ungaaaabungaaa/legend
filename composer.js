const {
    greetingsEmojiAll,
    greetingsAll,
    conclusionAll
} = require('./message-library/message-content');


// limit: 280 char per twitter message
function createTwitterMessage(params) {
    const { user: { twitter }, prTitle, repo, html_url: htmlUrl } = params;

    let prTitle2 = prTitle.length > 15 ? prTitle.slice(0, 15) + '...' : prTitle;
    const repo2 = repo.replace('https://', '')

    const greetingsEmoji =
        greetingsEmojiAll[Math.floor(Math.random() * greetingsEmojiAll.length)];
    const greetings = greetingsAll[Math.floor(Math.random() * greetingsAll.length)]

    let message = `${greetings} @${twitter} ${greetingsEmoji}, `;

    message += `your pull request "${prTitle2}" has been merged on ${repo2}! `;
    const conclusion = conclusionAll[Math.floor(Math.random() * conclusionAll.length)] + ' ' + htmlUrl + `.`;

    message += conclusion;

    return message
}

module.exports = { createTwitterMessage }