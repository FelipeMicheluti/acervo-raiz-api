export const validate = (schemas = {}) => (resquest, _response, next) => {
    try{
       if (schemas.body) {
      resquest.body = schemas.body.parse(resquest.body);
    }

    if (schemas.query) {
      const validated = schemas.query.parse(resquest.query);
    
      Object.defineProperty(resquest, 'query', {
        value: validated,
        writable: true,
        configurable: true,
        enumerable: true
      });
    }
    if (schemas.params) {
      const validated = schemas.params.parse(resquest.params);
    
      Object.defineProperty(resquest, 'params', {
        value: validated,
        writable: true,
        configurable: true,
        enumerable: true
      });
    }

        return next();
    } catch (error) {

      console.log({ error })
    const issues = error?.issues?.map(i => ({
      path: i.path,
      message: i.message
    })) ?? null;

    return next({
      message: 'Validation error',
      status: 400,
      code: 'BAD_REQUEST',
      details: issues
    });
  }
};