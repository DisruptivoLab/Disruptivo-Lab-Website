/**
 * Utilidades para el formato de texto con variables
 */

type Variables = Record<string, string | number>;

/**
 * Reemplaza las variables en un texto usando el formato {variable}
 */
export const formatWithVariables = (text: string, variables: Variables): string => {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
};
