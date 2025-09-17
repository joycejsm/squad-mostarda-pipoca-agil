import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

    //obter o token do cabeçalho de autorização

    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({error: "Token não fornecido."});
    }

    //cabeçalho no fromato bearer token
const token = authHeader.split(" ")[1];
if(!token) {
    return res.status(401).json({error: "Formato de token inválido."})
}

try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();

} catch (err) {
    return res.status(401).json({error: "Token inválido ou expirado."})
    
}

}

export default authMiddleware;


