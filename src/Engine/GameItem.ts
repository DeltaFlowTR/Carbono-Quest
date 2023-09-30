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
		"Etanol",
		"Boa alimentação",
		"Não as Queimada",
		"Aerogerador",
		"Veículos Não Motorizados",
		"Sacola de Papel ",
		"Mudinha",
		"Lâmpada LED",
		"Reciclagem",
		"Painéis Solares",
		"sacolas plásticas",
		"Gasolina",
		"má alimentação",
		"Queimada",
		"Gerador a Gasolina",
		"Não Reciclagem",
		"Veículos Motorizados",
		"Machado (representa o desmatamento)",
		"Lâmpada Incandescente",
		"Pilha,Bateria"
	]

	private static readonly ITEM_DESCRIPTIONS = [
		"Uma alternativa mais ecológica feita a partir de fontes renováveis, como milho ou cana-de-açúcar. É uma escolha mais sustentável que ajuda a reduzir as emissões de gases de efeito estufa.",
		"Alimentos frescos e saudáveis que requerem menos energia para serem produzidos, ajudando a reduzir as emissões de carbono.",
		"Não as queimadas ajudam a preservar o equilíbrio ecológico e a reter carbono, reduzindo a pegada de carbono",
		"Veículos não motorizados, como bicicletas elétricas, e veículos elétricos ou veículos que usam fontes renováveis, como o etanol, são exemplos de opções sustentáveis que contribuem para a redução da pegada de carbono.",
		"A sacola de papel é mais eficiente em termos de pegada de carbono, pois é reciclável e biodegradável.",
		"Uma pequena muda de árvore que ajuda a combater o desmatamento, contribuindo para a captura de carbono.",
		"Eficiente em termos de energia e de longa duração, economizando eletricidade e reduzindo a pegada de carbono.",
		"Contribui para a redução de resíduos e a conservação de recursos naturais, diminuindo a pegada de carbono",
		"Fonte de energia limpa e renovável que reduz a dependência de combustíveis fósseis, diminuindo a pegada de carbono.",
		"Feita de plástico, essa sacola polui o ambiente por muito tempo, tornando-a uma opção de pegada de carbono alta.",
		"Combustível fóssil altamente poluente que contribui para uma pegada de carbono significativamente maior.",
		"Alimentos processados que possuem uma pegada de carbono significativamente maior devido à produção de carne e processamento.",
		"Representa a destruição de habitats naturais e a liberação de carbono, aumentando a pegada de carbono.",
		"Poluente e ineficiente, o gerador a gasolina aumenta a pegada de carbono quando usado em vez de fontes de energia mais limpas.",
		"Descartar produtos sem considerar a reciclagem contribui para a acumulação de lixo e o esgotamento de recursos, aumentando a pegada de carbono.",
		"Veículos como motos e carros que só usam gasolina  são rápidos, mas queimam combustível fóssil, ampliando nossa pegada de carbono. Use com moderação e considere opções mais verdes!",
		"O machado representa a destruição das florestas, que libera grandes quantidades de carbono na atmosfera.",
		"Desperdiça energia na forma de calor, tornando-a ineficiente e com uma pegada de carbono mais alta.",
		"Tanto pilhas quanto baterias têm uma pegada de carbono menos eficiente devido à sua produção e descarte, em comparação com fontes de energia recarregáveis. Use com moderação e opte por alternativas mais sustentáveis.",
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
