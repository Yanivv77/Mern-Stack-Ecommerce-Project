FROM node:12.18.3-alpine AS build
WORKDIR /app 
COPY package.json ./
RUN npm install
COPY . .
RUN npm build

FROM nginx:1.19.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]



# FROM node:12.18.3-alpine
# WORKDIR /app 
# COPY package.json ./
# RUN npm install
# COPY . .
# EXPOSE 3005
# CMD ["npm","start"]

