import { useNavigation } from "expo-router";
import { useState } from "react";
import { groupCreate } from "@/src/storage/group/groupCreate";
import { AppError } from "@/src/utils/AppError";

import { HighLight } from "@components/HighLight";
import { Header } from "@components/Hearder";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";
import { Alert } from "react-native";

export function NewGroup() {
    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function handleNew() {
        if(group.trim().length === 0) {
            return Alert.alert('Novo Grupo','Informe o nome da turma.');
        }
        try {
            await groupCreate(group);
            navigation.navigate('players', { group });
        } catch (error) {
            if(error instanceof AppError) {
                Alert.alert('Novo Grupo', error.message);
            }else{
                Alert.alert('Não foi possível criar um novo grupo.');
                console.log(error);
            }
        }
    }
        
    return (
        <Container>
            <Header showBackButton/>
            <Content>
                <Icon /> 
                <HighLight 
                    title="Nova turma" 
                    subtitle="Crie a turma para adicionar as pessoas"
                />        
                <Input 
                    placeholder="Nome da turma"
                    autoCorrect
                    onChangeText={setGroup}
                />
                <Button 
                    title="Criar" 
                    style={{ marginTop: 20 }}  
                    onPress={handleNew}         
                />       
            </Content>
        </Container>

            
    )
}
