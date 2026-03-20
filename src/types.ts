import type { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerBase, RawServerDefault } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export type FastifyTypedInstance = FastifyInstance<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
FastifyBaseLogger,
ZodTypeProvider
>