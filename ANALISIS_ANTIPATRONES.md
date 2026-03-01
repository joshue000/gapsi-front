# Análisis de Antipatrones y Malas Prácticas - Gapsi Front

## 1. Antipatrones Detectados (AP)

### products.component.ts

**AP-1: Manual Change Detection**
- **Línea 43**: Llamada manual a `cdr.detectChanges()` en cada actualización de estado.
- **Problema**: Indica que el componente no está usando la estrategia de detección de cambios de Angular correctamente.
- **Impacto**: Puede causar problemas de rendimiento y dificulta el debugging.
- **Solución**: Usar `async pipe` en el template o `ChangeDetectionStrategy.OnPush`.

**AP-2: Acceso directo a window.innerWidth**
- **Línea 59**: `window.innerWidth` accedido directamente sin abstracción.
- **Problema**: Dificulta testing (no se puede mockear fácilmente) y viola el principio de inyección de dependencias.
- **Impacto**: Tests unitarios requieren configuración compleja del objeto window.
- **Solución**: Crear un servicio `WindowService` o `ViewportService` inyectable.

**AP-3: Suscripción manual sin unsubscribe automático**
- **Línea 36**: Suscripción manual que requiere cleanup en ngOnDestroy.
- **Problema**: Riesgo de memory leaks si se olvida el unsubscribe.
- **Impacto**: Posibles fugas de memoria en navegación frecuente.
- **Solución**: Usar `async pipe`, `takeUntil`, o `DestroyRef` (Angular 16+).

### header.component.ts

**AP-4: Router público en constructor**
- **Línea 17**: `public router: Router` expuesto públicamente.
- **Problema**: Viola encapsulación, permite acceso directo desde el template.
- **Impacto**: El template puede acceder a métodos del router directamente, creando acoplamiento.
- **Solución**: Cambiar a `private` y crear métodos/propiedades específicas.

**AP-5: Getter con lógica de negocio**
- **Línea 41**: `get isProductsPage()` ejecuta comparación en cada ciclo de detección.
- **Problema**: Se ejecuta múltiples veces innecesariamente en cada change detection.
- **Impacto**: Puede afectar rendimiento si la lógica es compleja.
- **Solución**: Calcular una vez en ngOnInit o usar observable con async pipe.

### app.ts

**AP-6: Suscripción sin unsubscribe**
- **Línea 20-25**: Suscripción a router.events sin cleanup.
- **Problema**: Memory leak potencial, aunque el componente root vive toda la aplicación.
- **Impacto**: Bajo en este caso específico, pero mala práctica.
- **Solución**: Usar `takeUntilDestroyed()` o guardar subscription para cleanup.

### welcome.component.ts

**AP-7: Ruta hardcodeada en navegación**
- **Línea 30**: `this.router.navigate(['/productos'])` con string literal.
- **Problema**: Viola DRY, la ruta está duplicada en múltiples lugares.
- **Impacto**: Dificulta refactorización de rutas.
- **Solución**: Ya existe `constants.routes.productos`, debería usarse.

### abstract-scroll.component.ts

**AP-8: setTimeout sin clearTimeout**
- **Línea 33**: `setTimeout` sin guardar referencia para posible cancelación.
- **Problema**: Si el componente se destruye antes del timeout, puede causar errores.
- **Impacto**: Posibles errores en consola o comportamiento inesperado.
- **Solución**: Guardar referencia del timeout y limpiarlo en ngOnDestroy.

---

## 2. Malas Prácticas Detectadas (MP)

### products.component.ts

**MP-1: Inicialización de propiedades con valores por defecto innecesarios**
- **Líneas 20-25**: Propiedades inicializadas con valores que serán sobrescritos inmediatamente.
- **Problema**: Código redundante, los valores iniciales nunca se usan.
- **Impacto**: Confusión sobre el estado inicial real del componente.
- **Solución**: Usar `undefined` o tipos opcionales hasta que lleguen los datos reales.

**MP-2: Múltiples responsabilidades en un componente**
- **Componente completo**: Maneja estado, scroll, resize, y lógica de paginación.
- **Problema**: Viola Single Responsibility Principle.
- **Impacto**: Componente difícil de testear y mantener.
- **Solución**: Extraer lógica de resize a un servicio o directiva.

### product-card.component.ts

**MP-3: Input sin validación**
- **Línea 12**: `@Input() product!: Product;` usa non-null assertion sin validación.
- **Problema**: Si el input no se pasa, causará error en runtime.
- **Impacto**: Errores difíciles de debuggear.
- **Solución**: Agregar validación en ngOnInit o usar `@Input({ required: true })` (Angular 16+).

### header.component.ts

**MP-4: Lógica de UI en el componente**
- **Línea 27-28**: `toggleMenu()` maneja estado de UI directamente.
- **Problema**: Estado de UI debería estar en el template o en un servicio de UI.
- **Impacto**: Dificulta testing y reutilización.
- **Solución**: Considerar usar directivas de Angular o mover a servicio de UI.

**MP-5: Métodos que hacen múltiples cosas**
- **Líneas 31-33, 36-38**: Métodos que cierran menú Y ejecutan acción.
- **Problema**: Viola Single Responsibility.
- **Impacto**: Dificulta reutilización y testing.
- **Solución**: Separar cierre de menú de la acción principal.

### cart.component.ts

**MP-6: Lógica de negocio en evento de UI**
- **Línea 20-25**: Lógica de validación y dispatch en el handler del evento.
- **Problema**: Mezcla lógica de presentación con lógica de negocio.
- **Impacto**: Dificulta testing de la lógica de negocio.
- **Solución**: Extraer validación a método privado separado.

### product.effects.ts

**MP-7: Manejo de errores genérico**
- **Línea 19**: `error.message` puede ser undefined o no descriptivo.
- **Problema**: Mensajes de error poco informativos para el usuario.
- **Impacto**: Mala experiencia de usuario en caso de errores.
- **Solución**: Crear servicio de manejo de errores con mensajes amigables.

---

## 3. Violaciones de Principios SOLID

### products.component.ts

**SOLID-1: Violación de Single Responsibility (SRP)**
- El componente maneja: estado, scroll, resize, paginación, y renderizado.
- **Solución**: Extraer responsabilidades a servicios o directivas.

**SOLID-2: Violación de Dependency Inversion (DIP)**
- **Línea 59**: Dependencia directa de `window` (detalle de implementación).
- **Solución**: Inyectar abstracción (interface) en lugar de implementación concreta.

### header.component.ts

**SOLID-3: Violación de Open/Closed Principle (OCP)**
- Agregar nuevas acciones al menú requiere modificar el componente.
- **Solución**: Usar configuración externa o patrón Strategy para acciones.

---

## 4. Code Smells Detectados (CS)

### products.component.ts

**CS-1: Feature Envy**
- **Línea 36**: Componente crea instancia de ProductsStateBuilder directamente.
- **Problema**: El componente conoce demasiado sobre cómo construir su estado.
- **Solución**: Inyectar el builder o usar un servicio facade.

**CS-2: Primitive Obsession**
- **Líneas 16-18**: Constantes numéricas sin tipo semántico.
- **Problema**: Los números no tienen significado sin contexto.
- **Solución**: Crear tipos o interfaces (ej: `ViewportBreakpoint`, `PageSize`).

### header.component.ts

**CS-3: Inappropriate Intimacy**
- **Línea 42**: Acceso directo a `router.url` desde el getter.
- **Problema**: Acoplamiento fuerte con implementación interna del Router.
- **Solución**: Suscribirse a eventos de navegación y cachear el resultado.

### welcome.component.ts

**CS-4: Lazy Class**
- El componente solo despacha una acción y navega.
- **Problema**: Componente con muy poca lógica, podría ser más simple.
- **Solución**: Considerar si realmente necesita ser un componente separado.

---

## 5. Problemas de Rendimiento (PR)

### header.component.ts

**PR-1: Getter ejecutado en cada change detection**
- **Línea 41**: `isProductsPage` se ejecuta múltiples veces por segundo.
- **Impacto**: Comparaciones de strings innecesarias.
- **Solución**: Calcular una vez y cachear, o usar observable.

### products.component.ts

**PR-2: Change detection manual innecesaria**
- **Línea 43**: `cdr.detectChanges()` fuerza change detection completo.
- **Impacto**: Puede causar re-renderizado innecesario de todo el árbol.
- **Solución**: Usar OnPush strategy y async pipe.

### abstract-scroll.component.ts

**PR-3: Debounce time muy bajo**
- **Línea 9**: `SCROLL_DEBOUNCE_TIME = 100` puede ser demasiado frecuente.
- **Impacto**: Muchas ejecuciones de handleScroll en scroll rápido.
- **Solución**: Aumentar a 150-200ms o hacer configurable.

---

## 6. Problemas de Testing (PT)

### products.component.ts

**PT-1: Difícil de testear por dependencia de window**
- **Línea 59**: `window.innerWidth` requiere mock complejo.
- **Solución**: Inyectar servicio de viewport.

**PT-2: Lógica en constructor de clase auxiliar**
- **Línea 36**: `new ProductsStateBuilder(this.store)` dificulta mocking.
- **Solución**: Inyectar el builder como dependencia.

### header.component.ts

**PT-3: Router público dificulta testing**
- **Línea 17**: Tests pueden acceder y modificar router directamente.
- **Solución**: Hacer privado y exponer solo lo necesario.

---

## 7. Problemas de Seguridad (PS)

### product-card.component.ts

**PS-1: Datos no sanitizados en drag & drop**
- **Línea 18**: `productSku` se pasa sin validación.
- **Problema**: Aunque es bajo riesgo, no hay validación del formato.
- **Solución**: Validar formato del SKU antes de usar.

### cart.component.ts

**PS-2: Datos de dataTransfer sin validación**
- **Línea 22**: `productSku` obtenido sin validar que sea string válido.
- **Problema**: Podría recibir datos maliciosos o corruptos.
- **Solución**: Validar y sanitizar antes de dispatch.

---

## Resumen de Métricas

- **Antipatrones detectados**: 8
- **Malas prácticas detectadas**: 7
- **Violaciones SOLID**: 3
- **Code Smells**: 4
- **Problemas de rendimiento**: 3
- **Problemas de testing**: 3
- **Problemas de seguridad**: 2

**Total de issues**: 30

---

## Prioridades de Corrección

### 🔴 Alta Prioridad (Crítico)
1. **AP-6**: Suscripción sin unsubscribe en app.ts
2. **AP-3**: Suscripciones manuales sin cleanup automático
3. **PS-2**: Validación de datos en drag & drop
4. **PR-2**: Change detection manual innecesaria

### 🟡 Media Prioridad (Importante)
1. **AP-2**: Abstracción de window.innerWidth
2. **AP-4**: Router público en header
3. **AP-5**: Getter con lógica ejecutándose constantemente
4. **MP-1**: Inicialización redundante de propiedades
5. **MP-3**: Input sin validación

### 🟢 Baja Prioridad (Mejora)
1. **CS-1**: Feature Envy en products component
2. **CS-2**: Primitive Obsession
3. **MP-4**: Lógica de UI en componente
4. **MP-7**: Manejo de errores genérico
5. **AP-7**: Rutas hardcodeadas

---

## Recomendaciones Generales

### 1. Adoptar OnPush Change Detection Strategy
- Mejoraría rendimiento significativamente
- Forzaría uso de async pipe (mejor práctica)
- Eliminaría necesidad de `cdr.detectChanges()`

### 2. Crear servicios de abstracción
- `WindowService` para acceso a window
- `ErrorHandlerService` para manejo centralizado de errores
- `NavigationService` para encapsular lógica de navegación

### 3. Implementar validación de inputs
- Usar decoradores de validación
- Agregar guards de tipo en runtime
- Implementar error boundaries

### 4. Mejorar estrategia de unsubscribe
- Usar `takeUntilDestroyed()` (Angular 16+)
- Implementar patrón `takeUntil` con Subject
- Preferir `async pipe` cuando sea posible

### 5. Refactorizar componentes grandes
- Extraer lógica a servicios
- Crear componentes más pequeños y enfocados
- Aplicar principio de Single Responsibility

---

## Conclusión

El código tiene una base sólida con buenas prácticas en arquitectura (NgRx, separación de concerns), pero presenta varios antipatrones y malas prácticas que pueden afectar:

- **Mantenibilidad**: Componentes con múltiples responsabilidades
- **Rendimiento**: Change detection manual y getters costosos
- **Testing**: Dependencias difíciles de mockear
- **Seguridad**: Falta de validación en algunos puntos

La mayoría de los issues son de severidad media-baja y pueden corregirse gradualmente sin afectar el funcionamiento actual de la aplicación.
