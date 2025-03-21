import { View, Text, ScrollView, Image, Alert } from "react-native";
import InputField from "@/components/inputField";
import { icons, images } from "@/constants/index";
import { useState } from "react";
import CustomButton from "@/components/customButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from '@clerk/clerk-expo'

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.push('/(root)/(tabs)/home')
      } else {

        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }

  return (
    <ScrollView className="flex-1 bg-white ">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
            secureTextEntry
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-5"
          />

          <OAuth />

          <Link
            href={"/(auth)/sign-up"}
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Don't have an account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
        {/* Verification Modal */}
      </View>
    </ScrollView>
  );
};
export default SignIn;
