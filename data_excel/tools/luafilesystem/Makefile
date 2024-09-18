T = lfs

include config.win

SRCS = src/$(T).c
OBJS = src/$(T).o

lib: src/$(T).dll

# 使用 gcc 生成 .o 文件的规则
src/$(T).o: src/$(T).c
	$(CC) $(CFLAGS) -c -o $@ $<

# 使用 gcc 链接生成 .dll 文件的规则
src/$(T).dll: $(OBJS)
	$(CC) -shared -o $@ $(OBJS) $(LDFLAGS)

install: src/$(T).dll
	$(INSTALL_CMD)

clean:
	del src/$(T).dll $(OBJS) src/$(T).lib src/$(T).exp
	if exist src/$(T).dll.manifest del src/$(T).dll.manifest
