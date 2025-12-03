import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import Btn from "../components/Btn";
import Campo from "../components/Campo";

let nome = {
  name: "kawan",
  age: 100
}

console.log(nome);

export default function index() {
  const [useShowPassword, SethowPassword] = useState(false)
  const [useValue, setValue] = useState("")
  const [useValueEmail, setValueEmail] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)




  function entrar() {
    if (useValueEmail === ""){
      setErrorMessage("Email inválido")
      setError(true)
    }else if(useValue.length < 6) {
      setError(true)
      setErrorMessage("A senha tem que ter mais de 6 caractéres")
    }else{
      setLoading(true)
      setTimeout(() => {
        router.navigate("/Tarefas")
      }, 6000)
    }
  }

  return (
    < View style={styles.container} >

      <Text style={styles.title}>Bem-Vindo!</Text>
      <Text style={styles.SubTitle}>Entre para continuar</Text>
      <View style={styles.from}>
        <Campo
          title="Email"
          color="#aaa"
          st="campo"
          valor={useValueEmail}
          onText={setValueEmail}
        />
        <View style={styles.passwordContainer} >
          <Campo
            title="senha"
            st="pass"
            color="#aaa"
            secure={useShowPassword}
            valor={useValue}
            onText={setValue}
            unColor="transparent"
          />
          <TouchableOpacity
            style={styles.iconContainer}
          >
            <Ionicons
              size={24}
              name={useShowPassword ? "eye" : "eye-off"}
              onPress={() => SethowPassword(!useShowPassword)}
            />
          </TouchableOpacity>
        </View>

        
        {error && <Text>{errorMessage}</Text>}

        {loading ? (<ActivityIndicator
          size="small"
          color="#ff6b00"
          style={{marginTop: 20}} />
      ) : (
        <Btn title="Entrar" nav={entrar} />)
        }

        <TouchableOpacity
          onPress={() => router.navigate("/Outros")}
        >
          <Text style={styles.link}>Esqueceu sua senha</Text>
        </TouchableOpacity>



      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ff6b00",
    marginBottom: 8
  },
  SubTitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 40

  },
  from: {
    width: "100%"
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    marginBottom: 15
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  inputPass: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  iconContainer: {
    padding: 6
  },

  button: {
    backgroundColor: "#ff6b00",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#ff6b00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3
  },


  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  },
  link: {
    color: "#ff6b00",
    textAlign: "center",
    marginTop: 15,
    fontSize: 15
  }
})

