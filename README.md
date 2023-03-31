# Kendrick News API

## Demo URL

https://be-nc-news-cu7z.onrender.com

## Summary

The is the RESTful API developed for a news service like the Reddit.

With the system, users can post articles under specific topics after registration. Other users can vote or comment on the articles. 

The articles can also be queried by topics, and sorted by popularity or created time etc.   

## Prerequisites

- An unix like operating system, prefers Ubutu, MacOS or Windows 10 with WSL.
- Node JS runtime environment, recommends v19.6.0 or above
- PostgreSQL database, recommends 12.13 or above
- Git command, recommends 2.34.1 or above

## Setup Instructions

1. In your local machine, run `git clone https://github.com/kenchan0824/be-nc-news.git` to download the repository.
2. Run `npm install` to install all the required packages.
3. Run `npm run setup-dbs` to create the testing and development databases.
4. Refer to `.env-example` to create two configuration files, `.env.test` and `.env.developement`, which point to your testing and developement databases.
5. Run `npm run seed` to seed your development databases.
6. Run `npm test` to verify your setups.




