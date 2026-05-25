# Personal Portfolio Website

A modern, responsive personal portfolio website with glassmorphism design, built using Next.js, Tailwind CSS, and Supabase.

## Features

- 🎨 **Glassmorphism Design** - Modern and elegant UI with glass-like effects
- 🌙 **Dark/Light Mode** - Toggle between dark and light themes
- 📱 **Responsive** - Works perfectly on all devices
- 📊 **Supabase Integration** - Dynamic content management with Supabase database
- ✨ **Smooth Animations** - Powered by Framer Motion and GSAP
- 📚 **Portfolio Sections**:
  - Hero with introduction
  - About me
  - Skills with proficiency bars
  - Experience timeline
  - Certifications
  - Books I'm reading
  - Project portfolio with search and filter
  - Contact information

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/deFare00/personal-web-2026-v1.git
cd personal-web-glassmorph
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Set up Supabase database:
   - Create a new project in Supabase
   - Run the SQL queries from `supabase_schema.sql` to create the tables
   - Insert your data into the tables

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The project uses the following tables in Supabase:

- **projects**: Portfolio projects with title, description, category, tech stack, etc.
- **skills**: Skills with proficiency level (0-100)
- **experiences**: Work experience with company, position, period, and description
- **certifications**: Certifications earned
- **books**: Books being read or already read, with ratings

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add the environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel dashboard
4. Deploy!

## Customization

- **Personal Information**: Update content via Supabase database
- **Colors**: Modify Tailwind config in `tailwind.config.ts`
- **Styling**: Edit components in `src/app/page.tsx` and `src/app/globals.css`

## Author

**Defarhan Nugraha Fadhali**
- LinkedIn: [linkedin.com/in/defarhan-nugraha-fadhali](https://linkedin.com/in/defarhan-nugraha-fadhali)
- GitHub: [github.com/defarhannugraha](https://github.com/defarhannugraha)
- Email: defarhannugraha1@gmail.com

## License

This project is open source and available under the MIT License.
