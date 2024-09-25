import mixpanel from 'mixpanel-browser';

/**
 * A player attributes
 */
export type Player = {
    /**
     * Calling selection of the player
     */
    callingType?: CallingType;
    /**
     * Hit points of the player
     */
    hitPoints?: number;
    /**
     * Name of the player
     */
    name?: string;
}

/**
 * Calling selection of the player
 */
export type CallingType = "warrior" | "monk" | "wizard" | "druid";

export const trackPlayer = (player: Player) => {
    Object.keys(player).forEach(attribute => {
        if(["name"].includes(attribute)){
            player[attribute] = "***";
        }
    });
    mixpanel.track("Player", player)
}

