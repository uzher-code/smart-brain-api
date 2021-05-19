# SmartBrain Project - Backend api <!-- omit in toc -->

**_Table of Contents:_**

- [Preview](#preview)
- [About](#about)
- [Authors](#authors)
- [Setup Guide](#setup-guide)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)

# Preview

This project is currently live on [heroku](https://smart-brain-facedetector.herokuapp.com/)


# About

SmartBrain: An online web app to detect faces in images using clarify api. This is only the back end repo. To see the frontend code, please check the [Smart Brain repo](https://github.com/uzher-code/smart-brain)

**Tech Stack**

PERN (PostgreSQL, Express, React, Node) - (Backend + Frontend)

|      Frontend Highlights       |
| :-------------------------: |
|            Node            |
|         Express            |
|            JWT             |
|         PostgreSQL         |
|            Redis           |
|           Docker           |


# Authors

Built by [Umer](https://github.com/uzher-code)

# Setup Guide

## Prerequisites

In order to run this project locally you **must** have [node.js](https://nodejs.org/en/) installed.

This project was built on the following node version.

```bash
$ node --version
v14.16.0
```


## Getting Started

```bash
git clone https://github.com/uzher-code/smart-brain-api.git
```

The build command only needs to be run once to make sure all dependencies are installed (npm install)
```bash
docker-compose build
```

```bash
docker-compose up
```

Alternatively you can use
```bash
docker-compose up --build
```
Again you can omit the --build after successfully building the containers once


To bring down the container
```bash
docker-compose down
```
