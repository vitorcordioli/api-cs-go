import { Response, Request, NextFunction } from "express";

export const validatePostClub = (req: Request, res: Response, next: NextFunction) => {
    const { team, players } = req.body;

    if (!team || typeof team !== "string") {
        return res.status(400).json({ error: "team inválido" });
    };

    if (!players || !Array.isArray(players) || players.length === 0) {
        return res.status(400).json({ error: "players deve ser um array não vazio" });
    };

    for (const player of players) {
        const { name, age, role } = player;
        if (!name || typeof name !== "string") {
            return res.status(400).json({ error: "name inválido" });
        }
        if (!age || typeof age !== "number") {
            return res.status(400).json({ error: "age inválido" });
        }
        if (!role || typeof role !== "string") {
            return res.status(400).json({ error: "role inválido" });
        }
    };
    next();
};