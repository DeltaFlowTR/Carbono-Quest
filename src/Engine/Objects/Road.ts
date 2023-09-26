import Canvas from '../../renderer/Canvas';
import { Frame } from '../../renderer/Renderer';
import GameObject from '../GameObject';

type RoadDirection =
	| 'VERTICAL'
	| 'HORIZONTAL'
	| 'TOP_LEFT'
	| 'TOP_RIGHT'
	| 'BOTTOM_LEFT'
	| 'BOTTOM_RIGHT'
	| 'THREE_WAY_LEFT'
	| 'THREE_WAY_RIGHT'
	| 'THREE_WAY_TOP'
	| 'THREE_WAY_BOTTOM';

class Road extends GameObject {
	private static readonly VERTICAL_ROAD_FRAME: Frame = {
		firstPosition: { x: 65, y: 130 },
		secondPosition: { x: 129, y: 194 },
	};

	private static readonly HORIZONTAL_ROAD_FRAME: Frame = {
		firstPosition: { x: 0, y: 130 },
		secondPosition: { x: 64, y: 194 },
	};

	private static readonly TOP_LEFT_ROAD_FRAME: Frame = {
		firstPosition: { x: 195, y: 0 },
		secondPosition: { x: 259, y: 64 },
	};

	private static readonly TOP_RIGHT_ROAD_FRAME: Frame = {
		firstPosition: { x: 130, y: 0 },
		secondPosition: { x: 194, y: 64 },
	};

	private static readonly BOTTOM_LEFT_ROAD_FRAME: Frame = {
		firstPosition: { x: 0, y: 0 },
		secondPosition: { x: 64, y: 64 },
	};

	private static readonly BOTTOM_RIGHT_ROAD_FRAME: Frame = {
		firstPosition: { x: 65, y: 0 },
		secondPosition: { x: 129, y: 64 },
	};

	private static readonly THREE_WAY_LEFT_ROAD_FRAME: Frame = {
		firstPosition: { x: 65, y: 65 },
		secondPosition: { x: 129, y: 129 },
	};

	private static readonly THREE_WAY_RIGHT_ROAD_FRAME: Frame = {
		firstPosition: { x: 0, y: 65 },
		secondPosition: { x: 64, y: 129 },
	};

	private static readonly THREE_WAY_TOP_ROAD_FRAME: Frame = {
		firstPosition: { x: 130, y: 65 },
		secondPosition: { x: 194, y: 129 },
	};

	private static readonly THREE_WAY_BOTTOM_ROAD_FRAME: Frame = {
		firstPosition: { x: 195, y: 65 },
		secondPosition: { x: 259, y: 129 },
	};

	constructor(x: number, y: number, scale: number, size: number, direction: RoadDirection) {
		super({
			x: x,
			y: y,
			scale: scale,
			width: size,
			height: size,
			objectIdentifier: 'ROAD',
			objectSprite: Canvas.createSprite('img/Buildings/road.png'),
		});

		switch (direction) {
			case 'VERTICAL':
				this.spriteFrame = Road.VERTICAL_ROAD_FRAME;
				break;
			case 'HORIZONTAL':
				this.spriteFrame = Road.HORIZONTAL_ROAD_FRAME;
				break;
			case 'TOP_LEFT':
				this.spriteFrame = Road.TOP_LEFT_ROAD_FRAME;
				break;
			case 'TOP_RIGHT':
				this.spriteFrame = Road.TOP_RIGHT_ROAD_FRAME;
				break;
			case 'BOTTOM_LEFT':
				this.spriteFrame = Road.BOTTOM_LEFT_ROAD_FRAME;
				break;
			case 'BOTTOM_RIGHT':
				this.spriteFrame = Road.BOTTOM_RIGHT_ROAD_FRAME;
				break;
			case 'THREE_WAY_LEFT':
				this.spriteFrame = Road.THREE_WAY_LEFT_ROAD_FRAME;
				break;
			case 'THREE_WAY_RIGHT':
				this.spriteFrame = Road.THREE_WAY_RIGHT_ROAD_FRAME;
				break;
			case 'THREE_WAY_TOP':
				this.spriteFrame = Road.THREE_WAY_TOP_ROAD_FRAME;
				break;
			case 'THREE_WAY_BOTTOM':
				this.spriteFrame = Road.THREE_WAY_BOTTOM_ROAD_FRAME;
				break;
		}
	}
}

export default Road;
export { RoadDirection };
