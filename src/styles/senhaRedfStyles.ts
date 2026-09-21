import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";
import { CoresTema, temaEscuro } from "./temas";

export const criarSenhaRedfStyle = (tema: CoresTema) => StyleSheet.create({
  conteudo: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 18,
  },

  conteudoTopo: {
    width: "100%",
    marginTop: 60,
    alignItems: "flex-start",
  },

  subtitulo: {
    color: tema.destaque,
    fontSize: fontes.subtitulo,
    fontFamily: fontes.normal,
    marginBottom: 6,
  },

  titulo: {
    color: tema.texto,
    fontSize: fontes.titulo,
    fontFamily: fontes.extraNegrito,
    marginBottom: 12,
  },

  tituloDourado: {
    color: tema.destaque,
  },

  inf: {
    color: tema.texto,
    lineHeight: 14,
    opacity: 0.9,
  },

  /*
    BOTÃO ENVIAR NOVO CÓDIGO
    */

  btnEnviar: {
    width: "75%",
    height: 50,
    backgroundColor: tema.destaque,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 55,
  },

  btnEnviarPressed: {
    backgroundColor: tema.destaquePressed,
    transform: cores.btnPress,
  },

  txtEnviar: {
    fontSize: fontes.btn,
    color: tema.textoSobreDestaque,
    fontFamily: fontes.extraNegrito,
  },

  /*
    BOTÃO VOLTAR AO LOGIN
    */

  btnVoltar: {
    width: "75%",
    height: 50,
    backgroundColor: tema.card,
    borderWidth: 1,
    borderColor: tema.destaque,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 55,
  },

  btnVoltarPressed: {
    backgroundColor: tema.pressionado,
    transform: cores.btnPress,
  },

  txtVoltar: {
    fontSize: fontes.btn,
    color: tema.destaque,
    fontFamily: fontes.extraNegrito,
  },
});

// Compatibilidade: mantém os imports atuais funcionando no tema escuro.
// Para tema dinâmico, use criarSenhaRedfStyle(coresTema) dentro do componente.
export const senhaRedfStyle = criarSenhaRedfStyle(temaEscuro);
