FROM node:14.15.5

WORKDIR /usr/src/smart-brain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]

