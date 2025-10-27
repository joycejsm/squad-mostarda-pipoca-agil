import jwt from "jsonwebtoken";

const tempAuthMiddleware = (req, res, next) => {
    //obter o token do cookie, não do cabeçalho

    const token = req.cookies.tempAuthToken;

    if(!token) {

        return res.status(401).json({error: "Token de registro não fornecido. Por favor reinicie o cadastro."})
    }

     try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.userId = decoded.userId;

            next();
        } catch (error) {

            return res.status(401).json({error: "Sessão de registro expirado ou token inválido. Por favor, reinicie o cadastro."})
            
        }
}

export default tempAuthMiddleware;