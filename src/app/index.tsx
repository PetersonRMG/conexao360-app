import { StyleSheet, View, Text, ImageBackground, Image, Pressable } from "react-native";


export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/img/fundoLogin.png')}
        style={styles.background}
        resizeMode="stretch"

      >

        <View style={styles.conteudo}>
          <View style={styles.conteudoTopo}>
            <Image
              source={require('@/assets/images/img/logo.svg')}>
            </Image>
            <Text style={styles.titulo}>Advocacia  {'\n'} E<Text style={styles.x}>x</Text>ponencial</Text>
            <Text style={styles.subtitulo}>Rede Exclusiva</Text>
          </View>
          <View style={styles.conteudoBtns}>

            <Pressable style={[styles.btnEntrar, styles.btn]}>Entrar</Pressable>
            <Pressable style={[styles.btnCriar, styles.btn]}>Criar Conta</Pressable>
            <Text style={styles.subtitulo}>Networking de alto nivel</Text>
            <Text>Conhecimento <Text style={styles.x}>Exponencial</Text></Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffff"
  },
  background: {
    width: '100%',
    maxWidth: 440,
    height: '100%',
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conteudoTopo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:'auto',
  },
  conteudoBtns: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffff',
    textTransform: 'uppercase',
  },
  x: {
    color: '#D6B26A',
  },
  subtitulo: {
    fontSize: 20,
    color: '#D6B26A',
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  btnEntrar: {
    color: '#2D1B33',
    backgroundColor: '#D6B26A',


  },
  btnCriar: {
    color: '#D6B26A',
    backgroundColor: '#2D1B33',
  },
  btn: {
    width: '90%',
    borderRadius: 10,
    margin: 'auto',
    textAlign: 'center',
    paddingBlock: 5,
    marginBlock: 5,

  }
})