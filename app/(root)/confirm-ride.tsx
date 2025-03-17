import RideLayout from "@/components/RideLayout"
import { View, Text, FlatList } from "react-native"
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/customButton";
import { router } from "expo-router";
import { useDriverStore } from "@/store";

export default function ConfirmRide() {

    const {drivers, selectedDriver, setSelectedDriver} = useDriverStore();

    return (
        <RideLayout title="Choose Driver" snapPoints={["65%", "85%"]}>
            <FlatList 
                data={drivers}
                renderItem={({item}) => (
                    <DriverCard 
                        selected={selectedDriver!}
                        setSelected={() => setSelectedDriver(item.id!)}
                        item={item}
                    />
                )}
                ListFooterComponent={() => (
                    <View className="mx-5 mt-10">
                        <CustomButton 
                            title="Book Ride"
                            onPress={() => router.push("/(root)/book-ride")}
                        />
                    </View>
                )}
            />
        </RideLayout>
    )

}

