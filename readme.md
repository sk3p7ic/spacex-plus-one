# SpaceX Plus One<br />A Project for Plus One Robotics

This project uses the GraphQL API available at [https://api.spacex.land/graphql/](https://api.spacex.land/graphql/) to allow the user to view basic information about launches happening at SpaceX.

## Tech Stack

This project uses [React](https://reactjs.org/) for the frontend and [Vite](https://vitejs.dev/) for the build compiler. In addition to these are the following:

- [Mantine](https://mantine.dev/) - A fully-featured React component library used for easy and concise styling.
- [Apollo](https://www.apollographql.com/docs/) - Used for interacting with the GraphQL backend.
- [React-Countup](https://www.npmjs.com/package/react-countup) - Used to more easily have numbers that count up over a set interval.
- [React-Router-Dom](https://www.npmjs.com/package/react-router-dom) - Used for routing different pages in this single-page application.

## Running the Project

To get this project running, first clone this repo:

```sh
git clone https://github.com/sk3p7ic/spacex-plus-one.git
cd spacex-plus-one/
```

Then install the dependencies:

```sh
npm i
```

If everything installs correctly, you should now be able to run the development server with:

```sh
npm run dev
```
