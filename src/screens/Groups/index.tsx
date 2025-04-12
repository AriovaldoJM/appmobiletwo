import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@/src/storage/group/groupsGetAll";

import { Header } from "@components/Hearder";
import { HighLight } from "@components/HighLight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpyt";
import { Button } from "@components/Button";

import { Container} from "./styles"

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

   async function fetchGroups() {
      try {
          const data = await groupsGetAll();
          setGroups(data);
      } catch (error) {
          console.log(error);
      }
    }

    function handleOpenGroup(group: string) {   
        navigation.navigate('players', { group });
    }

    useFocusEffect(useCallback(() => {
        fetchGroups();
    }, []));

  return (
    <Container>
      <Header />
      <HighLight 
        title="Turmas"
        subtitle="Jogue com a sua turma"
      />
      <FlatList 
        data={groups} 
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
            onPress={() => {
                handleOpenGroup(item)
            }}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={<ListEmpty message="Que tal cadastrar a primeira turma."/>}
        showsVerticalScrollIndicator={false}
      />
      <Button
        title="Criar nova turma"
        onPress={handleNewGroup}
      />
    </Container>
  );
}
