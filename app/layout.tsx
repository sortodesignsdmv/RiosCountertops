import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://rios-granite-quartz-studio.samuelsorto94.chatgpt.site'),
  title: { default: 'Granite & Quartz Countertops in Maryland & DC | RIOS', template: '%s | RIOS Granite & Quartz' },
  description: 'Explore granite and quartz countertop installation, bathroom vanities, replacements and repairs with RIOS in Maryland and Washington, DC. Request a free estimate.',
  alternates: { canonical: '/' },
  openGraph: { title: 'RIOS Granite & Quartz', description: 'Beautiful stone. Exceptional finish. Granite and quartz countertops for Maryland and Washington, DC.', type: 'website', locale: 'en_US', images: ['https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=85'] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'HomeAndConstructionBusiness',name:'RIOS Granite & Quartz',url:'https://rios-granite-quartz-studio.samuelsorto94.chatgpt.site',telephone:'+12407937288',email:'riosumanzor1984@gmail.com',areaServed:['Maryland','Washington, DC'],hasOfferCatalog:{'@type':'OfferCatalog',name:'Countertop services',itemListElement:['Granite countertops','Quartz countertops','Kitchen countertops','Bathroom vanities','Countertop replacement','Countertop repairs'].map(name=>({'@type':'Offer',itemOffered:{'@type':'Service',name}}))}})}}/></body>
    </html>
  );
}
