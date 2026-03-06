import { celebrate, Joi, Segments } from "celebrate";

export const createClientValidator = celebrate({
    [Segments.BODY]: Joi.object({
        name: Joi.string().required()
    })
})

export const setClientMonthlyRevenueValidator = celebrate({
    [Segments.BODY]: Joi.object({
        client_id: Joi.number().required(),
        month: Joi.number().required(),
        year: Joi.number().required(),
        revenue: Joi.number().required(),
        estimated_hours: Joi.number().optional(),
    })
})

export const getClientProfitsValidator = celebrate({
    [Segments.BODY]: Joi.object({
        yearMonth: Joi.string().required()
    })
})