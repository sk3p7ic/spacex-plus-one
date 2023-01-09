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

## Project Structure

```
.
├── public              -- Any public files.
└── src
    ├── assets
    │   └── img         -- Image assets.
    ├── components      -- All components.
    │   ├── Home        -- Components on the home page.
    │   └── Search      -- Components on the search page.
    ├── lib
    │   └── searches    -- Files containing search queries and their utilities.
    └── pages           -- Contains the main application pages.
```

Please note that I prefixed files that served a more utilitarian purpose, namely `_Layout.tsx` and `_404.tsx` with an underscore to more easily identify those files and their purpose in the file tree.
