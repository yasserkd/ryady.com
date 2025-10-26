# Ryady.com - JavaScript Widget Generator

A professional SaaS application for creating and embedding customizable JavaScript widgets. Built with React, TypeScript, Supabase, and Stripe.

## Overview

Ryady.com is a widget generation platform that allows users to create, customize, and embed various types of widgets into their websites. The application supports both free and premium subscriptions, with premium users getting access to widgets without branding.

### Key Features

- **10 Widget Templates**: Pre-built templates for common use cases
- **Real-time Customization**: Live preview with multiple design variations
- **Code Generation**: One-click code generation and copy
- **Embed System**: Unique embed codes for each widget instance
- **Authentication**: Email/password authentication with Supabase
- **Subscription Management**: Stripe-powered subscription system
- **Premium Features**: Remove branding for Pro subscribers
- **User Dashboard**: Manage passwords and subscriptions

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend
- **Supabase** for database and authentication
- **Supabase Edge Functions** for serverless backend logic
- **PostgreSQL** with Row Level Security (RLS)

### Payment Processing
- **Stripe** for subscription management
- **Stripe Customer Portal** for self-service subscription management

## Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── auth/                    # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   └── ChangePasswordForm.tsx
│   │   ├── AppHeader.tsx            # Main navigation header
│   │   ├── WidgetCard.tsx           # Widget template cards
│   │   ├── WidgetForm.tsx           # Widget configuration form
│   │   ├── PreviewDashboard.tsx     # Design variation previews
│   │   ├── CodeDisplay.tsx          # Generated code display
│   │   ├── SubscriptionCard.tsx     # Pricing card
│   │   └── ManageSubscription.tsx   # Subscription management
│   ├── hooks/
│   │   ├── useAuth.ts               # Authentication hook
│   │   └── useSubscription.ts       # Subscription status hook
│   ├── lib/
│   │   └── supabase.ts              # Supabase client
│   ├── types/
│   │   └── widget.ts                # TypeScript types
│   ├── utils/
│   │   └── generateTemplateVariations.ts  # Design variations
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # Entry point
│   └── stripe-config.ts             # Stripe product config
├── supabase/
│   ├── migrations/                  # Database migrations
│   └── functions/                   # Edge functions
│       ├── generate-widget/         # Widget generation
│       ├── embed/                   # Widget embed serving
│       ├── stripe-checkout/         # Checkout session creation
│       ├── stripe-portal/           # Customer portal access
│       └── stripe-webhook/          # Stripe event handling
└── package.json
```

## Database Schema

### Core Tables

1. **widgets** - Widget templates and generated widgets
   - Stores template definitions and user-generated widgets
   - Includes configuration, generated code, and ownership

2. **widget_instances** - Deployed widget instances
   - Tracks each embedded widget with unique embed code
   - Records view counts and analytics

3. **stripe_customers** - Stripe customer mapping
   - Links Supabase users to Stripe customer IDs

4. **stripe_subscriptions** - Active subscriptions
   - Stores subscription status, periods, and payment details

5. **stripe_orders** - Payment history
   - Records completed purchases and checkout sessions

### Security

All tables use Row Level Security (RLS) with policies that ensure:
- Users can only access their own data
- Public users can view active widget templates
- Anonymous users can create widgets (free tier)

## Edge Functions

### 1. generate-widget
**Purpose**: Handle widget generation and template management

**Endpoints**:
- `GET /templates` - Retrieve available widget templates
- `POST /generate` - Generate widget code from template and config

**Features**:
- Template variation generation
- Code generation and storage
- Database persistence

### 2. embed
**Purpose**: Serve embedded widgets to external sites

**Endpoint**: `GET /:embedCode`

**Features**:
- Retrieves widget by embed code
- Increments view counter
- Returns widget as executable JavaScript
- Handles branding based on subscription status

### 3. stripe-checkout
**Purpose**: Create Stripe checkout sessions

**Features**:
- Creates checkout session for subscription
- Handles customer creation/retrieval
- Configures success/cancel URLs

### 4. stripe-portal
**Purpose**: Provide access to Stripe Customer Portal

**Features**:
- Retrieves customer by email
- Creates portal session
- Redirects to Stripe-hosted subscription management

### 5. stripe-webhook
**Purpose**: Handle Stripe webhook events

**Events Handled**:
- `checkout.session.completed` - New subscription
- `customer.subscription.updated` - Subscription changes
- `customer.subscription.deleted` - Cancellations

## User Flow

### Free User Journey
1. Visit site and browse widget templates
2. Select template and configure options
3. Preview design variations
4. Generate code and receive embed code
5. Copy code to website (includes branding)

### Premium User Journey
1. Sign up for account
2. Subscribe to Pro plan via Stripe
3. Access all widgets without branding
4. Manage subscription via customer portal
5. Change password and settings from profile menu

## Key Features Explained

### Authentication System
- Email/password authentication via Supabase Auth
- Secure session management
- Password change functionality
- Sign out capability

### Subscription Management
- Free tier: Unlimited widgets with branding
- Pro tier: $9/month, no branding, priority support
- Self-service subscription management via Stripe Portal
- Automatic subscription status sync via webhooks

### Widget Generation
1. User selects template
2. Fills configuration form
3. System generates 3 design variations
4. User selects preferred design
5. Backend generates optimized code
6. Creates unique embed instance
7. Returns embed code for copying

### Embed System
- Each widget gets unique embed code
- Served via edge function for optimal performance
- Tracks view counts and analytics
- Branding automatically removed for Pro users

## Environment Variables

Required environment variables (configured in Supabase):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

### Database Migrations

Migrations are located in `supabase/migrations/` and include:
- Widget system tables and policies
- Stripe integration tables
- Subscription management views
- Security policies

## Deployment

### Frontend
Deploy to any static hosting (Vercel, Netlify, etc.):
```bash
npm run build
# Deploy dist/ folder
```

### Backend
Edge functions are deployed to Supabase automatically:
- Managed via Supabase dashboard
- Environment variables configured in project settings
- Webhook endpoint needs to be registered in Stripe dashboard

## Testing

### Test Users
- Free user: Any new signup
- Pro user: `pro@test.com` (test data in database)

### Stripe Testing
Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## Security Considerations

1. **Authentication**: Supabase Auth with secure session management
2. **RLS Policies**: All database access controlled by RLS
3. **API Keys**: All secrets stored securely in Supabase
4. **Stripe Webhooks**: Signature verification on all webhook events
5. **Input Validation**: All user inputs validated and sanitized

## Arabic Language Support

The application is fully RTL (Right-to-Left) compatible:
- Arabic UI text throughout
- Proper RTL layout and alignment
- Arabic-friendly typography and spacing

## Future Enhancements

Potential areas for expansion:
- Analytics dashboard for widget performance
- Additional widget templates
- Custom branding options for enterprise
- API for programmatic widget creation
- Widget collaboration features
- Export/import widget configurations

## License

Proprietary - All rights reserved

## Support

For issues or questions, contact support through the application.

---

Built with modern web technologies for performance, security, and scalability.
