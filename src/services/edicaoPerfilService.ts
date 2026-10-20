import { apiFetch } from "@/services/api";
import type { ImagePickerAsset } from "expo-image-picker";
import { Platform } from "react-native";

export type DadosEdicaoPerfil = {
  nome_usuario: string;
  area_atuacao_usuario: string;
  estado_usuario: string;
  sobre_usuario: string;
  instagram_usuario: string;
  linkedin_usuario: string;
  youtube_usuario: string;
  tiktok_usuario: string;
  facebook_usuario: string;
  site_usuario: string;
};

export type UsuarioEditado = {
  id_usuario: number;
  nome_usuario: string;
  email_usuario: string;
  perfil_usuario: string;
  foto_usuario: string | null;
  area_atuacao_usuario: string | null;
  estado_usuario: string | null;
  sobre_usuario: string | null;
  instagram_usuario: string | null;
  linkedin_usuario: string | null;
  youtube_usuario: string | null;
  tiktok_usuario: string | null;
  facebook_usuario: string | null;
  site_usuario: string | null;
};

type RespostaEdicaoPerfil = {
  success: boolean;
  message?: string;
  data: UsuarioEditado;
};

// PUT JSON quando não há foto. Com foto, POST multipart + _method=PUT
// para que o PHP processe o arquivo corretamente.
export async function atualizarMeuPerfil(
  token: string,
  campos: DadosEdicaoPerfil,
  imagem?: ImagePickerAsset | null,
): Promise<RespostaEdicaoPerfil> {
  const dados: DadosEdicaoPerfil = {
    nome_usuario: campos.nome_usuario.trim(),
    area_atuacao_usuario: campos.area_atuacao_usuario.trim(),
    estado_usuario: campos.estado_usuario.trim().toUpperCase(),
    sobre_usuario: campos.sobre_usuario.trim(),
    instagram_usuario: campos.instagram_usuario.trim(),
    linkedin_usuario: campos.linkedin_usuario.trim(),
    youtube_usuario: campos.youtube_usuario.trim(),
    tiktok_usuario: campos.tiktok_usuario.trim(),
    facebook_usuario: campos.facebook_usuario.trim(),
    site_usuario: campos.site_usuario.trim(),
  };

  if (!imagem) {
    return apiFetch<RespostaEdicaoPerfil>("/api/v1/usuario", {
      method: "PUT",
      token,
      body: JSON.stringify(dados),
    });
  }

  const form = new FormData();
  form.append("_method", "PUT");

  Object.entries(dados).forEach(([chave, valor]) => {
    form.append(chave, valor);
  });

  if (Platform.OS === "web") {
    // O ImagePickerAsset.file pode ser undefined no navegador.
    let arquivo: Blob | undefined = imagem.file;

    if (!arquivo) {
      const resposta = await fetch(imagem.uri);
      if (!resposta.ok) {
        throw new Error("Não foi possível carregar a foto selecionada.");
      }
      arquivo = await resposta.blob();
    }

    if (!arquivo) {
      throw new Error("Nenhuma foto válida foi encontrada.");
    }

    form.append("foto_usuario", arquivo, imagem.fileName ?? "perfil.jpg");
  } else {
    const mimeType = imagem.mimeType ?? "image/jpeg";
    const extensao = mimeType.split("/")[1] || "jpg";
    const nomeArquivo = imagem.fileName ?? `perfil.${extensao}`;

    // Estrutura aceita pelo FormData do React Native em Android/iOS.
    form.append("foto_usuario", {
      uri: imagem.uri,
      name: nomeArquivo,
      type: mimeType,
    } as unknown as Blob);
  }

  return apiFetch<RespostaEdicaoPerfil>("/api/v1/usuario", {
    method: "POST",
    token,
    body: form,
  });
}
