
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import Campo from "../components/Campo"
import Btn from "../components/Btn";
import { Animated } from "react-native";



export default function App() {
  const [useDark, setDark] = useState(false)
  const [useTask, setTask] = useState([
    { id: 1, desc: "Comprar pão", status: "pendente" },
    { id: 2, desc: "Salário", status: "emAndamento" },
  ])
  const [modalVisible, setmodalVisible] = useState(false)
  const [statusTodo, setStatusTodo] = useState("pendente")
  const [useNewTask, setNewTask] = useState("");
  const [removeProd, setRemoveProd] = useState([])
  const [menuVisible, setMenuVisible] = useState(false);
  const menuSlide = useState(new Animated.Value(300))[0]


  const openMenu = () => {
    setMenuVisible(true)
    Animated.timing(menuSlide, {
      toValue: 200,
      duration: 250,
      useNativeDriver: false
    }).start()
  }

  const closeMenu = () => {
    Animated.timing(menuSlide, {
      toValue: 300,
      duration: 250,
      useNativeDriver: false
    }).start(() => setMenuVisible(false))
  }

  function deleteProd(item) {
    let deleteItem = useTask.filter((p) => p.id !== item.id)
    setRemoveProd(deleteItem)
  }

  const addTask = () => {
    setTask([...useTask, {
      id: useTask.length + 1,
      desc: useNewTask,
      status: statusTodo
    }])
    setmodalVisible(false)
    setNewTask("")
  }

  const getStatus = () => {
    const total = useTask.length
    const pendente = useTask.filter((t) => t.status == "pendente").length
    const emAndamento = useTask.filter((t) => t.status == "emAndamento").length
    const concluido = useTask.filter((t) => t.status == "concluido").length
    return { total, pendente, emAndamento, concluido }
  }


  const status = getStatus()



  const colors = useDark ?
    {
      bg: "#0a0a0a",
      text: "#fff",
      iconColor: "#ff6b00",
      cardSecondary: "#252525",
      succes: "#10b981",
      warning: "#f59e0b",
      accent: "#ff6b00",
      subText: "#888",
      error: "#ef4444",
      card: "#1a1a1a",
      border: "#333",
      input: "#2a2a2a"
    } : {
      bg: "#f5f5f5",
      text: "#1a1a1a",
      iconColor: "#ff6b00",
      cardSecondary: "#F8F8F8",
      succes: "#10b981",
      warning: "#f59e0b",
      accent: "#ff6b00",
      subText: "#666",
      error: "#ef4444",
      card: "#fff",
      border: "#e0e0e0",
      input: "#fff"
    }

  const getStatusIcon = (statusTask) => {
    switch (statusTask) {
      case "concluido":
        return "checkmark-circle"
      case "emAndamento":
        return "time"
      case "pendente":
        return "ellipse-outline"
      default:
        return " ellipse-outline";
    }
  }


  const getStatusColors = (statusTask) => {
    switch (statusTask) {
      case "concluido":
        return colors.succes
      case "emAndamento":
        return colors.warning
      default:
        return colors.subText;
    }
  }


  const getStatusLabel = (status) => {
    switch (status) {
      case "concluido":
        return "Concluido"
      case "emAndamento":
        return "Em andamento"
      default:
        return "Pendente";
    }
  }


  const closeModal = () => {
    setmodalVisible(false)
  }

  const openModal = () => {
    setmodalVisible(true)
  }


  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.bg }]}>

      <View style={styles.header}>

        <TouchableOpacity onPress={openMenu}>
          <Ionicons name="menu" size={28} color="#ff6b00" />
        </TouchableOpacity>
        <Modal
          visible={menuVisible}
          transparent
          animationType="none"
          onRequestClose={closeMenu}
        >
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={closeMenu}
          />
          <Animated.View
            style={[
              styles.menuContainer,
              {
                backgroundColor: colors.card,
                right: menuSlide,
              },
            ]}
          >
            <Text style={[styles.menuTitle, { color: colors.text }]}>Menu</Text>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/Tarefas")}
            >
              <Ionicons name="checkmark-done" size={22} color={colors.text} />
              <Text style={[styles.menuText, { color: colors.text }]}>Tarefas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/Financeiro")}
            >
              <Ionicons name="wallet" size={22} color={colors.text} />
              <Text style={[styles.menuText, { color: colors.text }]}>Financeiro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color={colors.text} />
              <Text style={[styles.menuText, { color: colors.text }]}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/")}
            >
              <Ionicons name="exit-outline" size={22} color={colors.text} />
              <Text style={[styles.menuText, { color: colors.text }]}>Sair</Text>
            </TouchableOpacity>
          </Animated.View>
        </Modal>
        <View >
          <Text
            style={
              [styles.headerTitle,
              { color: colors.text }]
            }>Financeiro</Text>
        </View>
        <TouchableOpacity>
          <Ionicons
            name={useDark ? "moon" : "sunny"}
            size={24}
            onPress={() => { setDark(!useDark) }}
            style={[{ color: colors.iconColor }]}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.statusContainer}>

          <View style={[styles.saldo, { color: colors.bg }]}>
            <Text>Saldo Total</Text>
            <Text style={{ fontSize: 35, fontWeight: "700", color: "green" }}>R$ 5.000,00</Text>
          </View>
        </View>
        <View>
          <Text style={[{ fontSize: 22, fontWeight: "700", marginBottom: 10, color: colors.text }]}>Histórico</Text>
        </View>
        <View>
          {useTask.length == 0 ?
            (
              <Text>Sem movimentação</Text>
            ) : (
              useTask.map((t, index) => (
                <View
                  key={index}
                  style={[styles.todoCard, {}]}
                >
                  <View style={[styles.todoLeft]}>
                    <View style={styles.todoInfo} >
                      <Text
                        style={[
                          styles.todoTitle,
                          { color: colors.text },
                          t.status === "concluido" && styles.todoCompleted
                        ]}
                      >{t.desc}
                      </Text>
                      <Text style={[
                        styles.todoStatus,
                        { color: getStatusColors(t.status) }
                      ]}>
                        {getStatusLabel(t.status)}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.todoActions]}>
                    <TouchableOpacity
                      style={styles.actionButton}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color={colors.error}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
        </View>

      </ScrollView>


      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.accent }]}
        onPress={() => openModal()}
        activeOpacity={0.8}
      >
        <Ionicons
          name="add"
          size={28}
          color="#fff"
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>

            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]} >Nova Tarefa</Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color={colors.subText} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={[styles.label, { color: colors.text }]}>Titulo</Text>
              <Campo
                st="campo"
                title="Digite o título da tarefa..."
                valor={useNewTask}
                onText={setNewTask}
                color={colors.subText}
              />
              <Text style={[styles.label, { color: colors.text }]}>Status</Text>
              <View style={[styles.statusButtons]}>
                <TouchableOpacity style={[styles.statusButton, {
                  backgroundColor:
                    statusTodo === "pendente"
                      ? colors.subText
                      : colors.input,
                  borderColor: colors.border
                }]}
                  onPress={() => setStatusTodo("pendente")}
                >
                  <Text
                    style={[styles.statusButtonText, {
                      color:
                        statusTodo === "pendente"
                          ? "#fff"
                          : colors.text,
                    }]}
                  > Pendente</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.statusButton, {
                  backgroundColor:
                    statusTodo === "emAndamento"
                      ? colors.warning
                      : colors.input,
                  borderColor: colors.border
                }]}
                  onPress={() => setStatusTodo("emAndamento")}
                >
                  <Text
                    style={[styles.statusButtonText, {
                      color:
                        statusTodo === "emAndamento"
                          ? "#fff"
                          : colors.text,
                    }]}
                  > Em andaento</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.statusButton, {
                  backgroundColor:
                    statusTodo === "concluido"
                      ? colors.succes
                      : colors.input,
                  borderColor: colors.border
                }]}
                  onPress={() => setStatusTodo("concluido")}
                >
                  <Text
                    style={[styles.statusButtonText, {
                      color:
                        statusTodo === "concluido"
                          ? "#fff"
                          : colors.text,
                    }]}
                  > concluido</Text>
                </TouchableOpacity>


              </View>
            </View>

            <View style={styles.modalFooter}>
              <Btn
                title="Cancelar"
                variant="outline"
                nav={closeModal} />
              <Btn title="Adicionar" nav={addTask} />
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView >
  );
}


const styles = StyleSheet.create({
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  menuContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "50%",
    padding: 20,
    paddingTop: 60,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },

  menuTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },

  menuText: {
    fontSize: 16,
    fontWeight: "500",
  },
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700"
  },
  headerSubTitle: {
    fontSize: 14,
    marginTop: 4
  },
  content: {
    flex: 1,
    padding: 20
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20
  },
  saldo: {
    flex: 1,
    width: "47%",
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    marginBottom: 30,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 2

  },
  todoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  todoLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  todoInfo: {
    flex: 1,
    gap: 6
  },
  todoCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.6
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "600"
  },
  todoStatus: {
    fontSize: 16,
    fontWeight: "500"
  },
  todoActions: {
    flexDirection: "row",
    gap: 8
  },
  actionButton: {
    padding: 8
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0, height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#rgba(0,0,0,0.5)",
    justifyContent: "flex-end"
  },

  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: "80%"
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700"
  },
  modalBody: {
    marginBottom: 16
  },
  modalFooter: {
    flexDirection: "row",
    flex: 1,
    gap: 8
  },
  label: {
    fontWeight: 700,
    padding: 14,
    fontSize: 18
  },
  statusButtons: {
    flexDirection: "row",
    gap: 8
  },
  statusButton: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: "center"
  },
  statusButtonText: {
    fontSize: 13,
    fontWeight: "600"
  }

})

