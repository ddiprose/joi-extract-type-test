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

type extractComplexType = Joi.extractType<typeof jobOperatorRoleSchema>;

export const extractedComplexType: extractComplexType = {
  id: '2015',
  user_id: '102',
  job_id: '52',
  role: <any>'admin'
  //pipeline_rules: [extractedRule]
};

export const extractedComplexType2: extractComplexType = {
  id: '2015',
  user_id: '102',
  job_id: '52',
  role: 'recruiter',
  birth_year: 2000
  //pipeline_rules: [extractedRule]
};

(async () => {
  await Joi.validate(extractedComplexType, jobOperatorRoleSchema)
    .then(res => {
      console.log('valid 1', res);
    }).catch(err => {
      console.log('error 1', err.name, err.message);
    })

  await Joi.validate(extractedComplexType2, jobOperatorRoleSchema)
    .then(res => {
      console.log('valid 2', res);
    }).catch(err => {
      console.log('error 2', err.name, err.message);
    });

})()


