import type { FastifyInstance } from "fastify";
import z, { email } from "zod";
import type { FastifyTypedInstance } from "./types.js";
import { randomUUID } from 'node:crypto'

interface User {
    id: string
    name: string
    email: string
}

const users: User[] = []

export async function routes(app: FastifyTypedInstance) {
    app.get('/users', {
        schema: {
            tags: ['Users'],
            description: 'list all users',
            response: {
                200: z.array(z.object({
                    id: z.string(),
                    name: z.string(),
                    email: z.string().email(),
        }))
    }
},
    },  () => {
        return users
    })

    app.post('/users', {
        schema: {
            description: 'Create a new user',
            tags: ['Users'],
            body: z.object({
                name: z.string(),
                email: z.string().email(),
            }),
            response: {
                201: z.null().describe('User created'),
        },
    }
    }, async (request, reply) => {
        const { name, email } = request.body

        users.push({
            id: randomUUID(),
            name,
            email,
        })
        return reply.status(201).send(null)
})
}