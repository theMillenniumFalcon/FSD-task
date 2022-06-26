# Food Recipe App

## Stack

- [Next.js](https://nextjs.org/) - A React framework with hybrid static & server rendering, and route pre-fetching, etc.
- [Node.js](https://nodejs.org/en/) - A back-end Javascript runtime environment to executes JavaScript code outside a web browser.
- [MongoDB](https://www.mongodb.com/) - A document-oriented database program.
- [Chakra UI](https://chakra-ui.com/) - A simple, modular and accessible component library for React.
- [Framer Motion](https://www.framer.com/motion/) - An animation library for React.
### Start the database

Make sure Docker is installed, and that the Docker daemon is running. Then, run the following command to start an ephemeral database in the background:

```
docker run -dp 6379:6379 --name playground-db redis:latest
```

## Config / Secrets environment variables

Copy `.env.example` from the server folder to `.env` and add your private information

*Note: never commit this file, it should be ignored by Git*

```
PORT=
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRE=
```

## Installation

```bash
https://github.com/theMillenniumFalcon/FSD-task
```

```bash
cd client
npm install
```

```bash
cd server
npm install
```

## Running the app

### For client
```bash
# development
npm run dev
```

### For server
```bash
# development
npm run dev
```

## Project Structure

### server
    .
    ├── dist                    # Compiled javascript files
    ├── src                     # Source files
    └── ...

### client
    .
    ├── generated               # Typescript hooks generated using graphQL
    ├── graphql                 # GraphQL files
    ├── pages                   # nextJS pages
    ├── public                  # assets
    └── ...

### server src Structure

    .
    ├── ...
    ├── src
    │   ├── ...
    │   ├── entities            # Entities for database tables
    │   ├── migrations          # TypeORM migrations
    |   ├── index.ts            # Starting point
    │   └── ...
    └── ...

### I have another question!

Feel free to ask me on [Twitter](https://twitter.com/nishankstwt)! You can also email us at nishankpr435@gmail.com.
