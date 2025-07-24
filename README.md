# Cyber Physical Lab Website

A modern research laboratory website built with Next.js, TypeScript, and Payload CMS. This platform is designed for academic research groups focusing on cyber-physical systems, IoT, machine learning, and related technologies.

## ✨ Features

### 🔬 Research Management
- **Research Works Management**: Add and manage papers, journals, projects, and publications
- **Team Profiles**: Showcase professors and students with their research areas
- **Research Areas**: Highlight lab specializations (IoT, ML, CPS, Computer Vision, etc.)
- **Publications**: Display research publications with filtering and search

### 👥 User Management
- **Role-based Authentication**: Admin (Professors) and Student roles
- **Profile Management**: Detailed profiles for team members
- **Supervisor-Student Relationships**: Track academic supervision

### 🏆 Certification System
- **Digital Certificates**: Issue research certificates and testimonials
- **Certificate Verification**: Public certificate verification system
- **Various Certificate Types**: Research completion, excellence awards, etc.

### 📰 Lab Communication
- **Lab News**: Keep community updated with latest achievements
- **Research Impact Calculator**: Interactive tool to showcase research potential
- **Contact System**: Professional contact forms and information

### 🎨 Modern UI/UX
- **Responsive Design**: Works on all devices
- **Dark Theme**: Modern dark interface with animated elements
- **Interactive Components**: Engaging user experience
- **Performance Optimized**: Fast loading and smooth interactions

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Payload CMS 3.0
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- pnpm (recommended) or npm
- MongoDB (local or cloud instance)

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd cplab
   ```

2. **Run the setup script**:
   ```bash
   pnpm run setup
   ```
   This will:
   - Install dependencies
   - Create `.env` file from example
   - Generate secure secrets

3. **Configure your environment**:
   Update `.env` with your actual values:
   ```env
   DATABASE_URI=mongodb://localhost:27017/cplab
   PAYLOAD_SECRET=generated-secret
   # Add other configurations as needed
   ```

4. **Start the development server**:
   ```bash
   pnpm dev
   ```

5. **Set up your admin user**:
   Visit `http://localhost:3000/admin` to create your first admin account.

## 📁 Project Structure

```
cplab/
├── app/                    # Next.js app directory
│   ├── (main)/            # Main site pages
│   │   ├── team/          # Team page
│   │   ├── research/      # Research areas
│   │   ├── publications/  # Publications list
│   │   ├── news/          # Lab news
│   │   └── contact/       # Contact page
│   └── (payload)/         # Payload admin
├── components/            # React components
├── src/
│   ├── collections/       # Payload CMS collections
│   │   ├── Users.ts       # User management
│   │   ├── ResearchWorks.ts # Research publications
│   │   ├── Certificates.ts  # Certification system
│   │   └── LabNews.ts     # Lab news & updates
│   └── globals/           # Global Payload config
├── config/                # Site configuration
└── payload-config.ts      # Payload CMS setup
```

## 🔧 Configuration

### User Roles
- **Admin (Professor)**: Full access to all content management
- **Student**: Can create/edit their own research works

### Collections Overview
- **Users**: Team members with roles and profiles
- **Research Works**: Papers, journals, projects with collaboration features
- **Certificates**: Digital certificates issued by admins
- **Lab News**: Updates and announcements
- **Media**: File uploads and management

### Customization
- Update `config/site.ts` for basic site information
- Modify components in `/components` for UI changes
- Adjust collections in `/src/collections` for data structure changes

## 🎯 Usage Examples

### Adding Research Work
1. Login as admin or student
2. Navigate to Research Works in admin panel
3. Create new entry with authors, abstract, files
4. Set visibility and publication status

### Issuing Certificates
1. Login as admin
2. Go to Certificates collection
3. Select recipient (student)
4. Choose certificate type and add details
5. Certificate gets unique verification ID

### Managing Team
1. Create user accounts for team members
2. Set appropriate roles (admin/student)
3. Add profile information and research areas
4. Set supervisor relationships for students

## 🚀 Deployment

### Build for Production
```bash
pnpm build
pnpm start
```

### Environment Variables for Production
```env
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
DATABASE_URI=mongodb://your-production-db
# Add other production configurations
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- Built on top of Payload CMS for content management
- UI components from Radix UI and Tailwind CSS
- Inspiration from modern research lab websites

---

**Cyber Physical Lab** - Advancing research through technology 🔬✨
