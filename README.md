# MERN-AUTH
A simple Node.js project that have the functionality to google signin, logout, and have the capability to check protected api calls.

# STEPS
1. `docker compose -d up`
2. `touch .env`
3. `nano .env`
4. paste the ff.
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    BASE_URL=
    JWT_SECRET_KEY=
    SESSION_SECRET_KEY=
    SESSION_COOKIE_NAME=
    SESSION_EXPIRY_MAX_AGE=
    MONGODB_URL=
    MONGODB_DB=
    MONGODB_AUTO_INDEX=
    JWT_EXPIRES_IN=
6. `npm install`
7. `npm run:dev`
