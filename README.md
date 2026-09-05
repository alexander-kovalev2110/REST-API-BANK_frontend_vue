# Frontend Architecture (Vue 3)

- **Project description**: [PDF Document](https://github.com/alexander-kovalev2110/full-stack-web-proj_REST-API-BANK/blob/master/PHP-test.pdf)
- **Swagger (OpenAPI)**: [API Documentation](https://alexander-kovalev2110.github.io/full-stack-web-proj_REST-API-BANK/Swagger-OpenAPI/dist/index.html)

This project is built with **Vue 3 + Vuetify + Vuex + TypeScript** and follows the principles of a **layered architecture** with a clear separation of responsibilities between application layers.

---

## Architectural Principles

- **Separation of Concerns** — each layer is responsible for a single, well-defined area
- **Single Source of Truth** — application state is stored in the Vuex Store
- **Thin UI / Fat Store** — UI components are minimal, business logic lives outside components
- **Side Effects Isolation** — side effects are isolated in actions and Vuex plugins
- **Explicit Data Flow** — unidirectional data flow (UI → store → UI)
- **Backend-driven contracts** — API types are separated from application state types

---

## Application Layers

### 1. UI Layer (Presentation)

**Purpose:**  
Rendering the user interface with Vuetify and reacting to user interactions.

**Characteristics:**

- contains no business logic
- does not communicate with the API directly
- interacts with the store only via `dispatch`, `commit`, and computed properties

**Examples:**

```text
src/components/
  NavBar.vue
  AuthorDialog.vue
  TransDialog.vue
  TransTable.vue
src/views/
  AuthorPage.vue
  TransPage.vue
```

---

### 2. UI State Layer (Global UI)

**Purpose:**  
Managing global UI-related state shared across the entire application.

**Responsibilities:**

- global loading indicator
- centralized error handling
- dialog / notification-based error display (`ErrorDialog`, `LoadingDialog`)
- cross-feature UI behavior

**Characteristics:**

- contains no business logic
- independent from specific feature domains
- reacts to async lifecycle events (`loading / error`)
- implemented via Vuex `ui` module

**Example:**

```text
src/store/ui.ts
src/components/widgets/
  ErrorDialog.vue
  LoadingDialog.vue
```

---

### 3. Store Layer (State Management)

**Purpose:**  
Managing application state and business logic using Vuex 4.

**Composition:**

- `state` — reactive state description
- `mutations` — synchronous state changes
- `actions` — asynchronous operations (API requests)
- `plugins` — reactions to events (login/logout, resets, cascade effects)

**Example structure:**

```text
src/store/
  cust.ts
  trans.ts
  modal.ts
  ui.ts
  plugins/
    authPlugin.ts
```

---

### 4. API Layer (Data Access)

**Purpose:**  
Encapsulation of HTTP requests (Axios) and backend contracts.

**Principles:**

- API layer is completely unaware of Vuex
- returns raw backend responses
- uses its own Request / Response types

**Example:**

```text
src/infrastructure/api/
  cust/
    cust.api.ts
    cust.types.ts
  trans/
    trans.api.ts
    trans.types.ts
```

---

### 5. Domain / State Types

**Purpose:**  
Describing domain rules, validation, and internal data structures.

**Difference from API types:**

- API types — backend data format
- Store types — internal application data format

This separation allows:

- safe backend evolution
- centralized data transformation
- stable internal domain model

```text
src/domain/
  cust/
    cust.rules.ts
    cust.types.ts
  trans/
    trans.rules.ts
    trans.types.ts
```

---

### 6. Side Effects & Cross-cutting Logic

**Vuex Plugin (`authPlugin.ts`) is used for:**

- interacting with `localStorage`
- decoding JWT tokens
- cascading effects (resetting related state)
- logic that does not belong to any single module

👉 **Actions do not know about `localStorage` or global side effects.**

---

## Data Flow Example (Login)

```text
UI
 ↓ dispatch("cust/login", payload)
Action
 ↓
Domain (rules / API call)
 ↓ 
commit("loginSuccess", token)
 ↓
Vuex Plugin (authPlugin)
 ├─ save token to localStorage
 ├─ decode username -> commit("cust/setUsername", username)
 └─ reset dependent state -> commit("trans/resetTrans")
 ↓
custModule State (username updated)
 ↓
UI re-render
```

---

## Available Scripts

### Development & Build

* **Start dev server:**
  ```bash
  npm run dev
  ```

* **Type-check TypeScript:**
  ```bash
  npm run type-check
  ```

* **Build for production:**
  ```bash
  npm run build
  ```

* **Lint code:**
  ```bash
  npm run lint
  ```

### Testing

* **Run unit tests once:**
  ```bash
  npm run test:unit
  ```

* **Run unit tests in watch mode:**
  ```bash
  npm run test:watch
  ```
