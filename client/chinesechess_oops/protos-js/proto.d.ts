// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run build:types'.

/** Namespace chinese_chess_game. */
export namespace chinese_chess_game {

    /** main enum. */
    enum main {
        chinese_chess_game = 101
    }

    /** sub enum. */
    enum sub {
        gameStateReq = 1,
        gameStateRes = 2,
        moveReq = 3,
        moveRes = 4,
        nextDoing = 80
    }

    /** Properties of a gameStateReq. */
    interface IgameStateReq {

        /** gameStateReq playerId */
        playerId?: (number|Long|null);
    }

    /** Represents a gameStateReq. */
    class gameStateReq implements IgameStateReq {

        /**
         * Constructs a new gameStateReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: chinese_chess_game.IgameStateReq);

        /** gameStateReq playerId. */
        public playerId: (number|Long);

        /**
         * Creates a new gameStateReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns gameStateReq instance
         */
        public static create(properties?: chinese_chess_game.IgameStateReq): chinese_chess_game.gameStateReq;

        /**
         * Encodes the specified gameStateReq message. Does not implicitly {@link chinese_chess_game.gameStateReq.verify|verify} messages.
         * @param message gameStateReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chinese_chess_game.IgameStateReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified gameStateReq message, length delimited. Does not implicitly {@link chinese_chess_game.gameStateReq.verify|verify} messages.
         * @param message gameStateReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chinese_chess_game.IgameStateReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a gameStateReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns gameStateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chinese_chess_game.gameStateReq;

        /**
         * Decodes a gameStateReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns gameStateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chinese_chess_game.gameStateReq;

        /**
         * Verifies a gameStateReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a gameStateReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns gameStateReq
         */
        public static fromObject(object: { [k: string]: any }): chinese_chess_game.gameStateReq;

        /**
         * Creates a plain object from a gameStateReq message. Also converts values to other types if specified.
         * @param message gameStateReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chinese_chess_game.gameStateReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this gameStateReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for gameStateReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a playerInfo. */
    interface IplayerInfo {

        /** playerInfo seatId */
        seatId?: (number|null);

        /** playerInfo playerId */
        playerId?: (number|Long|null);

        /** playerInfo teamType */
        teamType?: (number|null);

        /** playerInfo nickname */
        nickname?: (string|null);

        /** playerInfo score */
        score?: (number|null);
    }

    /** Represents a playerInfo. */
    class playerInfo implements IplayerInfo {

        /**
         * Constructs a new playerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: chinese_chess_game.IplayerInfo);

        /** playerInfo seatId. */
        public seatId: number;

        /** playerInfo playerId. */
        public playerId: (number|Long);

        /** playerInfo teamType. */
        public teamType: number;

        /** playerInfo nickname. */
        public nickname: string;

        /** playerInfo score. */
        public score: number;

        /**
         * Creates a new playerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns playerInfo instance
         */
        public static create(properties?: chinese_chess_game.IplayerInfo): chinese_chess_game.playerInfo;

        /**
         * Encodes the specified playerInfo message. Does not implicitly {@link chinese_chess_game.playerInfo.verify|verify} messages.
         * @param message playerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chinese_chess_game.IplayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified playerInfo message, length delimited. Does not implicitly {@link chinese_chess_game.playerInfo.verify|verify} messages.
         * @param message playerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chinese_chess_game.IplayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a playerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns playerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chinese_chess_game.playerInfo;

        /**
         * Decodes a playerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns playerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chinese_chess_game.playerInfo;

        /**
         * Verifies a playerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a playerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns playerInfo
         */
        public static fromObject(object: { [k: string]: any }): chinese_chess_game.playerInfo;

        /**
         * Creates a plain object from a playerInfo message. Also converts values to other types if specified.
         * @param message playerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chinese_chess_game.playerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this playerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for playerInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an oneChess. */
    interface IoneChess {

        /** oneChess chessId */
        chessId?: (number|null);

        /** oneChess chessType */
        chessType?: (number|null);

        /** oneChess row */
        row?: (number|null);

        /** oneChess col */
        col?: (number|null);

        /** oneChess teamType */
        teamType?: (number|null);
    }

    /** Represents an oneChess. */
    class oneChess implements IoneChess {

        /**
         * Constructs a new oneChess.
         * @param [properties] Properties to set
         */
        constructor(properties?: chinese_chess_game.IoneChess);

        /** oneChess chessId. */
        public chessId: number;

        /** oneChess chessType. */
        public chessType: number;

        /** oneChess row. */
        public row: number;

        /** oneChess col. */
        public col: number;

        /** oneChess teamType. */
        public teamType: number;

        /**
         * Creates a new oneChess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns oneChess instance
         */
        public static create(properties?: chinese_chess_game.IoneChess): chinese_chess_game.oneChess;

        /**
         * Encodes the specified oneChess message. Does not implicitly {@link chinese_chess_game.oneChess.verify|verify} messages.
         * @param message oneChess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chinese_chess_game.IoneChess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified oneChess message, length delimited. Does not implicitly {@link chinese_chess_game.oneChess.verify|verify} messages.
         * @param message oneChess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chinese_chess_game.IoneChess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an oneChess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns oneChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chinese_chess_game.oneChess;

        /**
         * Decodes an oneChess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns oneChess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chinese_chess_game.oneChess;

        /**
         * Verifies an oneChess message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an oneChess message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns oneChess
         */
        public static fromObject(object: { [k: string]: any }): chinese_chess_game.oneChess;

        /**
         * Creates a plain object from an oneChess message. Also converts values to other types if specified.
         * @param message oneChess
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chinese_chess_game.oneChess, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this oneChess to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for oneChess
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a chessCanMove. */
    interface IchessCanMove {

        /** chessCanMove chessId */
        chessId?: (number|null);

        /** chessCanMove rowList */
        rowList?: (number[]|null);

        /** chessCanMove colList */
        colList?: (number[]|null);
    }

    /** Represents a chessCanMove. */
    class chessCanMove implements IchessCanMove {

        /**
         * Constructs a new chessCanMove.
         * @param [properties] Properties to set
         */
        constructor(properties?: chinese_chess_game.IchessCanMove);

        /** chessCanMove chessId. */
        public chessId: number;

        /** chessCanMove rowList. */
        public rowList: number[];

        /** chessCanMove colList. */
        public colList: number[];

        /**
         * Creates a new chessCanMove instance using the specified properties.
         * @param [properties] Properties to set
         * @returns chessCanMove instance
         */
        public static create(properties?: chinese_chess_game.IchessCanMove): chinese_chess_game.chessCanMove;

        /**
         * Encodes the specified chessCanMove message. Does not implicitly {@link chinese_chess_game.chessCanMove.verify|verify} messages.
         * @param message chessCanMove message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chinese_chess_game.IchessCanMove, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified chessCanMove message, length delimited. Does not implicitly {@link chinese_chess_game.chessCanMove.verify|verify} messages.
         * @param message chessCanMove message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chinese_chess_game.IchessCanMove, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a chessCanMove message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns chessCanMove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chinese_chess_game.chessCanMove;

        /**
         * Decodes a chessCanMove message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns chessCanMove
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chinese_chess_game.chessCanMove;

        /**
         * Verifies a chessCanMove message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a chessCanMove message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns chessCanMove
         */
        public static fromObject(object: { [k: string]: any }): chinese_chess_game.chessCanMove;

        /**
         * Creates a plain object from a chessCanMove message. Also converts values to other types if specified.
         * @param message chessCanMove
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chinese_chess_game.chessCanMove, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this chessCanMove to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for chessCanMove
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a nextDoing. */
    interface InextDoing {

        /** nextDoing seatId */
        seatId?: (number|null);

        /** nextDoing playerId */
        playerId?: (number|Long|null);

        /** nextDoing teamType */
        teamType?: (number|null);

        /** nextDoing canMoveList */
        canMoveList?: (chinese_chess_game.IchessCanMove[]|null);

        /** nextDoing remainTotalTime */
        remainTotalTime?: (number|null);

        /** nextDoing remainOnceTime */
        remainOnceTime?: (number|null);
    }

    /** Represents a nextDoing. */
    class nextDoing implements InextDoing {

        /**
         * Constructs a new nextDoing.
         * @param [properties] Properties to set
         */
        constructor(properties?: chinese_chess_game.InextDoing);

        /** nextDoing seatId. */
        public seatId: number;

        /** nextDoing playerId. */
        public playerId: (number|Long);

        /** nextDoing teamType. */
        public teamType: number;

        /** nextDoing canMoveList. */
        public canMoveList: chinese_chess_game.IchessCanMove[];

        /** nextDoing remainTotalTime. */
        public remainTotalTime: number;

        /** nextDoing remainOnceTime. */
        public remainOnceTime: number;

        /**
         * Creates a new nextDoing instance using the specified properties.
         * @param [properties] Properties to set
         * @returns nextDoing instance
         */
        public static create(properties?: chinese_chess_game.InextDoing): chinese_chess_game.nextDoing;

        /**
         * Encodes the specified nextDoing message. Does not implicitly {@link chinese_chess_game.nextDoing.verify|verify} messages.
         * @param message nextDoing message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chinese_chess_game.InextDoing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified nextDoing message, length delimited. Does not implicitly {@link chinese_chess_game.nextDoing.verify|verify} messages.
         * @param message nextDoing message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chinese_chess_game.InextDoing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a nextDoing message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns nextDoing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chinese_chess_game.nextDoing;

        /**
         * Decodes a nextDoing message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns nextDoing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chinese_chess_game.nextDoing;

        /**
         * Verifies a nextDoing message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a nextDoing message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns nextDoing
         */
        public static fromObject(object: { [k: string]: any }): chinese_chess_game.nextDoing;

        /**
         * Creates a plain object from a nextDoing message. Also converts values to other types if specified.
         * @param message nextDoing
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chinese_chess_game.nextDoing, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this nextDoing to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for nextDoing
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a gameStateRes. */
    interface IgameStateRes {

        /** gameStateRes state */
        state?: (number|null);

        /** gameStateRes playerList */
        playerList?: (chinese_chess_game.IplayerInfo[]|null);

        /** gameStateRes chessList */
        chessList?: (chinese_chess_game.IoneChess[]|null);

        /** gameStateRes nextDoing */
        nextDoing?: (chinese_chess_game.InextDoing|null);

        /** gameStateRes winPlayerId */
        winPlayerId?: (number|Long|null);
    }

    /** Represents a gameStateRes. */
    class gameStateRes implements IgameStateRes {

        /**
         * Constructs a new gameStateRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: chinese_chess_game.IgameStateRes);

        /** gameStateRes state. */
        public state: number;

        /** gameStateRes playerList. */
        public playerList: chinese_chess_game.IplayerInfo[];

        /** gameStateRes chessList. */
        public chessList: chinese_chess_game.IoneChess[];

        /** gameStateRes nextDoing. */
        public nextDoing?: (chinese_chess_game.InextDoing|null);

        /** gameStateRes winPlayerId. */
        public winPlayerId: (number|Long);

        /**
         * Creates a new gameStateRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns gameStateRes instance
         */
        public static create(properties?: chinese_chess_game.IgameStateRes): chinese_chess_game.gameStateRes;

        /**
         * Encodes the specified gameStateRes message. Does not implicitly {@link chinese_chess_game.gameStateRes.verify|verify} messages.
         * @param message gameStateRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chinese_chess_game.IgameStateRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified gameStateRes message, length delimited. Does not implicitly {@link chinese_chess_game.gameStateRes.verify|verify} messages.
         * @param message gameStateRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chinese_chess_game.IgameStateRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a gameStateRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns gameStateRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chinese_chess_game.gameStateRes;

        /**
         * Decodes a gameStateRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns gameStateRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chinese_chess_game.gameStateRes;

        /**
         * Verifies a gameStateRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a gameStateRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns gameStateRes
         */
        public static fromObject(object: { [k: string]: any }): chinese_chess_game.gameStateRes;

        /**
         * Creates a plain object from a gameStateRes message. Also converts values to other types if specified.
         * @param message gameStateRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chinese_chess_game.gameStateRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this gameStateRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for gameStateRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a moveReq. */
    interface ImoveReq {

        /** moveReq chessId */
        chessId?: (number|null);

        /** moveReq moveRow */
        moveRow?: (number|null);

        /** moveReq moveCol */
        moveCol?: (number|null);
    }

    /** Represents a moveReq. */
    class moveReq implements ImoveReq {

        /**
         * Constructs a new moveReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: chinese_chess_game.ImoveReq);

        /** moveReq chessId. */
        public chessId: number;

        /** moveReq moveRow. */
        public moveRow: number;

        /** moveReq moveCol. */
        public moveCol: number;

        /**
         * Creates a new moveReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns moveReq instance
         */
        public static create(properties?: chinese_chess_game.ImoveReq): chinese_chess_game.moveReq;

        /**
         * Encodes the specified moveReq message. Does not implicitly {@link chinese_chess_game.moveReq.verify|verify} messages.
         * @param message moveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chinese_chess_game.ImoveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified moveReq message, length delimited. Does not implicitly {@link chinese_chess_game.moveReq.verify|verify} messages.
         * @param message moveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chinese_chess_game.ImoveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a moveReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns moveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chinese_chess_game.moveReq;

        /**
         * Decodes a moveReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns moveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chinese_chess_game.moveReq;

        /**
         * Verifies a moveReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a moveReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns moveReq
         */
        public static fromObject(object: { [k: string]: any }): chinese_chess_game.moveReq;

        /**
         * Creates a plain object from a moveReq message. Also converts values to other types if specified.
         * @param message moveReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chinese_chess_game.moveReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this moveReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for moveReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a moveRes. */
    interface ImoveRes {

        /** moveRes chessId */
        chessId?: (number|null);

        /** moveRes moveRow */
        moveRow?: (number|null);

        /** moveRes moveCol */
        moveCol?: (number|null);
    }

    /** Represents a moveRes. */
    class moveRes implements ImoveRes {

        /**
         * Constructs a new moveRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: chinese_chess_game.ImoveRes);

        /** moveRes chessId. */
        public chessId: number;

        /** moveRes moveRow. */
        public moveRow: number;

        /** moveRes moveCol. */
        public moveCol: number;

        /**
         * Creates a new moveRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns moveRes instance
         */
        public static create(properties?: chinese_chess_game.ImoveRes): chinese_chess_game.moveRes;

        /**
         * Encodes the specified moveRes message. Does not implicitly {@link chinese_chess_game.moveRes.verify|verify} messages.
         * @param message moveRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chinese_chess_game.ImoveRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified moveRes message, length delimited. Does not implicitly {@link chinese_chess_game.moveRes.verify|verify} messages.
         * @param message moveRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chinese_chess_game.ImoveRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a moveRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns moveRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chinese_chess_game.moveRes;

        /**
         * Decodes a moveRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns moveRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chinese_chess_game.moveRes;

        /**
         * Verifies a moveRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a moveRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns moveRes
         */
        public static fromObject(object: { [k: string]: any }): chinese_chess_game.moveRes;

        /**
         * Creates a plain object from a moveRes message. Also converts values to other types if specified.
         * @param message moveRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chinese_chess_game.moveRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this moveRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for moveRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace errors. */
export namespace errors {

    /** main enum. */
    enum main {
        errors = 1
    }

    /** sub enum. */
    enum sub {
        Error = 1
    }

    /** Properties of an Error. */
    interface IError {

        /** Error code */
        code?: (number|null);

        /** Error msg */
        msg?: (string|null);

        /** Error packId */
        packId?: (number|null);
    }

    /** Represents an Error. */
    class Error implements IError {

        /**
         * Constructs a new Error.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IError);

        /** Error code. */
        public code: number;

        /** Error msg. */
        public msg: string;

        /** Error packId. */
        public packId: number;

        /**
         * Creates a new Error instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Error instance
         */
        public static create(properties?: errors.IError): errors.Error;

        /**
         * Encodes the specified Error message. Does not implicitly {@link errors.Error.verify|verify} messages.
         * @param message Error message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Error message, length delimited. Does not implicitly {@link errors.Error.verify|verify} messages.
         * @param message Error message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Error message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.Error;

        /**
         * Decodes an Error message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.Error;

        /**
         * Verifies an Error message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Error message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Error
         */
        public static fromObject(object: { [k: string]: any }): errors.Error;

        /**
         * Creates a plain object from an Error message. Also converts values to other types if specified.
         * @param message Error
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.Error, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Error to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Error
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace login. */
export namespace login {

    /** main enum. */
    enum main {
        login = 2
    }

    /** sub enum. */
    enum sub {
        LoginReq = 1,
        LoginRes = 2,
        HeartReq = 3,
        HeartRes = 4
    }

    /** Properties of a LoginReq. */
    interface ILoginReq {

        /** LoginReq token */
        token?: (string|null);

        /** LoginReq playerId */
        playerId?: (number|Long|null);
    }

    /** Represents a LoginReq. */
    class LoginReq implements ILoginReq {

        /**
         * Constructs a new LoginReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: login.ILoginReq);

        /** LoginReq token. */
        public token: string;

        /** LoginReq playerId. */
        public playerId: (number|Long);

        /**
         * Creates a new LoginReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginReq instance
         */
        public static create(properties?: login.ILoginReq): login.LoginReq;

        /**
         * Encodes the specified LoginReq message. Does not implicitly {@link login.LoginReq.verify|verify} messages.
         * @param message LoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: login.ILoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginReq message, length delimited. Does not implicitly {@link login.LoginReq.verify|verify} messages.
         * @param message LoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: login.ILoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): login.LoginReq;

        /**
         * Decodes a LoginReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): login.LoginReq;

        /**
         * Verifies a LoginReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginReq
         */
        public static fromObject(object: { [k: string]: any }): login.LoginReq;

        /**
         * Creates a plain object from a LoginReq message. Also converts values to other types if specified.
         * @param message LoginReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: login.LoginReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LoginReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a LoginRes. */
    interface ILoginRes {

        /** LoginRes isreconnect */
        isreconnect?: (number|null);
    }

    /** Represents a LoginRes. */
    class LoginRes implements ILoginRes {

        /**
         * Constructs a new LoginRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: login.ILoginRes);

        /** LoginRes isreconnect. */
        public isreconnect: number;

        /**
         * Creates a new LoginRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginRes instance
         */
        public static create(properties?: login.ILoginRes): login.LoginRes;

        /**
         * Encodes the specified LoginRes message. Does not implicitly {@link login.LoginRes.verify|verify} messages.
         * @param message LoginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: login.ILoginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginRes message, length delimited. Does not implicitly {@link login.LoginRes.verify|verify} messages.
         * @param message LoginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: login.ILoginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): login.LoginRes;

        /**
         * Decodes a LoginRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): login.LoginRes;

        /**
         * Verifies a LoginRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginRes
         */
        public static fromObject(object: { [k: string]: any }): login.LoginRes;

        /**
         * Creates a plain object from a LoginRes message. Also converts values to other types if specified.
         * @param message LoginRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: login.LoginRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LoginRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a HeartReq. */
    interface IHeartReq {

        /** HeartReq time */
        time?: (number|Long|null);
    }

    /** Represents a HeartReq. */
    class HeartReq implements IHeartReq {

        /**
         * Constructs a new HeartReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: login.IHeartReq);

        /** HeartReq time. */
        public time: (number|Long);

        /**
         * Creates a new HeartReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartReq instance
         */
        public static create(properties?: login.IHeartReq): login.HeartReq;

        /**
         * Encodes the specified HeartReq message. Does not implicitly {@link login.HeartReq.verify|verify} messages.
         * @param message HeartReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: login.IHeartReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeartReq message, length delimited. Does not implicitly {@link login.HeartReq.verify|verify} messages.
         * @param message HeartReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: login.IHeartReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeartReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): login.HeartReq;

        /**
         * Decodes a HeartReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): login.HeartReq;

        /**
         * Verifies a HeartReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeartReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeartReq
         */
        public static fromObject(object: { [k: string]: any }): login.HeartReq;

        /**
         * Creates a plain object from a HeartReq message. Also converts values to other types if specified.
         * @param message HeartReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: login.HeartReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeartReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HeartReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a HeartRes. */
    interface IHeartRes {

        /** HeartRes time */
        time?: (number|Long|null);
    }

    /** Represents a HeartRes. */
    class HeartRes implements IHeartRes {

        /**
         * Constructs a new HeartRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: login.IHeartRes);

        /** HeartRes time. */
        public time: (number|Long);

        /**
         * Creates a new HeartRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartRes instance
         */
        public static create(properties?: login.IHeartRes): login.HeartRes;

        /**
         * Encodes the specified HeartRes message. Does not implicitly {@link login.HeartRes.verify|verify} messages.
         * @param message HeartRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: login.IHeartRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeartRes message, length delimited. Does not implicitly {@link login.HeartRes.verify|verify} messages.
         * @param message HeartRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: login.IHeartRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeartRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): login.HeartRes;

        /**
         * Decodes a HeartRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): login.HeartRes;

        /**
         * Verifies a HeartRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeartRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeartRes
         */
        public static fromObject(object: { [k: string]: any }): login.HeartRes;

        /**
         * Creates a plain object from a HeartRes message. Also converts values to other types if specified.
         * @param message HeartRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: login.HeartRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeartRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for HeartRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace common. */
export namespace common {

    /** Properties of an Item. */
    interface IItem {

        /** Item id */
        id?: (number|Long|null);

        /** Item count */
        count?: (number|Long|null);
    }

    /** Represents an Item. */
    class Item implements IItem {

        /**
         * Constructs a new Item.
         * @param [properties] Properties to set
         */
        constructor(properties?: common.IItem);

        /** Item id. */
        public id: (number|Long);

        /** Item count. */
        public count: (number|Long);

        /**
         * Creates a new Item instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Item instance
         */
        public static create(properties?: common.IItem): common.Item;

        /**
         * Encodes the specified Item message. Does not implicitly {@link common.Item.verify|verify} messages.
         * @param message Item message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: common.IItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Item message, length delimited. Does not implicitly {@link common.Item.verify|verify} messages.
         * @param message Item message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: common.IItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Item message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common.Item;

        /**
         * Decodes an Item message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common.Item;

        /**
         * Verifies an Item message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Item message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Item
         */
        public static fromObject(object: { [k: string]: any }): common.Item;

        /**
         * Creates a plain object from an Item message. Also converts values to other types if specified.
         * @param message Item
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: common.Item, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Item to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Item
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace digitalbomb_game. */
export namespace digitalbomb_game {

    /** main enum. */
    enum main {
        digitalbomb_game = 101
    }

    /** sub enum. */
    enum sub {
        GameStatusReq = 1,
        GameStatusRes = 2,
        DoingReq = 3,
        EnterCast = 80,
        GameStartCast = 81,
        NextDoingCast = 82,
        GameOverCast = 83,
        LeaveCast = 84,
        DoingCast = 85
    }

    /** Properties of an EnterCast. */
    interface IEnterCast {

        /** EnterCast playerId */
        playerId?: (number|Long|null);

        /** EnterCast seatId */
        seatId?: (number|null);

        /** EnterCast nickname */
        nickname?: (string|null);
    }

    /** Represents an EnterCast. */
    class EnterCast implements IEnterCast {

        /**
         * Constructs a new EnterCast.
         * @param [properties] Properties to set
         */
        constructor(properties?: digitalbomb_game.IEnterCast);

        /** EnterCast playerId. */
        public playerId: (number|Long);

        /** EnterCast seatId. */
        public seatId: number;

        /** EnterCast nickname. */
        public nickname: string;

        /**
         * Creates a new EnterCast instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnterCast instance
         */
        public static create(properties?: digitalbomb_game.IEnterCast): digitalbomb_game.EnterCast;

        /**
         * Encodes the specified EnterCast message. Does not implicitly {@link digitalbomb_game.EnterCast.verify|verify} messages.
         * @param message EnterCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: digitalbomb_game.IEnterCast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnterCast message, length delimited. Does not implicitly {@link digitalbomb_game.EnterCast.verify|verify} messages.
         * @param message EnterCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: digitalbomb_game.IEnterCast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnterCast message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnterCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): digitalbomb_game.EnterCast;

        /**
         * Decodes an EnterCast message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnterCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): digitalbomb_game.EnterCast;

        /**
         * Verifies an EnterCast message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnterCast message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnterCast
         */
        public static fromObject(object: { [k: string]: any }): digitalbomb_game.EnterCast;

        /**
         * Creates a plain object from an EnterCast message. Also converts values to other types if specified.
         * @param message EnterCast
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: digitalbomb_game.EnterCast, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnterCast to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for EnterCast
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameStartCast. */
    interface IGameStartCast {

        /** GameStartCast seatIdList */
        seatIdList?: (number[]|null);
    }

    /** Represents a GameStartCast. */
    class GameStartCast implements IGameStartCast {

        /**
         * Constructs a new GameStartCast.
         * @param [properties] Properties to set
         */
        constructor(properties?: digitalbomb_game.IGameStartCast);

        /** GameStartCast seatIdList. */
        public seatIdList: number[];

        /**
         * Creates a new GameStartCast instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameStartCast instance
         */
        public static create(properties?: digitalbomb_game.IGameStartCast): digitalbomb_game.GameStartCast;

        /**
         * Encodes the specified GameStartCast message. Does not implicitly {@link digitalbomb_game.GameStartCast.verify|verify} messages.
         * @param message GameStartCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: digitalbomb_game.IGameStartCast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameStartCast message, length delimited. Does not implicitly {@link digitalbomb_game.GameStartCast.verify|verify} messages.
         * @param message GameStartCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: digitalbomb_game.IGameStartCast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameStartCast message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameStartCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): digitalbomb_game.GameStartCast;

        /**
         * Decodes a GameStartCast message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameStartCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): digitalbomb_game.GameStartCast;

        /**
         * Verifies a GameStartCast message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameStartCast message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameStartCast
         */
        public static fromObject(object: { [k: string]: any }): digitalbomb_game.GameStartCast;

        /**
         * Creates a plain object from a GameStartCast message. Also converts values to other types if specified.
         * @param message GameStartCast
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: digitalbomb_game.GameStartCast, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameStartCast to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameStartCast
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a NextDoingCast. */
    interface INextDoingCast {

        /** NextDoingCast doingPlayerId */
        doingPlayerId?: (number|Long|null);

        /** NextDoingCast doingSeatId */
        doingSeatId?: (number|null);

        /** NextDoingCast minNum */
        minNum?: (number|null);

        /** NextDoingCast maxNum */
        maxNum?: (number|null);
    }

    /** Represents a NextDoingCast. */
    class NextDoingCast implements INextDoingCast {

        /**
         * Constructs a new NextDoingCast.
         * @param [properties] Properties to set
         */
        constructor(properties?: digitalbomb_game.INextDoingCast);

        /** NextDoingCast doingPlayerId. */
        public doingPlayerId: (number|Long);

        /** NextDoingCast doingSeatId. */
        public doingSeatId: number;

        /** NextDoingCast minNum. */
        public minNum: number;

        /** NextDoingCast maxNum. */
        public maxNum: number;

        /**
         * Creates a new NextDoingCast instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NextDoingCast instance
         */
        public static create(properties?: digitalbomb_game.INextDoingCast): digitalbomb_game.NextDoingCast;

        /**
         * Encodes the specified NextDoingCast message. Does not implicitly {@link digitalbomb_game.NextDoingCast.verify|verify} messages.
         * @param message NextDoingCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: digitalbomb_game.INextDoingCast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NextDoingCast message, length delimited. Does not implicitly {@link digitalbomb_game.NextDoingCast.verify|verify} messages.
         * @param message NextDoingCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: digitalbomb_game.INextDoingCast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NextDoingCast message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NextDoingCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): digitalbomb_game.NextDoingCast;

        /**
         * Decodes a NextDoingCast message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NextDoingCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): digitalbomb_game.NextDoingCast;

        /**
         * Verifies a NextDoingCast message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NextDoingCast message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NextDoingCast
         */
        public static fromObject(object: { [k: string]: any }): digitalbomb_game.NextDoingCast;

        /**
         * Creates a plain object from a NextDoingCast message. Also converts values to other types if specified.
         * @param message NextDoingCast
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: digitalbomb_game.NextDoingCast, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NextDoingCast to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for NextDoingCast
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameOverCast. */
    interface IGameOverCast {

        /** GameOverCast losePlayerId */
        losePlayerId?: (number|Long|null);

        /** GameOverCast mine */
        mine?: (number|null);
    }

    /** Represents a GameOverCast. */
    class GameOverCast implements IGameOverCast {

        /**
         * Constructs a new GameOverCast.
         * @param [properties] Properties to set
         */
        constructor(properties?: digitalbomb_game.IGameOverCast);

        /** GameOverCast losePlayerId. */
        public losePlayerId: (number|Long);

        /** GameOverCast mine. */
        public mine: number;

        /**
         * Creates a new GameOverCast instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameOverCast instance
         */
        public static create(properties?: digitalbomb_game.IGameOverCast): digitalbomb_game.GameOverCast;

        /**
         * Encodes the specified GameOverCast message. Does not implicitly {@link digitalbomb_game.GameOverCast.verify|verify} messages.
         * @param message GameOverCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: digitalbomb_game.IGameOverCast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameOverCast message, length delimited. Does not implicitly {@link digitalbomb_game.GameOverCast.verify|verify} messages.
         * @param message GameOverCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: digitalbomb_game.IGameOverCast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameOverCast message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameOverCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): digitalbomb_game.GameOverCast;

        /**
         * Decodes a GameOverCast message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameOverCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): digitalbomb_game.GameOverCast;

        /**
         * Verifies a GameOverCast message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameOverCast message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameOverCast
         */
        public static fromObject(object: { [k: string]: any }): digitalbomb_game.GameOverCast;

        /**
         * Creates a plain object from a GameOverCast message. Also converts values to other types if specified.
         * @param message GameOverCast
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: digitalbomb_game.GameOverCast, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameOverCast to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameOverCast
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a LeaveCast. */
    interface ILeaveCast {

        /** LeaveCast playerId */
        playerId?: (number|Long|null);

        /** LeaveCast seatId */
        seatId?: (number|null);

        /** LeaveCast nickname */
        nickname?: (string|null);
    }

    /** Represents a LeaveCast. */
    class LeaveCast implements ILeaveCast {

        /**
         * Constructs a new LeaveCast.
         * @param [properties] Properties to set
         */
        constructor(properties?: digitalbomb_game.ILeaveCast);

        /** LeaveCast playerId. */
        public playerId: (number|Long);

        /** LeaveCast seatId. */
        public seatId: number;

        /** LeaveCast nickname. */
        public nickname: string;

        /**
         * Creates a new LeaveCast instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LeaveCast instance
         */
        public static create(properties?: digitalbomb_game.ILeaveCast): digitalbomb_game.LeaveCast;

        /**
         * Encodes the specified LeaveCast message. Does not implicitly {@link digitalbomb_game.LeaveCast.verify|verify} messages.
         * @param message LeaveCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: digitalbomb_game.ILeaveCast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LeaveCast message, length delimited. Does not implicitly {@link digitalbomb_game.LeaveCast.verify|verify} messages.
         * @param message LeaveCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: digitalbomb_game.ILeaveCast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LeaveCast message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LeaveCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): digitalbomb_game.LeaveCast;

        /**
         * Decodes a LeaveCast message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LeaveCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): digitalbomb_game.LeaveCast;

        /**
         * Verifies a LeaveCast message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LeaveCast message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LeaveCast
         */
        public static fromObject(object: { [k: string]: any }): digitalbomb_game.LeaveCast;

        /**
         * Creates a plain object from a LeaveCast message. Also converts values to other types if specified.
         * @param message LeaveCast
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: digitalbomb_game.LeaveCast, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LeaveCast to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for LeaveCast
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DoingReq. */
    interface IDoingReq {

        /** DoingReq optNum */
        optNum?: (number|null);
    }

    /** Represents a DoingReq. */
    class DoingReq implements IDoingReq {

        /**
         * Constructs a new DoingReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: digitalbomb_game.IDoingReq);

        /** DoingReq optNum. */
        public optNum: number;

        /**
         * Creates a new DoingReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DoingReq instance
         */
        public static create(properties?: digitalbomb_game.IDoingReq): digitalbomb_game.DoingReq;

        /**
         * Encodes the specified DoingReq message. Does not implicitly {@link digitalbomb_game.DoingReq.verify|verify} messages.
         * @param message DoingReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: digitalbomb_game.IDoingReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DoingReq message, length delimited. Does not implicitly {@link digitalbomb_game.DoingReq.verify|verify} messages.
         * @param message DoingReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: digitalbomb_game.IDoingReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DoingReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DoingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): digitalbomb_game.DoingReq;

        /**
         * Decodes a DoingReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DoingReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): digitalbomb_game.DoingReq;

        /**
         * Verifies a DoingReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DoingReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DoingReq
         */
        public static fromObject(object: { [k: string]: any }): digitalbomb_game.DoingReq;

        /**
         * Creates a plain object from a DoingReq message. Also converts values to other types if specified.
         * @param message DoingReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: digitalbomb_game.DoingReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DoingReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DoingReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DoingCast. */
    interface IDoingCast {

        /** DoingCast playerId */
        playerId?: (number|Long|null);

        /** DoingCast seatId */
        seatId?: (number|null);

        /** DoingCast optNum */
        optNum?: (number|null);
    }

    /** Represents a DoingCast. */
    class DoingCast implements IDoingCast {

        /**
         * Constructs a new DoingCast.
         * @param [properties] Properties to set
         */
        constructor(properties?: digitalbomb_game.IDoingCast);

        /** DoingCast playerId. */
        public playerId: (number|Long);

        /** DoingCast seatId. */
        public seatId: number;

        /** DoingCast optNum. */
        public optNum: number;

        /**
         * Creates a new DoingCast instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DoingCast instance
         */
        public static create(properties?: digitalbomb_game.IDoingCast): digitalbomb_game.DoingCast;

        /**
         * Encodes the specified DoingCast message. Does not implicitly {@link digitalbomb_game.DoingCast.verify|verify} messages.
         * @param message DoingCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: digitalbomb_game.IDoingCast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DoingCast message, length delimited. Does not implicitly {@link digitalbomb_game.DoingCast.verify|verify} messages.
         * @param message DoingCast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: digitalbomb_game.IDoingCast, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DoingCast message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DoingCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): digitalbomb_game.DoingCast;

        /**
         * Decodes a DoingCast message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DoingCast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): digitalbomb_game.DoingCast;

        /**
         * Verifies a DoingCast message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DoingCast message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DoingCast
         */
        public static fromObject(object: { [k: string]: any }): digitalbomb_game.DoingCast;

        /**
         * Creates a plain object from a DoingCast message. Also converts values to other types if specified.
         * @param message DoingCast
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: digitalbomb_game.DoingCast, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DoingCast to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DoingCast
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameStatusReq. */
    interface IGameStatusReq {

        /** GameStatusReq playerId */
        playerId?: (number|Long|null);
    }

    /** Represents a GameStatusReq. */
    class GameStatusReq implements IGameStatusReq {

        /**
         * Constructs a new GameStatusReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: digitalbomb_game.IGameStatusReq);

        /** GameStatusReq playerId. */
        public playerId: (number|Long);

        /**
         * Creates a new GameStatusReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameStatusReq instance
         */
        public static create(properties?: digitalbomb_game.IGameStatusReq): digitalbomb_game.GameStatusReq;

        /**
         * Encodes the specified GameStatusReq message. Does not implicitly {@link digitalbomb_game.GameStatusReq.verify|verify} messages.
         * @param message GameStatusReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: digitalbomb_game.IGameStatusReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameStatusReq message, length delimited. Does not implicitly {@link digitalbomb_game.GameStatusReq.verify|verify} messages.
         * @param message GameStatusReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: digitalbomb_game.IGameStatusReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameStatusReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameStatusReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): digitalbomb_game.GameStatusReq;

        /**
         * Decodes a GameStatusReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameStatusReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): digitalbomb_game.GameStatusReq;

        /**
         * Verifies a GameStatusReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameStatusReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameStatusReq
         */
        public static fromObject(object: { [k: string]: any }): digitalbomb_game.GameStatusReq;

        /**
         * Creates a plain object from a GameStatusReq message. Also converts values to other types if specified.
         * @param message GameStatusReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: digitalbomb_game.GameStatusReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameStatusReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameStatusReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameStatusRes. */
    interface IGameStatusRes {

        /** GameStatusRes gameState */
        gameState?: (number|null);

        /** GameStatusRes nextDoing */
        nextDoing?: (digitalbomb_game.INextDoingCast|null);
    }

    /** Represents a GameStatusRes. */
    class GameStatusRes implements IGameStatusRes {

        /**
         * Constructs a new GameStatusRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: digitalbomb_game.IGameStatusRes);

        /** GameStatusRes gameState. */
        public gameState: number;

        /** GameStatusRes nextDoing. */
        public nextDoing?: (digitalbomb_game.INextDoingCast|null);

        /**
         * Creates a new GameStatusRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameStatusRes instance
         */
        public static create(properties?: digitalbomb_game.IGameStatusRes): digitalbomb_game.GameStatusRes;

        /**
         * Encodes the specified GameStatusRes message. Does not implicitly {@link digitalbomb_game.GameStatusRes.verify|verify} messages.
         * @param message GameStatusRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: digitalbomb_game.IGameStatusRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameStatusRes message, length delimited. Does not implicitly {@link digitalbomb_game.GameStatusRes.verify|verify} messages.
         * @param message GameStatusRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: digitalbomb_game.IGameStatusRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameStatusRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameStatusRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): digitalbomb_game.GameStatusRes;

        /**
         * Decodes a GameStatusRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameStatusRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): digitalbomb_game.GameStatusRes;

        /**
         * Verifies a GameStatusRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameStatusRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameStatusRes
         */
        public static fromObject(object: { [k: string]: any }): digitalbomb_game.GameStatusRes;

        /**
         * Creates a plain object from a GameStatusRes message. Also converts values to other types if specified.
         * @param message GameStatusRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: digitalbomb_game.GameStatusRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameStatusRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameStatusRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace game_hall. */
export namespace game_hall {

    /** main enum. */
    enum main {
        game_hall = 51
    }

    /** sub enum. */
    enum sub {
        JoinReq = 1,
        JoinRes = 2
    }

    /** Properties of a JoinReq. */
    interface IJoinReq {

        /** JoinReq tableId */
        tableId?: (string|null);
    }

    /** Represents a JoinReq. */
    class JoinReq implements IJoinReq {

        /**
         * Constructs a new JoinReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: game_hall.IJoinReq);

        /** JoinReq tableId. */
        public tableId: string;

        /**
         * Creates a new JoinReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinReq instance
         */
        public static create(properties?: game_hall.IJoinReq): game_hall.JoinReq;

        /**
         * Encodes the specified JoinReq message. Does not implicitly {@link game_hall.JoinReq.verify|verify} messages.
         * @param message JoinReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game_hall.IJoinReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinReq message, length delimited. Does not implicitly {@link game_hall.JoinReq.verify|verify} messages.
         * @param message JoinReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game_hall.IJoinReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game_hall.JoinReq;

        /**
         * Decodes a JoinReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game_hall.JoinReq;

        /**
         * Verifies a JoinReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinReq
         */
        public static fromObject(object: { [k: string]: any }): game_hall.JoinReq;

        /**
         * Creates a plain object from a JoinReq message. Also converts values to other types if specified.
         * @param message JoinReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game_hall.JoinReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for JoinReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a JoinRes. */
    interface IJoinRes {

        /** JoinRes tableId */
        tableId?: (string|null);
    }

    /** Represents a JoinRes. */
    class JoinRes implements IJoinRes {

        /**
         * Constructs a new JoinRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: game_hall.IJoinRes);

        /** JoinRes tableId. */
        public tableId: string;

        /**
         * Creates a new JoinRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinRes instance
         */
        public static create(properties?: game_hall.IJoinRes): game_hall.JoinRes;

        /**
         * Encodes the specified JoinRes message. Does not implicitly {@link game_hall.JoinRes.verify|verify} messages.
         * @param message JoinRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: game_hall.IJoinRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinRes message, length delimited. Does not implicitly {@link game_hall.JoinRes.verify|verify} messages.
         * @param message JoinRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: game_hall.IJoinRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game_hall.JoinRes;

        /**
         * Decodes a JoinRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game_hall.JoinRes;

        /**
         * Verifies a JoinRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinRes
         */
        public static fromObject(object: { [k: string]: any }): game_hall.JoinRes;

        /**
         * Creates a plain object from a JoinRes message. Also converts values to other types if specified.
         * @param message JoinRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: game_hall.JoinRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for JoinRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace hallserver_player. */
export namespace hallserver_player {

    /** main enum. */
    enum main {
        hallserver_player = 101
    }

    /** sub enum. */
    enum sub {
        ReqChangeNickName = 1,
        ResChangeNickName = 2,
        PlayerInfoNotice = 80,
        PlayerInfoSynNotice = 81
    }

    /** Properties of a PlayerInfoNotice. */
    interface IPlayerInfoNotice {

        /** PlayerInfoNotice nickname */
        nickname?: (string|null);

        /** PlayerInfoNotice rankScore */
        rankScore?: (number|null);

        /** PlayerInfoNotice level */
        level?: (number|null);

        /** PlayerInfoNotice headFrameId */
        headFrameId?: (number|null);

        /** PlayerInfoNotice headId */
        headId?: (number|null);
    }

    /** Represents a PlayerInfoNotice. */
    class PlayerInfoNotice implements IPlayerInfoNotice {

        /**
         * Constructs a new PlayerInfoNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_player.IPlayerInfoNotice);

        /** PlayerInfoNotice nickname. */
        public nickname: string;

        /** PlayerInfoNotice rankScore. */
        public rankScore: number;

        /** PlayerInfoNotice level. */
        public level: number;

        /** PlayerInfoNotice headFrameId. */
        public headFrameId: number;

        /** PlayerInfoNotice headId. */
        public headId: number;

        /**
         * Creates a new PlayerInfoNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerInfoNotice instance
         */
        public static create(properties?: hallserver_player.IPlayerInfoNotice): hallserver_player.PlayerInfoNotice;

        /**
         * Encodes the specified PlayerInfoNotice message. Does not implicitly {@link hallserver_player.PlayerInfoNotice.verify|verify} messages.
         * @param message PlayerInfoNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_player.IPlayerInfoNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerInfoNotice message, length delimited. Does not implicitly {@link hallserver_player.PlayerInfoNotice.verify|verify} messages.
         * @param message PlayerInfoNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_player.IPlayerInfoNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerInfoNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerInfoNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_player.PlayerInfoNotice;

        /**
         * Decodes a PlayerInfoNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerInfoNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_player.PlayerInfoNotice;

        /**
         * Verifies a PlayerInfoNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerInfoNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerInfoNotice
         */
        public static fromObject(object: { [k: string]: any }): hallserver_player.PlayerInfoNotice;

        /**
         * Creates a plain object from a PlayerInfoNotice message. Also converts values to other types if specified.
         * @param message PlayerInfoNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_player.PlayerInfoNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerInfoNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerInfoNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an oneSynInfo. */
    interface IoneSynInfo {

        /** oneSynInfo fieldName */
        fieldName?: (string|null);

        /** oneSynInfo isStr */
        isStr?: (number|null);

        /** oneSynInfo valueStr */
        valueStr?: (string|null);

        /** oneSynInfo value */
        value?: (number|Long|null);
    }

    /** Represents an oneSynInfo. */
    class oneSynInfo implements IoneSynInfo {

        /**
         * Constructs a new oneSynInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_player.IoneSynInfo);

        /** oneSynInfo fieldName. */
        public fieldName: string;

        /** oneSynInfo isStr. */
        public isStr: number;

        /** oneSynInfo valueStr. */
        public valueStr: string;

        /** oneSynInfo value. */
        public value: (number|Long);

        /**
         * Creates a new oneSynInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns oneSynInfo instance
         */
        public static create(properties?: hallserver_player.IoneSynInfo): hallserver_player.oneSynInfo;

        /**
         * Encodes the specified oneSynInfo message. Does not implicitly {@link hallserver_player.oneSynInfo.verify|verify} messages.
         * @param message oneSynInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_player.IoneSynInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified oneSynInfo message, length delimited. Does not implicitly {@link hallserver_player.oneSynInfo.verify|verify} messages.
         * @param message oneSynInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_player.IoneSynInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an oneSynInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns oneSynInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_player.oneSynInfo;

        /**
         * Decodes an oneSynInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns oneSynInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_player.oneSynInfo;

        /**
         * Verifies an oneSynInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an oneSynInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns oneSynInfo
         */
        public static fromObject(object: { [k: string]: any }): hallserver_player.oneSynInfo;

        /**
         * Creates a plain object from an oneSynInfo message. Also converts values to other types if specified.
         * @param message oneSynInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_player.oneSynInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this oneSynInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for oneSynInfo
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerInfoSynNotice. */
    interface IPlayerInfoSynNotice {

        /** PlayerInfoSynNotice playerId */
        playerId?: (number|Long|null);

        /** PlayerInfoSynNotice synList */
        synList?: (hallserver_player.IoneSynInfo[]|null);
    }

    /** Represents a PlayerInfoSynNotice. */
    class PlayerInfoSynNotice implements IPlayerInfoSynNotice {

        /**
         * Constructs a new PlayerInfoSynNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_player.IPlayerInfoSynNotice);

        /** PlayerInfoSynNotice playerId. */
        public playerId: (number|Long);

        /** PlayerInfoSynNotice synList. */
        public synList: hallserver_player.IoneSynInfo[];

        /**
         * Creates a new PlayerInfoSynNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerInfoSynNotice instance
         */
        public static create(properties?: hallserver_player.IPlayerInfoSynNotice): hallserver_player.PlayerInfoSynNotice;

        /**
         * Encodes the specified PlayerInfoSynNotice message. Does not implicitly {@link hallserver_player.PlayerInfoSynNotice.verify|verify} messages.
         * @param message PlayerInfoSynNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_player.IPlayerInfoSynNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerInfoSynNotice message, length delimited. Does not implicitly {@link hallserver_player.PlayerInfoSynNotice.verify|verify} messages.
         * @param message PlayerInfoSynNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_player.IPlayerInfoSynNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerInfoSynNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerInfoSynNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_player.PlayerInfoSynNotice;

        /**
         * Decodes a PlayerInfoSynNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerInfoSynNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_player.PlayerInfoSynNotice;

        /**
         * Verifies a PlayerInfoSynNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerInfoSynNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerInfoSynNotice
         */
        public static fromObject(object: { [k: string]: any }): hallserver_player.PlayerInfoSynNotice;

        /**
         * Creates a plain object from a PlayerInfoSynNotice message. Also converts values to other types if specified.
         * @param message PlayerInfoSynNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_player.PlayerInfoSynNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerInfoSynNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerInfoSynNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReqChangeNickName. */
    interface IReqChangeNickName {

        /** ReqChangeNickName nickname */
        nickname?: (string|null);
    }

    /** Represents a ReqChangeNickName. */
    class ReqChangeNickName implements IReqChangeNickName {

        /**
         * Constructs a new ReqChangeNickName.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_player.IReqChangeNickName);

        /** ReqChangeNickName nickname. */
        public nickname: string;

        /**
         * Creates a new ReqChangeNickName instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReqChangeNickName instance
         */
        public static create(properties?: hallserver_player.IReqChangeNickName): hallserver_player.ReqChangeNickName;

        /**
         * Encodes the specified ReqChangeNickName message. Does not implicitly {@link hallserver_player.ReqChangeNickName.verify|verify} messages.
         * @param message ReqChangeNickName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_player.IReqChangeNickName, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReqChangeNickName message, length delimited. Does not implicitly {@link hallserver_player.ReqChangeNickName.verify|verify} messages.
         * @param message ReqChangeNickName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_player.IReqChangeNickName, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReqChangeNickName message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReqChangeNickName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_player.ReqChangeNickName;

        /**
         * Decodes a ReqChangeNickName message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReqChangeNickName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_player.ReqChangeNickName;

        /**
         * Verifies a ReqChangeNickName message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReqChangeNickName message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReqChangeNickName
         */
        public static fromObject(object: { [k: string]: any }): hallserver_player.ReqChangeNickName;

        /**
         * Creates a plain object from a ReqChangeNickName message. Also converts values to other types if specified.
         * @param message ReqChangeNickName
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_player.ReqChangeNickName, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReqChangeNickName to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReqChangeNickName
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ResChangeNickName. */
    interface IResChangeNickName {

        /** ResChangeNickName nickname */
        nickname?: (string|null);
    }

    /** Represents a ResChangeNickName. */
    class ResChangeNickName implements IResChangeNickName {

        /**
         * Constructs a new ResChangeNickName.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_player.IResChangeNickName);

        /** ResChangeNickName nickname. */
        public nickname: string;

        /**
         * Creates a new ResChangeNickName instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResChangeNickName instance
         */
        public static create(properties?: hallserver_player.IResChangeNickName): hallserver_player.ResChangeNickName;

        /**
         * Encodes the specified ResChangeNickName message. Does not implicitly {@link hallserver_player.ResChangeNickName.verify|verify} messages.
         * @param message ResChangeNickName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_player.IResChangeNickName, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResChangeNickName message, length delimited. Does not implicitly {@link hallserver_player.ResChangeNickName.verify|verify} messages.
         * @param message ResChangeNickName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_player.IResChangeNickName, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResChangeNickName message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResChangeNickName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_player.ResChangeNickName;

        /**
         * Decodes a ResChangeNickName message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResChangeNickName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_player.ResChangeNickName;

        /**
         * Verifies a ResChangeNickName message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResChangeNickName message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResChangeNickName
         */
        public static fromObject(object: { [k: string]: any }): hallserver_player.ResChangeNickName;

        /**
         * Creates a plain object from a ResChangeNickName message. Also converts values to other types if specified.
         * @param message ResChangeNickName
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_player.ResChangeNickName, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResChangeNickName to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ResChangeNickName
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace hallserver_item. */
export namespace hallserver_item {

    /** main enum. */
    enum main {
        hallserver_item = 102
    }

    /** sub enum. */
    enum sub {
        ItemListNotice = 80
    }

    /** Properties of an ItemListNotice. */
    interface IItemListNotice {

        /** ItemListNotice itemList */
        itemList?: (common.IItem[]|null);
    }

    /** Represents an ItemListNotice. */
    class ItemListNotice implements IItemListNotice {

        /**
         * Constructs a new ItemListNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_item.IItemListNotice);

        /** ItemListNotice itemList. */
        public itemList: common.IItem[];

        /**
         * Creates a new ItemListNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemListNotice instance
         */
        public static create(properties?: hallserver_item.IItemListNotice): hallserver_item.ItemListNotice;

        /**
         * Encodes the specified ItemListNotice message. Does not implicitly {@link hallserver_item.ItemListNotice.verify|verify} messages.
         * @param message ItemListNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_item.IItemListNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ItemListNotice message, length delimited. Does not implicitly {@link hallserver_item.ItemListNotice.verify|verify} messages.
         * @param message ItemListNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_item.IItemListNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ItemListNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemListNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_item.ItemListNotice;

        /**
         * Decodes an ItemListNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemListNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_item.ItemListNotice;

        /**
         * Verifies an ItemListNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemListNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemListNotice
         */
        public static fromObject(object: { [k: string]: any }): hallserver_item.ItemListNotice;

        /**
         * Creates a plain object from an ItemListNotice message. Also converts values to other types if specified.
         * @param message ItemListNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_item.ItemListNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemListNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ItemListNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace hallserver_match. */
export namespace hallserver_match {

    /** main enum. */
    enum main {
        hallserver_match = 103
    }

    /** sub enum. */
    enum sub {
        MatchGameReq = 1,
        MatchGameRes = 2,
        CancelMatchGameReq = 3,
        CancelMatchGameRes = 4,
        AcceptMatchReq = 5,
        AcceptMatchRes = 6,
        MatchGameNotice = 80,
        JoinGameNotice = 81
    }

    /** Properties of a MatchGameReq. */
    interface IMatchGameReq {

        /** MatchGameReq gameId */
        gameId?: (number|null);

        /** MatchGameReq playType */
        playType?: (number|null);
    }

    /** Represents a MatchGameReq. */
    class MatchGameReq implements IMatchGameReq {

        /**
         * Constructs a new MatchGameReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_match.IMatchGameReq);

        /** MatchGameReq gameId. */
        public gameId: number;

        /** MatchGameReq playType. */
        public playType: number;

        /**
         * Creates a new MatchGameReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchGameReq instance
         */
        public static create(properties?: hallserver_match.IMatchGameReq): hallserver_match.MatchGameReq;

        /**
         * Encodes the specified MatchGameReq message. Does not implicitly {@link hallserver_match.MatchGameReq.verify|verify} messages.
         * @param message MatchGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_match.IMatchGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchGameReq message, length delimited. Does not implicitly {@link hallserver_match.MatchGameReq.verify|verify} messages.
         * @param message MatchGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_match.IMatchGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchGameReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_match.MatchGameReq;

        /**
         * Decodes a MatchGameReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_match.MatchGameReq;

        /**
         * Verifies a MatchGameReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchGameReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchGameReq
         */
        public static fromObject(object: { [k: string]: any }): hallserver_match.MatchGameReq;

        /**
         * Creates a plain object from a MatchGameReq message. Also converts values to other types if specified.
         * @param message MatchGameReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_match.MatchGameReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchGameReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchGameReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchGameRes. */
    interface IMatchGameRes {

        /** MatchGameRes gameId */
        gameId?: (number|null);
    }

    /** Represents a MatchGameRes. */
    class MatchGameRes implements IMatchGameRes {

        /**
         * Constructs a new MatchGameRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_match.IMatchGameRes);

        /** MatchGameRes gameId. */
        public gameId: number;

        /**
         * Creates a new MatchGameRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchGameRes instance
         */
        public static create(properties?: hallserver_match.IMatchGameRes): hallserver_match.MatchGameRes;

        /**
         * Encodes the specified MatchGameRes message. Does not implicitly {@link hallserver_match.MatchGameRes.verify|verify} messages.
         * @param message MatchGameRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_match.IMatchGameRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchGameRes message, length delimited. Does not implicitly {@link hallserver_match.MatchGameRes.verify|verify} messages.
         * @param message MatchGameRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_match.IMatchGameRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchGameRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchGameRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_match.MatchGameRes;

        /**
         * Decodes a MatchGameRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchGameRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_match.MatchGameRes;

        /**
         * Verifies a MatchGameRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchGameRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchGameRes
         */
        public static fromObject(object: { [k: string]: any }): hallserver_match.MatchGameRes;

        /**
         * Creates a plain object from a MatchGameRes message. Also converts values to other types if specified.
         * @param message MatchGameRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_match.MatchGameRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchGameRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchGameRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CancelMatchGameReq. */
    interface ICancelMatchGameReq {

        /** CancelMatchGameReq gameId */
        gameId?: (number|null);
    }

    /** Represents a CancelMatchGameReq. */
    class CancelMatchGameReq implements ICancelMatchGameReq {

        /**
         * Constructs a new CancelMatchGameReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_match.ICancelMatchGameReq);

        /** CancelMatchGameReq gameId. */
        public gameId: number;

        /**
         * Creates a new CancelMatchGameReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CancelMatchGameReq instance
         */
        public static create(properties?: hallserver_match.ICancelMatchGameReq): hallserver_match.CancelMatchGameReq;

        /**
         * Encodes the specified CancelMatchGameReq message. Does not implicitly {@link hallserver_match.CancelMatchGameReq.verify|verify} messages.
         * @param message CancelMatchGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_match.ICancelMatchGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CancelMatchGameReq message, length delimited. Does not implicitly {@link hallserver_match.CancelMatchGameReq.verify|verify} messages.
         * @param message CancelMatchGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_match.ICancelMatchGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CancelMatchGameReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CancelMatchGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_match.CancelMatchGameReq;

        /**
         * Decodes a CancelMatchGameReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CancelMatchGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_match.CancelMatchGameReq;

        /**
         * Verifies a CancelMatchGameReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CancelMatchGameReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CancelMatchGameReq
         */
        public static fromObject(object: { [k: string]: any }): hallserver_match.CancelMatchGameReq;

        /**
         * Creates a plain object from a CancelMatchGameReq message. Also converts values to other types if specified.
         * @param message CancelMatchGameReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_match.CancelMatchGameReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CancelMatchGameReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CancelMatchGameReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a CancelMatchGameRes. */
    interface ICancelMatchGameRes {

        /** CancelMatchGameRes gameId */
        gameId?: (number|null);
    }

    /** Represents a CancelMatchGameRes. */
    class CancelMatchGameRes implements ICancelMatchGameRes {

        /**
         * Constructs a new CancelMatchGameRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_match.ICancelMatchGameRes);

        /** CancelMatchGameRes gameId. */
        public gameId: number;

        /**
         * Creates a new CancelMatchGameRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CancelMatchGameRes instance
         */
        public static create(properties?: hallserver_match.ICancelMatchGameRes): hallserver_match.CancelMatchGameRes;

        /**
         * Encodes the specified CancelMatchGameRes message. Does not implicitly {@link hallserver_match.CancelMatchGameRes.verify|verify} messages.
         * @param message CancelMatchGameRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_match.ICancelMatchGameRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CancelMatchGameRes message, length delimited. Does not implicitly {@link hallserver_match.CancelMatchGameRes.verify|verify} messages.
         * @param message CancelMatchGameRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_match.ICancelMatchGameRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CancelMatchGameRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CancelMatchGameRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_match.CancelMatchGameRes;

        /**
         * Decodes a CancelMatchGameRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CancelMatchGameRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_match.CancelMatchGameRes;

        /**
         * Verifies a CancelMatchGameRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CancelMatchGameRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CancelMatchGameRes
         */
        public static fromObject(object: { [k: string]: any }): hallserver_match.CancelMatchGameRes;

        /**
         * Creates a plain object from a CancelMatchGameRes message. Also converts values to other types if specified.
         * @param message CancelMatchGameRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_match.CancelMatchGameRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CancelMatchGameRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CancelMatchGameRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MatchGameNotice. */
    interface IMatchGameNotice {

        /** MatchGameNotice gameId */
        gameId?: (number|null);

        /** MatchGameNotice sessionId */
        sessionId?: (string|null);

        /** MatchGameNotice remainTime */
        remainTime?: (number|null);
    }

    /** Represents a MatchGameNotice. */
    class MatchGameNotice implements IMatchGameNotice {

        /**
         * Constructs a new MatchGameNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_match.IMatchGameNotice);

        /** MatchGameNotice gameId. */
        public gameId: number;

        /** MatchGameNotice sessionId. */
        public sessionId: string;

        /** MatchGameNotice remainTime. */
        public remainTime: number;

        /**
         * Creates a new MatchGameNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MatchGameNotice instance
         */
        public static create(properties?: hallserver_match.IMatchGameNotice): hallserver_match.MatchGameNotice;

        /**
         * Encodes the specified MatchGameNotice message. Does not implicitly {@link hallserver_match.MatchGameNotice.verify|verify} messages.
         * @param message MatchGameNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_match.IMatchGameNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MatchGameNotice message, length delimited. Does not implicitly {@link hallserver_match.MatchGameNotice.verify|verify} messages.
         * @param message MatchGameNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_match.IMatchGameNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MatchGameNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MatchGameNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_match.MatchGameNotice;

        /**
         * Decodes a MatchGameNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MatchGameNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_match.MatchGameNotice;

        /**
         * Verifies a MatchGameNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MatchGameNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MatchGameNotice
         */
        public static fromObject(object: { [k: string]: any }): hallserver_match.MatchGameNotice;

        /**
         * Creates a plain object from a MatchGameNotice message. Also converts values to other types if specified.
         * @param message MatchGameNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_match.MatchGameNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MatchGameNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MatchGameNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AcceptMatchReq. */
    interface IAcceptMatchReq {

        /** AcceptMatchReq gameId */
        gameId?: (number|null);

        /** AcceptMatchReq sessionId */
        sessionId?: (string|null);
    }

    /** Represents an AcceptMatchReq. */
    class AcceptMatchReq implements IAcceptMatchReq {

        /**
         * Constructs a new AcceptMatchReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_match.IAcceptMatchReq);

        /** AcceptMatchReq gameId. */
        public gameId: number;

        /** AcceptMatchReq sessionId. */
        public sessionId: string;

        /**
         * Creates a new AcceptMatchReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AcceptMatchReq instance
         */
        public static create(properties?: hallserver_match.IAcceptMatchReq): hallserver_match.AcceptMatchReq;

        /**
         * Encodes the specified AcceptMatchReq message. Does not implicitly {@link hallserver_match.AcceptMatchReq.verify|verify} messages.
         * @param message AcceptMatchReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_match.IAcceptMatchReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AcceptMatchReq message, length delimited. Does not implicitly {@link hallserver_match.AcceptMatchReq.verify|verify} messages.
         * @param message AcceptMatchReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_match.IAcceptMatchReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AcceptMatchReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AcceptMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_match.AcceptMatchReq;

        /**
         * Decodes an AcceptMatchReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AcceptMatchReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_match.AcceptMatchReq;

        /**
         * Verifies an AcceptMatchReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AcceptMatchReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AcceptMatchReq
         */
        public static fromObject(object: { [k: string]: any }): hallserver_match.AcceptMatchReq;

        /**
         * Creates a plain object from an AcceptMatchReq message. Also converts values to other types if specified.
         * @param message AcceptMatchReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_match.AcceptMatchReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AcceptMatchReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AcceptMatchReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AcceptMatchRes. */
    interface IAcceptMatchRes {

        /** AcceptMatchRes gameId */
        gameId?: (number|null);

        /** AcceptMatchRes sessionId */
        sessionId?: (string|null);
    }

    /** Represents an AcceptMatchRes. */
    class AcceptMatchRes implements IAcceptMatchRes {

        /**
         * Constructs a new AcceptMatchRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_match.IAcceptMatchRes);

        /** AcceptMatchRes gameId. */
        public gameId: number;

        /** AcceptMatchRes sessionId. */
        public sessionId: string;

        /**
         * Creates a new AcceptMatchRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AcceptMatchRes instance
         */
        public static create(properties?: hallserver_match.IAcceptMatchRes): hallserver_match.AcceptMatchRes;

        /**
         * Encodes the specified AcceptMatchRes message. Does not implicitly {@link hallserver_match.AcceptMatchRes.verify|verify} messages.
         * @param message AcceptMatchRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_match.IAcceptMatchRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AcceptMatchRes message, length delimited. Does not implicitly {@link hallserver_match.AcceptMatchRes.verify|verify} messages.
         * @param message AcceptMatchRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_match.IAcceptMatchRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AcceptMatchRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AcceptMatchRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_match.AcceptMatchRes;

        /**
         * Decodes an AcceptMatchRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AcceptMatchRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_match.AcceptMatchRes;

        /**
         * Verifies an AcceptMatchRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AcceptMatchRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AcceptMatchRes
         */
        public static fromObject(object: { [k: string]: any }): hallserver_match.AcceptMatchRes;

        /**
         * Creates a plain object from an AcceptMatchRes message. Also converts values to other types if specified.
         * @param message AcceptMatchRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_match.AcceptMatchRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AcceptMatchRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AcceptMatchRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a JoinGameNotice. */
    interface IJoinGameNotice {

        /** JoinGameNotice gamehost */
        gamehost?: (string|null);

        /** JoinGameNotice gametoken */
        gametoken?: (string|null);

        /** JoinGameNotice tableId */
        tableId?: (string|null);
    }

    /** Represents a JoinGameNotice. */
    class JoinGameNotice implements IJoinGameNotice {

        /**
         * Constructs a new JoinGameNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_match.IJoinGameNotice);

        /** JoinGameNotice gamehost. */
        public gamehost: string;

        /** JoinGameNotice gametoken. */
        public gametoken: string;

        /** JoinGameNotice tableId. */
        public tableId: string;

        /**
         * Creates a new JoinGameNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinGameNotice instance
         */
        public static create(properties?: hallserver_match.IJoinGameNotice): hallserver_match.JoinGameNotice;

        /**
         * Encodes the specified JoinGameNotice message. Does not implicitly {@link hallserver_match.JoinGameNotice.verify|verify} messages.
         * @param message JoinGameNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_match.IJoinGameNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinGameNotice message, length delimited. Does not implicitly {@link hallserver_match.JoinGameNotice.verify|verify} messages.
         * @param message JoinGameNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_match.IJoinGameNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinGameNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinGameNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_match.JoinGameNotice;

        /**
         * Decodes a JoinGameNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinGameNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_match.JoinGameNotice;

        /**
         * Verifies a JoinGameNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinGameNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinGameNotice
         */
        public static fromObject(object: { [k: string]: any }): hallserver_match.JoinGameNotice;

        /**
         * Creates a plain object from a JoinGameNotice message. Also converts values to other types if specified.
         * @param message JoinGameNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_match.JoinGameNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinGameNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for JoinGameNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace hallserver_friend. */
export namespace hallserver_friend {

    /** main enum. */
    enum main {
        hallserver_friend = 104
    }

    /** sub enum. */
    enum sub {
        AddFriendReq = 1,
        AddFriendRes = 2,
        AgreeAddFriendReq = 3,
        AgreeAddFriendRes = 4,
        RefuseAddFriendReq = 5,
        RefuseAddFriendRes = 6,
        DelFriendReq = 7,
        DelFriendRes = 8,
        FriendListNotice = 81,
        AddReqListNotice = 82,
        AddReqNotice = 83,
        AddFriendNotice = 84,
        DelFriendNotice = 85
    }

    /** Properties of an OneFriend. */
    interface IOneFriend {

        /** OneFriend playerId */
        playerId?: (number|Long|null);

        /** OneFriend nickname */
        nickname?: (string|null);

        /** OneFriend lastLogoutTime */
        lastLogoutTime?: (number|Long|null);

        /** OneFriend isOnline */
        isOnline?: (number|null);
    }

    /** Represents an OneFriend. */
    class OneFriend implements IOneFriend {

        /**
         * Constructs a new OneFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IOneFriend);

        /** OneFriend playerId. */
        public playerId: (number|Long);

        /** OneFriend nickname. */
        public nickname: string;

        /** OneFriend lastLogoutTime. */
        public lastLogoutTime: (number|Long);

        /** OneFriend isOnline. */
        public isOnline: number;

        /**
         * Creates a new OneFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OneFriend instance
         */
        public static create(properties?: hallserver_friend.IOneFriend): hallserver_friend.OneFriend;

        /**
         * Encodes the specified OneFriend message. Does not implicitly {@link hallserver_friend.OneFriend.verify|verify} messages.
         * @param message OneFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IOneFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OneFriend message, length delimited. Does not implicitly {@link hallserver_friend.OneFriend.verify|verify} messages.
         * @param message OneFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IOneFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OneFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OneFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.OneFriend;

        /**
         * Decodes an OneFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OneFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.OneFriend;

        /**
         * Verifies an OneFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OneFriend message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OneFriend
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.OneFriend;

        /**
         * Creates a plain object from an OneFriend message. Also converts values to other types if specified.
         * @param message OneFriend
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.OneFriend, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OneFriend to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for OneFriend
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a FriendListNotice. */
    interface IFriendListNotice {

        /** FriendListNotice friendList */
        friendList?: (hallserver_friend.IOneFriend[]|null);
    }

    /** Represents a FriendListNotice. */
    class FriendListNotice implements IFriendListNotice {

        /**
         * Constructs a new FriendListNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IFriendListNotice);

        /** FriendListNotice friendList. */
        public friendList: hallserver_friend.IOneFriend[];

        /**
         * Creates a new FriendListNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FriendListNotice instance
         */
        public static create(properties?: hallserver_friend.IFriendListNotice): hallserver_friend.FriendListNotice;

        /**
         * Encodes the specified FriendListNotice message. Does not implicitly {@link hallserver_friend.FriendListNotice.verify|verify} messages.
         * @param message FriendListNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IFriendListNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FriendListNotice message, length delimited. Does not implicitly {@link hallserver_friend.FriendListNotice.verify|verify} messages.
         * @param message FriendListNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IFriendListNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FriendListNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FriendListNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.FriendListNotice;

        /**
         * Decodes a FriendListNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FriendListNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.FriendListNotice;

        /**
         * Verifies a FriendListNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FriendListNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FriendListNotice
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.FriendListNotice;

        /**
         * Creates a plain object from a FriendListNotice message. Also converts values to other types if specified.
         * @param message FriendListNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.FriendListNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FriendListNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for FriendListNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AddFriendReq. */
    interface IAddFriendReq {

        /** AddFriendReq playerId */
        playerId?: (number|Long|null);
    }

    /** Represents an AddFriendReq. */
    class AddFriendReq implements IAddFriendReq {

        /**
         * Constructs a new AddFriendReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IAddFriendReq);

        /** AddFriendReq playerId. */
        public playerId: (number|Long);

        /**
         * Creates a new AddFriendReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AddFriendReq instance
         */
        public static create(properties?: hallserver_friend.IAddFriendReq): hallserver_friend.AddFriendReq;

        /**
         * Encodes the specified AddFriendReq message. Does not implicitly {@link hallserver_friend.AddFriendReq.verify|verify} messages.
         * @param message AddFriendReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IAddFriendReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AddFriendReq message, length delimited. Does not implicitly {@link hallserver_friend.AddFriendReq.verify|verify} messages.
         * @param message AddFriendReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IAddFriendReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AddFriendReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AddFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.AddFriendReq;

        /**
         * Decodes an AddFriendReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AddFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.AddFriendReq;

        /**
         * Verifies an AddFriendReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AddFriendReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AddFriendReq
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.AddFriendReq;

        /**
         * Creates a plain object from an AddFriendReq message. Also converts values to other types if specified.
         * @param message AddFriendReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.AddFriendReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AddFriendReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AddFriendReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AddFriendRes. */
    interface IAddFriendRes {

        /** AddFriendRes playerId */
        playerId?: (number|Long|null);
    }

    /** Represents an AddFriendRes. */
    class AddFriendRes implements IAddFriendRes {

        /**
         * Constructs a new AddFriendRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IAddFriendRes);

        /** AddFriendRes playerId. */
        public playerId: (number|Long);

        /**
         * Creates a new AddFriendRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AddFriendRes instance
         */
        public static create(properties?: hallserver_friend.IAddFriendRes): hallserver_friend.AddFriendRes;

        /**
         * Encodes the specified AddFriendRes message. Does not implicitly {@link hallserver_friend.AddFriendRes.verify|verify} messages.
         * @param message AddFriendRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IAddFriendRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AddFriendRes message, length delimited. Does not implicitly {@link hallserver_friend.AddFriendRes.verify|verify} messages.
         * @param message AddFriendRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IAddFriendRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AddFriendRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AddFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.AddFriendRes;

        /**
         * Decodes an AddFriendRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AddFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.AddFriendRes;

        /**
         * Verifies an AddFriendRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AddFriendRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AddFriendRes
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.AddFriendRes;

        /**
         * Creates a plain object from an AddFriendRes message. Also converts values to other types if specified.
         * @param message AddFriendRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.AddFriendRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AddFriendRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AddFriendRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AddReqListNotice. */
    interface IAddReqListNotice {

        /** AddReqListNotice playerIdList */
        playerIdList?: ((number|Long)[]|null);

        /** AddReqListNotice nicknameList */
        nicknameList?: (string[]|null);
    }

    /** Represents an AddReqListNotice. */
    class AddReqListNotice implements IAddReqListNotice {

        /**
         * Constructs a new AddReqListNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IAddReqListNotice);

        /** AddReqListNotice playerIdList. */
        public playerIdList: (number|Long)[];

        /** AddReqListNotice nicknameList. */
        public nicknameList: string[];

        /**
         * Creates a new AddReqListNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AddReqListNotice instance
         */
        public static create(properties?: hallserver_friend.IAddReqListNotice): hallserver_friend.AddReqListNotice;

        /**
         * Encodes the specified AddReqListNotice message. Does not implicitly {@link hallserver_friend.AddReqListNotice.verify|verify} messages.
         * @param message AddReqListNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IAddReqListNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AddReqListNotice message, length delimited. Does not implicitly {@link hallserver_friend.AddReqListNotice.verify|verify} messages.
         * @param message AddReqListNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IAddReqListNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AddReqListNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AddReqListNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.AddReqListNotice;

        /**
         * Decodes an AddReqListNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AddReqListNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.AddReqListNotice;

        /**
         * Verifies an AddReqListNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AddReqListNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AddReqListNotice
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.AddReqListNotice;

        /**
         * Creates a plain object from an AddReqListNotice message. Also converts values to other types if specified.
         * @param message AddReqListNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.AddReqListNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AddReqListNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AddReqListNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AgreeAddFriendReq. */
    interface IAgreeAddFriendReq {

        /** AgreeAddFriendReq playerId */
        playerId?: (number|Long|null);
    }

    /** Represents an AgreeAddFriendReq. */
    class AgreeAddFriendReq implements IAgreeAddFriendReq {

        /**
         * Constructs a new AgreeAddFriendReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IAgreeAddFriendReq);

        /** AgreeAddFriendReq playerId. */
        public playerId: (number|Long);

        /**
         * Creates a new AgreeAddFriendReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AgreeAddFriendReq instance
         */
        public static create(properties?: hallserver_friend.IAgreeAddFriendReq): hallserver_friend.AgreeAddFriendReq;

        /**
         * Encodes the specified AgreeAddFriendReq message. Does not implicitly {@link hallserver_friend.AgreeAddFriendReq.verify|verify} messages.
         * @param message AgreeAddFriendReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IAgreeAddFriendReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AgreeAddFriendReq message, length delimited. Does not implicitly {@link hallserver_friend.AgreeAddFriendReq.verify|verify} messages.
         * @param message AgreeAddFriendReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IAgreeAddFriendReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AgreeAddFriendReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AgreeAddFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.AgreeAddFriendReq;

        /**
         * Decodes an AgreeAddFriendReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AgreeAddFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.AgreeAddFriendReq;

        /**
         * Verifies an AgreeAddFriendReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AgreeAddFriendReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AgreeAddFriendReq
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.AgreeAddFriendReq;

        /**
         * Creates a plain object from an AgreeAddFriendReq message. Also converts values to other types if specified.
         * @param message AgreeAddFriendReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.AgreeAddFriendReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AgreeAddFriendReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AgreeAddFriendReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AgreeAddFriendRes. */
    interface IAgreeAddFriendRes {

        /** AgreeAddFriendRes playerId */
        playerId?: (number|Long|null);
    }

    /** Represents an AgreeAddFriendRes. */
    class AgreeAddFriendRes implements IAgreeAddFriendRes {

        /**
         * Constructs a new AgreeAddFriendRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IAgreeAddFriendRes);

        /** AgreeAddFriendRes playerId. */
        public playerId: (number|Long);

        /**
         * Creates a new AgreeAddFriendRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AgreeAddFriendRes instance
         */
        public static create(properties?: hallserver_friend.IAgreeAddFriendRes): hallserver_friend.AgreeAddFriendRes;

        /**
         * Encodes the specified AgreeAddFriendRes message. Does not implicitly {@link hallserver_friend.AgreeAddFriendRes.verify|verify} messages.
         * @param message AgreeAddFriendRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IAgreeAddFriendRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AgreeAddFriendRes message, length delimited. Does not implicitly {@link hallserver_friend.AgreeAddFriendRes.verify|verify} messages.
         * @param message AgreeAddFriendRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IAgreeAddFriendRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AgreeAddFriendRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AgreeAddFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.AgreeAddFriendRes;

        /**
         * Decodes an AgreeAddFriendRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AgreeAddFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.AgreeAddFriendRes;

        /**
         * Verifies an AgreeAddFriendRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AgreeAddFriendRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AgreeAddFriendRes
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.AgreeAddFriendRes;

        /**
         * Creates a plain object from an AgreeAddFriendRes message. Also converts values to other types if specified.
         * @param message AgreeAddFriendRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.AgreeAddFriendRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AgreeAddFriendRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AgreeAddFriendRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RefuseAddFriendReq. */
    interface IRefuseAddFriendReq {

        /** RefuseAddFriendReq playerId */
        playerId?: (number|Long|null);
    }

    /** Represents a RefuseAddFriendReq. */
    class RefuseAddFriendReq implements IRefuseAddFriendReq {

        /**
         * Constructs a new RefuseAddFriendReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IRefuseAddFriendReq);

        /** RefuseAddFriendReq playerId. */
        public playerId: (number|Long);

        /**
         * Creates a new RefuseAddFriendReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RefuseAddFriendReq instance
         */
        public static create(properties?: hallserver_friend.IRefuseAddFriendReq): hallserver_friend.RefuseAddFriendReq;

        /**
         * Encodes the specified RefuseAddFriendReq message. Does not implicitly {@link hallserver_friend.RefuseAddFriendReq.verify|verify} messages.
         * @param message RefuseAddFriendReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IRefuseAddFriendReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RefuseAddFriendReq message, length delimited. Does not implicitly {@link hallserver_friend.RefuseAddFriendReq.verify|verify} messages.
         * @param message RefuseAddFriendReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IRefuseAddFriendReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RefuseAddFriendReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RefuseAddFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.RefuseAddFriendReq;

        /**
         * Decodes a RefuseAddFriendReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RefuseAddFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.RefuseAddFriendReq;

        /**
         * Verifies a RefuseAddFriendReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RefuseAddFriendReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RefuseAddFriendReq
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.RefuseAddFriendReq;

        /**
         * Creates a plain object from a RefuseAddFriendReq message. Also converts values to other types if specified.
         * @param message RefuseAddFriendReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.RefuseAddFriendReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RefuseAddFriendReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RefuseAddFriendReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RefuseAddFriendRes. */
    interface IRefuseAddFriendRes {

        /** RefuseAddFriendRes playerId */
        playerId?: (number|Long|null);
    }

    /** Represents a RefuseAddFriendRes. */
    class RefuseAddFriendRes implements IRefuseAddFriendRes {

        /**
         * Constructs a new RefuseAddFriendRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IRefuseAddFriendRes);

        /** RefuseAddFriendRes playerId. */
        public playerId: (number|Long);

        /**
         * Creates a new RefuseAddFriendRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RefuseAddFriendRes instance
         */
        public static create(properties?: hallserver_friend.IRefuseAddFriendRes): hallserver_friend.RefuseAddFriendRes;

        /**
         * Encodes the specified RefuseAddFriendRes message. Does not implicitly {@link hallserver_friend.RefuseAddFriendRes.verify|verify} messages.
         * @param message RefuseAddFriendRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IRefuseAddFriendRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RefuseAddFriendRes message, length delimited. Does not implicitly {@link hallserver_friend.RefuseAddFriendRes.verify|verify} messages.
         * @param message RefuseAddFriendRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IRefuseAddFriendRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RefuseAddFriendRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RefuseAddFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.RefuseAddFriendRes;

        /**
         * Decodes a RefuseAddFriendRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RefuseAddFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.RefuseAddFriendRes;

        /**
         * Verifies a RefuseAddFriendRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RefuseAddFriendRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RefuseAddFriendRes
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.RefuseAddFriendRes;

        /**
         * Creates a plain object from a RefuseAddFriendRes message. Also converts values to other types if specified.
         * @param message RefuseAddFriendRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.RefuseAddFriendRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RefuseAddFriendRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RefuseAddFriendRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DelFriendReq. */
    interface IDelFriendReq {

        /** DelFriendReq playerId */
        playerId?: (number|Long|null);
    }

    /** Represents a DelFriendReq. */
    class DelFriendReq implements IDelFriendReq {

        /**
         * Constructs a new DelFriendReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IDelFriendReq);

        /** DelFriendReq playerId. */
        public playerId: (number|Long);

        /**
         * Creates a new DelFriendReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelFriendReq instance
         */
        public static create(properties?: hallserver_friend.IDelFriendReq): hallserver_friend.DelFriendReq;

        /**
         * Encodes the specified DelFriendReq message. Does not implicitly {@link hallserver_friend.DelFriendReq.verify|verify} messages.
         * @param message DelFriendReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IDelFriendReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelFriendReq message, length delimited. Does not implicitly {@link hallserver_friend.DelFriendReq.verify|verify} messages.
         * @param message DelFriendReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IDelFriendReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelFriendReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.DelFriendReq;

        /**
         * Decodes a DelFriendReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelFriendReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.DelFriendReq;

        /**
         * Verifies a DelFriendReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelFriendReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelFriendReq
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.DelFriendReq;

        /**
         * Creates a plain object from a DelFriendReq message. Also converts values to other types if specified.
         * @param message DelFriendReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.DelFriendReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelFriendReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DelFriendReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DelFriendRes. */
    interface IDelFriendRes {

        /** DelFriendRes playerId */
        playerId?: (number|Long|null);
    }

    /** Represents a DelFriendRes. */
    class DelFriendRes implements IDelFriendRes {

        /**
         * Constructs a new DelFriendRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IDelFriendRes);

        /** DelFriendRes playerId. */
        public playerId: (number|Long);

        /**
         * Creates a new DelFriendRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelFriendRes instance
         */
        public static create(properties?: hallserver_friend.IDelFriendRes): hallserver_friend.DelFriendRes;

        /**
         * Encodes the specified DelFriendRes message. Does not implicitly {@link hallserver_friend.DelFriendRes.verify|verify} messages.
         * @param message DelFriendRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IDelFriendRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelFriendRes message, length delimited. Does not implicitly {@link hallserver_friend.DelFriendRes.verify|verify} messages.
         * @param message DelFriendRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IDelFriendRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelFriendRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.DelFriendRes;

        /**
         * Decodes a DelFriendRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelFriendRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.DelFriendRes;

        /**
         * Verifies a DelFriendRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelFriendRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelFriendRes
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.DelFriendRes;

        /**
         * Creates a plain object from a DelFriendRes message. Also converts values to other types if specified.
         * @param message DelFriendRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.DelFriendRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelFriendRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DelFriendRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AddReqNotice. */
    interface IAddReqNotice {

        /** AddReqNotice playerId */
        playerId?: (number|Long|null);

        /** AddReqNotice nickname */
        nickname?: (string|null);
    }

    /** Represents an AddReqNotice. */
    class AddReqNotice implements IAddReqNotice {

        /**
         * Constructs a new AddReqNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IAddReqNotice);

        /** AddReqNotice playerId. */
        public playerId: (number|Long);

        /** AddReqNotice nickname. */
        public nickname: string;

        /**
         * Creates a new AddReqNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AddReqNotice instance
         */
        public static create(properties?: hallserver_friend.IAddReqNotice): hallserver_friend.AddReqNotice;

        /**
         * Encodes the specified AddReqNotice message. Does not implicitly {@link hallserver_friend.AddReqNotice.verify|verify} messages.
         * @param message AddReqNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IAddReqNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AddReqNotice message, length delimited. Does not implicitly {@link hallserver_friend.AddReqNotice.verify|verify} messages.
         * @param message AddReqNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IAddReqNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AddReqNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AddReqNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.AddReqNotice;

        /**
         * Decodes an AddReqNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AddReqNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.AddReqNotice;

        /**
         * Verifies an AddReqNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AddReqNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AddReqNotice
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.AddReqNotice;

        /**
         * Creates a plain object from an AddReqNotice message. Also converts values to other types if specified.
         * @param message AddReqNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.AddReqNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AddReqNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AddReqNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AddFriendNotice. */
    interface IAddFriendNotice {

        /** AddFriendNotice friendInfo */
        friendInfo?: (hallserver_friend.IOneFriend|null);
    }

    /** Represents an AddFriendNotice. */
    class AddFriendNotice implements IAddFriendNotice {

        /**
         * Constructs a new AddFriendNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IAddFriendNotice);

        /** AddFriendNotice friendInfo. */
        public friendInfo?: (hallserver_friend.IOneFriend|null);

        /**
         * Creates a new AddFriendNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AddFriendNotice instance
         */
        public static create(properties?: hallserver_friend.IAddFriendNotice): hallserver_friend.AddFriendNotice;

        /**
         * Encodes the specified AddFriendNotice message. Does not implicitly {@link hallserver_friend.AddFriendNotice.verify|verify} messages.
         * @param message AddFriendNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IAddFriendNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AddFriendNotice message, length delimited. Does not implicitly {@link hallserver_friend.AddFriendNotice.verify|verify} messages.
         * @param message AddFriendNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IAddFriendNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AddFriendNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AddFriendNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.AddFriendNotice;

        /**
         * Decodes an AddFriendNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AddFriendNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.AddFriendNotice;

        /**
         * Verifies an AddFriendNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AddFriendNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AddFriendNotice
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.AddFriendNotice;

        /**
         * Creates a plain object from an AddFriendNotice message. Also converts values to other types if specified.
         * @param message AddFriendNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.AddFriendNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AddFriendNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AddFriendNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DelFriendNotice. */
    interface IDelFriendNotice {

        /** DelFriendNotice playerId */
        playerId?: (number|Long|null);
    }

    /** Represents a DelFriendNotice. */
    class DelFriendNotice implements IDelFriendNotice {

        /**
         * Constructs a new DelFriendNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_friend.IDelFriendNotice);

        /** DelFriendNotice playerId. */
        public playerId: (number|Long);

        /**
         * Creates a new DelFriendNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelFriendNotice instance
         */
        public static create(properties?: hallserver_friend.IDelFriendNotice): hallserver_friend.DelFriendNotice;

        /**
         * Encodes the specified DelFriendNotice message. Does not implicitly {@link hallserver_friend.DelFriendNotice.verify|verify} messages.
         * @param message DelFriendNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_friend.IDelFriendNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelFriendNotice message, length delimited. Does not implicitly {@link hallserver_friend.DelFriendNotice.verify|verify} messages.
         * @param message DelFriendNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_friend.IDelFriendNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelFriendNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelFriendNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_friend.DelFriendNotice;

        /**
         * Decodes a DelFriendNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelFriendNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_friend.DelFriendNotice;

        /**
         * Verifies a DelFriendNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelFriendNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelFriendNotice
         */
        public static fromObject(object: { [k: string]: any }): hallserver_friend.DelFriendNotice;

        /**
         * Creates a plain object from a DelFriendNotice message. Also converts values to other types if specified.
         * @param message DelFriendNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_friend.DelFriendNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelFriendNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DelFriendNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace hallserver_game_record. */
export namespace hallserver_game_record {

    /** main enum. */
    enum main {
        hallserver_game_record = 105
    }

    /** sub enum. */
    enum sub {
        RecordListReq = 1,
        RecordListRes = 2
    }

    /** Properties of an OneRecord. */
    interface IOneRecord {

        /** OneRecord createTime */
        createTime?: (number|Long|null);

        /** OneRecord tableId */
        tableId?: (string|null);

        /** OneRecord gameId */
        gameId?: (number|null);

        /** OneRecord score */
        score?: (number|null);
    }

    /** Represents an OneRecord. */
    class OneRecord implements IOneRecord {

        /**
         * Constructs a new OneRecord.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_game_record.IOneRecord);

        /** OneRecord createTime. */
        public createTime: (number|Long);

        /** OneRecord tableId. */
        public tableId: string;

        /** OneRecord gameId. */
        public gameId: number;

        /** OneRecord score. */
        public score: number;

        /**
         * Creates a new OneRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OneRecord instance
         */
        public static create(properties?: hallserver_game_record.IOneRecord): hallserver_game_record.OneRecord;

        /**
         * Encodes the specified OneRecord message. Does not implicitly {@link hallserver_game_record.OneRecord.verify|verify} messages.
         * @param message OneRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_game_record.IOneRecord, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OneRecord message, length delimited. Does not implicitly {@link hallserver_game_record.OneRecord.verify|verify} messages.
         * @param message OneRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_game_record.IOneRecord, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OneRecord message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OneRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_game_record.OneRecord;

        /**
         * Decodes an OneRecord message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OneRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_game_record.OneRecord;

        /**
         * Verifies an OneRecord message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OneRecord message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OneRecord
         */
        public static fromObject(object: { [k: string]: any }): hallserver_game_record.OneRecord;

        /**
         * Creates a plain object from an OneRecord message. Also converts values to other types if specified.
         * @param message OneRecord
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_game_record.OneRecord, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OneRecord to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for OneRecord
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RecordListReq. */
    interface IRecordListReq {

        /** RecordListReq pageageNum */
        pageageNum?: (number|null);

        /** RecordListReq pageageCount */
        pageageCount?: (number|null);

        /** RecordListReq cursor */
        cursor?: (number|null);
    }

    /** Represents a RecordListReq. */
    class RecordListReq implements IRecordListReq {

        /**
         * Constructs a new RecordListReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_game_record.IRecordListReq);

        /** RecordListReq pageageNum. */
        public pageageNum: number;

        /** RecordListReq pageageCount. */
        public pageageCount: number;

        /** RecordListReq cursor. */
        public cursor: number;

        /**
         * Creates a new RecordListReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RecordListReq instance
         */
        public static create(properties?: hallserver_game_record.IRecordListReq): hallserver_game_record.RecordListReq;

        /**
         * Encodes the specified RecordListReq message. Does not implicitly {@link hallserver_game_record.RecordListReq.verify|verify} messages.
         * @param message RecordListReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_game_record.IRecordListReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RecordListReq message, length delimited. Does not implicitly {@link hallserver_game_record.RecordListReq.verify|verify} messages.
         * @param message RecordListReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_game_record.IRecordListReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RecordListReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RecordListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_game_record.RecordListReq;

        /**
         * Decodes a RecordListReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RecordListReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_game_record.RecordListReq;

        /**
         * Verifies a RecordListReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RecordListReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RecordListReq
         */
        public static fromObject(object: { [k: string]: any }): hallserver_game_record.RecordListReq;

        /**
         * Creates a plain object from a RecordListReq message. Also converts values to other types if specified.
         * @param message RecordListReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_game_record.RecordListReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RecordListReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RecordListReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a RecordListRes. */
    interface IRecordListRes {

        /** RecordListRes pageageNum */
        pageageNum?: (number|null);

        /** RecordListRes pageageCount */
        pageageCount?: (number|null);

        /** RecordListRes totalCount */
        totalCount?: (number|null);

        /** RecordListRes recordList */
        recordList?: (hallserver_game_record.IOneRecord[]|null);

        /** RecordListRes nextCursor */
        nextCursor?: (number|null);
    }

    /** Represents a RecordListRes. */
    class RecordListRes implements IRecordListRes {

        /**
         * Constructs a new RecordListRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_game_record.IRecordListRes);

        /** RecordListRes pageageNum. */
        public pageageNum: number;

        /** RecordListRes pageageCount. */
        public pageageCount: number;

        /** RecordListRes totalCount. */
        public totalCount: number;

        /** RecordListRes recordList. */
        public recordList: hallserver_game_record.IOneRecord[];

        /** RecordListRes nextCursor. */
        public nextCursor: number;

        /**
         * Creates a new RecordListRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RecordListRes instance
         */
        public static create(properties?: hallserver_game_record.IRecordListRes): hallserver_game_record.RecordListRes;

        /**
         * Encodes the specified RecordListRes message. Does not implicitly {@link hallserver_game_record.RecordListRes.verify|verify} messages.
         * @param message RecordListRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_game_record.IRecordListRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RecordListRes message, length delimited. Does not implicitly {@link hallserver_game_record.RecordListRes.verify|verify} messages.
         * @param message RecordListRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_game_record.IRecordListRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RecordListRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RecordListRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_game_record.RecordListRes;

        /**
         * Decodes a RecordListRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RecordListRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_game_record.RecordListRes;

        /**
         * Verifies a RecordListRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RecordListRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RecordListRes
         */
        public static fromObject(object: { [k: string]: any }): hallserver_game_record.RecordListRes;

        /**
         * Creates a plain object from a RecordListRes message. Also converts values to other types if specified.
         * @param message RecordListRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_game_record.RecordListRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RecordListRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RecordListRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}

/** Namespace hallserver_email. */
export namespace hallserver_email {

    /** main enum. */
    enum main {
        hallserver_email = 106
    }

    /** sub enum. */
    enum sub {
        ReadEmailReq = 1,
        ReadEmailRes = 2,
        ItemListEmailReq = 3,
        ItemListEmailRes = 4,
        DelEmailReq = 5,
        DelEmailRes = 6,
        AllEmailNotice = 80,
        OneEmailNotice = 81,
        DelEmailNotice = 82
    }

    /** Properties of a ReadEmailReq. */
    interface IReadEmailReq {

        /** ReadEmailReq guidList */
        guidList?: ((number|Long)[]|null);
    }

    /** Represents a ReadEmailReq. */
    class ReadEmailReq implements IReadEmailReq {

        /**
         * Constructs a new ReadEmailReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_email.IReadEmailReq);

        /** ReadEmailReq guidList. */
        public guidList: (number|Long)[];

        /**
         * Creates a new ReadEmailReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReadEmailReq instance
         */
        public static create(properties?: hallserver_email.IReadEmailReq): hallserver_email.ReadEmailReq;

        /**
         * Encodes the specified ReadEmailReq message. Does not implicitly {@link hallserver_email.ReadEmailReq.verify|verify} messages.
         * @param message ReadEmailReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_email.IReadEmailReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReadEmailReq message, length delimited. Does not implicitly {@link hallserver_email.ReadEmailReq.verify|verify} messages.
         * @param message ReadEmailReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_email.IReadEmailReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReadEmailReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReadEmailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_email.ReadEmailReq;

        /**
         * Decodes a ReadEmailReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReadEmailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_email.ReadEmailReq;

        /**
         * Verifies a ReadEmailReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReadEmailReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReadEmailReq
         */
        public static fromObject(object: { [k: string]: any }): hallserver_email.ReadEmailReq;

        /**
         * Creates a plain object from a ReadEmailReq message. Also converts values to other types if specified.
         * @param message ReadEmailReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_email.ReadEmailReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReadEmailReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReadEmailReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ReadEmailRes. */
    interface IReadEmailRes {

        /** ReadEmailRes guidList */
        guidList?: ((number|Long)[]|null);
    }

    /** Represents a ReadEmailRes. */
    class ReadEmailRes implements IReadEmailRes {

        /**
         * Constructs a new ReadEmailRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_email.IReadEmailRes);

        /** ReadEmailRes guidList. */
        public guidList: (number|Long)[];

        /**
         * Creates a new ReadEmailRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReadEmailRes instance
         */
        public static create(properties?: hallserver_email.IReadEmailRes): hallserver_email.ReadEmailRes;

        /**
         * Encodes the specified ReadEmailRes message. Does not implicitly {@link hallserver_email.ReadEmailRes.verify|verify} messages.
         * @param message ReadEmailRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_email.IReadEmailRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReadEmailRes message, length delimited. Does not implicitly {@link hallserver_email.ReadEmailRes.verify|verify} messages.
         * @param message ReadEmailRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_email.IReadEmailRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReadEmailRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReadEmailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_email.ReadEmailRes;

        /**
         * Decodes a ReadEmailRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReadEmailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_email.ReadEmailRes;

        /**
         * Verifies a ReadEmailRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReadEmailRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReadEmailRes
         */
        public static fromObject(object: { [k: string]: any }): hallserver_email.ReadEmailRes;

        /**
         * Creates a plain object from a ReadEmailRes message. Also converts values to other types if specified.
         * @param message ReadEmailRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_email.ReadEmailRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReadEmailRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReadEmailRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an ItemListEmailReq. */
    interface IItemListEmailReq {

        /** ItemListEmailReq guidList */
        guidList?: ((number|Long)[]|null);
    }

    /** Represents an ItemListEmailReq. */
    class ItemListEmailReq implements IItemListEmailReq {

        /**
         * Constructs a new ItemListEmailReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_email.IItemListEmailReq);

        /** ItemListEmailReq guidList. */
        public guidList: (number|Long)[];

        /**
         * Creates a new ItemListEmailReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemListEmailReq instance
         */
        public static create(properties?: hallserver_email.IItemListEmailReq): hallserver_email.ItemListEmailReq;

        /**
         * Encodes the specified ItemListEmailReq message. Does not implicitly {@link hallserver_email.ItemListEmailReq.verify|verify} messages.
         * @param message ItemListEmailReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_email.IItemListEmailReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ItemListEmailReq message, length delimited. Does not implicitly {@link hallserver_email.ItemListEmailReq.verify|verify} messages.
         * @param message ItemListEmailReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_email.IItemListEmailReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ItemListEmailReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemListEmailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_email.ItemListEmailReq;

        /**
         * Decodes an ItemListEmailReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemListEmailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_email.ItemListEmailReq;

        /**
         * Verifies an ItemListEmailReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemListEmailReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemListEmailReq
         */
        public static fromObject(object: { [k: string]: any }): hallserver_email.ItemListEmailReq;

        /**
         * Creates a plain object from an ItemListEmailReq message. Also converts values to other types if specified.
         * @param message ItemListEmailReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_email.ItemListEmailReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemListEmailReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ItemListEmailReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an ItemListEmailRes. */
    interface IItemListEmailRes {

        /** ItemListEmailRes guidList */
        guidList?: ((number|Long)[]|null);
    }

    /** Represents an ItemListEmailRes. */
    class ItemListEmailRes implements IItemListEmailRes {

        /**
         * Constructs a new ItemListEmailRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_email.IItemListEmailRes);

        /** ItemListEmailRes guidList. */
        public guidList: (number|Long)[];

        /**
         * Creates a new ItemListEmailRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemListEmailRes instance
         */
        public static create(properties?: hallserver_email.IItemListEmailRes): hallserver_email.ItemListEmailRes;

        /**
         * Encodes the specified ItemListEmailRes message. Does not implicitly {@link hallserver_email.ItemListEmailRes.verify|verify} messages.
         * @param message ItemListEmailRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_email.IItemListEmailRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ItemListEmailRes message, length delimited. Does not implicitly {@link hallserver_email.ItemListEmailRes.verify|verify} messages.
         * @param message ItemListEmailRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_email.IItemListEmailRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ItemListEmailRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemListEmailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_email.ItemListEmailRes;

        /**
         * Decodes an ItemListEmailRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemListEmailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_email.ItemListEmailRes;

        /**
         * Verifies an ItemListEmailRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemListEmailRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemListEmailRes
         */
        public static fromObject(object: { [k: string]: any }): hallserver_email.ItemListEmailRes;

        /**
         * Creates a plain object from an ItemListEmailRes message. Also converts values to other types if specified.
         * @param message ItemListEmailRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_email.ItemListEmailRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemListEmailRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ItemListEmailRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DelEmailReq. */
    interface IDelEmailReq {

        /** DelEmailReq guidList */
        guidList?: ((number|Long)[]|null);
    }

    /** Represents a DelEmailReq. */
    class DelEmailReq implements IDelEmailReq {

        /**
         * Constructs a new DelEmailReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_email.IDelEmailReq);

        /** DelEmailReq guidList. */
        public guidList: (number|Long)[];

        /**
         * Creates a new DelEmailReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelEmailReq instance
         */
        public static create(properties?: hallserver_email.IDelEmailReq): hallserver_email.DelEmailReq;

        /**
         * Encodes the specified DelEmailReq message. Does not implicitly {@link hallserver_email.DelEmailReq.verify|verify} messages.
         * @param message DelEmailReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_email.IDelEmailReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelEmailReq message, length delimited. Does not implicitly {@link hallserver_email.DelEmailReq.verify|verify} messages.
         * @param message DelEmailReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_email.IDelEmailReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelEmailReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelEmailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_email.DelEmailReq;

        /**
         * Decodes a DelEmailReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelEmailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_email.DelEmailReq;

        /**
         * Verifies a DelEmailReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelEmailReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelEmailReq
         */
        public static fromObject(object: { [k: string]: any }): hallserver_email.DelEmailReq;

        /**
         * Creates a plain object from a DelEmailReq message. Also converts values to other types if specified.
         * @param message DelEmailReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_email.DelEmailReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelEmailReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DelEmailReq
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DelEmailRes. */
    interface IDelEmailRes {

        /** DelEmailRes guidList */
        guidList?: ((number|Long)[]|null);
    }

    /** Represents a DelEmailRes. */
    class DelEmailRes implements IDelEmailRes {

        /**
         * Constructs a new DelEmailRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_email.IDelEmailRes);

        /** DelEmailRes guidList. */
        public guidList: (number|Long)[];

        /**
         * Creates a new DelEmailRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelEmailRes instance
         */
        public static create(properties?: hallserver_email.IDelEmailRes): hallserver_email.DelEmailRes;

        /**
         * Encodes the specified DelEmailRes message. Does not implicitly {@link hallserver_email.DelEmailRes.verify|verify} messages.
         * @param message DelEmailRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_email.IDelEmailRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelEmailRes message, length delimited. Does not implicitly {@link hallserver_email.DelEmailRes.verify|verify} messages.
         * @param message DelEmailRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_email.IDelEmailRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelEmailRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelEmailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_email.DelEmailRes;

        /**
         * Decodes a DelEmailRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelEmailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_email.DelEmailRes;

        /**
         * Verifies a DelEmailRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelEmailRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelEmailRes
         */
        public static fromObject(object: { [k: string]: any }): hallserver_email.DelEmailRes;

        /**
         * Creates a plain object from a DelEmailRes message. Also converts values to other types if specified.
         * @param message DelEmailRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_email.DelEmailRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelEmailRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DelEmailRes
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an oneEmail. */
    interface IoneEmail {

        /** oneEmail guid */
        guid?: (number|Long|null);

        /** oneEmail emailType */
        emailType?: (number|null);

        /** oneEmail fromId */
        fromId?: (number|Long|null);

        /** oneEmail title */
        title?: (string|null);

        /** oneEmail content */
        content?: (string|null);

        /** oneEmail createTime */
        createTime?: (number|Long|null);

        /** oneEmail vaildTime */
        vaildTime?: (number|Long|null);

        /** oneEmail itemList */
        itemList?: (common.IItem[]|null);

        /** oneEmail readFlag */
        readFlag?: (number|null);

        /** oneEmail itemFlag */
        itemFlag?: (number|null);
    }

    /** Represents an oneEmail. */
    class oneEmail implements IoneEmail {

        /**
         * Constructs a new oneEmail.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_email.IoneEmail);

        /** oneEmail guid. */
        public guid: (number|Long);

        /** oneEmail emailType. */
        public emailType: number;

        /** oneEmail fromId. */
        public fromId: (number|Long);

        /** oneEmail title. */
        public title: string;

        /** oneEmail content. */
        public content: string;

        /** oneEmail createTime. */
        public createTime: (number|Long);

        /** oneEmail vaildTime. */
        public vaildTime: (number|Long);

        /** oneEmail itemList. */
        public itemList: common.IItem[];

        /** oneEmail readFlag. */
        public readFlag: number;

        /** oneEmail itemFlag. */
        public itemFlag: number;

        /**
         * Creates a new oneEmail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns oneEmail instance
         */
        public static create(properties?: hallserver_email.IoneEmail): hallserver_email.oneEmail;

        /**
         * Encodes the specified oneEmail message. Does not implicitly {@link hallserver_email.oneEmail.verify|verify} messages.
         * @param message oneEmail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_email.IoneEmail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified oneEmail message, length delimited. Does not implicitly {@link hallserver_email.oneEmail.verify|verify} messages.
         * @param message oneEmail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_email.IoneEmail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an oneEmail message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns oneEmail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_email.oneEmail;

        /**
         * Decodes an oneEmail message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns oneEmail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_email.oneEmail;

        /**
         * Verifies an oneEmail message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an oneEmail message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns oneEmail
         */
        public static fromObject(object: { [k: string]: any }): hallserver_email.oneEmail;

        /**
         * Creates a plain object from an oneEmail message. Also converts values to other types if specified.
         * @param message oneEmail
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_email.oneEmail, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this oneEmail to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for oneEmail
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an AllEmailNotice. */
    interface IAllEmailNotice {

        /** AllEmailNotice emailList */
        emailList?: (hallserver_email.IoneEmail[]|null);
    }

    /** Represents an AllEmailNotice. */
    class AllEmailNotice implements IAllEmailNotice {

        /**
         * Constructs a new AllEmailNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_email.IAllEmailNotice);

        /** AllEmailNotice emailList. */
        public emailList: hallserver_email.IoneEmail[];

        /**
         * Creates a new AllEmailNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AllEmailNotice instance
         */
        public static create(properties?: hallserver_email.IAllEmailNotice): hallserver_email.AllEmailNotice;

        /**
         * Encodes the specified AllEmailNotice message. Does not implicitly {@link hallserver_email.AllEmailNotice.verify|verify} messages.
         * @param message AllEmailNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_email.IAllEmailNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AllEmailNotice message, length delimited. Does not implicitly {@link hallserver_email.AllEmailNotice.verify|verify} messages.
         * @param message AllEmailNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_email.IAllEmailNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AllEmailNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AllEmailNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_email.AllEmailNotice;

        /**
         * Decodes an AllEmailNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AllEmailNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_email.AllEmailNotice;

        /**
         * Verifies an AllEmailNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AllEmailNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AllEmailNotice
         */
        public static fromObject(object: { [k: string]: any }): hallserver_email.AllEmailNotice;

        /**
         * Creates a plain object from an AllEmailNotice message. Also converts values to other types if specified.
         * @param message AllEmailNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_email.AllEmailNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AllEmailNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AllEmailNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an OneEmailNotice. */
    interface IOneEmailNotice {

        /** OneEmailNotice email */
        email?: (hallserver_email.IoneEmail|null);
    }

    /** Represents an OneEmailNotice. */
    class OneEmailNotice implements IOneEmailNotice {

        /**
         * Constructs a new OneEmailNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_email.IOneEmailNotice);

        /** OneEmailNotice email. */
        public email?: (hallserver_email.IoneEmail|null);

        /**
         * Creates a new OneEmailNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OneEmailNotice instance
         */
        public static create(properties?: hallserver_email.IOneEmailNotice): hallserver_email.OneEmailNotice;

        /**
         * Encodes the specified OneEmailNotice message. Does not implicitly {@link hallserver_email.OneEmailNotice.verify|verify} messages.
         * @param message OneEmailNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_email.IOneEmailNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OneEmailNotice message, length delimited. Does not implicitly {@link hallserver_email.OneEmailNotice.verify|verify} messages.
         * @param message OneEmailNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_email.IOneEmailNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OneEmailNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OneEmailNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_email.OneEmailNotice;

        /**
         * Decodes an OneEmailNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OneEmailNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_email.OneEmailNotice;

        /**
         * Verifies an OneEmailNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OneEmailNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OneEmailNotice
         */
        public static fromObject(object: { [k: string]: any }): hallserver_email.OneEmailNotice;

        /**
         * Creates a plain object from an OneEmailNotice message. Also converts values to other types if specified.
         * @param message OneEmailNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_email.OneEmailNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OneEmailNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for OneEmailNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DelEmailNotice. */
    interface IDelEmailNotice {

        /** DelEmailNotice guidList */
        guidList?: ((number|Long)[]|null);
    }

    /** Represents a DelEmailNotice. */
    class DelEmailNotice implements IDelEmailNotice {

        /**
         * Constructs a new DelEmailNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: hallserver_email.IDelEmailNotice);

        /** DelEmailNotice guidList. */
        public guidList: (number|Long)[];

        /**
         * Creates a new DelEmailNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelEmailNotice instance
         */
        public static create(properties?: hallserver_email.IDelEmailNotice): hallserver_email.DelEmailNotice;

        /**
         * Encodes the specified DelEmailNotice message. Does not implicitly {@link hallserver_email.DelEmailNotice.verify|verify} messages.
         * @param message DelEmailNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hallserver_email.IDelEmailNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelEmailNotice message, length delimited. Does not implicitly {@link hallserver_email.DelEmailNotice.verify|verify} messages.
         * @param message DelEmailNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hallserver_email.IDelEmailNotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelEmailNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelEmailNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hallserver_email.DelEmailNotice;

        /**
         * Decodes a DelEmailNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelEmailNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hallserver_email.DelEmailNotice;

        /**
         * Verifies a DelEmailNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelEmailNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelEmailNotice
         */
        public static fromObject(object: { [k: string]: any }): hallserver_email.DelEmailNotice;

        /**
         * Creates a plain object from a DelEmailNotice message. Also converts values to other types if specified.
         * @param message DelEmailNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hallserver_email.DelEmailNotice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelEmailNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DelEmailNotice
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
