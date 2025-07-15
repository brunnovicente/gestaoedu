import Discente from "../models/Discente.js";
import Usuario from "../models/Usuario.js";
import { Op } from 'sequelize';
import qrcode from 'qrcode';



class DiscenteController {

    index = async function(req, res) {

        const discentes = await Discente.findAll({
            order: [['nome', 'ASC']]
        });
        res.render('discente/index', { discentes: discentes });

    }

    buscar = async function(req, res) {
        let busca = req.body.busca

        const discentes = await Discente.findAll({
            where: {
                nome: {
                    [Op.like]: `%${busca}%`
                }
            },
            order: [['nome', 'ASC']]
        })

        res.render('discente/index', { discentes: discentes });

    }

    ativar = async function(req, res) {
        const id = req.params.id;
        const discente = await Discente.findOne({where: {id: id}});
        discente.codigo = this.gerarCodigo()
        discente.status = 1

        const ingresso1 = {

        }

        const ingresso2 = {

        }

        try {
            // Gera QR Code como base64 (data:image/png;base64,...)
            const codigo = await qrcode.toDataURL('http://teste.com', {
                errorCorrectionLevel: 'H'
            });

            res.render('discente/ingresso', { codigo: codigo });
        } catch (err) {
            console.error('Erro ao gerar QR Code:', err);
            return res.status(500).json({ erro: 'Erro ao gerar QR Code' });
        }

    }



    gerarCodigo = function (){
        const agora = new Date();

        // Concatena partes da data/hora
        const componentes = [
            agora.getFullYear().toString().slice(2),   // Ano (últimos 2 dígitos)
            (agora.getMonth() + 1).toString().padStart(2, '0'),  // Mês
            agora.getDate().toString().padStart(2, '0'),         // Dia
            agora.getHours().toString().padStart(2, '0'),        // Hora
            agora.getMinutes().toString().padStart(2, '0'),      // Minutos
            agora.getSeconds().toString().padStart(2, '0'),      // Segundos
            agora.getMilliseconds().toString().padStart(3, '0')  // Milissegundos
        ].join('');

        // Usa os últimos 6 dígitos da string para o código
        return componentes.slice(-6);
    }

    gerarCodigoUnico = function (){
        const timestamp = Date.now().toString(36); // base 36 do timestamp
        const aleatorio = Math.random().toString(36).substr(2, 5); // 5 caracteres aleatórios

        const codigo = `${timestamp}${aleatorio}`.toUpperCase();
        return codigo
    }

}

export default new DiscenteController();