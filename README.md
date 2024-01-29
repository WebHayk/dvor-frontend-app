## ✅ How run project (local)

1. Run to install dependencies
### `npm install`

2. Run to start application (upping local server)

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## ✅ Technology stack
We use **Next.js** and **Typescript**. To implement the functionality, a number of libraries were used. <br />

### **Production main dependencies**

🔵 **Axios** - a simple promise based HTTP client for networking. <br />
🔵 **Redux** - the Redux package is intended to be the standard way to write Redux logic. Used for store of application. <br />
🔵 **Next Redux Wrapper** - a HOC that brings Next.js and Redux together. <br />
🔵 **React Redux** - official React bindings for Redux.<br />
🔵 **GraphQL** - query language for APIs and a runtime for fulfilling those queries with your existing data.<br />
🔵 **Apollo Client** - comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.<br />
🔵 **Leaflet** -  JavaScript library for mobile-friendly interactive maps<br />

### **Development dependencies**

🔵 **SASS** - professional grade CSS extension language. <br />

## ✅ Architecture

We use simple architecture with isolated components. Below are the main directories.
## ✅ Deployment and other features

Configured **CI/CD** with pipelines in **Gitlab**. For this in root of frontend app was created **.gitlab-ci.yml** with main configuration.
We use **Docker** for deployment from project to **Vercel**.
Created **Dockerfile** and **docker-compose.yml** files.




