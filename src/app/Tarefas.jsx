
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

export default function App() {
  const [useDark, setDark] = useState(false)
  const [useTask, setTask] = useState([
    { id: 1, desc: "estudar react native", status: "pendente" },
    { id: 2, desc: "estudar js", status: "emAndamento" },
    { id: 4, desc: "estudar react native", status: "concluido" },
  ])
  const [modalVisible, setmodalVisible] = useState(false)
  const [statusTodo, setStatusTodo] = useState("pendente")
  const [useNewTask, setNewTask] = useState("");
  const [removeProd, setRemoveProd] = useState([])

  function deleteProd(item) {
    let deleteItem = useTask.filter((p) => p.id !== item.id)
    setRemoveProd(deleteItem)
  }

  const addTask = () =>{
    setTask([...useTask, {
      id:useTask.length + 1,
      desc: useNewTask,
      status:statusTodo
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

        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={[{}, { color: colors.text }]}>Voltar</Text>
        </TouchableOpacity>
        <View >
          <Text
            style={
              [styles.headerTitle,
              { color: colors.text }]
            }>Minhas Tarefas</Text>
          <Text style={
            [styles.headerSubTitle,
            { color: colors.text }]
          }>Organize seu dia</Text>
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
          <View style={[styles.statusCard, { backgroundColor: colors.cardSecondary }]}>
            <Ionicons
              name="list"
              size={24}
              style={[{ color: colors.iconColor }]}
            />
            <Text style={[{ color: colors.text }]}>{status.total}</Text>
            <Text style={[{ color: colors.text }]}>total</Text>
          </View>

          <View style={[styles.statusCard, { backgroundColor: colors.cardSecondary }]}>
            <Ionicons
              name="time"
              size={24}
              style={[{ color: colors.iconColor }]}
            />
            <Text style={[{ color: colors.text }]}>{status.emAndamento}</Text>
            <Text style={[{ color: colors.text }]}>Em Andamento</Text>
          </View>

          <View style={[styles.statusCard,  { backgroundColor: colors.cardSecondary }]} nav={() => deleteProd()}>
            <Ionicons
              name="ellipse-outline"
              size={24}
              style={[{ color: colors.iconColor } ]}
            />
            <Text style={[{ color: colors.text }]}>{status.pendente}</Text>
            <Text style={[{ color: colors.text }]}>Pendente</Text>
          </View>

          <View style={[styles.statusCard, { backgroundColor: colors.cardSecondary }]}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              style={[{ color: colors.succes }]}
            />
            <Text style={[{ color: colors.text }]}>{status.concluido}</Text>
            <Text style={[{ color: colors.text }]}>Concluidos</Text>
          </View>


        </View>
        <View>
          {useTask.length == 0 ?
            (
              <Text>Nenhuma tarefa</Text>
            ) : (
              useTask.map((t, index) => (
                <View
                  key={index}
                  style={[styles.todoCard, {}]}
                >
                  <View style={[styles.todoLeft]}>
                    <Ionicons
                      name={getStatusIcon(t.status)}
                      size={24}
                      color={getStatusColors(t.status)}
                    />
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
                        name="create-outline"
                        size={20}
                        color={colors.accent}
                      />
                    </TouchableOpacity>
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
  statusCard: {
    flex: 1,
    minWidth: "47%",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 4
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
    gap: 4
  },
  todoCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.6
  },
  todoStatus: {
    fontSize: 12,
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
    flexDirection : "row",
    flex : 1,
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

