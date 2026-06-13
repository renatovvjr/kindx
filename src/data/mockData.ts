export type HelpItem = {
  id: string;
  type: 'request' | 'offer';
  userName: string;
  title: string;
  category: string;
  description: string;
  location: string;
  distance: string;
  time: string;
  latitude: number;
  longitude: number;
};

export const helpItems: HelpItem[] = [
  {
    id: 'request-1',
    type: 'request',
    userName: 'Maya Chen',
    title: 'Pharmacy pickup today',
    category: 'Groceries',
    description: 'Need help picking up essentials from the pharmacy this afternoon.',
    location: 'Newtown',
    distance: '1.2 km',
    time: '12 min ago',
    latitude: -33.897,
    longitude: 151.18,
  },
  {
    id: 'offer-1',
    type: 'offer',
    userName: 'Daniel Smith',
    title: 'Short local rides',
    category: 'Transport',
    description: 'Available for short rides around the inner west on Saturday morning.',
    location: 'Marrickville',
    distance: '2.4 km',
    time: '26 min ago',
    latitude: -33.911,
    longitude: 151.155,
  },
  {
    id: 'request-2',
    type: 'request',
    userName: 'Aisha Khan',
    title: 'Translation for appointment',
    category: 'Translation',
    description: 'Looking for Portuguese to English support for a community clinic visit.',
    location: 'Sydney CBD',
    distance: '3.1 km',
    time: '1 hr ago',
    latitude: -33.8688,
    longitude: 151.2093,
  },
  {
    id: 'offer-2',
    type: 'offer',
    userName: 'Renato Valle',
    title: 'Weekend tech help',
    category: 'Home tasks',
    description: 'Can help set up phones, apps, documents, and basic digital services.',
    location: 'Surry Hills',
    distance: '1.8 km',
    time: '2 hrs ago',
    latitude: -33.884,
    longitude: 151.212,
  },
];

export const conversations = [
  {
    id: 'chat-1',
    userName: 'Maya Chen',
    context: 'Pharmacy pickup today',
    latest: 'Thank you. Afternoon works for me.',
    time: 'Now',
    unread: 2,
  },
  {
    id: 'chat-2',
    userName: 'Daniel Smith',
    context: 'Short local rides',
    latest: 'I can help Saturday after 9am.',
    time: '9:42',
    unread: 0,
  },
  {
    id: 'chat-3',
    userName: 'Aisha Khan',
    context: 'Translation for appointment',
    latest: 'The clinic is near Central station.',
    time: 'Yesterday',
    unread: 0,
  },
];

export const notifications = [
  {
    id: 'n-1',
    title: 'New nearby request',
    body: 'Maya requested grocery help 1.2 km away.',
    time: '5 min ago',
    unread: true,
  },
  {
    id: 'n-2',
    title: 'Offer matched',
    body: 'Daniel offers transport near your selected area.',
    time: '22 min ago',
    unread: true,
  },
  {
    id: 'n-3',
    title: 'Message received',
    body: 'Aisha replied about translation support.',
    time: 'Yesterday',
    unread: false,
  },
];
