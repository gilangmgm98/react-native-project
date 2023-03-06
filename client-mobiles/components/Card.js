import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Pressable, Text } from "react-native"
import { Card } from 'react-native-paper';



export default function FoodCard({ food }) {
    const navigation = useNavigation()
    const touchIt = (id) => {
        navigation.navigate('Detail',{id})
    }

    return (
        <Pressable onPress={() => touchIt(food.id)} >
            <Card className='mb-5'>
                <Card.Cover source={{ uri: food.imgUrl }} />
                <Card.Content>
                    <Text className='mt-2 text-center font-bold text-xl'>{food.name}</Text>
                    {/* <Text className='text-justify'>Ayam Kriuk penuh rasa dengan kenikmatan minyak babi serta taburan bumbu micin Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </Text> */}
                </Card.Content>
            </Card>
        </Pressable>
    )
}




