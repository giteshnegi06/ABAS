import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, Phone, Lock, KeyRound, CheckCircle2, FileText, 
  UploadCloud, CreditCard, ShieldAlert, BadgeCheck, ClipboardList, 
  Calendar, Send, Sparkles, AlertCircle, Heart, ArrowRight, Printer
} from 'lucide-react';
import { SiteNav, SiteFooter, PageHero } from '../Components/site-chrome';

export default function InteractiveFlows({
  members,
  onAddMember,
  meetings,
  onAddMeeting,
  payments,
  onAddPayment,
  donations,
  onAddDonation,
  activityLogs,
  onAddLog,
  onNavigateToPortal
}) {
  const [activeFlow, setActiveFlow] = useState('auth');

  // --- 1. AUTH FLOW STATE ---
  const [authStep, setAuthStep] = useState(1);
  const [authInput, setAuthInput] = useState('');
  const [authOTP, setAuthOTP] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [authPassword, setAuthPassword] = useState('');

  const handleAuthNext = () => {
    if (authStep === 2 && !authInput) return;
    if (authStep === 3) {
      if (authOTP === '1234') {
        setOtpError(false);
      } else {
        setOtpError(true);
        return;
      }
    }
    if (authStep === 4 && !authPassword) return;

    setAuthStep(prev => prev + 1);
  };

  const handleAuthReset = () => {
    setAuthStep(1);
    setAuthInput('');
    setAuthOTP('');
    setAuthPassword('');
    setOtpError(false);
  };

  // --- 2. MEMBERSHIP FLOW STATE ---
  const [membStep, setMembStep] = useState(1);
  const [membType, setMembType] = useState('Life');
  const [membName, setMembName] = useState('');
  const [membEmail, setMembEmail] = useState('');
  const [membPhone, setMembPhone] = useState('');
  const [membDoc, setMembDoc] = useState(null);
  const [gatewayProcessing, setGatewayProcessing] = useState(false);
  const [createdMemberId, setCreatedMemberId] = useState('');

  const handleMembSubmitApp = () => {
    if (!membName || !membEmail || !membPhone) return;
    setMembStep(4);
  };

  const handleMembPayment = () => {
    setGatewayProcessing(true);
    setTimeout(() => {
      setGatewayProcessing(false);
      
      const newId = `ABAS-${Math.floor(Math.random() * 900) + 100}`;
      setCreatedMemberId(newId);

      // Save pending member to memory
      const newMemb = {
        id: newId,
        name: membName,
        email: membEmail,
        phone: membPhone,
        membershipType: membType,
        status: 'Pending',
        joiningDate: new Date().toISOString().substring(0, 10),
        region: {
          state: 'Delhi',
          district: 'Central Delhi',
          town: 'Sector 1'
        },
        hasPaid: true
      };
      onAddMember(newMemb);

      // Record standard payment receipt
      const txId = `TXN-NEW-${Math.floor(Math.random() * 900000) + 100000}`;
      const recNo = `REC-ABAS-${Math.floor(Math.random() * 9000) + 1000}`;
      onAddPayment({
        id: `PAY-${Date.now()}`,
        memberName: membName,
        amount: membType === 'Patron' ? 51000 : membType === 'Life' ? 25000 : 1000,
        date: new Date().toISOString().substring(0, 10),
        purpose: 'Membership Fee',
        status: 'Success',
        transactionId: txId,
        receiptNumber: recNo
      });

      // Add log
      onAddLog({
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        user: membName,
        action: 'Submitted Membership',
        details: `Created pending registry file under ID ${newId} with document verification pending`,
        type: 'info'
      });

      setMembStep(5);
    }, 2000);
  };

  const handleSimulateApproval = () => {
    const matching = members.find(m => m.id === createdMemberId);
    if (matching) {
      const approved = {
        ...matching,
        status: 'Approved',
        idCardUrl: `ID-${membType.toUpperCase()}-${Math.floor(Math.random() * 9000) + 1000}`
      };
      onAddMember(approved); // This will overwrite / update the state
      onAddLog({
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        user: 'Super Admin',
        action: 'Approved Membership',
        details: `Simulated sandbox verification and activated digital ID reference for ${membName}`,
        type: 'success'
      });
      setMembStep(6);
    }
  };

  const handleMembReset = () => {
    setMembStep(1);
    setMembName('');
    setMembEmail('');
    setMembPhone('');
    setMembDoc(null);
    setCreatedMemberId('');
  };

  // --- 3. MEETING FLOW STATE ---
  const [meetStep, setMeetStep] = useState(1);
  const [meetTitle, setMeetTitle] = useState('');
  const [meetAgenda, setMeetAgenda] = useState('1. Project budget authorization\n2. Selecting state chapters');
  const [meetSuccessId, setMeetSuccessId] = useState('');

  const handleCreateMeeting = () => {
    if (!meetTitle) return;
    const newId = `MEET-${Math.floor(Math.random() * 900) + 100}`;
    setMeetSuccessId(newId);

    const newMeet = {
      id: newId,
      title: meetTitle,
      date: new Date().toISOString().substring(0, 10),
      time: '04:00 PM',
      agenda: meetAgenda.split('\n'),
      participants: ['State Team Leaders', 'Vyapar Kosh Division'],
      status: 'Scheduled',
      attendance: {}
    };

    onAddMeeting(newMeet);
    onAddLog({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Super Admin',
      action: 'Scheduled Meeting',
      details: `Created sandbox meeting: ${meetTitle} (ID: ${newId})`,
      type: 'info'
    });

    setMeetStep(2);
  };

  const handleConductMeeting = () => {
    const meet = meetings.find(m => m.id === meetSuccessId);
    if (meet) {
      const conducted = {
        ...meet,
        status: 'Conducted',
        attendance: {
          'ABAS-001': true,
          'ABAS-002': true,
          'ABAS-004': false
        },
        mom: 'MOM Sandbox Draft: Agreed on decentralizing member registers. Decided on deploying additional SMS portals for town squads.'
      };
      onAddMeeting(conducted);
      onAddLog({
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        user: 'Super Admin',
        action: 'Conducted Meeting',
        details: `Conducted sandbox meeting ${meetSuccessId} and compiled initial MOM reports`,
        type: 'success'
      });
      setMeetStep(3);
    }
  };

  const handleMeetReset = () => {
    setMeetStep(1);
    setMeetTitle('');
    setMeetSuccessId('');
  };

  // --- 4. DONATION FLOW STATE ---
  const [donStep, setDonStep] = useState(1);
  const [donAmount, setDonAmount] = useState('10000');
  const [donMethod, setDonMethod] = useState('UPI / QR');
  const [donSuccessReceipt, setDonSuccessReceipt] = useState(null);

  const handleProcessDonation = () => {
    setDonStep(2); // Show Razorpay popup simulation
  };

  const handleAuthorizeDonation = () => {
    const amount = parseFloat(donAmount);
    const txId = `TXN-DON-${Math.floor(Math.random() * 90000) + 10000}`;
    const recId = `ABAS-TAX-2026-${Math.floor(Math.random() * 900) + 100}`;

    const newDon = {
      id: `DON-${Date.now()}`,
      donorName: 'Anonymous Citizen',
      email: 'citizen@abas.org.in',
      amount: amount,
      date: new Date().toISOString().substring(0, 10),
      paymentMethod: donMethod,
      transactionId: txId,
      taxExemptReceiptId: recId,
      project: 'General Welfare'
    };

    onAddDonation(newDon);
    setDonSuccessReceipt(newDon);

    onAddLog({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Anonymous Citizen',
      action: 'Donated Sandbox Funds',
      details: `Sponsorship of INR ${amount} authorised securely. Receipt generated.`,
      type: 'success'
    });

    setDonStep(3);
  };

  const handleDonReset = () => {
    setDonStep(1);
    setDonAmount('10000');
    setDonSuccessReceipt(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <PageHero
        eyebrow="System Flows"
        title="Interactive"
        script="flowcharts."
        intro="Step-by-step fully animated demonstrations of the complete structural system flowcharts and processes."
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div id="interactive-flows-container" className="p-6 md:p-10 bg-ink text-cream rounded-sm border border-border space-y-8">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-cream/10">
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold">SYSTEM FLOWCHARTS SANDBOX</span>
          <h2 className="font-display font-bold text-3xl tracking-tight text-cream leading-none">ABAS INTERACTIVE FLOWS</h2>
          <p className="text-xs text-cream/60">Step-by-step fully animated demonstrations of the complete structural system flowcharts.</p>
        </div>

        {/* Top selector tabs */}
        <div className="flex flex-wrap gap-1 bg-ink p-1 rounded-xl border border-cream/10">
          {[
            { id: 'auth', label: '1. Auth Flow', icon: UserPlus },
            { id: 'membership', label: '2. Membership Flow', icon: FileText },
            { id: 'meeting', label: '3. Meeting Flow', icon: Calendar },
            { id: 'donation', label: '4. Donation Flow', icon: Heart },
          ].map((flow) => {
            const Icon = flow.icon;
            const isActive = activeFlow === flow.id;
            return (
              <button
                key={flow.id}
                id={`flow-selector-${flow.id}`}
                onClick={() => { setActiveFlow(flow.id); }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold font-mono transition-all ${
                  isActive 
                    ? 'bg-saffron text-cream shadow' 
                    : 'text-cream/50 hover:bg-cream/5 hover:text-cream'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{flow.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. AUTHENTICATION FLOW STEPPER */}
      {activeFlow === 'auth' && (
        <div id="auth-flow-sandbox" className="grid lg:grid-cols-3 gap-8">
          
          {/* Stepper Diagram Progress */}
          <div className="lg:col-span-1 space-y-4 bg-ink/60 p-6 rounded-2xl border border-cream/10">
            <h4 className="font-display font-bold text-sm text-cream/80">FLOW CHART MILESTONES</h4>
            
            <div className="space-y-4 text-xs font-mono">
              {[
                { step: 1, label: 'Register / Signup', desc: 'User clicks Signup on main portal' },
                { step: 2, label: 'Email / Mobile Input', desc: 'Enter standard contact parameters' },
                { step: 3, label: 'OTP Verification', desc: 'Secure 4-digit verification code' },
                { step: 4, label: 'Create Password', desc: 'Define cryptographic password' },
                { step: 5, label: 'Success Redirection', desc: 'Landing on secure personal dashboard' },
              ].map((mil) => (
                <div key={mil.step} className="flex gap-3 relative">
                  {mil.step < 5 && (
                    <div className={`absolute left-4 top-8 w-0.5 h-6 ${
                      authStep > mil.step ? 'bg-indigo-500' : 'bg-slate-800'
                    }`} />
                  )}
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    authStep === mil.step ? 'bg-saffron text-cream shadow-lg ring-4 ring-indigo-500/10' :
                    authStep > mil.step ? 'bg-emerald-950 text-gold border border-emerald-800' :
                    'bg-ink/80 text-cream/50 border border-cream/10'
                  }`}>
                    {mil.step}
                  </div>
                  <div>
                    <p className={`font-semibold ${authStep === mil.step ? 'text-cream' : 'text-cream/60'}`}>{mil.label}</p>
                    <p className="text-[10px] text-cream/50">{mil.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sandbox workspace */}
          <div className="lg:col-span-2 bg-ink/40 border border-cream/10 p-6 md:p-8 rounded-3xl flex flex-col justify-between min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={authStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {authStep === 1 && (
                  <div className="space-y-4 text-center py-6">
                    <UserPlus className="w-12 h-12 text-gold mx-auto" />
                    <div className="space-y-1.5">
                      <h4 className="font-display font-bold text-xl text-cream">Create New ABAS Account</h4>
                      <p className="text-xs text-cream/60">Join the national directory workspace in seconds.</p>
                    </div>
                    <button 
                      id="btn-auth-start"
                      onClick={() => setAuthStep(2)}
                      className="bg-saffron hover:bg-gold text-cream font-semibold px-6 py-2.5 rounded-xl text-xs transition-all"
                    >
                      Begin Registration ➔
                    </button>
                  </div>
                )}

                {authStep === 2 && (
                  <div className="space-y-4 text-xs">
                    <h4 className="font-display font-bold text-base text-cream">Step 2: Enter Email or Mobile Contact</h4>
                    <p className="text-cream/60">We will dispatch an OTP verify token to authorize your contact.</p>
                    <div className="space-y-1">
                      <label className="font-semibold text-cream/80">Email Address / Phone</label>
                      <input 
                        id="auth-input-field"
                        type="text" 
                        required
                        value={authInput}
                        onChange={(e) => setAuthInput(e.target.value)}
                        placeholder="john.doe@example.com or 9876543210" 
                        className="w-full p-2.5 bg-ink border border-cream/10 rounded-xl text-cream text-xs" 
                      />
                    </div>
                    <button 
                      id="btn-auth-step2-next"
                      onClick={handleAuthNext}
                      disabled={!authInput}
                      className="bg-saffron hover:bg-gold disabled:opacity-50 text-cream font-semibold px-5 py-2 rounded-xl"
                    >
                      Send Verification Code
                    </button>
                  </div>
                )}

                {authStep === 3 && (
                  <div className="space-y-4 text-xs">
                    <h4 className="font-display font-bold text-base text-cream">Step 3: OTP Verification Code</h4>
                    <p className="text-cream/60">Type the simulated 4-digit verification code below: (Enter <strong>1234</strong> to pass)</p>
                    
                    <div className="space-y-2">
                      <input 
                        id="auth-otp-field"
                        type="text" 
                        maxLength={4}
                        value={authOTP}
                        onChange={(e) => setAuthOTP(e.target.value)}
                        placeholder="••••" 
                        className="w-32 p-3 bg-ink border border-cream/10 rounded-xl text-center text-lg tracking-widest font-mono text-cream focus:outline-none" 
                      />
                      {otpError && (
                        <p className="text-destructive font-mono text-[10px] flex items-center gap-1"><AlertCircle className="w-3 h-3" /> OTP incorrect. Enter "1234"</p>
                      )}
                    </div>

                    <button 
                      id="btn-auth-step3-next"
                      onClick={handleAuthNext}
                      className="bg-saffron hover:bg-gold text-cream font-semibold px-5 py-2 rounded-xl"
                    >
                      Verify Code
                    </button>
                  </div>
                )}

                {authStep === 4 && (
                  <div className="space-y-4 text-xs">
                    <h4 className="font-display font-bold text-base text-cream">Step 4: Establish Cryptographic Password</h4>
                    <p className="text-cream/60">Construct a password containing minimum 6 parameters.</p>
                    <div className="space-y-1">
                      <label className="font-semibold text-cream/80">Choose Password</label>
                      <input 
                        id="auth-password-field"
                        type="password" 
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full p-2.5 bg-ink border border-cream/10 rounded-xl text-cream" 
                      />
                    </div>
                    <button 
                      id="btn-auth-step4-next"
                      onClick={handleAuthNext}
                      disabled={authPassword.length < 4}
                      className="bg-saffron hover:bg-gold disabled:opacity-50 text-cream font-semibold px-5 py-2 rounded-xl"
                    >
                      Complete Account Creation
                    </button>
                  </div>
                )}

                {authStep === 5 && (
                  <div className="space-y-4 text-center py-6">
                    <CheckCircle2 className="w-12 h-12 text-gold mx-auto" />
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-xl text-cream">Registration Complete!</h4>
                      <p className="text-xs text-cream/60">Your credentials have been securely stored in memory.</p>
                    </div>
                    <div className="flex gap-2 justify-center pt-2">
                      <button 
                        id="btn-auth-goto-portal"
                        onClick={onNavigateToPortal}
                        className="bg-saffron hover:bg-gold text-cream font-semibold px-5 py-2 rounded-xl text-xs transition-all"
                      >
                        Enter Member Portal ➔
                      </button>
                      <button 
                        id="btn-auth-restart"
                        onClick={handleAuthReset}
                        className="bg-slate-800 border border-slate-700 text-cream/80 px-4 py-2 rounded-xl text-xs"
                      >
                        Run Sandbox Again
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* 2. MEMBERSHIP APPLICATION FLOW STEPPER */}
      {activeFlow === 'membership' && (
        <div id="membership-flow-sandbox" className="grid lg:grid-cols-3 gap-8">
          
          {/* Stepper Diagram Progress */}
          <div className="lg:col-span-1 space-y-4 bg-ink/60 p-6 rounded-2xl border border-cream/10">
            <h4 className="font-display font-bold text-sm text-cream/80">FLOW CHART MILESTONES</h4>
            
            <div className="space-y-4 text-xs font-mono">
              {[
                { step: 1, label: 'Select Membership', desc: 'Choose Life, Patron, or Ordinary' },
                { step: 2, label: 'Form Onboarding', desc: 'Fill address and contact details' },
                { step: 3, label: 'Upload Credentials', desc: 'Submit Aadhar or PAN proofs' },
                { step: 4, label: 'Payment Gateway', desc: 'Secure fee clearance via Razorpay' },
                { step: 5, label: 'Admin Approval Queue', desc: 'State chapter verification step' },
                { step: 6, label: 'Digital ID Generated', desc: 'Fetch verified ID card & QR' },
              ].map((mil) => (
                <div key={mil.step} className="flex gap-3 relative">
                  {mil.step < 6 && (
                    <div className={`absolute left-4 top-8 w-0.5 h-6 ${
                      membStep > mil.step ? 'bg-indigo-500' : 'bg-slate-800'
                    }`} />
                  )}
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    membStep === mil.step ? 'bg-saffron text-cream shadow-lg ring-4 ring-indigo-500/10' :
                    membStep > mil.step ? 'bg-emerald-950 text-gold border border-emerald-800' :
                    'bg-ink/80 text-cream/50 border border-cream/10'
                  }`}>
                    {mil.step}
                  </div>
                  <div>
                    <p className={`font-semibold ${membStep === mil.step ? 'text-cream' : 'text-cream/60'}`}>{mil.label}</p>
                    <p className="text-[10px] text-cream/50">{mil.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sandbox Workspace */}
          <div className="lg:col-span-2 bg-ink/40 border border-cream/10 p-6 md:p-8 rounded-3xl flex flex-col justify-between min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={membStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {membStep === 1 && (
                  <div className="space-y-4 text-xs">
                    <h4 className="font-display font-bold text-base text-cream">Step 1: Select Your Onboarding Classification</h4>
                    <p className="text-cream/60">Class specifications align voting privileges and community perks.</p>
                    
                    <div className="grid sm:grid-cols-3 gap-3 font-medium">
                      {[
                        { id: 'Life', price: '₹25,000', desc: 'Lifetime voter entry' },
                        { id: 'Patron', price: '₹51,000', desc: 'Core advisory boards' },
                        { id: 'Ordinary', price: '₹1,000', desc: 'Annual review card' },
                      ].map((pkg) => (
                        <div 
                          key={pkg.id}
                          onClick={() => setMembType(pkg.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            membType === pkg.id ? 'bg-saffron/20 border-saffron shadow-md shadow-saffron/10' : 'bg-ink border-cream/10'
                          }`}
                        >
                          <p className="font-bold text-cream text-sm">{pkg.id}</p>
                          <p className="text-gold font-mono font-bold mt-1">{pkg.price}</p>
                          <p className="text-[10px] text-cream/50 mt-2">{pkg.desc}</p>
                        </div>
                      ))}
                    </div>

                    <button 
                      id="btn-memb-step1-next"
                      onClick={() => setMembStep(2)}
                      className="bg-saffron hover:bg-gold text-cream font-semibold px-5 py-2 rounded-xl"
                    >
                      Onboard Application Form ➔
                    </button>
                  </div>
                )}

                {membStep === 2 && (
                  <div className="space-y-4 text-xs">
                    <h4 className="font-display font-bold text-base text-cream">Step 2: Onboard Application Details</h4>
                    <p className="text-cream/60">All directory listings are audited against government proof matrices.</p>

                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-cream/80">Full Name</label>
                        <input 
                          id="memb-form-name"
                          type="text" 
                          required
                          value={membName} 
                          onChange={(e) => setMembName(e.target.value)}
                          placeholder="e.g. Preeti Singhal" 
                          className="w-full p-2 bg-ink border border-cream/10 rounded-lg text-cream" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-cream/80">Email</label>
                        <input 
                          id="memb-form-email"
                          type="email" 
                          required
                          value={membEmail} 
                          onChange={(e) => setMembEmail(e.target.value)}
                          placeholder="preeti@example.com" 
                          className="w-full p-2 bg-ink border border-cream/10 rounded-lg text-cream" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-cream/80">Phone</label>
                        <input 
                          id="memb-form-phone"
                          type="tel" 
                          required
                          value={membPhone} 
                          onChange={(e) => setMembPhone(e.target.value)}
                          placeholder="9871234509" 
                          className="w-full p-2 bg-ink border border-cream/10 rounded-lg text-cream" 
                        />
                      </div>
                    </div>

                    <button 
                      id="btn-memb-step2-next"
                      onClick={() => setMembStep(3)}
                      disabled={!membName || !membPhone}
                      className="bg-saffron hover:bg-gold disabled:opacity-50 text-cream font-semibold px-5 py-2 rounded-xl"
                    >
                      Go to Document Upload
                    </button>
                  </div>
                )}

                {membStep === 3 && (
                  <div className="space-y-4 text-xs">
                    <h4 className="font-display font-bold text-base text-cream">Step 3: Upload National Credentials</h4>
                    <p className="text-cream/60">Simulate drag-and-drop PAN / Aadhar file validation.</p>

                    <div 
                      onClick={() => setMembDoc('aadhar_card_verified.pdf')}
                      className="border-2 border-dashed border-cream/10 hover:border-saffron cursor-pointer p-6 rounded-2xl bg-ink/60 text-center space-y-2 transition-colors"
                    >
                      <UploadCloud className="w-8 h-8 text-gold mx-auto" />
                      {membDoc ? (
                        <p className="text-gold font-semibold font-mono text-xs">✓ {membDoc} (Click to change)</p>
                      ) : (
                        <div>
                          <p className="font-bold">Click to upload mock files</p>
                          <p className="text-[10px] text-cream/50">Supports PDF, PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </div>

                    <button 
                      id="btn-memb-step3-next"
                      onClick={handleMembSubmitApp}
                      disabled={!membDoc}
                      className="bg-saffron hover:bg-gold disabled:opacity-50 text-cream font-semibold px-5 py-2 rounded-xl"
                    >
                      Submit & Clear Fee Invoices
                    </button>
                  </div>
                )}

                {membStep === 4 && (
                  <div className="space-y-4 text-xs">
                    <h4 className="font-display font-bold text-base text-cream">Step 4: Secure Razorpay Payment Gateway</h4>
                    <p className="text-cream/60">Complete standard payment clearance securely.</p>

                    <div className="bg-ink border border-cream/10 p-4 rounded-xl space-y-2 font-mono">
                      <div className="flex justify-between text-cream/50">
                        <span>Classification Dues ({membType}):</span>
                        <span>₹{membType === 'Patron' ? '51,000' : membType === 'Life' ? '25,000' : '1,000'}</span>
                      </div>
                      <div className="flex justify-between text-cream font-bold border-t border-cream/10 pt-2">
                        <span>PAYABLE AMOUNT:</span>
                        <span>₹{membType === 'Patron' ? '51,000' : membType === 'Life' ? '25,000' : '1,000'}</span>
                      </div>
                    </div>

                    <button 
                      id="btn-memb-gateway-simulate"
                      onClick={handleMembPayment}
                      disabled={gatewayProcessing}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-cream font-bold py-2.5 rounded-xl flex items-center justify-center gap-2"
                    >
                      {gatewayProcessing ? 'Processing SECURE-3D Transmit...' : `Clear Dues with Mock Razorpay Gateway`}
                    </button>
                  </div>
                )}

                {membStep === 5 && (
                  <div className="space-y-4 text-center py-6 text-xs">
                    <AlertCircle className="w-12 h-12 text-amber-400 mx-auto animate-pulse" />
                    <div className="space-y-1.5">
                      <h4 className="font-display font-bold text-lg text-cream">Application Dispatched to Admin Queue</h4>
                      <p className="text-cream/60 leading-relaxed max-w-sm mx-auto">
                        Your Life registry is created under pending reference <strong>{createdMemberId}</strong>. We can simulate immediate board check and sign-off.
                      </p>
                    </div>

                    <button 
                      id="btn-memb-admin-approve"
                      onClick={handleSimulateApproval}
                      className="bg-saffron hover:bg-gold text-cream font-bold px-6 py-2.5 rounded-xl transition-all"
                    >
                      Simulate Admin Approvals Sign-off ➔
                    </button>
                  </div>
                )}

                {membStep === 6 && (
                  <div className="space-y-4 text-center py-6 text-xs">
                    <BadgeCheck className="w-12 h-12 text-gold mx-auto" />
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-xl text-cream">Account Activated!</h4>
                      <p className="text-cream/60">Digital ID Card has been securely generated in registry databases.</p>
                    </div>
                    <div className="flex gap-2 justify-center pt-2">
                      <button 
                        id="btn-memb-exit"
                        onClick={onNavigateToPortal}
                        className="bg-saffron hover:bg-gold text-cream font-semibold px-5 py-2 rounded-xl"
                      >
                        Enter Portal Workspace
                      </button>
                      <button 
                        id="btn-memb-retry"
                        onClick={handleMembReset}
                        className="bg-slate-800 border border-slate-700 text-cream/80 px-4 py-2 rounded-xl"
                      >
                        Run Sandbox Again
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* 3. MEETING MANAGEMENT FLOW STEPPER */}
      {activeFlow === 'meeting' && (
        <div id="meeting-flow-sandbox" className="grid lg:grid-cols-3 gap-8">
          
          {/* Stepper Diagram Progress */}
          <div className="lg:col-span-1 space-y-4 bg-ink/60 p-6 rounded-2xl border border-cream/10">
            <h4 className="font-display font-bold text-sm text-cream/80">FLOW CHART MILESTONES</h4>
            
            <div className="space-y-4 text-xs font-mono">
              {[
                { step: 1, label: 'Create Conference', desc: 'Schedule topics and define parameters' },
                { step: 2, label: 'Broadcast Invites', desc: 'Dispatch SMS/Email haptic networks' },
                { step: 3, label: 'Mark Attendance & MOM', desc: 'Mark attendee logs and draft meeting MOMs' },
              ].map((mil) => (
                <div key={mil.step} className="flex gap-3 relative">
                  {mil.step < 3 && (
                    <div className={`absolute left-4 top-8 w-0.5 h-6 ${
                      meetStep > mil.step ? 'bg-indigo-500' : 'bg-slate-800'
                    }`} />
                  )}
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    meetStep === mil.step ? 'bg-saffron text-cream shadow-lg ring-4 ring-indigo-500/10' :
                    meetStep > mil.step ? 'bg-emerald-950 text-gold border border-emerald-800' :
                    'bg-ink/80 text-cream/50 border border-cream/10'
                  }`}>
                    {mil.step}
                  </div>
                  <div>
                    <p className={`font-semibold ${meetStep === mil.step ? 'text-cream' : 'text-cream/60'}`}>{mil.label}</p>
                    <p className="text-[10px] text-cream/50">{mil.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sandbox Workspace */}
          <div className="lg:col-span-2 bg-ink/40 border border-cream/10 p-6 md:p-8 rounded-3xl flex flex-col justify-between min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={meetStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {meetStep === 1 && (
                  <div className="space-y-4 text-xs">
                    <h4 className="font-display font-bold text-base text-cream">Step 1: Construct Committee Meeting</h4>
                    <p className="text-cream/60">Set meeting agenda and dispatch notices to district squads.</p>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-cream/80 font-semibold">Conference Title</label>
                        <input 
                          id="meet-title-field"
                          type="text" 
                          required
                          value={meetTitle} 
                          onChange={(e) => setMeetTitle(e.target.value)}
                          placeholder="e.g. Shiksha Vibhag Budget Alignment" 
                          className="w-full p-2.5 bg-ink border border-cream/10 rounded-xl text-cream text-xs focus:outline-none" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-cream/80 font-semibold">Agenda Points</label>
                        <textarea 
                          id="meet-agenda-field"
                          value={meetAgenda} 
                          onChange={(e) => setMeetAgenda(e.target.value)}
                          rows={3} 
                          className="w-full p-2.5 bg-ink border border-cream/10 rounded-xl text-cream text-xs focus:outline-none" 
                        />
                      </div>
                    </div>

                    <button 
                      id="btn-meet-step1-next"
                      onClick={handleCreateMeeting}
                      disabled={!meetTitle}
                      className="bg-saffron hover:bg-gold disabled:opacity-50 text-cream font-semibold px-5 py-2 rounded-xl"
                    >
                      Create Meeting & Notify
                    </button>
                  </div>
                )}

                {meetStep === 2 && (
                  <div className="space-y-4 text-center py-6 text-xs">
                    <Send className="w-12 h-12 text-gold mx-auto animate-bounce" />
                    <div className="space-y-1.5">
                      <h4 className="font-display font-bold text-lg text-cream">Broadcast Invites Transmitting</h4>
                      <p className="text-cream/60 leading-relaxed max-w-sm mx-auto">
                        Broadband notice logs are broadcasting to all matched state chapters. We can simulate immediate meeting start and sign attendance.
                      </p>
                    </div>

                    <button 
                      id="btn-meet-conduct"
                      onClick={handleConductMeeting}
                      className="bg-saffron hover:bg-gold text-cream font-bold px-6 py-2.5 rounded-xl transition-all"
                    >
                      Simulate Conducting Meeting ➔
                    </button>
                  </div>
                )}

                {meetStep === 3 && (
                  <div className="space-y-4 text-center py-6 text-xs">
                    <ClipboardList className="w-12 h-12 text-gold mx-auto" />
                    <div className="space-y-1.5">
                      <h4 className="font-display font-bold text-xl text-cream">MOM Compiled & Saved!</h4>
                      <p className="text-cream/60 max-w-md mx-auto">
                        Meeting has been resolved successfully. Attending register signed, and MOM notes saved to memory databases.
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center pt-2">
                      <button 
                        id="btn-meet-sandbox-exit"
                        onClick={onNavigateToPortal}
                        className="bg-saffron hover:bg-gold text-cream font-semibold px-5 py-2 rounded-xl"
                      >
                        Check Portal Meetings
                      </button>
                      <button 
                        id="btn-meet-sandbox-retry"
                        onClick={handleMeetReset}
                        className="bg-slate-800 border border-slate-700 text-cream/80 px-4 py-2 rounded-xl"
                      >
                        Schedule Another
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* 4. DONATION FLOW STEPPER */}
      {activeFlow === 'donation' && (
        <div id="donation-flow-sandbox" className="grid lg:grid-cols-3 gap-8">
          
          {/* Stepper Diagram Progress */}
          <div className="lg:col-span-1 space-y-4 bg-ink/60 p-6 rounded-2xl border border-cream/10">
            <h4 className="font-display font-bold text-sm text-cream/80">FLOW CHART MILESTONES</h4>
            
            <div className="space-y-4 text-xs font-mono">
              {[
                { step: 1, label: 'Enter Amount', desc: 'Input custom charity parameters' },
                { step: 2, label: 'Razorpay Gateway', desc: 'Secure card / netbanking popover' },
                { step: 3, label: 'Receipt & 80G log', desc: 'Download instant certified receipts' },
              ].map((mil) => (
                <div key={mil.step} className="flex gap-3 relative">
                  {mil.step < 3 && (
                    <div className={`absolute left-4 top-8 w-0.5 h-6 ${
                      donStep > mil.step ? 'bg-indigo-500' : 'bg-slate-800'
                    }`} />
                  )}
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    donStep === mil.step ? 'bg-saffron text-cream shadow-lg ring-4 ring-indigo-500/10' :
                    donStep > mil.step ? 'bg-emerald-950 text-gold border border-emerald-800' :
                    'bg-ink/80 text-cream/50 border border-cream/10'
                  }`}>
                    {mil.step}
                  </div>
                  <div>
                    <p className={`font-semibold ${donStep === mil.step ? 'text-cream' : 'text-cream/60'}`}>{mil.label}</p>
                    <p className="text-[10px] text-cream/50">{mil.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sandbox Workspace */}
          <div className="lg:col-span-2 bg-ink/40 border border-cream/10 p-6 md:p-8 rounded-3xl flex flex-col justify-between min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={donStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {donStep === 1 && (
                  <div className="space-y-4 text-xs">
                    <h4 className="font-display font-bold text-base text-cream">Step 1: Enter Custom Welfare Sponsorship</h4>
                    <p className="text-cream/60">All contributions go directly towards sponsoring local trade setups and school higher-education credits.</p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-cream/80">Amount (INR)</label>
                        <input 
                          id="don-amount-field"
                          type="number" 
                          required
                          value={donAmount} 
                          onChange={(e) => setDonAmount(e.target.value)}
                          placeholder="10000" 
                          className="w-full p-2.5 bg-ink border border-cream/10 rounded-xl text-cream text-xs focus:outline-none" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-cream/80">Preferred Channel</label>
                        <select 
                          id="don-method-select"
                          value={donMethod} 
                          onChange={(e) => setDonMethod(e.target.value)}
                          className="w-full p-2.5 bg-ink border border-cream/10 rounded-xl text-cream focus:outline-none"
                        >
                          <option>UPI / QR code</option>
                          <option>Netbanking</option>
                          <option>Credit / Debit Card</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      id="btn-don-step1-next"
                      onClick={handleProcessDonation}
                      className="bg-saffron hover:bg-gold text-cream font-semibold px-5 py-2 rounded-xl"
                    >
                      Authorize Transaction ➔
                    </button>
                  </div>
                )}

                {donStep === 2 && (
                  <div className="space-y-4 text-xs">
                    <h4 className="font-display font-bold text-base text-cream">Step 2: Razorpay Gateway Simulated Pop-over</h4>
                    <p className="text-cream/60">Simulating bank-grade encryption clearing pipelines.</p>

                    <div className="bg-ink border border-cream/10 p-5 rounded-2xl flex flex-col justify-between h-32">
                      <div className="flex justify-between items-center border-b border-cream/10 pb-2">
                        <span className="font-bold text-cream">RAZORPAY SECURE MODULE</span>
                        <span className="text-[10px] text-gold font-mono">ENCRYPTED</span>
                      </div>
                      <p className="text-center font-mono font-bold text-lg text-cream">INR {parseFloat(donAmount).toLocaleString()}</p>
                    </div>

                    <button 
                      id="btn-don-gateway-auth"
                      onClick={handleAuthorizeDonation}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-cream font-bold py-2.5 rounded-xl transition-all"
                    >
                      Authorize Sandbox Payment Gateway
                    </button>
                  </div>
                )}

                {donStep === 3 && (
                  <div className="space-y-4 text-xs">
                    <div className="flex justify-between items-center border-b border-cream/10 pb-3">
                      <h4 className="font-display font-bold text-sm text-cream">Donation Processed Successfully!</h4>
                      <span className="bg-emerald-950/40 text-gold border border-gold/40 px-2 py-0.5 rounded font-mono text-[9px]">
                        SUCCESS
                      </span>
                    </div>

                    {donSuccessReceipt && (
                      <div className="bg-white text-slate-950 p-5 rounded-xl border border-slate-200 font-mono text-[10px] space-y-3">
                        <div className="text-center border-b pb-2">
                          <p className="font-bold text-slate-900">ABAS INDIA CHARITY TRUST</p>
                          <p className="text-[8px] text-cream/60">80G Certified Exemption Receipt</p>
                        </div>
                        <div className="space-y-1 text-slate-600">
                          <p><strong>Receipt Reference:</strong> {donSuccessReceipt.taxExemptReceiptId}</p>
                          <p><strong>Donor Designation:</strong> {donSuccessReceipt.donorName}</p>
                          <p><strong>Sponsor Fund:</strong> INR {donSuccessReceipt.amount.toLocaleString()}</p>
                          <p><strong>Gateway Token:</strong> {donSuccessReceipt.transactionId}</p>
                          <p><strong>Log Date:</strong> {donSuccessReceipt.date}</p>
                        </div>
                        <div className="text-[8px] text-cream/60 text-center border-t pt-2">
                          Authorized digitally by ABAS Central Secretariat.
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 justify-center pt-2">
                      <button 
                        id="btn-don-print"
                        onClick={() => window.print()}
                        className="bg-saffron hover:bg-gold text-cream font-semibold px-4 py-2 rounded-xl text-[11px] flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" /> Print 80G Exemption Receipt
                      </button>
                      <button 
                        id="btn-don-retry"
                        onClick={handleDonReset}
                        className="bg-slate-800 border border-slate-700 text-cream/80 px-4 py-2 rounded-xl text-[11px]"
                      >
                        Sponsor Another
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

