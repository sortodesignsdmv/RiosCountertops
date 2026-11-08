import type {MetadataRoute} from 'next';
export default function sitemap():MetadataRoute.Sitemap{return ['', '/services','/why-rios','/gallery','/contact'].map(path=>({url:'https://rios-granite-quartz-studio.samuelsorto94.chatgpt.site'+path,changeFrequency:'monthly',priority:path===''?1:0.8}))}
