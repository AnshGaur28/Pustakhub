FROM node:18 

WORKDIR /app

COPY package*.json .
RUN npm install

COPY src /app/src
EXPOSE 80

CMD ["npm" , "start"]
