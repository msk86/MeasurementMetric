function start_prod() {
    sudo MM_PORT=80 NODE_ENV=production forever start app.js
}

function restart_prod() {
    sudo forever restartall
}

function start() {
    nodemon app.js
}

function setup() {
    npm install
    ./node_modules/.bin/grunt package
}

function main() {
    setup
    case $1 in
        start_prod) start_prod;;
        restart_prod) restart_prod;;
        *) start;;
    esac
}

main $@
