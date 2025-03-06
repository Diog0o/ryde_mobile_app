import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "@/types/type";

const getBgVariant = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariant = (variant: ButtonProps["textVariant"]) => {
    switch (variant) {
      case "primary":
        return "text-black";
      case "secondary":
        return "text-grey-100";
      case "danger":
        return "text-red-100";
      case "success":
        return "text-green-100";
      default:
        return "text-white";
    }
  };

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={` p-3 rounded-full flex flex-row items-center justify-center shadow-md shadow-neutral-400/70 ${getBgVariant(bgVariant)} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      {IconRight && <IconRight />}
      <Text className={`text-lg font-bold ${getTextVariant(textVariant)}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
