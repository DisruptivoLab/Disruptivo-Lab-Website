Subtarea 1.1.2.5 — Reset de /services

Estado: Completado

Cambios:
- Archivado implícito y reemplazo de `src/app/services/page.tsx` por una versión mínima sin dependencias pesadas.
- Eliminadas traducciones antiguas `src/locales/modular/pages/services/{es,en}.json` para evitar referencias rotas.
- Dejado preparado para nueva arquitectura: landing ligera + subpáginas inmersivas `/services/[slug]` sin header/footer.

Notas:
- CTA usa `PageCTA` que abre el ContactModal por defecto.
- Próximo paso: definir lista de servicios y slugs, copy del hero y “por qué nosotros”.