# BotHigh

BotHigh is a powerful, easy-to-use platform that helps business owners build, deploy, and manage marketing bots with minimal effort. Our solution ensures that bots are highly customizable, enabling seamless interaction across various platforms. 

---

## Features

- **Easy bot creation**: No coding required – just a few clicks to set up your bot.
- **Customizable**: Modify bot behavior and appearance to fit your brand.
- **Multi-platform integration**: Deploy bots on websites, WhatsApp, Telegram, and more.
- **Seamless management**: Monitor bot performance and make updates in real-time.

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **Docker** & **Docker Compose**
- **PNPM** as the package manager (install it globally using `npm i -g pnpm`)
- **PostgreSQL** (handled with Docker)

---

## Setup Instructions

1. **Clone the Repository**  
   ```bash
   git clone <repository_url>
   cd <project_directory>
2. **Install Dependencies** 
   ```bash
   pnpm install
3. **Start Database using Docker Compose**
   ```bash
   docker-compose up -d
4. **Apply Prisma Migrations**
   ```bash
   npx prisma migrate dev
5. **Seed the Database with Dummy Data**
   ```bash
   pnpm run seed
6. **Run the Application**
   ```bash
   pnpm run dev