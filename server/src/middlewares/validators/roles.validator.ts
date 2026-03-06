import { celebrate, Joi, Segments } from 'celebrate'

export const createRoleValidator = celebrate({
    [Segments.BODY]: Joi.object({
        name: Joi.string().required(),
        monthly_salary: Joi.number(),
        productive_hours: Joi.number()
    })
})