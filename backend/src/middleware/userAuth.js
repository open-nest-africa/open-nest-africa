const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized Access: Kindly login'});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(decodedToken.id) {
            req.user = { id: decodedToken.id };
        }else{
            return res.status(401).json({ message: 'Unauthorized Access: Kindly login'})
        }
        next();
    } catch (error) {
        console.error('Auth Error:', error);
        res.status(401).json({ message: 'Unauthorized: Token invalid or expired' });
    }
}

module.exports = { userAuth, };