import Player from "../Player";

declare global {
    interface Window {
        player: Player;
        developmentInformationsEnabled: boolean;
        ticksPerSecond: number;
    }
}
