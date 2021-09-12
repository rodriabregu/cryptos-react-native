import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const CoinItem = ({data}) => {
    return (
        <View style={styles.containerItem}>
            <View style={styles.coinName}>
                <Image style={styles.image} source={{uri: data.image}}/>
                <View style={styles.containerNames}>
                    <Text style={styles.text}> {data.name}</Text>
                    <Text style={styles.textSymbol}>{data.symbol}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.textPrice}>${data.current_price}</Text>
                <Text style={[styles.pricePercentage, data.price_change_percentage_24h > 0 
                ? styles.priceUp
                : styles.priceDown
                ]}>{data.price_change_percentage_24h}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerItem: {
        backgroundColor: '#121212',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        color: '#ffffff',

    },
    textSymbol: {
        color: '#434343',
        textTransform: 'uppercase'
    },
    textPrice: {
        color: '#ffffff',
        textAlign: 'right'
    },
    coinName: {
        flexDirection: 'row',
    },
    containerNames: {
        marginLeft: 10
    },
    image: {
        width: 20,
        height: 20,
        marginTop: 4,
    },
    pricePercentage: {
        textAlign: 'right'
    },
    priceUp: {
        color: '#32cd32'
    },
    priceDown: {
        color: '#fc4422'
    }
})

export default CoinItem
