import { PortableText, type PortableTextBlock, type PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-12 text-3xl font-semibold text-white">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-10 text-2xl font-semibold text-white">{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  },
  list: {
    bullet: ({ children }) => <ul className="ml-6 list-disc">{children}</ul>,
    number: ({ children }) => <ol className="ml-6 list-decimal">{children}</ol>
  }
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
