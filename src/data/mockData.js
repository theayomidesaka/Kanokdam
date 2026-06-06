// Mock Data for Kanokdam Website & Admin Dashboard
// Persisted via LocalStorage to make CRUD operations and state changes real.

export const initialGenerators = [
  {
    id: "sp-50",
    name: "KANOKDAM YORC SP 50",
    brand: "YORC",
    capacityKVA: 50,
    phase: "Three Phase",
    fuelType: "Diesel",
    soundproof: true,
    engineModel: "Y4105ZLD",
    alternatorBrand: "Stamford",
    status: "Available",
    price: 12500,
    description: "Affordability meets performance at its peak. YORC generating sets are engineered for demanding industrial environments, offering high power output and robust reliability.",
    specifications: {
      model: "YORC SP50",
      powerPrime: "50kVA / 40 kW",
      powerStandby: "55kVA / 44 kW",
      frequency: "50 Hz",
      voltage: "230/400 V",
      speed: "1500 RPM"
    }
  },
  {
    id: "sp-60",
    name: "KANOKDAM YORC SP 60",
    brand: "YORC",
    capacityKVA: 60,
    phase: "Three Phase",
    fuelType: "Diesel",
    soundproof: true,
    engineModel: "Y4108ZLD",
    alternatorBrand: "Stamford",
    status: "Available",
    price: 13800,
    description: "Dependable and trusted worldwide, Perkins engines offer unparalleled longevity and efficient performance, ideal for critical power backup solutions.",
    specifications: {
      model: "YORC SP60",
      powerPrime: "60kVA / 48 kW",
      powerStandby: "66kVA / 53 kW",
      frequency: "50 Hz",
      voltage: "230/400 V",
      speed: "1500 RPM"
    }
  },
  {
    id: "sp-100",
    name: "KANOKDAM YORC SP 100",
    brand: "YORC",
    capacityKVA: 100,
    phase: "Three Phase",
    fuelType: "Diesel",
    soundproof: true,
    engineModel: "R6105IZLD",
    alternatorBrand: "Stamford",
    status: "Available",
    price: 17500,
    description: "The Kanokdam YORC SP100 is a 100kVA generator providing reliable prime and standby power for hospitals, industrial sites, and commercial properties. Includes a smart control panel with auto-start functionality.",
    specifications: {
      model: "YORC SP100",
      powerPrime: "100kVA / 80 kW",
      powerStandby: "110kVA / 88 kW",
      frequency: "50 Hz",
      voltage: "230/400 V",
      speed: "1500 RPM"
    }
  },
  {
    id: "sp-200",
    name: "KANOKDAM YORC SP 200",
    brand: "YORC",
    capacityKVA: 200,
    phase: "Three Phase",
    fuelType: "Diesel",
    soundproof: true,
    engineModel: "6126IZLD",
    alternatorBrand: "Leroy Somer",
    status: "Available",
    price: 28500,
    description: "The Kanokdam YORC SP200 is a heavy-duty 200kVA diesel generator designed to support factories, residential estates, and construction grids. Features high fuel efficiency, premium engine durability, and low maintenance overhead.",
    specifications: {
      model: "YORC SP200",
      powerPrime: "200kVA / 160 kW",
      powerStandby: "220kVA / 176 kW",
      frequency: "50 Hz",
      voltage: "230/400 V",
      speed: "1500 RPM"
    }
  },
  {
    id: "sp-20",
    name: "KANOKDAM YORC SP 20",
    brand: "YORC",
    capacityKVA: 20,
    phase: "Three Phase",
    fuelType: "Diesel",
    soundproof: true,
    engineModel: "Y480D",
    alternatorBrand: "Stamford",
    status: "Available",
    price: 7800,
    description: "The Kanokdam YORC SP20 is a compact 20kVA silent generator ideal for residential backup, estates, shops, and offices. Provides stable power with lower carbon emissions and minimal sound signature.",
    specifications: {
      model: "YORC SP20",
      powerPrime: "20kVA / 16 kW",
      powerStandby: "22kVA / 17.6 kW",
      frequency: "50 Hz",
      voltage: "230/400 V",
      speed: "1500 RPM"
    }
  },
  {
    id: "sp-150",
    name: "KANOKDAM YORC SP 150",
    brand: "YORC",
    capacityKVA: 150,
    phase: "Three Phase",
    fuelType: "Diesel",
    soundproof: true,
    engineModel: "R6110ZLD",
    alternatorBrand: "Leroy Somer",
    status: "Available",
    price: 23200,
    description: "The Kanokdam YORC SP150 is a 150kVA soundproof generator set built for continuous prime power application in manufacturing, data centers, and hotels. Fully compatible with Automatic Transfer Switches (ATS).",
    specifications: {
      model: "YORC SP150",
      powerPrime: "150kVA / 120 kW",
      powerStandby: "165kVA / 132 kW",
      frequency: "50 Hz",
      voltage: "230/400 V",
      speed: "1500 RPM"
    }
  },
  {
    id: "sp-30",
    name: "KANOKDAM YORC SP 30",
    brand: "YORC",
    capacityKVA: 30,
    phase: "Three Phase",
    fuelType: "Diesel",
    soundproof: true,
    engineModel: "Y490D",
    alternatorBrand: "Stamford",
    status: "Available",
    price: 9200,
    description: "The Kanokdam YORC SP30 is a 30kVA generator offering a perfect balance between size and output capacity, suitable for bank branches, supermarkets, and luxury apartments.",
    specifications: {
      model: "YORC SP30",
      powerPrime: "30kVA / 24 kW",
      powerStandby: "33kVA / 26.4 kW",
      frequency: "50 Hz",
      voltage: "230/400 V",
      speed: "1500 RPM"
    }
  },
  {
    id: "accessories",
    name: "ACCESSORIES",
    brand: "Kanokdam",
    capacityKVA: 0,
    phase: "Three Phase",
    fuelType: "N/A",
    soundproof: false,
    engineModel: "Parts & Panels",
    alternatorBrand: "Various",
    status: "Available",
    price: 1500,
    description: "Affordability meets performance at its peak. YORC generating sets are engineered for demanding industrial environments, offering high power output and robust reliability.",
    specifications: {
      model: "Accessories",
      powerPrime: "N/A",
      powerStandby: "N/A",
      frequency: "50 Hz / 60 Hz",
      voltage: "230V / 400V",
      speed: "N/A"
    }
  }
];

export const initialInquiries = [
  {
    id: "inq-001",
    name: "Bolanle Alao",
    company: "Lagoon View Estates",
    email: "b.alao@lagoonestates.com",
    phone: "+234 803 123 4567",
    capacityNeeded: "200kVA",
    generatorInterest: "KANOKDAM YORC SP 200",
    message: "We need a quote for two 200kVA generators for our estate, including delivery and installation in Lekki Phase 1.",
    date: "2026-06-03",
    status: "Pending"
  },
  {
    id: "inq-002",
    name: "Chidi Okafor",
    company: "Okafor Textiles Ltd",
    email: "c.okafor@textiles.ng",
    phone: "+234 812 345 6789",
    capacityNeeded: "150kVA",
    generatorInterest: "KANOKDAM YORC SP 150",
    message: "Interested in the 150kVA YORC. Please advise on lead time and service contract options.",
    date: "2026-06-04",
    status: "Contacted"
  }
];

export const services = [
  {
    id: "svc-amc",
    title: "Annual Maintenance Contract (AMC)",
    icon: "ShieldCheck",
    shortDescription: "Preventive maintenance, periodic servicing, and 24/7 emergency repair support.",
    description: "Keep your operations running seamlessly with our professional Annual Maintenance Contracts. We design customized scheduling that matches your generator usage profiles, ensuring maximum runtime and fuel efficiency.",
    points: [
      "Scheduled filter & oil changes using genuine parts",
      "Full engine diagnostics and electrical load testing",
      "Cooling system check, radiator flushing and coolant top-up",
      "24/7 prioritized breakdown support and emergency response",
      "Regular status reports and fuel efficiency profiling"
    ],
    benefits: [
      "Minimizes unexpected generator downtime",
      "Extends the operational lifespan of Perkins & YORC engines",
      "Provides predictable maintenance budgeting"
    ]
  },
  {
    id: "svc-install",
    title: "Professional Installation & Commissioning",
    icon: "Wrench",
    shortDescription: "Complete installation site preparation, cable routing, earthing, and safety checks.",
    description: "A professional installation is key to generator safety and efficiency. Our engineering team manages site assessments, concrete foundation preparation, exhaust routing, automatic transfer switch (ATS) installation, and load synchronization.",
    points: [
      "Foundation construction and acoustic room treatment if needed",
      "ATS (Automatic Transfer Switch) integration and programming",
      "Complete earthing, cabling, and distribution panel hookup",
      "Rigorous commissioning tests under actual facility loads",
      "Operator training and basic troubleshooting guide hand-over"
    ],
    benefits: [
      "Ensures compliance with local engineering and safety codes",
      "Seamless power transition during grid failures",
      "Guarantees correct load balancing to protect equipment"
    ]
  },
  {
    id: "svc-eng",
    title: "Mechanical & Electrical Works",
    icon: "Cpu",
    shortDescription: "Power audits, facility wiring, solar integrations, and industrial panel building.",
    description: "We provide comprehensive mechanical and electrical engineering solutions. This includes power audits to measure facility energy demand, electrical distribution board upgrades, and fuel supply line installations.",
    points: [
      "Facility energy audits and power factor correction",
      "Industrial panel building and distribution wiring",
      "Bulk fuel tank installation and piping networks",
      "Sync panels for running multiple generators in parallel",
      "Hybrid power solutions (Generator + Solar + Battery storage)"
    ],
    benefits: [
      "Optimizes power distribution to reduce energy waste",
      "Supports power scaling and grid stabilization",
      "Reduces fuel consumption through smart parallel running"
    ]
  }
];

// Helper functions for LocalStorage management in client component
export const getStoredData = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(key);
    if (!stored) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.warn("localStorage get error: ", e);
    return fallback;
  }
};

export const setStoredData = (key, data) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("localStorage set error: ", e);
    }
  }
};
