import { Response, Request, NextFunction } from "express";

export const validatePostPlayer = (req: Request, res: Response, next: NextFunction) => {
    const { teamId, player } = req.body;
    const { name, age, role } = player;

    if (!teamId || typeof teamId !== "number") {
        return res.status(400).json({ error: "teamId inválido" });
    }

    if (!player || Array.isArray(player)) {
        return res.status(400).json({ error: "player deve ser um objeto, não um array" });
    }

    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "name inválido" });
    }

    if (!age || typeof age !== "number") {
        return res.status(400).json({ error: "age inválido" });
    }

    if (!role || typeof role !== "string") {
        return res.status(400).json({ error: "role inválido" });
    }

    next();
};

export const validatePatchPlayer = (req: Request, res: Response, next: NextFunction) => {
    const player = req.body;
    const { name, age, role } = player;

    if (!player || Array.isArray(player)) {
        return res.status(400).json({ error: "player deve ser um objeto, não um array" });
    }

    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "name inválido" });
    }

    if (!age || typeof age !== "number") {
        return res.status(400).json({ error: "age inválido" });
    }

    if (!role || typeof role !== "string") {
        return res.status(400).json({ error: "role inválido" });
    }

    next();
};