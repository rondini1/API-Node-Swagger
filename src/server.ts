import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { routes } from './routes.js'
import { ZodType } from 'zod'

const app = Fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

await app.register(fastifyCors, { origin: '*' })

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'API Node Swagger',
            version: '1.0.0',
        },
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    },
)

app.register(routes)

await app.listen({ port: 3000 }).then(() => {
  console.log('Servidor rodando na porta 3000')
})