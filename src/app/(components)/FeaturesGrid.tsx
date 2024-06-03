import { Download, Globe, CodeXml, Sparkles, Palette } from 'lucide-react';

import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';

const features = [
  {
    Icon: Sparkles,
    name: 'AI & Templates',
    description:
      'Generate your form from scratch using AI or one of our templates.',
    href: '/dashboard',
    cta: 'Get started',
    background: <img className='absolute -right-20 -top-20 opacity-60' />,
    className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
  },
  {
    Icon: Palette,
    name: 'Fully customizable',
    description: 'Edit your form as needed using drag and drop.',
    href: '/dashboard',
    cta: 'Get started',
    background: <img className='absolute -right-20 -top-20 opacity-60' />,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
  },
  {
    Icon: CodeXml,
    name: 'No Code',
    description: 'Friendly UI to create forms.',
    href: '/dashboard',
    cta: 'Get started',
    background: <img className='absolute -right-20 -top-20 opacity-60' />,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
  },
  {
    Icon: Globe,
    name: 'Hosted forms',
    description: 'Use the calendar to filter your files by date.',
    href: '/dashboard',
    cta: 'Get started',
    background: <img className='absolute -right-20 -top-20 opacity-60' />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
  },
  {
    Icon: Download,
    name: 'Download',
    description:
      'Get access to all your users submissions data and export it locally.',
    href: '/dashboard',
    cta: 'Get started',
    background: <img className='absolute -right-20 -top-20 opacity-60' />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4',
  },
];

export async function FeaturesGrid() {
  return (
    <BentoGrid className='lg:grid-rows-3'>
      {features.map(feature => (
        <BentoCard
          key={feature.name}
          {...feature}
        />
      ))}
    </BentoGrid>
  );
}
