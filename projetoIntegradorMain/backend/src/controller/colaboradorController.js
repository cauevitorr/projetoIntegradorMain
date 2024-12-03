import Colaborador from "../model/colaboradorModel.js"
import { z } from "zod"

const createSchema = z.object({
    nome: z.string({
        invalid_type_error: "O nome deve ser um texto",
        required_error: "Nome é obrigatório"
    }),
    email: z.string().email({
        invalid_type_error: "O email deve ser um texto",
        required_error: "Email é obrigatório"
    }),
})

const idSchema = z.object({
    id: z.string().uuid({ message: 'ID inválido.' })
})


export const createColaborador = async (request, response) => {
    const createValidation = createSchema.safeParse(request.body)
    if (!createValidation.success) {
        response.status(400).json(createValidation.error)
        return
    }

    const { nome, email } = createValidation.data

    const novoColaborador = {
        nome,
        email
    }

    try {
        const colaboradorAdd = Colaborador.create(novoColaborador)
        response.status(201).json(colaboradorAdd)
    } catch (error) {
        console.error(error)
        response.status(500).json({ err: "Erro ao cadastrar tarefa" })
    }

}