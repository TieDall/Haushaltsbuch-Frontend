[![Build](https://github.com/TieDall/Haushaltsbuch-Frontend/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/TieDall/Haushaltsbuch-Frontend/actions/workflows/build.yml)

# Getting Started

Every webserver can be used. For example apache on raspberry pi: [here](https://www.raspberrypi.org/documentation/remote-access/web-server/apache.md)

1. Download latest release: [here](https://github.com/TieDall/Haushaltsbuch-Frontend/releases/latest)
2. Add folder "assets".
3. Add file "app-config.json" in folder "assets".
4. Configure backend endpoint in file "app-config.json":
```
{
  "apiServer": {
    "url": "http://localhost:44304/api/"
  }
}
```
