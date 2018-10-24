#!/bin/bash
# A sample Bash script, by Ryan

echo "Hello, $USER. Thank you for visiting my application!"
echo "But first, we need to do a quick preparation!"

# build client
pushd $HOME/week3/CS503-1805_Xiao-Peng/oj-client
ng build
popd

# define the location of executor
export MY_NODE_APP_EXECUTOR=$HOME/week3/CS503-1805_Xiao-Peng/executor

# define the location of node server
export MY_NODE_APP_SERVER=$HOME/week3/CS503-1805_Xiao-Peng/oj-server

# start services
node $MY_NODE_APP_SERVER/server.js & python3 $MY_NODE_APP_EXECUTOR/executor_server.py &

# start redis server
pushd $HOME/redis-3.2.6
redis-server --port 6380
popd
