import type {MetadataRoute} from 'next';
import {studyPaths} from '@/lib/content';
export default function sitemap():MetadataRoute.Sitemap{return ['ar','en'].flatMap(lang=>studyPaths().map(path=>({url:`https://sarh-sigma.vercel.app/${lang}${path.length?'/'+path.join('/'):''}`,alternates:{languages:{ar:`https://sarh-sigma.vercel.app/ar${path.length?'/'+path.join('/'):''}`,en:`https://sarh-sigma.vercel.app/en${path.length?'/'+path.join('/'):''}`}}})));}
