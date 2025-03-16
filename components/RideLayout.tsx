import { ReactNode } from "react";
import { View, Text } from "react-native";

const RideLayout = ({children}: {children: ReactNode}) => {
    return (
        <View>
            <Text>Text at the top</Text>
            {children}
            <Text>Text at the bottom</Text>
        </View>
    )
}

export default RideLayout;