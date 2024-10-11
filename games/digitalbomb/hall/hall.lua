local pack_helper = require "common.pack_helper"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"

do
	pb_netpack.load('../../commonlualib/protos/gamecommon')
	pb_netpack.load('../../commonlualib/protos/common')
	pb_netpack.load('../../commonlualib/protos/chinese_chess')

	--协议码 协议消息名建立映射关系
	pack_helper.set_pack_id_names {
		"../../commonlualib/packids/gamecommon/",
		"../../commonlualib/packids/common/",
		"../../commonlualib/packids/chinese_chess/",
	}
end

return {
	require "gamecommon.hall.player.player",
	require "gamecommon.hall.match.match",
}