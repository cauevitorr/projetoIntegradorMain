import Funcionario from "../model/funcionarioModel.js"
import { z } from "zod"

//validações
const createSchema = z.object({
    nome: z.string({
        invalid_type_error: "O nome deve ser um texto",
        required_error: "Nome é obrigatório"
    }),
    funcao: z.string({
        invalid_type_error: "A função deve ser um texto",
        required_error: "Função é obrigatória"
    }),
    treinamento: z.string({
        invalid_type_error: "O treinamento deve ser um texto",
        required_error: "Treinamento é obrigatório"
    }),
    status_treinamento: z.string({
        invalid_type_error: "O treinamento deve ser um texto",
        required_error: "Treinamento é obrigatório"
    }),
    data_inicio: z.string({
        required_error: "Data é obrigatória"
    }).min(10, { message: "A data deve conter no mínimo 11 caracteres." }),
    data_conclusao: z.string({
        required_error: "Data é obrigatória"
    }).min(10, { message: "A data deve conter no mínimo 11 caracteres." }),
})

const idSchema = z.object({
    id: z.string({ message: 'ID inválido.' })
})

const updateSchema = z.object({
    nome: z.string(),
    funcao: z.string(),
    treinamento: z.string(),
    status_treinamento: z.enum(["pendente", "cursando", "concluido"]),
    data_inicio: z.string().min(10, { message: "O data deve conter no mínimo 11 caracteres." }),
    data_conclusao: z.string().min(10, { message: "O data deve conter no mínimo 11 caracteres." })
})

//controllers
export const createFuncionario = async (request, response) => {
    const createValidation = createSchema.safeParse(request.body)
    if(!createValidation.success){
        response.status(400).json(createValidation.error)
        return
    }

    const {nome, funcao, treinamento, status_treinamento, data_inicio, data_conclusao} = createValidation.data

    const verificaNome = await Funcionario.findOne({where: {nome}})

    if(verificaNome){
        response.status(400).json({message: "Funcionario já existe."})
        return
    }

    const novoColaborador = {
        nome,  
        funcao,
        treinamento, 
        status_treinamento,
        data_inicio, 
        data_conclusao
    }
    try{
        const insertColaborador = Funcionario.create(novoColaborador)
        response.status(201).json(insertColaborador)
    } catch(error){
        console.error(error)
        response.status(500).json({message: "Erro ao cadastrar colaborador"})
    }
}

export const getAll = async (request, response) => {
    //GET -> 3333/api/tarefas?pages=1&limit=10

    const page = parseInt(request.query.page) || 1
    const limit = parseInt(request.query.limit) || 10
    const offset = (page - 1) * 10

    try {
        const funcionarios = await Funcionario.findAndCountAll({
            limit,
            offset,
        })

        const totalPaginas = Math.ceil(funcionarios.count / limit)

        response.status(200).json({
            totalFuncionairos: funcionarios.count,
            totalPaginas,
            paginaAtual: page,
            intensPorPagina: limit,
            proximaPagina: totalPaginas === 0 ? null : `http://localhost:3333/api/funcionairos/page= ${page + 1}`,
            funcionarios: funcionarios.rows
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({ err: "Erro ao buscar os funcionarios" })
    }
}

export const updateFuncionario = async (request, response) => {
    const idValidation = idSchema.safeParse(request.params)
    if (!idValidation.success) {
        response.status(400).json({ message: idValidation.error })
        return
    }

    const id = idValidation.data.id


    const updateValidation = updateSchema.safeParse(request.body)
    if (!updateValidation.success) {
        response.status(400).json({ message: updateValidation.error })
        return
    }

    const {nome, funcao, treinamento, status_treinamento, data_inicio, data_conclusao} = updateValidation.data

    const funcionarioAtualizado = {nome, funcao, treinamento, status_treinamento, data_inicio, data_conclusao}

    try {
        const [numberAffectRow] = await Funcionario.update(funcionarioAtualizado, { where: { id } })

        if (numberAffectRow <= 0) {
            response.status(404).json({ err: "Funcionario não encontrado." })
            return
        }
        response.status(500).json({ message: "Funcionario atualizado com sucesso." })
    } catch (error) {
        console.error(error)
        response.status(500).json({ err: "Erro ao atualizar o funcionario." })
    }

}

export const deleteFuncionario = async (request, response) => {
    const idValidation = idSchema.safeParse(request.params)
    if (!idValidation.success) {
        response.status(400).json({ message: idValidation.error })
        return
    }

    const id = idValidation.data.id

    try {
        const funcionarioDeletado = await Funcionario.destroy({
            where: { id }
        })
          console.log(funcionarioDeletado)

        if (funcionarioDeletado === 0) {
            response.status(400).json({ message: "Funcionario não existe" })
            return
        }

        response.status(200).json({ message: "Funcionario excluído." });
    } catch (error) {
        console.error(error)
        response.status(500).json({ message: "Erro ao excluir funcionrio." })
    }
}