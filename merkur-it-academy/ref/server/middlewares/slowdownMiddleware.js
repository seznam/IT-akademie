function slowdownMiddleware() {
  return async (req, res, next) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 500 + 200)
    );

    next();
  };
}

module.exports = { slowdownMiddleware };
