'use client'

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Tooltip, DropdownSection, Avatar,
} from "@heroui/react";

import Link from "next/link";

import {
    FaArrowAltCircleLeft,
    FaChevronDown, FaChevronUp,
    FaFacebook,
    FaFacebookSquare, FaGem,
    FaInstagram,
    FaPhoneAlt
} from "react-icons/fa";

import {PiAcornFill, PiCardsThreeFill, PiFlowerTulipBold, PiFlowerTulipFill} from "react-icons/pi";
import {
    GiChestnutLeaf,
    GiCurlingVines,
    GiDoorway,
    GiDragonfly,
    GiFairyWings,
    GiLilyPads,
    GiWindowBars
} from "react-icons/gi";
import { BsDoorOpenFill } from "react-icons/bs";
import {IoHammerSharp, IoRose} from "react-icons/io5";
import {LuLamp, LuLampFloor} from "react-icons/lu";
import {IoIosGrid} from "react-icons/io";
import {useState} from "react";

import {motion} from "motion/react"
import {AiFillInstagram} from "react-icons/ai";
import {RiFacebookBoxFill, RiInstagramFill, RiMailFill} from "react-icons/ri";
import {ImMail4} from "react-icons/im";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {FaLandmarkDome} from "react-icons/fa6";
import {BiArch, BiVerticalTop} from "react-icons/bi";
import {LiaPencilRulerSolid} from "react-icons/lia";
import {MdChurch, MdGridGoldenratio, MdVideoLibrary} from "react-icons/md";

export default function NavbarGlassArtista() {

    const LOCALES = ['hu', 'de', 'en'];
    const DEFAULT_LOCALE = 'en';
    const COOKIE_NAME = 'NEXT_LOCALE';
    const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

    // Host configuration (client-side mirror of middleware)
    const HOST_CONFIG = {
        'tiffanystudio.at': {defaultLocale: 'de', hideDefault: true, isStudio: true},
        'tiffanystudio.hu': {defaultLocale: 'hu', hideDefault: true, isStudio: true},
        'glassartista.com': {defaultLocale: 'de', hideDefault: true, isStudio: false},
        'localhost': {defaultLocale: 'de', hideDefault: true, isStudio: false} // same behaviour as glassartista.com
    };

    function getHostCfg() {
        if (typeof window === 'undefined') return {defaultLocale: DEFAULT_LOCALE, hideDefault: false, isStudio: false};
        const host = window.location.hostname.replace(/^www\./, '').toLowerCase();
        return HOST_CONFIG[host] || {defaultLocale: DEFAULT_LOCALE, hideDefault: false, isStudio: false};
    }

    const hostCfg = getHostCfg();

    const TEXT = {
        hu: {
            landing: 'Kezdőlap',
            main: 'Főoldal',
            gallery: 'Munkáink',
            details: 'Részletek',
            about: 'Rólunk',
            contact: 'Kapcsolat',
            backTooltip: 'Vissza a kezdőlapra',
            callTooltip: 'Hívj bátran!',
            emailTooltip: 'Keress e-mailben!',
            instagramTooltip: 'Kövess Instagramon!',
            facebookTooltip: 'Kövess Facebookon!',
            branding: 'GlassArtista',
            // works
            dome: `Kupola`,
            canopy: 'Előtető',
            entrance: 'Bejárat',
            window: 'Ablak',
            ceiling: 'Mennyezet',
            ecclesial: 'Egyházi üvegek',
            entranceDoor: 'Bejárati ajtó',
            // details
            engineeringDesign: 'Mérnöki tervezés',
            glasses: 'Üvegek',
            leadRailTechnology: 'Ólomsínes technológia',
            decoration: 'Egyedi díszítés',
            installation: 'Beépítés',
            videos: 'Videók'
        },
        de: {
            landing: 'Landingpage',
            main: 'Hauptseite',
            gallery: 'Galerie',
            details: 'Details',
            about: 'Über uns',
            contact: 'Kontakt',
            backTooltip: 'Zur Landingpage',
            callTooltip: 'Ruf uns an!',
            emailTooltip: 'Schreib uns per E-Mail!',
            instagramTooltip: 'Folge auf Instagram!',
            facebookTooltip: 'Folge auf Facebook!',
            branding: 'GlassArtista',
            // works
            dome: `Kuppel`,
            canopy: 'Vordach',
            entrance: 'Eingang',
            window: 'Fenster',
            ceiling: 'Glasdecke',
            ecclesial: 'Kirchenfenster',
            entranceDoor: 'Klassische Eingangstür',
            // details
            engineeringDesign: 'Ingenieure Planung',
            glasses: 'Gläser',
            leadRailTechnology: 'Bleisglas-Technologie',
            decoration: 'Individuelle Verzierung',
            installation: 'Installierung',
            videos: 'Videos'
        },
        en: {
            landing: 'Landing',
            main: 'Main',
            gallery: 'Gallery',
            details: 'Details',
            about: 'About',
            contact: 'Contact',
            backTooltip: 'Back to landing page',
            callTooltip: 'Call us!',
            emailTooltip: 'Contact by email!',
            instagramTooltip: 'Follow on us Instagram!',
            facebookTooltip: 'Follow on us Facebook!',
            branding: 'GlassArtista',
            // works
            dome: `Dome`,
            canopy: 'Canopy',
            entrance: 'Entrance',
            window: 'Window',
            ceiling: 'Ceiling',
            ecclesial: 'Ecclesial',
            entranceDoor: 'Entrance door',
            // details
            engineeringDesign: 'Engineering design',
            glasses: 'Glasses',
            leadRailTechnology: 'Lead rail technology',
            decoration: 'Custom decoration',
            installation: 'Installation',
            videos: 'Videos'
        }
    };

    const [isGalleryOpen, setGalleryIsOpen] = useState(false);
    const [isDetailsOpen, setDetailsIsOpen] = useState(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    function stripLocaleFromPath(path) {
        const p = (path || '/').split('/');
        if (p.length > 1 && LOCALES.includes(p[1])) {
            p.splice(1, 1);
            const joined = p.join('/');
            return joined === '' ? '/' : joined;
        }
        return path || '/';
    }

    function getLocaleFromPath(path) {
        const parts = (path || '/').split('/');
        return (parts.length > 1 && LOCALES.includes(parts[1])) ? parts[1] : null;
    }

    function setLocaleCookie(locale) {
        if (typeof document === 'undefined') return;
        document.cookie = `${COOKIE_NAME}=${locale}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    }

    const getLocaleFromCookie = () => {
        if (typeof document === 'undefined') return undefined;
        const m = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/);
        return m ? m[1] : undefined;
    };

    // derive current locale: path -> cookie -> host default -> global default
    const currentLocale = getLocaleFromPath(pathname) || getLocaleFromCookie() || hostCfg.defaultLocale || DEFAULT_LOCALE;
    const search = searchParams ? `?${searchParams.toString()}` : '';

    // build localized path for navigation, respecting host hideDefault
    const localized = (targetPath) => {
        if (!targetPath.startsWith('/')) targetPath = `/${targetPath}`;
        // If this host hides its default locale and the current locale equals host default, do not prefix
        if (hostCfg.hideDefault && currentLocale === hostCfg.defaultLocale) {
            return `${targetPath}`;
        }
        return `/${currentLocale}${targetPath}`;
    };

    const changeLocale = (locale) => {
        if (!LOCALES.includes(locale)) return;
        setLocaleCookie(locale);
        const basePath = stripLocaleFromPath(pathname || '/');
        const hash = (typeof window !== 'undefined' && window.location.hash) ? window.location.hash : '';
        const host = typeof window !== 'undefined' ? window.location.hostname.replace(/^www\./, '') : '';
        const cfg = HOST_CONFIG[host] || {defaultLocale: DEFAULT_LOCALE, hideDefault: false};
        let to;
        if (cfg.hideDefault && locale === cfg.defaultLocale) {
            // navigate without locale prefix for hidden default
            to = `${basePath}${search}${hash}`;
        } else {
            to = `/${locale}${basePath}${search}${hash}`;
        }
        router.push(to);
    };

    const handleGalleryDropdownClick = (key) => {
        if (key === 'dome') {
            router.push(localized('/gallery'));
        } else {
            router.push(localized(`/gallery#${key}`));
        }
        setGalleryIsOpen(false);
    };

    const handleDetailsDropdownClick = (key) => {
        if (key === 'engineeringDesign') {
            router.push(localized('/details'));
        } else {
            router.push(localized(`/details#${key}`));
        }
        setDetailsIsOpen(false);
    };

    const handleNavPush = (path) => {
        router.push(localized(path));
    };

    function getNavbarLabel() {
        // normalize pathname and remove optional locale prefix
        const p = pathname || '/';
        const parts = p.split('/');
        let withoutLocale;
        if (parts.length > 1 && LOCALES.includes(parts[1])) {
            // remove the locale segment
            withoutLocale = '/' + parts.slice(2).join('/');
        } else {
            withoutLocale = p;
        }

        // normalize slashes and remove trailing slash (except for root)
        withoutLocale = withoutLocale.replace(/\/+/g, '/');
        if (withoutLocale.length > 1 && withoutLocale.endsWith('/')) {
            withoutLocale = withoutLocale.slice(0, -1);
        }

        const route = (withoutLocale === '' || withoutLocale === '/') ? '/' : withoutLocale;
        const t = TEXT[currentLocale] || TEXT[DEFAULT_LOCALE];

        switch (route) {
            case '/':
            case '/home':
                return t.main;
            case '/gallery':
                return t.gallery;
            case '/details':
                return t.details;
            case '/contact':
                return t.contact;
            default:
                return '';
        }
    }

    const t = TEXT[currentLocale] || TEXT[DEFAULT_LOCALE];

    const HOST_PHONE = {
        'glassartista.com': {
            default: { href: 'tel:+436766933329', display: '+43 (0) 676 693 3329' },
            locales: {
                hu: { href: 'tel:+36703600950', display: '+36-70/360-0950' }, // glassartista.com/hu/...
                en: { href: 'tel:+436766933329', display: '+43 (0) 676 693 3329' }, // glassartista.com/en/...
                de: { href: 'tel:+436766933329', display: '+43 (0) 676 693 3329' }  // default for other locales
            }
        },
        'localhost': { default: { href: 'tel:+36123456789', display: '+43 (0) 676 693 3329' } }
    };

    const _hostname = (typeof window !== 'undefined') ? window.location.hostname.replace(/^www\./, '').toLowerCase() : 'localhost';
    const hostPhoneCfg = HOST_PHONE[_hostname] || HOST_PHONE['localhost'];
    const phoneEntry = (hostPhoneCfg.locales && hostPhoneCfg.locales[currentLocale]) ? hostPhoneCfg.locales[currentLocale] : hostPhoneCfg.default;
    const { href: telHref, display: displayPhone } = phoneEntry;

// safe tooltip text (falls back if TEXT is missing)
    const callTooltip = t?.callTooltip || 'Call';

    return (
        <>
            <Navbar position="sticky"
                    className="xl:hidden"
                    classNames={{base: "!px-0 animate__animated animate__fadeInDown bg-transparent select-none uppercase antonio-navbar"}}>
                <NavbarBrand>
                    <img
                        draggable={false}
                        alt="Magnólia Tiffanystudió logó"
                        src="/design/glassartista_logo_text_gradient.png"
                        loading="eager"
                        decoding="sync"
                        width={50}
                    />
                </NavbarBrand>
                <NavbarContent justify="center">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className="bg-transparent data-[hover=true]:bg-transparent text-lg md:text-xl uppercase antonio-navbar"
                                radius="none"
                                size="sm"
                                style={{padding: 0}}
                                endContent={
                                    <FaChevronDown
                                        size={15}
                                        className={`mt-1 transition-transform duration-300 ${isGalleryOpen ? 'rotate-180' : ''}`}
                                    />
                                }
                            >
                                {getNavbarLabel()}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dropdown menu">
                            <DropdownSection showDivider>
                                <DropdownItem key="landing_page"
                                              onPress={() => router.push(localized('/'))}>
                                <span
                                    className='hover:underline hover:decoration-dashed'>
                                    {t.landing}
                                </span>
                                </DropdownItem>
                                <DropdownItem key="main"
                                              onPress={() => handleNavPush('/home')}>
                                <span className={`${pathname && pathname.endsWith('/home') ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                        {t.main}
                                </span>
                                </DropdownItem>
                                <DropdownItem key="contact"
                                              onPress={() => handleNavPush('/contact')}>
                                <span
                                    className={`${pathname && pathname.endsWith('/contact') ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                    {t.contact}
                                </span>
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownSection showDivider title={t.gallery} classNames={{
                                group: "grid grid-cols-2 gap-2"
                            }}>
                                <DropdownItem key="dome" startContent={<FaLandmarkDome size={20}/>} className='border-2 border-gray-200'
                                              onClick={() => handleGalleryDropdownClick('dome')}>{t.dome}</DropdownItem>
                                <DropdownItem key="canopy" startContent={<BiArch size={20}/>} className='border-2 border-gray-200'
                                              onClick={() => handleGalleryDropdownClick('canopy')}>{t.canopy}</DropdownItem>
                                <DropdownItem key="entrance" startContent={<GiDoorway size={20}/>} className='border-2 border-gray-200'
                                              onClick={() => handleGalleryDropdownClick('entrance')}>{t.entrance}</DropdownItem>
                                <DropdownItem key="window" startContent={<GiWindowBars size={20}/>} className='border-2 border-gray-200'
                                              onClick={() => handleGalleryDropdownClick('window')}>{t.window}</DropdownItem>
                                <DropdownItem key="ceiling" startContent={<BiVerticalTop size={20}/>} className='border-2 border-gray-200'
                                              onClick={() => handleGalleryDropdownClick('ceiling')}>{t.ceiling}</DropdownItem>
                                <DropdownItem key="ecclesial" startContent={<MdChurch size={20}/>} className='border-2 border-gray-200'
                                              onClick={() => handleGalleryDropdownClick('ecclesial')}>{t.ecclesial}</DropdownItem>
                                <DropdownItem key="entranceDoor" startContent={<BsDoorOpenFill size={20}/>} className='border-2 border-gray-200'
                                              onClick={() => handleGalleryDropdownClick('entranceDoor')}>{t.entranceDoor}</DropdownItem>
                            </DropdownSection>
                            <DropdownSection showDivider title={t.details} classNames={{
                                group: "grid grid-cols-2 gap-2"
                            }}>
                                <DropdownItem startContent={<LiaPencilRulerSolid size={20}/>} className='border-2 border-gray-200'
                                              onClick={() => handleDetailsDropdownClick('engineeringDesign')}>{t.engineeringDesign}</DropdownItem>
                                <DropdownItem startContent={<PiCardsThreeFill size={20}/>} className='border-2 border-gray-200'
                                              onClick={() => handleDetailsDropdownClick('glasses')}>{t.glasses}</DropdownItem>
                                <DropdownItem startContent={<MdGridGoldenratio size={20}/>} className='border-2 border-gray-200'
                                              onClick={() => handleDetailsDropdownClick('leadRailTechnology')}>{t.leadRailTechnology}</DropdownItem>
                                <DropdownItem startContent={<FaGem size={20}/>} className='border-2 border-gray-200'
                                              onClick={() => handleDetailsDropdownClick('decoration')}>{t.decoration}</DropdownItem>
                                <DropdownItem startContent={<IoHammerSharp size={20}/>} className='border-2 border-gray-200'
                                              onClick={() => handleDetailsDropdownClick('installation')}>{t.installation}</DropdownItem>
                                <DropdownItem startContent={<MdVideoLibrary size={20}/>} className='border-2 border-gray-200'
                                              onClick={() => handleDetailsDropdownClick('videos')}>{t.videos}</DropdownItem>
                            </DropdownSection>
                            <DropdownSection classNames={{
                                group: "flex flex-row w-fit gap-4 mx-auto text-neutral-400",
                            }}
                            >

                                <DropdownItem
                                    aria-label="Magyar"
                                    aria-current={currentLocale === 'hu' ? 'true' : undefined}
                                    onClick={() => changeLocale('hu')}
                                >
                                    <Avatar alt="flag" className={`!w-6 !h-6 min-w-[20px] cursor-pointer`} draggable={false} style={currentLocale === 'hu' ? { outline: '2px solid #d1d5dc', outlineOffset: '2px' } : undefined}
                                            src={'https://flagcdn.com/hu.svg'}/>
                                </DropdownItem>
                                <DropdownItem
                                    aria-label="Deutsch"
                                    aria-current={currentLocale === 'de' ? 'true' : undefined}
                                    onClick={() => changeLocale('de')}
                                >
                                    <Avatar alt="flag" className={`!w-6 !h-6 min-w-[20px] cursor-pointer`} draggable={false} onClick={() => changeLocale('de')} style={currentLocale === 'de' ? { outline: '2px solid #d1d5dc', outlineOffset: '2px' } : undefined}
                                            src={'/design/de-at.svg'}/>
                                </DropdownItem>
                                <DropdownItem
                                    aria-label="English"
                                    aria-current={currentLocale === 'en' ? 'true' : undefined}
                                    onClick={() => changeLocale('en')}
                                >
                                    <Avatar alt="flag" className={`!w-5.5 !h-5.5 min-w-[20px] cursor-pointer`} draggable={false} onClick={() => changeLocale('en')} style={currentLocale === 'en' ? { outline: '2px solid #d1d5dc', outlineOffset: '2px' } : undefined}
                                            src={'https://flagcdn.com/gb.svg'}/>
                                </DropdownItem>

                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <div className="flex flex-row gap-1 md:gap-3 pt-1">
                            <a href="mailto:info@glassartista.com"
                               className="text-xl font-light antonio-navbar text-white">
                                <RiMailFill size="25px"/>
                            </a>
                            <Link href="https://www.instagram.com/glassartista_h" target="_blank"
                                  className="text-xl font-light antonio-navbar text-white">
                                <AiFillInstagram size="26px"/>
                            </Link>
                            <Link href="https://www.facebook.com/glassartistah" target="_blank"
                                  className="text-xl font-light antonio-navbar text-white">
                                <FaFacebookSquare size="23px"/>
                            </Link>
                        </div>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <Navbar position="sticky" maxWidth="full" className="hidden xl:block"
                    classNames={{base: "animate__animated animate__fadeInDown bg-transparent select-none uppercase antonio-navbar"}}>
                <NavbarBrand>
                    <div className="flex items-center gap-3">
                        <img
                            draggable={false}
                            alt="GlassArtista logo"
                            src="/design/glassartista_logo_text_gradient.png"
                            loading="eager"
                            decoding="sync"
                            width={62}/>
                    </div>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4 " justify="center">
                    <NavbarItem>
                        <Tooltip content={t.backTooltip} placement="bottom" showArrow={true} radius="full"
                                 color="foreground" size="sm">
                            <Link href={localized('/')}><FaArrowAltCircleLeft color="white" className="pt-1" size={27}/></Link>
                        </Tooltip>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar"
                            radius="full"
                            onPress={() => handleNavPush('/home')}
                        >
                                    <span
                                        className={`${pathname && pathname.endsWith('/home') ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                        {t.main}
                                    </span>
                        </Button>
                    </NavbarItem>
                    <Dropdown isOpen={isGalleryOpen}
                              onMouseEnter={() => setGalleryIsOpen(true)}
                              onMouseLeave={() => setGalleryIsOpen(false)}
                    >
                        <NavbarItem onMouseEnter={() => setGalleryIsOpen(true)}
                                    onMouseLeave={() => setGalleryIsOpen(false)}
                                    className="py-2 cursor-pointer">
                            <DropdownTrigger>
                                <Button
                                    className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar cursor-default"
                                    radius="full"
                                    disableRipple={true}
                                    endContent={
                                        <FaChevronDown
                                            size={15}
                                            className={`mt-1 transition-transform duration-300 ${isGalleryOpen ? 'rotate-180' : ''}`}
                                        />
                                    }>
                                    <span
                                        className={`${pathname && pathname.endsWith('/gallery') ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                        {t.gallery}
                                    </span>
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu aria-label="Gallery menu">
                            <DropdownItem key="dome" startContent={<FaLandmarkDome size={20}/>}
                                          onClick={() => handleGalleryDropdownClick('dome')}>{t.dome}</DropdownItem>
                            <DropdownItem key="canopy" startContent={<BiArch size={20}/>}
                                          onClick={() => handleGalleryDropdownClick('canopy')}>{t.canopy}</DropdownItem>
                            <DropdownItem key="entrance" startContent={<GiDoorway size={20}/>}
                                          onClick={() => handleGalleryDropdownClick('entrance')}>{t.entrance}</DropdownItem>
                            <DropdownItem key="window" startContent={<GiWindowBars size={20}/>}
                                          onClick={() => handleGalleryDropdownClick('window')}>{t.window}</DropdownItem>
                            <DropdownItem key="ceiling" startContent={<BiVerticalTop size={20}/>}
                                          onClick={() => handleGalleryDropdownClick('ceiling')}>{t.ceiling}</DropdownItem>
                            <DropdownItem key="ecclesial" startContent={<MdChurch size={20}/>}
                                          onClick={() => handleGalleryDropdownClick('ecclesial')}>{t.ecclesial}</DropdownItem>
                            <DropdownItem key="entranceDoor" startContent={<BsDoorOpenFill  size={20}/>}
                                          onClick={() => handleGalleryDropdownClick('entranceDoor')}>{t.entranceDoor}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={isDetailsOpen}
                              onMouseEnter={() => setDetailsIsOpen(true)}
                              onMouseLeave={() => setDetailsIsOpen(false)}>
                        <NavbarItem onMouseEnter={() => setDetailsIsOpen(true)}
                                    onMouseLeave={() => setDetailsIsOpen(false)}
                                    className="py-2 cursor-pointer">
                            <DropdownTrigger>
                                <Button
                                    className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar cursor-default"
                                    endContent={<FaChevronDown size={15}
                                                               className={`mt-1 transition-transform duration-300 ${isDetailsOpen ? 'rotate-180' : ''}`}/>}
                                    radius="full"
                                    disableRipple={true}
                                    variant="light">
                                    <span
                                        className={`${pathname === localized('/details') ? 'underline ' : 'hover:underline hover:decoration-dashed '}`}>
                                        {t.details}
                                    </span>
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>

                        <DropdownMenu className="" aria-label="Details menu">
                            <DropdownItem startContent={<LiaPencilRulerSolid size={20}/>}
                                          onClick={() => handleDetailsDropdownClick('engineeringDesign')}>{t.engineeringDesign}</DropdownItem>
                            <DropdownItem startContent={<PiCardsThreeFill size={20}/>}
                                          onClick={() => handleDetailsDropdownClick('glasses')}>{t.glasses}</DropdownItem>
                            <DropdownItem startContent={<MdGridGoldenratio size={20}/>}
                                          onClick={() => handleDetailsDropdownClick('leadRailTechnology')}>{t.leadRailTechnology}</DropdownItem>
                            <DropdownItem startContent={<FaGem size={20}/>}
                                          onClick={() => handleDetailsDropdownClick('decoration')}>{t.decoration}</DropdownItem>
                            <DropdownItem startContent={<IoHammerSharp size={20}/>}
                                          onClick={() => handleDetailsDropdownClick('installation')}>{t.installation}</DropdownItem>
                            <DropdownItem startContent={<MdVideoLibrary size={20}/>}
                                          onClick={() => handleDetailsDropdownClick('videos')}>{t.videos}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <NavbarItem>
                        <Button
                            className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar"
                            radius="full"
                            onPress={() => handleNavPush('/contact')}
                        >
                        <span
                            className={`${pathname && pathname.endsWith('/contact') ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                            {t.contact}
                        </span>
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <div className="flex flex-row gap-3 pt-1">
                            <div className="flex flex-row gap-1 items-center justify-center pb-1">
                                <Tooltip content={t.callTooltip} showArrow={true} radius="full" color="foreground" placement="bottom">
                                    <Link
                                        href={telHref}
                                        target="_blank"
                                        className="text-xl font-light antonio-navbar text-white"
                                    >
                                        <FaPhoneAlt size="16px" />
                                    </Link>
                                </Tooltip>
                                <span className="select-all">{displayPhone}</span>
                            </div>
                            <Tooltip content={t.emailTooltip} placement="bottom" showArrow={true} radius="full"
                                     color="foreground">
                                <Link href="mailto:info@glassartista.com"
                                      target="_blank"
                                      className="text-xl font-light antonio-navbar text-white"><RiMailFill
                                    size="25px"/></Link>
                            </Tooltip>
                            <Tooltip content={t.instagramTooltip} placement="bottom" showArrow={true} radius="full"
                                     color="foreground">
                                <Link href="https://www.instagram.com/glassartista_h" target="_blank"
                                      className="text-xl font-light antonio-navbar text-white"><AiFillInstagram
                                    size="26px"/></Link>
                            </Tooltip>
                            <Tooltip content={t.facebookTooltip} placement="bottom" showArrow={true} radius="full"
                                     color="foreground">
                                <Link href="https://www.facebook.com/glassartistah" target="_blank"
                                      className="text-xl font-light antonio-navbar text-white"><FaFacebookSquare
                                    size="23px"/></Link>
                            </Tooltip>
                        </div>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </>
    );
}
