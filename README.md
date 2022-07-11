# Manage local projects

## Description

Small tool to manage local development projects that use Docker.

## Dependencies

You need to install `jq` to use this tool.

```sh
sudo apt install jq
```

## Install

Run `npm run make` then a `.deb` file will be created in `./out/make` folder.

## Features

A "project" is described by one on many docker-compose files.

- List all projects
- Start / stop any project in one click
- Display status of containers of launched projects
- Add custom scripts to any project
- And more will come

## Technos

- React
- Electron
- Ant Design
- Eslint
- Prettier

## Changelog

### 1.0.0 11/07/22

- List of projects
- Add the creation of a project
- Add delete of project
- Detect the status of a project (launched or not)
- Allow to start a project
- Allow to stop a project
- Allow copy location of project to clipboard
- Edit project
- Add snackbar when actions are done
- Error handling
