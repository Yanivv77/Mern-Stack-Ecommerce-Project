FROM node:12.18.3-alpine
WORKDIR /app 
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5005
CMD ["npm","start"]
