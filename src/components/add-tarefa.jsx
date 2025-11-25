import { useState } from "react";

const [tarefa, setTarefa] = useState([]);
const [titulo, setTitulo] = useState("");
const [status, setStatus] = useState("pendente");

const addTarefa = () =>{
    if (!titulo.trim())
        return

    const novaTarefa = {
        titulo : titulo,
        status : status
    }

    setTarefa([...tarefa, novaTarefa])
    setTitulo("")
    setStatus("pendente")
}