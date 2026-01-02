import { z } from "zod";

export const LinkType = z.object({
    link:z.string().url(),
    password:z.string().nullable().default(null),
    encrypted:z.boolean().default(false),
    dateAndTime:z.string().nullable().default(null)
})
