export const validateIds = (req, res, next) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
            message: "Select at least one user",
        });
    }

    next();
};