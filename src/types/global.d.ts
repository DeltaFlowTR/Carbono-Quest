import Player from "../Player";
import Renderer from "../renderer/Renderer";

declare global {
    interface Window {
        player: Player;
        debugInfoEnabled: boolean;
        renderer: Renderer;
    }
}
