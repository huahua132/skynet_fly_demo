local CHESS_TYPE = require "enum.CHESS_TYPE"
local TEAM_TYPE = require "enum.TEAM_TYPE"
local table_util = require "skynet-fly.utils.table_util"

local ipairs = ipairs
local tinsert = table.insert
local tremove = table.remove

local M = {}

local g_init_chess_list = {
    {
        chess_id = 1,
        chess_type = CHESS_TYPE.BLACK_C,
        team_type = TEAM_TYPE.BLACK,
        row = 1,
        col = 1,
    },
    {
        chess_id = 2,
        chess_type = CHESS_TYPE.BLACK_M,
        team_type = TEAM_TYPE.BLACK,
        row = 1,
        col = 2,
    },
    {
        chess_id = 3,
        chess_type = CHESS_TYPE.BLACK_X,
        team_type = TEAM_TYPE.BLACK,
        row = 1,
        col = 3,
    },
    {
        chess_id = 4,
        chess_type = CHESS_TYPE.BLACK_S,
        team_type = TEAM_TYPE.BLACK,
        row = 1,
        col = 4,
    },
    {
        chess_id = 5,
        chess_type = CHESS_TYPE.BLACK_J,
        team_type = TEAM_TYPE.BLACK,
        row = 1,
        col = 5,
    },
    {
        chess_id = 6,
        chess_type = CHESS_TYPE.BLACK_S,
        team_type = TEAM_TYPE.BLACK,
        row = 1,
        col = 6,
    },
    {
        chess_id = 7,
        chess_type = CHESS_TYPE.BLACK_X,
        team_type = TEAM_TYPE.BLACK,
        row = 1,
        col = 7,
    },
    {
        chess_id = 8,
        chess_type = CHESS_TYPE.BLACK_M,
        team_type = TEAM_TYPE.BLACK,
        row = 1,
        col = 8,
    },
    {
        chess_id = 9,
        chess_type = CHESS_TYPE.BLACK_C,
        team_type = TEAM_TYPE.BLACK,
        row = 1,
        col = 9,
    },

    {
        chess_id = 10,
        chess_type = CHESS_TYPE.BLACK_P,
        team_type = TEAM_TYPE.BLACK,
        row = 3,
        col = 2,
    },
    {
        chess_id = 11,
        chess_type = CHESS_TYPE.BLACK_P,
        team_type = TEAM_TYPE.BLACK,
        row = 3,
        col = 8,
    },
    {
        chess_id = 12,
        chess_type = CHESS_TYPE.BLACK_Z,
        team_type = TEAM_TYPE.BLACK,
        row = 4,
        col = 1,
    },
    {
        chess_id = 13,
        chess_type = CHESS_TYPE.BLACK_Z,
        team_type = TEAM_TYPE.BLACK,
        row = 4,
        col = 3,
    },
    {
        chess_id = 14,
        chess_type = CHESS_TYPE.BLACK_Z,
        team_type = TEAM_TYPE.BLACK,
        row = 4,
        col = 5,
    },
    {
        chess_id = 15,
        chess_type = CHESS_TYPE.BLACK_Z,
        team_type = TEAM_TYPE.BLACK,
        row = 4,
        col = 7,
    },
    {
        chess_id = 16,
        chess_type = CHESS_TYPE.BLACK_Z,
        team_type = TEAM_TYPE.BLACK,
        row = 4,
        col = 9,
    },

    --红旗
   {
        chess_id = 21,
        chess_type = CHESS_TYPE.RED_C,
        team_type = TEAM_TYPE.RED,
        row = 10,
        col = 1,
    },
    {
        chess_id = 22,
        chess_type = CHESS_TYPE.RED_M,
        team_type = TEAM_TYPE.RED,
        row = 10,
        col = 2,
    },
    {
        chess_id = 23,
        chess_type = CHESS_TYPE.RED_X,
        team_type = TEAM_TYPE.RED,
        row = 10,
        col = 3,
    },
    {
        chess_id = 24,
        chess_type = CHESS_TYPE.RED_S,
        team_type = TEAM_TYPE.RED,
        row = 10,
        col = 4,
    },
    {
        chess_id = 25,
        chess_type = CHESS_TYPE.RED_J,
        team_type = TEAM_TYPE.RED,
        row = 10,
        col = 5,
    },
    {
        chess_id = 26,
        chess_type = CHESS_TYPE.RED_S,
        team_type = TEAM_TYPE.RED,
        row = 10,
        col = 6,
    },
    {
        chess_id = 27,
        chess_type = CHESS_TYPE.RED_X,
        team_type = TEAM_TYPE.RED,
        row = 10,
        col = 7,
    },
    {
        chess_id = 28,
        chess_type = CHESS_TYPE.RED_M,
        team_type = TEAM_TYPE.RED,
        row = 10,
        col = 8,
    },
    {
        chess_id = 29,
        chess_type = CHESS_TYPE.RED_C,
        team_type = TEAM_TYPE.RED,
        row = 10,
        col = 9,
    },

    {
        chess_id = 30,
        chess_type = CHESS_TYPE.RED_P,
        team_type = TEAM_TYPE.RED,
        row = 8,
        col = 2,
    },
    {
        chess_id = 31,
        chess_type = CHESS_TYPE.RED_P,
        team_type = TEAM_TYPE.RED,
        row = 8,
        col = 8,
    },
    {
        chess_id = 32,
        chess_type = CHESS_TYPE.RED_Z,
        team_type = TEAM_TYPE.RED,
        row = 7,
        col = 1,
    },
    {
        chess_id = 33,
        chess_type = CHESS_TYPE.RED_Z,
        team_type = TEAM_TYPE.RED,
        row = 7,
        col = 3,
    },
    {
        chess_id = 34,
        chess_type = CHESS_TYPE.RED_Z,
        team_type = TEAM_TYPE.RED,
        row = 7,
        col = 5,
    },
    {
        chess_id = 35,
        chess_type = CHESS_TYPE.RED_Z,
        team_type = TEAM_TYPE.RED,
        row = 7,
        col = 7,
    },
    {
        chess_id = 36,
        chess_type = CHESS_TYPE.RED_Z,
        team_type = TEAM_TYPE.RED,
        row = 7,
        col = 9,
    },
}

local pos_record = {}
local function get_pos_obj(row,col)
    if not pos_record[row] then
        pos_record[row] = {}
    end

    if not pos_record[row][col] then
        pos_record[row][col] = {row = row, col = col}
    end

    return pos_record[row][col]
end

--车
local function is_c(chess) 
    return chess.chess_type == CHESS_TYPE.BLACK_C or chess.chess_type == CHESS_TYPE.RED_C
end 
--将
local function is_j(chess)
    return chess.chess_type == CHESS_TYPE.BLACK_J or chess.chess_type == CHESS_TYPE.RED_J
end
--马
local function is_m(chess)
    return chess.chess_type == CHESS_TYPE.BLACK_M or chess.chess_type == CHESS_TYPE.RED_M
end
--炮
local function is_p(chess)
    return chess.chess_type == CHESS_TYPE.BLACK_P or chess.chess_type == CHESS_TYPE.RED_P
end
--士
local function is_s(chess)
    return chess.chess_type == CHESS_TYPE.BLACK_S or chess.chess_type == CHESS_TYPE.RED_S
end
--象
local function is_x(chess)
    return chess.chess_type == CHESS_TYPE.BLACK_X or chess.chess_type == CHESS_TYPE.RED_X
end
--卒
local function is_z(chess)
    return chess.chess_type == CHESS_TYPE.BLACK_Z or chess.chess_type == CHESS_TYPE.RED_Z
end

function M.get_init_chess_list()
    local chess_list = table_util.deep_copy(g_init_chess_list)
    local chess_map = {}
    local boss_map = {}

    for _,one_chess in ipairs(chess_list) do
        local row = one_chess.row
        local col = one_chess.col

        if not chess_map[row] then
            chess_map[row] = {}
        end
        chess_map[row][col] = one_chess

        if is_j(one_chess) then
            boss_map[one_chess.team_type] = one_chess
        end
    end
    return chess_list,chess_map,boss_map
end

local function is_vaild_pos(row,col)
    if row < 1 or row > 10 or col < 1 or col > 9 then return false end

    return true
end

local function add_c_move_pos(chess_map,row,col,team_type,can_move_pos_list,is_p)
    if not is_vaild_pos(row,col) then return false end

    if not chess_map[row] or not chess_map[row][col] then
        tinsert(can_move_pos_list,get_pos_obj(row,col))
    else
        local pos_chess = chess_map[row][col]
        if pos_chess.team_type ~= team_type and not is_p then
            tinsert(can_move_pos_list,get_pos_obj(row,col))
        end
        return false
    end

    return true
end

local function add_j_move_pos(chess_map,row,col,team_type,can_move_pos_list)
    if row < 1 or (row > 3 and row < 8) or row > 10 or col < 4 or col > 6 then return end

    return add_c_move_pos(chess_map,row,col,team_type,can_move_pos_list)
end

local function add_p_move_pos(chess_map,row,col,team_type,can_move_pos_list)
    if not is_vaild_pos(row,col) then return end

    if chess_map[row] and chess_map[row][col] then
        local pos_chess = chess_map[row][col]
        if pos_chess.team_type ~= team_type then
            tinsert(can_move_pos_list,get_pos_obj(row,col))
        end
        return false
    end

    return true
end

local function add_x_move_pos(chess_map,row,col,team_type,can_move_pos_list)
    if team_type == TEAM_TYPE.BLACK then
        if row > 5 then
            return false
        end
    else
        if row < 6 then
            return false
        end
    end

    return add_c_move_pos(chess_map,row,col,team_type,can_move_pos_list)
end

--获取单个棋子可以走的位置
local function get_one_check_can_move_pos(chess_map, boss_map, one_chess)
    
    local can_move_pos_list = {}

    local team_type = one_chess.team_type
    local row = one_chess.row
    local col = one_chess.col

    if is_c(one_chess) then --如果是车
        --右
        for i = col + 1,9 do
            if not add_c_move_pos(chess_map,row,i,team_type,can_move_pos_list) then break end
        end

        --左
        for i = col - 1,1,-1 do
            if not add_c_move_pos(chess_map,row,i,team_type,can_move_pos_list) then break end
        end

        --上
        for i = row - 1,1,-1 do
            if not add_c_move_pos(chess_map,i,col,team_type,can_move_pos_list) then break end
        end

        --下
        for i = row + 1,10 do
            if not add_c_move_pos(chess_map,i,col,team_type,can_move_pos_list) then break end
        end
    elseif is_j(one_chess) then --将
        --右
        add_j_move_pos(chess_map,row,col + 1,team_type,can_move_pos_list)
        --左
        add_j_move_pos(chess_map,row,col - 1,team_type,can_move_pos_list)
        --上
        add_j_move_pos(chess_map,row - 1,col,team_type,can_move_pos_list)
        --下
        add_j_move_pos(chess_map,row + 1,col,team_type,can_move_pos_list)
        --将相对
        local other_boss = nil

        if team_type == TEAM_TYPE.BLACK then
            other_boss = boss_map[TEAM_TYPE.RED]
        else
            other_boss = boss_map[TEAM_TYPE.BLACK]
        end

        if other_boss.col == one_chess.col then
            local minrow,maxrow
            if other_boss.row > one_chess.row then
                minrow = one_chess.row
                maxrow = other_boss.row
            else
                minrow = other_boss.row
                maxrow = one_chess.row
            end

            local is_ok = true
            for i = minrow + 1,maxrow - 1 do
                if chess_map[i] and chess_map[i][col] then
                    is_ok = false
                    break
                end
            end

            if is_ok then
                tinsert(can_move_pos_list,get_pos_obj(other_boss.row,other_boss.col))
            end
        end
    elseif is_m(one_chess) then --马
        --右
        local tmp_col = col + 2
        local p_col = col + 1
        if (is_vaild_pos(row,p_col) and (not chess_map[row] or not chess_map[row][p_col])) then
            add_c_move_pos(chess_map,row + 1,tmp_col,team_type,can_move_pos_list)
            add_c_move_pos(chess_map,row - 1,tmp_col,team_type,can_move_pos_list)
        end
        
        --左
        tmp_col = col - 2
        p_col = col - 1
        if (is_vaild_pos(row,p_col) and (not chess_map[row] or not chess_map[row][p_col])) then
            add_c_move_pos(chess_map,row + 1,tmp_col,team_type,can_move_pos_list)
            add_c_move_pos(chess_map,row - 1,tmp_col,team_type,can_move_pos_list)
        end

        --上
        local p_row = row - 1
        local tmp_row = row - 2
        if (is_vaild_pos(p_row,col) and (not chess_map[p_row] or not chess_map[p_row][col])) then
            add_c_move_pos(chess_map,tmp_row,col + 1,team_type,can_move_pos_list)
            add_c_move_pos(chess_map,tmp_row,col - 1,team_type,can_move_pos_list)
        end
        --下
        p_row = row + 1
        tmp_row = row + 2
        if (is_vaild_pos(p_row,col) and (not chess_map[p_row] or not chess_map[p_row][col])) then
            add_c_move_pos(chess_map,tmp_row,col + 1,team_type,can_move_pos_list)
            add_c_move_pos(chess_map,tmp_row,col - 1,team_type,can_move_pos_list)
        end
    elseif is_p(one_chess) then
        --右
        local ptools = false
        for i = col + 1,9 do
            if not ptools then
                if not add_c_move_pos(chess_map,row,i,team_type,can_move_pos_list,true) then
                    ptools = true
                end
            else
                if not add_p_move_pos(chess_map,row,i,team_type,can_move_pos_list) then break end
            end
        end
        
        --左
        ptools = false
        for i = col - 1,1,-1 do
            if not ptools then
                if not add_c_move_pos(chess_map,row,i,team_type,can_move_pos_list,true) then
                    ptools = true
                end
            else
                if not add_p_move_pos(chess_map,row,i,team_type,can_move_pos_list) then break end
            end
        end

        --上
        ptools = false
        for i = row - 1,1,-1 do
            if not ptools then
                if not add_c_move_pos(chess_map,i,col,team_type,can_move_pos_list,true) then
                    ptools = true
                end
            else
                if not add_p_move_pos(chess_map,i,col,team_type,can_move_pos_list) then break end
            end
        end

        --下
        ptools = false
        for i = row + 1,10 do
            if not ptools then
                if not add_c_move_pos(chess_map,i,col,team_type,can_move_pos_list,true) then
                    ptools = true
                end
            else
                if not add_p_move_pos(chess_map,i,col,team_type,can_move_pos_list) then break end
            end
        end
    elseif is_s(one_chess) then
        --右
        add_j_move_pos(chess_map,row + 1,col + 1,team_type,can_move_pos_list) 
        add_j_move_pos(chess_map,row - 1,col + 1,team_type,can_move_pos_list)
        --左
        add_j_move_pos(chess_map,row + 1,col - 1,team_type,can_move_pos_list)
        add_j_move_pos(chess_map,row - 1,col - 1,team_type,can_move_pos_list)
    elseif is_x(one_chess) then
        --右下
        add_x_move_pos(chess_map,row + 2, col + 2, team_type, can_move_pos_list)
        --右上
        add_x_move_pos(chess_map,row - 2, col + 2, team_type, can_move_pos_list)
        --左下
        add_x_move_pos(chess_map,row + 2,col - 2,team_type,can_move_pos_list)
        --左上
        add_x_move_pos(chess_map,row - 2,col - 2,team_type,can_move_pos_list)
    elseif is_z(one_chess) then
        if (team_type == TEAM_TYPE.BLACK and row > 5) or (team_type == TEAM_TYPE.RED and row < 6) then
            --右
            add_c_move_pos(chess_map,row, col + 1, team_type, can_move_pos_list)
            --左
            add_c_move_pos(chess_map,row, col - 1, team_type, can_move_pos_list)
        end
        if team_type == TEAM_TYPE.BLACK then
            --下
            add_c_move_pos(chess_map,row + 1,col,team_type,can_move_pos_list)
        else
            --上
            add_c_move_pos(chess_map,row - 1,col,team_type,can_move_pos_list)
        end
    end
    return can_move_pos_list
end

function M.move_chess(chess_list,chess_map,boss_map,move_chess,move_pos)
    local move_row = move_pos.row
    local move_col = move_pos.col
    local pre_row = move_chess.row
    local pre_col = move_chess.col
    chess_map[pre_row][pre_col] = nil
    local kill_chess = nil
    if chess_map[move_row] and chess_map[move_row][move_col] then
        kill_chess = chess_map[move_row][move_col]
    end

    if not chess_map[move_row] then
        chess_map[move_row] = {}
    end
    chess_map[move_row][move_col] = move_chess
    move_chess.row = move_row
    move_chess.col = move_col

    if kill_chess then
        for i,chess in ipairs(chess_list) do
            if chess.chess_id == kill_chess.chess_id then
                tremove(chess_list,i)
                break
            end 
        end
    end

    return kill_chess
end

local function try_move(chess_list,chess_map,boss_map,move_chess,move_pos)
    local move_row = move_pos.row
    local move_col = move_pos.col
    local pre_row = move_chess.row
    local pre_col = move_chess.col
    local kill_chess =  M.move_chess(chess_list,chess_map,boss_map,move_chess,move_pos)
    --移动完了之后检查对方是不是可以把当前玩家的老帅干掉
    local team_type = move_chess.team_type
    local other_team_type = nil
    if team_type == TEAM_TYPE.BLACK then
        other_team_type = TEAM_TYPE.RED
    else
        other_team_type = TEAM_TYPE.BLACK
    end

    local boss_chess = boss_map[team_type]

    local isok = true
    for _,chess in ipairs(chess_list) do
        if chess.team_type == other_team_type then
            local can_move_list = get_one_check_can_move_pos(chess_map,boss_map,chess)
            for _,pos in ipairs(can_move_list) do
                if pos.row == boss_chess.row and pos.col == boss_chess.col then
                    isok = false
                    break
                end
            end
        end
        if not isok then
            break
        end
    end

    move_chess.row = pre_row
    move_chess.col = pre_col
    chess_map[pre_row][pre_col] = move_chess
    chess_map[move_row][move_col] = nil
    if kill_chess then
        chess_map[move_row][move_col] = kill_chess
        tinsert(chess_list,kill_chess)
    end

    return isok
end

local function get_can_move_list(chess_list,chess_map,boss_map,chess)
    local can_move_list = get_one_check_can_move_pos(chess_map,boss_map,chess)
    for i = #can_move_list,1,-1 do
        local move_pos = can_move_list[i]
        if not try_move(chess_list,chess_map,boss_map,chess,move_pos) then
            tremove(can_move_list,i)
        end
    end

    return can_move_list
end

function M.get_all_can_move_map(chess_list,chess_map,boss_map,team_type)
    local can_move_list_map = {}

    local tmp_list = {}
    for _,chess in ipairs(chess_list) do
        tinsert(tmp_list,chess)
    end
    
    for _,chess in ipairs(chess_list) do
        if chess.team_type == team_type then
            local can_move_list = get_can_move_list(tmp_list,chess_map,boss_map,chess)
            if #can_move_list > 0 then
                can_move_list_map[chess.chess_id] = can_move_list
            end
        end
    end

    return  can_move_list_map
end

return M