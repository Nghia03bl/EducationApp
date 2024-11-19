import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
import { FlatList } from 'react-native'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'

export default function Slider() {
    return (
        <View style={{marginTop: 10}}>
        <FlatList 
        renderItem={({item})=>(
            <View>
                <Image source={{uri:item.image}} style={{width:Dimensions.get('screen').width*0.87,height:150,borderRadius:10,marginRight:15}}/>
            </View>
        )}/>
        </View>
  )
}