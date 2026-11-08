import type {Metadata} from 'next';
import {Camera,ArrowUpRight} from 'lucide-react';
import {Header,Footer,QuoteCTA} from '../ui';
export const metadata:Metadata={title:'Countertop Project Gallery',description:'RIOS countertop project gallery for kitchen and bathroom installations in Maryland, Washington, DC and Virginia. Ask about granite and quartz options for your home.',alternates:{canonical:'/gallery'}};
export default function Gallery(){return <><Header/><main id="main"><section className="page-intro"><div className="wrap"><p className="eyebrow">THE RIOS GALLERY</p><h1>The details.<br/><em>The finished spaces.</em></h1><p>A place for the kitchens, bathrooms and stone surfaces we bring to life.</p></div></section><section className="wrap gallery-empty"><p>Project photos coming soon.</p></section></main><Footer/></>}
