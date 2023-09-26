import Canvas from '../../renderer/Canvas';
import { Frame } from '../../renderer/Renderer';
import GameObject from '../GameObject';

class Building extends GameObject {
	private static readonly BUILDING_ONE: Frame = {
		firstPosition: { x: 0, y: 0 },
		secondPosition: { x: 64, y: 64 },
	};

	private static readonly BUILDING_TWO: Frame = {
		firstPosition: { x: 65, y: 0 },
		secondPosition: { x: 129, y: 64 },
	};

	private static readonly BUILDING_THREE: Frame = {
		firstPosition: { x: 130, y: 0 },
		secondPosition: { x: 194, y: 64 },
	};

	private static readonly BUILDING_FOUR: Frame = {
		firstPosition: { x: 0, y: 65 },
		secondPosition: { x: 64, y: 129 },
	};

	private static readonly BUILDING_FIVE: Frame = {
		firstPosition: { x: 65, y: 65 },
		secondPosition: { x: 129, y: 129 },
	};

	private static readonly BUILDING_SIX: Frame = {
		firstPosition: { x: 130, y: 65 },
		secondPosition: { x: 194, y: 129 },
	};

	private static readonly BUILDING_SEVEN: Frame = {
		firstPosition: { x: 0, y: 130 },
		secondPosition: { x: 64, y: 194 },
	};

	private static readonly BUILDING_EIGHT: Frame = {
		firstPosition: { x: 65, y: 130 },
		secondPosition: { x: 129, y: 194 },
	};

	private static readonly BUILDING_NINE: Frame = {
		firstPosition: { x: 130, y: 130 },
		secondPosition: { x: 194, y: 194 },
	};

	constructor(x: number, y: number, scale: number) {
		super({
			x: x,
			y: y,
			width: 64,
			height: 64,
			scale: scale,
			objectSprite: Canvas.createSprite('img/Buildings/Buildings.png'),
			objectIdentifier: 'BUILDING',
		});

		this.renderShadow = false;

		let frames = [
			Building.BUILDING_ONE,
			Building.BUILDING_TWO,
			Building.BUILDING_THREE,
			Building.BUILDING_FOUR,
			Building.BUILDING_FIVE,
			Building.BUILDING_SIX,
			Building.BUILDING_SEVEN,
			Building.BUILDING_EIGHT,
			Building.BUILDING_NINE,
		];

		this.spriteFrame = frames[Math.floor(Math.random() * frames.length)];
	}
}

export default Building;
