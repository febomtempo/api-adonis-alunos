import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Aluno from 'App/Models/Aluno'

export default class AlunosController {

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
    
    
        const aluno = await Aluno.create(body)
    
        response.status(201)

        console.log(JSON.stringify(aluno, ['id', 'nome', 'curso'], 0))
    
        return {
          message: 'Aluno registrado com sucesso!',
          data: aluno,
        }
    }
      

    public async index(){
        const aluno = await Aluno.all()
        console.log(JSON.stringify(aluno, ['id', 'nome', 'curso'], 2))
        return{
          data:aluno,
        }
    }
    
    public async show({params}: HttpContextContract){
        const aluno = await Aluno.findOrFail(params.id)
    
        console.log(JSON.stringify(aluno, ['id', 'nome', 'curso'], 0))
    
        return{
          data:aluno,
        }
    }

    public async destroy({params}: HttpContextContract){
        const aluno = await Aluno.findOrFail(params.id)
        await aluno.delete()

        console.log(JSON.stringify(aluno, ['id', 'nome', 'curso'], 0))
        return{
          message: 'Deletado com sucesso!',
          data:aluno,
        }
    }
    
    public async update({params, request}: HttpContextContract){
        const body = request.body()
        const aluno = await Aluno.findOrFail(params.id)
    
        aluno.nome = body.nome
        aluno.curso = body.curso
    
        
        await aluno.save()

        console.log(JSON.stringify(aluno, ['id', 'nome', 'curso'], 0))
    
        return{
          message: 'Atualizado com Sucesso',
          data: aluno,
        }
    }
}
