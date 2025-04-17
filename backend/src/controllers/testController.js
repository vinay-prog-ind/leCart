exports.testController = async (req, res, next) => {
    try {

        const PORT = process.env.PORT;
        res.status(200).json({PORT: parseInt(PORT)});
        
        next();
    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: "something went wrong",
        })
    }
}