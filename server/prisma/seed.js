import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const generators = [
  { id: 'sp-20',  name: 'KANOKDAM YORC SP 20',  brand: 'YORC', capacityKVA: 20,  phase: 'Three Phase', fuelType: 'Diesel', soundproof: true, engineModel: 'Y480D',     alternatorBrand: 'Stamford',    status: 'Available', price: 7800,  description: 'The Kanokdam YORC SP20 is a compact 20kVA silent generator ideal for residential backup, estates, shops, and offices. Provides stable power with lower carbon emissions and minimal sound signature.', specModel: 'YORC SP20',  specPowerPrime: '20kVA / 16 kW',   specPowerStandby: '22kVA / 17.6 kW',  specFrequency: '50 Hz', specVoltage: '230/400 V', specSpeed: '1500 RPM' },
  { id: 'sp-30',  name: 'KANOKDAM YORC SP 30',  brand: 'YORC', capacityKVA: 30,  phase: 'Three Phase', fuelType: 'Diesel', soundproof: true, engineModel: 'Y490D',     alternatorBrand: 'Stamford',    status: 'Available', price: 9200,  description: 'The Kanokdam YORC SP30 is a 30kVA generator offering a perfect balance between size and output capacity, suitable for bank branches, supermarkets, and luxury apartments.', specModel: 'YORC SP30',  specPowerPrime: '30kVA / 24 kW',   specPowerStandby: '33kVA / 26.4 kW',  specFrequency: '50 Hz', specVoltage: '230/400 V', specSpeed: '1500 RPM' },
  { id: 'sp-50',  name: 'KANOKDAM YORC SP 50',  brand: 'YORC', capacityKVA: 50,  phase: 'Three Phase', fuelType: 'Diesel', soundproof: true, engineModel: 'Y4105ZLD',  alternatorBrand: 'Stamford',    status: 'Available', price: 12500, description: 'Affordability meets performance at its peak. YORC generating sets are engineered for demanding industrial environments, offering high power output and robust reliability.', specModel: 'YORC SP50',  specPowerPrime: '50kVA / 40 kW',   specPowerStandby: '55kVA / 44 kW',   specFrequency: '50 Hz', specVoltage: '230/400 V', specSpeed: '1500 RPM' },
  { id: 'sp-60',  name: 'KANOKDAM YORC SP 60',  brand: 'YORC', capacityKVA: 60,  phase: 'Three Phase', fuelType: 'Diesel', soundproof: true, engineModel: 'Y4108ZLD',  alternatorBrand: 'Stamford',    status: 'Available', price: 13800, description: 'Dependable and trusted worldwide, Perkins engines offer unparalleled longevity and efficient performance, ideal for critical power backup solutions.', specModel: 'YORC SP60',  specPowerPrime: '60kVA / 48 kW',   specPowerStandby: '66kVA / 53 kW',   specFrequency: '50 Hz', specVoltage: '230/400 V', specSpeed: '1500 RPM' },
  { id: 'sp-100', name: 'KANOKDAM YORC SP 100', brand: 'YORC', capacityKVA: 100, phase: 'Three Phase', fuelType: 'Diesel', soundproof: true, engineModel: 'R6105IZLD', alternatorBrand: 'Stamford',    status: 'Available', price: 17500, description: 'The Kanokdam YORC SP100 is a 100kVA generator providing reliable prime and standby power for hospitals, industrial sites, and commercial properties. Includes a smart control panel with auto-start functionality.', specModel: 'YORC SP100', specPowerPrime: '100kVA / 80 kW',  specPowerStandby: '110kVA / 88 kW',  specFrequency: '50 Hz', specVoltage: '230/400 V', specSpeed: '1500 RPM' },
  { id: 'sp-150', name: 'KANOKDAM YORC SP 150', brand: 'YORC', capacityKVA: 150, phase: 'Three Phase', fuelType: 'Diesel', soundproof: true, engineModel: 'R6110ZLD',  alternatorBrand: 'Leroy Somer', status: 'Available', price: 23200, description: 'The Kanokdam YORC SP150 is a 150kVA soundproof generator set built for continuous prime power application in manufacturing, data centers, and hotels. Fully compatible with Automatic Transfer Switches (ATS).', specModel: 'YORC SP150', specPowerPrime: '150kVA / 120 kW', specPowerStandby: '165kVA / 132 kW', specFrequency: '50 Hz', specVoltage: '230/400 V', specSpeed: '1500 RPM' },
  { id: 'sp-200', name: 'KANOKDAM YORC SP 200', brand: 'YORC', capacityKVA: 200, phase: 'Three Phase', fuelType: 'Diesel', soundproof: true, engineModel: '6126IZLD',  alternatorBrand: 'Leroy Somer', status: 'Available', price: 28500, description: 'The Kanokdam YORC SP200 is a heavy-duty 200kVA diesel generator designed to support factories, residential estates, and construction grids. Features high fuel efficiency, premium engine durability, and low maintenance overhead.', specModel: 'YORC SP200', specPowerPrime: '200kVA / 160 kW', specPowerStandby: '220kVA / 176 kW', specFrequency: '50 Hz', specVoltage: '230/400 V', specSpeed: '1500 RPM' },
  { id: 'accessories', name: 'ACCESSORIES', brand: 'Kanokdam', capacityKVA: 0, phase: 'Three Phase', fuelType: 'N/A', soundproof: false, engineModel: 'Parts & Panels', alternatorBrand: 'Various', status: 'Available', price: 1500, description: 'Affordability meets performance at its peak. YORC generating sets are engineered for demanding industrial environments, offering high power output and robust reliability.', specModel: 'Accessories', specPowerPrime: 'N/A', specPowerStandby: 'N/A', specFrequency: '50 Hz / 60 Hz', specVoltage: '230V / 400V', specSpeed: 'N/A' },
];

async function main() {
  console.log('Seeding database...');

  // Admin user
  const hash = await bcrypt.hash('Kanokdam@2024', 12);
  await prisma.adminUser.upsert({
    where: { email: 'admin@kanokdamlimited.com' },
    update: {},
    create: { email: 'admin@kanokdamlimited.com', passwordHash: hash, role: 'admin' },
  });
  console.log('Admin user created');

  // Generators
  for (const gen of generators) {
    await prisma.generator.upsert({
      where: { id: gen.id },
      update: gen,
      create: { ...gen, images: [] },
    });
  }
  console.log(`${generators.length} generators seeded`);

  console.log('Done.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
