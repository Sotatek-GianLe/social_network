FROM node:lts as development
WORKDIR /social_network
COPY package*.json ./
COPY pages ./pages
RUN npm install --frozen-lockfile

FROM node:lts as builder
WORKDIR /social_network
COPY . .
COPY --from=development /social_network/node_modules ./node_modules
RUN npm build

FROM node:lts as runner
WORKDIR /social_network
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /social_network/next.config.js ./
COPY --from=builder /social_network/public ./public
COPY --from=builder /social_network/.next ./.next
COPY --from=builder /social_network/node_modules ./node_modules
COPY --from=builder /social_network/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]