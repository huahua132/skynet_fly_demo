FROM spack/centos7

LABEL maintainer="958677003@qq.com"
LABEL version="1.0"
LABEL description="This is Docker Image for skynet_fly_demo"

RUN git clone https://github.com/huahua132/skynet_fly_demo \
&& cd skynet_fly_demo \
&& git submodule update --init \
&& cd ..

# RUN cd skynet_fly_demo/dbinstall \
# && bash setup.sh \
# && bash run.sh \
# && cd ../../

# 安装必要的依赖
RUN yum install -y git gcc wget zlib-devel openssl openssl-devel autoconf automake libtool curl && \
    yum install -y centos-release-scl && \
    yum install -y devtoolset-9-gcc*

# 启用devtoolset-9
SHELL ["/bin/bash", "-c"]
RUN source /opt/rh/devtoolset-9/enable

# 克隆代码并编译
RUN cd skynet_fly_demo/skynet_fly && git submodule update --init && make linux && cd ../../

ENTRYPOINT ["/skynet_fly_demo/script/all_restart.sh"]

EXPOSE 80