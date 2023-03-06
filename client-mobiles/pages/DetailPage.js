import { useQuery } from '@apollo/client';
import * as React from 'react';
import { View, Text } from "react-native"
import { Avatar, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GET_FOOD_BY_ID } from '../queries';


export default function DetailPage({ route }) {
    const { id } = route.params
    console.log(id);

    const { loading, error, data } = useQuery(GET_FOOD_BY_ID, {
        variables: {
            getFoodId: +id
        }
    })
    console.log(data?.getFood?.Ingredients);

    if(loading){
        return (
            <SafeAreaView>
                <Text>
                    Loading . . .
                </Text>
            </SafeAreaView>
        )
    }


    return (
        <View className='p-5'>
            <Card className='flex'>
                <Card.Cover source={{ uri: data?.getFood?.imgUrl }} />
                <Card.Content>
                    <View className="flex-row justify-end">
                        <Text className='font-bold text-l text-center mx-2 my-2 bg-orange-600 rounded-lg inline-flex p-1'>Category: {
                            (data?.getFood?.Category?.name)
                        }</Text>
                    </View>
                    <View className="bg-orange-300 p-5 rounded-3xl">
                        <Text className='font-bold text-xl'>{data?.getFood?.name}</Text>
                        <Text className='text-justify'>{data?.getFood?.description}</Text>
                        <View>
                            <Text className='font-bold text-l text-start'>Ingredients: {data?.getFood?.Ingredients[0]?.name}, {data?.getFood?.Ingredients[1]?.name}, {data?.getFood?.Ingredients[2]?.name}</Text>
                        </View>
                        <View>
                            <Text className='font-bold text-l text-right'>Rp. {
                                (data?.getFood?.price)
                            },-</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}


