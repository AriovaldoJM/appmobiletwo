import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Header } from "@components/Hearder";
import { ButtonIcon } from "@components/ButtonIcon";
import { Button } from "@components/Button";
import { HighLight } from "@components/HighLight";
import { PlayerCard } from "@/src/components/PlayerCard";
import { ListEmpty } from "@/src/components/ListEmpyt";


import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

export function Players() {

    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState([]);

    return (
        <Container>
            <Header showBackButton />
            <HighLight 
                title="Nome da turma" 
                subtitle="Adicione a galera e separe os times"
            />
            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                />
                <ButtonIcon 
                    icon="add"
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
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard 
                        name={item}
                        onRemove={() => {}}  
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
            />
        </Container>
    )
}