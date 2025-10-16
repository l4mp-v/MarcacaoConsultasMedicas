export default {
   colors: {
      primary: '#f40d0dff',      // Azul principal - confiança e saúde
      secondary: '#286ee7ff',    // Verde-claro - equilíbrio e vitalidade
      background: '#F5F9FC',   // Fundo mais limpo
      text: '#1E1E1E',         // Texto mais escuro
      error: '#E74C3C',        // Vermelho moderno
      success: '#27AE60',      // Verde sucesso
      warning: '#F1C40F',
      white: '#FFFFFF',
      border: '#DDE3E8',
   },
   typography: {
      title: {
         fontSize: 26,
         fontWeight: '700',
      },
      subtitle: {
         fontSize: 18,
         fontWeight: '600',
      },
      body: {
         fontSize: 16,
         fontWeight: '400',
      },
      caption: {
         fontSize: 13,
         fontWeight: '400',
      },
   },
   spacing: {
      small: 8,
      medium: 16,
      large: 24,
      xlarge: 32,
   },
   borderRadius: {
      small: 8,
      medium: 16,
      large: 24,
   },

   // 🧠 Nova seção de botões centralizada no tema
   button: {
      primary: {
         backgroundColor: '#2E86AB',  // Azul
         textColor: '#FFFFFF',
         borderColor: 'transparent',
      },
      secondary: {
         backgroundColor: '#FFFFFF',  // Branco
         textColor: '#E74C3C',        // Texto vermelho
         borderColor: '#E74C3C',      // Bordas vermelhas
      },
      disabled: {
         opacity: 0.6,
      },
   },
};
