local pack_helper = require "common.pack_helper"
local pb_netpack = require "skynet-fly.netpack.pb_netpack"

do
	pb_netpack.load('../../commonlualib/protos/common')
	pb_netpack.load('../../commonlualib/protos/hallserver')

	--协议码 协议消息名建立映射关系
	pack_helper.set_pack_id_names {
		"../../commonlualib/packids/common/",
		"../../commonlualib/packids/hallserver/",
	}
end

return {
    require "hall.player.player",
	require "hall.match.match",
	require "hall.item.item",
	require "hall.game_record.game_record",
	require "hall.email.email",
}