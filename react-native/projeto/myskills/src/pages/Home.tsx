import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Platform,
  FlatList,
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

//uma interface eh a representacao de como um dado deve ser, qual deve ser seu formato
interface SkillData {
  id: string;
  name: string;
}

export default function Home() {

  //tenho uma variavel de uma nova habilidade
  const [newSkill, setNewSkill] = useState('');
  //tenho um array com todas as minhas habilidades, que comca vazio
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState('');
  

  function handleAddNewSkill() {  
    //mySkills possui os valores antigos, espalhados por spread junto com o novo estado, formando um novo array
    //setMySkills(oldState => [...oldState, newSkill]);


    //este data esta sendo tipado, pra que o mySkills receba no seu array um objeto
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }
    console.log('New Skill = ', data);
    setMySkills([...mySkills, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills(mySkills => mySkills.filter(
      skill => skill.id !== id
    ))
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if(currentHour < 12) {
      setGretting('Good Morning');
    } else if ( currentHour >= 12 && currentHour < 18) {
      setGretting('Good Afternoon');
    } else {
      setGretting('Good Night');
    }

  },[])

  return (
    //a view pode receber style-inline recebendo um objeto 
    <>
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome, Thiago
        </Text>
        <Text style={styles.greeting}>
          { gretting }
        </Text>
        <TextInput 
          style={styles.input} 
          placeholder='New skill'
          placeholderTextColor='#555'
          onChangeText={setNewSkill}
        />
        
        <Button 
          onPress={handleAddNewSkill}
          title='Add'
        />

        {/* posso passar um vetor de estilos com uma propriedade a mais por objeto */}
        <Text style={[styles.title, { marginVertical: 50 }]}>
          My Skills
        </Text>
        
        <FlatList 
          // qual sera a colecao percorrida
          data={mySkills}
          keyExtractor={item => item.id}
          // item que sera renderizado. Cada item do meu array esta dentro de um objeto chamado item
          // meuArray.item.item
          renderItem={ ({ item }) => (
            <SkillCard 
              skill={item.name}
              onPress={() => handleRemoveSkill(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 70,
    backgroundColor: '#121015',
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 12,
    color: '#fff'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 5
  }
});