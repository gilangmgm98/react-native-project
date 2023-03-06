import { useQuery } from "@apollo/client"
import { Text, View } from "react-native"
import { GET_ALL_CATEGORY } from "../queries"

export default function CategoryPage() {
    const {loading, error, data} = useQuery(GET_ALL_CATEGORY)
    console.log(data);

    if(loading){
        return(
            <Text>
                Loading . . .
            </Text>
        )
    }

    return (
        <View className="p-4">
            {
                data?.getCategory?.map((el) => {
                    return <Text key={el.id} className="bg-slate-500 mx-2 mb-2 p-2 rounded-xl font-extrabold text-center">{el.name}</Text>
                })
            }
        </View>
    )
}
