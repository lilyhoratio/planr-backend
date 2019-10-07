FROM node:lts-alpine
# 
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app 
# change owner recursively for everything in that folder from root to node (user:group)
WORKDIR /home/node/app
# every command in container should run from this folder
COPY package*.json ./
# copy everything with package...json from project directory into workdir folder
USER node
# switch to node user
RUN npm install --production
# only install production dependencies
COPY --chown=node:node . .
# copy all files in project directory (first period) into work directory (/home/node/app)

EXPOSE 8000
# port inside container can be accessed outside container

CMD ["npm", "start"]
# command container will execute when ran