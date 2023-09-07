import GameObject, { GameObjectProperties } from './GameObject';

class GameItem extends GameObject {
	constructor(properties: GameObjectProperties) {
		super(properties);
		this.renderShadow = true;
	}
}

export default GameItem;
