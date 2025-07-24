const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🔬 Setting up Cyber Physical Lab...')

// Check if .env exists, if not copy from example
const envPath = path.join(process.cwd(), '.env')
const envExamplePath = path.join(process.cwd(), '.env.example')

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('📝 Creating .env file from example...')
  fs.copyFileSync(envExamplePath, envPath)
  console.log('✅ .env file created. Please update it with your actual values.')
}

// Generate a random secret for Payload
if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, 'utf8')
  if (envContent.includes('your-secret-key-here')) {
    const secret = require('crypto').randomBytes(32).toString('hex')
    envContent = envContent.replace('your-secret-key-here', secret)
    fs.writeFileSync(envPath, envContent)
    console.log('🔐 Generated PAYLOAD_SECRET')
  }
  
  if (envContent.includes('your-jwt-secret-here')) {
    const jwtSecret = require('crypto').randomBytes(32).toString('hex')
    envContent = envContent.replace('your-jwt-secret-here', jwtSecret)
    fs.writeFileSync(envPath, envContent)
    console.log('🔐 Generated JWT_SECRET')
  }
}

console.log('📦 Installing dependencies...')
try {
  execSync('pnpm install', { stdio: 'inherit' })
  console.log('✅ Dependencies installed')
} catch (error) {
  console.log('❌ Failed to install dependencies. Please run "pnpm install" manually.')
}

console.log('\n🎉 Setup complete!')
console.log('\nNext steps:')
console.log('1. Update your .env file with actual database credentials')
console.log('2. Start MongoDB service')
console.log('3. Run "pnpm dev" to start the development server')
console.log('4. Visit http://localhost:3000/admin to set up your first admin user')
console.log('\n🔬 Welcome to Cyber Physical Lab!')
