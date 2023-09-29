import Canvas from '../renderer/Canvas';
import { Frame } from '../renderer/Renderer';
import GameObject, { GameObjectProperties } from './GameObject';

class GameItem extends GameObject {
	private static readonly ITEM_ONE_FRAME: Frame = {
		firstPosition: { x: 0, y: 0 },
		secondPosition: { x: 64, y: 64 },
	};

	private static readonly ITEM_TWO_FRAME: Frame = {
		firstPosition: { x: 64, y: 0 },
		secondPosition: { x: 128, y: 64 },
	};

	private static readonly ITEM_THREE_FRAME: Frame = {
		firstPosition: { x: 128, y: 0 },
		secondPosition: { x: 192, y: 64 },
	};
	private static readonly ITEM_FOUR_FRAME: Frame = {
		firstPosition: { x: 192, y: 0 },
		secondPosition: { x: 256, y: 64 },
	};

	private static readonly ITEM_FIVE_FRAME: Frame = {
		firstPosition: { x: 256, y: 0 },
		secondPosition: { x: 320, y: 64 },
	};

	private static readonly ITEM_SIX_FRAME: Frame = {
		firstPosition: { x: 320, y: 0 },
		secondPosition: { x: 384, y: 64 },
	};

	private static readonly ITEM_SEVEN_FRAME: Frame = {
		firstPosition: { x: 384, y: 0 },
		secondPosition: { x: 448, y: 64 },
	};
	private static readonly ITEM_EIGHT_FRAME: Frame = {
		firstPosition: { x: 448, y: 0 },
		secondPosition: { x: 512, y: 64 },
	};

	private static readonly ITEM_NINE_FRAME: Frame = {
		firstPosition: { x: 512, y: 0 },
		secondPosition: { x: 576, y: 64 },
	};

	private static readonly ITEM_TEN_FRAME: Frame = {
		firstPosition: { x: 576, y: 0 },
		secondPosition: { x: 640, y: 64 },
	};
	
	private static readonly ITEM_ELEVEN_FRAME: Frame = {
		firstPosition: { x: 0, y: 64 },
		secondPosition: { x: 64, y: 128 },
	};

	private static readonly ITEM_TWELVE_FRAME: Frame = {
		firstPosition: { x: 64, y: 64 },
		secondPosition: { x: 128, y: 128 },
	};
	private static readonly ITEM_THIRTEEN_FRAME: Frame = {
		firstPosition: { x: 128, y: 64 },
		secondPosition: { x: 192, y: 128 },
	};

	private static readonly ITEM_FOURTEEN_FRAME: Frame = {
		firstPosition: { x: 192, y: 64 },
		secondPosition: { x: 256, y: 128 },
	};

	private static readonly ITEM_FIFTEEN_FRAME: Frame = {
		firstPosition: { x: 256, y: 64 },
		secondPosition: { x: 320, y: 128 },
	};

	private static readonly ITEM_SIXTEEN_FRAME: Frame = {
		firstPosition: { x: 320, y: 64 },
		secondPosition: { x: 384, y: 128 },
	};
	private static readonly ITEM_SEVENTEEN_FRAME: Frame = {
		firstPosition: { x: 384, y: 64 },
		secondPosition: { x: 448, y: 128 },
	};

	private static readonly ITEM_EIGHTEEN_FRAME: Frame = {
		firstPosition: { x: 448, y: 64 },
		secondPosition: { x: 512, y: 128 },
	};

	private static readonly ITEM_NINETEEN_FRAME: Frame = {
		firstPosition: { x: 512, y: 64 },
		secondPosition: { x: 576, y: 128 },
	};
	private static readonly ITEM_TWENTY_FRAME: Frame = {
		firstPosition: { x: 576, y: 64 },
		secondPosition: { x: 640, y: 128 },
	};

	private static readonly ITEM_NAMES = [
		"ITEM_1",
		"ITEM_2",
		"ITEM_3",
		"ITEM_4",
		"ITEM_5",
		"ITEM_6",
		"ITEM_7",
		"ITEM_8",
		"ITEM_9",
		"ITEM_10",
		"ITEM_11",
		"ITEM_12",
		"ITEM_13",
		"ITEM_14",
		"ITEM_15",
		"ITEM_16",
		"ITEM_17",
		"ITEM_18",
		"ITEM_19",
		"ITEM_20"
	]

	private static readonly ITEM_DESCRIPTIONS = [
		"DESCRIPTION_1",
		"DESCRIPTION_2",
		"DESCRIPTION_3",
		"DESCRIPTION_4",
		"DESCRIPTION_5",
		"DESCRIPTION_6",
		"DESCRIPTION_7",
		"DESCRIPTION_8",
		"DESCRIPTION_9",
		"DESCRIPTION_10",
		"DESCRIPTION_11",
		"DESCRIPTION_12",
		"DESCRIPTION_13",
		"DESCRIPTION_14",
		"DESCRIPTION_15",
		"DESCRIPTION_16",
		"DESCRIPTION_17",
		"DESCRIPTION_18",
		"DESCRIPTION_19",
		"DESCRIPTION_20",
	]

	private readonly good: boolean;
	private readonly name: string;
	private readonly description: string;

	constructor(x: number, y: number, scale: number, spriteIndex: number, good: boolean) {
		const availableSprites: Frame[] = [
			GameItem.ITEM_ONE_FRAME,
			GameItem.ITEM_TWO_FRAME,
			GameItem.ITEM_THREE_FRAME,
			GameItem.ITEM_FOUR_FRAME,
			GameItem.ITEM_FIVE_FRAME,
			GameItem.ITEM_SIX_FRAME,
			GameItem.ITEM_SEVEN_FRAME,
			GameItem.ITEM_EIGHT_FRAME,
			GameItem.ITEM_NINE_FRAME,
			GameItem.ITEM_TEN_FRAME,
			GameItem.ITEM_ELEVEN_FRAME,
			GameItem.ITEM_TWELVE_FRAME,
			GameItem.ITEM_THIRTEEN_FRAME,
			GameItem.ITEM_FOURTEEN_FRAME,
			GameItem.ITEM_FIFTEEN_FRAME,
			GameItem.ITEM_SIXTEEN_FRAME,
			GameItem.ITEM_SEVENTEEN_FRAME,
			GameItem.ITEM_EIGHTEEN_FRAME,
			GameItem.ITEM_NINETEEN_FRAME,
			GameItem.ITEM_TWENTY_FRAME,
		];

		super({
			x: x,
			y: y,
			scale: scale,
			width: 64,
			height: 64,
			objectSprite: Canvas.createSprite('img/Items.png'),
			objectIdentifier: 'ITEM_' + spriteIndex,
		});
		this.renderShadow = true;
		this.shadowScale = 0.5;
		this.spriteFrame = availableSprites[spriteIndex];

		this.good = good;
		this.name = GameItem.ITEM_NAMES[spriteIndex];
		this.description = GameItem.ITEM_DESCRIPTIONS[spriteIndex];
	}

	public isGood(): boolean {
		return this.good;
	}

	public getName() {
		return this.name;
	}

	public getDescription() {
		return this.description;
	}
}

export default GameItem;
