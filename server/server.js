exports.run = (io, game) => {
    io.on('connection', socket => {
        const socketAddress = socket.client.conn.remoteAddress;
        console.log('New Connection: ', socketAddress);

        socket.on('add user', username => {
            const data = {
                username,
                address: socketAddress
            };

            const response = game.addUser(data);

            if (response.ok) {
                console.log(response.msg);

                socket.emit('login', {
                    numUsers: game.getNumOfUsers()
                });

                socket.broadcast.emit('user joined', {
                    username,
                    numUsers: game.getNumOfUsers()
                });
            } else {
                socket.emit('retry login', {
                    msg: response.msg
                });
            }
        });
    });
}