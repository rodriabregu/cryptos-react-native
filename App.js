import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, StatusBar } from 'react-native'
import CoinItem from './components/CoinItem'

const App = () => {
  StatusBar.setBarStyle('light-content', true);
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [refresh, setRefresh] = useState(false)

  const loadData = async () => {
    const resp = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    const data = await resp.json()
    setCoins(data)
  }

  const handleText = e => {
    setSearch(e.toLowerCase())
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crypto Exchange :D</Text>
        <TextInput 
        style={styles.searchInput} 
        placeholer="Search a coin..."
        placeholderTextColor="#858585"
        onChangeText={text => handleText(text)}
        />
      </View>
      <FlatList
      style={styles.list}
      data={coins.filter(e => e.name.toLowerCase().includes(search) || e.symbol.toLowerCase().includes(search))}
      renderItem={({item}) => {
        return <CoinItem data={item} />
      }}
      showsVerticalScrollIndicator={false}
      refreshing={refresh}
      onRefresh={async () => {
        setRefresh(true)
        await loadData()
        setRefresh(false)
      }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    color: '#fff',
    alignItems: 'center',
    flex: 1
  },
  title: {
    color: '#fff',
    marginTop: 35,
    fontSize: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
    marginTop: 15,
  },
  list: {
    width: '90%',
  },
  searchInput: {
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center',
    marginTop: 35, 
  }
})

export default App
