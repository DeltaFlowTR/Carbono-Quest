import Canvas from '../../renderer/Canvas';
import  {Frame } from '../../renderer/Renderer';
import GameItem from '../GameItem';
import GameObject from '../GameObject';


class items extends GameObject {
    private static readonly VERTICAL_item_one_FRAME: Frame = {
		firstPosition: { x: 0, y: 0 },
		secondPosition: { x: 64, y: 64  },
	};

    private static readonly VERTICAL_item_two_FRAME: Frame = {
		firstPosition: { x:64 , y: 0 },
		secondPosition: { x: 128, y: 64 },
	};

    private static readonly VERTICAL_item_three_FRAME: Frame = {
		firstPosition: { x:128 , y: 0 },
		secondPosition: { x: 192, y: 64 },
	};
    private static readonly VERTICAL_item_four_FRAME: Frame = {
		firstPosition: { x: 192, y: 0 },
		secondPosition: { x: 64, y: 64  },
	};

    private static readonly VERTICAL_item_five_FRAME: Frame = {
		firstPosition: { x:256 , y: 0 },
		secondPosition: { x: 320, y: 64 },
	};

    private static readonly VERTICAL_item_six_FRAME: Frame = {
		firstPosition: { x:320, y: 0 },
		secondPosition: { x: 384, y: 64 },
	};
    
    private static readonly VERTICAL_item_seven_FRAME: Frame = {
		firstPosition: { x:384 , y: 0 },
		secondPosition: { x: 448, y: 64 },
	};
    private static readonly VERTICAL_item_eight_FRAME: Frame = {
		firstPosition: { x: 448, y: 0 },
		secondPosition: { x: 512, y: 64  },
	};

    private static readonly VERTICAL_item_nine_FRAME: Frame = {
		firstPosition: { x:512 , y: 0 },
		secondPosition: { x: 576, y: 64 },
	};

    private static readonly VERTICAL_item_ten_FRAME: Frame = {
		firstPosition: { x:576, y: 0 },
		secondPosition: { x: 640, y: 64 },
} 
//parte 2
private static readonly VERTICAL_item_eleven_FRAME: Frame = {
    firstPosition: { x: 0, y: 64 },
    secondPosition: { x: 64, y: 128  },

}

private static readonly VERTICAL_item_twelve_FRAME: Frame = {
    firstPosition: { x: 64, y: 64 },
    secondPosition: { x: 128 , y: 128  },

}
private static readonly VERTICAL_item_thirteen_FRAME: Frame = {
    firstPosition: { x: 128, y: 64 },
    secondPosition: { x: 192, y: 128  },

}

private static readonly VERTICAL_item_fourteen_FRAME: Frame = {
    firstPosition: { x: 192, y: 64 },
    secondPosition: { x: 256, y: 128  },
}

    private static readonly VERTICAL_item_fifteen_FRAME: Frame = {
        firstPosition: { x: 256, y: 64 },
        secondPosition: { x: 320, y: 128  },
    
    }
    
    private static readonly VERTICAL_item_sixteen_FRAME: Frame = {
        firstPosition: { x: 320, y: 64 },
        secondPosition: { x: 384 , y: 128  },
    
    }
    private static readonly VERTICAL_item_seventeen_FRAME: Frame = {
        firstPosition: { x:384 , y: 64 },
        secondPosition: { x: 448, y: 128  },
    
    }
    
    private static readonly VERTICAL_item_eighteen_FRAME: Frame = {
        firstPosition: { x: 448 , y: 64 },
        secondPosition: { x: 512, y: 128  },
    }  
   
    private static readonly VERTICAL_item_nineteen_FRAME: Frame = {
        firstPosition: { x: 512, y: 64 },
        secondPosition: { x: 576 , y: 128  },
    
    }
    private static readonly VERTICAL_item_twenty_FRAME: Frame = {
        firstPosition: { x:576 , y: 64 },
        secondPosition: { x: 640, y: 128  },
    }

constructor (x: number, y: number, scale: number){
    super({
        x: x,
        y: y,
        width: 64,
        height: 64,
        scale: scale,
        objectSprite: Canvas.createSprite('img/items .png'),
        objectIdentifier: 'Items',
    });
 

}
}
