import React from 'react';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { LOGO } from '../../assets/allAssets'

import styles from './styles';

export default function Detail() {

  const navigation = useNavigation()
  const route = useRoute()

  const incident = route.params.incident;
  const message = `Olá ${incident.name}, estou entrando em contato, pois gostaria de ajudar no caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`

  function navigateBack() {
    navigation.goBack()
  }

  async function sendEmail() {

  }

  function sendWhastapp() {
    Linking.send(`whatsapp://send?phone=016982009237?text=${message}`)
  }

  return (
    <View style={ styles.container }>
     <View style={ styles.header }>
        <Image style={ styles.logoStyle } source={ LOGO } />
    
        <TouchableOpacity onPress={navigateBack}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>

      <View style={ styles.incident }>
      <Text style={ styles.incidentProperty }>ONG: </Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city} / {incident.uf}</Text>

        <Text style={ styles.incidentProperty }>CASO: </Text>
        <Text style={ styles.incidentValue }>{incident.title}</Text>

        <Text style={ styles.incidentProperty }>VALOR: </Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
            }).format(incident.value)}
        </Text>
      </View>

      <View style={ styles.contactBox }>
        <Text style={ styles.heroTitle }>Salve o dia</Text>
        <Text style={ styles.heroTitle }>Seja o herói desse caso.</Text>
        <Text style={ styles.heroDescription }>Entre em contato:</Text>

        <View style={ styles.actions }>
          <TouchableOpacity style={ styles.action } onPress={() => {}}>
            <Text style={ styles.actionText }>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.action } onPress={() => {}}>
            <Text style={ styles.actionText }>Email</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
}