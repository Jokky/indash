FROM node:18-alpine

RUN addgroup --gid 1001 --system nodejs && adduser --system nextjs --uid 1001

COPY --chown=nextjs:nodejs . /var/nextjs/
WORKDIR /var/nextjs/

RUN cp .env .env.local
RUN npm ci
RUN npm run build

USER nextjs

ENTRYPOINT ["npm"]
CMD ["run", "start"]
