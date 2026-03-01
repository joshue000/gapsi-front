# 🛒 Gapsi Front - E-Commerce Application

[![Angular](https://img.shields.io/badge/Angular-21.2.0-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Modern e-commerce application built with Angular 21, featuring state management with NgRx, drag-and-drop functionality, and clean architecture principles.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Design Patterns](#design-patterns)
- [Getting Started](#getting-started)
- [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Code Quality](#code-quality)

## 🎯 Overview

Gapsi Front is an application that demostrates modern Angular development practices, including:

- **State Management**: Centralized state with NgRx Store
- **Reactive Programming**: RxJS observables throughout
- **Performance Optimization**: OnPush change detection strategy
- **Clean Architecture**: Separation of concerns and SOLID principles
- **Design Patterns**: Builder, Factory, Template Method, and more
- **Drag & Drop**: Intuitive product-to-cart interaction
- **Responsive Design**: Mobile-first approach

## 🛠 Tech Stack

### Core
- **Angular 21.2.0** - Frontend framework
- **TypeScript 5.7** - Type-safe development
- **RxJS 7.8** - Reactive programming

### State Management
- **NgRx Store** - State container
- **NgRx Effects** - Side effects management
- **NgRx Selectors** - Memoized state queries

### UI/UX
- **Font Awesome** - Icon library
- **CSS3** - Custom styling
- **Drag & Drop API** - Native browser API

### Development & Build
- **Angular CLI** - Development tooling
- **Docker** - Containerization
- **Nginx** - Production web server

## 🏗 Architecture

### Clean Architecture Layers

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (Components, Templates, Styles)    │
├─────────────────────────────────────┤
│         Application Layer           │
│    (State Management - NgRx)        │
├─────────────────────────────────────┤
│          Domain Layer               │
│   (Services, Interfaces, Models)    │
├─────────────────────────────────────┤
│       Infrastructure Layer          │
│      (HTTP, External APIs)          │
└─────────────────────────────────────┘
```

### State Management Flow

```
Component → Action → Effect → API → Action → Reducer → Selector → Component
```

## 🎨 Design Patterns

This project implements several design patterns for maintainability and scalability:

### Pattern Nomenclature

- `[DP:Builder]` - Builder Pattern
- `[DP:Factory]` - Factory Pattern
- `[DP:Template]` - Template Method Pattern
- `[DP:Observer]` - Observer Pattern
- `[DP:Singleton]` - Singleton Pattern
- `[DP:Facade]` - Facade Pattern

### Implemented Patterns

| Pattern | Location | Purpose |
|---------|----------|---------|
| **Builder** | `products-state.builder.ts` | Constructs complex component state |
| **Factory** | `drag-icon.factory.ts` | Creates drag icons with Renderer2 |
| **Template Method** | `abstract-scroll.component.ts` | Reusable scroll behavior |
| **Observer** | Throughout (RxJS) | Reactive data streams |
| **Singleton** | Services (`providedIn: 'root'`) | Single instance services |
| **Facade** | NgRx Store | Simplified state management API |
| **Command** | NgRx Actions | Encapsulated operations |
| **Strategy** | NgRx Effects | Interchangeable side effects |
| **Mediator** | NgRx Store | Component communication |

### Pattern Details

#### [DP:Builder] - State Builder Pattern
**File**: `src/app/pages/products/products-state.builder.ts`

Consolidates 6 separate subscriptions into a single observable stream:
```typescript
// Before: 6 separate subscriptions
// After: 1 consolidated observable with Builder
const state$ = stateBuilder.build();
```

#### [DP:Factory] - Drag Icon Factory
**File**: `src/app/shared/components/product-card/drag-icon.factory.ts`

Encapsulates DOM creation logic using Renderer2:
```typescript
dragIconFactory.createDragIcon(event);
```

#### [DP:Template] - Abstract Scroll Component
**File**: `src/app/shared/components/abstract-scroll.component.ts`

Provides reusable scroll behavior with template methods:
```typescript
abstract canLoadMore(): boolean;
abstract onLoadMore(): void;
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm 10+
- Angular CLI 21+

### Installation

```bash
# Clone repository
git clone https://github.com/joshue000/gapsi-front.git
cd gapsi-front

# Install dependencies
npm install

# Start development server
ng serve
```

Navigate to `http://localhost:4200/`

### Available Scripts

```bash
# Development
npm start              # Start dev server
npm run build          # Build for production

# Docker
./run-docker.sh        # Build and run with Docker
./stop-docker.sh       # Stop and clean Docker containers
```

## 🐳 Docker Deployment

### Quick Start with Docker

```bash
# Option 1: Automated script (Recommended)
chmod +x run-docker.sh stop-docker.sh
./run-docker.sh

# Option 2: Manual Docker commands
docker build -t gapsi-front .
docker run -d --name gapsi-front-app -p 4200:80 gapsi-front
```

Access the application at: **http://localhost:4200**

### Docker Features

- ✅ Multi-stage build for optimized image size
- ✅ Nginx as production web server
- ✅ Automated build and deployment scripts
- ✅ Port 4200 (configurable)

See [DOCKER_README.md](DOCKER_README.md) for detailed Docker instructions.

## 📁 Project Structure

```
gapsi-front/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── config/              # App configuration
│   │   │   └── services/            # Core services
│   │   │       ├── product.service.ts
│   │   │       ├── visitor.service.ts
│   │   │       ├── viewport.service.ts    # [DP:Singleton]
│   │   │       └── constants.service.ts
│   │   ├── pages/
│   │   │   ├── products/
│   │   │   │   ├── products.component.ts  # Main products page
│   │   │   │   └── products-state.builder.ts  # [DP:Builder]
│   │   │   ├── splash/              # Landing page
│   │   │   └── welcome/             # Welcome page
│   │   ├── shared/
│   │   │   └── components/
│   │   │       ├── abstract-scroll.component.ts  # [DP:Template]
│   │   │       ├── cart/            # Shopping cart
│   │   │       ├── header/          # App header
│   │   │       └── product-card/
│   │   │           ├── product-card.component.ts
│   │   │           └── drag-icon.factory.ts  # [DP:Factory]
│   │   ├── store/                   # [DP:Facade, DP:Command]
│   │   │   ├── cart.actions.ts
│   │   │   ├── cart.reducer.ts
│   │   │   ├── cart.selectors.ts
│   │   │   ├── product.actions.ts
│   │   │   ├── product.reducer.ts
│   │   │   ├── product.selectors.ts
│   │   │   ├── product.effects.ts   # [DP:Strategy]
│   │   │   └── visitor.*
│   │   └── app.module.ts
│   ├── assets/                      # Static assets
│   └── environments/                # Environment configs
├── Dockerfile                       # Docker configuration
├── nginx.conf                       # Nginx configuration
├── run-docker.sh                    # Docker start script
├── stop-docker.sh                   # Docker stop script
├── DOCKER_README.md                 # Docker documentation
├── ANALISIS_CODIGO.md              # Code analysis (Spanish)
└── README.md                        # This file
```

## 📊 Code Quality

### Metrics

- **Type Safety**: 100% TypeScript
- **Linting**: Angular ESLint rules
- **Architecture**: Clean Architecture principles
- **Patterns**: 9 design patterns implemented

### Best Practices

✅ OnPush change detection strategy  
✅ Reactive programming with RxJS  
✅ Immutable state management  
✅ Dependency injection  
✅ Single Responsibility Principle  
✅ DRY (Don't Repeat Yourself)  
✅ SOLID principles  
✅ Memory leak prevention (takeUntil pattern)  

## 🔧 Configuration

### Environment Variables

Configure in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api.example.com/'
};
```

### Port Configuration

Change default port in:
- Development: `angular.json` → `serve.options.port`
- Docker: `run-docker.sh` → `PORT` variable

## 👤 Author

**Josue**
- GitHub: [@joshue000](https://github.com/joshue000)
- Repository: [gapsi-front](https://github.com/joshue000/gapsi-front)
