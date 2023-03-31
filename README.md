# Kendrick News API

## Live Demo

https://be-nc-news-cu7z.onrender.com/api

## Summary

The is a RESTful API developed for news services like the Reddit.

With the system, users can post articles under specific topics after registration. Other users can vote or comment on the articles. 

The articles can also be queried by topics, and sorted by popularity or created time etc.   

## Prerequisites

- An Unix-like console, recommend Ubuntu 22.04, MacOS 13.3 or Windows 10 with WSL.
- Node.js runtime environment, recommend 19.6.0 or above.
- PostgreSQL database, recommend 12.13 or above.
- Git command, recommend 2.34.1 or above.

## Setup Instructions

1. Run `git clone https://github.com/kenchan0824/be-nc-news.git` in your local machine to download the repository.
2. Run `npm install` to install all the required packages.
3. Run `npm run setup-dbs` to create the testing and development databases on you local PostgreSQL sever.
4. Refer to `.env-example` to create two configuration files, `.env.test` and `.env.developement`, which point to your testing and developement databases.
5. Run `npm run seed` to dump initial data to your development databases.
6. Finally, run `npm test` to verify your setups.
