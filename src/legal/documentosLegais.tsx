/**
 * MINUTAS DE TRABALHO. Não publicar sem completar RESPONSAVEL, CONTATO,
 * prazo de retenção e verificar práticas reais e enquadramento jurídico.
 */
export type SecaoLegal = { titulo: string; texto: string };

export const VERSAO_TERMOS = 'minuta-2026-10';
export const VERSAO_PRIVACIDADE = 'minuta-2026-10';

export const RESPONSAVEL = '[INFORMAR NOME / RAZÃO SOCIAL DO RESPONSÁVEL]';
export const CONTATO_PRIVACIDADE = '[INFORMAR CANAL DE CONTATO DE PRIVACIDADE]';
export const PRAZO_RETENCAO = '[DEFINIR PRAZOS E CRITÉRIOS REAIS DE RETENÇÃO]';

export const TERMOS: SecaoLegal[] = [
  {
    titulo: '1. Sobre o Conexão 360°',
    texto: 'O Conexão 360° é uma plataforma de interação e networking, com funcionalidades como perfis, publicações, conexões entre usuários, mensagens, notificações e conteúdos vinculados à experiência de eventos. Estes Termos estabelecem regras gerais para o uso do aplicativo.'
  },
  {
    titulo: '2. Cadastro e acesso',
    texto: 'O usuário deve fornecer informações corretas no cadastro e manter suas credenciais em sigilo. É responsável pelas ações praticadas em sua conta, salvo situações decorrentes de falhas imputáveis à plataforma ou a terceiros. Deve comunicar ao suporte caso suspeite de acesso indevido.'
  },
  {
    titulo: '3. Publicações e convivência',
    texto: 'Ao publicar conteúdo, o usuário declara possuir autorização para compartilhá-lo. Não é permitido publicar materiais ilegais, fraudulentos, discriminatórios, ofensivos a direitos de terceiros ou que exponham dados pessoais de outras pessoas sem fundamento adequado. O usuário deve respeitar os demais participantes.'
  },
  {
    titulo: '4. Denúncias e moderação',
    texto: 'Publicações podem ser denunciadas e submetidas à análise da administração. A plataforma poderá ocultar conteúdos e aplicar medidas proporcionais em caso de infração, conforme suas regras de moderação, preservando registros quando necessário e dentro da legislação aplicável.'
  },
  {
    titulo: '5. Perfil e compartilhamento',
    texto: 'Informações adicionadas ao perfil, fotos, publicações, comentários e interações podem ser vistas por outros usuários conforme as regras de visibilidade implementadas no aplicativo. Evite compartilhar informações que não deseja tornar visíveis.'
  },
  {
    titulo: '6. Privacidade',
    texto: 'O tratamento de dados pessoais é descrito na Política de Privacidade, disponível separadamente e acessível antes da criação da conta. Os Termos de Uso não substituem a Política de Privacidade nem representam consentimento genérico para qualquer tratamento de dados.'
  },
  {
    titulo: '7. Alterações e contato',
    texto: `Estes Termos poderão ser atualizados, com comunicação adequada quando necessário. Responsável pela plataforma: ${RESPONSAVEL}. Canal de atendimento: ${CONTATO_PRIVACIDADE}.`
  }
];

export const PRIVACIDADE: SecaoLegal[] = [
  {
    titulo: '1. Quem trata seus dados',
    texto: `Controlador ou organização responsável pelas decisões sobre o tratamento: ${RESPONSAVEL}. Canal para dúvidas e exercício de direitos: ${CONTATO_PRIVACIDADE}. Estes dados devem ser preenchidos e confirmados antes da publicação.`
  },
  {
    titulo: '2. Quais dados podem ser tratados',
    texto: 'Conforme o uso da plataforma, podem ser tratados dados de cadastro e autenticação (como nome e e-mail), dados do perfil (foto, estado, área de atuação, apresentação e links informados), publicações, comentários, curtidas, conexões, mensagens, denúncias, notificações e registros técnicos necessários à segurança e operação. A lista final deve ser conferida com o sistema efetivamente publicado.'
  },
  {
    titulo: '3. Para quais finalidades',
    texto: 'Os dados podem ser necessários para criar e proteger contas, identificar participantes, disponibilizar perfis e conteúdos, permitir interações entre usuários, realizar moderação, oferecer suporte e manter a segurança e o funcionamento da plataforma. Cada tratamento deve ter finalidade definida e base legal adequada; nem todos dependem de consentimento.'
  },
  {
    titulo: '4. Visibilidade e compartilhamento',
    texto: 'O conteúdo disponibilizado em perfis e publicações poderá ser exibido a outras pessoas segundo as permissões do aplicativo. O eventual uso de hospedagem, serviços de infraestrutura, e-mail ou outros fornecedores e qualquer compartilhamento externo devem ser descritos aqui depois da confirmação dos prestadores efetivamente utilizados, de seus papéis e das finalidades do acesso.'
  },
  {
    titulo: '5. Segurança',
    texto: 'O projeto deve adotar controles apropriados, como autenticação, restrição de permissões, conexões seguras, proteção de credenciais e procedimentos de resposta a incidentes. Nenhuma tecnologia elimina todos os riscos. Os detalhes anunciados nesta política precisam corresponder às medidas realmente implementadas.'
  },
  {
    titulo: '6. Retenção e exclusão',
    texto: `Os dados devem ser mantidos apenas pelo período necessário para as finalidades informadas ou por prazos exigidos ou autorizados pela legislação. Critérios e prazos aplicáveis: ${PRAZO_RETENCAO}. A exclusão da conta não implica necessariamente eliminação imediata de todo registro quando houver fundamento legítimo de retenção.`
  },
  {
    titulo: '7. Direitos dos titulares',
    texto: 'Nos termos da LGPD, você pode solicitar, conforme o caso, confirmação de tratamento, acesso, correção, informações sobre compartilhamento, portabilidade, anonimização, bloqueio ou eliminação quando cabível, além de informações e revogação de consentimentos efetivamente concedidos. Para realizar uma solicitação, utilize o canal informado nesta política.'
  },
  {
    titulo: '8. Crianças, adolescentes e atualizações',
    texto: 'Caso a plataforma seja disponibilizada a crianças ou adolescentes, deverão ser definidos controles e informações específicas compatíveis com a legislação aplicável antes do lançamento. Atualizações relevantes desta política deverão ser apresentadas com transparência aos usuários.'
  }
];
