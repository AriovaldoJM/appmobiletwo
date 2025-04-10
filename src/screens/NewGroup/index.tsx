import { useNavigation } from "expo-router";

import { HighLight } from "@/src/components/HighLight";
import { Container, Content, Icon } from "./styles";

import { Header } from "@components/Hearder";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function NewGroup() {

    const navigation = useNavigation();

    function handleNew() {
        navigation.navigate('players', { group: 'Ari' });
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
