export const initialMembers = [
  {
    id: 'ABAS-001',
    name: 'Rajesh Agrasen',
    email: 'rajesh.agrasen@abas.org.in',
    phone: '9876543210',
    membershipType: 'Patron',
    status: 'Approved',
    joiningDate: '2025-01-15',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    department: 'Vyapar Kosh',
    teamRole: 'National President',
    region: {
      state: 'Delhi',
      district: 'Central Delhi',
      town: 'Connaught Place'
    },
    hasPaid: true,
    idCardUrl: 'ID-PATRON-9821'
  },
  {
    id: 'ABAS-002',
    name: 'Sushma Bansal',
    email: 'sushma.bansal@abas.org.in',
    phone: '9812345678',
    membershipType: 'Life',
    status: 'Approved',
    joiningDate: '2025-02-10',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    department: 'Women Empowerment',
    teamRole: 'State Secretary',
    region: {
      state: 'Haryana',
      district: 'Gurugram',
      town: 'Sector 15'
    },
    hasPaid: true,
    idCardUrl: 'ID-LIFE-3841'
  },
  {
    id: 'ABAS-003',
    name: 'Anuj Jindal',
    email: 'anuj.jindal@gmail.com',
    phone: '9765432109',
    membershipType: 'Ordinary',
    status: 'Pending',
    joiningDate: '2026-07-01',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    department: 'IT Vibhag',
    region: {
      state: 'Uttar Pradesh',
      district: 'Gautam Buddha Nagar',
      town: 'Noida'
    },
    hasPaid: false
  },
  {
    id: 'ABAS-004',
    name: 'Amit Mittal',
    email: 'amit.mittal@gmail.com',
    phone: '9988776655',
    membershipType: 'Volunteer',
    status: 'Approved',
    joiningDate: '2025-05-20',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    department: 'Shiksha Vibhag',
    teamRole: 'District Coordinator',
    region: {
      state: 'Rajasthan',
      district: 'Jaipur',
      town: 'Malviya Nagar'
    },
    hasPaid: true,
    idCardUrl: 'ID-VOL-4821'
  },
  {
    id: 'ABAS-005',
    name: 'Preeti Singhal',
    email: 'preeti.singhal@yahoo.com',
    phone: '9871234509',
    membershipType: 'Life',
    status: 'Pending',
    joiningDate: '2026-07-03',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    department: 'Marriage Bureau',
    region: {
      state: 'Punjab',
      district: 'Ludhiana',
      town: 'Model Town'
    },
    hasPaid: true
  },
  {
    id: 'ABAS-006',
    name: 'Vijay Garg',
    email: 'vijay.garg@gargmetals.com',
    phone: '9123456780',
    membershipType: 'Patron',
    status: 'Suspended',
    joiningDate: '2024-11-02',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    department: 'Vyapar Kosh',
    region: {
      state: 'Delhi',
      district: 'West Delhi',
      town: 'Punjabi Bagh'
    },
    hasPaid: true,
    idCardUrl: 'ID-PATRON-2210'
  }
];

export const initialDepartments = [
  {
    id: 'DEP-001',
    name: 'Marriage Bureau',
    head: 'Sh. Radhe Shyam Goel',
    memberCount: 24,
    activities: [
      'Weekly matrimonial meetups',
      'Digital profile verification',
      'Annual community mass-marriage event (Samuhik Vivah)',
      'Pre-marital counseling'
    ],
    description: 'Assisting community members in finding compatible partners through authenticated profiles and dedicated counselor matchmakers.',
    icon: 'Heart'
  },
  {
    id: 'DEP-002',
    name: 'Vyapar Kosh',
    head: 'Sh. Rajesh Agrasen',
    memberCount: 45,
    activities: [
      'Business-to-Business (B2B) networking sessions',
      'Interest-free micro-loans for community start-ups',
      'Vyapar Sammelan (Business Summit)',
      'Legal advisory and tax workshops'
    ],
    description: 'Empowering community businesses, traders, and young entrepreneurs via resource pools, networks, and financial assistance.',
    icon: 'Briefcase'
  },
  {
    id: 'DEP-003',
    name: 'Shiksha Vibhag',
    head: 'Dr. Ramesh Chandra Gupta',
    memberCount: 32,
    activities: [
      'Higher education scholarships for merit-cum-means students',
      'Career counseling and mentorship networks',
      'Free IAS/IPS and competitive exams coaching classes',
      'Setting up community libraries and digital learning labs'
    ],
    description: 'Fostering excellence in education by offering financial grants, learning aids, coaching, and career guidance.',
    icon: 'GraduationCap'
  },
  {
    id: 'DEP-004',
    name: 'Health Vibhag',
    head: 'Dr. Sunil Bansal',
    memberCount: 18,
    activities: [
      'Free multi-specialty health camps',
      'Blood donation drives',
      'Subsidized diagnostic and medicine distribution networks',
      'Emergency ambulance service coordination'
    ],
    description: 'Providing comprehensive healthcare support, medical aids, and wellness programs to the underprivileged sections of society.',
    icon: 'Activity'
  },
  {
    id: 'DEP-005',
    name: 'IT Vibhag',
    head: 'Smt. Kavita Jindal',
    memberCount: 12,
    activities: [
      'Maintaining the ABAS global member portal',
      'Digital literacy training camps',
      'Cybersecurity and digital safety webinars',
      'Online NGO management systems support'
    ],
    description: 'Driving the technological initiatives, digital infrastructure, and online visibility of ABAS India NGO.',
    icon: 'Cpu'
  },
  {
    id: 'DEP-006',
    name: 'Women Empowerment',
    head: 'Smt. Sushma Bansal',
    memberCount: 29,
    activities: [
      'Self-defense training programs for girls',
      'Vocational training (sewing, handicraft, coding)',
      'Financial independence & microfinance assistance',
      'Women Entrepreneurship Exhibitions'
    ],
    description: 'Nurturing self-reliance, security, and financial independence among women in the community.',
    icon: 'UserCheck'
  },
  {
    id: 'DEP-007',
    name: 'Paryavaran Vibhag',
    head: 'Sh. Alok Mittal',
    memberCount: 15,
    activities: [
      'Tree plantation drives (Target: 50,000 saplings)',
      'Rainwater harvesting installation programs',
      'Waste segregation and recycling workshops',
      'Cleanliness & hygiene campaigns (Swachhta Abhiyan)'
    ],
    description: 'Promoting ecological balance and green initiatives to combat climate change and build clean societies.',
    icon: 'Trees'
  },
  {
    id: 'DEP-008',
    name: 'Rozgar Yojna',
    head: 'Sh. Deven Aggarwal',
    memberCount: 21,
    activities: [
      'Quarterly job fairs (Rozgar Mela)',
      'Skill development centers for unemployed youth',
      'SME tie-ups for placement drives',
      'Resume writing and mock interview prep'
    ],
    description: 'Bridging the gap between job seekers and employers by providing relevant skills and employment channels.',
    icon: 'Award'
  }
];

export const initialMeetings = [
  {
    id: 'MEET-001',
    title: 'ABAS Annual Vyapar Meet 2026',
    date: '2026-07-15',
    time: '11:00 AM',
    agenda: [
      'Review of Vyapar Kosh Micro-loan allocations',
      'Launch of New B2B Matched Network Portal',
      'Discussion on upcoming Trade Fair in Delhi',
      'Address by the National President'
    ],
    participants: ['National Team', 'State Team Leaders', 'Vyapar Kosh Members'],
    status: 'Scheduled',
    attendance: {}
  },
  {
    id: 'MEET-002',
    title: 'Marriage Bureau Counselor Alignment',
    date: '2026-07-10',
    time: '04:30 PM',
    agenda: [
      'Review of pending matchmaking requests',
      'Adopting digital KYC verification tools for profiles',
      'Planning the October Mass Marriage Event (Samuhik Vivah)',
      'Counselor feedback sharing'
    ],
    participants: ['Marriage Bureau Counselors', 'State Team Representatives'],
    status: 'Scheduled',
    attendance: {}
  },
  {
    id: 'MEET-003',
    title: 'National Core Committee Brainstorming',
    date: '2026-07-02',
    time: '10:00 AM',
    agenda: [
      'Discussion on national membership drive expansion',
      'Budget allocation review for Shiksha Vibhag',
      'Enhancing digital security and onboarding procedures'
    ],
    participants: ['National Core Committee', 'Super Admins'],
    status: 'Conducted',
    attendance: {
      'ABAS-001': true,
      'ABAS-002': true,
      'ABAS-004': true
    },
    mom: 'Meeting was held successfully. Agreed to increase the scholarship fund by 25% for high-merit students. Re-emphasized the target of onboarding 10,000 new volunteers in Q3. Upgraded IT guidelines.',
    meetingReport: 'REP-CORE-003'
  }
];

export const initialDonations = [
  {
    id: 'DON-001',
    donorName: 'Radha Mohan Singhal',
    email: 'rmsinghal@outlook.com',
    amount: 100000,
    date: '2026-06-25',
    paymentMethod: 'NetBanking',
    transactionId: 'TXN-NET-8210389',
    taxExemptReceiptId: 'ABAS-TAX-2026-041',
    project: 'Shiksha Vibhag Scholarship'
  },
  {
    id: 'DON-002',
    donorName: 'Garg Metals Corp',
    email: 'accounts@gargmetals.com',
    amount: 250000,
    date: '2026-06-20',
    paymentMethod: 'UPI / Razorpay',
    transactionId: 'TXN-UPI-9831948',
    taxExemptReceiptId: 'ABAS-TAX-2026-039',
    project: 'Vyapar Kosh Startups'
  },
  {
    id: 'DON-003',
    donorName: 'Dr. Suresh Jindal',
    email: 'suresh.jindal@healthnet.com',
    amount: 50000,
    date: '2026-07-02',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-CC-1928471',
    taxExemptReceiptId: 'ABAS-TAX-2026-045',
    project: 'Health Vibhag Medical Camps'
  }
];

export const initialPayments = [
  {
    id: 'PAY-001',
    memberName: 'Rajesh Agrasen',
    amount: 51000,
    date: '2025-01-15',
    purpose: 'Membership Fee',
    status: 'Success',
    transactionId: 'TXN-10023819',
    receiptNumber: 'REC-ABAS-9018'
  },
  {
    id: 'PAY-002',
    memberName: 'Sushma Bansal',
    amount: 25000,
    date: '2025-02-10',
    purpose: 'Membership Fee',
    status: 'Success',
    transactionId: 'TXN-10029318',
    receiptNumber: 'REC-ABAS-9092'
  },
  {
    id: 'PAY-003',
    memberName: 'Amit Mittal',
    amount: 5000,
    date: '2025-05-20',
    purpose: 'Membership Fee',
    status: 'Success',
    transactionId: 'TXN-10048123',
    receiptNumber: 'REC-ABAS-9821'
  },
  {
    id: 'PAY-004',
    memberName: 'Preeti Singhal',
    amount: 25000,
    date: '2026-07-03',
    purpose: 'Membership Fee',
    status: 'Success',
    transactionId: 'TXN-20018412',
    receiptNumber: 'REC-ABAS-10294'
  }
];

export const initialActivityLogs = [
  {
    id: 'LOG-001',
    timestamp: '2026-07-04 09:12:05',
    user: 'Super Admin',
    action: 'Approved Member',
    details: 'Approved membership application for Preeti Singhal (ABAS-005)',
    type: 'success'
  },
  {
    id: 'LOG-002',
    timestamp: '2026-07-04 08:30:11',
    user: 'Rajesh Agrasen',
    action: 'Created Meeting',
    details: 'Scheduled ABAS Annual Vyapar Meet 2026 (MEET-001)',
    type: 'info'
  },
  {
    id: 'LOG-003',
    timestamp: '2026-07-03 17:45:22',
    user: 'Preeti Singhal',
    action: 'Submitted Application',
    details: 'Submitted life membership application with document uploads',
    type: 'info'
  },
  {
    id: 'LOG-004',
    timestamp: '2026-07-02 14:15:00',
    user: 'Dr. Suresh Jindal',
    action: 'Made Donation',
    details: 'Contributed INR 50,000 to Health Vibhag Medical Camps',
    type: 'success'
  },
  {
    id: 'LOG-005',
    timestamp: '2026-07-01 11:22:01',
    user: 'System Monitor',
    action: 'Database Backup',
    details: 'Automatic cloud backup successfully completed and verified',
    type: 'success'
  }
];

export const teamHierarchy = {
  name: 'National Core Committee',
  level: 'National',
  leader: 'Sh. Rajesh Agrasen (President)',
  membersCount: 15,
  children: [
    {
      name: 'Delhi State Chapter',
      level: 'State',
      leader: 'Sh. Ram Gopal Bansal',
      membersCount: 120,
      children: [
        {
          name: 'Central Delhi District Team',
          level: 'District',
          leader: 'Smt. Saroj Mittal',
          membersCount: 45,
          children: [
            {
              name: 'Connaught Place Town Unit',
              level: 'Town',
              leader: 'Sh. Vipul Jindal',
              membersCount: 18,
              children: [
                {
                  name: 'CP Sector 1 Team',
                  level: 'Sector',
                  leader: 'Sh. Vinay Goel',
                  membersCount: 8,
                  children: [
                    {
                      name: 'Hanuman Road Society Team',
                      level: 'Colony',
                      leader: 'Sh. Sandeep Garg',
                      membersCount: 5
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'Haryana State Chapter',
      level: 'State',
      leader: 'Sh. Vijay Prakash Gupta',
      membersCount: 95,
      children: [
        {
          name: 'Gurugram District Team',
          level: 'District',
          leader: 'Sh. Devender Singhal',
          membersCount: 38,
          children: [
            {
              name: 'DLF Phase 3 Town Unit',
              level: 'Town',
              leader: 'Smt. Pooja Goyal',
              membersCount: 14
            }
          ]
        }
      ]
    },
    {
      name: 'Uttar Pradesh State Chapter',
      level: 'State',
      leader: 'Sh. Krishna Murari Goyal',
      membersCount: 150,
      children: [
        {
          name: 'Gautam Buddha Nagar District Team',
          level: 'District',
          leader: 'Sh. Anand Prakash Jindal',
          membersCount: 55,
          children: [
            {
              name: 'Noida Town Unit',
              level: 'Town',
              leader: 'Sh. Rajeev Agrawal',
              membersCount: 22
            }
          ]
        }
      ]
    }
  ]
};
