import shikshaImg from "../assets/ShikshaVibhag.avif";
import healthImg from "../assets/health.jpg";
import womenImg from "../assets/women-empowerment.jpg";
import paryavaranImg from "../assets/paryavaran.jpg";
import itvibhagImg from "../assets/itblack.jpg";
import MarriageBureauImg from "../assets/marriagebureau.jpg";
import VyaparKoshImg from "../assets/vyaparkosh.png";
import rozgarYojnaImg from "../assets/rozgaryojna.jpg";

import {
  Briefcase,
  Building2,
  GraduationCap,
  Heart,
  Leaf,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";

export const departments = [
  { icon: Heart, name: "Marriage Bureau", desc: "Trusted matrimony platform serving Agrawal families across Bharat.", image: MarriageBureauImg },
  { icon: Briefcase, name: "Vyapar Kosh", desc: "Interest-free capital and mentorship for young Agrawal entrepreneurs.", image: VyaparKoshImg },
  { icon: GraduationCap, name: "Shiksha Vibhag", desc: "Scholarships, coaching support and career guidance for students.", image: shikshaImg },
  { icon: Stethoscope, name: "Health Vibhag", desc: "Free medical camps, blood donation drives and hospital tie-ups.", image: healthImg },
  { icon: Sparkles, name: "IT Vibhag", desc: "Digital literacy, tech skills and internships for the next generation.", image: itvibhagImg },
  { icon: Users, name: "Women Empowerment", desc: "Skill-training, self-help groups and leadership programs for behens.", image: womenImg },
  { icon: Leaf, name: "Paryavaran Vibhag", desc: "Tree plantation, water conservation and sustainable community drives.", image: paryavaranImg },
  { icon: Building2, name: "Rozgar Yojna", desc: "Job placements, apprenticeships and small-business incubation.", image: rozgarYojnaImg },
];

export const projects = [
  { tag: "Ongoing", title: "Agrasen Vidya Kendra — Jaipur", desc: "A CBSE-affiliated school serving 800+ children from working families with subsidised fees.", image: shikshaImg, year: "2023 →" },
  { tag: "Ongoing", title: "Swasthya Rath — Rural Health Camps", desc: "Mobile clinics visiting 42 villages every quarter across Rajasthan & Madhya Pradesh.", image: healthImg, year: "2022 →" },
  { tag: "Completed", title: "Silai Kendra for Behens", desc: "Trained 1,240 women in tailoring and gave them starter machines and market access.", image: womenImg, year: "2024" },
  { tag: "Future", title: "One Lakh Trees — Agrasen Vatika", desc: "A pan-India plantation drive to grow native trees in every district by 2028.", image: paryavaranImg, year: "2026 →" },
];

export const events = [
  { date: "14 Sep", year: "2026", title: "Agrasen Jayanti — National Sammelan, Delhi", place: "Talkatora Stadium" },
  { date: "02 Oct", year: "2026", title: "Youth Leadership Shivir", place: "Udaipur" },
  { date: "20 Nov", year: "2026", title: "Women Entrepreneurs Meet", place: "Ahmedabad" },
  { date: "10 Jan", year: "2027", title: "Vyapar Kosh Investor Meet", place: "Mumbai" },
  { date: "22 Feb", year: "2027", title: "Paryavaran Plantation Drive", place: "Pan-India" },
];

export const teams = [
  { name: "National Team", desc: "The apex council that sets vision, policy and pan-Bharat programs.", count: "24 members" },
  { name: "State Teams", desc: "State-level councils coordinating vibhags across every pradesh.", count: "28 states" },
  { name: "District Teams", desc: "Ground leadership running local sammelans and welfare drives.", count: "410 districts" },
  { name: "Town Teams", desc: "City chapters mobilising volunteers for events and outreach.", count: "1,200+ towns" },
  { name: "Sector Teams", desc: "Domain experts leading each vibhag — health, education, IT, business.", count: "12 sectors" },
  { name: "Colony / Society Teams", desc: "The last-mile — neighbourhood volunteers who know every family.", count: "8,500+" },
];

export const news = [
  { kicker: "Announcement", date: "12 Jun 2026", title: "ABAS launches scholarship for 500 rural students", excerpt: "The Shiksha Vibhag opens applications for its largest-ever merit-cum-need scholarship covering fees, books and hostel." },
  { kicker: "Report", date: "04 May 2026", title: "10,000 saplings planted across 8 states this monsoon", excerpt: "Volunteers of Paryavaran Vibhag mobilised local youth to plant native trees in schools and public parks." },
  { kicker: "Story", date: "21 Apr 2026", title: "How the Silai Kendra changed Meera behen's life", excerpt: "From a small village in Sikar to running her own boutique — a story of what mentorship + microcapital can do." },
];
