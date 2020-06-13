import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { LOGO } from '../../assets/allAssets'
import api from '../../services/api'

import styles from './styles';

const Incidents = () => {

  const navigation = useNavigation()
  const [ incidents, setIncidents ] = useState([])
  const [ total, setTotal ] = useState(0)

  function navigationToDetail(incident) {
    navigation.navigate('Detail', { incident })
  }

  async function loadIncidents() {
    const response = await api.get('incidents')
    setIncidents(response.data)
    setTotal(response.headers['x-total-count'])
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  function renderItem(incident) {
    return (
      <View style={styles.incident}>
        <Text style={styles.incidentProperty}>ONG: </Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city} / {incident.uf}</Text>

        <Text style={styles.incidentProperty}>CASO: </Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR: </Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
            }).format(incident.value)}
        </Text>

        <TouchableOpacity style={styles.detailsButton} onPress={ () => navigationToDetail(incident) }>
          <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Image style={ styles.logoStyle } source={ LOGO } />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        data={ incidents }
        style={ styles.incidentList }
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={ false }
        renderItem={({ item: incident }) => renderItem(incident) }
      />

    </View>
  );
}

export default Incidents;