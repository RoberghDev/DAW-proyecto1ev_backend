module.exports = {
    info: (...messages) => {
        if (process.env.NODE_ENV !== "test") {
            console.info("[INFO]", ...messages);
        }
    },
    error: (...messages) => {
        if (process.env.NODE_ENV !== "test") {
            console.error("[ERROR]", ...messages);
        }
    }
};