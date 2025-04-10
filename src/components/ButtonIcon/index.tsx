import { TouchableOpacityProps } from "react-native"; 
import { ButtonIconTypeStyleProps } from "./styles";     
import { MaterialIcons } from "@expo/vector-icons";     


import { Container, Icon } from "./styles";

type Props = TouchableOpacityProps & {
    type?: ButtonIconTypeStyleProps
    icon: keyof typeof MaterialIcons.glyphMap
}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest }: Props) {
    return (
        <Container  {...rest}>
            <Icon 
                name={icon}
                type={type}
            />
        </Container>
    )
}