import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
  // Clear db
  await prisma.workspaceMember.deleteMany()
  await prisma.user.deleteMany()
  await prisma.workspace.deleteMany()

  // Create Workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Kokeb Association',
      slug: 'kokeb',
      address: 'Bole, Addis Ababa',
    }
  })

  const passwordHash = await bcrypt.hash('password', 10);

  // Create Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      full_name: 'Admin Manager',
      password_hash: passwordHash,
      memberships: {
        create: {
          workspace_id: workspace.id,
          role: Role.ADMIN
        }
      }
    }
  })

  // Create Unit & Resident
  const unit = await prisma.unit.create({
    data: {
      workspace_id: workspace.id,
      unit_number: '101',
    }
  })

  const resident = await prisma.user.create({
    data: {
      email: 'resident@example.com',
      full_name: 'Abebe Resident',
      password_hash: passwordHash,
      memberships: {
        create: {
          workspace_id: workspace.id,
          unit_id: unit.id,
          role: Role.TENANT
        }
      }
    }
  })

  // Create Staff
  const staff = await prisma.user.create({
    data: {
      email: 'staff@example.com',
      full_name: 'Chala Technician',
      password_hash: passwordHash,
      memberships: {
        create: {
          workspace_id: workspace.id,
          role: Role.STAFF
        }
      }
    }
  })

  console.log('Seeded default workspace and users.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
