import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Header } from "@components/Hearder";
import { ButtonIcon } from "@components/ButtonIcon";
import { HighLight } from "@components/HighLight";

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
        </Container>
    )
}