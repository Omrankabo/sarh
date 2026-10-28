import localFont from 'next/font/local';
import './globals.css';
import './dashboard.css';
import './learning.css';
import './motion.css';
import './session-widget.css';
import './polish.css';
import './semester-seven.css';
import './recall.css';
import './artwork.css';
import 'katex/dist/katex.min.css';
import StartupSplash from '@/components/StartupSplash';
import NavigationMotion from '@/components/NavigationMotion';
import {Suspense} from 'react';
const arabic=localFont({src:[{path:'../../public/fonts/arabic-regular.ttf',weight:'400'},{path:'../../public/fonts/arabic-semibold.ttf',weight:'600 800'}],variable:'--font-ar',display:'swap'});
const english=localFont({src:'../../public/fonts/latin.ttf',variable:'--font-en',display:'swap'});
const poetry=localFont({src:'../../public/fonts/poetry.ttf',variable:'--font-poetry',display:'swap'});
export const metadata={title:'صَرح | Build understanding',description:'A bilingual visual study space for engineering: understand, calculate, practice and explain.',icons:{icon:'/icon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ar" suppressHydrationWarning><body className={`${arabic.variable} ${english.variable} ${poetry.variable}`}><Suspense fallback={null}><StartupSplash/><NavigationMotion/></Suspense>{children}</body></html>}
