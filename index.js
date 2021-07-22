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
    // if (!resp?.created_at) {
    //   console.log("🔴 error tweeting:'", status, "'");
    // }
  }
}

async function main() {
  for (const owner in owners) {
    const repo = owners[owner].repo;
    const repoTwitter = owners[owner].twitter;
    // const prList = await listPullRequests({ owner, repo });
    const prList = [
      {
        prTitle: 'chore(i18n,curriculum): processed translations',
        html_url: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/42957',
        merged_at: '2021-07-21T15:23:20Z',
        labels: 'crowdin-sync, scope: curriculum, scope: i18n',
        user: {
          twitter: 'freeCodeCamp',
          login: 'camperbot',
          name: 'camperbot',
          avatar: 'https://avatars.githubusercontent.com/u/13561988?v=4'
        }
      },
      {
        prTitle: 'chore(i18n,client): processed translations',
        html_url: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/42956',
        merged_at: '2021-07-21T15:30:16Z',
        labels: 'crowdin-sync, platform: client, scope: UI, scope: i18n',
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
        labels: 'crowdin-sync, scope: curriculum, scope: i18n',
        user: {
          twitter: 'freeCodeCamp',
          login: 'camperbot',
          name: 'camperbot',
          avatar: 'https://avatars.githubusercontent.com/u/13561988?v=4'
        }
      },
      {
        prTitle: 'chore(i18n,docs): processed translations',
        html_url: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/42942',
        merged_at: '2021-07-20T16:05:52Z',
        labels: 'crowdin-sync, scope: docs, scope: i18n',
        user: {
          twitter: 'freeCodeCamp',
          login: 'camperbot',
          name: 'camperbot',
          avatar: 'https://avatars.githubusercontent.com/u/13561988?v=4'
        }
      },
      {
        prTitle: 'i18n: adding first few motivational quotes and compliments in italian',
        html_url: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/42935',
        merged_at: '2021-07-20T02:50:47Z',
        labels: 'platform: client, scope: i18n',
        user: {
          twitter: 'ieahleen',
          login: 'ieahleen',
          name: 'Ilenia',
          avatar: 'https://avatars.githubusercontent.com/u/26656284?v=4'
        }
      },
      {
        prTitle: 'enable last 4 Italian certs',
        html_url: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/42931',
        merged_at: '2021-07-20T09:13:22Z',
        labels: 'scope: i18n, status: waiting review',
        user: {
          twitter: 'ieahleen',
          login: 'ieahleen',
          name: 'Ilenia',
          avatar: 'https://avatars.githubusercontent.com/u/26656284?v=4'
        }
      },
      {
        prTitle: 'chore(i18n,curriculum): processed translations',
        html_url: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/42930',
        merged_at: '2021-07-19T16:52:21Z',
        labels: 'crowdin-sync, scope: curriculum, scope: i18n',
        user: {
          twitter: 'freeCodeCamp',
          login: 'camperbot',
          name: 'camperbot',
          avatar: 'https://avatars.githubusercontent.com/u/13561988?v=4'
        }
      },
      {
        prTitle: 'chore(i18n,client): processed translations',
        html_url: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/42929',
        merged_at: '2021-07-19T14:23:54Z',
        labels: 'crowdin-sync, platform: client, scope: UI, scope: i18n',
        user: {
          twitter: 'freeCodeCamp',
          login: 'camperbot',
          name: 'camperbot',
          avatar: 'https://avatars.githubusercontent.com/u/13561988?v=4'
        }
      },
      {
        prTitle: 'chore(i18n,curriculum): processed translations',
        html_url: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/42918',
        merged_at: '2021-07-19T10:35:37Z',
        labels: 'crowdin-sync, scope: curriculum, scope: i18n',
        user: {
          twitter: 'freeCodeCamp',
          login: 'camperbot',
          name: 'camperbot',
          avatar: 'https://avatars.githubusercontent.com/u/13561988?v=4'
        }
      },
      {
        prTitle: 'chore(i18n,client): processed translations',
        html_url: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/42917',
        merged_at: '2021-07-19T05:20:07Z',
        labels: 'crowdin-sync, platform: client, scope: UI, scope: i18n',
        user: {
          twitter: 'freeCodeCamp',
          login: 'camperbot',
          name: 'camperbot',
          avatar: 'https://avatars.githubusercontent.com/u/13561988?v=4'
        }
      },
      {
        prTitle: 'chore(i18n,docs): processed translations',
        html_url: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/42916',
        merged_at: '2021-07-19T06:08:01Z',
        labels: 'crowdin-sync, scope: docs, scope: i18n',
        user: {
          twitter: 'freeCodeCamp',
          login: 'camperbot',
          name: 'camperbot',
          avatar: 'https://avatars.githubusercontent.com/u/13561988?v=4'
        }
      },
      {
        prTitle: 'feat(por): enable first two certifications',
        html_url: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/42859',
        merged_at: '2021-07-19T05:27:23Z',
        labels: 'scope: i18n',
        user: {
          twitter: 'raisedadead',
          login: 'raisedadead',
          name: 'Mrugesh Mohapatra',
          avatar: 'https://avatars.githubusercontent.com/u/1884376?v=4'
        }
      }
    ]
    tweetToPrList({ prList, repo, repoTwitter });
  }
}

main();
