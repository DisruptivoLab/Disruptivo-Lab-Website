module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Permitir tipos 'any' temporalmente durante desarrollo
    '@typescript-eslint/no-explicit-any': 'warn',
    // Permitir require imports en ciertos contextos
    '@typescript-eslint/no-require-imports': 'warn',
    // Permitir variables no usadas con _ prefix
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // Permitir asignación a variable module en contextos específicos
    '@next/next/no-assign-module-variable': 'warn',
    // Permitir fuentes personalizadas
    '@next/next/no-page-custom-font': 'warn'
  },
  overrides: [
    {
      // Para archivos de traducción y contextos
      files: ['**/contexts/**/*.tsx', '**/hooks/**/*.ts', '**/locales/**/*.json'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn'
      }
    }
  ]
};
