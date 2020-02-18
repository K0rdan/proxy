# Proxy

## Description

CLI to enable or disable proxy configuration on the system, based on specific client configuration (ie : Carrefour, ...)

## Install

`yarn link`

## Usage

- First create a `.env` file and fill it with this template :

```
[PROJECT]_AUTOMATIC_CONF_URL=<url>
[PROJECT]_PROXY_HOST=<ip | host>
[PROJECT]_PROXY_PORT=<port number>
[PROJECT]_PROXY_USER=<user>
[PROJECT]_PROXY_PASS=<password>

```

- Then use `proxy set [PROJECT]` to setup all your applications based the `PROJECT` parameter.

## Application proxified

- [✔️] System's Proxy
- [✖️] Git
- [✖️] NPM
- [✖️] Yarn
- [✖️] Docker
- [✖️] Spotify

## System Proxy

- MacOS :
  > Setup the system's proxy with the networksetup commands.
