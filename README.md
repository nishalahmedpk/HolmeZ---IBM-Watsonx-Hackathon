# Holmes Sales Catalyst 🔍

**Holmes Agentic Sales Orchestrator** - An enterprise-grade AI-powered sales intelligence platform built with IBM watsonx Orchestrate.

![Sales Dashboard](https://img.shields.io/badge/Status-Active-success)
![IBM watsonx](https://img.shields.io/badge/IBM-watsonx_Orchestrate-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6)

## 🎯 Overview

Holmes Sales Catalyst is an intelligent sales management platform that leverages multi-agent AI orchestration to streamline order processing, analytics, and fulfillment. Built for the modern enterprise, it combines the power of IBM watsonx Orchestrate with a sleek, responsive dashboard.

### Key Features

- 🤖 **Multi-Agent AI System** - Different specialized agents for orders, reports, and fulfillment
- 📊 **Real-time Analytics** - Comprehensive sales reports with interactive charts
- 📦 **Order Management** - Streamlined order creation with 5 predefined products
- 💰 **Invoice Generation** - Automated fulfillment and invoice processing
- 🎨 **Modern UI** - Built with React, TypeScript, and Tailwind CSS
- 🔐 **Secure Configuration** - Environment-based credential management

## 🏗️ Architecture

### Multi-Agent System

**Orders Page** - Placing_Orders_Agent
- Specialized for order creation and quotation requests
- Product selection and quantity management
- Customer information handling

**Reports & Fulfillment Pages** - Sales_Chatgoat Agent
- Sales analytics and reporting
- Invoice generation
- Delivery tracking

### Tech Stack

**Frontend:**
- React 18.3 with TypeScript
- Vite for blazing-fast builds
- Tailwind CSS + shadcn/ui components
- React Router for navigation
- Recharts for data visualization

**Backend:**
- Node.js REST API
- Supabase for database
- Hosted on Render

**AI/ML:**
- IBM watsonx Orchestrate
- Multi-agent orchestration
- Natural language processing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- npm or bun package manager
- IBM watsonx Orchestrate account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sales-catalyst
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials (see [Environment Setup](#environment-setup))

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:8080
   ```

## ⚙️ Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Backend API Configuration
VITE_API_URL=https://your-api-url.com

# IBM watsonx Orchestrate Configuration
VITE_WATSONX_ORCHESTRATION_ID=your_orchestration_id
VITE_WATSONX_HOST_URL=https://your-region.watson-orchestrate.cloud.ibm.com
VITE_WATSONX_CRN=your_crn_value

# Default Agent (Sales_Chatgoat) - Reports & Fulfillment
VITE_WATSONX_AGENT_ID=your_default_agent_id
VITE_WATSONX_AGENT_ENV_ID=your_default_environment_id

# Orders Page Agent (Placing_Orders_Agent)
VITE_WATSONX_ORDERS_AGENT_ID_Orders=your_orders_agent_id
VITE_WATSONX_ORDERS_AGENT_ENV_ID_Orders=your_orders_environment_id
```

> ⚠️ **Important:** Never commit your `.env` file to version control!

## 📦 Available Products

The platform supports 5 predefined products:

| Product | Price |
|---------|-------|
| Power transistors | $1,000 |
| Thyristors | $2,000 |
| Diodes | $3,000 |
| Motor controllers | $4,000 |
| Pressure sensors | $5,000 |

## 🎨 Features in Detail

### Order Creation
- Customer information capture
- Product selection from dropdown
- Quantity specification
- Mobile number tracking
- Tentative delivery date scheduling

### Sales Analytics
- Revenue tracking
- Order volume analysis
- Top customers by quantity and revenue
- Top products performance
- Monthly trends visualization
- Delivery status breakdown

### Fulfillment Management
- Pending orders dashboard
- Invoice amount specification
- One-click invoice generation
- Real-time status updates

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Project Structure

```
sales-catalyst/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Navigation.tsx
│   │   └── WatsonxChat.tsx
│   ├── pages/           # Route pages
│   │   ├── Index.tsx    # Orders page
│   │   ├── Reports.tsx  # Analytics dashboard
│   │   └── Fulfillment.tsx
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── App.tsx          # Main app component
├── public/              # Static assets
├── .env                 # Environment variables (not committed)
├── .env.example         # Environment template
└── package.json
```

## 🔧 Configuration

### Adding a New Agent

1. Get agent credentials from watsonx Orchestrate:
   ```bash
   orchestrate channels webchat embed --agent-name=YourAgentName
   ```

2. Add to `.env`:
   ```env
   VITE_WATSONX_YOUR_AGENT_ID=agent_id_here
   VITE_WATSONX_YOUR_AGENT_ENV_ID=environment_id_here
   ```

3. Update `src/vite-env.d.ts`:
   ```typescript
   interface ImportMetaEnv {
     // ... existing vars
     readonly VITE_WATSONX_YOUR_AGENT_ID: string
     readonly VITE_WATSONX_YOUR_AGENT_ENV_ID: string
   }
   ```

4. Use in `src/App.tsx`:
   ```tsx
   <WatsonxChat
     agentId={import.meta.env.VITE_WATSONX_YOUR_AGENT_ID}
     agentEnvironmentId={import.meta.env.VITE_WATSONX_YOUR_AGENT_ENV_ID}
   />
   ```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Vercel/Netlify

1. Connect your repository
2. Set environment variables in the platform dashboard
3. Deploy!

**Build settings:**
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [IBM watsonx Orchestrate](https://www.ibm.com/products/watsonx-orchestrate)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Contact the development team

---

**Built with ❤️ using IBM watsonx Orchestrate**
