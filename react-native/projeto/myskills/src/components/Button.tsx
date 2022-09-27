import React from 'react';
import {
  TouchableOpacity,
  Text, 
  StyleSheet,
  TouchableOpacityProps
} from 'react-native';

//posso criar um tipo e dizer que este tipo eh igual a: ...
//type ButtonProps = TouchableOpacityProps; ou
//adicionar uma nova propriedade alem de TouchableOpacityProps com uma interface

interface ButtonProps extends TouchableOpacityProps {
  title: string
}

export function Button({ title, ...rest}: ButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.button} 
      //propriedade que controla a opacidade do botao no clique
      activeOpacity={.7} 
      {...rest}
    >
      <Text style={styles.buttonText}>
        { title }
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#a370f7',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  },
});