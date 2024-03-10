import jwt from 'jsonwebtoken';

const token = (userId, res) => {
    const generatedToken = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie("jwt", generatedToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: true
    });
}

export default token;