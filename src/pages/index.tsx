import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import {
  useExperienceBuilderComponents,
  useExperienceBuilder,
  CompositionRoot,
} from '@contentful/experience-builder';
import Card from '@/components/Card';
import dynamic from 'next/dynamic';

export function Home() {
  const isPreview = false; // urlParams.get('isPreview');
  const initialLocale = 'en-US';
  const spaceId = process.env.NEXT_PUBLIC_SPACE_ID || '';
  const environmentId = process.env.NEXT_PUBLIC_ENVIRONMENT_ID || 'master';
  const accessToken = isPreview
    ? process.env.NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN
    : process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const host = isPreview
    ? process.env.NEXT_PUBLIC_PREVIEW_HOST
    : process.env.NEXT_PUBLIC_HOST;

  const { experience, locale } = useExperienceBuilder({
    spaceId,
    environmentId,
    accessToken,
    initialLocale,
    host,
  });

  const { defineComponent } = useExperienceBuilderComponents();

  // Step 1: Load the page as is and see the window.location error
  // Step 2: Comment out the `defineComponent` call below and see the window.location error goes away, but now you get a hydration error

  defineComponent(Card, {
    id: 'card',
    name: 'Card',
    category: 'Control',
    variables: {
      text: {
        displayName: 'Text',
        type: 'Text',
        defaultValue: 'text',
      },
      imageUrl: {
        displayName: 'Image URL',
        type: 'Text',
        defaultValue: 'https://picsum.photos/200/300',
      },
    },
  });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      test
      <CompositionRoot
        experience={experience}
        locale={locale || initialLocale}
        slug="testpage"
      />
    </main>
  );
}

// Step 3: Comment the line below and uncomment the dynamic export and see they hydration error go way
// Step 4: Uncomment the `defineComponent` call above and see the page render as it should

export default Home;

// export default dynamic(() => Promise.resolve(Home), {
//   ssr: false,
// });
