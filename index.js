const owners = require('./repo.json');
const { listPullRequests } = require('./utils');

async function main() {
    for (const owner in owners) {
        const prList = await listPullRequests({owner, repo: owners[owner]})
        console.log(prList)
    }
}

main()