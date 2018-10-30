# Collaborate Online Judging System

Online coding tool implements collaborative working, temporary cache storage and online judging system. Uers are able to work with each other together in real time without refreshing the page. The submitted code will be executed through online judging system and return the results back to user. Current working code will be saved to cache storage temporarily if all users exit the session. 

## Getting Started

Follow the stpes in Installing section to setup the environment for development. Some builds is required for the application to function correctly. More information in Build section.

### Prerequisites

This project is worked on ubuntu version 18.04...

### Installing

A step by step series of examples that tell you how to get a development env running

NodeJs
```
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Nodemon (optional)
```
sudo npm install -g nodemon
```

Angular CLI
```
sudo npm install -g @angular/cli@latest
```

Redis
```
wget http://download.redis.io/releases/redis-3.2.6.tar.gz
tar xzf redis-3.2.6.tar.gz
cd redis-3.2.6
make
sudo make install
cd utils
sudo ./install_server.sh
```

Docker
```
curl -fsSL https://get.docker.com/ | sh
sudo usermod -aG docker $(whoami)
sudo systemctl enable docker
```

Nginx (For ubuntu 16.04)
```
cd /etc/apt/
```
Add following two lines into sources.list file
```
deb http://nginx.org/packages/ubuntu/ xnial nginx
deb-src http://nginx.org/packages/ubuntu/ xenial nginx
```
Then run
```
sudo apt-get update
sudo apt-get install nginx
```

Pip3 / Flask
```
sudo apt-get update
sudo apt-get -y install python3-pip
sudo pip3 install Flask
```

Terminator
```
sudo apt-get install terminator
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Currently working on it...

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Docker build required for any changes for executor in Dockfile, use command
```
sudo docker build . -t your_name/project_name
```

## Built With

* [AngularJS](https://angularjs.org/) - The web framework used
* [Docker](https://www.docker.com/) - Backend executor
* [Redis](https://redis.io/) - Used to provide cache storage for user code
* [Nginx](https://www.nginx.com/) - Perform load balancing

## Contributing

...

## Versioning

We use [Git](https://git-scm.com/) for versioning. 

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
