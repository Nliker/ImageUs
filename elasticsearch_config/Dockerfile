FROM ubuntu:18.04

RUN apt-get -y update
RUN apt-get -y install curl

ADD init_index.sh /init_index.sh

RUN ["chmod", "+x", "/init_index.sh"]
