const token = {
    get: (req, res) => {
        res.send('hey thi sis get')
    },
    post: (req, res) => {
        res.send('hello this is post')
    }
}

const toggle = {
    get: (req, res) => {

    },
    post: (req, res) => {

    },
    remove: (req, res) => {
        
    }
}

const handlers = {
    token,
    toggle

}




module.exports.handlers = handlers