FROM node:alpine

WORKDIR /app
COPY . .

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

EXPOSE 3001
CMD ["npm", "run", "build"]