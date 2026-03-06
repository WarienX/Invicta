import { celebrate, Joi, Segments } from "celebrate";

export const getTimeEntriesValidator = celebrate({
    [Segments.QUERY]: {
        clientId: Joi.number().optional(),
        month: Joi.string().optional()
    }
})

export const addTimeEntryValidator = celebrate({
    [Segments.BODY]: Joi.object({
        clientId: Joi.number().required(),
        role_id: Joi.number().required(),
        total_hours: Joi.number().required(),
        entry_date: Joi.string().required()
    })
})