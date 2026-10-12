import joi from "joi";

const userSchema = joi.object({
    username: joi.string().min(1).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().valid('operator', 'admin', 'user')
})

const validateInput = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if(error) return res.status(400).json({
        "status": 400,
        "message": error.details[0].message
    })

    next();
}

export default validateInput;
