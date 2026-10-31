# Valorant Agent Explorer

A React application for exploring playable Valorant agents, their roles, and their abilities. Users can search the roster, filter agents by role, and open a detailed agent view containing live API information and selected personal strategy tips.

## API

Agent data is fetched from the keyless [Valorant API](https://valorant-api.com/) using its playable agents endpoint.

## Features

- Visible loading skeletons while agent data is requested
- Human-readable error message with a retry button
- Built-in error-state simulator for grading
- Live agent search and role filtering
- Agent details with ability icons and descriptions
- Original strategy notes for Jett, Phoenix, and Omen
- Responsive dark and red interface

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown by Vite in a browser.

## Test the error state

Select **Test API error** near the bottom of the page. The app switches to a deliberately broken endpoint and displays its error interface. Select **Restore live API** to load the agent data again.

## Live site

https://melodious-malabi-9899ac.netlify.app/
