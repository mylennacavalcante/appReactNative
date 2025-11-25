import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";
import { router } from "expo-router"
import Campo from "../components/Campo";
import Btn from "../components/Btn";
export default function Outros() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recupere sua senha</Text>
            <Campo title="nova senha" st="campo" />
            <Campo title="senha antiga" st="campo" />

            <View style={styles.btns}>
                <Btn
                    title="Voltar"
                    nav={() => router.push("/")}
                />
                <Btn title="Enviar" />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20
    },
    btns: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 25,
        textAlign: "center",
        color: "#a94a05ff",
        marginBottom: 5
    }

})


