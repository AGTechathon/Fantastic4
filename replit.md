# CampusVote - Decentralized Student Voting Platform

## Overview

CampusVote is a full-stack web application that provides a decentralized voting platform for student governance. The application uses blockchain technology (MetaMask integration) to ensure transparent and secure voting while maintaining a modern, responsive user interface.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state
- **Routing**: React Router for client-side navigation
- **Build Tool**: Vite for fast development and optimized builds
- **Design System**: Radix UI primitives with custom theming

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL support
- **Session Management**: PostgreSQL session store
- **Development**: Hot reload with Vite middleware integration

### Data Storage Solutions
- **Primary Database**: PostgreSQL (configured for production deployment)
- **Development Storage**: In-memory storage for rapid prototyping
- **Session Storage**: PostgreSQL-based session management
- **Schema Management**: Drizzle migrations for database versioning

## Key Components

### Authentication System
- **Wallet Integration**: MetaMask wallet connection for user authentication
- **User Verification**: Student verification system with university email validation
- **Session Management**: Secure session handling with PostgreSQL store

### Voting Engine
- **Proposal Management**: Create, read, update voting proposals
- **Vote Recording**: Secure vote submission and validation
- **Real-time Results**: Live vote tallying and result display
- **Anti-fraud Measures**: Duplicate vote prevention and user verification

### User Interface Components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG-compliant components using Radix UI
- **Interactive Elements**: Toast notifications, modals, and form validation
- **Dark Mode**: Theme switching capability built into design system

### Administrative Features
- **User Management**: Admin panel for user verification and moderation
- **System Monitoring**: Usage analytics and system health monitoring
- **Content Moderation**: Proposal review and approval workflow

## Data Flow

### User Registration Flow
1. User connects MetaMask wallet
2. System validates wallet connection
3. User provides university email for verification
4. Admin approves student verification
5. User gains voting privileges

### Voting Process Flow
1. Authenticated user views active proposals
2. User selects voting options
3. Vote is recorded with blockchain verification
4. Real-time results update across all connected clients
5. Vote history is maintained for transparency

### Administrative Workflow
1. Admins monitor user registration requests
2. Proposals are reviewed before going live
3. System analytics provide usage insights
4. Flagged activities trigger moderation workflows

## External Dependencies

### Blockchain Integration
- **MetaMask**: Browser wallet for user authentication
- **Ethereum Provider**: Web3 wallet detection and connection
- **Solana Integration**: Future blockchain voting record storage

### UI Component Libraries
- **Radix UI**: Headless UI components for accessibility
- **Lucide React**: Icon library for consistent iconography
- **TailwindCSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library

### Development Tools
- **Drizzle Kit**: Database migration and schema management
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind integration

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 with automatic provisioning
- **Hot Reload**: Vite development server with Express middleware
- **Port Configuration**: Development on port 5000, production on port 80

### Production Build Process
1. Vite builds optimized React client bundle
2. ESBuild compiles server TypeScript to optimized JavaScript
3. Static assets are served from Express with proper caching
4. Database migrations run automatically on deployment

### Scaling Strategy
- **Autoscale Deployment**: Replit autoscale for traffic handling
- **Database Optimization**: PostgreSQL with connection pooling
- **CDN Integration**: Static asset optimization for global delivery
- **Session Scaling**: PostgreSQL session store for multi-instance support

## Changelog

Changelog:
- June 14, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.