# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

# Quick Start

## Prerequisites

- Install [Node.js](https://nodejs.org/)
- Install [Docker](https://docker.com) and [docker-compose](https://docs.docker.com/compose/), or just install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Start app

1. run `npm install`
2. run `docker-compose up -d`
3. run `npm run dev`
4. Navigate to http://localhost:3000

# Notes

## TypeORM

TypeORM did not integrate smoothly with Next.js and the T3 stack. It ended up being quite a pain trying to get them to play well together, primarily involving trying to initialize the DataSource on server entry (seems trivial, I know).

I ended up discovering an experimental feature of Next.js called `instrumentation`. This allows you to import modules when the server starts up, so I could initialize the DataSource prior to the rest of the application running. Until this there didn't seem to be a straight forward way to achieve this.

## Component Library

I used a component library called Flowbite to help speed up the frontend development process.

Flowbite is built on top of tailwindcss, so implementation on top of the T3 stack was straight forward.

## Automated Testing

I did not focus on automated testing during this assignment. Given it wasn't in the requirements, I decided to focus my time on the quality of my frontend and backend implementation. If I had another day or so to work on this, I would have focused on implementing automated testing as well.

## Responsiveness

I did not focus on making the application mobile friendly. Again, given it wasn't a requirement, I decided to prioritise my time on the desktop implementation of the app.

There are a couple of approaches that could be taken to make the app mobile friendly. My preferred approach would be to implement the changes in the "Alternative Design" section below.

Alternatively I could scroll the table horizontally if the contents of the table doesn't fit inside the screen size. This would be the easier approach.

## Alternative Design

I used a table to list the users in the application UIs so I could save time implementing the feature. My preferred approach would be to build a custom UI which utilised contrast and text hierarchy to prioritise information and save space. This would also result in a more mobile friendly layout.

## Update User

I planned to also add the ability to update a user as well but didn't get round to doing that.

My plan was to re-use most of the `NewUserModal` logic to achieve this. The logic that makes the api request and some copy information would be extracted into a parent component and passed down as props. The rest of the code will stay in a shared child component called `UserModal` and used by another parent component called `UpdateUserModal`.

# Project Information

## Tech Required

- Node.js
- tRPC
- Typescript
- TypeORM

## Tech Used

- T3 Stack
  - Next.js (**Node.js**)
  - **tRPC**
  - **React**
  - **Typescript**
  - Tailwind.css
- PostgreSQL
- **TypeORM**
- Docker
- [Flowbite](https://www.flowbite-react.com/)

## Functionality

- User management application
  - List users
    - First name
    - Last name
    - Email address
    - Favourite food
  - Add users
  - Delete users

## Process

1. Install dependencies ✅
   - Create new T3 app ✅
   - Install TypeORM ✅
   - Install `docker` ✅
2. Configure database ✅
   - Configure `docker-compose` ✅
   - Create database ✅
   - Create user table ✅
3. Create backend ✅
   - Get a user ✅
   - Get all users ✅
   - Create a user ✅
   - Update a user ✅
   - Delete a user ✅
4. Create frontend ✅
   - List all users ✅
   - Add a new user ✅
   - Delete a user ✅
   - Update a user ❌
