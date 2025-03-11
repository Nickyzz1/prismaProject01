// const jwt = require("jsonwebtoken");

// const verificarToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) return res.status(401).json({ mensagem: "Token não encontrado" });

//   const token = authHeader.split(" ")[1]; // Remove "Bearer" do token

//   jwt.verify(token, "seu_segredo", (err, decoded) => {
//     if (err) return res.status(403).json({ mensagem: "Token inválido" });

//     req.user = decoded; // Armazena os dados do usuário na requisição
//     next();
//   });
// };

// // Exemplo de rota protegida
// app.get("/perfil", verificarToken, (req, res) => {
//   res.json({ usuario: req.user });
// });
