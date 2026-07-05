// ============================================
// Donor Feed Data — Mock real-time donor feed
// ============================================

export const donorFeed = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Austin, TX',
    amount: '$50',
    type: 'one-time',
    time: '2 minutes ago',
    initials: 'SM',
    gradient: 'linear-gradient(135deg, #0E6BA8, #36A2EB)',
  },
  {
    id: 2,
    name: 'Anonymous',
    location: '',
    amount: '$100',
    type: 'one-time',
    time: '8 minutes ago',
    initials: 'A',
    gradient: 'linear-gradient(135deg, #2ECC71, #1A8A4E)',
  },
  {
    id: 3,
    name: 'James K.',
    location: 'Portland, OR',
    amount: '$25/month',
    type: 'monthly',
    time: '15 minutes ago',
    initials: 'JK',
    gradient: 'linear-gradient(135deg, #F39C12, #F1C40F)',
  },
  {
    id: 4,
    name: 'The Chen Family',
    location: 'San Francisco, CA',
    amount: '$250',
    type: 'one-time',
    time: '23 minutes ago',
    initials: 'CF',
    gradient: 'linear-gradient(135deg, #E74C3C, #F39C12)',
  },
  {
    id: 5,
    name: 'David R.',
    location: 'New York, NY',
    amount: '$1,000',
    type: 'one-time',
    time: '1 hour ago',
    initials: 'DR',
    gradient: 'linear-gradient(135deg, #083D61, #0E6BA8)',
  },
  {
    id: 6,
    name: 'Maria L.',
    location: 'Chicago, IL',
    amount: '$50/month',
    type: 'monthly',
    time: '2 hours ago',
    initials: 'ML',
    gradient: 'linear-gradient(135deg, #1A8A4E, #0E6BA8)',
  },
  {
    id: 7,
    name: 'Anonymous',
    location: '',
    amount: '$500',
    type: 'one-time',
    time: '3 hours ago',
    initials: 'A',
    gradient: 'linear-gradient(135deg, #F1C40F, #2ECC71)',
  },
]

// Donation amount presets with impact descriptions
export const donationAmounts = [
  { amount: 25, impact: 'Clean water for one family for 3 months' },
  { amount: 50, impact: 'Water pump maintenance for one well' },
  { amount: 100, impact: 'Safe sanitation for a classroom' },
  { amount: 250, impact: 'Water access for a village for 30 days' },
  { amount: 500, impact: 'Fund an entire school water programme' },
  { amount: 1000, impact: 'Sponsor a new borehole installation' },
]

// Other ways to give
export const otherWays = [
  {
    icon: 'building',
    title: 'Corporate Matching',
    description: 'Double your impact through your employer\'s matching gift program.',
  },
  {
    icon: 'will',
    title: 'Planned Giving',
    description: 'Include AquaHope in your estate plans and leave a lasting legacy.',
  },
  {
    icon: 'chart',
    title: 'Stock Donations',
    description: 'Donate appreciated securities and avoid capital gains tax.',
  },
  {
    icon: 'bank',
    title: 'Wire Transfer',
    description: 'Direct bank transfers for larger institutional gifts.',
  },
]
