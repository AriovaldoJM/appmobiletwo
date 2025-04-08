import { useState } from "react";
import { FlatList } from "react-native";

import { Header } from "@components/Hearder";
import { HighLight } from "@components/HighLight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpyt";
import { Button } from "@components/Button";

import { Container} from "./styles"

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

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
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={<ListEmpty message="Que tal cadastrar a primeira turma."/>}
      />
      <Button
        title="Criar nova turma"
      />
    </Container>
  );
}
