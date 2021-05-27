[![CI](https://github.com/TieDall/Haushaltsbuch-Frontend/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/TieDall/Haushaltsbuch-Frontend/actions/workflows/ci.yml)
[![CI](https://github.com/TieDall/Haushaltsbuch-Frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/TieDall/Haushaltsbuch-Frontend/actions/workflows/ci.yml)

# Getting Started

## Installation
1. Install NodeJS
```
sudo apt-get install -y nodejs
```
2. Install NPM 
```
sudo apt-get install -g @angular/cli
```
3. Install Angular
```
sudo npm install -g @angular/cli
```

## Clone Repo
1. Clone Repository
2. Configure Backend-Server
Edit file: 
```
src/assets/app-config.json
```

## Configure App to run at startup
1. Open /etc/rc.local
```
sudo nano /etc/rc.local
```
2. Append file before exit 0:
```
su pi -c 'cd [path to cloned project] && sudo ng s --host 0.0.0.0 --port 80 --disable-host-check &'
```

## Validate installation
Now you should be able to reach the web app using your pi´s ip adress.

## Besonderheiten
Der Pi scheint nicht ausreichend Leistung zu haben, um einen Build der Anwendung durchführen zu können. Daher der Workaround mit dem ng serve. 
Die Anwendung sollte so nicht im Internet betrieben werden. Gründe dafür sind neben keiner implementierten Authentifizierung:
* ng serve ist nicht für den sicheren produktiven Einsatz vorgesehen
* der Parameter --disable-host-check ermöglicht es, dass über die Fritzbox dem Pi ein Namen gegeben werden kann über den das Haushaltsbuch aufgerufen werden kann. Sicherheitstechnisch ist das jedoch nicht empfohlen.
