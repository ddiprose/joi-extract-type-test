import * as Joi from '@hapi/joi';
import 'joi-extract-type';

export const jobOperatorRoleSchema = Joi.object({
  id: Joi.string().required(),
  user_id: Joi.string().required(),
  job_id: Joi.string().required(),
  role: Joi.string().valid([ 'recruiter', 'requester' ]),
  birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013).disallow(2000)
  //pipeline_rules: Joi.array().items(rule),
});

export type JobOperatorRole = Joi.extractType<typeof jobOperatorRoleSchema>;
