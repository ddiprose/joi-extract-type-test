import { jobOperatorRoleSchema, JobOperatorRole } from "./models"

const { SwaggerAPI } = require('koa-joi-router-docs')
const Router = require('koa-joi-router')
const Joi = Router.Joi

/**
 * Define routes
 */
const router = Router()

// Get /user/:_id
router.get('/user/:_id', {
  meta: {
    swagger: {
      summary: 'Get User Info',
      description: `Note: \nSensitive data can only be viewed by the \`corresponding user\` or \`Admin\`.`,
      tags: ['users']
    }
  },
  validate: {
    params: {
      _id: Joi.string().alphanum().max(24).example('abcdefg').description('User id').required()
    },
    output: {
      '200-299': {
        body: Joi.object({
          userId: Joi.string().description('User id')
        }).options({
          allowUnknown: true
        }).description('User object')
      },
      500: {
        body: Joi.object({
          message: Joi.string().description('error message')
        }).description('error body')
      }
    }
  },
  handler: async ctx => {
    console.log('getUser...')
    ctx.body = {
      userId: ctx.params._id
    }
  }
})

// POST /signup
router.post('/signup', {
  meta: {
    swagger: {
      summary: 'User Signup',
      description: 'Signup with username and password.',
      tags: ['users']
    }
  },
  validate: {
    type: 'json',
    body: Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().alphanum().min(6).max(30).required()
    }).example({username: 'abcdefg', password: '123123'}),
    output: {
      200: {
        body: {
          userId: Joi.string().description('Newly created user id')
        }
      },
      500: {
        body: {
          code: Joi.number().description('error code'),
        }
      }
    }
  },
  handler: async ctx => {
    ctx.body = {
      userId: ctx.body.username
    }
  }
})

router.post('/test', {
  meta: {
    swagger: {
      summary: 'Test Post',
      description: 'Test post.',
      tags: ['test']
    }
  },
  validate: {
    type: 'json',
    body: jobOperatorRoleSchema,
    output: {
      200: {
        body: {
          foo: Joi.number().description('birth year')
        }
      },
      500: {
        body: {
          code: Joi.number().description('error code'),
        }
      }
    }
  },
  handler: async ctx => {
    const jobOperator: JobOperatorRole = ctx.request.body;

    // console.log(ctx.request.body);
    // console.log(await Joi.validate(jobOperator));
    ctx.body = {
      foo: jobOperator.birth_year
    };

  }
})

/**
 * Generate Swagger json from the router object
 */
const generator = new SwaggerAPI()
generator.addJoiRouter(router)

const spec = generator.generateSpec({
  info: {
    title: 'Example API',
    description: 'API for creating and editing examples.',
    version: '1.1'
  },
  basePath: '/',
  tags: [{
    name: 'users',
    description: `A User represents a person who can login 
      and take actions subject to their granted permissions.`
  }],
}, { 
  defaultResponses: {
    200: {
      description: 'OK'
    },
    500: {
      description: 'ERROR'
    }
  } // Custom default responses if you don't like default 200
})

/**
 * Swagger JSON API
 */
router.get('/_api.json', async ctx => {
  ctx.body = JSON.stringify(spec, null, '  ')
})

/**
 * API documentation
 */
router.get('/apiDocs', async ctx => {
  ctx.body = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Example API</title>
  </head>
  <body>
    <redoc spec-url='/_api.json' lazy-rendering></redoc>
    <script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"></script>
  </body>
  </html>
  `
})

router.get('/docs', async ctx => {
  //https://github.com/sunnyagarwal008/setup-swagger-ui-in-one-page/blob/master/swagger-ui.html
  ctx.body = `
  <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <title>ServiceDesk Service Swagger</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@3.12.1/swagger-ui.css">


</head>
<body>

<div id="swagger-ui"></div>

<script src="https://unpkg.com/swagger-ui-dist@3.12.1/swagger-ui-standalone-preset.js"></script>
<script src="https://unpkg.com/swagger-ui-dist@3.12.1/swagger-ui-bundle.js"></script>

<script>
    window.onload = function() {
        // Build a system
        const ui = SwaggerUIBundle({
            url: "/_api.json",
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
            ],
            plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout",
        })
        window.ui = ui
    }
</script>
</body>
</html>
  `;

  // ctx.body = `
  // <div id="swagger-ui"></div>
  // <script src="//unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
  // <!-- SwaggerUIBundle is now available on the page -->
  // <script>
  // const ui = SwaggerUIBundle({
  //   url: "/_api.json",
  //   dom_id: '#swagger-ui',
  //   presets: [
  //     SwaggerUIBundle.presets.apis,
  //     SwaggerUIBundle.SwaggerUIStandalonePreset
  //   ],
  //   layout: "StandaloneLayout"
  // })
  // </script>
  // `;
})

module.exports = router