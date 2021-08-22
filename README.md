# DnDTome
This is an open source project written in react/typescript for managing once collection of homebrew.
The project itself is a [PWA](https://web.dev/progressive-web-apps/) and was made primarily to learn said technologies.

## Setup
Check out the latest version and use `yarn start` to run the project locally.
Or use `yarn deploy` to deploy the app to your server specified in the package.json.

## How does it work
Since this app is an offline first PWA it can be distributed via github pages. It is a static webpage that runs in the browser of the user and has no server running in the background it is talking to. Just checking if the version inside the browser cache is the newest.
