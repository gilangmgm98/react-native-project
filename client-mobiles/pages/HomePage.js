import { useQuery } from '@apollo/client';
import * as React from 'react';
import { View, Text, Pressable, ScrollView, Image } from "react-native"
import { Avatar, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import FoodCard from '../components/Card';
import Carousel from '../components/Carousel';
import SpecifiedView from '../components/SpecifiedView';
import { GET_ALL_FOOD } from '../queries';

export default function HomePage({ navigation }) {
    
    // function goToDetail(id){
    //     return navigation.navigate('Detail',{id})
    // }

    const {loading, error, data} = useQuery(GET_ALL_FOOD)
    console.log(data);

    if(loading){
        <SafeAreaView>
            <Text>
                Loading . . . 
            </Text>
        </SafeAreaView>
    } 

    

    return (
        <SpecifiedView>
            <ScrollView>
                <View>
                    <View className="mt-1" style={{
                        // height: '15%',
                        // width: '100%',
                        marginBottom:10,
                        // backgroundColor: 'black',
                        alignSelf: 'center'
                    }}>
                        <Image
                            style={{
                                height: 105,
                                resizeMode: 'cover',
                                width: 200
                            }}
                            source={{ uri: 'https://www.awrestaurants.co.id/assets/images/logo.png' }}
                        />
                    </View>

                    <View >
                        <Carousel></Carousel>
                    </View>
                    <View>
                        <View className='p-5'>
                            {
                                data?.getFoods?.map(el => {
                                    return <FoodCard key={el.id} food={el} />
                                })
                                // console.log(data);
                            }
                            
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SpecifiedView>
    )
}


