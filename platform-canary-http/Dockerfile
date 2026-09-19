FROM node:22-alpine@sha256:b6f26b36c8ff49624cfdac716b8ea1138d606df02586a77d364bb5536a634f85
WORKDIR /app
COPY package.json server.mjs ./
USER node
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.mjs"]
