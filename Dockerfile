FROM spack/centos7

LABEL maintainer="958677003@qq.com"
LABEL version="1.0"
LABEL description="This is Docker Image for skynet_fly_demo"

RUN yum install -y git gcc wget zlib-devel openssl openssl-devel autoconf automake libtool curl centos-release-scl devtoolset-9-gcc*

RUN git clone https://github.com/huahua132/skynet_fly_demo

RUN cd skynet_fly_demo/dbinstall \
&& bash setup.sh \
&& bash run.sh \
&& cd ../../

RUN cd skynet_fly_demo/skynet_fly \
&& scl enable devtoolset-9 bash \
&& make linux \
&& cd ../../

ENTRYPOINT ["/skynet_fly_demo/script/all_restart.sh"]

EXPOSE 80