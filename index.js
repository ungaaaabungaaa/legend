const owners = require('./repo.json');
const { listPullRequests } = require('./utils');
const { createTwitterMessage } = require('./composer')

const prList = [
  {
    prTitle: 'chore(i18n,curriculum): processed translations',
    html_url: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/42957',
    merged_at: '2021-07-21T15:23:20Z',
    labels: 'crowdin-sync,scope: curriculum,scope: i18n',
    user: {
      twitter: 'freeCodeCamp',
      login: 'camperbot',
      name: 'camperbot',
      avatar: 'https://avatars.githubusercontent.com/u/13561988?v=4'
    }
  },
  {
    prTitle: 'chore(i18n,curriculum): processed translations',
    html_url: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/42943',
    merged_at: '2021-07-20T16:05:24Z',
    labels: 'crowdin-sync,scope: curriculum,scope: i18n',
    user: {
      twitter: 'freeCodeCamp',
      login: 'camperbot',
      name: 'camperbot',
      avatar: 'https://avatars.githubusercontent.com/u/13561988?v=4'
    }
  }
]

async function main() {
  for (const owner in owners) {
    const prList = await listPullRequests({ owner, repo: owners[owner] })
    for (const pr of prList) {
      const message = createTwitterMessage({ ...pr, repo: owners[owner] })
      console.log("🐦", message)
      // TODO tweet message
    }
  }

}

main()

