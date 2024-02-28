FROM spack/centos7

LABEL maintainer="958677003@qq.com"
LABEL version="1.0"
LABEL description="This is Docker Image for skynet_fly_demo"

RUN git clone https://github.com/huahua132/skynet_fly_demo \
&& cd skynet_fly_demo \
&& git submodule update --init \
&& cd dbinstall \
&& bash setup.sh

# # 安装必要的依赖和devtoolset-9
# RUN yum install -y git gcc wget zlib-devel openssl openssl-devel autoconf automake libtool curl centos-release-scl && \
#     yum install -y devtoolset-9

# # 设置环境变量以使用devtoolset-9的gcc和相关工具
# ENV PATH=/opt/rh/devtoolset-9/root/usr/bin:$PATH
# ENV LD_LIBRARY_PATH=/opt/rh/devtoolset-9/root/usr/lib64:/opt/rh/devtoolset-9/root/usr/lib:$LD_LIBRARY_PATH

# # 编译
# RUN cd skynet_fly_demo/skynet_fly && git submodule update --init && make linux && yum clean all \
# && cd ../../ \
# && chmod -R 777 skynet_fly_demo

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 80