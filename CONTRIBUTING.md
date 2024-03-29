<h2 style="color:red" align="center"> Contributing </h3>

### What you will need:

1.  Download and install [Node.js](https://nodejs.org) 12.15.\*
    -   Use [n](https://github.com/tj/n) or [nvm](https://github.com/creationix/nvm) or if you need to have different versions of Node.js

### Technologies:

#### Main

-   [React](https://facebook.github.io/react/) - A JavaScript library for building user interfaces

#### How to contribute

1.  Create a new branch (fork for external project users)
2.  Do the necessary developments
3.  Update the branch from master (if needed)
4.  Use [Conventional Commits](https://conventionalcommits.org/), squashing them when necessary (avoid send to master commit messages like `Fix bug`, `Resolve discussion`, `Add test`...)
5.  Open a merge request to master
    1. Make sure it contains WIP, so it will not execute some pipeline steps (unless the label **Run all tests** is used). It enables a more efficient use of resources and reduces the build time
    2. Your merge request title should start with the JIRA ticket ID. e.g. `ISSUE-123: My amazing new feature`
6.  Ask for code reviews
7.  Ask for to master/owner do merge manually (Pipelines and CI are being building)

**Note:** If you want to make "boxing" even better by suggesting features or implementing them, all you need to do is open a [issue](https://github.com/marceloF5/boxing/issues) and contribute.
