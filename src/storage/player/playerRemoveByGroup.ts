import AsyncStorage from "@react-native-async-storage/async-storage";

import {PLAYER_COLLECTION} from "@storage/storage.config";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(PlayerName: string, group: string) {
    try {
        const storage = await playersGetByGroup(group);
        
        const playersFiltered = storage.filter(player => player.name !== PlayerName);

        const players = JSON.stringify(playersFiltered);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);


    } catch (error) {
        throw error;
    }

}