import React, { useState } from 'react';
import { 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  FlatList,
  Alert
} from 'react-native';

import { styles } from './styles';
import { Participant } from '../../components/Participant';

export function Home() {

  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd() {
    if(participants.includes(participantName)) {
      return Alert.alert('Participante Existe', 'Já existe um participante na lista com esse nome.')
    }
    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: string) {    
    //alert 1 param: Titulo
    //alert 2 param: mensagem
    //alert 3 param: array com objeto sim + 
    Alert.alert('Remover', `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        //pegue o estado anterior e retorne todos os participantes que tiverem o nome diferente do nome recebido
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do Evento
      </Text>

      <Text style={styles.eventDate}>
        Segunda, 10 de Outubro de 2022.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={text => setParticipantName(text)}
          value={participantName}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleParticipantAdd}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        //propriedade que faz o ´map´. Basta passar qual sera o array
        data={participants}
        //para cada 'item' => qual sera a chave unica
        keyExtractor={item => item}
        //o que eu quero renderizar para cada item:
        renderItem={({ item }) => (
          <Participant 
            key={item}
            name={item} 
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        //desativar barra de rolagem
        showsVerticalScrollIndicator={false}
        //renderizar algo se a lista estiver vazia
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou ao evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />       
    </View>
  );
}