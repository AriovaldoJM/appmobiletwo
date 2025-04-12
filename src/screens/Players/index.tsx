import { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { playerAddByGroup } from "@storage/player/playerByAddGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";;

import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Header } from "@components/Hearder";
import { ButtonIcon } from "@components/ButtonIcon";
import { Button } from "@components/Button";
import { HighLight } from "@components/HighLight";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpyt";
import { AppError } from "@/src/utils/AppError";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { playerRemoveByGroup } from "@/src/storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@/src/storage/group/groupRemoveByName";

type RouteParams = {
    group: string;
}

export function Players() {
    const [newPlayerName, setNewPlayerName] = useState('');   
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const navigation = useNavigation();

    const route = useRoute();
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null);

    async function handleAddPlayer() {
        if(newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar'); 
        }
        const newPlayer = {
            name: newPlayerName,
            team
        }
        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur();

            console.log('aqyu')
            setNewPlayerName('');
            fetchPlayersByTeam();
            
        } catch (error) {
            if(error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova pessoa', 'Nao foi possivel adicionar');
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);

        } catch (error) {
            console.log(error);
            Alert.alert('Pessoas', 'Nao foi possivel carregar as pessoas do time selecionado.');
        }
    }

    async function handleRemovePlayer(playerName: string) {
        try {

            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();

        } catch (error) {
            console.log(error);
            Alert.alert('Remover pessoa', 'Nao foi possivel remover essa pessoa.');
        }
    }

    async function groupRemove() {
        try {

            await groupRemoveByName(group);
            navigation.navigate('groups')

        }catch (error) {
            console.log(error); 
            Alert.alert('Remover grupo', 'Nao foi possivel remover o grupo.');
        }
    }

    async function handleGrupoRemove() {
        Alert.alert(
            'Remover',
            'Desejaremover o grupo?',
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress: () => {groupRemove()} }
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return (
        <Container>
            <Header showBackButton />
            <HighLight 
                title={group}
                subtitle="Adicione a galera e separe os times"
            />
            <Form>
                <Input
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    inputRef={newPlayerNameInputRef}
                    placeholder={"Nome da pessoa"}
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon 
                    icon="add"
                    onPress={handleAddPlayer}
                />
            </Form>
            <HeaderList>
                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => setTeam(item)}
                            activeOpacity={1}
                        >
                            <Filter 
                                title={item}
                                isActive={item === team}
                            />
                        </TouchableOpacity>
                    )}
                    horizontal
                />
                <NumbersOfPlayers>
                    {players.length}
                </NumbersOfPlayers>
            </HeaderList>
            <FlatList
                data={players}
                keyExtractor={(_,idx) => idx.toString()}
                renderItem={({ item }) => (
                    <PlayerCard 
                        name={item.name}
                        onRemove={() => {handleRemovePlayer(item.name)}}  
                    />
                    
                )}
                ListEmptyComponent={<ListEmpty 
                    message="Não há pessoas nesse time."
                />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
            />
            <Button 
                title="Remover turma"
                type="SECONDARY"
                onPress={handleGrupoRemove}
            />
        </Container>
    )
}