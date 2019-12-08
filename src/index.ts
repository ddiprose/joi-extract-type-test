import * as Joi from '@hapi/joi';
import { jobOperatorRoleSchema, JobOperatorRole } from "./models";

export const jobOperator1: JobOperatorRole = {
  id: '2015',
  user_id: '102',
  job_id: '52',
  role: <any>'admin'
  //pipeline_rules: [extractedRule]
};

export const jobOperator2: JobOperatorRole = {
  id: '2015',
  user_id: '102',
  job_id: '52',
  role: 'recruiter',
  birth_year: 2000
  //pipeline_rules: [extractedRule]
};

(async () => {
  await Joi.validate(jobOperator1, jobOperatorRoleSchema)
    .then(res => {
      console.log('valid 1', res);
    }).catch(err => {
      console.log('error 1', err.name, err.message);
    })

  await Joi.validate(jobOperator2, jobOperatorRoleSchema)
    .then(res => {
      console.log('valid 2', res);
    }).catch(err => {
      console.log('error 2', err.name, err.message);
    });

})();

const koa = require('koa')
const app = new koa()
app.use(require('./routes').middleware())
app.listen(5566, () => {
  console.log('API docs url: http://localhost:5566/apiDocs')
})


