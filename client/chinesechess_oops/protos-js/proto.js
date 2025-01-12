/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal.js");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.chinese_chess_game = (function() {

    /**
     * Namespace chinese_chess_game.
     * @exports chinese_chess_game
     * @namespace
     */
    var chinese_chess_game = {};

    /**
     * main enum.
     * @name chinese_chess_game.main
     * @enum {number}
     * @property {number} chinese_chess_game=101 chinese_chess_game value
     */
    chinese_chess_game.main = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[101] = "chinese_chess_game"] = 101;
        return values;
    })();

    /**
     * sub enum.
     * @name chinese_chess_game.sub
     * @enum {number}
     * @property {number} gameStateReq=1 gameStateReq value
     * @property {number} gameStateRes=2 gameStateRes value
     * @property {number} moveReq=3 moveReq value
     * @property {number} moveRes=4 moveRes value
     * @property {number} nextDoing=80 nextDoing value
     */
    chinese_chess_game.sub = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "gameStateReq"] = 1;
        values[valuesById[2] = "gameStateRes"] = 2;
        values[valuesById[3] = "moveReq"] = 3;
        values[valuesById[4] = "moveRes"] = 4;
        values[valuesById[80] = "nextDoing"] = 80;
        return values;
    })();

    chinese_chess_game.gameStateReq = (function() {

        /**
         * Properties of a gameStateReq.
         * @memberof chinese_chess_game
         * @interface IgameStateReq
         * @property {number|Long|null} [playerId] gameStateReq playerId
         */

        /**
         * Constructs a new gameStateReq.
         * @memberof chinese_chess_game
         * @classdesc Represents a gameStateReq.
         * @implements IgameStateReq
         * @constructor
         * @param {chinese_chess_game.IgameStateReq=} [properties] Properties to set
         */
        function gameStateReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * gameStateReq playerId.
         * @member {number|Long} playerId
         * @memberof chinese_chess_game.gameStateReq
         * @instance
         */
        gameStateReq.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new gameStateReq instance using the specified properties.
         * @function create
         * @memberof chinese_chess_game.gameStateReq
         * @static
         * @param {chinese_chess_game.IgameStateReq=} [properties] Properties to set
         * @returns {chinese_chess_game.gameStateReq} gameStateReq instance
         */
        gameStateReq.create = function create(properties) {
            return new gameStateReq(properties);
        };

        /**
         * Encodes the specified gameStateReq message. Does not implicitly {@link chinese_chess_game.gameStateReq.verify|verify} messages.
         * @function encode
         * @memberof chinese_chess_game.gameStateReq
         * @static
         * @param {chinese_chess_game.IgameStateReq} message gameStateReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        gameStateReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            return writer;
        };

        /**
         * Encodes the specified gameStateReq message, length delimited. Does not implicitly {@link chinese_chess_game.gameStateReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chinese_chess_game.gameStateReq
         * @static
         * @param {chinese_chess_game.IgameStateReq} message gameStateReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        gameStateReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a gameStateReq message from the specified reader or buffer.
         * @function decode
         * @memberof chinese_chess_game.gameStateReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chinese_chess_game.gameStateReq} gameStateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        gameStateReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chinese_chess_game.gameStateReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a gameStateReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chinese_chess_game.gameStateReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chinese_chess_game.gameStateReq} gameStateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        gameStateReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a gameStateReq message.
         * @function verify
         * @memberof chinese_chess_game.gameStateReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        gameStateReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            return null;
        };

        /**
         * Creates a gameStateReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chinese_chess_game.gameStateReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chinese_chess_game.gameStateReq} gameStateReq
         */
        gameStateReq.fromObject = function fromObject(object) {
            if (object instanceof $root.chinese_chess_game.gameStateReq)
                return object;
            var message = new $root.chinese_chess_game.gameStateReq();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a gameStateReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chinese_chess_game.gameStateReq
         * @static
         * @param {chinese_chess_game.gameStateReq} message gameStateReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        gameStateReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            return object;
        };

        /**
         * Converts this gameStateReq to JSON.
         * @function toJSON
         * @memberof chinese_chess_game.gameStateReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        gameStateReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for gameStateReq
         * @function getTypeUrl
         * @memberof chinese_chess_game.gameStateReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        gameStateReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chinese_chess_game.gameStateReq";
        };

        return gameStateReq;
    })();

    chinese_chess_game.playerInfo = (function() {

        /**
         * Properties of a playerInfo.
         * @memberof chinese_chess_game
         * @interface IplayerInfo
         * @property {number|null} [seatId] playerInfo seatId
         * @property {number|Long|null} [playerId] playerInfo playerId
         * @property {number|null} [teamType] playerInfo teamType
         * @property {string|null} [nickname] playerInfo nickname
         * @property {number|null} [score] playerInfo score
         */

        /**
         * Constructs a new playerInfo.
         * @memberof chinese_chess_game
         * @classdesc Represents a playerInfo.
         * @implements IplayerInfo
         * @constructor
         * @param {chinese_chess_game.IplayerInfo=} [properties] Properties to set
         */
        function playerInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * playerInfo seatId.
         * @member {number} seatId
         * @memberof chinese_chess_game.playerInfo
         * @instance
         */
        playerInfo.prototype.seatId = 0;

        /**
         * playerInfo playerId.
         * @member {number|Long} playerId
         * @memberof chinese_chess_game.playerInfo
         * @instance
         */
        playerInfo.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * playerInfo teamType.
         * @member {number} teamType
         * @memberof chinese_chess_game.playerInfo
         * @instance
         */
        playerInfo.prototype.teamType = 0;

        /**
         * playerInfo nickname.
         * @member {string} nickname
         * @memberof chinese_chess_game.playerInfo
         * @instance
         */
        playerInfo.prototype.nickname = "";

        /**
         * playerInfo score.
         * @member {number} score
         * @memberof chinese_chess_game.playerInfo
         * @instance
         */
        playerInfo.prototype.score = 0;

        /**
         * Creates a new playerInfo instance using the specified properties.
         * @function create
         * @memberof chinese_chess_game.playerInfo
         * @static
         * @param {chinese_chess_game.IplayerInfo=} [properties] Properties to set
         * @returns {chinese_chess_game.playerInfo} playerInfo instance
         */
        playerInfo.create = function create(properties) {
            return new playerInfo(properties);
        };

        /**
         * Encodes the specified playerInfo message. Does not implicitly {@link chinese_chess_game.playerInfo.verify|verify} messages.
         * @function encode
         * @memberof chinese_chess_game.playerInfo
         * @static
         * @param {chinese_chess_game.IplayerInfo} message playerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        playerInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seatId != null && Object.hasOwnProperty.call(message, "seatId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seatId);
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.playerId);
            if (message.teamType != null && Object.hasOwnProperty.call(message, "teamType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.teamType);
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.nickname);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.score);
            return writer;
        };

        /**
         * Encodes the specified playerInfo message, length delimited. Does not implicitly {@link chinese_chess_game.playerInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chinese_chess_game.playerInfo
         * @static
         * @param {chinese_chess_game.IplayerInfo} message playerInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        playerInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a playerInfo message from the specified reader or buffer.
         * @function decode
         * @memberof chinese_chess_game.playerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chinese_chess_game.playerInfo} playerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        playerInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chinese_chess_game.playerInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.seatId = reader.int32();
                        break;
                    }
                case 2: {
                        message.playerId = reader.int64();
                        break;
                    }
                case 3: {
                        message.teamType = reader.int32();
                        break;
                    }
                case 4: {
                        message.nickname = reader.string();
                        break;
                    }
                case 5: {
                        message.score = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a playerInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chinese_chess_game.playerInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chinese_chess_game.playerInfo} playerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        playerInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a playerInfo message.
         * @function verify
         * @memberof chinese_chess_game.playerInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        playerInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seatId != null && message.hasOwnProperty("seatId"))
                if (!$util.isInteger(message.seatId))
                    return "seatId: integer expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            if (message.teamType != null && message.hasOwnProperty("teamType"))
                if (!$util.isInteger(message.teamType))
                    return "teamType: integer expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            return null;
        };

        /**
         * Creates a playerInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chinese_chess_game.playerInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chinese_chess_game.playerInfo} playerInfo
         */
        playerInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.chinese_chess_game.playerInfo)
                return object;
            var message = new $root.chinese_chess_game.playerInfo();
            if (object.seatId != null)
                message.seatId = object.seatId | 0;
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            if (object.teamType != null)
                message.teamType = object.teamType | 0;
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.score != null)
                message.score = object.score | 0;
            return message;
        };

        /**
         * Creates a plain object from a playerInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chinese_chess_game.playerInfo
         * @static
         * @param {chinese_chess_game.playerInfo} message playerInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        playerInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.seatId = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
                object.teamType = 0;
                object.nickname = "";
                object.score = 0;
            }
            if (message.seatId != null && message.hasOwnProperty("seatId"))
                object.seatId = message.seatId;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            if (message.teamType != null && message.hasOwnProperty("teamType"))
                object.teamType = message.teamType;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = message.score;
            return object;
        };

        /**
         * Converts this playerInfo to JSON.
         * @function toJSON
         * @memberof chinese_chess_game.playerInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        playerInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for playerInfo
         * @function getTypeUrl
         * @memberof chinese_chess_game.playerInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        playerInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chinese_chess_game.playerInfo";
        };

        return playerInfo;
    })();

    chinese_chess_game.oneChess = (function() {

        /**
         * Properties of an oneChess.
         * @memberof chinese_chess_game
         * @interface IoneChess
         * @property {number|null} [chessId] oneChess chessId
         * @property {number|null} [chessType] oneChess chessType
         * @property {number|null} [row] oneChess row
         * @property {number|null} [col] oneChess col
         * @property {number|null} [teamType] oneChess teamType
         */

        /**
         * Constructs a new oneChess.
         * @memberof chinese_chess_game
         * @classdesc Represents an oneChess.
         * @implements IoneChess
         * @constructor
         * @param {chinese_chess_game.IoneChess=} [properties] Properties to set
         */
        function oneChess(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * oneChess chessId.
         * @member {number} chessId
         * @memberof chinese_chess_game.oneChess
         * @instance
         */
        oneChess.prototype.chessId = 0;

        /**
         * oneChess chessType.
         * @member {number} chessType
         * @memberof chinese_chess_game.oneChess
         * @instance
         */
        oneChess.prototype.chessType = 0;

        /**
         * oneChess row.
         * @member {number} row
         * @memberof chinese_chess_game.oneChess
         * @instance
         */
        oneChess.prototype.row = 0;

        /**
         * oneChess col.
         * @member {number} col
         * @memberof chinese_chess_game.oneChess
         * @instance
         */
        oneChess.prototype.col = 0;

        /**
         * oneChess teamType.
         * @member {number} teamType
         * @memberof chinese_chess_game.oneChess
         * @instance
         */
        oneChess.prototype.teamType = 0;

        /**
         * Creates a new oneChess instance using the specified properties.
         * @function create
         * @memberof chinese_chess_game.oneChess
         * @static
         * @param {chinese_chess_game.IoneChess=} [properties] Properties to set
         * @returns {chinese_chess_game.oneChess} oneChess instance
         */
        oneChess.create = function create(properties) {
            return new oneChess(properties);
        };

        /**
         * Encodes the specified oneChess message. Does not implicitly {@link chinese_chess_game.oneChess.verify|verify} messages.
         * @function encode
         * @memberof chinese_chess_game.oneChess
         * @static
         * @param {chinese_chess_game.IoneChess} message oneChess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        oneChess.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chessId != null && Object.hasOwnProperty.call(message, "chessId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chessId);
            if (message.chessType != null && Object.hasOwnProperty.call(message, "chessType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.chessType);
            if (message.row != null && Object.hasOwnProperty.call(message, "row"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.row);
            if (message.col != null && Object.hasOwnProperty.call(message, "col"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.col);
            if (message.teamType != null && Object.hasOwnProperty.call(message, "teamType"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.teamType);
            return writer;
        };

        /**
         * Encodes the specified oneChess message, length delimited. Does not implicitly {@link chinese_chess_game.oneChess.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chinese_chess_game.oneChess
         * @static
         * @param {chinese_chess_game.IoneChess} message oneChess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        oneChess.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an oneChess message from the specified reader or buffer.
         * @function decode
         * @memberof chinese_chess_game.oneChess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chinese_chess_game.oneChess} oneChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        oneChess.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chinese_chess_game.oneChess();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.chessId = reader.int32();
                        break;
                    }
                case 2: {
                        message.chessType = reader.int32();
                        break;
                    }
                case 3: {
                        message.row = reader.int32();
                        break;
                    }
                case 4: {
                        message.col = reader.int32();
                        break;
                    }
                case 5: {
                        message.teamType = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an oneChess message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chinese_chess_game.oneChess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chinese_chess_game.oneChess} oneChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        oneChess.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an oneChess message.
         * @function verify
         * @memberof chinese_chess_game.oneChess
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        oneChess.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chessId != null && message.hasOwnProperty("chessId"))
                if (!$util.isInteger(message.chessId))
                    return "chessId: integer expected";
            if (message.chessType != null && message.hasOwnProperty("chessType"))
                if (!$util.isInteger(message.chessType))
                    return "chessType: integer expected";
            if (message.row != null && message.hasOwnProperty("row"))
                if (!$util.isInteger(message.row))
                    return "row: integer expected";
            if (message.col != null && message.hasOwnProperty("col"))
                if (!$util.isInteger(message.col))
                    return "col: integer expected";
            if (message.teamType != null && message.hasOwnProperty("teamType"))
                if (!$util.isInteger(message.teamType))
                    return "teamType: integer expected";
            return null;
        };

        /**
         * Creates an oneChess message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chinese_chess_game.oneChess
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chinese_chess_game.oneChess} oneChess
         */
        oneChess.fromObject = function fromObject(object) {
            if (object instanceof $root.chinese_chess_game.oneChess)
                return object;
            var message = new $root.chinese_chess_game.oneChess();
            if (object.chessId != null)
                message.chessId = object.chessId | 0;
            if (object.chessType != null)
                message.chessType = object.chessType | 0;
            if (object.row != null)
                message.row = object.row | 0;
            if (object.col != null)
                message.col = object.col | 0;
            if (object.teamType != null)
                message.teamType = object.teamType | 0;
            return message;
        };

        /**
         * Creates a plain object from an oneChess message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chinese_chess_game.oneChess
         * @static
         * @param {chinese_chess_game.oneChess} message oneChess
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        oneChess.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.chessId = 0;
                object.chessType = 0;
                object.row = 0;
                object.col = 0;
                object.teamType = 0;
            }
            if (message.chessId != null && message.hasOwnProperty("chessId"))
                object.chessId = message.chessId;
            if (message.chessType != null && message.hasOwnProperty("chessType"))
                object.chessType = message.chessType;
            if (message.row != null && message.hasOwnProperty("row"))
                object.row = message.row;
            if (message.col != null && message.hasOwnProperty("col"))
                object.col = message.col;
            if (message.teamType != null && message.hasOwnProperty("teamType"))
                object.teamType = message.teamType;
            return object;
        };

        /**
         * Converts this oneChess to JSON.
         * @function toJSON
         * @memberof chinese_chess_game.oneChess
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        oneChess.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for oneChess
         * @function getTypeUrl
         * @memberof chinese_chess_game.oneChess
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        oneChess.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chinese_chess_game.oneChess";
        };

        return oneChess;
    })();

    chinese_chess_game.chessCanMove = (function() {

        /**
         * Properties of a chessCanMove.
         * @memberof chinese_chess_game
         * @interface IchessCanMove
         * @property {number|null} [chessId] chessCanMove chessId
         * @property {Array.<number>|null} [rowList] chessCanMove rowList
         * @property {Array.<number>|null} [colList] chessCanMove colList
         */

        /**
         * Constructs a new chessCanMove.
         * @memberof chinese_chess_game
         * @classdesc Represents a chessCanMove.
         * @implements IchessCanMove
         * @constructor
         * @param {chinese_chess_game.IchessCanMove=} [properties] Properties to set
         */
        function chessCanMove(properties) {
            this.rowList = [];
            this.colList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * chessCanMove chessId.
         * @member {number} chessId
         * @memberof chinese_chess_game.chessCanMove
         * @instance
         */
        chessCanMove.prototype.chessId = 0;

        /**
         * chessCanMove rowList.
         * @member {Array.<number>} rowList
         * @memberof chinese_chess_game.chessCanMove
         * @instance
         */
        chessCanMove.prototype.rowList = $util.emptyArray;

        /**
         * chessCanMove colList.
         * @member {Array.<number>} colList
         * @memberof chinese_chess_game.chessCanMove
         * @instance
         */
        chessCanMove.prototype.colList = $util.emptyArray;

        /**
         * Creates a new chessCanMove instance using the specified properties.
         * @function create
         * @memberof chinese_chess_game.chessCanMove
         * @static
         * @param {chinese_chess_game.IchessCanMove=} [properties] Properties to set
         * @returns {chinese_chess_game.chessCanMove} chessCanMove instance
         */
        chessCanMove.create = function create(properties) {
            return new chessCanMove(properties);
        };

        /**
         * Encodes the specified chessCanMove message. Does not implicitly {@link chinese_chess_game.chessCanMove.verify|verify} messages.
         * @function encode
         * @memberof chinese_chess_game.chessCanMove
         * @static
         * @param {chinese_chess_game.IchessCanMove} message chessCanMove message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        chessCanMove.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chessId != null && Object.hasOwnProperty.call(message, "chessId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chessId);
            if (message.rowList != null && message.rowList.length)
                for (var i = 0; i < message.rowList.length; ++i)
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.rowList[i]);
            if (message.colList != null && message.colList.length)
                for (var i = 0; i < message.colList.length; ++i)
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.colList[i]);
            return writer;
        };

        /**
         * Encodes the specified chessCanMove message, length delimited. Does not implicitly {@link chinese_chess_game.chessCanMove.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chinese_chess_game.chessCanMove
         * @static
         * @param {chinese_chess_game.IchessCanMove} message chessCanMove message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        chessCanMove.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a chessCanMove message from the specified reader or buffer.
         * @function decode
         * @memberof chinese_chess_game.chessCanMove
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chinese_chess_game.chessCanMove} chessCanMove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        chessCanMove.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chinese_chess_game.chessCanMove();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.chessId = reader.int32();
                        break;
                    }
                case 2: {
                        if (!(message.rowList && message.rowList.length))
                            message.rowList = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.rowList.push(reader.int32());
                        } else
                            message.rowList.push(reader.int32());
                        break;
                    }
                case 3: {
                        if (!(message.colList && message.colList.length))
                            message.colList = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.colList.push(reader.int32());
                        } else
                            message.colList.push(reader.int32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a chessCanMove message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chinese_chess_game.chessCanMove
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chinese_chess_game.chessCanMove} chessCanMove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        chessCanMove.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a chessCanMove message.
         * @function verify
         * @memberof chinese_chess_game.chessCanMove
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        chessCanMove.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chessId != null && message.hasOwnProperty("chessId"))
                if (!$util.isInteger(message.chessId))
                    return "chessId: integer expected";
            if (message.rowList != null && message.hasOwnProperty("rowList")) {
                if (!Array.isArray(message.rowList))
                    return "rowList: array expected";
                for (var i = 0; i < message.rowList.length; ++i)
                    if (!$util.isInteger(message.rowList[i]))
                        return "rowList: integer[] expected";
            }
            if (message.colList != null && message.hasOwnProperty("colList")) {
                if (!Array.isArray(message.colList))
                    return "colList: array expected";
                for (var i = 0; i < message.colList.length; ++i)
                    if (!$util.isInteger(message.colList[i]))
                        return "colList: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a chessCanMove message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chinese_chess_game.chessCanMove
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chinese_chess_game.chessCanMove} chessCanMove
         */
        chessCanMove.fromObject = function fromObject(object) {
            if (object instanceof $root.chinese_chess_game.chessCanMove)
                return object;
            var message = new $root.chinese_chess_game.chessCanMove();
            if (object.chessId != null)
                message.chessId = object.chessId | 0;
            if (object.rowList) {
                if (!Array.isArray(object.rowList))
                    throw TypeError(".chinese_chess_game.chessCanMove.rowList: array expected");
                message.rowList = [];
                for (var i = 0; i < object.rowList.length; ++i)
                    message.rowList[i] = object.rowList[i] | 0;
            }
            if (object.colList) {
                if (!Array.isArray(object.colList))
                    throw TypeError(".chinese_chess_game.chessCanMove.colList: array expected");
                message.colList = [];
                for (var i = 0; i < object.colList.length; ++i)
                    message.colList[i] = object.colList[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a chessCanMove message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chinese_chess_game.chessCanMove
         * @static
         * @param {chinese_chess_game.chessCanMove} message chessCanMove
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        chessCanMove.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.rowList = [];
                object.colList = [];
            }
            if (options.defaults)
                object.chessId = 0;
            if (message.chessId != null && message.hasOwnProperty("chessId"))
                object.chessId = message.chessId;
            if (message.rowList && message.rowList.length) {
                object.rowList = [];
                for (var j = 0; j < message.rowList.length; ++j)
                    object.rowList[j] = message.rowList[j];
            }
            if (message.colList && message.colList.length) {
                object.colList = [];
                for (var j = 0; j < message.colList.length; ++j)
                    object.colList[j] = message.colList[j];
            }
            return object;
        };

        /**
         * Converts this chessCanMove to JSON.
         * @function toJSON
         * @memberof chinese_chess_game.chessCanMove
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        chessCanMove.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for chessCanMove
         * @function getTypeUrl
         * @memberof chinese_chess_game.chessCanMove
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        chessCanMove.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chinese_chess_game.chessCanMove";
        };

        return chessCanMove;
    })();

    chinese_chess_game.nextDoing = (function() {

        /**
         * Properties of a nextDoing.
         * @memberof chinese_chess_game
         * @interface InextDoing
         * @property {number|null} [seatId] nextDoing seatId
         * @property {number|Long|null} [playerId] nextDoing playerId
         * @property {number|null} [teamType] nextDoing teamType
         * @property {Array.<chinese_chess_game.IchessCanMove>|null} [canMoveList] nextDoing canMoveList
         * @property {number|null} [remainTotalTime] nextDoing remainTotalTime
         * @property {number|null} [remainOnceTime] nextDoing remainOnceTime
         */

        /**
         * Constructs a new nextDoing.
         * @memberof chinese_chess_game
         * @classdesc Represents a nextDoing.
         * @implements InextDoing
         * @constructor
         * @param {chinese_chess_game.InextDoing=} [properties] Properties to set
         */
        function nextDoing(properties) {
            this.canMoveList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * nextDoing seatId.
         * @member {number} seatId
         * @memberof chinese_chess_game.nextDoing
         * @instance
         */
        nextDoing.prototype.seatId = 0;

        /**
         * nextDoing playerId.
         * @member {number|Long} playerId
         * @memberof chinese_chess_game.nextDoing
         * @instance
         */
        nextDoing.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * nextDoing teamType.
         * @member {number} teamType
         * @memberof chinese_chess_game.nextDoing
         * @instance
         */
        nextDoing.prototype.teamType = 0;

        /**
         * nextDoing canMoveList.
         * @member {Array.<chinese_chess_game.IchessCanMove>} canMoveList
         * @memberof chinese_chess_game.nextDoing
         * @instance
         */
        nextDoing.prototype.canMoveList = $util.emptyArray;

        /**
         * nextDoing remainTotalTime.
         * @member {number} remainTotalTime
         * @memberof chinese_chess_game.nextDoing
         * @instance
         */
        nextDoing.prototype.remainTotalTime = 0;

        /**
         * nextDoing remainOnceTime.
         * @member {number} remainOnceTime
         * @memberof chinese_chess_game.nextDoing
         * @instance
         */
        nextDoing.prototype.remainOnceTime = 0;

        /**
         * Creates a new nextDoing instance using the specified properties.
         * @function create
         * @memberof chinese_chess_game.nextDoing
         * @static
         * @param {chinese_chess_game.InextDoing=} [properties] Properties to set
         * @returns {chinese_chess_game.nextDoing} nextDoing instance
         */
        nextDoing.create = function create(properties) {
            return new nextDoing(properties);
        };

        /**
         * Encodes the specified nextDoing message. Does not implicitly {@link chinese_chess_game.nextDoing.verify|verify} messages.
         * @function encode
         * @memberof chinese_chess_game.nextDoing
         * @static
         * @param {chinese_chess_game.InextDoing} message nextDoing message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        nextDoing.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seatId != null && Object.hasOwnProperty.call(message, "seatId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seatId);
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.playerId);
            if (message.teamType != null && Object.hasOwnProperty.call(message, "teamType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.teamType);
            if (message.canMoveList != null && message.canMoveList.length)
                for (var i = 0; i < message.canMoveList.length; ++i)
                    $root.chinese_chess_game.chessCanMove.encode(message.canMoveList[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.remainTotalTime != null && Object.hasOwnProperty.call(message, "remainTotalTime"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.remainTotalTime);
            if (message.remainOnceTime != null && Object.hasOwnProperty.call(message, "remainOnceTime"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.remainOnceTime);
            return writer;
        };

        /**
         * Encodes the specified nextDoing message, length delimited. Does not implicitly {@link chinese_chess_game.nextDoing.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chinese_chess_game.nextDoing
         * @static
         * @param {chinese_chess_game.InextDoing} message nextDoing message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        nextDoing.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a nextDoing message from the specified reader or buffer.
         * @function decode
         * @memberof chinese_chess_game.nextDoing
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chinese_chess_game.nextDoing} nextDoing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        nextDoing.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chinese_chess_game.nextDoing();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.seatId = reader.int32();
                        break;
                    }
                case 2: {
                        message.playerId = reader.int64();
                        break;
                    }
                case 3: {
                        message.teamType = reader.int32();
                        break;
                    }
                case 4: {
                        if (!(message.canMoveList && message.canMoveList.length))
                            message.canMoveList = [];
                        message.canMoveList.push($root.chinese_chess_game.chessCanMove.decode(reader, reader.uint32()));
                        break;
                    }
                case 5: {
                        message.remainTotalTime = reader.int32();
                        break;
                    }
                case 6: {
                        message.remainOnceTime = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a nextDoing message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chinese_chess_game.nextDoing
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chinese_chess_game.nextDoing} nextDoing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        nextDoing.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a nextDoing message.
         * @function verify
         * @memberof chinese_chess_game.nextDoing
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        nextDoing.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seatId != null && message.hasOwnProperty("seatId"))
                if (!$util.isInteger(message.seatId))
                    return "seatId: integer expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            if (message.teamType != null && message.hasOwnProperty("teamType"))
                if (!$util.isInteger(message.teamType))
                    return "teamType: integer expected";
            if (message.canMoveList != null && message.hasOwnProperty("canMoveList")) {
                if (!Array.isArray(message.canMoveList))
                    return "canMoveList: array expected";
                for (var i = 0; i < message.canMoveList.length; ++i) {
                    var error = $root.chinese_chess_game.chessCanMove.verify(message.canMoveList[i]);
                    if (error)
                        return "canMoveList." + error;
                }
            }
            if (message.remainTotalTime != null && message.hasOwnProperty("remainTotalTime"))
                if (!$util.isInteger(message.remainTotalTime))
                    return "remainTotalTime: integer expected";
            if (message.remainOnceTime != null && message.hasOwnProperty("remainOnceTime"))
                if (!$util.isInteger(message.remainOnceTime))
                    return "remainOnceTime: integer expected";
            return null;
        };

        /**
         * Creates a nextDoing message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chinese_chess_game.nextDoing
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chinese_chess_game.nextDoing} nextDoing
         */
        nextDoing.fromObject = function fromObject(object) {
            if (object instanceof $root.chinese_chess_game.nextDoing)
                return object;
            var message = new $root.chinese_chess_game.nextDoing();
            if (object.seatId != null)
                message.seatId = object.seatId | 0;
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            if (object.teamType != null)
                message.teamType = object.teamType | 0;
            if (object.canMoveList) {
                if (!Array.isArray(object.canMoveList))
                    throw TypeError(".chinese_chess_game.nextDoing.canMoveList: array expected");
                message.canMoveList = [];
                for (var i = 0; i < object.canMoveList.length; ++i) {
                    if (typeof object.canMoveList[i] !== "object")
                        throw TypeError(".chinese_chess_game.nextDoing.canMoveList: object expected");
                    message.canMoveList[i] = $root.chinese_chess_game.chessCanMove.fromObject(object.canMoveList[i]);
                }
            }
            if (object.remainTotalTime != null)
                message.remainTotalTime = object.remainTotalTime | 0;
            if (object.remainOnceTime != null)
                message.remainOnceTime = object.remainOnceTime | 0;
            return message;
        };

        /**
         * Creates a plain object from a nextDoing message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chinese_chess_game.nextDoing
         * @static
         * @param {chinese_chess_game.nextDoing} message nextDoing
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        nextDoing.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.canMoveList = [];
            if (options.defaults) {
                object.seatId = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
                object.teamType = 0;
                object.remainTotalTime = 0;
                object.remainOnceTime = 0;
            }
            if (message.seatId != null && message.hasOwnProperty("seatId"))
                object.seatId = message.seatId;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            if (message.teamType != null && message.hasOwnProperty("teamType"))
                object.teamType = message.teamType;
            if (message.canMoveList && message.canMoveList.length) {
                object.canMoveList = [];
                for (var j = 0; j < message.canMoveList.length; ++j)
                    object.canMoveList[j] = $root.chinese_chess_game.chessCanMove.toObject(message.canMoveList[j], options);
            }
            if (message.remainTotalTime != null && message.hasOwnProperty("remainTotalTime"))
                object.remainTotalTime = message.remainTotalTime;
            if (message.remainOnceTime != null && message.hasOwnProperty("remainOnceTime"))
                object.remainOnceTime = message.remainOnceTime;
            return object;
        };

        /**
         * Converts this nextDoing to JSON.
         * @function toJSON
         * @memberof chinese_chess_game.nextDoing
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        nextDoing.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for nextDoing
         * @function getTypeUrl
         * @memberof chinese_chess_game.nextDoing
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        nextDoing.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chinese_chess_game.nextDoing";
        };

        return nextDoing;
    })();

    chinese_chess_game.gameStateRes = (function() {

        /**
         * Properties of a gameStateRes.
         * @memberof chinese_chess_game
         * @interface IgameStateRes
         * @property {number|null} [state] gameStateRes state
         * @property {Array.<chinese_chess_game.IplayerInfo>|null} [playerList] gameStateRes playerList
         * @property {Array.<chinese_chess_game.IoneChess>|null} [chessList] gameStateRes chessList
         * @property {chinese_chess_game.InextDoing|null} [nextDoing] gameStateRes nextDoing
         * @property {number|Long|null} [winPlayerId] gameStateRes winPlayerId
         */

        /**
         * Constructs a new gameStateRes.
         * @memberof chinese_chess_game
         * @classdesc Represents a gameStateRes.
         * @implements IgameStateRes
         * @constructor
         * @param {chinese_chess_game.IgameStateRes=} [properties] Properties to set
         */
        function gameStateRes(properties) {
            this.playerList = [];
            this.chessList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * gameStateRes state.
         * @member {number} state
         * @memberof chinese_chess_game.gameStateRes
         * @instance
         */
        gameStateRes.prototype.state = 0;

        /**
         * gameStateRes playerList.
         * @member {Array.<chinese_chess_game.IplayerInfo>} playerList
         * @memberof chinese_chess_game.gameStateRes
         * @instance
         */
        gameStateRes.prototype.playerList = $util.emptyArray;

        /**
         * gameStateRes chessList.
         * @member {Array.<chinese_chess_game.IoneChess>} chessList
         * @memberof chinese_chess_game.gameStateRes
         * @instance
         */
        gameStateRes.prototype.chessList = $util.emptyArray;

        /**
         * gameStateRes nextDoing.
         * @member {chinese_chess_game.InextDoing|null|undefined} nextDoing
         * @memberof chinese_chess_game.gameStateRes
         * @instance
         */
        gameStateRes.prototype.nextDoing = null;

        /**
         * gameStateRes winPlayerId.
         * @member {number|Long} winPlayerId
         * @memberof chinese_chess_game.gameStateRes
         * @instance
         */
        gameStateRes.prototype.winPlayerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new gameStateRes instance using the specified properties.
         * @function create
         * @memberof chinese_chess_game.gameStateRes
         * @static
         * @param {chinese_chess_game.IgameStateRes=} [properties] Properties to set
         * @returns {chinese_chess_game.gameStateRes} gameStateRes instance
         */
        gameStateRes.create = function create(properties) {
            return new gameStateRes(properties);
        };

        /**
         * Encodes the specified gameStateRes message. Does not implicitly {@link chinese_chess_game.gameStateRes.verify|verify} messages.
         * @function encode
         * @memberof chinese_chess_game.gameStateRes
         * @static
         * @param {chinese_chess_game.IgameStateRes} message gameStateRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        gameStateRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
            if (message.playerList != null && message.playerList.length)
                for (var i = 0; i < message.playerList.length; ++i)
                    $root.chinese_chess_game.playerInfo.encode(message.playerList[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.chessList != null && message.chessList.length)
                for (var i = 0; i < message.chessList.length; ++i)
                    $root.chinese_chess_game.oneChess.encode(message.chessList[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.nextDoing != null && Object.hasOwnProperty.call(message, "nextDoing"))
                $root.chinese_chess_game.nextDoing.encode(message.nextDoing, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.winPlayerId != null && Object.hasOwnProperty.call(message, "winPlayerId"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.winPlayerId);
            return writer;
        };

        /**
         * Encodes the specified gameStateRes message, length delimited. Does not implicitly {@link chinese_chess_game.gameStateRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chinese_chess_game.gameStateRes
         * @static
         * @param {chinese_chess_game.IgameStateRes} message gameStateRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        gameStateRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a gameStateRes message from the specified reader or buffer.
         * @function decode
         * @memberof chinese_chess_game.gameStateRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chinese_chess_game.gameStateRes} gameStateRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        gameStateRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chinese_chess_game.gameStateRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.state = reader.int32();
                        break;
                    }
                case 2: {
                        if (!(message.playerList && message.playerList.length))
                            message.playerList = [];
                        message.playerList.push($root.chinese_chess_game.playerInfo.decode(reader, reader.uint32()));
                        break;
                    }
                case 3: {
                        if (!(message.chessList && message.chessList.length))
                            message.chessList = [];
                        message.chessList.push($root.chinese_chess_game.oneChess.decode(reader, reader.uint32()));
                        break;
                    }
                case 4: {
                        message.nextDoing = $root.chinese_chess_game.nextDoing.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.winPlayerId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a gameStateRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chinese_chess_game.gameStateRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chinese_chess_game.gameStateRes} gameStateRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        gameStateRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a gameStateRes message.
         * @function verify
         * @memberof chinese_chess_game.gameStateRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        gameStateRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.state != null && message.hasOwnProperty("state"))
                if (!$util.isInteger(message.state))
                    return "state: integer expected";
            if (message.playerList != null && message.hasOwnProperty("playerList")) {
                if (!Array.isArray(message.playerList))
                    return "playerList: array expected";
                for (var i = 0; i < message.playerList.length; ++i) {
                    var error = $root.chinese_chess_game.playerInfo.verify(message.playerList[i]);
                    if (error)
                        return "playerList." + error;
                }
            }
            if (message.chessList != null && message.hasOwnProperty("chessList")) {
                if (!Array.isArray(message.chessList))
                    return "chessList: array expected";
                for (var i = 0; i < message.chessList.length; ++i) {
                    var error = $root.chinese_chess_game.oneChess.verify(message.chessList[i]);
                    if (error)
                        return "chessList." + error;
                }
            }
            if (message.nextDoing != null && message.hasOwnProperty("nextDoing")) {
                var error = $root.chinese_chess_game.nextDoing.verify(message.nextDoing);
                if (error)
                    return "nextDoing." + error;
            }
            if (message.winPlayerId != null && message.hasOwnProperty("winPlayerId"))
                if (!$util.isInteger(message.winPlayerId) && !(message.winPlayerId && $util.isInteger(message.winPlayerId.low) && $util.isInteger(message.winPlayerId.high)))
                    return "winPlayerId: integer|Long expected";
            return null;
        };

        /**
         * Creates a gameStateRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chinese_chess_game.gameStateRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chinese_chess_game.gameStateRes} gameStateRes
         */
        gameStateRes.fromObject = function fromObject(object) {
            if (object instanceof $root.chinese_chess_game.gameStateRes)
                return object;
            var message = new $root.chinese_chess_game.gameStateRes();
            if (object.state != null)
                message.state = object.state | 0;
            if (object.playerList) {
                if (!Array.isArray(object.playerList))
                    throw TypeError(".chinese_chess_game.gameStateRes.playerList: array expected");
                message.playerList = [];
                for (var i = 0; i < object.playerList.length; ++i) {
                    if (typeof object.playerList[i] !== "object")
                        throw TypeError(".chinese_chess_game.gameStateRes.playerList: object expected");
                    message.playerList[i] = $root.chinese_chess_game.playerInfo.fromObject(object.playerList[i]);
                }
            }
            if (object.chessList) {
                if (!Array.isArray(object.chessList))
                    throw TypeError(".chinese_chess_game.gameStateRes.chessList: array expected");
                message.chessList = [];
                for (var i = 0; i < object.chessList.length; ++i) {
                    if (typeof object.chessList[i] !== "object")
                        throw TypeError(".chinese_chess_game.gameStateRes.chessList: object expected");
                    message.chessList[i] = $root.chinese_chess_game.oneChess.fromObject(object.chessList[i]);
                }
            }
            if (object.nextDoing != null) {
                if (typeof object.nextDoing !== "object")
                    throw TypeError(".chinese_chess_game.gameStateRes.nextDoing: object expected");
                message.nextDoing = $root.chinese_chess_game.nextDoing.fromObject(object.nextDoing);
            }
            if (object.winPlayerId != null)
                if ($util.Long)
                    (message.winPlayerId = $util.Long.fromValue(object.winPlayerId)).unsigned = false;
                else if (typeof object.winPlayerId === "string")
                    message.winPlayerId = parseInt(object.winPlayerId, 10);
                else if (typeof object.winPlayerId === "number")
                    message.winPlayerId = object.winPlayerId;
                else if (typeof object.winPlayerId === "object")
                    message.winPlayerId = new $util.LongBits(object.winPlayerId.low >>> 0, object.winPlayerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a gameStateRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chinese_chess_game.gameStateRes
         * @static
         * @param {chinese_chess_game.gameStateRes} message gameStateRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        gameStateRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.playerList = [];
                object.chessList = [];
            }
            if (options.defaults) {
                object.state = 0;
                object.nextDoing = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.winPlayerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.winPlayerId = options.longs === String ? "0" : 0;
            }
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = message.state;
            if (message.playerList && message.playerList.length) {
                object.playerList = [];
                for (var j = 0; j < message.playerList.length; ++j)
                    object.playerList[j] = $root.chinese_chess_game.playerInfo.toObject(message.playerList[j], options);
            }
            if (message.chessList && message.chessList.length) {
                object.chessList = [];
                for (var j = 0; j < message.chessList.length; ++j)
                    object.chessList[j] = $root.chinese_chess_game.oneChess.toObject(message.chessList[j], options);
            }
            if (message.nextDoing != null && message.hasOwnProperty("nextDoing"))
                object.nextDoing = $root.chinese_chess_game.nextDoing.toObject(message.nextDoing, options);
            if (message.winPlayerId != null && message.hasOwnProperty("winPlayerId"))
                if (typeof message.winPlayerId === "number")
                    object.winPlayerId = options.longs === String ? String(message.winPlayerId) : message.winPlayerId;
                else
                    object.winPlayerId = options.longs === String ? $util.Long.prototype.toString.call(message.winPlayerId) : options.longs === Number ? new $util.LongBits(message.winPlayerId.low >>> 0, message.winPlayerId.high >>> 0).toNumber() : message.winPlayerId;
            return object;
        };

        /**
         * Converts this gameStateRes to JSON.
         * @function toJSON
         * @memberof chinese_chess_game.gameStateRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        gameStateRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for gameStateRes
         * @function getTypeUrl
         * @memberof chinese_chess_game.gameStateRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        gameStateRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chinese_chess_game.gameStateRes";
        };

        return gameStateRes;
    })();

    chinese_chess_game.moveReq = (function() {

        /**
         * Properties of a moveReq.
         * @memberof chinese_chess_game
         * @interface ImoveReq
         * @property {number|null} [chessId] moveReq chessId
         * @property {number|null} [moveRow] moveReq moveRow
         * @property {number|null} [moveCol] moveReq moveCol
         */

        /**
         * Constructs a new moveReq.
         * @memberof chinese_chess_game
         * @classdesc Represents a moveReq.
         * @implements ImoveReq
         * @constructor
         * @param {chinese_chess_game.ImoveReq=} [properties] Properties to set
         */
        function moveReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * moveReq chessId.
         * @member {number} chessId
         * @memberof chinese_chess_game.moveReq
         * @instance
         */
        moveReq.prototype.chessId = 0;

        /**
         * moveReq moveRow.
         * @member {number} moveRow
         * @memberof chinese_chess_game.moveReq
         * @instance
         */
        moveReq.prototype.moveRow = 0;

        /**
         * moveReq moveCol.
         * @member {number} moveCol
         * @memberof chinese_chess_game.moveReq
         * @instance
         */
        moveReq.prototype.moveCol = 0;

        /**
         * Creates a new moveReq instance using the specified properties.
         * @function create
         * @memberof chinese_chess_game.moveReq
         * @static
         * @param {chinese_chess_game.ImoveReq=} [properties] Properties to set
         * @returns {chinese_chess_game.moveReq} moveReq instance
         */
        moveReq.create = function create(properties) {
            return new moveReq(properties);
        };

        /**
         * Encodes the specified moveReq message. Does not implicitly {@link chinese_chess_game.moveReq.verify|verify} messages.
         * @function encode
         * @memberof chinese_chess_game.moveReq
         * @static
         * @param {chinese_chess_game.ImoveReq} message moveReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        moveReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chessId != null && Object.hasOwnProperty.call(message, "chessId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chessId);
            if (message.moveRow != null && Object.hasOwnProperty.call(message, "moveRow"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.moveRow);
            if (message.moveCol != null && Object.hasOwnProperty.call(message, "moveCol"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.moveCol);
            return writer;
        };

        /**
         * Encodes the specified moveReq message, length delimited. Does not implicitly {@link chinese_chess_game.moveReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chinese_chess_game.moveReq
         * @static
         * @param {chinese_chess_game.ImoveReq} message moveReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        moveReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a moveReq message from the specified reader or buffer.
         * @function decode
         * @memberof chinese_chess_game.moveReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chinese_chess_game.moveReq} moveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        moveReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chinese_chess_game.moveReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.chessId = reader.int32();
                        break;
                    }
                case 2: {
                        message.moveRow = reader.int32();
                        break;
                    }
                case 3: {
                        message.moveCol = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a moveReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chinese_chess_game.moveReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chinese_chess_game.moveReq} moveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        moveReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a moveReq message.
         * @function verify
         * @memberof chinese_chess_game.moveReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        moveReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chessId != null && message.hasOwnProperty("chessId"))
                if (!$util.isInteger(message.chessId))
                    return "chessId: integer expected";
            if (message.moveRow != null && message.hasOwnProperty("moveRow"))
                if (!$util.isInteger(message.moveRow))
                    return "moveRow: integer expected";
            if (message.moveCol != null && message.hasOwnProperty("moveCol"))
                if (!$util.isInteger(message.moveCol))
                    return "moveCol: integer expected";
            return null;
        };

        /**
         * Creates a moveReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chinese_chess_game.moveReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chinese_chess_game.moveReq} moveReq
         */
        moveReq.fromObject = function fromObject(object) {
            if (object instanceof $root.chinese_chess_game.moveReq)
                return object;
            var message = new $root.chinese_chess_game.moveReq();
            if (object.chessId != null)
                message.chessId = object.chessId | 0;
            if (object.moveRow != null)
                message.moveRow = object.moveRow | 0;
            if (object.moveCol != null)
                message.moveCol = object.moveCol | 0;
            return message;
        };

        /**
         * Creates a plain object from a moveReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chinese_chess_game.moveReq
         * @static
         * @param {chinese_chess_game.moveReq} message moveReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        moveReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.chessId = 0;
                object.moveRow = 0;
                object.moveCol = 0;
            }
            if (message.chessId != null && message.hasOwnProperty("chessId"))
                object.chessId = message.chessId;
            if (message.moveRow != null && message.hasOwnProperty("moveRow"))
                object.moveRow = message.moveRow;
            if (message.moveCol != null && message.hasOwnProperty("moveCol"))
                object.moveCol = message.moveCol;
            return object;
        };

        /**
         * Converts this moveReq to JSON.
         * @function toJSON
         * @memberof chinese_chess_game.moveReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        moveReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for moveReq
         * @function getTypeUrl
         * @memberof chinese_chess_game.moveReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        moveReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chinese_chess_game.moveReq";
        };

        return moveReq;
    })();

    chinese_chess_game.moveRes = (function() {

        /**
         * Properties of a moveRes.
         * @memberof chinese_chess_game
         * @interface ImoveRes
         * @property {number|null} [chessId] moveRes chessId
         * @property {number|null} [moveRow] moveRes moveRow
         * @property {number|null} [moveCol] moveRes moveCol
         */

        /**
         * Constructs a new moveRes.
         * @memberof chinese_chess_game
         * @classdesc Represents a moveRes.
         * @implements ImoveRes
         * @constructor
         * @param {chinese_chess_game.ImoveRes=} [properties] Properties to set
         */
        function moveRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * moveRes chessId.
         * @member {number} chessId
         * @memberof chinese_chess_game.moveRes
         * @instance
         */
        moveRes.prototype.chessId = 0;

        /**
         * moveRes moveRow.
         * @member {number} moveRow
         * @memberof chinese_chess_game.moveRes
         * @instance
         */
        moveRes.prototype.moveRow = 0;

        /**
         * moveRes moveCol.
         * @member {number} moveCol
         * @memberof chinese_chess_game.moveRes
         * @instance
         */
        moveRes.prototype.moveCol = 0;

        /**
         * Creates a new moveRes instance using the specified properties.
         * @function create
         * @memberof chinese_chess_game.moveRes
         * @static
         * @param {chinese_chess_game.ImoveRes=} [properties] Properties to set
         * @returns {chinese_chess_game.moveRes} moveRes instance
         */
        moveRes.create = function create(properties) {
            return new moveRes(properties);
        };

        /**
         * Encodes the specified moveRes message. Does not implicitly {@link chinese_chess_game.moveRes.verify|verify} messages.
         * @function encode
         * @memberof chinese_chess_game.moveRes
         * @static
         * @param {chinese_chess_game.ImoveRes} message moveRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        moveRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.chessId != null && Object.hasOwnProperty.call(message, "chessId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.chessId);
            if (message.moveRow != null && Object.hasOwnProperty.call(message, "moveRow"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.moveRow);
            if (message.moveCol != null && Object.hasOwnProperty.call(message, "moveCol"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.moveCol);
            return writer;
        };

        /**
         * Encodes the specified moveRes message, length delimited. Does not implicitly {@link chinese_chess_game.moveRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chinese_chess_game.moveRes
         * @static
         * @param {chinese_chess_game.ImoveRes} message moveRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        moveRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a moveRes message from the specified reader or buffer.
         * @function decode
         * @memberof chinese_chess_game.moveRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chinese_chess_game.moveRes} moveRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        moveRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chinese_chess_game.moveRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.chessId = reader.int32();
                        break;
                    }
                case 2: {
                        message.moveRow = reader.int32();
                        break;
                    }
                case 3: {
                        message.moveCol = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a moveRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chinese_chess_game.moveRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chinese_chess_game.moveRes} moveRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        moveRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a moveRes message.
         * @function verify
         * @memberof chinese_chess_game.moveRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        moveRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.chessId != null && message.hasOwnProperty("chessId"))
                if (!$util.isInteger(message.chessId))
                    return "chessId: integer expected";
            if (message.moveRow != null && message.hasOwnProperty("moveRow"))
                if (!$util.isInteger(message.moveRow))
                    return "moveRow: integer expected";
            if (message.moveCol != null && message.hasOwnProperty("moveCol"))
                if (!$util.isInteger(message.moveCol))
                    return "moveCol: integer expected";
            return null;
        };

        /**
         * Creates a moveRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chinese_chess_game.moveRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chinese_chess_game.moveRes} moveRes
         */
        moveRes.fromObject = function fromObject(object) {
            if (object instanceof $root.chinese_chess_game.moveRes)
                return object;
            var message = new $root.chinese_chess_game.moveRes();
            if (object.chessId != null)
                message.chessId = object.chessId | 0;
            if (object.moveRow != null)
                message.moveRow = object.moveRow | 0;
            if (object.moveCol != null)
                message.moveCol = object.moveCol | 0;
            return message;
        };

        /**
         * Creates a plain object from a moveRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chinese_chess_game.moveRes
         * @static
         * @param {chinese_chess_game.moveRes} message moveRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        moveRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.chessId = 0;
                object.moveRow = 0;
                object.moveCol = 0;
            }
            if (message.chessId != null && message.hasOwnProperty("chessId"))
                object.chessId = message.chessId;
            if (message.moveRow != null && message.hasOwnProperty("moveRow"))
                object.moveRow = message.moveRow;
            if (message.moveCol != null && message.hasOwnProperty("moveCol"))
                object.moveCol = message.moveCol;
            return object;
        };

        /**
         * Converts this moveRes to JSON.
         * @function toJSON
         * @memberof chinese_chess_game.moveRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        moveRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for moveRes
         * @function getTypeUrl
         * @memberof chinese_chess_game.moveRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        moveRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chinese_chess_game.moveRes";
        };

        return moveRes;
    })();

    return chinese_chess_game;
})();

$root.errors = (function() {

    /**
     * Namespace errors.
     * @exports errors
     * @namespace
     */
    var errors = {};

    /**
     * main enum.
     * @name errors.main
     * @enum {number}
     * @property {number} errors=1 errors value
     */
    errors.main = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "errors"] = 1;
        return values;
    })();

    /**
     * sub enum.
     * @name errors.sub
     * @enum {number}
     * @property {number} Error=1 Error value
     */
    errors.sub = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "Error"] = 1;
        return values;
    })();

    errors.Error = (function() {

        /**
         * Properties of an Error.
         * @memberof errors
         * @interface IError
         * @property {number|null} [code] Error code
         * @property {string|null} [msg] Error msg
         * @property {number|null} [packId] Error packId
         */

        /**
         * Constructs a new Error.
         * @memberof errors
         * @classdesc Represents an Error.
         * @implements IError
         * @constructor
         * @param {errors.IError=} [properties] Properties to set
         */
        function Error(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Error code.
         * @member {number} code
         * @memberof errors.Error
         * @instance
         */
        Error.prototype.code = 0;

        /**
         * Error msg.
         * @member {string} msg
         * @memberof errors.Error
         * @instance
         */
        Error.prototype.msg = "";

        /**
         * Error packId.
         * @member {number} packId
         * @memberof errors.Error
         * @instance
         */
        Error.prototype.packId = 0;

        /**
         * Creates a new Error instance using the specified properties.
         * @function create
         * @memberof errors.Error
         * @static
         * @param {errors.IError=} [properties] Properties to set
         * @returns {errors.Error} Error instance
         */
        Error.create = function create(properties) {
            return new Error(properties);
        };

        /**
         * Encodes the specified Error message. Does not implicitly {@link errors.Error.verify|verify} messages.
         * @function encode
         * @memberof errors.Error
         * @static
         * @param {errors.IError} message Error message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Error.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            if (message.packId != null && Object.hasOwnProperty.call(message, "packId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.packId);
            return writer;
        };

        /**
         * Encodes the specified Error message, length delimited. Does not implicitly {@link errors.Error.verify|verify} messages.
         * @function encodeDelimited
         * @memberof errors.Error
         * @static
         * @param {errors.IError} message Error message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Error.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Error message from the specified reader or buffer.
         * @function decode
         * @memberof errors.Error
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {errors.Error} Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Error.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.errors.Error();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.code = reader.int32();
                        break;
                    }
                case 2: {
                        message.msg = reader.string();
                        break;
                    }
                case 3: {
                        message.packId = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Error message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof errors.Error
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {errors.Error} Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Error.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Error message.
         * @function verify
         * @memberof errors.Error
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Error.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            if (message.packId != null && message.hasOwnProperty("packId"))
                if (!$util.isInteger(message.packId))
                    return "packId: integer expected";
            return null;
        };

        /**
         * Creates an Error message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof errors.Error
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {errors.Error} Error
         */
        Error.fromObject = function fromObject(object) {
            if (object instanceof $root.errors.Error)
                return object;
            var message = new $root.errors.Error();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.msg != null)
                message.msg = String(object.msg);
            if (object.packId != null)
                message.packId = object.packId | 0;
            return message;
        };

        /**
         * Creates a plain object from an Error message. Also converts values to other types if specified.
         * @function toObject
         * @memberof errors.Error
         * @static
         * @param {errors.Error} message Error
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Error.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.msg = "";
                object.packId = 0;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            if (message.packId != null && message.hasOwnProperty("packId"))
                object.packId = message.packId;
            return object;
        };

        /**
         * Converts this Error to JSON.
         * @function toJSON
         * @memberof errors.Error
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Error.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Error
         * @function getTypeUrl
         * @memberof errors.Error
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Error.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/errors.Error";
        };

        return Error;
    })();

    return errors;
})();

$root.login = (function() {

    /**
     * Namespace login.
     * @exports login
     * @namespace
     */
    var login = {};

    /**
     * main enum.
     * @name login.main
     * @enum {number}
     * @property {number} login=2 login value
     */
    login.main = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[2] = "login"] = 2;
        return values;
    })();

    /**
     * sub enum.
     * @name login.sub
     * @enum {number}
     * @property {number} LoginReq=1 LoginReq value
     * @property {number} LoginRes=2 LoginRes value
     * @property {number} HeartReq=3 HeartReq value
     * @property {number} HeartRes=4 HeartRes value
     */
    login.sub = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "LoginReq"] = 1;
        values[valuesById[2] = "LoginRes"] = 2;
        values[valuesById[3] = "HeartReq"] = 3;
        values[valuesById[4] = "HeartRes"] = 4;
        return values;
    })();

    login.LoginReq = (function() {

        /**
         * Properties of a LoginReq.
         * @memberof login
         * @interface ILoginReq
         * @property {string|null} [token] LoginReq token
         * @property {number|Long|null} [playerId] LoginReq playerId
         */

        /**
         * Constructs a new LoginReq.
         * @memberof login
         * @classdesc Represents a LoginReq.
         * @implements ILoginReq
         * @constructor
         * @param {login.ILoginReq=} [properties] Properties to set
         */
        function LoginReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginReq token.
         * @member {string} token
         * @memberof login.LoginReq
         * @instance
         */
        LoginReq.prototype.token = "";

        /**
         * LoginReq playerId.
         * @member {number|Long} playerId
         * @memberof login.LoginReq
         * @instance
         */
        LoginReq.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new LoginReq instance using the specified properties.
         * @function create
         * @memberof login.LoginReq
         * @static
         * @param {login.ILoginReq=} [properties] Properties to set
         * @returns {login.LoginReq} LoginReq instance
         */
        LoginReq.create = function create(properties) {
            return new LoginReq(properties);
        };

        /**
         * Encodes the specified LoginReq message. Does not implicitly {@link login.LoginReq.verify|verify} messages.
         * @function encode
         * @memberof login.LoginReq
         * @static
         * @param {login.ILoginReq} message LoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.playerId);
            return writer;
        };

        /**
         * Encodes the specified LoginReq message, length delimited. Does not implicitly {@link login.LoginReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof login.LoginReq
         * @static
         * @param {login.ILoginReq} message LoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginReq message from the specified reader or buffer.
         * @function decode
         * @memberof login.LoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {login.LoginReq} LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.login.LoginReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.token = reader.string();
                        break;
                    }
                case 2: {
                        message.playerId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof login.LoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {login.LoginReq} LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginReq message.
         * @function verify
         * @memberof login.LoginReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            return null;
        };

        /**
         * Creates a LoginReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof login.LoginReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {login.LoginReq} LoginReq
         */
        LoginReq.fromObject = function fromObject(object) {
            if (object instanceof $root.login.LoginReq)
                return object;
            var message = new $root.login.LoginReq();
            if (object.token != null)
                message.token = String(object.token);
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a LoginReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof login.LoginReq
         * @static
         * @param {login.LoginReq} message LoginReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.token = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
            }
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            return object;
        };

        /**
         * Converts this LoginReq to JSON.
         * @function toJSON
         * @memberof login.LoginReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for LoginReq
         * @function getTypeUrl
         * @memberof login.LoginReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        LoginReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/login.LoginReq";
        };

        return LoginReq;
    })();

    login.LoginRes = (function() {

        /**
         * Properties of a LoginRes.
         * @memberof login
         * @interface ILoginRes
         * @property {number|null} [isreconnect] LoginRes isreconnect
         */

        /**
         * Constructs a new LoginRes.
         * @memberof login
         * @classdesc Represents a LoginRes.
         * @implements ILoginRes
         * @constructor
         * @param {login.ILoginRes=} [properties] Properties to set
         */
        function LoginRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginRes isreconnect.
         * @member {number} isreconnect
         * @memberof login.LoginRes
         * @instance
         */
        LoginRes.prototype.isreconnect = 0;

        /**
         * Creates a new LoginRes instance using the specified properties.
         * @function create
         * @memberof login.LoginRes
         * @static
         * @param {login.ILoginRes=} [properties] Properties to set
         * @returns {login.LoginRes} LoginRes instance
         */
        LoginRes.create = function create(properties) {
            return new LoginRes(properties);
        };

        /**
         * Encodes the specified LoginRes message. Does not implicitly {@link login.LoginRes.verify|verify} messages.
         * @function encode
         * @memberof login.LoginRes
         * @static
         * @param {login.ILoginRes} message LoginRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.isreconnect != null && Object.hasOwnProperty.call(message, "isreconnect"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.isreconnect);
            return writer;
        };

        /**
         * Encodes the specified LoginRes message, length delimited. Does not implicitly {@link login.LoginRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof login.LoginRes
         * @static
         * @param {login.ILoginRes} message LoginRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginRes message from the specified reader or buffer.
         * @function decode
         * @memberof login.LoginRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {login.LoginRes} LoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.login.LoginRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.isreconnect = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof login.LoginRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {login.LoginRes} LoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginRes message.
         * @function verify
         * @memberof login.LoginRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.isreconnect != null && message.hasOwnProperty("isreconnect"))
                if (!$util.isInteger(message.isreconnect))
                    return "isreconnect: integer expected";
            return null;
        };

        /**
         * Creates a LoginRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof login.LoginRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {login.LoginRes} LoginRes
         */
        LoginRes.fromObject = function fromObject(object) {
            if (object instanceof $root.login.LoginRes)
                return object;
            var message = new $root.login.LoginRes();
            if (object.isreconnect != null)
                message.isreconnect = object.isreconnect | 0;
            return message;
        };

        /**
         * Creates a plain object from a LoginRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof login.LoginRes
         * @static
         * @param {login.LoginRes} message LoginRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.isreconnect = 0;
            if (message.isreconnect != null && message.hasOwnProperty("isreconnect"))
                object.isreconnect = message.isreconnect;
            return object;
        };

        /**
         * Converts this LoginRes to JSON.
         * @function toJSON
         * @memberof login.LoginRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for LoginRes
         * @function getTypeUrl
         * @memberof login.LoginRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        LoginRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/login.LoginRes";
        };

        return LoginRes;
    })();

    login.HeartReq = (function() {

        /**
         * Properties of a HeartReq.
         * @memberof login
         * @interface IHeartReq
         * @property {number|Long|null} [time] HeartReq time
         */

        /**
         * Constructs a new HeartReq.
         * @memberof login
         * @classdesc Represents a HeartReq.
         * @implements IHeartReq
         * @constructor
         * @param {login.IHeartReq=} [properties] Properties to set
         */
        function HeartReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HeartReq time.
         * @member {number|Long} time
         * @memberof login.HeartReq
         * @instance
         */
        HeartReq.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new HeartReq instance using the specified properties.
         * @function create
         * @memberof login.HeartReq
         * @static
         * @param {login.IHeartReq=} [properties] Properties to set
         * @returns {login.HeartReq} HeartReq instance
         */
        HeartReq.create = function create(properties) {
            return new HeartReq(properties);
        };

        /**
         * Encodes the specified HeartReq message. Does not implicitly {@link login.HeartReq.verify|verify} messages.
         * @function encode
         * @memberof login.HeartReq
         * @static
         * @param {login.IHeartReq} message HeartReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.time);
            return writer;
        };

        /**
         * Encodes the specified HeartReq message, length delimited. Does not implicitly {@link login.HeartReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof login.HeartReq
         * @static
         * @param {login.IHeartReq} message HeartReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeartReq message from the specified reader or buffer.
         * @function decode
         * @memberof login.HeartReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {login.HeartReq} HeartReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.login.HeartReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.time = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeartReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof login.HeartReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {login.HeartReq} HeartReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeartReq message.
         * @function verify
         * @memberof login.HeartReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeartReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            return null;
        };

        /**
         * Creates a HeartReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof login.HeartReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {login.HeartReq} HeartReq
         */
        HeartReq.fromObject = function fromObject(object) {
            if (object instanceof $root.login.HeartReq)
                return object;
            var message = new $root.login.HeartReq();
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a HeartReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof login.HeartReq
         * @static
         * @param {login.HeartReq} message HeartReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HeartReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            return object;
        };

        /**
         * Converts this HeartReq to JSON.
         * @function toJSON
         * @memberof login.HeartReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HeartReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for HeartReq
         * @function getTypeUrl
         * @memberof login.HeartReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        HeartReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/login.HeartReq";
        };

        return HeartReq;
    })();

    login.HeartRes = (function() {

        /**
         * Properties of a HeartRes.
         * @memberof login
         * @interface IHeartRes
         * @property {number|Long|null} [time] HeartRes time
         */

        /**
         * Constructs a new HeartRes.
         * @memberof login
         * @classdesc Represents a HeartRes.
         * @implements IHeartRes
         * @constructor
         * @param {login.IHeartRes=} [properties] Properties to set
         */
        function HeartRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HeartRes time.
         * @member {number|Long} time
         * @memberof login.HeartRes
         * @instance
         */
        HeartRes.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new HeartRes instance using the specified properties.
         * @function create
         * @memberof login.HeartRes
         * @static
         * @param {login.IHeartRes=} [properties] Properties to set
         * @returns {login.HeartRes} HeartRes instance
         */
        HeartRes.create = function create(properties) {
            return new HeartRes(properties);
        };

        /**
         * Encodes the specified HeartRes message. Does not implicitly {@link login.HeartRes.verify|verify} messages.
         * @function encode
         * @memberof login.HeartRes
         * @static
         * @param {login.IHeartRes} message HeartRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.time);
            return writer;
        };

        /**
         * Encodes the specified HeartRes message, length delimited. Does not implicitly {@link login.HeartRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof login.HeartRes
         * @static
         * @param {login.IHeartRes} message HeartRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeartRes message from the specified reader or buffer.
         * @function decode
         * @memberof login.HeartRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {login.HeartRes} HeartRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.login.HeartRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 2: {
                        message.time = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeartRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof login.HeartRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {login.HeartRes} HeartRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeartRes message.
         * @function verify
         * @memberof login.HeartRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeartRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            return null;
        };

        /**
         * Creates a HeartRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof login.HeartRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {login.HeartRes} HeartRes
         */
        HeartRes.fromObject = function fromObject(object) {
            if (object instanceof $root.login.HeartRes)
                return object;
            var message = new $root.login.HeartRes();
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a HeartRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof login.HeartRes
         * @static
         * @param {login.HeartRes} message HeartRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HeartRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            return object;
        };

        /**
         * Converts this HeartRes to JSON.
         * @function toJSON
         * @memberof login.HeartRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HeartRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for HeartRes
         * @function getTypeUrl
         * @memberof login.HeartRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        HeartRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/login.HeartRes";
        };

        return HeartRes;
    })();

    return login;
})();

$root.common = (function() {

    /**
     * Namespace common.
     * @exports common
     * @namespace
     */
    var common = {};

    common.Item = (function() {

        /**
         * Properties of an Item.
         * @memberof common
         * @interface IItem
         * @property {number|Long|null} [id] Item id
         * @property {number|Long|null} [count] Item count
         */

        /**
         * Constructs a new Item.
         * @memberof common
         * @classdesc Represents an Item.
         * @implements IItem
         * @constructor
         * @param {common.IItem=} [properties] Properties to set
         */
        function Item(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Item id.
         * @member {number|Long} id
         * @memberof common.Item
         * @instance
         */
        Item.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Item count.
         * @member {number|Long} count
         * @memberof common.Item
         * @instance
         */
        Item.prototype.count = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Item instance using the specified properties.
         * @function create
         * @memberof common.Item
         * @static
         * @param {common.IItem=} [properties] Properties to set
         * @returns {common.Item} Item instance
         */
        Item.create = function create(properties) {
            return new Item(properties);
        };

        /**
         * Encodes the specified Item message. Does not implicitly {@link common.Item.verify|verify} messages.
         * @function encode
         * @memberof common.Item
         * @static
         * @param {common.IItem} message Item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Item.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.count);
            return writer;
        };

        /**
         * Encodes the specified Item message, length delimited. Does not implicitly {@link common.Item.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common.Item
         * @static
         * @param {common.IItem} message Item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Item.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Item message from the specified reader or buffer.
         * @function decode
         * @memberof common.Item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common.Item} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Item.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.Item();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int64();
                        break;
                    }
                case 2: {
                        message.count = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Item message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common.Item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common.Item} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Item.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Item message.
         * @function verify
         * @memberof common.Item
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Item.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                    return "count: integer|Long expected";
            return null;
        };

        /**
         * Creates an Item message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common.Item
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common.Item} Item
         */
        Item.fromObject = function fromObject(object) {
            if (object instanceof $root.common.Item)
                return object;
            var message = new $root.common.Item();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
            if (object.count != null)
                if ($util.Long)
                    (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                else if (typeof object.count === "string")
                    message.count = parseInt(object.count, 10);
                else if (typeof object.count === "number")
                    message.count = object.count;
                else if (typeof object.count === "object")
                    message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an Item message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common.Item
         * @static
         * @param {common.Item} message Item
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Item.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.count = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.count = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
            if (message.count != null && message.hasOwnProperty("count"))
                if (typeof message.count === "number")
                    object.count = options.longs === String ? String(message.count) : message.count;
                else
                    object.count = options.longs === String ? $util.Long.prototype.toString.call(message.count) : options.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
            return object;
        };

        /**
         * Converts this Item to JSON.
         * @function toJSON
         * @memberof common.Item
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Item.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Item
         * @function getTypeUrl
         * @memberof common.Item
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Item.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/common.Item";
        };

        return Item;
    })();

    return common;
})();

$root.digitalbomb_game = (function() {

    /**
     * Namespace digitalbomb_game.
     * @exports digitalbomb_game
     * @namespace
     */
    var digitalbomb_game = {};

    /**
     * main enum.
     * @name digitalbomb_game.main
     * @enum {number}
     * @property {number} digitalbomb_game=101 digitalbomb_game value
     */
    digitalbomb_game.main = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[101] = "digitalbomb_game"] = 101;
        return values;
    })();

    /**
     * sub enum.
     * @name digitalbomb_game.sub
     * @enum {number}
     * @property {number} GameStatusReq=1 GameStatusReq value
     * @property {number} GameStatusRes=2 GameStatusRes value
     * @property {number} DoingReq=3 DoingReq value
     * @property {number} EnterCast=80 EnterCast value
     * @property {number} GameStartCast=81 GameStartCast value
     * @property {number} NextDoingCast=82 NextDoingCast value
     * @property {number} GameOverCast=83 GameOverCast value
     * @property {number} LeaveCast=84 LeaveCast value
     * @property {number} DoingCast=85 DoingCast value
     */
    digitalbomb_game.sub = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "GameStatusReq"] = 1;
        values[valuesById[2] = "GameStatusRes"] = 2;
        values[valuesById[3] = "DoingReq"] = 3;
        values[valuesById[80] = "EnterCast"] = 80;
        values[valuesById[81] = "GameStartCast"] = 81;
        values[valuesById[82] = "NextDoingCast"] = 82;
        values[valuesById[83] = "GameOverCast"] = 83;
        values[valuesById[84] = "LeaveCast"] = 84;
        values[valuesById[85] = "DoingCast"] = 85;
        return values;
    })();

    digitalbomb_game.EnterCast = (function() {

        /**
         * Properties of an EnterCast.
         * @memberof digitalbomb_game
         * @interface IEnterCast
         * @property {number|Long|null} [playerId] EnterCast playerId
         * @property {number|null} [seatId] EnterCast seatId
         * @property {string|null} [nickname] EnterCast nickname
         */

        /**
         * Constructs a new EnterCast.
         * @memberof digitalbomb_game
         * @classdesc Represents an EnterCast.
         * @implements IEnterCast
         * @constructor
         * @param {digitalbomb_game.IEnterCast=} [properties] Properties to set
         */
        function EnterCast(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterCast playerId.
         * @member {number|Long} playerId
         * @memberof digitalbomb_game.EnterCast
         * @instance
         */
        EnterCast.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * EnterCast seatId.
         * @member {number} seatId
         * @memberof digitalbomb_game.EnterCast
         * @instance
         */
        EnterCast.prototype.seatId = 0;

        /**
         * EnterCast nickname.
         * @member {string} nickname
         * @memberof digitalbomb_game.EnterCast
         * @instance
         */
        EnterCast.prototype.nickname = "";

        /**
         * Creates a new EnterCast instance using the specified properties.
         * @function create
         * @memberof digitalbomb_game.EnterCast
         * @static
         * @param {digitalbomb_game.IEnterCast=} [properties] Properties to set
         * @returns {digitalbomb_game.EnterCast} EnterCast instance
         */
        EnterCast.create = function create(properties) {
            return new EnterCast(properties);
        };

        /**
         * Encodes the specified EnterCast message. Does not implicitly {@link digitalbomb_game.EnterCast.verify|verify} messages.
         * @function encode
         * @memberof digitalbomb_game.EnterCast
         * @static
         * @param {digitalbomb_game.IEnterCast} message EnterCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterCast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            if (message.seatId != null && Object.hasOwnProperty.call(message, "seatId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.seatId);
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.nickname);
            return writer;
        };

        /**
         * Encodes the specified EnterCast message, length delimited. Does not implicitly {@link digitalbomb_game.EnterCast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof digitalbomb_game.EnterCast
         * @static
         * @param {digitalbomb_game.IEnterCast} message EnterCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterCast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnterCast message from the specified reader or buffer.
         * @function decode
         * @memberof digitalbomb_game.EnterCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {digitalbomb_game.EnterCast} EnterCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterCast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.digitalbomb_game.EnterCast();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                case 2: {
                        message.seatId = reader.int32();
                        break;
                    }
                case 3: {
                        message.nickname = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnterCast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof digitalbomb_game.EnterCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {digitalbomb_game.EnterCast} EnterCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterCast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnterCast message.
         * @function verify
         * @memberof digitalbomb_game.EnterCast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnterCast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            if (message.seatId != null && message.hasOwnProperty("seatId"))
                if (!$util.isInteger(message.seatId))
                    return "seatId: integer expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            return null;
        };

        /**
         * Creates an EnterCast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof digitalbomb_game.EnterCast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {digitalbomb_game.EnterCast} EnterCast
         */
        EnterCast.fromObject = function fromObject(object) {
            if (object instanceof $root.digitalbomb_game.EnterCast)
                return object;
            var message = new $root.digitalbomb_game.EnterCast();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            if (object.seatId != null)
                message.seatId = object.seatId | 0;
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            return message;
        };

        /**
         * Creates a plain object from an EnterCast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof digitalbomb_game.EnterCast
         * @static
         * @param {digitalbomb_game.EnterCast} message EnterCast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnterCast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
                object.seatId = 0;
                object.nickname = "";
            }
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            if (message.seatId != null && message.hasOwnProperty("seatId"))
                object.seatId = message.seatId;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            return object;
        };

        /**
         * Converts this EnterCast to JSON.
         * @function toJSON
         * @memberof digitalbomb_game.EnterCast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnterCast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EnterCast
         * @function getTypeUrl
         * @memberof digitalbomb_game.EnterCast
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EnterCast.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/digitalbomb_game.EnterCast";
        };

        return EnterCast;
    })();

    digitalbomb_game.GameStartCast = (function() {

        /**
         * Properties of a GameStartCast.
         * @memberof digitalbomb_game
         * @interface IGameStartCast
         * @property {Array.<number>|null} [seatIdList] GameStartCast seatIdList
         */

        /**
         * Constructs a new GameStartCast.
         * @memberof digitalbomb_game
         * @classdesc Represents a GameStartCast.
         * @implements IGameStartCast
         * @constructor
         * @param {digitalbomb_game.IGameStartCast=} [properties] Properties to set
         */
        function GameStartCast(properties) {
            this.seatIdList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameStartCast seatIdList.
         * @member {Array.<number>} seatIdList
         * @memberof digitalbomb_game.GameStartCast
         * @instance
         */
        GameStartCast.prototype.seatIdList = $util.emptyArray;

        /**
         * Creates a new GameStartCast instance using the specified properties.
         * @function create
         * @memberof digitalbomb_game.GameStartCast
         * @static
         * @param {digitalbomb_game.IGameStartCast=} [properties] Properties to set
         * @returns {digitalbomb_game.GameStartCast} GameStartCast instance
         */
        GameStartCast.create = function create(properties) {
            return new GameStartCast(properties);
        };

        /**
         * Encodes the specified GameStartCast message. Does not implicitly {@link digitalbomb_game.GameStartCast.verify|verify} messages.
         * @function encode
         * @memberof digitalbomb_game.GameStartCast
         * @static
         * @param {digitalbomb_game.IGameStartCast} message GameStartCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStartCast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seatIdList != null && message.seatIdList.length)
                for (var i = 0; i < message.seatIdList.length; ++i)
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seatIdList[i]);
            return writer;
        };

        /**
         * Encodes the specified GameStartCast message, length delimited. Does not implicitly {@link digitalbomb_game.GameStartCast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof digitalbomb_game.GameStartCast
         * @static
         * @param {digitalbomb_game.IGameStartCast} message GameStartCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStartCast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStartCast message from the specified reader or buffer.
         * @function decode
         * @memberof digitalbomb_game.GameStartCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {digitalbomb_game.GameStartCast} GameStartCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStartCast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.digitalbomb_game.GameStartCast();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.seatIdList && message.seatIdList.length))
                            message.seatIdList = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.seatIdList.push(reader.int32());
                        } else
                            message.seatIdList.push(reader.int32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameStartCast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof digitalbomb_game.GameStartCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {digitalbomb_game.GameStartCast} GameStartCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStartCast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameStartCast message.
         * @function verify
         * @memberof digitalbomb_game.GameStartCast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameStartCast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seatIdList != null && message.hasOwnProperty("seatIdList")) {
                if (!Array.isArray(message.seatIdList))
                    return "seatIdList: array expected";
                for (var i = 0; i < message.seatIdList.length; ++i)
                    if (!$util.isInteger(message.seatIdList[i]))
                        return "seatIdList: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a GameStartCast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof digitalbomb_game.GameStartCast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {digitalbomb_game.GameStartCast} GameStartCast
         */
        GameStartCast.fromObject = function fromObject(object) {
            if (object instanceof $root.digitalbomb_game.GameStartCast)
                return object;
            var message = new $root.digitalbomb_game.GameStartCast();
            if (object.seatIdList) {
                if (!Array.isArray(object.seatIdList))
                    throw TypeError(".digitalbomb_game.GameStartCast.seatIdList: array expected");
                message.seatIdList = [];
                for (var i = 0; i < object.seatIdList.length; ++i)
                    message.seatIdList[i] = object.seatIdList[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a GameStartCast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof digitalbomb_game.GameStartCast
         * @static
         * @param {digitalbomb_game.GameStartCast} message GameStartCast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameStartCast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.seatIdList = [];
            if (message.seatIdList && message.seatIdList.length) {
                object.seatIdList = [];
                for (var j = 0; j < message.seatIdList.length; ++j)
                    object.seatIdList[j] = message.seatIdList[j];
            }
            return object;
        };

        /**
         * Converts this GameStartCast to JSON.
         * @function toJSON
         * @memberof digitalbomb_game.GameStartCast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStartCast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameStartCast
         * @function getTypeUrl
         * @memberof digitalbomb_game.GameStartCast
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameStartCast.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/digitalbomb_game.GameStartCast";
        };

        return GameStartCast;
    })();

    digitalbomb_game.NextDoingCast = (function() {

        /**
         * Properties of a NextDoingCast.
         * @memberof digitalbomb_game
         * @interface INextDoingCast
         * @property {number|Long|null} [doingPlayerId] NextDoingCast doingPlayerId
         * @property {number|null} [doingSeatId] NextDoingCast doingSeatId
         * @property {number|null} [minNum] NextDoingCast minNum
         * @property {number|null} [maxNum] NextDoingCast maxNum
         */

        /**
         * Constructs a new NextDoingCast.
         * @memberof digitalbomb_game
         * @classdesc Represents a NextDoingCast.
         * @implements INextDoingCast
         * @constructor
         * @param {digitalbomb_game.INextDoingCast=} [properties] Properties to set
         */
        function NextDoingCast(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NextDoingCast doingPlayerId.
         * @member {number|Long} doingPlayerId
         * @memberof digitalbomb_game.NextDoingCast
         * @instance
         */
        NextDoingCast.prototype.doingPlayerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NextDoingCast doingSeatId.
         * @member {number} doingSeatId
         * @memberof digitalbomb_game.NextDoingCast
         * @instance
         */
        NextDoingCast.prototype.doingSeatId = 0;

        /**
         * NextDoingCast minNum.
         * @member {number} minNum
         * @memberof digitalbomb_game.NextDoingCast
         * @instance
         */
        NextDoingCast.prototype.minNum = 0;

        /**
         * NextDoingCast maxNum.
         * @member {number} maxNum
         * @memberof digitalbomb_game.NextDoingCast
         * @instance
         */
        NextDoingCast.prototype.maxNum = 0;

        /**
         * Creates a new NextDoingCast instance using the specified properties.
         * @function create
         * @memberof digitalbomb_game.NextDoingCast
         * @static
         * @param {digitalbomb_game.INextDoingCast=} [properties] Properties to set
         * @returns {digitalbomb_game.NextDoingCast} NextDoingCast instance
         */
        NextDoingCast.create = function create(properties) {
            return new NextDoingCast(properties);
        };

        /**
         * Encodes the specified NextDoingCast message. Does not implicitly {@link digitalbomb_game.NextDoingCast.verify|verify} messages.
         * @function encode
         * @memberof digitalbomb_game.NextDoingCast
         * @static
         * @param {digitalbomb_game.INextDoingCast} message NextDoingCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NextDoingCast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.doingPlayerId != null && Object.hasOwnProperty.call(message, "doingPlayerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.doingPlayerId);
            if (message.doingSeatId != null && Object.hasOwnProperty.call(message, "doingSeatId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.doingSeatId);
            if (message.minNum != null && Object.hasOwnProperty.call(message, "minNum"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.minNum);
            if (message.maxNum != null && Object.hasOwnProperty.call(message, "maxNum"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.maxNum);
            return writer;
        };

        /**
         * Encodes the specified NextDoingCast message, length delimited. Does not implicitly {@link digitalbomb_game.NextDoingCast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof digitalbomb_game.NextDoingCast
         * @static
         * @param {digitalbomb_game.INextDoingCast} message NextDoingCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NextDoingCast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NextDoingCast message from the specified reader or buffer.
         * @function decode
         * @memberof digitalbomb_game.NextDoingCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {digitalbomb_game.NextDoingCast} NextDoingCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NextDoingCast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.digitalbomb_game.NextDoingCast();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.doingPlayerId = reader.int64();
                        break;
                    }
                case 2: {
                        message.doingSeatId = reader.int32();
                        break;
                    }
                case 3: {
                        message.minNum = reader.int32();
                        break;
                    }
                case 4: {
                        message.maxNum = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NextDoingCast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof digitalbomb_game.NextDoingCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {digitalbomb_game.NextDoingCast} NextDoingCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NextDoingCast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NextDoingCast message.
         * @function verify
         * @memberof digitalbomb_game.NextDoingCast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NextDoingCast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.doingPlayerId != null && message.hasOwnProperty("doingPlayerId"))
                if (!$util.isInteger(message.doingPlayerId) && !(message.doingPlayerId && $util.isInteger(message.doingPlayerId.low) && $util.isInteger(message.doingPlayerId.high)))
                    return "doingPlayerId: integer|Long expected";
            if (message.doingSeatId != null && message.hasOwnProperty("doingSeatId"))
                if (!$util.isInteger(message.doingSeatId))
                    return "doingSeatId: integer expected";
            if (message.minNum != null && message.hasOwnProperty("minNum"))
                if (!$util.isInteger(message.minNum))
                    return "minNum: integer expected";
            if (message.maxNum != null && message.hasOwnProperty("maxNum"))
                if (!$util.isInteger(message.maxNum))
                    return "maxNum: integer expected";
            return null;
        };

        /**
         * Creates a NextDoingCast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof digitalbomb_game.NextDoingCast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {digitalbomb_game.NextDoingCast} NextDoingCast
         */
        NextDoingCast.fromObject = function fromObject(object) {
            if (object instanceof $root.digitalbomb_game.NextDoingCast)
                return object;
            var message = new $root.digitalbomb_game.NextDoingCast();
            if (object.doingPlayerId != null)
                if ($util.Long)
                    (message.doingPlayerId = $util.Long.fromValue(object.doingPlayerId)).unsigned = false;
                else if (typeof object.doingPlayerId === "string")
                    message.doingPlayerId = parseInt(object.doingPlayerId, 10);
                else if (typeof object.doingPlayerId === "number")
                    message.doingPlayerId = object.doingPlayerId;
                else if (typeof object.doingPlayerId === "object")
                    message.doingPlayerId = new $util.LongBits(object.doingPlayerId.low >>> 0, object.doingPlayerId.high >>> 0).toNumber();
            if (object.doingSeatId != null)
                message.doingSeatId = object.doingSeatId | 0;
            if (object.minNum != null)
                message.minNum = object.minNum | 0;
            if (object.maxNum != null)
                message.maxNum = object.maxNum | 0;
            return message;
        };

        /**
         * Creates a plain object from a NextDoingCast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof digitalbomb_game.NextDoingCast
         * @static
         * @param {digitalbomb_game.NextDoingCast} message NextDoingCast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NextDoingCast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.doingPlayerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.doingPlayerId = options.longs === String ? "0" : 0;
                object.doingSeatId = 0;
                object.minNum = 0;
                object.maxNum = 0;
            }
            if (message.doingPlayerId != null && message.hasOwnProperty("doingPlayerId"))
                if (typeof message.doingPlayerId === "number")
                    object.doingPlayerId = options.longs === String ? String(message.doingPlayerId) : message.doingPlayerId;
                else
                    object.doingPlayerId = options.longs === String ? $util.Long.prototype.toString.call(message.doingPlayerId) : options.longs === Number ? new $util.LongBits(message.doingPlayerId.low >>> 0, message.doingPlayerId.high >>> 0).toNumber() : message.doingPlayerId;
            if (message.doingSeatId != null && message.hasOwnProperty("doingSeatId"))
                object.doingSeatId = message.doingSeatId;
            if (message.minNum != null && message.hasOwnProperty("minNum"))
                object.minNum = message.minNum;
            if (message.maxNum != null && message.hasOwnProperty("maxNum"))
                object.maxNum = message.maxNum;
            return object;
        };

        /**
         * Converts this NextDoingCast to JSON.
         * @function toJSON
         * @memberof digitalbomb_game.NextDoingCast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NextDoingCast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NextDoingCast
         * @function getTypeUrl
         * @memberof digitalbomb_game.NextDoingCast
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NextDoingCast.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/digitalbomb_game.NextDoingCast";
        };

        return NextDoingCast;
    })();

    digitalbomb_game.GameOverCast = (function() {

        /**
         * Properties of a GameOverCast.
         * @memberof digitalbomb_game
         * @interface IGameOverCast
         * @property {number|Long|null} [losePlayerId] GameOverCast losePlayerId
         * @property {number|null} [mine] GameOverCast mine
         */

        /**
         * Constructs a new GameOverCast.
         * @memberof digitalbomb_game
         * @classdesc Represents a GameOverCast.
         * @implements IGameOverCast
         * @constructor
         * @param {digitalbomb_game.IGameOverCast=} [properties] Properties to set
         */
        function GameOverCast(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameOverCast losePlayerId.
         * @member {number|Long} losePlayerId
         * @memberof digitalbomb_game.GameOverCast
         * @instance
         */
        GameOverCast.prototype.losePlayerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GameOverCast mine.
         * @member {number} mine
         * @memberof digitalbomb_game.GameOverCast
         * @instance
         */
        GameOverCast.prototype.mine = 0;

        /**
         * Creates a new GameOverCast instance using the specified properties.
         * @function create
         * @memberof digitalbomb_game.GameOverCast
         * @static
         * @param {digitalbomb_game.IGameOverCast=} [properties] Properties to set
         * @returns {digitalbomb_game.GameOverCast} GameOverCast instance
         */
        GameOverCast.create = function create(properties) {
            return new GameOverCast(properties);
        };

        /**
         * Encodes the specified GameOverCast message. Does not implicitly {@link digitalbomb_game.GameOverCast.verify|verify} messages.
         * @function encode
         * @memberof digitalbomb_game.GameOverCast
         * @static
         * @param {digitalbomb_game.IGameOverCast} message GameOverCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameOverCast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.losePlayerId != null && Object.hasOwnProperty.call(message, "losePlayerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.losePlayerId);
            if (message.mine != null && Object.hasOwnProperty.call(message, "mine"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.mine);
            return writer;
        };

        /**
         * Encodes the specified GameOverCast message, length delimited. Does not implicitly {@link digitalbomb_game.GameOverCast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof digitalbomb_game.GameOverCast
         * @static
         * @param {digitalbomb_game.IGameOverCast} message GameOverCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameOverCast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameOverCast message from the specified reader or buffer.
         * @function decode
         * @memberof digitalbomb_game.GameOverCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {digitalbomb_game.GameOverCast} GameOverCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameOverCast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.digitalbomb_game.GameOverCast();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.losePlayerId = reader.int64();
                        break;
                    }
                case 2: {
                        message.mine = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameOverCast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof digitalbomb_game.GameOverCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {digitalbomb_game.GameOverCast} GameOverCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameOverCast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameOverCast message.
         * @function verify
         * @memberof digitalbomb_game.GameOverCast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameOverCast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.losePlayerId != null && message.hasOwnProperty("losePlayerId"))
                if (!$util.isInteger(message.losePlayerId) && !(message.losePlayerId && $util.isInteger(message.losePlayerId.low) && $util.isInteger(message.losePlayerId.high)))
                    return "losePlayerId: integer|Long expected";
            if (message.mine != null && message.hasOwnProperty("mine"))
                if (!$util.isInteger(message.mine))
                    return "mine: integer expected";
            return null;
        };

        /**
         * Creates a GameOverCast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof digitalbomb_game.GameOverCast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {digitalbomb_game.GameOverCast} GameOverCast
         */
        GameOverCast.fromObject = function fromObject(object) {
            if (object instanceof $root.digitalbomb_game.GameOverCast)
                return object;
            var message = new $root.digitalbomb_game.GameOverCast();
            if (object.losePlayerId != null)
                if ($util.Long)
                    (message.losePlayerId = $util.Long.fromValue(object.losePlayerId)).unsigned = false;
                else if (typeof object.losePlayerId === "string")
                    message.losePlayerId = parseInt(object.losePlayerId, 10);
                else if (typeof object.losePlayerId === "number")
                    message.losePlayerId = object.losePlayerId;
                else if (typeof object.losePlayerId === "object")
                    message.losePlayerId = new $util.LongBits(object.losePlayerId.low >>> 0, object.losePlayerId.high >>> 0).toNumber();
            if (object.mine != null)
                message.mine = object.mine | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameOverCast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof digitalbomb_game.GameOverCast
         * @static
         * @param {digitalbomb_game.GameOverCast} message GameOverCast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameOverCast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.losePlayerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.losePlayerId = options.longs === String ? "0" : 0;
                object.mine = 0;
            }
            if (message.losePlayerId != null && message.hasOwnProperty("losePlayerId"))
                if (typeof message.losePlayerId === "number")
                    object.losePlayerId = options.longs === String ? String(message.losePlayerId) : message.losePlayerId;
                else
                    object.losePlayerId = options.longs === String ? $util.Long.prototype.toString.call(message.losePlayerId) : options.longs === Number ? new $util.LongBits(message.losePlayerId.low >>> 0, message.losePlayerId.high >>> 0).toNumber() : message.losePlayerId;
            if (message.mine != null && message.hasOwnProperty("mine"))
                object.mine = message.mine;
            return object;
        };

        /**
         * Converts this GameOverCast to JSON.
         * @function toJSON
         * @memberof digitalbomb_game.GameOverCast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameOverCast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameOverCast
         * @function getTypeUrl
         * @memberof digitalbomb_game.GameOverCast
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameOverCast.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/digitalbomb_game.GameOverCast";
        };

        return GameOverCast;
    })();

    digitalbomb_game.LeaveCast = (function() {

        /**
         * Properties of a LeaveCast.
         * @memberof digitalbomb_game
         * @interface ILeaveCast
         * @property {number|Long|null} [playerId] LeaveCast playerId
         * @property {number|null} [seatId] LeaveCast seatId
         * @property {string|null} [nickname] LeaveCast nickname
         */

        /**
         * Constructs a new LeaveCast.
         * @memberof digitalbomb_game
         * @classdesc Represents a LeaveCast.
         * @implements ILeaveCast
         * @constructor
         * @param {digitalbomb_game.ILeaveCast=} [properties] Properties to set
         */
        function LeaveCast(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LeaveCast playerId.
         * @member {number|Long} playerId
         * @memberof digitalbomb_game.LeaveCast
         * @instance
         */
        LeaveCast.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * LeaveCast seatId.
         * @member {number} seatId
         * @memberof digitalbomb_game.LeaveCast
         * @instance
         */
        LeaveCast.prototype.seatId = 0;

        /**
         * LeaveCast nickname.
         * @member {string} nickname
         * @memberof digitalbomb_game.LeaveCast
         * @instance
         */
        LeaveCast.prototype.nickname = "";

        /**
         * Creates a new LeaveCast instance using the specified properties.
         * @function create
         * @memberof digitalbomb_game.LeaveCast
         * @static
         * @param {digitalbomb_game.ILeaveCast=} [properties] Properties to set
         * @returns {digitalbomb_game.LeaveCast} LeaveCast instance
         */
        LeaveCast.create = function create(properties) {
            return new LeaveCast(properties);
        };

        /**
         * Encodes the specified LeaveCast message. Does not implicitly {@link digitalbomb_game.LeaveCast.verify|verify} messages.
         * @function encode
         * @memberof digitalbomb_game.LeaveCast
         * @static
         * @param {digitalbomb_game.ILeaveCast} message LeaveCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveCast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            if (message.seatId != null && Object.hasOwnProperty.call(message, "seatId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.seatId);
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.nickname);
            return writer;
        };

        /**
         * Encodes the specified LeaveCast message, length delimited. Does not implicitly {@link digitalbomb_game.LeaveCast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof digitalbomb_game.LeaveCast
         * @static
         * @param {digitalbomb_game.ILeaveCast} message LeaveCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveCast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LeaveCast message from the specified reader or buffer.
         * @function decode
         * @memberof digitalbomb_game.LeaveCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {digitalbomb_game.LeaveCast} LeaveCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveCast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.digitalbomb_game.LeaveCast();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                case 2: {
                        message.seatId = reader.int32();
                        break;
                    }
                case 3: {
                        message.nickname = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LeaveCast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof digitalbomb_game.LeaveCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {digitalbomb_game.LeaveCast} LeaveCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveCast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LeaveCast message.
         * @function verify
         * @memberof digitalbomb_game.LeaveCast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LeaveCast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            if (message.seatId != null && message.hasOwnProperty("seatId"))
                if (!$util.isInteger(message.seatId))
                    return "seatId: integer expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            return null;
        };

        /**
         * Creates a LeaveCast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof digitalbomb_game.LeaveCast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {digitalbomb_game.LeaveCast} LeaveCast
         */
        LeaveCast.fromObject = function fromObject(object) {
            if (object instanceof $root.digitalbomb_game.LeaveCast)
                return object;
            var message = new $root.digitalbomb_game.LeaveCast();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            if (object.seatId != null)
                message.seatId = object.seatId | 0;
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            return message;
        };

        /**
         * Creates a plain object from a LeaveCast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof digitalbomb_game.LeaveCast
         * @static
         * @param {digitalbomb_game.LeaveCast} message LeaveCast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LeaveCast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
                object.seatId = 0;
                object.nickname = "";
            }
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            if (message.seatId != null && message.hasOwnProperty("seatId"))
                object.seatId = message.seatId;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            return object;
        };

        /**
         * Converts this LeaveCast to JSON.
         * @function toJSON
         * @memberof digitalbomb_game.LeaveCast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeaveCast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for LeaveCast
         * @function getTypeUrl
         * @memberof digitalbomb_game.LeaveCast
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        LeaveCast.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/digitalbomb_game.LeaveCast";
        };

        return LeaveCast;
    })();

    digitalbomb_game.DoingReq = (function() {

        /**
         * Properties of a DoingReq.
         * @memberof digitalbomb_game
         * @interface IDoingReq
         * @property {number|null} [optNum] DoingReq optNum
         */

        /**
         * Constructs a new DoingReq.
         * @memberof digitalbomb_game
         * @classdesc Represents a DoingReq.
         * @implements IDoingReq
         * @constructor
         * @param {digitalbomb_game.IDoingReq=} [properties] Properties to set
         */
        function DoingReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DoingReq optNum.
         * @member {number} optNum
         * @memberof digitalbomb_game.DoingReq
         * @instance
         */
        DoingReq.prototype.optNum = 0;

        /**
         * Creates a new DoingReq instance using the specified properties.
         * @function create
         * @memberof digitalbomb_game.DoingReq
         * @static
         * @param {digitalbomb_game.IDoingReq=} [properties] Properties to set
         * @returns {digitalbomb_game.DoingReq} DoingReq instance
         */
        DoingReq.create = function create(properties) {
            return new DoingReq(properties);
        };

        /**
         * Encodes the specified DoingReq message. Does not implicitly {@link digitalbomb_game.DoingReq.verify|verify} messages.
         * @function encode
         * @memberof digitalbomb_game.DoingReq
         * @static
         * @param {digitalbomb_game.IDoingReq} message DoingReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DoingReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.optNum != null && Object.hasOwnProperty.call(message, "optNum"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.optNum);
            return writer;
        };

        /**
         * Encodes the specified DoingReq message, length delimited. Does not implicitly {@link digitalbomb_game.DoingReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof digitalbomb_game.DoingReq
         * @static
         * @param {digitalbomb_game.IDoingReq} message DoingReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DoingReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DoingReq message from the specified reader or buffer.
         * @function decode
         * @memberof digitalbomb_game.DoingReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {digitalbomb_game.DoingReq} DoingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DoingReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.digitalbomb_game.DoingReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.optNum = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DoingReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof digitalbomb_game.DoingReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {digitalbomb_game.DoingReq} DoingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DoingReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DoingReq message.
         * @function verify
         * @memberof digitalbomb_game.DoingReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DoingReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.optNum != null && message.hasOwnProperty("optNum"))
                if (!$util.isInteger(message.optNum))
                    return "optNum: integer expected";
            return null;
        };

        /**
         * Creates a DoingReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof digitalbomb_game.DoingReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {digitalbomb_game.DoingReq} DoingReq
         */
        DoingReq.fromObject = function fromObject(object) {
            if (object instanceof $root.digitalbomb_game.DoingReq)
                return object;
            var message = new $root.digitalbomb_game.DoingReq();
            if (object.optNum != null)
                message.optNum = object.optNum | 0;
            return message;
        };

        /**
         * Creates a plain object from a DoingReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof digitalbomb_game.DoingReq
         * @static
         * @param {digitalbomb_game.DoingReq} message DoingReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DoingReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.optNum = 0;
            if (message.optNum != null && message.hasOwnProperty("optNum"))
                object.optNum = message.optNum;
            return object;
        };

        /**
         * Converts this DoingReq to JSON.
         * @function toJSON
         * @memberof digitalbomb_game.DoingReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DoingReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DoingReq
         * @function getTypeUrl
         * @memberof digitalbomb_game.DoingReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DoingReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/digitalbomb_game.DoingReq";
        };

        return DoingReq;
    })();

    digitalbomb_game.DoingCast = (function() {

        /**
         * Properties of a DoingCast.
         * @memberof digitalbomb_game
         * @interface IDoingCast
         * @property {number|Long|null} [playerId] DoingCast playerId
         * @property {number|null} [seatId] DoingCast seatId
         * @property {number|null} [optNum] DoingCast optNum
         */

        /**
         * Constructs a new DoingCast.
         * @memberof digitalbomb_game
         * @classdesc Represents a DoingCast.
         * @implements IDoingCast
         * @constructor
         * @param {digitalbomb_game.IDoingCast=} [properties] Properties to set
         */
        function DoingCast(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DoingCast playerId.
         * @member {number|Long} playerId
         * @memberof digitalbomb_game.DoingCast
         * @instance
         */
        DoingCast.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * DoingCast seatId.
         * @member {number} seatId
         * @memberof digitalbomb_game.DoingCast
         * @instance
         */
        DoingCast.prototype.seatId = 0;

        /**
         * DoingCast optNum.
         * @member {number} optNum
         * @memberof digitalbomb_game.DoingCast
         * @instance
         */
        DoingCast.prototype.optNum = 0;

        /**
         * Creates a new DoingCast instance using the specified properties.
         * @function create
         * @memberof digitalbomb_game.DoingCast
         * @static
         * @param {digitalbomb_game.IDoingCast=} [properties] Properties to set
         * @returns {digitalbomb_game.DoingCast} DoingCast instance
         */
        DoingCast.create = function create(properties) {
            return new DoingCast(properties);
        };

        /**
         * Encodes the specified DoingCast message. Does not implicitly {@link digitalbomb_game.DoingCast.verify|verify} messages.
         * @function encode
         * @memberof digitalbomb_game.DoingCast
         * @static
         * @param {digitalbomb_game.IDoingCast} message DoingCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DoingCast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            if (message.seatId != null && Object.hasOwnProperty.call(message, "seatId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.seatId);
            if (message.optNum != null && Object.hasOwnProperty.call(message, "optNum"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.optNum);
            return writer;
        };

        /**
         * Encodes the specified DoingCast message, length delimited. Does not implicitly {@link digitalbomb_game.DoingCast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof digitalbomb_game.DoingCast
         * @static
         * @param {digitalbomb_game.IDoingCast} message DoingCast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DoingCast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DoingCast message from the specified reader or buffer.
         * @function decode
         * @memberof digitalbomb_game.DoingCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {digitalbomb_game.DoingCast} DoingCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DoingCast.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.digitalbomb_game.DoingCast();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                case 2: {
                        message.seatId = reader.int32();
                        break;
                    }
                case 3: {
                        message.optNum = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DoingCast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof digitalbomb_game.DoingCast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {digitalbomb_game.DoingCast} DoingCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DoingCast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DoingCast message.
         * @function verify
         * @memberof digitalbomb_game.DoingCast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DoingCast.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            if (message.seatId != null && message.hasOwnProperty("seatId"))
                if (!$util.isInteger(message.seatId))
                    return "seatId: integer expected";
            if (message.optNum != null && message.hasOwnProperty("optNum"))
                if (!$util.isInteger(message.optNum))
                    return "optNum: integer expected";
            return null;
        };

        /**
         * Creates a DoingCast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof digitalbomb_game.DoingCast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {digitalbomb_game.DoingCast} DoingCast
         */
        DoingCast.fromObject = function fromObject(object) {
            if (object instanceof $root.digitalbomb_game.DoingCast)
                return object;
            var message = new $root.digitalbomb_game.DoingCast();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            if (object.seatId != null)
                message.seatId = object.seatId | 0;
            if (object.optNum != null)
                message.optNum = object.optNum | 0;
            return message;
        };

        /**
         * Creates a plain object from a DoingCast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof digitalbomb_game.DoingCast
         * @static
         * @param {digitalbomb_game.DoingCast} message DoingCast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DoingCast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
                object.seatId = 0;
                object.optNum = 0;
            }
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            if (message.seatId != null && message.hasOwnProperty("seatId"))
                object.seatId = message.seatId;
            if (message.optNum != null && message.hasOwnProperty("optNum"))
                object.optNum = message.optNum;
            return object;
        };

        /**
         * Converts this DoingCast to JSON.
         * @function toJSON
         * @memberof digitalbomb_game.DoingCast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DoingCast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DoingCast
         * @function getTypeUrl
         * @memberof digitalbomb_game.DoingCast
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DoingCast.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/digitalbomb_game.DoingCast";
        };

        return DoingCast;
    })();

    digitalbomb_game.GameStatusReq = (function() {

        /**
         * Properties of a GameStatusReq.
         * @memberof digitalbomb_game
         * @interface IGameStatusReq
         * @property {number|Long|null} [playerId] GameStatusReq playerId
         */

        /**
         * Constructs a new GameStatusReq.
         * @memberof digitalbomb_game
         * @classdesc Represents a GameStatusReq.
         * @implements IGameStatusReq
         * @constructor
         * @param {digitalbomb_game.IGameStatusReq=} [properties] Properties to set
         */
        function GameStatusReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameStatusReq playerId.
         * @member {number|Long} playerId
         * @memberof digitalbomb_game.GameStatusReq
         * @instance
         */
        GameStatusReq.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new GameStatusReq instance using the specified properties.
         * @function create
         * @memberof digitalbomb_game.GameStatusReq
         * @static
         * @param {digitalbomb_game.IGameStatusReq=} [properties] Properties to set
         * @returns {digitalbomb_game.GameStatusReq} GameStatusReq instance
         */
        GameStatusReq.create = function create(properties) {
            return new GameStatusReq(properties);
        };

        /**
         * Encodes the specified GameStatusReq message. Does not implicitly {@link digitalbomb_game.GameStatusReq.verify|verify} messages.
         * @function encode
         * @memberof digitalbomb_game.GameStatusReq
         * @static
         * @param {digitalbomb_game.IGameStatusReq} message GameStatusReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStatusReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            return writer;
        };

        /**
         * Encodes the specified GameStatusReq message, length delimited. Does not implicitly {@link digitalbomb_game.GameStatusReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof digitalbomb_game.GameStatusReq
         * @static
         * @param {digitalbomb_game.IGameStatusReq} message GameStatusReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStatusReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStatusReq message from the specified reader or buffer.
         * @function decode
         * @memberof digitalbomb_game.GameStatusReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {digitalbomb_game.GameStatusReq} GameStatusReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStatusReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.digitalbomb_game.GameStatusReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameStatusReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof digitalbomb_game.GameStatusReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {digitalbomb_game.GameStatusReq} GameStatusReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStatusReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameStatusReq message.
         * @function verify
         * @memberof digitalbomb_game.GameStatusReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameStatusReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            return null;
        };

        /**
         * Creates a GameStatusReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof digitalbomb_game.GameStatusReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {digitalbomb_game.GameStatusReq} GameStatusReq
         */
        GameStatusReq.fromObject = function fromObject(object) {
            if (object instanceof $root.digitalbomb_game.GameStatusReq)
                return object;
            var message = new $root.digitalbomb_game.GameStatusReq();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a GameStatusReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof digitalbomb_game.GameStatusReq
         * @static
         * @param {digitalbomb_game.GameStatusReq} message GameStatusReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameStatusReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            return object;
        };

        /**
         * Converts this GameStatusReq to JSON.
         * @function toJSON
         * @memberof digitalbomb_game.GameStatusReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStatusReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameStatusReq
         * @function getTypeUrl
         * @memberof digitalbomb_game.GameStatusReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameStatusReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/digitalbomb_game.GameStatusReq";
        };

        return GameStatusReq;
    })();

    digitalbomb_game.GameStatusRes = (function() {

        /**
         * Properties of a GameStatusRes.
         * @memberof digitalbomb_game
         * @interface IGameStatusRes
         * @property {number|null} [gameState] GameStatusRes gameState
         * @property {digitalbomb_game.INextDoingCast|null} [nextDoing] GameStatusRes nextDoing
         */

        /**
         * Constructs a new GameStatusRes.
         * @memberof digitalbomb_game
         * @classdesc Represents a GameStatusRes.
         * @implements IGameStatusRes
         * @constructor
         * @param {digitalbomb_game.IGameStatusRes=} [properties] Properties to set
         */
        function GameStatusRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameStatusRes gameState.
         * @member {number} gameState
         * @memberof digitalbomb_game.GameStatusRes
         * @instance
         */
        GameStatusRes.prototype.gameState = 0;

        /**
         * GameStatusRes nextDoing.
         * @member {digitalbomb_game.INextDoingCast|null|undefined} nextDoing
         * @memberof digitalbomb_game.GameStatusRes
         * @instance
         */
        GameStatusRes.prototype.nextDoing = null;

        /**
         * Creates a new GameStatusRes instance using the specified properties.
         * @function create
         * @memberof digitalbomb_game.GameStatusRes
         * @static
         * @param {digitalbomb_game.IGameStatusRes=} [properties] Properties to set
         * @returns {digitalbomb_game.GameStatusRes} GameStatusRes instance
         */
        GameStatusRes.create = function create(properties) {
            return new GameStatusRes(properties);
        };

        /**
         * Encodes the specified GameStatusRes message. Does not implicitly {@link digitalbomb_game.GameStatusRes.verify|verify} messages.
         * @function encode
         * @memberof digitalbomb_game.GameStatusRes
         * @static
         * @param {digitalbomb_game.IGameStatusRes} message GameStatusRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStatusRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameState != null && Object.hasOwnProperty.call(message, "gameState"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameState);
            if (message.nextDoing != null && Object.hasOwnProperty.call(message, "nextDoing"))
                $root.digitalbomb_game.NextDoingCast.encode(message.nextDoing, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameStatusRes message, length delimited. Does not implicitly {@link digitalbomb_game.GameStatusRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof digitalbomb_game.GameStatusRes
         * @static
         * @param {digitalbomb_game.IGameStatusRes} message GameStatusRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStatusRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStatusRes message from the specified reader or buffer.
         * @function decode
         * @memberof digitalbomb_game.GameStatusRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {digitalbomb_game.GameStatusRes} GameStatusRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStatusRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.digitalbomb_game.GameStatusRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameState = reader.int32();
                        break;
                    }
                case 2: {
                        message.nextDoing = $root.digitalbomb_game.NextDoingCast.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameStatusRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof digitalbomb_game.GameStatusRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {digitalbomb_game.GameStatusRes} GameStatusRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStatusRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameStatusRes message.
         * @function verify
         * @memberof digitalbomb_game.GameStatusRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameStatusRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameState != null && message.hasOwnProperty("gameState"))
                if (!$util.isInteger(message.gameState))
                    return "gameState: integer expected";
            if (message.nextDoing != null && message.hasOwnProperty("nextDoing")) {
                var error = $root.digitalbomb_game.NextDoingCast.verify(message.nextDoing);
                if (error)
                    return "nextDoing." + error;
            }
            return null;
        };

        /**
         * Creates a GameStatusRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof digitalbomb_game.GameStatusRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {digitalbomb_game.GameStatusRes} GameStatusRes
         */
        GameStatusRes.fromObject = function fromObject(object) {
            if (object instanceof $root.digitalbomb_game.GameStatusRes)
                return object;
            var message = new $root.digitalbomb_game.GameStatusRes();
            if (object.gameState != null)
                message.gameState = object.gameState | 0;
            if (object.nextDoing != null) {
                if (typeof object.nextDoing !== "object")
                    throw TypeError(".digitalbomb_game.GameStatusRes.nextDoing: object expected");
                message.nextDoing = $root.digitalbomb_game.NextDoingCast.fromObject(object.nextDoing);
            }
            return message;
        };

        /**
         * Creates a plain object from a GameStatusRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof digitalbomb_game.GameStatusRes
         * @static
         * @param {digitalbomb_game.GameStatusRes} message GameStatusRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameStatusRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gameState = 0;
                object.nextDoing = null;
            }
            if (message.gameState != null && message.hasOwnProperty("gameState"))
                object.gameState = message.gameState;
            if (message.nextDoing != null && message.hasOwnProperty("nextDoing"))
                object.nextDoing = $root.digitalbomb_game.NextDoingCast.toObject(message.nextDoing, options);
            return object;
        };

        /**
         * Converts this GameStatusRes to JSON.
         * @function toJSON
         * @memberof digitalbomb_game.GameStatusRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStatusRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameStatusRes
         * @function getTypeUrl
         * @memberof digitalbomb_game.GameStatusRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameStatusRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/digitalbomb_game.GameStatusRes";
        };

        return GameStatusRes;
    })();

    return digitalbomb_game;
})();

$root.game_hall = (function() {

    /**
     * Namespace game_hall.
     * @exports game_hall
     * @namespace
     */
    var game_hall = {};

    /**
     * main enum.
     * @name game_hall.main
     * @enum {number}
     * @property {number} game_hall=51 game_hall value
     */
    game_hall.main = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[51] = "game_hall"] = 51;
        return values;
    })();

    /**
     * sub enum.
     * @name game_hall.sub
     * @enum {number}
     * @property {number} JoinReq=1 JoinReq value
     * @property {number} JoinRes=2 JoinRes value
     */
    game_hall.sub = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "JoinReq"] = 1;
        values[valuesById[2] = "JoinRes"] = 2;
        return values;
    })();

    game_hall.JoinReq = (function() {

        /**
         * Properties of a JoinReq.
         * @memberof game_hall
         * @interface IJoinReq
         * @property {string|null} [tableId] JoinReq tableId
         */

        /**
         * Constructs a new JoinReq.
         * @memberof game_hall
         * @classdesc Represents a JoinReq.
         * @implements IJoinReq
         * @constructor
         * @param {game_hall.IJoinReq=} [properties] Properties to set
         */
        function JoinReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinReq tableId.
         * @member {string} tableId
         * @memberof game_hall.JoinReq
         * @instance
         */
        JoinReq.prototype.tableId = "";

        /**
         * Creates a new JoinReq instance using the specified properties.
         * @function create
         * @memberof game_hall.JoinReq
         * @static
         * @param {game_hall.IJoinReq=} [properties] Properties to set
         * @returns {game_hall.JoinReq} JoinReq instance
         */
        JoinReq.create = function create(properties) {
            return new JoinReq(properties);
        };

        /**
         * Encodes the specified JoinReq message. Does not implicitly {@link game_hall.JoinReq.verify|verify} messages.
         * @function encode
         * @memberof game_hall.JoinReq
         * @static
         * @param {game_hall.IJoinReq} message JoinReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.tableId != null && Object.hasOwnProperty.call(message, "tableId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.tableId);
            return writer;
        };

        /**
         * Encodes the specified JoinReq message, length delimited. Does not implicitly {@link game_hall.JoinReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game_hall.JoinReq
         * @static
         * @param {game_hall.IJoinReq} message JoinReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinReq message from the specified reader or buffer.
         * @function decode
         * @memberof game_hall.JoinReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game_hall.JoinReq} JoinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game_hall.JoinReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.tableId = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game_hall.JoinReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game_hall.JoinReq} JoinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinReq message.
         * @function verify
         * @memberof game_hall.JoinReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                if (!$util.isString(message.tableId))
                    return "tableId: string expected";
            return null;
        };

        /**
         * Creates a JoinReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game_hall.JoinReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game_hall.JoinReq} JoinReq
         */
        JoinReq.fromObject = function fromObject(object) {
            if (object instanceof $root.game_hall.JoinReq)
                return object;
            var message = new $root.game_hall.JoinReq();
            if (object.tableId != null)
                message.tableId = String(object.tableId);
            return message;
        };

        /**
         * Creates a plain object from a JoinReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game_hall.JoinReq
         * @static
         * @param {game_hall.JoinReq} message JoinReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.tableId = "";
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                object.tableId = message.tableId;
            return object;
        };

        /**
         * Converts this JoinReq to JSON.
         * @function toJSON
         * @memberof game_hall.JoinReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for JoinReq
         * @function getTypeUrl
         * @memberof game_hall.JoinReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        JoinReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game_hall.JoinReq";
        };

        return JoinReq;
    })();

    game_hall.JoinRes = (function() {

        /**
         * Properties of a JoinRes.
         * @memberof game_hall
         * @interface IJoinRes
         * @property {string|null} [tableId] JoinRes tableId
         */

        /**
         * Constructs a new JoinRes.
         * @memberof game_hall
         * @classdesc Represents a JoinRes.
         * @implements IJoinRes
         * @constructor
         * @param {game_hall.IJoinRes=} [properties] Properties to set
         */
        function JoinRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinRes tableId.
         * @member {string} tableId
         * @memberof game_hall.JoinRes
         * @instance
         */
        JoinRes.prototype.tableId = "";

        /**
         * Creates a new JoinRes instance using the specified properties.
         * @function create
         * @memberof game_hall.JoinRes
         * @static
         * @param {game_hall.IJoinRes=} [properties] Properties to set
         * @returns {game_hall.JoinRes} JoinRes instance
         */
        JoinRes.create = function create(properties) {
            return new JoinRes(properties);
        };

        /**
         * Encodes the specified JoinRes message. Does not implicitly {@link game_hall.JoinRes.verify|verify} messages.
         * @function encode
         * @memberof game_hall.JoinRes
         * @static
         * @param {game_hall.IJoinRes} message JoinRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.tableId != null && Object.hasOwnProperty.call(message, "tableId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.tableId);
            return writer;
        };

        /**
         * Encodes the specified JoinRes message, length delimited. Does not implicitly {@link game_hall.JoinRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof game_hall.JoinRes
         * @static
         * @param {game_hall.IJoinRes} message JoinRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinRes message from the specified reader or buffer.
         * @function decode
         * @memberof game_hall.JoinRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {game_hall.JoinRes} JoinRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game_hall.JoinRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.tableId = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof game_hall.JoinRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {game_hall.JoinRes} JoinRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinRes message.
         * @function verify
         * @memberof game_hall.JoinRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                if (!$util.isString(message.tableId))
                    return "tableId: string expected";
            return null;
        };

        /**
         * Creates a JoinRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof game_hall.JoinRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {game_hall.JoinRes} JoinRes
         */
        JoinRes.fromObject = function fromObject(object) {
            if (object instanceof $root.game_hall.JoinRes)
                return object;
            var message = new $root.game_hall.JoinRes();
            if (object.tableId != null)
                message.tableId = String(object.tableId);
            return message;
        };

        /**
         * Creates a plain object from a JoinRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof game_hall.JoinRes
         * @static
         * @param {game_hall.JoinRes} message JoinRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.tableId = "";
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                object.tableId = message.tableId;
            return object;
        };

        /**
         * Converts this JoinRes to JSON.
         * @function toJSON
         * @memberof game_hall.JoinRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for JoinRes
         * @function getTypeUrl
         * @memberof game_hall.JoinRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        JoinRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/game_hall.JoinRes";
        };

        return JoinRes;
    })();

    return game_hall;
})();

$root.hallserver_player = (function() {

    /**
     * Namespace hallserver_player.
     * @exports hallserver_player
     * @namespace
     */
    var hallserver_player = {};

    /**
     * main enum.
     * @name hallserver_player.main
     * @enum {number}
     * @property {number} hallserver_player=101 hallserver_player value
     */
    hallserver_player.main = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[101] = "hallserver_player"] = 101;
        return values;
    })();

    /**
     * sub enum.
     * @name hallserver_player.sub
     * @enum {number}
     * @property {number} ReqChangeNickName=1 ReqChangeNickName value
     * @property {number} ResChangeNickName=2 ResChangeNickName value
     * @property {number} PlayerInfoNotice=80 PlayerInfoNotice value
     * @property {number} PlayerInfoSynNotice=81 PlayerInfoSynNotice value
     */
    hallserver_player.sub = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "ReqChangeNickName"] = 1;
        values[valuesById[2] = "ResChangeNickName"] = 2;
        values[valuesById[80] = "PlayerInfoNotice"] = 80;
        values[valuesById[81] = "PlayerInfoSynNotice"] = 81;
        return values;
    })();

    hallserver_player.PlayerInfoNotice = (function() {

        /**
         * Properties of a PlayerInfoNotice.
         * @memberof hallserver_player
         * @interface IPlayerInfoNotice
         * @property {string|null} [nickname] PlayerInfoNotice nickname
         * @property {number|null} [rankScore] PlayerInfoNotice rankScore
         * @property {number|null} [level] PlayerInfoNotice level
         * @property {number|null} [headFrameId] PlayerInfoNotice headFrameId
         * @property {number|null} [headId] PlayerInfoNotice headId
         */

        /**
         * Constructs a new PlayerInfoNotice.
         * @memberof hallserver_player
         * @classdesc Represents a PlayerInfoNotice.
         * @implements IPlayerInfoNotice
         * @constructor
         * @param {hallserver_player.IPlayerInfoNotice=} [properties] Properties to set
         */
        function PlayerInfoNotice(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerInfoNotice nickname.
         * @member {string} nickname
         * @memberof hallserver_player.PlayerInfoNotice
         * @instance
         */
        PlayerInfoNotice.prototype.nickname = "";

        /**
         * PlayerInfoNotice rankScore.
         * @member {number} rankScore
         * @memberof hallserver_player.PlayerInfoNotice
         * @instance
         */
        PlayerInfoNotice.prototype.rankScore = 0;

        /**
         * PlayerInfoNotice level.
         * @member {number} level
         * @memberof hallserver_player.PlayerInfoNotice
         * @instance
         */
        PlayerInfoNotice.prototype.level = 0;

        /**
         * PlayerInfoNotice headFrameId.
         * @member {number} headFrameId
         * @memberof hallserver_player.PlayerInfoNotice
         * @instance
         */
        PlayerInfoNotice.prototype.headFrameId = 0;

        /**
         * PlayerInfoNotice headId.
         * @member {number} headId
         * @memberof hallserver_player.PlayerInfoNotice
         * @instance
         */
        PlayerInfoNotice.prototype.headId = 0;

        /**
         * Creates a new PlayerInfoNotice instance using the specified properties.
         * @function create
         * @memberof hallserver_player.PlayerInfoNotice
         * @static
         * @param {hallserver_player.IPlayerInfoNotice=} [properties] Properties to set
         * @returns {hallserver_player.PlayerInfoNotice} PlayerInfoNotice instance
         */
        PlayerInfoNotice.create = function create(properties) {
            return new PlayerInfoNotice(properties);
        };

        /**
         * Encodes the specified PlayerInfoNotice message. Does not implicitly {@link hallserver_player.PlayerInfoNotice.verify|verify} messages.
         * @function encode
         * @memberof hallserver_player.PlayerInfoNotice
         * @static
         * @param {hallserver_player.IPlayerInfoNotice} message PlayerInfoNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfoNotice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.nickname);
            if (message.rankScore != null && Object.hasOwnProperty.call(message, "rankScore"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.rankScore);
            if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.level);
            if (message.headFrameId != null && Object.hasOwnProperty.call(message, "headFrameId"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.headFrameId);
            if (message.headId != null && Object.hasOwnProperty.call(message, "headId"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.headId);
            return writer;
        };

        /**
         * Encodes the specified PlayerInfoNotice message, length delimited. Does not implicitly {@link hallserver_player.PlayerInfoNotice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_player.PlayerInfoNotice
         * @static
         * @param {hallserver_player.IPlayerInfoNotice} message PlayerInfoNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfoNotice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerInfoNotice message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_player.PlayerInfoNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_player.PlayerInfoNotice} PlayerInfoNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfoNotice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_player.PlayerInfoNotice();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.nickname = reader.string();
                        break;
                    }
                case 2: {
                        message.rankScore = reader.int32();
                        break;
                    }
                case 3: {
                        message.level = reader.int32();
                        break;
                    }
                case 4: {
                        message.headFrameId = reader.int32();
                        break;
                    }
                case 5: {
                        message.headId = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerInfoNotice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_player.PlayerInfoNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_player.PlayerInfoNotice} PlayerInfoNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfoNotice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerInfoNotice message.
         * @function verify
         * @memberof hallserver_player.PlayerInfoNotice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerInfoNotice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.rankScore != null && message.hasOwnProperty("rankScore"))
                if (!$util.isInteger(message.rankScore))
                    return "rankScore: integer expected";
            if (message.level != null && message.hasOwnProperty("level"))
                if (!$util.isInteger(message.level))
                    return "level: integer expected";
            if (message.headFrameId != null && message.hasOwnProperty("headFrameId"))
                if (!$util.isInteger(message.headFrameId))
                    return "headFrameId: integer expected";
            if (message.headId != null && message.hasOwnProperty("headId"))
                if (!$util.isInteger(message.headId))
                    return "headId: integer expected";
            return null;
        };

        /**
         * Creates a PlayerInfoNotice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_player.PlayerInfoNotice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_player.PlayerInfoNotice} PlayerInfoNotice
         */
        PlayerInfoNotice.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_player.PlayerInfoNotice)
                return object;
            var message = new $root.hallserver_player.PlayerInfoNotice();
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.rankScore != null)
                message.rankScore = object.rankScore | 0;
            if (object.level != null)
                message.level = object.level | 0;
            if (object.headFrameId != null)
                message.headFrameId = object.headFrameId | 0;
            if (object.headId != null)
                message.headId = object.headId | 0;
            return message;
        };

        /**
         * Creates a plain object from a PlayerInfoNotice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_player.PlayerInfoNotice
         * @static
         * @param {hallserver_player.PlayerInfoNotice} message PlayerInfoNotice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerInfoNotice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.nickname = "";
                object.rankScore = 0;
                object.level = 0;
                object.headFrameId = 0;
                object.headId = 0;
            }
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.rankScore != null && message.hasOwnProperty("rankScore"))
                object.rankScore = message.rankScore;
            if (message.level != null && message.hasOwnProperty("level"))
                object.level = message.level;
            if (message.headFrameId != null && message.hasOwnProperty("headFrameId"))
                object.headFrameId = message.headFrameId;
            if (message.headId != null && message.hasOwnProperty("headId"))
                object.headId = message.headId;
            return object;
        };

        /**
         * Converts this PlayerInfoNotice to JSON.
         * @function toJSON
         * @memberof hallserver_player.PlayerInfoNotice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerInfoNotice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerInfoNotice
         * @function getTypeUrl
         * @memberof hallserver_player.PlayerInfoNotice
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerInfoNotice.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_player.PlayerInfoNotice";
        };

        return PlayerInfoNotice;
    })();

    hallserver_player.oneSynInfo = (function() {

        /**
         * Properties of an oneSynInfo.
         * @memberof hallserver_player
         * @interface IoneSynInfo
         * @property {string|null} [fieldName] oneSynInfo fieldName
         * @property {number|null} [isStr] oneSynInfo isStr
         * @property {string|null} [valueStr] oneSynInfo valueStr
         * @property {number|Long|null} [value] oneSynInfo value
         */

        /**
         * Constructs a new oneSynInfo.
         * @memberof hallserver_player
         * @classdesc Represents an oneSynInfo.
         * @implements IoneSynInfo
         * @constructor
         * @param {hallserver_player.IoneSynInfo=} [properties] Properties to set
         */
        function oneSynInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * oneSynInfo fieldName.
         * @member {string} fieldName
         * @memberof hallserver_player.oneSynInfo
         * @instance
         */
        oneSynInfo.prototype.fieldName = "";

        /**
         * oneSynInfo isStr.
         * @member {number} isStr
         * @memberof hallserver_player.oneSynInfo
         * @instance
         */
        oneSynInfo.prototype.isStr = 0;

        /**
         * oneSynInfo valueStr.
         * @member {string} valueStr
         * @memberof hallserver_player.oneSynInfo
         * @instance
         */
        oneSynInfo.prototype.valueStr = "";

        /**
         * oneSynInfo value.
         * @member {number|Long} value
         * @memberof hallserver_player.oneSynInfo
         * @instance
         */
        oneSynInfo.prototype.value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new oneSynInfo instance using the specified properties.
         * @function create
         * @memberof hallserver_player.oneSynInfo
         * @static
         * @param {hallserver_player.IoneSynInfo=} [properties] Properties to set
         * @returns {hallserver_player.oneSynInfo} oneSynInfo instance
         */
        oneSynInfo.create = function create(properties) {
            return new oneSynInfo(properties);
        };

        /**
         * Encodes the specified oneSynInfo message. Does not implicitly {@link hallserver_player.oneSynInfo.verify|verify} messages.
         * @function encode
         * @memberof hallserver_player.oneSynInfo
         * @static
         * @param {hallserver_player.IoneSynInfo} message oneSynInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        oneSynInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fieldName != null && Object.hasOwnProperty.call(message, "fieldName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.fieldName);
            if (message.isStr != null && Object.hasOwnProperty.call(message, "isStr"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.isStr);
            if (message.valueStr != null && Object.hasOwnProperty.call(message, "valueStr"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.valueStr);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.value);
            return writer;
        };

        /**
         * Encodes the specified oneSynInfo message, length delimited. Does not implicitly {@link hallserver_player.oneSynInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_player.oneSynInfo
         * @static
         * @param {hallserver_player.IoneSynInfo} message oneSynInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        oneSynInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an oneSynInfo message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_player.oneSynInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_player.oneSynInfo} oneSynInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        oneSynInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_player.oneSynInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.fieldName = reader.string();
                        break;
                    }
                case 2: {
                        message.isStr = reader.int32();
                        break;
                    }
                case 3: {
                        message.valueStr = reader.string();
                        break;
                    }
                case 4: {
                        message.value = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an oneSynInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_player.oneSynInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_player.oneSynInfo} oneSynInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        oneSynInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an oneSynInfo message.
         * @function verify
         * @memberof hallserver_player.oneSynInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        oneSynInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fieldName != null && message.hasOwnProperty("fieldName"))
                if (!$util.isString(message.fieldName))
                    return "fieldName: string expected";
            if (message.isStr != null && message.hasOwnProperty("isStr"))
                if (!$util.isInteger(message.isStr))
                    return "isStr: integer expected";
            if (message.valueStr != null && message.hasOwnProperty("valueStr"))
                if (!$util.isString(message.valueStr))
                    return "valueStr: string expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isInteger(message.value) && !(message.value && $util.isInteger(message.value.low) && $util.isInteger(message.value.high)))
                    return "value: integer|Long expected";
            return null;
        };

        /**
         * Creates an oneSynInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_player.oneSynInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_player.oneSynInfo} oneSynInfo
         */
        oneSynInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_player.oneSynInfo)
                return object;
            var message = new $root.hallserver_player.oneSynInfo();
            if (object.fieldName != null)
                message.fieldName = String(object.fieldName);
            if (object.isStr != null)
                message.isStr = object.isStr | 0;
            if (object.valueStr != null)
                message.valueStr = String(object.valueStr);
            if (object.value != null)
                if ($util.Long)
                    (message.value = $util.Long.fromValue(object.value)).unsigned = false;
                else if (typeof object.value === "string")
                    message.value = parseInt(object.value, 10);
                else if (typeof object.value === "number")
                    message.value = object.value;
                else if (typeof object.value === "object")
                    message.value = new $util.LongBits(object.value.low >>> 0, object.value.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an oneSynInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_player.oneSynInfo
         * @static
         * @param {hallserver_player.oneSynInfo} message oneSynInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        oneSynInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.fieldName = "";
                object.isStr = 0;
                object.valueStr = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.value = options.longs === String ? "0" : 0;
            }
            if (message.fieldName != null && message.hasOwnProperty("fieldName"))
                object.fieldName = message.fieldName;
            if (message.isStr != null && message.hasOwnProperty("isStr"))
                object.isStr = message.isStr;
            if (message.valueStr != null && message.hasOwnProperty("valueStr"))
                object.valueStr = message.valueStr;
            if (message.value != null && message.hasOwnProperty("value"))
                if (typeof message.value === "number")
                    object.value = options.longs === String ? String(message.value) : message.value;
                else
                    object.value = options.longs === String ? $util.Long.prototype.toString.call(message.value) : options.longs === Number ? new $util.LongBits(message.value.low >>> 0, message.value.high >>> 0).toNumber() : message.value;
            return object;
        };

        /**
         * Converts this oneSynInfo to JSON.
         * @function toJSON
         * @memberof hallserver_player.oneSynInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        oneSynInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for oneSynInfo
         * @function getTypeUrl
         * @memberof hallserver_player.oneSynInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        oneSynInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_player.oneSynInfo";
        };

        return oneSynInfo;
    })();

    hallserver_player.PlayerInfoSynNotice = (function() {

        /**
         * Properties of a PlayerInfoSynNotice.
         * @memberof hallserver_player
         * @interface IPlayerInfoSynNotice
         * @property {number|Long|null} [playerId] PlayerInfoSynNotice playerId
         * @property {Array.<hallserver_player.IoneSynInfo>|null} [synList] PlayerInfoSynNotice synList
         */

        /**
         * Constructs a new PlayerInfoSynNotice.
         * @memberof hallserver_player
         * @classdesc Represents a PlayerInfoSynNotice.
         * @implements IPlayerInfoSynNotice
         * @constructor
         * @param {hallserver_player.IPlayerInfoSynNotice=} [properties] Properties to set
         */
        function PlayerInfoSynNotice(properties) {
            this.synList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerInfoSynNotice playerId.
         * @member {number|Long} playerId
         * @memberof hallserver_player.PlayerInfoSynNotice
         * @instance
         */
        PlayerInfoSynNotice.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PlayerInfoSynNotice synList.
         * @member {Array.<hallserver_player.IoneSynInfo>} synList
         * @memberof hallserver_player.PlayerInfoSynNotice
         * @instance
         */
        PlayerInfoSynNotice.prototype.synList = $util.emptyArray;

        /**
         * Creates a new PlayerInfoSynNotice instance using the specified properties.
         * @function create
         * @memberof hallserver_player.PlayerInfoSynNotice
         * @static
         * @param {hallserver_player.IPlayerInfoSynNotice=} [properties] Properties to set
         * @returns {hallserver_player.PlayerInfoSynNotice} PlayerInfoSynNotice instance
         */
        PlayerInfoSynNotice.create = function create(properties) {
            return new PlayerInfoSynNotice(properties);
        };

        /**
         * Encodes the specified PlayerInfoSynNotice message. Does not implicitly {@link hallserver_player.PlayerInfoSynNotice.verify|verify} messages.
         * @function encode
         * @memberof hallserver_player.PlayerInfoSynNotice
         * @static
         * @param {hallserver_player.IPlayerInfoSynNotice} message PlayerInfoSynNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfoSynNotice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            if (message.synList != null && message.synList.length)
                for (var i = 0; i < message.synList.length; ++i)
                    $root.hallserver_player.oneSynInfo.encode(message.synList[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PlayerInfoSynNotice message, length delimited. Does not implicitly {@link hallserver_player.PlayerInfoSynNotice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_player.PlayerInfoSynNotice
         * @static
         * @param {hallserver_player.IPlayerInfoSynNotice} message PlayerInfoSynNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerInfoSynNotice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerInfoSynNotice message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_player.PlayerInfoSynNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_player.PlayerInfoSynNotice} PlayerInfoSynNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfoSynNotice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_player.PlayerInfoSynNotice();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                case 2: {
                        if (!(message.synList && message.synList.length))
                            message.synList = [];
                        message.synList.push($root.hallserver_player.oneSynInfo.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerInfoSynNotice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_player.PlayerInfoSynNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_player.PlayerInfoSynNotice} PlayerInfoSynNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerInfoSynNotice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerInfoSynNotice message.
         * @function verify
         * @memberof hallserver_player.PlayerInfoSynNotice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerInfoSynNotice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            if (message.synList != null && message.hasOwnProperty("synList")) {
                if (!Array.isArray(message.synList))
                    return "synList: array expected";
                for (var i = 0; i < message.synList.length; ++i) {
                    var error = $root.hallserver_player.oneSynInfo.verify(message.synList[i]);
                    if (error)
                        return "synList." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PlayerInfoSynNotice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_player.PlayerInfoSynNotice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_player.PlayerInfoSynNotice} PlayerInfoSynNotice
         */
        PlayerInfoSynNotice.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_player.PlayerInfoSynNotice)
                return object;
            var message = new $root.hallserver_player.PlayerInfoSynNotice();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            if (object.synList) {
                if (!Array.isArray(object.synList))
                    throw TypeError(".hallserver_player.PlayerInfoSynNotice.synList: array expected");
                message.synList = [];
                for (var i = 0; i < object.synList.length; ++i) {
                    if (typeof object.synList[i] !== "object")
                        throw TypeError(".hallserver_player.PlayerInfoSynNotice.synList: object expected");
                    message.synList[i] = $root.hallserver_player.oneSynInfo.fromObject(object.synList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerInfoSynNotice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_player.PlayerInfoSynNotice
         * @static
         * @param {hallserver_player.PlayerInfoSynNotice} message PlayerInfoSynNotice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerInfoSynNotice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.synList = [];
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            if (message.synList && message.synList.length) {
                object.synList = [];
                for (var j = 0; j < message.synList.length; ++j)
                    object.synList[j] = $root.hallserver_player.oneSynInfo.toObject(message.synList[j], options);
            }
            return object;
        };

        /**
         * Converts this PlayerInfoSynNotice to JSON.
         * @function toJSON
         * @memberof hallserver_player.PlayerInfoSynNotice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerInfoSynNotice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerInfoSynNotice
         * @function getTypeUrl
         * @memberof hallserver_player.PlayerInfoSynNotice
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerInfoSynNotice.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_player.PlayerInfoSynNotice";
        };

        return PlayerInfoSynNotice;
    })();

    hallserver_player.ReqChangeNickName = (function() {

        /**
         * Properties of a ReqChangeNickName.
         * @memberof hallserver_player
         * @interface IReqChangeNickName
         * @property {string|null} [nickname] ReqChangeNickName nickname
         */

        /**
         * Constructs a new ReqChangeNickName.
         * @memberof hallserver_player
         * @classdesc Represents a ReqChangeNickName.
         * @implements IReqChangeNickName
         * @constructor
         * @param {hallserver_player.IReqChangeNickName=} [properties] Properties to set
         */
        function ReqChangeNickName(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReqChangeNickName nickname.
         * @member {string} nickname
         * @memberof hallserver_player.ReqChangeNickName
         * @instance
         */
        ReqChangeNickName.prototype.nickname = "";

        /**
         * Creates a new ReqChangeNickName instance using the specified properties.
         * @function create
         * @memberof hallserver_player.ReqChangeNickName
         * @static
         * @param {hallserver_player.IReqChangeNickName=} [properties] Properties to set
         * @returns {hallserver_player.ReqChangeNickName} ReqChangeNickName instance
         */
        ReqChangeNickName.create = function create(properties) {
            return new ReqChangeNickName(properties);
        };

        /**
         * Encodes the specified ReqChangeNickName message. Does not implicitly {@link hallserver_player.ReqChangeNickName.verify|verify} messages.
         * @function encode
         * @memberof hallserver_player.ReqChangeNickName
         * @static
         * @param {hallserver_player.IReqChangeNickName} message ReqChangeNickName message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqChangeNickName.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.nickname);
            return writer;
        };

        /**
         * Encodes the specified ReqChangeNickName message, length delimited. Does not implicitly {@link hallserver_player.ReqChangeNickName.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_player.ReqChangeNickName
         * @static
         * @param {hallserver_player.IReqChangeNickName} message ReqChangeNickName message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReqChangeNickName.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReqChangeNickName message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_player.ReqChangeNickName
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_player.ReqChangeNickName} ReqChangeNickName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqChangeNickName.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_player.ReqChangeNickName();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.nickname = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReqChangeNickName message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_player.ReqChangeNickName
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_player.ReqChangeNickName} ReqChangeNickName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReqChangeNickName.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReqChangeNickName message.
         * @function verify
         * @memberof hallserver_player.ReqChangeNickName
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReqChangeNickName.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            return null;
        };

        /**
         * Creates a ReqChangeNickName message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_player.ReqChangeNickName
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_player.ReqChangeNickName} ReqChangeNickName
         */
        ReqChangeNickName.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_player.ReqChangeNickName)
                return object;
            var message = new $root.hallserver_player.ReqChangeNickName();
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            return message;
        };

        /**
         * Creates a plain object from a ReqChangeNickName message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_player.ReqChangeNickName
         * @static
         * @param {hallserver_player.ReqChangeNickName} message ReqChangeNickName
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReqChangeNickName.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.nickname = "";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            return object;
        };

        /**
         * Converts this ReqChangeNickName to JSON.
         * @function toJSON
         * @memberof hallserver_player.ReqChangeNickName
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReqChangeNickName.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ReqChangeNickName
         * @function getTypeUrl
         * @memberof hallserver_player.ReqChangeNickName
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ReqChangeNickName.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_player.ReqChangeNickName";
        };

        return ReqChangeNickName;
    })();

    hallserver_player.ResChangeNickName = (function() {

        /**
         * Properties of a ResChangeNickName.
         * @memberof hallserver_player
         * @interface IResChangeNickName
         * @property {string|null} [nickname] ResChangeNickName nickname
         */

        /**
         * Constructs a new ResChangeNickName.
         * @memberof hallserver_player
         * @classdesc Represents a ResChangeNickName.
         * @implements IResChangeNickName
         * @constructor
         * @param {hallserver_player.IResChangeNickName=} [properties] Properties to set
         */
        function ResChangeNickName(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ResChangeNickName nickname.
         * @member {string} nickname
         * @memberof hallserver_player.ResChangeNickName
         * @instance
         */
        ResChangeNickName.prototype.nickname = "";

        /**
         * Creates a new ResChangeNickName instance using the specified properties.
         * @function create
         * @memberof hallserver_player.ResChangeNickName
         * @static
         * @param {hallserver_player.IResChangeNickName=} [properties] Properties to set
         * @returns {hallserver_player.ResChangeNickName} ResChangeNickName instance
         */
        ResChangeNickName.create = function create(properties) {
            return new ResChangeNickName(properties);
        };

        /**
         * Encodes the specified ResChangeNickName message. Does not implicitly {@link hallserver_player.ResChangeNickName.verify|verify} messages.
         * @function encode
         * @memberof hallserver_player.ResChangeNickName
         * @static
         * @param {hallserver_player.IResChangeNickName} message ResChangeNickName message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResChangeNickName.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickname);
            return writer;
        };

        /**
         * Encodes the specified ResChangeNickName message, length delimited. Does not implicitly {@link hallserver_player.ResChangeNickName.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_player.ResChangeNickName
         * @static
         * @param {hallserver_player.IResChangeNickName} message ResChangeNickName message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResChangeNickName.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ResChangeNickName message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_player.ResChangeNickName
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_player.ResChangeNickName} ResChangeNickName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResChangeNickName.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_player.ResChangeNickName();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 2: {
                        message.nickname = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ResChangeNickName message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_player.ResChangeNickName
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_player.ResChangeNickName} ResChangeNickName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResChangeNickName.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ResChangeNickName message.
         * @function verify
         * @memberof hallserver_player.ResChangeNickName
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ResChangeNickName.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            return null;
        };

        /**
         * Creates a ResChangeNickName message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_player.ResChangeNickName
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_player.ResChangeNickName} ResChangeNickName
         */
        ResChangeNickName.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_player.ResChangeNickName)
                return object;
            var message = new $root.hallserver_player.ResChangeNickName();
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            return message;
        };

        /**
         * Creates a plain object from a ResChangeNickName message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_player.ResChangeNickName
         * @static
         * @param {hallserver_player.ResChangeNickName} message ResChangeNickName
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ResChangeNickName.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.nickname = "";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            return object;
        };

        /**
         * Converts this ResChangeNickName to JSON.
         * @function toJSON
         * @memberof hallserver_player.ResChangeNickName
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ResChangeNickName.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ResChangeNickName
         * @function getTypeUrl
         * @memberof hallserver_player.ResChangeNickName
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ResChangeNickName.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_player.ResChangeNickName";
        };

        return ResChangeNickName;
    })();

    return hallserver_player;
})();

$root.hallserver_item = (function() {

    /**
     * Namespace hallserver_item.
     * @exports hallserver_item
     * @namespace
     */
    var hallserver_item = {};

    /**
     * main enum.
     * @name hallserver_item.main
     * @enum {number}
     * @property {number} hallserver_item=102 hallserver_item value
     */
    hallserver_item.main = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[102] = "hallserver_item"] = 102;
        return values;
    })();

    /**
     * sub enum.
     * @name hallserver_item.sub
     * @enum {number}
     * @property {number} ItemListNotice=80 ItemListNotice value
     */
    hallserver_item.sub = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[80] = "ItemListNotice"] = 80;
        return values;
    })();

    hallserver_item.ItemListNotice = (function() {

        /**
         * Properties of an ItemListNotice.
         * @memberof hallserver_item
         * @interface IItemListNotice
         * @property {Array.<common.IItem>|null} [itemList] ItemListNotice itemList
         */

        /**
         * Constructs a new ItemListNotice.
         * @memberof hallserver_item
         * @classdesc Represents an ItemListNotice.
         * @implements IItemListNotice
         * @constructor
         * @param {hallserver_item.IItemListNotice=} [properties] Properties to set
         */
        function ItemListNotice(properties) {
            this.itemList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ItemListNotice itemList.
         * @member {Array.<common.IItem>} itemList
         * @memberof hallserver_item.ItemListNotice
         * @instance
         */
        ItemListNotice.prototype.itemList = $util.emptyArray;

        /**
         * Creates a new ItemListNotice instance using the specified properties.
         * @function create
         * @memberof hallserver_item.ItemListNotice
         * @static
         * @param {hallserver_item.IItemListNotice=} [properties] Properties to set
         * @returns {hallserver_item.ItemListNotice} ItemListNotice instance
         */
        ItemListNotice.create = function create(properties) {
            return new ItemListNotice(properties);
        };

        /**
         * Encodes the specified ItemListNotice message. Does not implicitly {@link hallserver_item.ItemListNotice.verify|verify} messages.
         * @function encode
         * @memberof hallserver_item.ItemListNotice
         * @static
         * @param {hallserver_item.IItemListNotice} message ItemListNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemListNotice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.itemList != null && message.itemList.length)
                for (var i = 0; i < message.itemList.length; ++i)
                    $root.common.Item.encode(message.itemList[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ItemListNotice message, length delimited. Does not implicitly {@link hallserver_item.ItemListNotice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_item.ItemListNotice
         * @static
         * @param {hallserver_item.IItemListNotice} message ItemListNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemListNotice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ItemListNotice message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_item.ItemListNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_item.ItemListNotice} ItemListNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemListNotice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_item.ItemListNotice();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.itemList && message.itemList.length))
                            message.itemList = [];
                        message.itemList.push($root.common.Item.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ItemListNotice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_item.ItemListNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_item.ItemListNotice} ItemListNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemListNotice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ItemListNotice message.
         * @function verify
         * @memberof hallserver_item.ItemListNotice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ItemListNotice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.itemList != null && message.hasOwnProperty("itemList")) {
                if (!Array.isArray(message.itemList))
                    return "itemList: array expected";
                for (var i = 0; i < message.itemList.length; ++i) {
                    var error = $root.common.Item.verify(message.itemList[i]);
                    if (error)
                        return "itemList." + error;
                }
            }
            return null;
        };

        /**
         * Creates an ItemListNotice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_item.ItemListNotice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_item.ItemListNotice} ItemListNotice
         */
        ItemListNotice.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_item.ItemListNotice)
                return object;
            var message = new $root.hallserver_item.ItemListNotice();
            if (object.itemList) {
                if (!Array.isArray(object.itemList))
                    throw TypeError(".hallserver_item.ItemListNotice.itemList: array expected");
                message.itemList = [];
                for (var i = 0; i < object.itemList.length; ++i) {
                    if (typeof object.itemList[i] !== "object")
                        throw TypeError(".hallserver_item.ItemListNotice.itemList: object expected");
                    message.itemList[i] = $root.common.Item.fromObject(object.itemList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an ItemListNotice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_item.ItemListNotice
         * @static
         * @param {hallserver_item.ItemListNotice} message ItemListNotice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ItemListNotice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.itemList = [];
            if (message.itemList && message.itemList.length) {
                object.itemList = [];
                for (var j = 0; j < message.itemList.length; ++j)
                    object.itemList[j] = $root.common.Item.toObject(message.itemList[j], options);
            }
            return object;
        };

        /**
         * Converts this ItemListNotice to JSON.
         * @function toJSON
         * @memberof hallserver_item.ItemListNotice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ItemListNotice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ItemListNotice
         * @function getTypeUrl
         * @memberof hallserver_item.ItemListNotice
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ItemListNotice.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_item.ItemListNotice";
        };

        return ItemListNotice;
    })();

    return hallserver_item;
})();

$root.hallserver_match = (function() {

    /**
     * Namespace hallserver_match.
     * @exports hallserver_match
     * @namespace
     */
    var hallserver_match = {};

    /**
     * main enum.
     * @name hallserver_match.main
     * @enum {number}
     * @property {number} hallserver_match=103 hallserver_match value
     */
    hallserver_match.main = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[103] = "hallserver_match"] = 103;
        return values;
    })();

    /**
     * sub enum.
     * @name hallserver_match.sub
     * @enum {number}
     * @property {number} MatchGameReq=1 MatchGameReq value
     * @property {number} MatchGameRes=2 MatchGameRes value
     * @property {number} CancelMatchGameReq=3 CancelMatchGameReq value
     * @property {number} CancelMatchGameRes=4 CancelMatchGameRes value
     * @property {number} AcceptMatchReq=5 AcceptMatchReq value
     * @property {number} AcceptMatchRes=6 AcceptMatchRes value
     * @property {number} MatchGameNotice=80 MatchGameNotice value
     * @property {number} JoinGameNotice=81 JoinGameNotice value
     */
    hallserver_match.sub = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "MatchGameReq"] = 1;
        values[valuesById[2] = "MatchGameRes"] = 2;
        values[valuesById[3] = "CancelMatchGameReq"] = 3;
        values[valuesById[4] = "CancelMatchGameRes"] = 4;
        values[valuesById[5] = "AcceptMatchReq"] = 5;
        values[valuesById[6] = "AcceptMatchRes"] = 6;
        values[valuesById[80] = "MatchGameNotice"] = 80;
        values[valuesById[81] = "JoinGameNotice"] = 81;
        return values;
    })();

    hallserver_match.MatchGameReq = (function() {

        /**
         * Properties of a MatchGameReq.
         * @memberof hallserver_match
         * @interface IMatchGameReq
         * @property {number|null} [gameId] MatchGameReq gameId
         * @property {number|null} [playType] MatchGameReq playType
         */

        /**
         * Constructs a new MatchGameReq.
         * @memberof hallserver_match
         * @classdesc Represents a MatchGameReq.
         * @implements IMatchGameReq
         * @constructor
         * @param {hallserver_match.IMatchGameReq=} [properties] Properties to set
         */
        function MatchGameReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchGameReq gameId.
         * @member {number} gameId
         * @memberof hallserver_match.MatchGameReq
         * @instance
         */
        MatchGameReq.prototype.gameId = 0;

        /**
         * MatchGameReq playType.
         * @member {number} playType
         * @memberof hallserver_match.MatchGameReq
         * @instance
         */
        MatchGameReq.prototype.playType = 0;

        /**
         * Creates a new MatchGameReq instance using the specified properties.
         * @function create
         * @memberof hallserver_match.MatchGameReq
         * @static
         * @param {hallserver_match.IMatchGameReq=} [properties] Properties to set
         * @returns {hallserver_match.MatchGameReq} MatchGameReq instance
         */
        MatchGameReq.create = function create(properties) {
            return new MatchGameReq(properties);
        };

        /**
         * Encodes the specified MatchGameReq message. Does not implicitly {@link hallserver_match.MatchGameReq.verify|verify} messages.
         * @function encode
         * @memberof hallserver_match.MatchGameReq
         * @static
         * @param {hallserver_match.IMatchGameReq} message MatchGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchGameReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.playType != null && Object.hasOwnProperty.call(message, "playType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.playType);
            return writer;
        };

        /**
         * Encodes the specified MatchGameReq message, length delimited. Does not implicitly {@link hallserver_match.MatchGameReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_match.MatchGameReq
         * @static
         * @param {hallserver_match.IMatchGameReq} message MatchGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchGameReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchGameReq message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_match.MatchGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_match.MatchGameReq} MatchGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchGameReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_match.MatchGameReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameId = reader.int32();
                        break;
                    }
                case 2: {
                        message.playType = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MatchGameReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_match.MatchGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_match.MatchGameReq} MatchGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchGameReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchGameReq message.
         * @function verify
         * @memberof hallserver_match.MatchGameReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchGameReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.playType != null && message.hasOwnProperty("playType"))
                if (!$util.isInteger(message.playType))
                    return "playType: integer expected";
            return null;
        };

        /**
         * Creates a MatchGameReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_match.MatchGameReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_match.MatchGameReq} MatchGameReq
         */
        MatchGameReq.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_match.MatchGameReq)
                return object;
            var message = new $root.hallserver_match.MatchGameReq();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.playType != null)
                message.playType = object.playType | 0;
            return message;
        };

        /**
         * Creates a plain object from a MatchGameReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_match.MatchGameReq
         * @static
         * @param {hallserver_match.MatchGameReq} message MatchGameReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchGameReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gameId = 0;
                object.playType = 0;
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.playType != null && message.hasOwnProperty("playType"))
                object.playType = message.playType;
            return object;
        };

        /**
         * Converts this MatchGameReq to JSON.
         * @function toJSON
         * @memberof hallserver_match.MatchGameReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchGameReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchGameReq
         * @function getTypeUrl
         * @memberof hallserver_match.MatchGameReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchGameReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_match.MatchGameReq";
        };

        return MatchGameReq;
    })();

    hallserver_match.MatchGameRes = (function() {

        /**
         * Properties of a MatchGameRes.
         * @memberof hallserver_match
         * @interface IMatchGameRes
         * @property {number|null} [gameId] MatchGameRes gameId
         */

        /**
         * Constructs a new MatchGameRes.
         * @memberof hallserver_match
         * @classdesc Represents a MatchGameRes.
         * @implements IMatchGameRes
         * @constructor
         * @param {hallserver_match.IMatchGameRes=} [properties] Properties to set
         */
        function MatchGameRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchGameRes gameId.
         * @member {number} gameId
         * @memberof hallserver_match.MatchGameRes
         * @instance
         */
        MatchGameRes.prototype.gameId = 0;

        /**
         * Creates a new MatchGameRes instance using the specified properties.
         * @function create
         * @memberof hallserver_match.MatchGameRes
         * @static
         * @param {hallserver_match.IMatchGameRes=} [properties] Properties to set
         * @returns {hallserver_match.MatchGameRes} MatchGameRes instance
         */
        MatchGameRes.create = function create(properties) {
            return new MatchGameRes(properties);
        };

        /**
         * Encodes the specified MatchGameRes message. Does not implicitly {@link hallserver_match.MatchGameRes.verify|verify} messages.
         * @function encode
         * @memberof hallserver_match.MatchGameRes
         * @static
         * @param {hallserver_match.IMatchGameRes} message MatchGameRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchGameRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            return writer;
        };

        /**
         * Encodes the specified MatchGameRes message, length delimited. Does not implicitly {@link hallserver_match.MatchGameRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_match.MatchGameRes
         * @static
         * @param {hallserver_match.IMatchGameRes} message MatchGameRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchGameRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchGameRes message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_match.MatchGameRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_match.MatchGameRes} MatchGameRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchGameRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_match.MatchGameRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameId = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MatchGameRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_match.MatchGameRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_match.MatchGameRes} MatchGameRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchGameRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchGameRes message.
         * @function verify
         * @memberof hallserver_match.MatchGameRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchGameRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            return null;
        };

        /**
         * Creates a MatchGameRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_match.MatchGameRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_match.MatchGameRes} MatchGameRes
         */
        MatchGameRes.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_match.MatchGameRes)
                return object;
            var message = new $root.hallserver_match.MatchGameRes();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            return message;
        };

        /**
         * Creates a plain object from a MatchGameRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_match.MatchGameRes
         * @static
         * @param {hallserver_match.MatchGameRes} message MatchGameRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchGameRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.gameId = 0;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            return object;
        };

        /**
         * Converts this MatchGameRes to JSON.
         * @function toJSON
         * @memberof hallserver_match.MatchGameRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchGameRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchGameRes
         * @function getTypeUrl
         * @memberof hallserver_match.MatchGameRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchGameRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_match.MatchGameRes";
        };

        return MatchGameRes;
    })();

    hallserver_match.CancelMatchGameReq = (function() {

        /**
         * Properties of a CancelMatchGameReq.
         * @memberof hallserver_match
         * @interface ICancelMatchGameReq
         * @property {number|null} [gameId] CancelMatchGameReq gameId
         */

        /**
         * Constructs a new CancelMatchGameReq.
         * @memberof hallserver_match
         * @classdesc Represents a CancelMatchGameReq.
         * @implements ICancelMatchGameReq
         * @constructor
         * @param {hallserver_match.ICancelMatchGameReq=} [properties] Properties to set
         */
        function CancelMatchGameReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CancelMatchGameReq gameId.
         * @member {number} gameId
         * @memberof hallserver_match.CancelMatchGameReq
         * @instance
         */
        CancelMatchGameReq.prototype.gameId = 0;

        /**
         * Creates a new CancelMatchGameReq instance using the specified properties.
         * @function create
         * @memberof hallserver_match.CancelMatchGameReq
         * @static
         * @param {hallserver_match.ICancelMatchGameReq=} [properties] Properties to set
         * @returns {hallserver_match.CancelMatchGameReq} CancelMatchGameReq instance
         */
        CancelMatchGameReq.create = function create(properties) {
            return new CancelMatchGameReq(properties);
        };

        /**
         * Encodes the specified CancelMatchGameReq message. Does not implicitly {@link hallserver_match.CancelMatchGameReq.verify|verify} messages.
         * @function encode
         * @memberof hallserver_match.CancelMatchGameReq
         * @static
         * @param {hallserver_match.ICancelMatchGameReq} message CancelMatchGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelMatchGameReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            return writer;
        };

        /**
         * Encodes the specified CancelMatchGameReq message, length delimited. Does not implicitly {@link hallserver_match.CancelMatchGameReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_match.CancelMatchGameReq
         * @static
         * @param {hallserver_match.ICancelMatchGameReq} message CancelMatchGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelMatchGameReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CancelMatchGameReq message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_match.CancelMatchGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_match.CancelMatchGameReq} CancelMatchGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelMatchGameReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_match.CancelMatchGameReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameId = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CancelMatchGameReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_match.CancelMatchGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_match.CancelMatchGameReq} CancelMatchGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelMatchGameReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CancelMatchGameReq message.
         * @function verify
         * @memberof hallserver_match.CancelMatchGameReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CancelMatchGameReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            return null;
        };

        /**
         * Creates a CancelMatchGameReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_match.CancelMatchGameReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_match.CancelMatchGameReq} CancelMatchGameReq
         */
        CancelMatchGameReq.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_match.CancelMatchGameReq)
                return object;
            var message = new $root.hallserver_match.CancelMatchGameReq();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            return message;
        };

        /**
         * Creates a plain object from a CancelMatchGameReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_match.CancelMatchGameReq
         * @static
         * @param {hallserver_match.CancelMatchGameReq} message CancelMatchGameReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CancelMatchGameReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.gameId = 0;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            return object;
        };

        /**
         * Converts this CancelMatchGameReq to JSON.
         * @function toJSON
         * @memberof hallserver_match.CancelMatchGameReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CancelMatchGameReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CancelMatchGameReq
         * @function getTypeUrl
         * @memberof hallserver_match.CancelMatchGameReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CancelMatchGameReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_match.CancelMatchGameReq";
        };

        return CancelMatchGameReq;
    })();

    hallserver_match.CancelMatchGameRes = (function() {

        /**
         * Properties of a CancelMatchGameRes.
         * @memberof hallserver_match
         * @interface ICancelMatchGameRes
         * @property {number|null} [gameId] CancelMatchGameRes gameId
         */

        /**
         * Constructs a new CancelMatchGameRes.
         * @memberof hallserver_match
         * @classdesc Represents a CancelMatchGameRes.
         * @implements ICancelMatchGameRes
         * @constructor
         * @param {hallserver_match.ICancelMatchGameRes=} [properties] Properties to set
         */
        function CancelMatchGameRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CancelMatchGameRes gameId.
         * @member {number} gameId
         * @memberof hallserver_match.CancelMatchGameRes
         * @instance
         */
        CancelMatchGameRes.prototype.gameId = 0;

        /**
         * Creates a new CancelMatchGameRes instance using the specified properties.
         * @function create
         * @memberof hallserver_match.CancelMatchGameRes
         * @static
         * @param {hallserver_match.ICancelMatchGameRes=} [properties] Properties to set
         * @returns {hallserver_match.CancelMatchGameRes} CancelMatchGameRes instance
         */
        CancelMatchGameRes.create = function create(properties) {
            return new CancelMatchGameRes(properties);
        };

        /**
         * Encodes the specified CancelMatchGameRes message. Does not implicitly {@link hallserver_match.CancelMatchGameRes.verify|verify} messages.
         * @function encode
         * @memberof hallserver_match.CancelMatchGameRes
         * @static
         * @param {hallserver_match.ICancelMatchGameRes} message CancelMatchGameRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelMatchGameRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            return writer;
        };

        /**
         * Encodes the specified CancelMatchGameRes message, length delimited. Does not implicitly {@link hallserver_match.CancelMatchGameRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_match.CancelMatchGameRes
         * @static
         * @param {hallserver_match.ICancelMatchGameRes} message CancelMatchGameRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CancelMatchGameRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CancelMatchGameRes message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_match.CancelMatchGameRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_match.CancelMatchGameRes} CancelMatchGameRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelMatchGameRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_match.CancelMatchGameRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameId = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CancelMatchGameRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_match.CancelMatchGameRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_match.CancelMatchGameRes} CancelMatchGameRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CancelMatchGameRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CancelMatchGameRes message.
         * @function verify
         * @memberof hallserver_match.CancelMatchGameRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CancelMatchGameRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            return null;
        };

        /**
         * Creates a CancelMatchGameRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_match.CancelMatchGameRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_match.CancelMatchGameRes} CancelMatchGameRes
         */
        CancelMatchGameRes.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_match.CancelMatchGameRes)
                return object;
            var message = new $root.hallserver_match.CancelMatchGameRes();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            return message;
        };

        /**
         * Creates a plain object from a CancelMatchGameRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_match.CancelMatchGameRes
         * @static
         * @param {hallserver_match.CancelMatchGameRes} message CancelMatchGameRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CancelMatchGameRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.gameId = 0;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            return object;
        };

        /**
         * Converts this CancelMatchGameRes to JSON.
         * @function toJSON
         * @memberof hallserver_match.CancelMatchGameRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CancelMatchGameRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CancelMatchGameRes
         * @function getTypeUrl
         * @memberof hallserver_match.CancelMatchGameRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CancelMatchGameRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_match.CancelMatchGameRes";
        };

        return CancelMatchGameRes;
    })();

    hallserver_match.MatchGameNotice = (function() {

        /**
         * Properties of a MatchGameNotice.
         * @memberof hallserver_match
         * @interface IMatchGameNotice
         * @property {number|null} [gameId] MatchGameNotice gameId
         * @property {string|null} [sessionId] MatchGameNotice sessionId
         * @property {number|null} [remainTime] MatchGameNotice remainTime
         */

        /**
         * Constructs a new MatchGameNotice.
         * @memberof hallserver_match
         * @classdesc Represents a MatchGameNotice.
         * @implements IMatchGameNotice
         * @constructor
         * @param {hallserver_match.IMatchGameNotice=} [properties] Properties to set
         */
        function MatchGameNotice(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MatchGameNotice gameId.
         * @member {number} gameId
         * @memberof hallserver_match.MatchGameNotice
         * @instance
         */
        MatchGameNotice.prototype.gameId = 0;

        /**
         * MatchGameNotice sessionId.
         * @member {string} sessionId
         * @memberof hallserver_match.MatchGameNotice
         * @instance
         */
        MatchGameNotice.prototype.sessionId = "";

        /**
         * MatchGameNotice remainTime.
         * @member {number} remainTime
         * @memberof hallserver_match.MatchGameNotice
         * @instance
         */
        MatchGameNotice.prototype.remainTime = 0;

        /**
         * Creates a new MatchGameNotice instance using the specified properties.
         * @function create
         * @memberof hallserver_match.MatchGameNotice
         * @static
         * @param {hallserver_match.IMatchGameNotice=} [properties] Properties to set
         * @returns {hallserver_match.MatchGameNotice} MatchGameNotice instance
         */
        MatchGameNotice.create = function create(properties) {
            return new MatchGameNotice(properties);
        };

        /**
         * Encodes the specified MatchGameNotice message. Does not implicitly {@link hallserver_match.MatchGameNotice.verify|verify} messages.
         * @function encode
         * @memberof hallserver_match.MatchGameNotice
         * @static
         * @param {hallserver_match.IMatchGameNotice} message MatchGameNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchGameNotice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.sessionId != null && Object.hasOwnProperty.call(message, "sessionId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sessionId);
            if (message.remainTime != null && Object.hasOwnProperty.call(message, "remainTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.remainTime);
            return writer;
        };

        /**
         * Encodes the specified MatchGameNotice message, length delimited. Does not implicitly {@link hallserver_match.MatchGameNotice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_match.MatchGameNotice
         * @static
         * @param {hallserver_match.IMatchGameNotice} message MatchGameNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MatchGameNotice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MatchGameNotice message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_match.MatchGameNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_match.MatchGameNotice} MatchGameNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchGameNotice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_match.MatchGameNotice();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameId = reader.int32();
                        break;
                    }
                case 2: {
                        message.sessionId = reader.string();
                        break;
                    }
                case 3: {
                        message.remainTime = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MatchGameNotice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_match.MatchGameNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_match.MatchGameNotice} MatchGameNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MatchGameNotice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MatchGameNotice message.
         * @function verify
         * @memberof hallserver_match.MatchGameNotice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MatchGameNotice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                if (!$util.isString(message.sessionId))
                    return "sessionId: string expected";
            if (message.remainTime != null && message.hasOwnProperty("remainTime"))
                if (!$util.isInteger(message.remainTime))
                    return "remainTime: integer expected";
            return null;
        };

        /**
         * Creates a MatchGameNotice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_match.MatchGameNotice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_match.MatchGameNotice} MatchGameNotice
         */
        MatchGameNotice.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_match.MatchGameNotice)
                return object;
            var message = new $root.hallserver_match.MatchGameNotice();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.sessionId != null)
                message.sessionId = String(object.sessionId);
            if (object.remainTime != null)
                message.remainTime = object.remainTime | 0;
            return message;
        };

        /**
         * Creates a plain object from a MatchGameNotice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_match.MatchGameNotice
         * @static
         * @param {hallserver_match.MatchGameNotice} message MatchGameNotice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MatchGameNotice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gameId = 0;
                object.sessionId = "";
                object.remainTime = 0;
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                object.sessionId = message.sessionId;
            if (message.remainTime != null && message.hasOwnProperty("remainTime"))
                object.remainTime = message.remainTime;
            return object;
        };

        /**
         * Converts this MatchGameNotice to JSON.
         * @function toJSON
         * @memberof hallserver_match.MatchGameNotice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MatchGameNotice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MatchGameNotice
         * @function getTypeUrl
         * @memberof hallserver_match.MatchGameNotice
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MatchGameNotice.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_match.MatchGameNotice";
        };

        return MatchGameNotice;
    })();

    hallserver_match.AcceptMatchReq = (function() {

        /**
         * Properties of an AcceptMatchReq.
         * @memberof hallserver_match
         * @interface IAcceptMatchReq
         * @property {number|null} [gameId] AcceptMatchReq gameId
         * @property {string|null} [sessionId] AcceptMatchReq sessionId
         */

        /**
         * Constructs a new AcceptMatchReq.
         * @memberof hallserver_match
         * @classdesc Represents an AcceptMatchReq.
         * @implements IAcceptMatchReq
         * @constructor
         * @param {hallserver_match.IAcceptMatchReq=} [properties] Properties to set
         */
        function AcceptMatchReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AcceptMatchReq gameId.
         * @member {number} gameId
         * @memberof hallserver_match.AcceptMatchReq
         * @instance
         */
        AcceptMatchReq.prototype.gameId = 0;

        /**
         * AcceptMatchReq sessionId.
         * @member {string} sessionId
         * @memberof hallserver_match.AcceptMatchReq
         * @instance
         */
        AcceptMatchReq.prototype.sessionId = "";

        /**
         * Creates a new AcceptMatchReq instance using the specified properties.
         * @function create
         * @memberof hallserver_match.AcceptMatchReq
         * @static
         * @param {hallserver_match.IAcceptMatchReq=} [properties] Properties to set
         * @returns {hallserver_match.AcceptMatchReq} AcceptMatchReq instance
         */
        AcceptMatchReq.create = function create(properties) {
            return new AcceptMatchReq(properties);
        };

        /**
         * Encodes the specified AcceptMatchReq message. Does not implicitly {@link hallserver_match.AcceptMatchReq.verify|verify} messages.
         * @function encode
         * @memberof hallserver_match.AcceptMatchReq
         * @static
         * @param {hallserver_match.IAcceptMatchReq} message AcceptMatchReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AcceptMatchReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.sessionId != null && Object.hasOwnProperty.call(message, "sessionId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sessionId);
            return writer;
        };

        /**
         * Encodes the specified AcceptMatchReq message, length delimited. Does not implicitly {@link hallserver_match.AcceptMatchReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_match.AcceptMatchReq
         * @static
         * @param {hallserver_match.IAcceptMatchReq} message AcceptMatchReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AcceptMatchReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AcceptMatchReq message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_match.AcceptMatchReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_match.AcceptMatchReq} AcceptMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AcceptMatchReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_match.AcceptMatchReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameId = reader.int32();
                        break;
                    }
                case 2: {
                        message.sessionId = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AcceptMatchReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_match.AcceptMatchReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_match.AcceptMatchReq} AcceptMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AcceptMatchReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AcceptMatchReq message.
         * @function verify
         * @memberof hallserver_match.AcceptMatchReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AcceptMatchReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                if (!$util.isString(message.sessionId))
                    return "sessionId: string expected";
            return null;
        };

        /**
         * Creates an AcceptMatchReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_match.AcceptMatchReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_match.AcceptMatchReq} AcceptMatchReq
         */
        AcceptMatchReq.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_match.AcceptMatchReq)
                return object;
            var message = new $root.hallserver_match.AcceptMatchReq();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.sessionId != null)
                message.sessionId = String(object.sessionId);
            return message;
        };

        /**
         * Creates a plain object from an AcceptMatchReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_match.AcceptMatchReq
         * @static
         * @param {hallserver_match.AcceptMatchReq} message AcceptMatchReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AcceptMatchReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gameId = 0;
                object.sessionId = "";
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                object.sessionId = message.sessionId;
            return object;
        };

        /**
         * Converts this AcceptMatchReq to JSON.
         * @function toJSON
         * @memberof hallserver_match.AcceptMatchReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AcceptMatchReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AcceptMatchReq
         * @function getTypeUrl
         * @memberof hallserver_match.AcceptMatchReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AcceptMatchReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_match.AcceptMatchReq";
        };

        return AcceptMatchReq;
    })();

    hallserver_match.AcceptMatchRes = (function() {

        /**
         * Properties of an AcceptMatchRes.
         * @memberof hallserver_match
         * @interface IAcceptMatchRes
         * @property {number|null} [gameId] AcceptMatchRes gameId
         * @property {string|null} [sessionId] AcceptMatchRes sessionId
         */

        /**
         * Constructs a new AcceptMatchRes.
         * @memberof hallserver_match
         * @classdesc Represents an AcceptMatchRes.
         * @implements IAcceptMatchRes
         * @constructor
         * @param {hallserver_match.IAcceptMatchRes=} [properties] Properties to set
         */
        function AcceptMatchRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AcceptMatchRes gameId.
         * @member {number} gameId
         * @memberof hallserver_match.AcceptMatchRes
         * @instance
         */
        AcceptMatchRes.prototype.gameId = 0;

        /**
         * AcceptMatchRes sessionId.
         * @member {string} sessionId
         * @memberof hallserver_match.AcceptMatchRes
         * @instance
         */
        AcceptMatchRes.prototype.sessionId = "";

        /**
         * Creates a new AcceptMatchRes instance using the specified properties.
         * @function create
         * @memberof hallserver_match.AcceptMatchRes
         * @static
         * @param {hallserver_match.IAcceptMatchRes=} [properties] Properties to set
         * @returns {hallserver_match.AcceptMatchRes} AcceptMatchRes instance
         */
        AcceptMatchRes.create = function create(properties) {
            return new AcceptMatchRes(properties);
        };

        /**
         * Encodes the specified AcceptMatchRes message. Does not implicitly {@link hallserver_match.AcceptMatchRes.verify|verify} messages.
         * @function encode
         * @memberof hallserver_match.AcceptMatchRes
         * @static
         * @param {hallserver_match.IAcceptMatchRes} message AcceptMatchRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AcceptMatchRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gameId);
            if (message.sessionId != null && Object.hasOwnProperty.call(message, "sessionId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sessionId);
            return writer;
        };

        /**
         * Encodes the specified AcceptMatchRes message, length delimited. Does not implicitly {@link hallserver_match.AcceptMatchRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_match.AcceptMatchRes
         * @static
         * @param {hallserver_match.IAcceptMatchRes} message AcceptMatchRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AcceptMatchRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AcceptMatchRes message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_match.AcceptMatchRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_match.AcceptMatchRes} AcceptMatchRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AcceptMatchRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_match.AcceptMatchRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gameId = reader.int32();
                        break;
                    }
                case 2: {
                        message.sessionId = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AcceptMatchRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_match.AcceptMatchRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_match.AcceptMatchRes} AcceptMatchRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AcceptMatchRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AcceptMatchRes message.
         * @function verify
         * @memberof hallserver_match.AcceptMatchRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AcceptMatchRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                if (!$util.isString(message.sessionId))
                    return "sessionId: string expected";
            return null;
        };

        /**
         * Creates an AcceptMatchRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_match.AcceptMatchRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_match.AcceptMatchRes} AcceptMatchRes
         */
        AcceptMatchRes.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_match.AcceptMatchRes)
                return object;
            var message = new $root.hallserver_match.AcceptMatchRes();
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.sessionId != null)
                message.sessionId = String(object.sessionId);
            return message;
        };

        /**
         * Creates a plain object from an AcceptMatchRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_match.AcceptMatchRes
         * @static
         * @param {hallserver_match.AcceptMatchRes} message AcceptMatchRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AcceptMatchRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gameId = 0;
                object.sessionId = "";
            }
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.sessionId != null && message.hasOwnProperty("sessionId"))
                object.sessionId = message.sessionId;
            return object;
        };

        /**
         * Converts this AcceptMatchRes to JSON.
         * @function toJSON
         * @memberof hallserver_match.AcceptMatchRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AcceptMatchRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AcceptMatchRes
         * @function getTypeUrl
         * @memberof hallserver_match.AcceptMatchRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AcceptMatchRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_match.AcceptMatchRes";
        };

        return AcceptMatchRes;
    })();

    hallserver_match.JoinGameNotice = (function() {

        /**
         * Properties of a JoinGameNotice.
         * @memberof hallserver_match
         * @interface IJoinGameNotice
         * @property {string|null} [gamehost] JoinGameNotice gamehost
         * @property {string|null} [gametoken] JoinGameNotice gametoken
         * @property {string|null} [tableId] JoinGameNotice tableId
         */

        /**
         * Constructs a new JoinGameNotice.
         * @memberof hallserver_match
         * @classdesc Represents a JoinGameNotice.
         * @implements IJoinGameNotice
         * @constructor
         * @param {hallserver_match.IJoinGameNotice=} [properties] Properties to set
         */
        function JoinGameNotice(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinGameNotice gamehost.
         * @member {string} gamehost
         * @memberof hallserver_match.JoinGameNotice
         * @instance
         */
        JoinGameNotice.prototype.gamehost = "";

        /**
         * JoinGameNotice gametoken.
         * @member {string} gametoken
         * @memberof hallserver_match.JoinGameNotice
         * @instance
         */
        JoinGameNotice.prototype.gametoken = "";

        /**
         * JoinGameNotice tableId.
         * @member {string} tableId
         * @memberof hallserver_match.JoinGameNotice
         * @instance
         */
        JoinGameNotice.prototype.tableId = "";

        /**
         * Creates a new JoinGameNotice instance using the specified properties.
         * @function create
         * @memberof hallserver_match.JoinGameNotice
         * @static
         * @param {hallserver_match.IJoinGameNotice=} [properties] Properties to set
         * @returns {hallserver_match.JoinGameNotice} JoinGameNotice instance
         */
        JoinGameNotice.create = function create(properties) {
            return new JoinGameNotice(properties);
        };

        /**
         * Encodes the specified JoinGameNotice message. Does not implicitly {@link hallserver_match.JoinGameNotice.verify|verify} messages.
         * @function encode
         * @memberof hallserver_match.JoinGameNotice
         * @static
         * @param {hallserver_match.IJoinGameNotice} message JoinGameNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinGameNotice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gamehost != null && Object.hasOwnProperty.call(message, "gamehost"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gamehost);
            if (message.gametoken != null && Object.hasOwnProperty.call(message, "gametoken"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.gametoken);
            if (message.tableId != null && Object.hasOwnProperty.call(message, "tableId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.tableId);
            return writer;
        };

        /**
         * Encodes the specified JoinGameNotice message, length delimited. Does not implicitly {@link hallserver_match.JoinGameNotice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_match.JoinGameNotice
         * @static
         * @param {hallserver_match.IJoinGameNotice} message JoinGameNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinGameNotice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinGameNotice message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_match.JoinGameNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_match.JoinGameNotice} JoinGameNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinGameNotice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_match.JoinGameNotice();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.gamehost = reader.string();
                        break;
                    }
                case 2: {
                        message.gametoken = reader.string();
                        break;
                    }
                case 3: {
                        message.tableId = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinGameNotice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_match.JoinGameNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_match.JoinGameNotice} JoinGameNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinGameNotice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinGameNotice message.
         * @function verify
         * @memberof hallserver_match.JoinGameNotice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinGameNotice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gamehost != null && message.hasOwnProperty("gamehost"))
                if (!$util.isString(message.gamehost))
                    return "gamehost: string expected";
            if (message.gametoken != null && message.hasOwnProperty("gametoken"))
                if (!$util.isString(message.gametoken))
                    return "gametoken: string expected";
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                if (!$util.isString(message.tableId))
                    return "tableId: string expected";
            return null;
        };

        /**
         * Creates a JoinGameNotice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_match.JoinGameNotice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_match.JoinGameNotice} JoinGameNotice
         */
        JoinGameNotice.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_match.JoinGameNotice)
                return object;
            var message = new $root.hallserver_match.JoinGameNotice();
            if (object.gamehost != null)
                message.gamehost = String(object.gamehost);
            if (object.gametoken != null)
                message.gametoken = String(object.gametoken);
            if (object.tableId != null)
                message.tableId = String(object.tableId);
            return message;
        };

        /**
         * Creates a plain object from a JoinGameNotice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_match.JoinGameNotice
         * @static
         * @param {hallserver_match.JoinGameNotice} message JoinGameNotice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinGameNotice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gamehost = "";
                object.gametoken = "";
                object.tableId = "";
            }
            if (message.gamehost != null && message.hasOwnProperty("gamehost"))
                object.gamehost = message.gamehost;
            if (message.gametoken != null && message.hasOwnProperty("gametoken"))
                object.gametoken = message.gametoken;
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                object.tableId = message.tableId;
            return object;
        };

        /**
         * Converts this JoinGameNotice to JSON.
         * @function toJSON
         * @memberof hallserver_match.JoinGameNotice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinGameNotice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for JoinGameNotice
         * @function getTypeUrl
         * @memberof hallserver_match.JoinGameNotice
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        JoinGameNotice.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_match.JoinGameNotice";
        };

        return JoinGameNotice;
    })();

    return hallserver_match;
})();

$root.hallserver_friend = (function() {

    /**
     * Namespace hallserver_friend.
     * @exports hallserver_friend
     * @namespace
     */
    var hallserver_friend = {};

    /**
     * main enum.
     * @name hallserver_friend.main
     * @enum {number}
     * @property {number} hallserver_friend=104 hallserver_friend value
     */
    hallserver_friend.main = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[104] = "hallserver_friend"] = 104;
        return values;
    })();

    /**
     * sub enum.
     * @name hallserver_friend.sub
     * @enum {number}
     * @property {number} FriendListReq=1 FriendListReq value
     * @property {number} FriendListRes=2 FriendListRes value
     * @property {number} AddFriendReq=3 AddFriendReq value
     * @property {number} AddFriendRes=4 AddFriendRes value
     * @property {number} AgreeAddFriendReq=5 AgreeAddFriendReq value
     * @property {number} AgreeAddFriendRes=6 AgreeAddFriendRes value
     * @property {number} RefuseAddFriendReq=7 RefuseAddFriendReq value
     * @property {number} RefuseAddFriendRes=8 RefuseAddFriendRes value
     * @property {number} DelFriendReq=9 DelFriendReq value
     * @property {number} DelFriendRes=10 DelFriendRes value
     * @property {number} AddReqListNotice=80 AddReqListNotice value
     */
    hallserver_friend.sub = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "FriendListReq"] = 1;
        values[valuesById[2] = "FriendListRes"] = 2;
        values[valuesById[3] = "AddFriendReq"] = 3;
        values[valuesById[4] = "AddFriendRes"] = 4;
        values[valuesById[5] = "AgreeAddFriendReq"] = 5;
        values[valuesById[6] = "AgreeAddFriendRes"] = 6;
        values[valuesById[7] = "RefuseAddFriendReq"] = 7;
        values[valuesById[8] = "RefuseAddFriendRes"] = 8;
        values[valuesById[9] = "DelFriendReq"] = 9;
        values[valuesById[10] = "DelFriendRes"] = 10;
        values[valuesById[80] = "AddReqListNotice"] = 80;
        return values;
    })();

    hallserver_friend.OneFriend = (function() {

        /**
         * Properties of an OneFriend.
         * @memberof hallserver_friend
         * @interface IOneFriend
         * @property {number|Long|null} [playerId] OneFriend playerId
         * @property {string|null} [nickname] OneFriend nickname
         * @property {number|Long|null} [lastLogoutTime] OneFriend lastLogoutTime
         * @property {number|null} [isOnline] OneFriend isOnline
         */

        /**
         * Constructs a new OneFriend.
         * @memberof hallserver_friend
         * @classdesc Represents an OneFriend.
         * @implements IOneFriend
         * @constructor
         * @param {hallserver_friend.IOneFriend=} [properties] Properties to set
         */
        function OneFriend(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OneFriend playerId.
         * @member {number|Long} playerId
         * @memberof hallserver_friend.OneFriend
         * @instance
         */
        OneFriend.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * OneFriend nickname.
         * @member {string} nickname
         * @memberof hallserver_friend.OneFriend
         * @instance
         */
        OneFriend.prototype.nickname = "";

        /**
         * OneFriend lastLogoutTime.
         * @member {number|Long} lastLogoutTime
         * @memberof hallserver_friend.OneFriend
         * @instance
         */
        OneFriend.prototype.lastLogoutTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * OneFriend isOnline.
         * @member {number} isOnline
         * @memberof hallserver_friend.OneFriend
         * @instance
         */
        OneFriend.prototype.isOnline = 0;

        /**
         * Creates a new OneFriend instance using the specified properties.
         * @function create
         * @memberof hallserver_friend.OneFriend
         * @static
         * @param {hallserver_friend.IOneFriend=} [properties] Properties to set
         * @returns {hallserver_friend.OneFriend} OneFriend instance
         */
        OneFriend.create = function create(properties) {
            return new OneFriend(properties);
        };

        /**
         * Encodes the specified OneFriend message. Does not implicitly {@link hallserver_friend.OneFriend.verify|verify} messages.
         * @function encode
         * @memberof hallserver_friend.OneFriend
         * @static
         * @param {hallserver_friend.IOneFriend} message OneFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OneFriend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickname);
            if (message.lastLogoutTime != null && Object.hasOwnProperty.call(message, "lastLogoutTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.lastLogoutTime);
            if (message.isOnline != null && Object.hasOwnProperty.call(message, "isOnline"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.isOnline);
            return writer;
        };

        /**
         * Encodes the specified OneFriend message, length delimited. Does not implicitly {@link hallserver_friend.OneFriend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_friend.OneFriend
         * @static
         * @param {hallserver_friend.IOneFriend} message OneFriend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OneFriend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OneFriend message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_friend.OneFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_friend.OneFriend} OneFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OneFriend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_friend.OneFriend();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                case 2: {
                        message.nickname = reader.string();
                        break;
                    }
                case 3: {
                        message.lastLogoutTime = reader.int64();
                        break;
                    }
                case 4: {
                        message.isOnline = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OneFriend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_friend.OneFriend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_friend.OneFriend} OneFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OneFriend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OneFriend message.
         * @function verify
         * @memberof hallserver_friend.OneFriend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OneFriend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.lastLogoutTime != null && message.hasOwnProperty("lastLogoutTime"))
                if (!$util.isInteger(message.lastLogoutTime) && !(message.lastLogoutTime && $util.isInteger(message.lastLogoutTime.low) && $util.isInteger(message.lastLogoutTime.high)))
                    return "lastLogoutTime: integer|Long expected";
            if (message.isOnline != null && message.hasOwnProperty("isOnline"))
                if (!$util.isInteger(message.isOnline))
                    return "isOnline: integer expected";
            return null;
        };

        /**
         * Creates an OneFriend message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_friend.OneFriend
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_friend.OneFriend} OneFriend
         */
        OneFriend.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_friend.OneFriend)
                return object;
            var message = new $root.hallserver_friend.OneFriend();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.lastLogoutTime != null)
                if ($util.Long)
                    (message.lastLogoutTime = $util.Long.fromValue(object.lastLogoutTime)).unsigned = false;
                else if (typeof object.lastLogoutTime === "string")
                    message.lastLogoutTime = parseInt(object.lastLogoutTime, 10);
                else if (typeof object.lastLogoutTime === "number")
                    message.lastLogoutTime = object.lastLogoutTime;
                else if (typeof object.lastLogoutTime === "object")
                    message.lastLogoutTime = new $util.LongBits(object.lastLogoutTime.low >>> 0, object.lastLogoutTime.high >>> 0).toNumber();
            if (object.isOnline != null)
                message.isOnline = object.isOnline | 0;
            return message;
        };

        /**
         * Creates a plain object from an OneFriend message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_friend.OneFriend
         * @static
         * @param {hallserver_friend.OneFriend} message OneFriend
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OneFriend.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
                object.nickname = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.lastLogoutTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.lastLogoutTime = options.longs === String ? "0" : 0;
                object.isOnline = 0;
            }
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.lastLogoutTime != null && message.hasOwnProperty("lastLogoutTime"))
                if (typeof message.lastLogoutTime === "number")
                    object.lastLogoutTime = options.longs === String ? String(message.lastLogoutTime) : message.lastLogoutTime;
                else
                    object.lastLogoutTime = options.longs === String ? $util.Long.prototype.toString.call(message.lastLogoutTime) : options.longs === Number ? new $util.LongBits(message.lastLogoutTime.low >>> 0, message.lastLogoutTime.high >>> 0).toNumber() : message.lastLogoutTime;
            if (message.isOnline != null && message.hasOwnProperty("isOnline"))
                object.isOnline = message.isOnline;
            return object;
        };

        /**
         * Converts this OneFriend to JSON.
         * @function toJSON
         * @memberof hallserver_friend.OneFriend
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OneFriend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for OneFriend
         * @function getTypeUrl
         * @memberof hallserver_friend.OneFriend
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        OneFriend.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_friend.OneFriend";
        };

        return OneFriend;
    })();

    hallserver_friend.FriendListReq = (function() {

        /**
         * Properties of a FriendListReq.
         * @memberof hallserver_friend
         * @interface IFriendListReq
         * @property {number|null} [pageageNum] FriendListReq pageageNum
         * @property {number|null} [pageageCount] FriendListReq pageageCount
         */

        /**
         * Constructs a new FriendListReq.
         * @memberof hallserver_friend
         * @classdesc Represents a FriendListReq.
         * @implements IFriendListReq
         * @constructor
         * @param {hallserver_friend.IFriendListReq=} [properties] Properties to set
         */
        function FriendListReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FriendListReq pageageNum.
         * @member {number} pageageNum
         * @memberof hallserver_friend.FriendListReq
         * @instance
         */
        FriendListReq.prototype.pageageNum = 0;

        /**
         * FriendListReq pageageCount.
         * @member {number} pageageCount
         * @memberof hallserver_friend.FriendListReq
         * @instance
         */
        FriendListReq.prototype.pageageCount = 0;

        /**
         * Creates a new FriendListReq instance using the specified properties.
         * @function create
         * @memberof hallserver_friend.FriendListReq
         * @static
         * @param {hallserver_friend.IFriendListReq=} [properties] Properties to set
         * @returns {hallserver_friend.FriendListReq} FriendListReq instance
         */
        FriendListReq.create = function create(properties) {
            return new FriendListReq(properties);
        };

        /**
         * Encodes the specified FriendListReq message. Does not implicitly {@link hallserver_friend.FriendListReq.verify|verify} messages.
         * @function encode
         * @memberof hallserver_friend.FriendListReq
         * @static
         * @param {hallserver_friend.IFriendListReq} message FriendListReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FriendListReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pageageNum != null && Object.hasOwnProperty.call(message, "pageageNum"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.pageageNum);
            if (message.pageageCount != null && Object.hasOwnProperty.call(message, "pageageCount"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pageageCount);
            return writer;
        };

        /**
         * Encodes the specified FriendListReq message, length delimited. Does not implicitly {@link hallserver_friend.FriendListReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_friend.FriendListReq
         * @static
         * @param {hallserver_friend.IFriendListReq} message FriendListReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FriendListReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FriendListReq message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_friend.FriendListReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_friend.FriendListReq} FriendListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FriendListReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_friend.FriendListReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.pageageNum = reader.uint32();
                        break;
                    }
                case 2: {
                        message.pageageCount = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FriendListReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_friend.FriendListReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_friend.FriendListReq} FriendListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FriendListReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FriendListReq message.
         * @function verify
         * @memberof hallserver_friend.FriendListReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FriendListReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pageageNum != null && message.hasOwnProperty("pageageNum"))
                if (!$util.isInteger(message.pageageNum))
                    return "pageageNum: integer expected";
            if (message.pageageCount != null && message.hasOwnProperty("pageageCount"))
                if (!$util.isInteger(message.pageageCount))
                    return "pageageCount: integer expected";
            return null;
        };

        /**
         * Creates a FriendListReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_friend.FriendListReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_friend.FriendListReq} FriendListReq
         */
        FriendListReq.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_friend.FriendListReq)
                return object;
            var message = new $root.hallserver_friend.FriendListReq();
            if (object.pageageNum != null)
                message.pageageNum = object.pageageNum >>> 0;
            if (object.pageageCount != null)
                message.pageageCount = object.pageageCount >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a FriendListReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_friend.FriendListReq
         * @static
         * @param {hallserver_friend.FriendListReq} message FriendListReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FriendListReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.pageageNum = 0;
                object.pageageCount = 0;
            }
            if (message.pageageNum != null && message.hasOwnProperty("pageageNum"))
                object.pageageNum = message.pageageNum;
            if (message.pageageCount != null && message.hasOwnProperty("pageageCount"))
                object.pageageCount = message.pageageCount;
            return object;
        };

        /**
         * Converts this FriendListReq to JSON.
         * @function toJSON
         * @memberof hallserver_friend.FriendListReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FriendListReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for FriendListReq
         * @function getTypeUrl
         * @memberof hallserver_friend.FriendListReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        FriendListReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_friend.FriendListReq";
        };

        return FriendListReq;
    })();

    hallserver_friend.FriendListRes = (function() {

        /**
         * Properties of a FriendListRes.
         * @memberof hallserver_friend
         * @interface IFriendListRes
         * @property {number|null} [pageageNum] FriendListRes pageageNum
         * @property {number|null} [pageageCount] FriendListRes pageageCount
         * @property {number|null} [totalCount] FriendListRes totalCount
         * @property {Array.<hallserver_friend.IOneFriend>|null} [friendList] FriendListRes friendList
         */

        /**
         * Constructs a new FriendListRes.
         * @memberof hallserver_friend
         * @classdesc Represents a FriendListRes.
         * @implements IFriendListRes
         * @constructor
         * @param {hallserver_friend.IFriendListRes=} [properties] Properties to set
         */
        function FriendListRes(properties) {
            this.friendList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FriendListRes pageageNum.
         * @member {number} pageageNum
         * @memberof hallserver_friend.FriendListRes
         * @instance
         */
        FriendListRes.prototype.pageageNum = 0;

        /**
         * FriendListRes pageageCount.
         * @member {number} pageageCount
         * @memberof hallserver_friend.FriendListRes
         * @instance
         */
        FriendListRes.prototype.pageageCount = 0;

        /**
         * FriendListRes totalCount.
         * @member {number} totalCount
         * @memberof hallserver_friend.FriendListRes
         * @instance
         */
        FriendListRes.prototype.totalCount = 0;

        /**
         * FriendListRes friendList.
         * @member {Array.<hallserver_friend.IOneFriend>} friendList
         * @memberof hallserver_friend.FriendListRes
         * @instance
         */
        FriendListRes.prototype.friendList = $util.emptyArray;

        /**
         * Creates a new FriendListRes instance using the specified properties.
         * @function create
         * @memberof hallserver_friend.FriendListRes
         * @static
         * @param {hallserver_friend.IFriendListRes=} [properties] Properties to set
         * @returns {hallserver_friend.FriendListRes} FriendListRes instance
         */
        FriendListRes.create = function create(properties) {
            return new FriendListRes(properties);
        };

        /**
         * Encodes the specified FriendListRes message. Does not implicitly {@link hallserver_friend.FriendListRes.verify|verify} messages.
         * @function encode
         * @memberof hallserver_friend.FriendListRes
         * @static
         * @param {hallserver_friend.IFriendListRes} message FriendListRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FriendListRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pageageNum != null && Object.hasOwnProperty.call(message, "pageageNum"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.pageageNum);
            if (message.pageageCount != null && Object.hasOwnProperty.call(message, "pageageCount"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pageageCount);
            if (message.totalCount != null && Object.hasOwnProperty.call(message, "totalCount"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.totalCount);
            if (message.friendList != null && message.friendList.length)
                for (var i = 0; i < message.friendList.length; ++i)
                    $root.hallserver_friend.OneFriend.encode(message.friendList[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified FriendListRes message, length delimited. Does not implicitly {@link hallserver_friend.FriendListRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_friend.FriendListRes
         * @static
         * @param {hallserver_friend.IFriendListRes} message FriendListRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FriendListRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FriendListRes message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_friend.FriendListRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_friend.FriendListRes} FriendListRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FriendListRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_friend.FriendListRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.pageageNum = reader.uint32();
                        break;
                    }
                case 2: {
                        message.pageageCount = reader.uint32();
                        break;
                    }
                case 3: {
                        message.totalCount = reader.uint32();
                        break;
                    }
                case 4: {
                        if (!(message.friendList && message.friendList.length))
                            message.friendList = [];
                        message.friendList.push($root.hallserver_friend.OneFriend.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FriendListRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_friend.FriendListRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_friend.FriendListRes} FriendListRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FriendListRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FriendListRes message.
         * @function verify
         * @memberof hallserver_friend.FriendListRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FriendListRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pageageNum != null && message.hasOwnProperty("pageageNum"))
                if (!$util.isInteger(message.pageageNum))
                    return "pageageNum: integer expected";
            if (message.pageageCount != null && message.hasOwnProperty("pageageCount"))
                if (!$util.isInteger(message.pageageCount))
                    return "pageageCount: integer expected";
            if (message.totalCount != null && message.hasOwnProperty("totalCount"))
                if (!$util.isInteger(message.totalCount))
                    return "totalCount: integer expected";
            if (message.friendList != null && message.hasOwnProperty("friendList")) {
                if (!Array.isArray(message.friendList))
                    return "friendList: array expected";
                for (var i = 0; i < message.friendList.length; ++i) {
                    var error = $root.hallserver_friend.OneFriend.verify(message.friendList[i]);
                    if (error)
                        return "friendList." + error;
                }
            }
            return null;
        };

        /**
         * Creates a FriendListRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_friend.FriendListRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_friend.FriendListRes} FriendListRes
         */
        FriendListRes.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_friend.FriendListRes)
                return object;
            var message = new $root.hallserver_friend.FriendListRes();
            if (object.pageageNum != null)
                message.pageageNum = object.pageageNum >>> 0;
            if (object.pageageCount != null)
                message.pageageCount = object.pageageCount >>> 0;
            if (object.totalCount != null)
                message.totalCount = object.totalCount >>> 0;
            if (object.friendList) {
                if (!Array.isArray(object.friendList))
                    throw TypeError(".hallserver_friend.FriendListRes.friendList: array expected");
                message.friendList = [];
                for (var i = 0; i < object.friendList.length; ++i) {
                    if (typeof object.friendList[i] !== "object")
                        throw TypeError(".hallserver_friend.FriendListRes.friendList: object expected");
                    message.friendList[i] = $root.hallserver_friend.OneFriend.fromObject(object.friendList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a FriendListRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_friend.FriendListRes
         * @static
         * @param {hallserver_friend.FriendListRes} message FriendListRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FriendListRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.friendList = [];
            if (options.defaults) {
                object.pageageNum = 0;
                object.pageageCount = 0;
                object.totalCount = 0;
            }
            if (message.pageageNum != null && message.hasOwnProperty("pageageNum"))
                object.pageageNum = message.pageageNum;
            if (message.pageageCount != null && message.hasOwnProperty("pageageCount"))
                object.pageageCount = message.pageageCount;
            if (message.totalCount != null && message.hasOwnProperty("totalCount"))
                object.totalCount = message.totalCount;
            if (message.friendList && message.friendList.length) {
                object.friendList = [];
                for (var j = 0; j < message.friendList.length; ++j)
                    object.friendList[j] = $root.hallserver_friend.OneFriend.toObject(message.friendList[j], options);
            }
            return object;
        };

        /**
         * Converts this FriendListRes to JSON.
         * @function toJSON
         * @memberof hallserver_friend.FriendListRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FriendListRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for FriendListRes
         * @function getTypeUrl
         * @memberof hallserver_friend.FriendListRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        FriendListRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_friend.FriendListRes";
        };

        return FriendListRes;
    })();

    hallserver_friend.AddFriendReq = (function() {

        /**
         * Properties of an AddFriendReq.
         * @memberof hallserver_friend
         * @interface IAddFriendReq
         * @property {number|Long|null} [playerId] AddFriendReq playerId
         */

        /**
         * Constructs a new AddFriendReq.
         * @memberof hallserver_friend
         * @classdesc Represents an AddFriendReq.
         * @implements IAddFriendReq
         * @constructor
         * @param {hallserver_friend.IAddFriendReq=} [properties] Properties to set
         */
        function AddFriendReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AddFriendReq playerId.
         * @member {number|Long} playerId
         * @memberof hallserver_friend.AddFriendReq
         * @instance
         */
        AddFriendReq.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new AddFriendReq instance using the specified properties.
         * @function create
         * @memberof hallserver_friend.AddFriendReq
         * @static
         * @param {hallserver_friend.IAddFriendReq=} [properties] Properties to set
         * @returns {hallserver_friend.AddFriendReq} AddFriendReq instance
         */
        AddFriendReq.create = function create(properties) {
            return new AddFriendReq(properties);
        };

        /**
         * Encodes the specified AddFriendReq message. Does not implicitly {@link hallserver_friend.AddFriendReq.verify|verify} messages.
         * @function encode
         * @memberof hallserver_friend.AddFriendReq
         * @static
         * @param {hallserver_friend.IAddFriendReq} message AddFriendReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddFriendReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            return writer;
        };

        /**
         * Encodes the specified AddFriendReq message, length delimited. Does not implicitly {@link hallserver_friend.AddFriendReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_friend.AddFriendReq
         * @static
         * @param {hallserver_friend.IAddFriendReq} message AddFriendReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddFriendReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AddFriendReq message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_friend.AddFriendReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_friend.AddFriendReq} AddFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddFriendReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_friend.AddFriendReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AddFriendReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_friend.AddFriendReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_friend.AddFriendReq} AddFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddFriendReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AddFriendReq message.
         * @function verify
         * @memberof hallserver_friend.AddFriendReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AddFriendReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            return null;
        };

        /**
         * Creates an AddFriendReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_friend.AddFriendReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_friend.AddFriendReq} AddFriendReq
         */
        AddFriendReq.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_friend.AddFriendReq)
                return object;
            var message = new $root.hallserver_friend.AddFriendReq();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an AddFriendReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_friend.AddFriendReq
         * @static
         * @param {hallserver_friend.AddFriendReq} message AddFriendReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AddFriendReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            return object;
        };

        /**
         * Converts this AddFriendReq to JSON.
         * @function toJSON
         * @memberof hallserver_friend.AddFriendReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AddFriendReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AddFriendReq
         * @function getTypeUrl
         * @memberof hallserver_friend.AddFriendReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AddFriendReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_friend.AddFriendReq";
        };

        return AddFriendReq;
    })();

    hallserver_friend.AddFriendRes = (function() {

        /**
         * Properties of an AddFriendRes.
         * @memberof hallserver_friend
         * @interface IAddFriendRes
         * @property {number|Long|null} [playerId] AddFriendRes playerId
         */

        /**
         * Constructs a new AddFriendRes.
         * @memberof hallserver_friend
         * @classdesc Represents an AddFriendRes.
         * @implements IAddFriendRes
         * @constructor
         * @param {hallserver_friend.IAddFriendRes=} [properties] Properties to set
         */
        function AddFriendRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AddFriendRes playerId.
         * @member {number|Long} playerId
         * @memberof hallserver_friend.AddFriendRes
         * @instance
         */
        AddFriendRes.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new AddFriendRes instance using the specified properties.
         * @function create
         * @memberof hallserver_friend.AddFriendRes
         * @static
         * @param {hallserver_friend.IAddFriendRes=} [properties] Properties to set
         * @returns {hallserver_friend.AddFriendRes} AddFriendRes instance
         */
        AddFriendRes.create = function create(properties) {
            return new AddFriendRes(properties);
        };

        /**
         * Encodes the specified AddFriendRes message. Does not implicitly {@link hallserver_friend.AddFriendRes.verify|verify} messages.
         * @function encode
         * @memberof hallserver_friend.AddFriendRes
         * @static
         * @param {hallserver_friend.IAddFriendRes} message AddFriendRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddFriendRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            return writer;
        };

        /**
         * Encodes the specified AddFriendRes message, length delimited. Does not implicitly {@link hallserver_friend.AddFriendRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_friend.AddFriendRes
         * @static
         * @param {hallserver_friend.IAddFriendRes} message AddFriendRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddFriendRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AddFriendRes message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_friend.AddFriendRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_friend.AddFriendRes} AddFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddFriendRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_friend.AddFriendRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AddFriendRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_friend.AddFriendRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_friend.AddFriendRes} AddFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddFriendRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AddFriendRes message.
         * @function verify
         * @memberof hallserver_friend.AddFriendRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AddFriendRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            return null;
        };

        /**
         * Creates an AddFriendRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_friend.AddFriendRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_friend.AddFriendRes} AddFriendRes
         */
        AddFriendRes.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_friend.AddFriendRes)
                return object;
            var message = new $root.hallserver_friend.AddFriendRes();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an AddFriendRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_friend.AddFriendRes
         * @static
         * @param {hallserver_friend.AddFriendRes} message AddFriendRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AddFriendRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            return object;
        };

        /**
         * Converts this AddFriendRes to JSON.
         * @function toJSON
         * @memberof hallserver_friend.AddFriendRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AddFriendRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AddFriendRes
         * @function getTypeUrl
         * @memberof hallserver_friend.AddFriendRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AddFriendRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_friend.AddFriendRes";
        };

        return AddFriendRes;
    })();

    hallserver_friend.AddReqListNotice = (function() {

        /**
         * Properties of an AddReqListNotice.
         * @memberof hallserver_friend
         * @interface IAddReqListNotice
         * @property {Array.<number|Long>|null} [playerIdList] AddReqListNotice playerIdList
         * @property {Array.<string>|null} [nicknameList] AddReqListNotice nicknameList
         */

        /**
         * Constructs a new AddReqListNotice.
         * @memberof hallserver_friend
         * @classdesc Represents an AddReqListNotice.
         * @implements IAddReqListNotice
         * @constructor
         * @param {hallserver_friend.IAddReqListNotice=} [properties] Properties to set
         */
        function AddReqListNotice(properties) {
            this.playerIdList = [];
            this.nicknameList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AddReqListNotice playerIdList.
         * @member {Array.<number|Long>} playerIdList
         * @memberof hallserver_friend.AddReqListNotice
         * @instance
         */
        AddReqListNotice.prototype.playerIdList = $util.emptyArray;

        /**
         * AddReqListNotice nicknameList.
         * @member {Array.<string>} nicknameList
         * @memberof hallserver_friend.AddReqListNotice
         * @instance
         */
        AddReqListNotice.prototype.nicknameList = $util.emptyArray;

        /**
         * Creates a new AddReqListNotice instance using the specified properties.
         * @function create
         * @memberof hallserver_friend.AddReqListNotice
         * @static
         * @param {hallserver_friend.IAddReqListNotice=} [properties] Properties to set
         * @returns {hallserver_friend.AddReqListNotice} AddReqListNotice instance
         */
        AddReqListNotice.create = function create(properties) {
            return new AddReqListNotice(properties);
        };

        /**
         * Encodes the specified AddReqListNotice message. Does not implicitly {@link hallserver_friend.AddReqListNotice.verify|verify} messages.
         * @function encode
         * @memberof hallserver_friend.AddReqListNotice
         * @static
         * @param {hallserver_friend.IAddReqListNotice} message AddReqListNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddReqListNotice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerIdList != null && message.playerIdList.length)
                for (var i = 0; i < message.playerIdList.length; ++i)
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerIdList[i]);
            if (message.nicknameList != null && message.nicknameList.length)
                for (var i = 0; i < message.nicknameList.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.nicknameList[i]);
            return writer;
        };

        /**
         * Encodes the specified AddReqListNotice message, length delimited. Does not implicitly {@link hallserver_friend.AddReqListNotice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_friend.AddReqListNotice
         * @static
         * @param {hallserver_friend.IAddReqListNotice} message AddReqListNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddReqListNotice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AddReqListNotice message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_friend.AddReqListNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_friend.AddReqListNotice} AddReqListNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddReqListNotice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_friend.AddReqListNotice();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.playerIdList && message.playerIdList.length))
                            message.playerIdList = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.playerIdList.push(reader.int64());
                        } else
                            message.playerIdList.push(reader.int64());
                        break;
                    }
                case 2: {
                        if (!(message.nicknameList && message.nicknameList.length))
                            message.nicknameList = [];
                        message.nicknameList.push(reader.string());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AddReqListNotice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_friend.AddReqListNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_friend.AddReqListNotice} AddReqListNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddReqListNotice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AddReqListNotice message.
         * @function verify
         * @memberof hallserver_friend.AddReqListNotice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AddReqListNotice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerIdList != null && message.hasOwnProperty("playerIdList")) {
                if (!Array.isArray(message.playerIdList))
                    return "playerIdList: array expected";
                for (var i = 0; i < message.playerIdList.length; ++i)
                    if (!$util.isInteger(message.playerIdList[i]) && !(message.playerIdList[i] && $util.isInteger(message.playerIdList[i].low) && $util.isInteger(message.playerIdList[i].high)))
                        return "playerIdList: integer|Long[] expected";
            }
            if (message.nicknameList != null && message.hasOwnProperty("nicknameList")) {
                if (!Array.isArray(message.nicknameList))
                    return "nicknameList: array expected";
                for (var i = 0; i < message.nicknameList.length; ++i)
                    if (!$util.isString(message.nicknameList[i]))
                        return "nicknameList: string[] expected";
            }
            return null;
        };

        /**
         * Creates an AddReqListNotice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_friend.AddReqListNotice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_friend.AddReqListNotice} AddReqListNotice
         */
        AddReqListNotice.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_friend.AddReqListNotice)
                return object;
            var message = new $root.hallserver_friend.AddReqListNotice();
            if (object.playerIdList) {
                if (!Array.isArray(object.playerIdList))
                    throw TypeError(".hallserver_friend.AddReqListNotice.playerIdList: array expected");
                message.playerIdList = [];
                for (var i = 0; i < object.playerIdList.length; ++i)
                    if ($util.Long)
                        (message.playerIdList[i] = $util.Long.fromValue(object.playerIdList[i])).unsigned = false;
                    else if (typeof object.playerIdList[i] === "string")
                        message.playerIdList[i] = parseInt(object.playerIdList[i], 10);
                    else if (typeof object.playerIdList[i] === "number")
                        message.playerIdList[i] = object.playerIdList[i];
                    else if (typeof object.playerIdList[i] === "object")
                        message.playerIdList[i] = new $util.LongBits(object.playerIdList[i].low >>> 0, object.playerIdList[i].high >>> 0).toNumber();
            }
            if (object.nicknameList) {
                if (!Array.isArray(object.nicknameList))
                    throw TypeError(".hallserver_friend.AddReqListNotice.nicknameList: array expected");
                message.nicknameList = [];
                for (var i = 0; i < object.nicknameList.length; ++i)
                    message.nicknameList[i] = String(object.nicknameList[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from an AddReqListNotice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_friend.AddReqListNotice
         * @static
         * @param {hallserver_friend.AddReqListNotice} message AddReqListNotice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AddReqListNotice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.playerIdList = [];
                object.nicknameList = [];
            }
            if (message.playerIdList && message.playerIdList.length) {
                object.playerIdList = [];
                for (var j = 0; j < message.playerIdList.length; ++j)
                    if (typeof message.playerIdList[j] === "number")
                        object.playerIdList[j] = options.longs === String ? String(message.playerIdList[j]) : message.playerIdList[j];
                    else
                        object.playerIdList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.playerIdList[j]) : options.longs === Number ? new $util.LongBits(message.playerIdList[j].low >>> 0, message.playerIdList[j].high >>> 0).toNumber() : message.playerIdList[j];
            }
            if (message.nicknameList && message.nicknameList.length) {
                object.nicknameList = [];
                for (var j = 0; j < message.nicknameList.length; ++j)
                    object.nicknameList[j] = message.nicknameList[j];
            }
            return object;
        };

        /**
         * Converts this AddReqListNotice to JSON.
         * @function toJSON
         * @memberof hallserver_friend.AddReqListNotice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AddReqListNotice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AddReqListNotice
         * @function getTypeUrl
         * @memberof hallserver_friend.AddReqListNotice
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AddReqListNotice.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_friend.AddReqListNotice";
        };

        return AddReqListNotice;
    })();

    hallserver_friend.AgreeAddFriendReq = (function() {

        /**
         * Properties of an AgreeAddFriendReq.
         * @memberof hallserver_friend
         * @interface IAgreeAddFriendReq
         * @property {number|Long|null} [playerId] AgreeAddFriendReq playerId
         */

        /**
         * Constructs a new AgreeAddFriendReq.
         * @memberof hallserver_friend
         * @classdesc Represents an AgreeAddFriendReq.
         * @implements IAgreeAddFriendReq
         * @constructor
         * @param {hallserver_friend.IAgreeAddFriendReq=} [properties] Properties to set
         */
        function AgreeAddFriendReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AgreeAddFriendReq playerId.
         * @member {number|Long} playerId
         * @memberof hallserver_friend.AgreeAddFriendReq
         * @instance
         */
        AgreeAddFriendReq.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new AgreeAddFriendReq instance using the specified properties.
         * @function create
         * @memberof hallserver_friend.AgreeAddFriendReq
         * @static
         * @param {hallserver_friend.IAgreeAddFriendReq=} [properties] Properties to set
         * @returns {hallserver_friend.AgreeAddFriendReq} AgreeAddFriendReq instance
         */
        AgreeAddFriendReq.create = function create(properties) {
            return new AgreeAddFriendReq(properties);
        };

        /**
         * Encodes the specified AgreeAddFriendReq message. Does not implicitly {@link hallserver_friend.AgreeAddFriendReq.verify|verify} messages.
         * @function encode
         * @memberof hallserver_friend.AgreeAddFriendReq
         * @static
         * @param {hallserver_friend.IAgreeAddFriendReq} message AgreeAddFriendReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AgreeAddFriendReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            return writer;
        };

        /**
         * Encodes the specified AgreeAddFriendReq message, length delimited. Does not implicitly {@link hallserver_friend.AgreeAddFriendReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_friend.AgreeAddFriendReq
         * @static
         * @param {hallserver_friend.IAgreeAddFriendReq} message AgreeAddFriendReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AgreeAddFriendReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AgreeAddFriendReq message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_friend.AgreeAddFriendReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_friend.AgreeAddFriendReq} AgreeAddFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AgreeAddFriendReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_friend.AgreeAddFriendReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AgreeAddFriendReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_friend.AgreeAddFriendReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_friend.AgreeAddFriendReq} AgreeAddFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AgreeAddFriendReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AgreeAddFriendReq message.
         * @function verify
         * @memberof hallserver_friend.AgreeAddFriendReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AgreeAddFriendReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            return null;
        };

        /**
         * Creates an AgreeAddFriendReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_friend.AgreeAddFriendReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_friend.AgreeAddFriendReq} AgreeAddFriendReq
         */
        AgreeAddFriendReq.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_friend.AgreeAddFriendReq)
                return object;
            var message = new $root.hallserver_friend.AgreeAddFriendReq();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an AgreeAddFriendReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_friend.AgreeAddFriendReq
         * @static
         * @param {hallserver_friend.AgreeAddFriendReq} message AgreeAddFriendReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AgreeAddFriendReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            return object;
        };

        /**
         * Converts this AgreeAddFriendReq to JSON.
         * @function toJSON
         * @memberof hallserver_friend.AgreeAddFriendReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AgreeAddFriendReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AgreeAddFriendReq
         * @function getTypeUrl
         * @memberof hallserver_friend.AgreeAddFriendReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AgreeAddFriendReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_friend.AgreeAddFriendReq";
        };

        return AgreeAddFriendReq;
    })();

    hallserver_friend.AgreeAddFriendRes = (function() {

        /**
         * Properties of an AgreeAddFriendRes.
         * @memberof hallserver_friend
         * @interface IAgreeAddFriendRes
         * @property {number|Long|null} [playerId] AgreeAddFriendRes playerId
         */

        /**
         * Constructs a new AgreeAddFriendRes.
         * @memberof hallserver_friend
         * @classdesc Represents an AgreeAddFriendRes.
         * @implements IAgreeAddFriendRes
         * @constructor
         * @param {hallserver_friend.IAgreeAddFriendRes=} [properties] Properties to set
         */
        function AgreeAddFriendRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AgreeAddFriendRes playerId.
         * @member {number|Long} playerId
         * @memberof hallserver_friend.AgreeAddFriendRes
         * @instance
         */
        AgreeAddFriendRes.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new AgreeAddFriendRes instance using the specified properties.
         * @function create
         * @memberof hallserver_friend.AgreeAddFriendRes
         * @static
         * @param {hallserver_friend.IAgreeAddFriendRes=} [properties] Properties to set
         * @returns {hallserver_friend.AgreeAddFriendRes} AgreeAddFriendRes instance
         */
        AgreeAddFriendRes.create = function create(properties) {
            return new AgreeAddFriendRes(properties);
        };

        /**
         * Encodes the specified AgreeAddFriendRes message. Does not implicitly {@link hallserver_friend.AgreeAddFriendRes.verify|verify} messages.
         * @function encode
         * @memberof hallserver_friend.AgreeAddFriendRes
         * @static
         * @param {hallserver_friend.IAgreeAddFriendRes} message AgreeAddFriendRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AgreeAddFriendRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            return writer;
        };

        /**
         * Encodes the specified AgreeAddFriendRes message, length delimited. Does not implicitly {@link hallserver_friend.AgreeAddFriendRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_friend.AgreeAddFriendRes
         * @static
         * @param {hallserver_friend.IAgreeAddFriendRes} message AgreeAddFriendRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AgreeAddFriendRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AgreeAddFriendRes message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_friend.AgreeAddFriendRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_friend.AgreeAddFriendRes} AgreeAddFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AgreeAddFriendRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_friend.AgreeAddFriendRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AgreeAddFriendRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_friend.AgreeAddFriendRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_friend.AgreeAddFriendRes} AgreeAddFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AgreeAddFriendRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AgreeAddFriendRes message.
         * @function verify
         * @memberof hallserver_friend.AgreeAddFriendRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AgreeAddFriendRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            return null;
        };

        /**
         * Creates an AgreeAddFriendRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_friend.AgreeAddFriendRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_friend.AgreeAddFriendRes} AgreeAddFriendRes
         */
        AgreeAddFriendRes.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_friend.AgreeAddFriendRes)
                return object;
            var message = new $root.hallserver_friend.AgreeAddFriendRes();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an AgreeAddFriendRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_friend.AgreeAddFriendRes
         * @static
         * @param {hallserver_friend.AgreeAddFriendRes} message AgreeAddFriendRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AgreeAddFriendRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            return object;
        };

        /**
         * Converts this AgreeAddFriendRes to JSON.
         * @function toJSON
         * @memberof hallserver_friend.AgreeAddFriendRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AgreeAddFriendRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AgreeAddFriendRes
         * @function getTypeUrl
         * @memberof hallserver_friend.AgreeAddFriendRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AgreeAddFriendRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_friend.AgreeAddFriendRes";
        };

        return AgreeAddFriendRes;
    })();

    hallserver_friend.RefuseAddFriendReq = (function() {

        /**
         * Properties of a RefuseAddFriendReq.
         * @memberof hallserver_friend
         * @interface IRefuseAddFriendReq
         * @property {number|Long|null} [playerId] RefuseAddFriendReq playerId
         */

        /**
         * Constructs a new RefuseAddFriendReq.
         * @memberof hallserver_friend
         * @classdesc Represents a RefuseAddFriendReq.
         * @implements IRefuseAddFriendReq
         * @constructor
         * @param {hallserver_friend.IRefuseAddFriendReq=} [properties] Properties to set
         */
        function RefuseAddFriendReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RefuseAddFriendReq playerId.
         * @member {number|Long} playerId
         * @memberof hallserver_friend.RefuseAddFriendReq
         * @instance
         */
        RefuseAddFriendReq.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new RefuseAddFriendReq instance using the specified properties.
         * @function create
         * @memberof hallserver_friend.RefuseAddFriendReq
         * @static
         * @param {hallserver_friend.IRefuseAddFriendReq=} [properties] Properties to set
         * @returns {hallserver_friend.RefuseAddFriendReq} RefuseAddFriendReq instance
         */
        RefuseAddFriendReq.create = function create(properties) {
            return new RefuseAddFriendReq(properties);
        };

        /**
         * Encodes the specified RefuseAddFriendReq message. Does not implicitly {@link hallserver_friend.RefuseAddFriendReq.verify|verify} messages.
         * @function encode
         * @memberof hallserver_friend.RefuseAddFriendReq
         * @static
         * @param {hallserver_friend.IRefuseAddFriendReq} message RefuseAddFriendReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RefuseAddFriendReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            return writer;
        };

        /**
         * Encodes the specified RefuseAddFriendReq message, length delimited. Does not implicitly {@link hallserver_friend.RefuseAddFriendReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_friend.RefuseAddFriendReq
         * @static
         * @param {hallserver_friend.IRefuseAddFriendReq} message RefuseAddFriendReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RefuseAddFriendReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RefuseAddFriendReq message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_friend.RefuseAddFriendReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_friend.RefuseAddFriendReq} RefuseAddFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RefuseAddFriendReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_friend.RefuseAddFriendReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RefuseAddFriendReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_friend.RefuseAddFriendReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_friend.RefuseAddFriendReq} RefuseAddFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RefuseAddFriendReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RefuseAddFriendReq message.
         * @function verify
         * @memberof hallserver_friend.RefuseAddFriendReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RefuseAddFriendReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            return null;
        };

        /**
         * Creates a RefuseAddFriendReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_friend.RefuseAddFriendReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_friend.RefuseAddFriendReq} RefuseAddFriendReq
         */
        RefuseAddFriendReq.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_friend.RefuseAddFriendReq)
                return object;
            var message = new $root.hallserver_friend.RefuseAddFriendReq();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a RefuseAddFriendReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_friend.RefuseAddFriendReq
         * @static
         * @param {hallserver_friend.RefuseAddFriendReq} message RefuseAddFriendReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RefuseAddFriendReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            return object;
        };

        /**
         * Converts this RefuseAddFriendReq to JSON.
         * @function toJSON
         * @memberof hallserver_friend.RefuseAddFriendReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RefuseAddFriendReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RefuseAddFriendReq
         * @function getTypeUrl
         * @memberof hallserver_friend.RefuseAddFriendReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RefuseAddFriendReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_friend.RefuseAddFriendReq";
        };

        return RefuseAddFriendReq;
    })();

    hallserver_friend.RefuseAddFriendRes = (function() {

        /**
         * Properties of a RefuseAddFriendRes.
         * @memberof hallserver_friend
         * @interface IRefuseAddFriendRes
         * @property {number|Long|null} [playerId] RefuseAddFriendRes playerId
         */

        /**
         * Constructs a new RefuseAddFriendRes.
         * @memberof hallserver_friend
         * @classdesc Represents a RefuseAddFriendRes.
         * @implements IRefuseAddFriendRes
         * @constructor
         * @param {hallserver_friend.IRefuseAddFriendRes=} [properties] Properties to set
         */
        function RefuseAddFriendRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RefuseAddFriendRes playerId.
         * @member {number|Long} playerId
         * @memberof hallserver_friend.RefuseAddFriendRes
         * @instance
         */
        RefuseAddFriendRes.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new RefuseAddFriendRes instance using the specified properties.
         * @function create
         * @memberof hallserver_friend.RefuseAddFriendRes
         * @static
         * @param {hallserver_friend.IRefuseAddFriendRes=} [properties] Properties to set
         * @returns {hallserver_friend.RefuseAddFriendRes} RefuseAddFriendRes instance
         */
        RefuseAddFriendRes.create = function create(properties) {
            return new RefuseAddFriendRes(properties);
        };

        /**
         * Encodes the specified RefuseAddFriendRes message. Does not implicitly {@link hallserver_friend.RefuseAddFriendRes.verify|verify} messages.
         * @function encode
         * @memberof hallserver_friend.RefuseAddFriendRes
         * @static
         * @param {hallserver_friend.IRefuseAddFriendRes} message RefuseAddFriendRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RefuseAddFriendRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            return writer;
        };

        /**
         * Encodes the specified RefuseAddFriendRes message, length delimited. Does not implicitly {@link hallserver_friend.RefuseAddFriendRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_friend.RefuseAddFriendRes
         * @static
         * @param {hallserver_friend.IRefuseAddFriendRes} message RefuseAddFriendRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RefuseAddFriendRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RefuseAddFriendRes message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_friend.RefuseAddFriendRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_friend.RefuseAddFriendRes} RefuseAddFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RefuseAddFriendRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_friend.RefuseAddFriendRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RefuseAddFriendRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_friend.RefuseAddFriendRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_friend.RefuseAddFriendRes} RefuseAddFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RefuseAddFriendRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RefuseAddFriendRes message.
         * @function verify
         * @memberof hallserver_friend.RefuseAddFriendRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RefuseAddFriendRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            return null;
        };

        /**
         * Creates a RefuseAddFriendRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_friend.RefuseAddFriendRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_friend.RefuseAddFriendRes} RefuseAddFriendRes
         */
        RefuseAddFriendRes.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_friend.RefuseAddFriendRes)
                return object;
            var message = new $root.hallserver_friend.RefuseAddFriendRes();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a RefuseAddFriendRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_friend.RefuseAddFriendRes
         * @static
         * @param {hallserver_friend.RefuseAddFriendRes} message RefuseAddFriendRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RefuseAddFriendRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            return object;
        };

        /**
         * Converts this RefuseAddFriendRes to JSON.
         * @function toJSON
         * @memberof hallserver_friend.RefuseAddFriendRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RefuseAddFriendRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RefuseAddFriendRes
         * @function getTypeUrl
         * @memberof hallserver_friend.RefuseAddFriendRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RefuseAddFriendRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_friend.RefuseAddFriendRes";
        };

        return RefuseAddFriendRes;
    })();

    hallserver_friend.DelFriendReq = (function() {

        /**
         * Properties of a DelFriendReq.
         * @memberof hallserver_friend
         * @interface IDelFriendReq
         * @property {number|Long|null} [playerId] DelFriendReq playerId
         */

        /**
         * Constructs a new DelFriendReq.
         * @memberof hallserver_friend
         * @classdesc Represents a DelFriendReq.
         * @implements IDelFriendReq
         * @constructor
         * @param {hallserver_friend.IDelFriendReq=} [properties] Properties to set
         */
        function DelFriendReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DelFriendReq playerId.
         * @member {number|Long} playerId
         * @memberof hallserver_friend.DelFriendReq
         * @instance
         */
        DelFriendReq.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new DelFriendReq instance using the specified properties.
         * @function create
         * @memberof hallserver_friend.DelFriendReq
         * @static
         * @param {hallserver_friend.IDelFriendReq=} [properties] Properties to set
         * @returns {hallserver_friend.DelFriendReq} DelFriendReq instance
         */
        DelFriendReq.create = function create(properties) {
            return new DelFriendReq(properties);
        };

        /**
         * Encodes the specified DelFriendReq message. Does not implicitly {@link hallserver_friend.DelFriendReq.verify|verify} messages.
         * @function encode
         * @memberof hallserver_friend.DelFriendReq
         * @static
         * @param {hallserver_friend.IDelFriendReq} message DelFriendReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DelFriendReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            return writer;
        };

        /**
         * Encodes the specified DelFriendReq message, length delimited. Does not implicitly {@link hallserver_friend.DelFriendReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_friend.DelFriendReq
         * @static
         * @param {hallserver_friend.IDelFriendReq} message DelFriendReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DelFriendReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DelFriendReq message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_friend.DelFriendReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_friend.DelFriendReq} DelFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DelFriendReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_friend.DelFriendReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DelFriendReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_friend.DelFriendReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_friend.DelFriendReq} DelFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DelFriendReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DelFriendReq message.
         * @function verify
         * @memberof hallserver_friend.DelFriendReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DelFriendReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            return null;
        };

        /**
         * Creates a DelFriendReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_friend.DelFriendReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_friend.DelFriendReq} DelFriendReq
         */
        DelFriendReq.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_friend.DelFriendReq)
                return object;
            var message = new $root.hallserver_friend.DelFriendReq();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a DelFriendReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_friend.DelFriendReq
         * @static
         * @param {hallserver_friend.DelFriendReq} message DelFriendReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DelFriendReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            return object;
        };

        /**
         * Converts this DelFriendReq to JSON.
         * @function toJSON
         * @memberof hallserver_friend.DelFriendReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DelFriendReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DelFriendReq
         * @function getTypeUrl
         * @memberof hallserver_friend.DelFriendReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DelFriendReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_friend.DelFriendReq";
        };

        return DelFriendReq;
    })();

    hallserver_friend.DelFriendRes = (function() {

        /**
         * Properties of a DelFriendRes.
         * @memberof hallserver_friend
         * @interface IDelFriendRes
         * @property {number|Long|null} [playerId] DelFriendRes playerId
         */

        /**
         * Constructs a new DelFriendRes.
         * @memberof hallserver_friend
         * @classdesc Represents a DelFriendRes.
         * @implements IDelFriendRes
         * @constructor
         * @param {hallserver_friend.IDelFriendRes=} [properties] Properties to set
         */
        function DelFriendRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DelFriendRes playerId.
         * @member {number|Long} playerId
         * @memberof hallserver_friend.DelFriendRes
         * @instance
         */
        DelFriendRes.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new DelFriendRes instance using the specified properties.
         * @function create
         * @memberof hallserver_friend.DelFriendRes
         * @static
         * @param {hallserver_friend.IDelFriendRes=} [properties] Properties to set
         * @returns {hallserver_friend.DelFriendRes} DelFriendRes instance
         */
        DelFriendRes.create = function create(properties) {
            return new DelFriendRes(properties);
        };

        /**
         * Encodes the specified DelFriendRes message. Does not implicitly {@link hallserver_friend.DelFriendRes.verify|verify} messages.
         * @function encode
         * @memberof hallserver_friend.DelFriendRes
         * @static
         * @param {hallserver_friend.IDelFriendRes} message DelFriendRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DelFriendRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.playerId);
            return writer;
        };

        /**
         * Encodes the specified DelFriendRes message, length delimited. Does not implicitly {@link hallserver_friend.DelFriendRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_friend.DelFriendRes
         * @static
         * @param {hallserver_friend.IDelFriendRes} message DelFriendRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DelFriendRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DelFriendRes message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_friend.DelFriendRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_friend.DelFriendRes} DelFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DelFriendRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_friend.DelFriendRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.playerId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DelFriendRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_friend.DelFriendRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_friend.DelFriendRes} DelFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DelFriendRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DelFriendRes message.
         * @function verify
         * @memberof hallserver_friend.DelFriendRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DelFriendRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                    return "playerId: integer|Long expected";
            return null;
        };

        /**
         * Creates a DelFriendRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_friend.DelFriendRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_friend.DelFriendRes} DelFriendRes
         */
        DelFriendRes.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_friend.DelFriendRes)
                return object;
            var message = new $root.hallserver_friend.DelFriendRes();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = false;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a DelFriendRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_friend.DelFriendRes
         * @static
         * @param {hallserver_friend.DelFriendRes} message DelFriendRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DelFriendRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber() : message.playerId;
            return object;
        };

        /**
         * Converts this DelFriendRes to JSON.
         * @function toJSON
         * @memberof hallserver_friend.DelFriendRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DelFriendRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DelFriendRes
         * @function getTypeUrl
         * @memberof hallserver_friend.DelFriendRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DelFriendRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_friend.DelFriendRes";
        };

        return DelFriendRes;
    })();

    return hallserver_friend;
})();

$root.hallserver_game_record = (function() {

    /**
     * Namespace hallserver_game_record.
     * @exports hallserver_game_record
     * @namespace
     */
    var hallserver_game_record = {};

    /**
     * main enum.
     * @name hallserver_game_record.main
     * @enum {number}
     * @property {number} hallserver_game_record=105 hallserver_game_record value
     */
    hallserver_game_record.main = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[105] = "hallserver_game_record"] = 105;
        return values;
    })();

    /**
     * sub enum.
     * @name hallserver_game_record.sub
     * @enum {number}
     * @property {number} RecordListReq=1 RecordListReq value
     * @property {number} RecordListRes=2 RecordListRes value
     */
    hallserver_game_record.sub = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "RecordListReq"] = 1;
        values[valuesById[2] = "RecordListRes"] = 2;
        return values;
    })();

    hallserver_game_record.OneRecord = (function() {

        /**
         * Properties of an OneRecord.
         * @memberof hallserver_game_record
         * @interface IOneRecord
         * @property {number|Long|null} [createTime] OneRecord createTime
         * @property {string|null} [tableId] OneRecord tableId
         * @property {number|null} [gameId] OneRecord gameId
         * @property {number|null} [score] OneRecord score
         */

        /**
         * Constructs a new OneRecord.
         * @memberof hallserver_game_record
         * @classdesc Represents an OneRecord.
         * @implements IOneRecord
         * @constructor
         * @param {hallserver_game_record.IOneRecord=} [properties] Properties to set
         */
        function OneRecord(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OneRecord createTime.
         * @member {number|Long} createTime
         * @memberof hallserver_game_record.OneRecord
         * @instance
         */
        OneRecord.prototype.createTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * OneRecord tableId.
         * @member {string} tableId
         * @memberof hallserver_game_record.OneRecord
         * @instance
         */
        OneRecord.prototype.tableId = "";

        /**
         * OneRecord gameId.
         * @member {number} gameId
         * @memberof hallserver_game_record.OneRecord
         * @instance
         */
        OneRecord.prototype.gameId = 0;

        /**
         * OneRecord score.
         * @member {number} score
         * @memberof hallserver_game_record.OneRecord
         * @instance
         */
        OneRecord.prototype.score = 0;

        /**
         * Creates a new OneRecord instance using the specified properties.
         * @function create
         * @memberof hallserver_game_record.OneRecord
         * @static
         * @param {hallserver_game_record.IOneRecord=} [properties] Properties to set
         * @returns {hallserver_game_record.OneRecord} OneRecord instance
         */
        OneRecord.create = function create(properties) {
            return new OneRecord(properties);
        };

        /**
         * Encodes the specified OneRecord message. Does not implicitly {@link hallserver_game_record.OneRecord.verify|verify} messages.
         * @function encode
         * @memberof hallserver_game_record.OneRecord
         * @static
         * @param {hallserver_game_record.IOneRecord} message OneRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OneRecord.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.createTime != null && Object.hasOwnProperty.call(message, "createTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.createTime);
            if (message.tableId != null && Object.hasOwnProperty.call(message, "tableId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.tableId);
            if (message.gameId != null && Object.hasOwnProperty.call(message, "gameId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.gameId);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.score);
            return writer;
        };

        /**
         * Encodes the specified OneRecord message, length delimited. Does not implicitly {@link hallserver_game_record.OneRecord.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_game_record.OneRecord
         * @static
         * @param {hallserver_game_record.IOneRecord} message OneRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OneRecord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OneRecord message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_game_record.OneRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_game_record.OneRecord} OneRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OneRecord.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_game_record.OneRecord();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.createTime = reader.int64();
                        break;
                    }
                case 2: {
                        message.tableId = reader.string();
                        break;
                    }
                case 3: {
                        message.gameId = reader.int32();
                        break;
                    }
                case 4: {
                        message.score = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OneRecord message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_game_record.OneRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_game_record.OneRecord} OneRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OneRecord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OneRecord message.
         * @function verify
         * @memberof hallserver_game_record.OneRecord
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OneRecord.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (!$util.isInteger(message.createTime) && !(message.createTime && $util.isInteger(message.createTime.low) && $util.isInteger(message.createTime.high)))
                    return "createTime: integer|Long expected";
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                if (!$util.isString(message.tableId))
                    return "tableId: string expected";
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                if (!$util.isInteger(message.gameId))
                    return "gameId: integer expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            return null;
        };

        /**
         * Creates an OneRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_game_record.OneRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_game_record.OneRecord} OneRecord
         */
        OneRecord.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_game_record.OneRecord)
                return object;
            var message = new $root.hallserver_game_record.OneRecord();
            if (object.createTime != null)
                if ($util.Long)
                    (message.createTime = $util.Long.fromValue(object.createTime)).unsigned = false;
                else if (typeof object.createTime === "string")
                    message.createTime = parseInt(object.createTime, 10);
                else if (typeof object.createTime === "number")
                    message.createTime = object.createTime;
                else if (typeof object.createTime === "object")
                    message.createTime = new $util.LongBits(object.createTime.low >>> 0, object.createTime.high >>> 0).toNumber();
            if (object.tableId != null)
                message.tableId = String(object.tableId);
            if (object.gameId != null)
                message.gameId = object.gameId | 0;
            if (object.score != null)
                message.score = object.score | 0;
            return message;
        };

        /**
         * Creates a plain object from an OneRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_game_record.OneRecord
         * @static
         * @param {hallserver_game_record.OneRecord} message OneRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OneRecord.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.createTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createTime = options.longs === String ? "0" : 0;
                object.tableId = "";
                object.gameId = 0;
                object.score = 0;
            }
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (typeof message.createTime === "number")
                    object.createTime = options.longs === String ? String(message.createTime) : message.createTime;
                else
                    object.createTime = options.longs === String ? $util.Long.prototype.toString.call(message.createTime) : options.longs === Number ? new $util.LongBits(message.createTime.low >>> 0, message.createTime.high >>> 0).toNumber() : message.createTime;
            if (message.tableId != null && message.hasOwnProperty("tableId"))
                object.tableId = message.tableId;
            if (message.gameId != null && message.hasOwnProperty("gameId"))
                object.gameId = message.gameId;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = message.score;
            return object;
        };

        /**
         * Converts this OneRecord to JSON.
         * @function toJSON
         * @memberof hallserver_game_record.OneRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OneRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for OneRecord
         * @function getTypeUrl
         * @memberof hallserver_game_record.OneRecord
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        OneRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_game_record.OneRecord";
        };

        return OneRecord;
    })();

    hallserver_game_record.RecordListReq = (function() {

        /**
         * Properties of a RecordListReq.
         * @memberof hallserver_game_record
         * @interface IRecordListReq
         * @property {number|null} [pageageNum] RecordListReq pageageNum
         * @property {number|null} [pageageCount] RecordListReq pageageCount
         * @property {number|null} [cursor] RecordListReq cursor
         */

        /**
         * Constructs a new RecordListReq.
         * @memberof hallserver_game_record
         * @classdesc Represents a RecordListReq.
         * @implements IRecordListReq
         * @constructor
         * @param {hallserver_game_record.IRecordListReq=} [properties] Properties to set
         */
        function RecordListReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RecordListReq pageageNum.
         * @member {number} pageageNum
         * @memberof hallserver_game_record.RecordListReq
         * @instance
         */
        RecordListReq.prototype.pageageNum = 0;

        /**
         * RecordListReq pageageCount.
         * @member {number} pageageCount
         * @memberof hallserver_game_record.RecordListReq
         * @instance
         */
        RecordListReq.prototype.pageageCount = 0;

        /**
         * RecordListReq cursor.
         * @member {number} cursor
         * @memberof hallserver_game_record.RecordListReq
         * @instance
         */
        RecordListReq.prototype.cursor = 0;

        /**
         * Creates a new RecordListReq instance using the specified properties.
         * @function create
         * @memberof hallserver_game_record.RecordListReq
         * @static
         * @param {hallserver_game_record.IRecordListReq=} [properties] Properties to set
         * @returns {hallserver_game_record.RecordListReq} RecordListReq instance
         */
        RecordListReq.create = function create(properties) {
            return new RecordListReq(properties);
        };

        /**
         * Encodes the specified RecordListReq message. Does not implicitly {@link hallserver_game_record.RecordListReq.verify|verify} messages.
         * @function encode
         * @memberof hallserver_game_record.RecordListReq
         * @static
         * @param {hallserver_game_record.IRecordListReq} message RecordListReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RecordListReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pageageNum != null && Object.hasOwnProperty.call(message, "pageageNum"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.pageageNum);
            if (message.pageageCount != null && Object.hasOwnProperty.call(message, "pageageCount"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pageageCount);
            if (message.cursor != null && Object.hasOwnProperty.call(message, "cursor"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.cursor);
            return writer;
        };

        /**
         * Encodes the specified RecordListReq message, length delimited. Does not implicitly {@link hallserver_game_record.RecordListReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_game_record.RecordListReq
         * @static
         * @param {hallserver_game_record.IRecordListReq} message RecordListReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RecordListReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RecordListReq message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_game_record.RecordListReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_game_record.RecordListReq} RecordListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RecordListReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_game_record.RecordListReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.pageageNum = reader.uint32();
                        break;
                    }
                case 2: {
                        message.pageageCount = reader.uint32();
                        break;
                    }
                case 3: {
                        message.cursor = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RecordListReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_game_record.RecordListReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_game_record.RecordListReq} RecordListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RecordListReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RecordListReq message.
         * @function verify
         * @memberof hallserver_game_record.RecordListReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RecordListReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pageageNum != null && message.hasOwnProperty("pageageNum"))
                if (!$util.isInteger(message.pageageNum))
                    return "pageageNum: integer expected";
            if (message.pageageCount != null && message.hasOwnProperty("pageageCount"))
                if (!$util.isInteger(message.pageageCount))
                    return "pageageCount: integer expected";
            if (message.cursor != null && message.hasOwnProperty("cursor"))
                if (!$util.isInteger(message.cursor))
                    return "cursor: integer expected";
            return null;
        };

        /**
         * Creates a RecordListReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_game_record.RecordListReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_game_record.RecordListReq} RecordListReq
         */
        RecordListReq.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_game_record.RecordListReq)
                return object;
            var message = new $root.hallserver_game_record.RecordListReq();
            if (object.pageageNum != null)
                message.pageageNum = object.pageageNum >>> 0;
            if (object.pageageCount != null)
                message.pageageCount = object.pageageCount >>> 0;
            if (object.cursor != null)
                message.cursor = object.cursor >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a RecordListReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_game_record.RecordListReq
         * @static
         * @param {hallserver_game_record.RecordListReq} message RecordListReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RecordListReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.pageageNum = 0;
                object.pageageCount = 0;
                object.cursor = 0;
            }
            if (message.pageageNum != null && message.hasOwnProperty("pageageNum"))
                object.pageageNum = message.pageageNum;
            if (message.pageageCount != null && message.hasOwnProperty("pageageCount"))
                object.pageageCount = message.pageageCount;
            if (message.cursor != null && message.hasOwnProperty("cursor"))
                object.cursor = message.cursor;
            return object;
        };

        /**
         * Converts this RecordListReq to JSON.
         * @function toJSON
         * @memberof hallserver_game_record.RecordListReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RecordListReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RecordListReq
         * @function getTypeUrl
         * @memberof hallserver_game_record.RecordListReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RecordListReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_game_record.RecordListReq";
        };

        return RecordListReq;
    })();

    hallserver_game_record.RecordListRes = (function() {

        /**
         * Properties of a RecordListRes.
         * @memberof hallserver_game_record
         * @interface IRecordListRes
         * @property {number|null} [pageageNum] RecordListRes pageageNum
         * @property {number|null} [pageageCount] RecordListRes pageageCount
         * @property {number|null} [totalCount] RecordListRes totalCount
         * @property {Array.<hallserver_game_record.IOneRecord>|null} [recordList] RecordListRes recordList
         * @property {number|null} [nextCursor] RecordListRes nextCursor
         */

        /**
         * Constructs a new RecordListRes.
         * @memberof hallserver_game_record
         * @classdesc Represents a RecordListRes.
         * @implements IRecordListRes
         * @constructor
         * @param {hallserver_game_record.IRecordListRes=} [properties] Properties to set
         */
        function RecordListRes(properties) {
            this.recordList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RecordListRes pageageNum.
         * @member {number} pageageNum
         * @memberof hallserver_game_record.RecordListRes
         * @instance
         */
        RecordListRes.prototype.pageageNum = 0;

        /**
         * RecordListRes pageageCount.
         * @member {number} pageageCount
         * @memberof hallserver_game_record.RecordListRes
         * @instance
         */
        RecordListRes.prototype.pageageCount = 0;

        /**
         * RecordListRes totalCount.
         * @member {number} totalCount
         * @memberof hallserver_game_record.RecordListRes
         * @instance
         */
        RecordListRes.prototype.totalCount = 0;

        /**
         * RecordListRes recordList.
         * @member {Array.<hallserver_game_record.IOneRecord>} recordList
         * @memberof hallserver_game_record.RecordListRes
         * @instance
         */
        RecordListRes.prototype.recordList = $util.emptyArray;

        /**
         * RecordListRes nextCursor.
         * @member {number} nextCursor
         * @memberof hallserver_game_record.RecordListRes
         * @instance
         */
        RecordListRes.prototype.nextCursor = 0;

        /**
         * Creates a new RecordListRes instance using the specified properties.
         * @function create
         * @memberof hallserver_game_record.RecordListRes
         * @static
         * @param {hallserver_game_record.IRecordListRes=} [properties] Properties to set
         * @returns {hallserver_game_record.RecordListRes} RecordListRes instance
         */
        RecordListRes.create = function create(properties) {
            return new RecordListRes(properties);
        };

        /**
         * Encodes the specified RecordListRes message. Does not implicitly {@link hallserver_game_record.RecordListRes.verify|verify} messages.
         * @function encode
         * @memberof hallserver_game_record.RecordListRes
         * @static
         * @param {hallserver_game_record.IRecordListRes} message RecordListRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RecordListRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pageageNum != null && Object.hasOwnProperty.call(message, "pageageNum"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.pageageNum);
            if (message.pageageCount != null && Object.hasOwnProperty.call(message, "pageageCount"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pageageCount);
            if (message.totalCount != null && Object.hasOwnProperty.call(message, "totalCount"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.totalCount);
            if (message.recordList != null && message.recordList.length)
                for (var i = 0; i < message.recordList.length; ++i)
                    $root.hallserver_game_record.OneRecord.encode(message.recordList[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.nextCursor != null && Object.hasOwnProperty.call(message, "nextCursor"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.nextCursor);
            return writer;
        };

        /**
         * Encodes the specified RecordListRes message, length delimited. Does not implicitly {@link hallserver_game_record.RecordListRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_game_record.RecordListRes
         * @static
         * @param {hallserver_game_record.IRecordListRes} message RecordListRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RecordListRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RecordListRes message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_game_record.RecordListRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_game_record.RecordListRes} RecordListRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RecordListRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_game_record.RecordListRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.pageageNum = reader.uint32();
                        break;
                    }
                case 2: {
                        message.pageageCount = reader.uint32();
                        break;
                    }
                case 3: {
                        message.totalCount = reader.uint32();
                        break;
                    }
                case 4: {
                        if (!(message.recordList && message.recordList.length))
                            message.recordList = [];
                        message.recordList.push($root.hallserver_game_record.OneRecord.decode(reader, reader.uint32()));
                        break;
                    }
                case 5: {
                        message.nextCursor = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RecordListRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_game_record.RecordListRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_game_record.RecordListRes} RecordListRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RecordListRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RecordListRes message.
         * @function verify
         * @memberof hallserver_game_record.RecordListRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RecordListRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pageageNum != null && message.hasOwnProperty("pageageNum"))
                if (!$util.isInteger(message.pageageNum))
                    return "pageageNum: integer expected";
            if (message.pageageCount != null && message.hasOwnProperty("pageageCount"))
                if (!$util.isInteger(message.pageageCount))
                    return "pageageCount: integer expected";
            if (message.totalCount != null && message.hasOwnProperty("totalCount"))
                if (!$util.isInteger(message.totalCount))
                    return "totalCount: integer expected";
            if (message.recordList != null && message.hasOwnProperty("recordList")) {
                if (!Array.isArray(message.recordList))
                    return "recordList: array expected";
                for (var i = 0; i < message.recordList.length; ++i) {
                    var error = $root.hallserver_game_record.OneRecord.verify(message.recordList[i]);
                    if (error)
                        return "recordList." + error;
                }
            }
            if (message.nextCursor != null && message.hasOwnProperty("nextCursor"))
                if (!$util.isInteger(message.nextCursor))
                    return "nextCursor: integer expected";
            return null;
        };

        /**
         * Creates a RecordListRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_game_record.RecordListRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_game_record.RecordListRes} RecordListRes
         */
        RecordListRes.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_game_record.RecordListRes)
                return object;
            var message = new $root.hallserver_game_record.RecordListRes();
            if (object.pageageNum != null)
                message.pageageNum = object.pageageNum >>> 0;
            if (object.pageageCount != null)
                message.pageageCount = object.pageageCount >>> 0;
            if (object.totalCount != null)
                message.totalCount = object.totalCount >>> 0;
            if (object.recordList) {
                if (!Array.isArray(object.recordList))
                    throw TypeError(".hallserver_game_record.RecordListRes.recordList: array expected");
                message.recordList = [];
                for (var i = 0; i < object.recordList.length; ++i) {
                    if (typeof object.recordList[i] !== "object")
                        throw TypeError(".hallserver_game_record.RecordListRes.recordList: object expected");
                    message.recordList[i] = $root.hallserver_game_record.OneRecord.fromObject(object.recordList[i]);
                }
            }
            if (object.nextCursor != null)
                message.nextCursor = object.nextCursor >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a RecordListRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_game_record.RecordListRes
         * @static
         * @param {hallserver_game_record.RecordListRes} message RecordListRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RecordListRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.recordList = [];
            if (options.defaults) {
                object.pageageNum = 0;
                object.pageageCount = 0;
                object.totalCount = 0;
                object.nextCursor = 0;
            }
            if (message.pageageNum != null && message.hasOwnProperty("pageageNum"))
                object.pageageNum = message.pageageNum;
            if (message.pageageCount != null && message.hasOwnProperty("pageageCount"))
                object.pageageCount = message.pageageCount;
            if (message.totalCount != null && message.hasOwnProperty("totalCount"))
                object.totalCount = message.totalCount;
            if (message.recordList && message.recordList.length) {
                object.recordList = [];
                for (var j = 0; j < message.recordList.length; ++j)
                    object.recordList[j] = $root.hallserver_game_record.OneRecord.toObject(message.recordList[j], options);
            }
            if (message.nextCursor != null && message.hasOwnProperty("nextCursor"))
                object.nextCursor = message.nextCursor;
            return object;
        };

        /**
         * Converts this RecordListRes to JSON.
         * @function toJSON
         * @memberof hallserver_game_record.RecordListRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RecordListRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RecordListRes
         * @function getTypeUrl
         * @memberof hallserver_game_record.RecordListRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RecordListRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_game_record.RecordListRes";
        };

        return RecordListRes;
    })();

    return hallserver_game_record;
})();

$root.hallserver_email = (function() {

    /**
     * Namespace hallserver_email.
     * @exports hallserver_email
     * @namespace
     */
    var hallserver_email = {};

    /**
     * main enum.
     * @name hallserver_email.main
     * @enum {number}
     * @property {number} hallserver_email=106 hallserver_email value
     */
    hallserver_email.main = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[106] = "hallserver_email"] = 106;
        return values;
    })();

    /**
     * sub enum.
     * @name hallserver_email.sub
     * @enum {number}
     * @property {number} ReadEmailReq=1 ReadEmailReq value
     * @property {number} ReadEmailRes=2 ReadEmailRes value
     * @property {number} ItemListEmailReq=3 ItemListEmailReq value
     * @property {number} ItemListEmailRes=4 ItemListEmailRes value
     * @property {number} DelEmailReq=5 DelEmailReq value
     * @property {number} DelEmailRes=6 DelEmailRes value
     * @property {number} AllEmailNotice=80 AllEmailNotice value
     * @property {number} OneEmailNotice=81 OneEmailNotice value
     * @property {number} DelEmailNotice=82 DelEmailNotice value
     */
    hallserver_email.sub = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "ReadEmailReq"] = 1;
        values[valuesById[2] = "ReadEmailRes"] = 2;
        values[valuesById[3] = "ItemListEmailReq"] = 3;
        values[valuesById[4] = "ItemListEmailRes"] = 4;
        values[valuesById[5] = "DelEmailReq"] = 5;
        values[valuesById[6] = "DelEmailRes"] = 6;
        values[valuesById[80] = "AllEmailNotice"] = 80;
        values[valuesById[81] = "OneEmailNotice"] = 81;
        values[valuesById[82] = "DelEmailNotice"] = 82;
        return values;
    })();

    hallserver_email.ReadEmailReq = (function() {

        /**
         * Properties of a ReadEmailReq.
         * @memberof hallserver_email
         * @interface IReadEmailReq
         * @property {Array.<number|Long>|null} [guidList] ReadEmailReq guidList
         */

        /**
         * Constructs a new ReadEmailReq.
         * @memberof hallserver_email
         * @classdesc Represents a ReadEmailReq.
         * @implements IReadEmailReq
         * @constructor
         * @param {hallserver_email.IReadEmailReq=} [properties] Properties to set
         */
        function ReadEmailReq(properties) {
            this.guidList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReadEmailReq guidList.
         * @member {Array.<number|Long>} guidList
         * @memberof hallserver_email.ReadEmailReq
         * @instance
         */
        ReadEmailReq.prototype.guidList = $util.emptyArray;

        /**
         * Creates a new ReadEmailReq instance using the specified properties.
         * @function create
         * @memberof hallserver_email.ReadEmailReq
         * @static
         * @param {hallserver_email.IReadEmailReq=} [properties] Properties to set
         * @returns {hallserver_email.ReadEmailReq} ReadEmailReq instance
         */
        ReadEmailReq.create = function create(properties) {
            return new ReadEmailReq(properties);
        };

        /**
         * Encodes the specified ReadEmailReq message. Does not implicitly {@link hallserver_email.ReadEmailReq.verify|verify} messages.
         * @function encode
         * @memberof hallserver_email.ReadEmailReq
         * @static
         * @param {hallserver_email.IReadEmailReq} message ReadEmailReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReadEmailReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.guidList != null && message.guidList.length)
                for (var i = 0; i < message.guidList.length; ++i)
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.guidList[i]);
            return writer;
        };

        /**
         * Encodes the specified ReadEmailReq message, length delimited. Does not implicitly {@link hallserver_email.ReadEmailReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_email.ReadEmailReq
         * @static
         * @param {hallserver_email.IReadEmailReq} message ReadEmailReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReadEmailReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReadEmailReq message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_email.ReadEmailReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_email.ReadEmailReq} ReadEmailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReadEmailReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_email.ReadEmailReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.guidList && message.guidList.length))
                            message.guidList = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.guidList.push(reader.int64());
                        } else
                            message.guidList.push(reader.int64());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReadEmailReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_email.ReadEmailReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_email.ReadEmailReq} ReadEmailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReadEmailReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReadEmailReq message.
         * @function verify
         * @memberof hallserver_email.ReadEmailReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReadEmailReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.guidList != null && message.hasOwnProperty("guidList")) {
                if (!Array.isArray(message.guidList))
                    return "guidList: array expected";
                for (var i = 0; i < message.guidList.length; ++i)
                    if (!$util.isInteger(message.guidList[i]) && !(message.guidList[i] && $util.isInteger(message.guidList[i].low) && $util.isInteger(message.guidList[i].high)))
                        return "guidList: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates a ReadEmailReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_email.ReadEmailReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_email.ReadEmailReq} ReadEmailReq
         */
        ReadEmailReq.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_email.ReadEmailReq)
                return object;
            var message = new $root.hallserver_email.ReadEmailReq();
            if (object.guidList) {
                if (!Array.isArray(object.guidList))
                    throw TypeError(".hallserver_email.ReadEmailReq.guidList: array expected");
                message.guidList = [];
                for (var i = 0; i < object.guidList.length; ++i)
                    if ($util.Long)
                        (message.guidList[i] = $util.Long.fromValue(object.guidList[i])).unsigned = false;
                    else if (typeof object.guidList[i] === "string")
                        message.guidList[i] = parseInt(object.guidList[i], 10);
                    else if (typeof object.guidList[i] === "number")
                        message.guidList[i] = object.guidList[i];
                    else if (typeof object.guidList[i] === "object")
                        message.guidList[i] = new $util.LongBits(object.guidList[i].low >>> 0, object.guidList[i].high >>> 0).toNumber();
            }
            return message;
        };

        /**
         * Creates a plain object from a ReadEmailReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_email.ReadEmailReq
         * @static
         * @param {hallserver_email.ReadEmailReq} message ReadEmailReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReadEmailReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.guidList = [];
            if (message.guidList && message.guidList.length) {
                object.guidList = [];
                for (var j = 0; j < message.guidList.length; ++j)
                    if (typeof message.guidList[j] === "number")
                        object.guidList[j] = options.longs === String ? String(message.guidList[j]) : message.guidList[j];
                    else
                        object.guidList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.guidList[j]) : options.longs === Number ? new $util.LongBits(message.guidList[j].low >>> 0, message.guidList[j].high >>> 0).toNumber() : message.guidList[j];
            }
            return object;
        };

        /**
         * Converts this ReadEmailReq to JSON.
         * @function toJSON
         * @memberof hallserver_email.ReadEmailReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReadEmailReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ReadEmailReq
         * @function getTypeUrl
         * @memberof hallserver_email.ReadEmailReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ReadEmailReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_email.ReadEmailReq";
        };

        return ReadEmailReq;
    })();

    hallserver_email.ReadEmailRes = (function() {

        /**
         * Properties of a ReadEmailRes.
         * @memberof hallserver_email
         * @interface IReadEmailRes
         * @property {Array.<number|Long>|null} [guidList] ReadEmailRes guidList
         */

        /**
         * Constructs a new ReadEmailRes.
         * @memberof hallserver_email
         * @classdesc Represents a ReadEmailRes.
         * @implements IReadEmailRes
         * @constructor
         * @param {hallserver_email.IReadEmailRes=} [properties] Properties to set
         */
        function ReadEmailRes(properties) {
            this.guidList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReadEmailRes guidList.
         * @member {Array.<number|Long>} guidList
         * @memberof hallserver_email.ReadEmailRes
         * @instance
         */
        ReadEmailRes.prototype.guidList = $util.emptyArray;

        /**
         * Creates a new ReadEmailRes instance using the specified properties.
         * @function create
         * @memberof hallserver_email.ReadEmailRes
         * @static
         * @param {hallserver_email.IReadEmailRes=} [properties] Properties to set
         * @returns {hallserver_email.ReadEmailRes} ReadEmailRes instance
         */
        ReadEmailRes.create = function create(properties) {
            return new ReadEmailRes(properties);
        };

        /**
         * Encodes the specified ReadEmailRes message. Does not implicitly {@link hallserver_email.ReadEmailRes.verify|verify} messages.
         * @function encode
         * @memberof hallserver_email.ReadEmailRes
         * @static
         * @param {hallserver_email.IReadEmailRes} message ReadEmailRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReadEmailRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.guidList != null && message.guidList.length)
                for (var i = 0; i < message.guidList.length; ++i)
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.guidList[i]);
            return writer;
        };

        /**
         * Encodes the specified ReadEmailRes message, length delimited. Does not implicitly {@link hallserver_email.ReadEmailRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_email.ReadEmailRes
         * @static
         * @param {hallserver_email.IReadEmailRes} message ReadEmailRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReadEmailRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReadEmailRes message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_email.ReadEmailRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_email.ReadEmailRes} ReadEmailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReadEmailRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_email.ReadEmailRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.guidList && message.guidList.length))
                            message.guidList = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.guidList.push(reader.int64());
                        } else
                            message.guidList.push(reader.int64());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReadEmailRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_email.ReadEmailRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_email.ReadEmailRes} ReadEmailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReadEmailRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReadEmailRes message.
         * @function verify
         * @memberof hallserver_email.ReadEmailRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReadEmailRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.guidList != null && message.hasOwnProperty("guidList")) {
                if (!Array.isArray(message.guidList))
                    return "guidList: array expected";
                for (var i = 0; i < message.guidList.length; ++i)
                    if (!$util.isInteger(message.guidList[i]) && !(message.guidList[i] && $util.isInteger(message.guidList[i].low) && $util.isInteger(message.guidList[i].high)))
                        return "guidList: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates a ReadEmailRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_email.ReadEmailRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_email.ReadEmailRes} ReadEmailRes
         */
        ReadEmailRes.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_email.ReadEmailRes)
                return object;
            var message = new $root.hallserver_email.ReadEmailRes();
            if (object.guidList) {
                if (!Array.isArray(object.guidList))
                    throw TypeError(".hallserver_email.ReadEmailRes.guidList: array expected");
                message.guidList = [];
                for (var i = 0; i < object.guidList.length; ++i)
                    if ($util.Long)
                        (message.guidList[i] = $util.Long.fromValue(object.guidList[i])).unsigned = false;
                    else if (typeof object.guidList[i] === "string")
                        message.guidList[i] = parseInt(object.guidList[i], 10);
                    else if (typeof object.guidList[i] === "number")
                        message.guidList[i] = object.guidList[i];
                    else if (typeof object.guidList[i] === "object")
                        message.guidList[i] = new $util.LongBits(object.guidList[i].low >>> 0, object.guidList[i].high >>> 0).toNumber();
            }
            return message;
        };

        /**
         * Creates a plain object from a ReadEmailRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_email.ReadEmailRes
         * @static
         * @param {hallserver_email.ReadEmailRes} message ReadEmailRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReadEmailRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.guidList = [];
            if (message.guidList && message.guidList.length) {
                object.guidList = [];
                for (var j = 0; j < message.guidList.length; ++j)
                    if (typeof message.guidList[j] === "number")
                        object.guidList[j] = options.longs === String ? String(message.guidList[j]) : message.guidList[j];
                    else
                        object.guidList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.guidList[j]) : options.longs === Number ? new $util.LongBits(message.guidList[j].low >>> 0, message.guidList[j].high >>> 0).toNumber() : message.guidList[j];
            }
            return object;
        };

        /**
         * Converts this ReadEmailRes to JSON.
         * @function toJSON
         * @memberof hallserver_email.ReadEmailRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReadEmailRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ReadEmailRes
         * @function getTypeUrl
         * @memberof hallserver_email.ReadEmailRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ReadEmailRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_email.ReadEmailRes";
        };

        return ReadEmailRes;
    })();

    hallserver_email.ItemListEmailReq = (function() {

        /**
         * Properties of an ItemListEmailReq.
         * @memberof hallserver_email
         * @interface IItemListEmailReq
         * @property {Array.<number|Long>|null} [guidList] ItemListEmailReq guidList
         */

        /**
         * Constructs a new ItemListEmailReq.
         * @memberof hallserver_email
         * @classdesc Represents an ItemListEmailReq.
         * @implements IItemListEmailReq
         * @constructor
         * @param {hallserver_email.IItemListEmailReq=} [properties] Properties to set
         */
        function ItemListEmailReq(properties) {
            this.guidList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ItemListEmailReq guidList.
         * @member {Array.<number|Long>} guidList
         * @memberof hallserver_email.ItemListEmailReq
         * @instance
         */
        ItemListEmailReq.prototype.guidList = $util.emptyArray;

        /**
         * Creates a new ItemListEmailReq instance using the specified properties.
         * @function create
         * @memberof hallserver_email.ItemListEmailReq
         * @static
         * @param {hallserver_email.IItemListEmailReq=} [properties] Properties to set
         * @returns {hallserver_email.ItemListEmailReq} ItemListEmailReq instance
         */
        ItemListEmailReq.create = function create(properties) {
            return new ItemListEmailReq(properties);
        };

        /**
         * Encodes the specified ItemListEmailReq message. Does not implicitly {@link hallserver_email.ItemListEmailReq.verify|verify} messages.
         * @function encode
         * @memberof hallserver_email.ItemListEmailReq
         * @static
         * @param {hallserver_email.IItemListEmailReq} message ItemListEmailReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemListEmailReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.guidList != null && message.guidList.length)
                for (var i = 0; i < message.guidList.length; ++i)
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.guidList[i]);
            return writer;
        };

        /**
         * Encodes the specified ItemListEmailReq message, length delimited. Does not implicitly {@link hallserver_email.ItemListEmailReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_email.ItemListEmailReq
         * @static
         * @param {hallserver_email.IItemListEmailReq} message ItemListEmailReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemListEmailReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ItemListEmailReq message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_email.ItemListEmailReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_email.ItemListEmailReq} ItemListEmailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemListEmailReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_email.ItemListEmailReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.guidList && message.guidList.length))
                            message.guidList = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.guidList.push(reader.int64());
                        } else
                            message.guidList.push(reader.int64());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ItemListEmailReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_email.ItemListEmailReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_email.ItemListEmailReq} ItemListEmailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemListEmailReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ItemListEmailReq message.
         * @function verify
         * @memberof hallserver_email.ItemListEmailReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ItemListEmailReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.guidList != null && message.hasOwnProperty("guidList")) {
                if (!Array.isArray(message.guidList))
                    return "guidList: array expected";
                for (var i = 0; i < message.guidList.length; ++i)
                    if (!$util.isInteger(message.guidList[i]) && !(message.guidList[i] && $util.isInteger(message.guidList[i].low) && $util.isInteger(message.guidList[i].high)))
                        return "guidList: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates an ItemListEmailReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_email.ItemListEmailReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_email.ItemListEmailReq} ItemListEmailReq
         */
        ItemListEmailReq.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_email.ItemListEmailReq)
                return object;
            var message = new $root.hallserver_email.ItemListEmailReq();
            if (object.guidList) {
                if (!Array.isArray(object.guidList))
                    throw TypeError(".hallserver_email.ItemListEmailReq.guidList: array expected");
                message.guidList = [];
                for (var i = 0; i < object.guidList.length; ++i)
                    if ($util.Long)
                        (message.guidList[i] = $util.Long.fromValue(object.guidList[i])).unsigned = false;
                    else if (typeof object.guidList[i] === "string")
                        message.guidList[i] = parseInt(object.guidList[i], 10);
                    else if (typeof object.guidList[i] === "number")
                        message.guidList[i] = object.guidList[i];
                    else if (typeof object.guidList[i] === "object")
                        message.guidList[i] = new $util.LongBits(object.guidList[i].low >>> 0, object.guidList[i].high >>> 0).toNumber();
            }
            return message;
        };

        /**
         * Creates a plain object from an ItemListEmailReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_email.ItemListEmailReq
         * @static
         * @param {hallserver_email.ItemListEmailReq} message ItemListEmailReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ItemListEmailReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.guidList = [];
            if (message.guidList && message.guidList.length) {
                object.guidList = [];
                for (var j = 0; j < message.guidList.length; ++j)
                    if (typeof message.guidList[j] === "number")
                        object.guidList[j] = options.longs === String ? String(message.guidList[j]) : message.guidList[j];
                    else
                        object.guidList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.guidList[j]) : options.longs === Number ? new $util.LongBits(message.guidList[j].low >>> 0, message.guidList[j].high >>> 0).toNumber() : message.guidList[j];
            }
            return object;
        };

        /**
         * Converts this ItemListEmailReq to JSON.
         * @function toJSON
         * @memberof hallserver_email.ItemListEmailReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ItemListEmailReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ItemListEmailReq
         * @function getTypeUrl
         * @memberof hallserver_email.ItemListEmailReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ItemListEmailReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_email.ItemListEmailReq";
        };

        return ItemListEmailReq;
    })();

    hallserver_email.ItemListEmailRes = (function() {

        /**
         * Properties of an ItemListEmailRes.
         * @memberof hallserver_email
         * @interface IItemListEmailRes
         * @property {Array.<number|Long>|null} [guidList] ItemListEmailRes guidList
         */

        /**
         * Constructs a new ItemListEmailRes.
         * @memberof hallserver_email
         * @classdesc Represents an ItemListEmailRes.
         * @implements IItemListEmailRes
         * @constructor
         * @param {hallserver_email.IItemListEmailRes=} [properties] Properties to set
         */
        function ItemListEmailRes(properties) {
            this.guidList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ItemListEmailRes guidList.
         * @member {Array.<number|Long>} guidList
         * @memberof hallserver_email.ItemListEmailRes
         * @instance
         */
        ItemListEmailRes.prototype.guidList = $util.emptyArray;

        /**
         * Creates a new ItemListEmailRes instance using the specified properties.
         * @function create
         * @memberof hallserver_email.ItemListEmailRes
         * @static
         * @param {hallserver_email.IItemListEmailRes=} [properties] Properties to set
         * @returns {hallserver_email.ItemListEmailRes} ItemListEmailRes instance
         */
        ItemListEmailRes.create = function create(properties) {
            return new ItemListEmailRes(properties);
        };

        /**
         * Encodes the specified ItemListEmailRes message. Does not implicitly {@link hallserver_email.ItemListEmailRes.verify|verify} messages.
         * @function encode
         * @memberof hallserver_email.ItemListEmailRes
         * @static
         * @param {hallserver_email.IItemListEmailRes} message ItemListEmailRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemListEmailRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.guidList != null && message.guidList.length)
                for (var i = 0; i < message.guidList.length; ++i)
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.guidList[i]);
            return writer;
        };

        /**
         * Encodes the specified ItemListEmailRes message, length delimited. Does not implicitly {@link hallserver_email.ItemListEmailRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_email.ItemListEmailRes
         * @static
         * @param {hallserver_email.IItemListEmailRes} message ItemListEmailRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ItemListEmailRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ItemListEmailRes message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_email.ItemListEmailRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_email.ItemListEmailRes} ItemListEmailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemListEmailRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_email.ItemListEmailRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.guidList && message.guidList.length))
                            message.guidList = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.guidList.push(reader.int64());
                        } else
                            message.guidList.push(reader.int64());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ItemListEmailRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_email.ItemListEmailRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_email.ItemListEmailRes} ItemListEmailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ItemListEmailRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ItemListEmailRes message.
         * @function verify
         * @memberof hallserver_email.ItemListEmailRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ItemListEmailRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.guidList != null && message.hasOwnProperty("guidList")) {
                if (!Array.isArray(message.guidList))
                    return "guidList: array expected";
                for (var i = 0; i < message.guidList.length; ++i)
                    if (!$util.isInteger(message.guidList[i]) && !(message.guidList[i] && $util.isInteger(message.guidList[i].low) && $util.isInteger(message.guidList[i].high)))
                        return "guidList: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates an ItemListEmailRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_email.ItemListEmailRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_email.ItemListEmailRes} ItemListEmailRes
         */
        ItemListEmailRes.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_email.ItemListEmailRes)
                return object;
            var message = new $root.hallserver_email.ItemListEmailRes();
            if (object.guidList) {
                if (!Array.isArray(object.guidList))
                    throw TypeError(".hallserver_email.ItemListEmailRes.guidList: array expected");
                message.guidList = [];
                for (var i = 0; i < object.guidList.length; ++i)
                    if ($util.Long)
                        (message.guidList[i] = $util.Long.fromValue(object.guidList[i])).unsigned = false;
                    else if (typeof object.guidList[i] === "string")
                        message.guidList[i] = parseInt(object.guidList[i], 10);
                    else if (typeof object.guidList[i] === "number")
                        message.guidList[i] = object.guidList[i];
                    else if (typeof object.guidList[i] === "object")
                        message.guidList[i] = new $util.LongBits(object.guidList[i].low >>> 0, object.guidList[i].high >>> 0).toNumber();
            }
            return message;
        };

        /**
         * Creates a plain object from an ItemListEmailRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_email.ItemListEmailRes
         * @static
         * @param {hallserver_email.ItemListEmailRes} message ItemListEmailRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ItemListEmailRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.guidList = [];
            if (message.guidList && message.guidList.length) {
                object.guidList = [];
                for (var j = 0; j < message.guidList.length; ++j)
                    if (typeof message.guidList[j] === "number")
                        object.guidList[j] = options.longs === String ? String(message.guidList[j]) : message.guidList[j];
                    else
                        object.guidList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.guidList[j]) : options.longs === Number ? new $util.LongBits(message.guidList[j].low >>> 0, message.guidList[j].high >>> 0).toNumber() : message.guidList[j];
            }
            return object;
        };

        /**
         * Converts this ItemListEmailRes to JSON.
         * @function toJSON
         * @memberof hallserver_email.ItemListEmailRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ItemListEmailRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ItemListEmailRes
         * @function getTypeUrl
         * @memberof hallserver_email.ItemListEmailRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ItemListEmailRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_email.ItemListEmailRes";
        };

        return ItemListEmailRes;
    })();

    hallserver_email.DelEmailReq = (function() {

        /**
         * Properties of a DelEmailReq.
         * @memberof hallserver_email
         * @interface IDelEmailReq
         * @property {Array.<number|Long>|null} [guidList] DelEmailReq guidList
         */

        /**
         * Constructs a new DelEmailReq.
         * @memberof hallserver_email
         * @classdesc Represents a DelEmailReq.
         * @implements IDelEmailReq
         * @constructor
         * @param {hallserver_email.IDelEmailReq=} [properties] Properties to set
         */
        function DelEmailReq(properties) {
            this.guidList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DelEmailReq guidList.
         * @member {Array.<number|Long>} guidList
         * @memberof hallserver_email.DelEmailReq
         * @instance
         */
        DelEmailReq.prototype.guidList = $util.emptyArray;

        /**
         * Creates a new DelEmailReq instance using the specified properties.
         * @function create
         * @memberof hallserver_email.DelEmailReq
         * @static
         * @param {hallserver_email.IDelEmailReq=} [properties] Properties to set
         * @returns {hallserver_email.DelEmailReq} DelEmailReq instance
         */
        DelEmailReq.create = function create(properties) {
            return new DelEmailReq(properties);
        };

        /**
         * Encodes the specified DelEmailReq message. Does not implicitly {@link hallserver_email.DelEmailReq.verify|verify} messages.
         * @function encode
         * @memberof hallserver_email.DelEmailReq
         * @static
         * @param {hallserver_email.IDelEmailReq} message DelEmailReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DelEmailReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.guidList != null && message.guidList.length)
                for (var i = 0; i < message.guidList.length; ++i)
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.guidList[i]);
            return writer;
        };

        /**
         * Encodes the specified DelEmailReq message, length delimited. Does not implicitly {@link hallserver_email.DelEmailReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_email.DelEmailReq
         * @static
         * @param {hallserver_email.IDelEmailReq} message DelEmailReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DelEmailReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DelEmailReq message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_email.DelEmailReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_email.DelEmailReq} DelEmailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DelEmailReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_email.DelEmailReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.guidList && message.guidList.length))
                            message.guidList = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.guidList.push(reader.int64());
                        } else
                            message.guidList.push(reader.int64());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DelEmailReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_email.DelEmailReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_email.DelEmailReq} DelEmailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DelEmailReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DelEmailReq message.
         * @function verify
         * @memberof hallserver_email.DelEmailReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DelEmailReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.guidList != null && message.hasOwnProperty("guidList")) {
                if (!Array.isArray(message.guidList))
                    return "guidList: array expected";
                for (var i = 0; i < message.guidList.length; ++i)
                    if (!$util.isInteger(message.guidList[i]) && !(message.guidList[i] && $util.isInteger(message.guidList[i].low) && $util.isInteger(message.guidList[i].high)))
                        return "guidList: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates a DelEmailReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_email.DelEmailReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_email.DelEmailReq} DelEmailReq
         */
        DelEmailReq.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_email.DelEmailReq)
                return object;
            var message = new $root.hallserver_email.DelEmailReq();
            if (object.guidList) {
                if (!Array.isArray(object.guidList))
                    throw TypeError(".hallserver_email.DelEmailReq.guidList: array expected");
                message.guidList = [];
                for (var i = 0; i < object.guidList.length; ++i)
                    if ($util.Long)
                        (message.guidList[i] = $util.Long.fromValue(object.guidList[i])).unsigned = false;
                    else if (typeof object.guidList[i] === "string")
                        message.guidList[i] = parseInt(object.guidList[i], 10);
                    else if (typeof object.guidList[i] === "number")
                        message.guidList[i] = object.guidList[i];
                    else if (typeof object.guidList[i] === "object")
                        message.guidList[i] = new $util.LongBits(object.guidList[i].low >>> 0, object.guidList[i].high >>> 0).toNumber();
            }
            return message;
        };

        /**
         * Creates a plain object from a DelEmailReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_email.DelEmailReq
         * @static
         * @param {hallserver_email.DelEmailReq} message DelEmailReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DelEmailReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.guidList = [];
            if (message.guidList && message.guidList.length) {
                object.guidList = [];
                for (var j = 0; j < message.guidList.length; ++j)
                    if (typeof message.guidList[j] === "number")
                        object.guidList[j] = options.longs === String ? String(message.guidList[j]) : message.guidList[j];
                    else
                        object.guidList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.guidList[j]) : options.longs === Number ? new $util.LongBits(message.guidList[j].low >>> 0, message.guidList[j].high >>> 0).toNumber() : message.guidList[j];
            }
            return object;
        };

        /**
         * Converts this DelEmailReq to JSON.
         * @function toJSON
         * @memberof hallserver_email.DelEmailReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DelEmailReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DelEmailReq
         * @function getTypeUrl
         * @memberof hallserver_email.DelEmailReq
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DelEmailReq.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_email.DelEmailReq";
        };

        return DelEmailReq;
    })();

    hallserver_email.DelEmailRes = (function() {

        /**
         * Properties of a DelEmailRes.
         * @memberof hallserver_email
         * @interface IDelEmailRes
         * @property {Array.<number|Long>|null} [guidList] DelEmailRes guidList
         */

        /**
         * Constructs a new DelEmailRes.
         * @memberof hallserver_email
         * @classdesc Represents a DelEmailRes.
         * @implements IDelEmailRes
         * @constructor
         * @param {hallserver_email.IDelEmailRes=} [properties] Properties to set
         */
        function DelEmailRes(properties) {
            this.guidList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DelEmailRes guidList.
         * @member {Array.<number|Long>} guidList
         * @memberof hallserver_email.DelEmailRes
         * @instance
         */
        DelEmailRes.prototype.guidList = $util.emptyArray;

        /**
         * Creates a new DelEmailRes instance using the specified properties.
         * @function create
         * @memberof hallserver_email.DelEmailRes
         * @static
         * @param {hallserver_email.IDelEmailRes=} [properties] Properties to set
         * @returns {hallserver_email.DelEmailRes} DelEmailRes instance
         */
        DelEmailRes.create = function create(properties) {
            return new DelEmailRes(properties);
        };

        /**
         * Encodes the specified DelEmailRes message. Does not implicitly {@link hallserver_email.DelEmailRes.verify|verify} messages.
         * @function encode
         * @memberof hallserver_email.DelEmailRes
         * @static
         * @param {hallserver_email.IDelEmailRes} message DelEmailRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DelEmailRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.guidList != null && message.guidList.length)
                for (var i = 0; i < message.guidList.length; ++i)
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.guidList[i]);
            return writer;
        };

        /**
         * Encodes the specified DelEmailRes message, length delimited. Does not implicitly {@link hallserver_email.DelEmailRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_email.DelEmailRes
         * @static
         * @param {hallserver_email.IDelEmailRes} message DelEmailRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DelEmailRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DelEmailRes message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_email.DelEmailRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_email.DelEmailRes} DelEmailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DelEmailRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_email.DelEmailRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.guidList && message.guidList.length))
                            message.guidList = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.guidList.push(reader.int64());
                        } else
                            message.guidList.push(reader.int64());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DelEmailRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_email.DelEmailRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_email.DelEmailRes} DelEmailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DelEmailRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DelEmailRes message.
         * @function verify
         * @memberof hallserver_email.DelEmailRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DelEmailRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.guidList != null && message.hasOwnProperty("guidList")) {
                if (!Array.isArray(message.guidList))
                    return "guidList: array expected";
                for (var i = 0; i < message.guidList.length; ++i)
                    if (!$util.isInteger(message.guidList[i]) && !(message.guidList[i] && $util.isInteger(message.guidList[i].low) && $util.isInteger(message.guidList[i].high)))
                        return "guidList: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates a DelEmailRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_email.DelEmailRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_email.DelEmailRes} DelEmailRes
         */
        DelEmailRes.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_email.DelEmailRes)
                return object;
            var message = new $root.hallserver_email.DelEmailRes();
            if (object.guidList) {
                if (!Array.isArray(object.guidList))
                    throw TypeError(".hallserver_email.DelEmailRes.guidList: array expected");
                message.guidList = [];
                for (var i = 0; i < object.guidList.length; ++i)
                    if ($util.Long)
                        (message.guidList[i] = $util.Long.fromValue(object.guidList[i])).unsigned = false;
                    else if (typeof object.guidList[i] === "string")
                        message.guidList[i] = parseInt(object.guidList[i], 10);
                    else if (typeof object.guidList[i] === "number")
                        message.guidList[i] = object.guidList[i];
                    else if (typeof object.guidList[i] === "object")
                        message.guidList[i] = new $util.LongBits(object.guidList[i].low >>> 0, object.guidList[i].high >>> 0).toNumber();
            }
            return message;
        };

        /**
         * Creates a plain object from a DelEmailRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_email.DelEmailRes
         * @static
         * @param {hallserver_email.DelEmailRes} message DelEmailRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DelEmailRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.guidList = [];
            if (message.guidList && message.guidList.length) {
                object.guidList = [];
                for (var j = 0; j < message.guidList.length; ++j)
                    if (typeof message.guidList[j] === "number")
                        object.guidList[j] = options.longs === String ? String(message.guidList[j]) : message.guidList[j];
                    else
                        object.guidList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.guidList[j]) : options.longs === Number ? new $util.LongBits(message.guidList[j].low >>> 0, message.guidList[j].high >>> 0).toNumber() : message.guidList[j];
            }
            return object;
        };

        /**
         * Converts this DelEmailRes to JSON.
         * @function toJSON
         * @memberof hallserver_email.DelEmailRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DelEmailRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DelEmailRes
         * @function getTypeUrl
         * @memberof hallserver_email.DelEmailRes
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DelEmailRes.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_email.DelEmailRes";
        };

        return DelEmailRes;
    })();

    hallserver_email.oneEmail = (function() {

        /**
         * Properties of an oneEmail.
         * @memberof hallserver_email
         * @interface IoneEmail
         * @property {number|Long|null} [guid] oneEmail guid
         * @property {number|null} [emailType] oneEmail emailType
         * @property {number|Long|null} [fromId] oneEmail fromId
         * @property {string|null} [title] oneEmail title
         * @property {string|null} [content] oneEmail content
         * @property {number|Long|null} [createTime] oneEmail createTime
         * @property {number|Long|null} [vaildTime] oneEmail vaildTime
         * @property {Array.<common.IItem>|null} [itemList] oneEmail itemList
         * @property {number|null} [readFlag] oneEmail readFlag
         * @property {number|null} [itemFlag] oneEmail itemFlag
         */

        /**
         * Constructs a new oneEmail.
         * @memberof hallserver_email
         * @classdesc Represents an oneEmail.
         * @implements IoneEmail
         * @constructor
         * @param {hallserver_email.IoneEmail=} [properties] Properties to set
         */
        function oneEmail(properties) {
            this.itemList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * oneEmail guid.
         * @member {number|Long} guid
         * @memberof hallserver_email.oneEmail
         * @instance
         */
        oneEmail.prototype.guid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * oneEmail emailType.
         * @member {number} emailType
         * @memberof hallserver_email.oneEmail
         * @instance
         */
        oneEmail.prototype.emailType = 0;

        /**
         * oneEmail fromId.
         * @member {number|Long} fromId
         * @memberof hallserver_email.oneEmail
         * @instance
         */
        oneEmail.prototype.fromId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * oneEmail title.
         * @member {string} title
         * @memberof hallserver_email.oneEmail
         * @instance
         */
        oneEmail.prototype.title = "";

        /**
         * oneEmail content.
         * @member {string} content
         * @memberof hallserver_email.oneEmail
         * @instance
         */
        oneEmail.prototype.content = "";

        /**
         * oneEmail createTime.
         * @member {number|Long} createTime
         * @memberof hallserver_email.oneEmail
         * @instance
         */
        oneEmail.prototype.createTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * oneEmail vaildTime.
         * @member {number|Long} vaildTime
         * @memberof hallserver_email.oneEmail
         * @instance
         */
        oneEmail.prototype.vaildTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * oneEmail itemList.
         * @member {Array.<common.IItem>} itemList
         * @memberof hallserver_email.oneEmail
         * @instance
         */
        oneEmail.prototype.itemList = $util.emptyArray;

        /**
         * oneEmail readFlag.
         * @member {number} readFlag
         * @memberof hallserver_email.oneEmail
         * @instance
         */
        oneEmail.prototype.readFlag = 0;

        /**
         * oneEmail itemFlag.
         * @member {number} itemFlag
         * @memberof hallserver_email.oneEmail
         * @instance
         */
        oneEmail.prototype.itemFlag = 0;

        /**
         * Creates a new oneEmail instance using the specified properties.
         * @function create
         * @memberof hallserver_email.oneEmail
         * @static
         * @param {hallserver_email.IoneEmail=} [properties] Properties to set
         * @returns {hallserver_email.oneEmail} oneEmail instance
         */
        oneEmail.create = function create(properties) {
            return new oneEmail(properties);
        };

        /**
         * Encodes the specified oneEmail message. Does not implicitly {@link hallserver_email.oneEmail.verify|verify} messages.
         * @function encode
         * @memberof hallserver_email.oneEmail
         * @static
         * @param {hallserver_email.IoneEmail} message oneEmail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        oneEmail.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.guid != null && Object.hasOwnProperty.call(message, "guid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.guid);
            if (message.emailType != null && Object.hasOwnProperty.call(message, "emailType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.emailType);
            if (message.fromId != null && Object.hasOwnProperty.call(message, "fromId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.fromId);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.title);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.content);
            if (message.createTime != null && Object.hasOwnProperty.call(message, "createTime"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.createTime);
            if (message.vaildTime != null && Object.hasOwnProperty.call(message, "vaildTime"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.vaildTime);
            if (message.itemList != null && message.itemList.length)
                for (var i = 0; i < message.itemList.length; ++i)
                    $root.common.Item.encode(message.itemList[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.readFlag != null && Object.hasOwnProperty.call(message, "readFlag"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.readFlag);
            if (message.itemFlag != null && Object.hasOwnProperty.call(message, "itemFlag"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.itemFlag);
            return writer;
        };

        /**
         * Encodes the specified oneEmail message, length delimited. Does not implicitly {@link hallserver_email.oneEmail.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_email.oneEmail
         * @static
         * @param {hallserver_email.IoneEmail} message oneEmail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        oneEmail.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an oneEmail message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_email.oneEmail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_email.oneEmail} oneEmail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        oneEmail.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_email.oneEmail();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.guid = reader.int64();
                        break;
                    }
                case 2: {
                        message.emailType = reader.int32();
                        break;
                    }
                case 3: {
                        message.fromId = reader.int64();
                        break;
                    }
                case 4: {
                        message.title = reader.string();
                        break;
                    }
                case 5: {
                        message.content = reader.string();
                        break;
                    }
                case 6: {
                        message.createTime = reader.int64();
                        break;
                    }
                case 7: {
                        message.vaildTime = reader.int64();
                        break;
                    }
                case 8: {
                        if (!(message.itemList && message.itemList.length))
                            message.itemList = [];
                        message.itemList.push($root.common.Item.decode(reader, reader.uint32()));
                        break;
                    }
                case 9: {
                        message.readFlag = reader.int32();
                        break;
                    }
                case 10: {
                        message.itemFlag = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an oneEmail message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_email.oneEmail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_email.oneEmail} oneEmail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        oneEmail.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an oneEmail message.
         * @function verify
         * @memberof hallserver_email.oneEmail
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        oneEmail.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.guid != null && message.hasOwnProperty("guid"))
                if (!$util.isInteger(message.guid) && !(message.guid && $util.isInteger(message.guid.low) && $util.isInteger(message.guid.high)))
                    return "guid: integer|Long expected";
            if (message.emailType != null && message.hasOwnProperty("emailType"))
                if (!$util.isInteger(message.emailType))
                    return "emailType: integer expected";
            if (message.fromId != null && message.hasOwnProperty("fromId"))
                if (!$util.isInteger(message.fromId) && !(message.fromId && $util.isInteger(message.fromId.low) && $util.isInteger(message.fromId.high)))
                    return "fromId: integer|Long expected";
            if (message.title != null && message.hasOwnProperty("title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (!$util.isInteger(message.createTime) && !(message.createTime && $util.isInteger(message.createTime.low) && $util.isInteger(message.createTime.high)))
                    return "createTime: integer|Long expected";
            if (message.vaildTime != null && message.hasOwnProperty("vaildTime"))
                if (!$util.isInteger(message.vaildTime) && !(message.vaildTime && $util.isInteger(message.vaildTime.low) && $util.isInteger(message.vaildTime.high)))
                    return "vaildTime: integer|Long expected";
            if (message.itemList != null && message.hasOwnProperty("itemList")) {
                if (!Array.isArray(message.itemList))
                    return "itemList: array expected";
                for (var i = 0; i < message.itemList.length; ++i) {
                    var error = $root.common.Item.verify(message.itemList[i]);
                    if (error)
                        return "itemList." + error;
                }
            }
            if (message.readFlag != null && message.hasOwnProperty("readFlag"))
                if (!$util.isInteger(message.readFlag))
                    return "readFlag: integer expected";
            if (message.itemFlag != null && message.hasOwnProperty("itemFlag"))
                if (!$util.isInteger(message.itemFlag))
                    return "itemFlag: integer expected";
            return null;
        };

        /**
         * Creates an oneEmail message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_email.oneEmail
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_email.oneEmail} oneEmail
         */
        oneEmail.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_email.oneEmail)
                return object;
            var message = new $root.hallserver_email.oneEmail();
            if (object.guid != null)
                if ($util.Long)
                    (message.guid = $util.Long.fromValue(object.guid)).unsigned = false;
                else if (typeof object.guid === "string")
                    message.guid = parseInt(object.guid, 10);
                else if (typeof object.guid === "number")
                    message.guid = object.guid;
                else if (typeof object.guid === "object")
                    message.guid = new $util.LongBits(object.guid.low >>> 0, object.guid.high >>> 0).toNumber();
            if (object.emailType != null)
                message.emailType = object.emailType | 0;
            if (object.fromId != null)
                if ($util.Long)
                    (message.fromId = $util.Long.fromValue(object.fromId)).unsigned = false;
                else if (typeof object.fromId === "string")
                    message.fromId = parseInt(object.fromId, 10);
                else if (typeof object.fromId === "number")
                    message.fromId = object.fromId;
                else if (typeof object.fromId === "object")
                    message.fromId = new $util.LongBits(object.fromId.low >>> 0, object.fromId.high >>> 0).toNumber();
            if (object.title != null)
                message.title = String(object.title);
            if (object.content != null)
                message.content = String(object.content);
            if (object.createTime != null)
                if ($util.Long)
                    (message.createTime = $util.Long.fromValue(object.createTime)).unsigned = false;
                else if (typeof object.createTime === "string")
                    message.createTime = parseInt(object.createTime, 10);
                else if (typeof object.createTime === "number")
                    message.createTime = object.createTime;
                else if (typeof object.createTime === "object")
                    message.createTime = new $util.LongBits(object.createTime.low >>> 0, object.createTime.high >>> 0).toNumber();
            if (object.vaildTime != null)
                if ($util.Long)
                    (message.vaildTime = $util.Long.fromValue(object.vaildTime)).unsigned = false;
                else if (typeof object.vaildTime === "string")
                    message.vaildTime = parseInt(object.vaildTime, 10);
                else if (typeof object.vaildTime === "number")
                    message.vaildTime = object.vaildTime;
                else if (typeof object.vaildTime === "object")
                    message.vaildTime = new $util.LongBits(object.vaildTime.low >>> 0, object.vaildTime.high >>> 0).toNumber();
            if (object.itemList) {
                if (!Array.isArray(object.itemList))
                    throw TypeError(".hallserver_email.oneEmail.itemList: array expected");
                message.itemList = [];
                for (var i = 0; i < object.itemList.length; ++i) {
                    if (typeof object.itemList[i] !== "object")
                        throw TypeError(".hallserver_email.oneEmail.itemList: object expected");
                    message.itemList[i] = $root.common.Item.fromObject(object.itemList[i]);
                }
            }
            if (object.readFlag != null)
                message.readFlag = object.readFlag | 0;
            if (object.itemFlag != null)
                message.itemFlag = object.itemFlag | 0;
            return message;
        };

        /**
         * Creates a plain object from an oneEmail message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_email.oneEmail
         * @static
         * @param {hallserver_email.oneEmail} message oneEmail
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        oneEmail.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.itemList = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.guid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.guid = options.longs === String ? "0" : 0;
                object.emailType = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.fromId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.fromId = options.longs === String ? "0" : 0;
                object.title = "";
                object.content = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.createTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createTime = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.vaildTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.vaildTime = options.longs === String ? "0" : 0;
                object.readFlag = 0;
                object.itemFlag = 0;
            }
            if (message.guid != null && message.hasOwnProperty("guid"))
                if (typeof message.guid === "number")
                    object.guid = options.longs === String ? String(message.guid) : message.guid;
                else
                    object.guid = options.longs === String ? $util.Long.prototype.toString.call(message.guid) : options.longs === Number ? new $util.LongBits(message.guid.low >>> 0, message.guid.high >>> 0).toNumber() : message.guid;
            if (message.emailType != null && message.hasOwnProperty("emailType"))
                object.emailType = message.emailType;
            if (message.fromId != null && message.hasOwnProperty("fromId"))
                if (typeof message.fromId === "number")
                    object.fromId = options.longs === String ? String(message.fromId) : message.fromId;
                else
                    object.fromId = options.longs === String ? $util.Long.prototype.toString.call(message.fromId) : options.longs === Number ? new $util.LongBits(message.fromId.low >>> 0, message.fromId.high >>> 0).toNumber() : message.fromId;
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (typeof message.createTime === "number")
                    object.createTime = options.longs === String ? String(message.createTime) : message.createTime;
                else
                    object.createTime = options.longs === String ? $util.Long.prototype.toString.call(message.createTime) : options.longs === Number ? new $util.LongBits(message.createTime.low >>> 0, message.createTime.high >>> 0).toNumber() : message.createTime;
            if (message.vaildTime != null && message.hasOwnProperty("vaildTime"))
                if (typeof message.vaildTime === "number")
                    object.vaildTime = options.longs === String ? String(message.vaildTime) : message.vaildTime;
                else
                    object.vaildTime = options.longs === String ? $util.Long.prototype.toString.call(message.vaildTime) : options.longs === Number ? new $util.LongBits(message.vaildTime.low >>> 0, message.vaildTime.high >>> 0).toNumber() : message.vaildTime;
            if (message.itemList && message.itemList.length) {
                object.itemList = [];
                for (var j = 0; j < message.itemList.length; ++j)
                    object.itemList[j] = $root.common.Item.toObject(message.itemList[j], options);
            }
            if (message.readFlag != null && message.hasOwnProperty("readFlag"))
                object.readFlag = message.readFlag;
            if (message.itemFlag != null && message.hasOwnProperty("itemFlag"))
                object.itemFlag = message.itemFlag;
            return object;
        };

        /**
         * Converts this oneEmail to JSON.
         * @function toJSON
         * @memberof hallserver_email.oneEmail
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        oneEmail.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for oneEmail
         * @function getTypeUrl
         * @memberof hallserver_email.oneEmail
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        oneEmail.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_email.oneEmail";
        };

        return oneEmail;
    })();

    hallserver_email.AllEmailNotice = (function() {

        /**
         * Properties of an AllEmailNotice.
         * @memberof hallserver_email
         * @interface IAllEmailNotice
         * @property {Array.<hallserver_email.IoneEmail>|null} [emailList] AllEmailNotice emailList
         */

        /**
         * Constructs a new AllEmailNotice.
         * @memberof hallserver_email
         * @classdesc Represents an AllEmailNotice.
         * @implements IAllEmailNotice
         * @constructor
         * @param {hallserver_email.IAllEmailNotice=} [properties] Properties to set
         */
        function AllEmailNotice(properties) {
            this.emailList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AllEmailNotice emailList.
         * @member {Array.<hallserver_email.IoneEmail>} emailList
         * @memberof hallserver_email.AllEmailNotice
         * @instance
         */
        AllEmailNotice.prototype.emailList = $util.emptyArray;

        /**
         * Creates a new AllEmailNotice instance using the specified properties.
         * @function create
         * @memberof hallserver_email.AllEmailNotice
         * @static
         * @param {hallserver_email.IAllEmailNotice=} [properties] Properties to set
         * @returns {hallserver_email.AllEmailNotice} AllEmailNotice instance
         */
        AllEmailNotice.create = function create(properties) {
            return new AllEmailNotice(properties);
        };

        /**
         * Encodes the specified AllEmailNotice message. Does not implicitly {@link hallserver_email.AllEmailNotice.verify|verify} messages.
         * @function encode
         * @memberof hallserver_email.AllEmailNotice
         * @static
         * @param {hallserver_email.IAllEmailNotice} message AllEmailNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllEmailNotice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.emailList != null && message.emailList.length)
                for (var i = 0; i < message.emailList.length; ++i)
                    $root.hallserver_email.oneEmail.encode(message.emailList[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AllEmailNotice message, length delimited. Does not implicitly {@link hallserver_email.AllEmailNotice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_email.AllEmailNotice
         * @static
         * @param {hallserver_email.IAllEmailNotice} message AllEmailNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AllEmailNotice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AllEmailNotice message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_email.AllEmailNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_email.AllEmailNotice} AllEmailNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllEmailNotice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_email.AllEmailNotice();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.emailList && message.emailList.length))
                            message.emailList = [];
                        message.emailList.push($root.hallserver_email.oneEmail.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AllEmailNotice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_email.AllEmailNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_email.AllEmailNotice} AllEmailNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AllEmailNotice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AllEmailNotice message.
         * @function verify
         * @memberof hallserver_email.AllEmailNotice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AllEmailNotice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.emailList != null && message.hasOwnProperty("emailList")) {
                if (!Array.isArray(message.emailList))
                    return "emailList: array expected";
                for (var i = 0; i < message.emailList.length; ++i) {
                    var error = $root.hallserver_email.oneEmail.verify(message.emailList[i]);
                    if (error)
                        return "emailList." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AllEmailNotice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_email.AllEmailNotice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_email.AllEmailNotice} AllEmailNotice
         */
        AllEmailNotice.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_email.AllEmailNotice)
                return object;
            var message = new $root.hallserver_email.AllEmailNotice();
            if (object.emailList) {
                if (!Array.isArray(object.emailList))
                    throw TypeError(".hallserver_email.AllEmailNotice.emailList: array expected");
                message.emailList = [];
                for (var i = 0; i < object.emailList.length; ++i) {
                    if (typeof object.emailList[i] !== "object")
                        throw TypeError(".hallserver_email.AllEmailNotice.emailList: object expected");
                    message.emailList[i] = $root.hallserver_email.oneEmail.fromObject(object.emailList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AllEmailNotice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_email.AllEmailNotice
         * @static
         * @param {hallserver_email.AllEmailNotice} message AllEmailNotice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AllEmailNotice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.emailList = [];
            if (message.emailList && message.emailList.length) {
                object.emailList = [];
                for (var j = 0; j < message.emailList.length; ++j)
                    object.emailList[j] = $root.hallserver_email.oneEmail.toObject(message.emailList[j], options);
            }
            return object;
        };

        /**
         * Converts this AllEmailNotice to JSON.
         * @function toJSON
         * @memberof hallserver_email.AllEmailNotice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AllEmailNotice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AllEmailNotice
         * @function getTypeUrl
         * @memberof hallserver_email.AllEmailNotice
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AllEmailNotice.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_email.AllEmailNotice";
        };

        return AllEmailNotice;
    })();

    hallserver_email.OneEmailNotice = (function() {

        /**
         * Properties of an OneEmailNotice.
         * @memberof hallserver_email
         * @interface IOneEmailNotice
         * @property {hallserver_email.IoneEmail|null} [email] OneEmailNotice email
         */

        /**
         * Constructs a new OneEmailNotice.
         * @memberof hallserver_email
         * @classdesc Represents an OneEmailNotice.
         * @implements IOneEmailNotice
         * @constructor
         * @param {hallserver_email.IOneEmailNotice=} [properties] Properties to set
         */
        function OneEmailNotice(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OneEmailNotice email.
         * @member {hallserver_email.IoneEmail|null|undefined} email
         * @memberof hallserver_email.OneEmailNotice
         * @instance
         */
        OneEmailNotice.prototype.email = null;

        /**
         * Creates a new OneEmailNotice instance using the specified properties.
         * @function create
         * @memberof hallserver_email.OneEmailNotice
         * @static
         * @param {hallserver_email.IOneEmailNotice=} [properties] Properties to set
         * @returns {hallserver_email.OneEmailNotice} OneEmailNotice instance
         */
        OneEmailNotice.create = function create(properties) {
            return new OneEmailNotice(properties);
        };

        /**
         * Encodes the specified OneEmailNotice message. Does not implicitly {@link hallserver_email.OneEmailNotice.verify|verify} messages.
         * @function encode
         * @memberof hallserver_email.OneEmailNotice
         * @static
         * @param {hallserver_email.IOneEmailNotice} message OneEmailNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OneEmailNotice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                $root.hallserver_email.oneEmail.encode(message.email, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified OneEmailNotice message, length delimited. Does not implicitly {@link hallserver_email.OneEmailNotice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_email.OneEmailNotice
         * @static
         * @param {hallserver_email.IOneEmailNotice} message OneEmailNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OneEmailNotice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OneEmailNotice message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_email.OneEmailNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_email.OneEmailNotice} OneEmailNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OneEmailNotice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_email.OneEmailNotice();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.email = $root.hallserver_email.oneEmail.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OneEmailNotice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_email.OneEmailNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_email.OneEmailNotice} OneEmailNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OneEmailNotice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OneEmailNotice message.
         * @function verify
         * @memberof hallserver_email.OneEmailNotice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OneEmailNotice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.email != null && message.hasOwnProperty("email")) {
                var error = $root.hallserver_email.oneEmail.verify(message.email);
                if (error)
                    return "email." + error;
            }
            return null;
        };

        /**
         * Creates an OneEmailNotice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_email.OneEmailNotice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_email.OneEmailNotice} OneEmailNotice
         */
        OneEmailNotice.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_email.OneEmailNotice)
                return object;
            var message = new $root.hallserver_email.OneEmailNotice();
            if (object.email != null) {
                if (typeof object.email !== "object")
                    throw TypeError(".hallserver_email.OneEmailNotice.email: object expected");
                message.email = $root.hallserver_email.oneEmail.fromObject(object.email);
            }
            return message;
        };

        /**
         * Creates a plain object from an OneEmailNotice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_email.OneEmailNotice
         * @static
         * @param {hallserver_email.OneEmailNotice} message OneEmailNotice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OneEmailNotice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.email = null;
            if (message.email != null && message.hasOwnProperty("email"))
                object.email = $root.hallserver_email.oneEmail.toObject(message.email, options);
            return object;
        };

        /**
         * Converts this OneEmailNotice to JSON.
         * @function toJSON
         * @memberof hallserver_email.OneEmailNotice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OneEmailNotice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for OneEmailNotice
         * @function getTypeUrl
         * @memberof hallserver_email.OneEmailNotice
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        OneEmailNotice.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_email.OneEmailNotice";
        };

        return OneEmailNotice;
    })();

    hallserver_email.DelEmailNotice = (function() {

        /**
         * Properties of a DelEmailNotice.
         * @memberof hallserver_email
         * @interface IDelEmailNotice
         * @property {Array.<number|Long>|null} [guidList] DelEmailNotice guidList
         */

        /**
         * Constructs a new DelEmailNotice.
         * @memberof hallserver_email
         * @classdesc Represents a DelEmailNotice.
         * @implements IDelEmailNotice
         * @constructor
         * @param {hallserver_email.IDelEmailNotice=} [properties] Properties to set
         */
        function DelEmailNotice(properties) {
            this.guidList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DelEmailNotice guidList.
         * @member {Array.<number|Long>} guidList
         * @memberof hallserver_email.DelEmailNotice
         * @instance
         */
        DelEmailNotice.prototype.guidList = $util.emptyArray;

        /**
         * Creates a new DelEmailNotice instance using the specified properties.
         * @function create
         * @memberof hallserver_email.DelEmailNotice
         * @static
         * @param {hallserver_email.IDelEmailNotice=} [properties] Properties to set
         * @returns {hallserver_email.DelEmailNotice} DelEmailNotice instance
         */
        DelEmailNotice.create = function create(properties) {
            return new DelEmailNotice(properties);
        };

        /**
         * Encodes the specified DelEmailNotice message. Does not implicitly {@link hallserver_email.DelEmailNotice.verify|verify} messages.
         * @function encode
         * @memberof hallserver_email.DelEmailNotice
         * @static
         * @param {hallserver_email.IDelEmailNotice} message DelEmailNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DelEmailNotice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.guidList != null && message.guidList.length)
                for (var i = 0; i < message.guidList.length; ++i)
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.guidList[i]);
            return writer;
        };

        /**
         * Encodes the specified DelEmailNotice message, length delimited. Does not implicitly {@link hallserver_email.DelEmailNotice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hallserver_email.DelEmailNotice
         * @static
         * @param {hallserver_email.IDelEmailNotice} message DelEmailNotice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DelEmailNotice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DelEmailNotice message from the specified reader or buffer.
         * @function decode
         * @memberof hallserver_email.DelEmailNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hallserver_email.DelEmailNotice} DelEmailNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DelEmailNotice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hallserver_email.DelEmailNotice();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.guidList && message.guidList.length))
                            message.guidList = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.guidList.push(reader.int64());
                        } else
                            message.guidList.push(reader.int64());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DelEmailNotice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hallserver_email.DelEmailNotice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hallserver_email.DelEmailNotice} DelEmailNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DelEmailNotice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DelEmailNotice message.
         * @function verify
         * @memberof hallserver_email.DelEmailNotice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DelEmailNotice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.guidList != null && message.hasOwnProperty("guidList")) {
                if (!Array.isArray(message.guidList))
                    return "guidList: array expected";
                for (var i = 0; i < message.guidList.length; ++i)
                    if (!$util.isInteger(message.guidList[i]) && !(message.guidList[i] && $util.isInteger(message.guidList[i].low) && $util.isInteger(message.guidList[i].high)))
                        return "guidList: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates a DelEmailNotice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hallserver_email.DelEmailNotice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hallserver_email.DelEmailNotice} DelEmailNotice
         */
        DelEmailNotice.fromObject = function fromObject(object) {
            if (object instanceof $root.hallserver_email.DelEmailNotice)
                return object;
            var message = new $root.hallserver_email.DelEmailNotice();
            if (object.guidList) {
                if (!Array.isArray(object.guidList))
                    throw TypeError(".hallserver_email.DelEmailNotice.guidList: array expected");
                message.guidList = [];
                for (var i = 0; i < object.guidList.length; ++i)
                    if ($util.Long)
                        (message.guidList[i] = $util.Long.fromValue(object.guidList[i])).unsigned = false;
                    else if (typeof object.guidList[i] === "string")
                        message.guidList[i] = parseInt(object.guidList[i], 10);
                    else if (typeof object.guidList[i] === "number")
                        message.guidList[i] = object.guidList[i];
                    else if (typeof object.guidList[i] === "object")
                        message.guidList[i] = new $util.LongBits(object.guidList[i].low >>> 0, object.guidList[i].high >>> 0).toNumber();
            }
            return message;
        };

        /**
         * Creates a plain object from a DelEmailNotice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hallserver_email.DelEmailNotice
         * @static
         * @param {hallserver_email.DelEmailNotice} message DelEmailNotice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DelEmailNotice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.guidList = [];
            if (message.guidList && message.guidList.length) {
                object.guidList = [];
                for (var j = 0; j < message.guidList.length; ++j)
                    if (typeof message.guidList[j] === "number")
                        object.guidList[j] = options.longs === String ? String(message.guidList[j]) : message.guidList[j];
                    else
                        object.guidList[j] = options.longs === String ? $util.Long.prototype.toString.call(message.guidList[j]) : options.longs === Number ? new $util.LongBits(message.guidList[j].low >>> 0, message.guidList[j].high >>> 0).toNumber() : message.guidList[j];
            }
            return object;
        };

        /**
         * Converts this DelEmailNotice to JSON.
         * @function toJSON
         * @memberof hallserver_email.DelEmailNotice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DelEmailNotice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DelEmailNotice
         * @function getTypeUrl
         * @memberof hallserver_email.DelEmailNotice
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DelEmailNotice.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/hallserver_email.DelEmailNotice";
        };

        return DelEmailNotice;
    })();

    return hallserver_email;
})();

module.exports = $root;
