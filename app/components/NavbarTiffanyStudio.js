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


import {PiAcornFill, PiFlowerFill, PiFlowerTulipFill, PiFlower} from "react-icons/pi";
import {GiChestnutLeaf, GiCurlingVines, GiDragonfly, GiFairyWings, GiLilyPads} from "react-icons/gi";
import {IoRose} from "react-icons/io5";
import {LuLamp, LuLampFloor} from "react-icons/lu";
import {IoIosGrid} from "react-icons/io";
import {useState} from "react";

import {AiFillInstagram} from "react-icons/ai";
import {RiMailFill} from "react-icons/ri";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {MdLocalFlorist} from "react-icons/md";
import {FaArrowAltCircleLeft, FaChevronDown, FaFacebookSquare, FaPhoneAlt, FaPalette} from "react-icons/fa";


export default function NavbarTiffanyStudio() {
    const LOCALES = ['hu', 'de', 'en'];
    const DEFAULT_LOCALE = 'en';
    const COOKIE_NAME = 'NEXT_LOCALE';
    const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

    // Host configuration (client-side mirror of middleware)
    const HOST_CONFIG = {
        'tiffanystudio.at': { defaultLocale: 'de', hideDefault: true, isStudio: true },
        'tiffanystudio.hu': { defaultLocale: 'hu', hideDefault: true, isStudio: true },
        'glassartista.com': { defaultLocale: 'de', hideDefault: true, isStudio: false },
        'localhost': { defaultLocale: 'de', hideDefault: true, isStudio: false } // same behaviour as glassartista.com
    };

    function getHostCfg() {
        if (typeof window === 'undefined') return { defaultLocale: DEFAULT_LOCALE, hideDefault: false, isStudio: false };
        const host = window.location.hostname.replace(/^www\./, '').toLowerCase();
        return HOST_CONFIG[host] || { defaultLocale: DEFAULT_LOCALE, hideDefault: false, isStudio: false };
    }

    const hostCfg = getHostCfg();


    const TEXT = {
        hu: {
            landing: 'Kezdőlap',
            main: 'Főoldal',
            tiffanyLamps: 'Tiffany lámpák',
            availableLamps: 'Rendelhető Tiffany lámpák',
            lampBases: 'Lámpatalpak',
            contact: 'Kapcsolat',
            backTooltip: 'Vissza a kezdőlapra',
            callTooltip: 'Hívj bátran!',
            emailTooltip: 'Keress e-mailben!',
            instagramTooltip: 'Kövess Instagramon!',
            facebookTooltip: 'Kövess Facebookon!',
            branding: 'Magnólia Tiffanystúdió',
            // lamp names
            lampMagnolia: `28" Magnolia Tiffany lámpa`,
            lampGoldBlue: 'Gold-Blue Dragonfly Tiffany lámpa',
            lampPeony: 'Peony Tiffany lámpa',
            lampAcorn: 'Acorn Tiffany lámpa',
            lampWaterlily: 'Waterlily Tiffany lámpa',
            lampChestnut: 'Chestnut Tiffany lámpa',
            lampVine: 'Vine Ornament Tiffany lámpa',
            lampDragonfly: 'Dragonfly Tiffany lámpa',
            lampTulip: 'Tulip Tiffany lámpa',
            lampLittlePeony: 'Kis Peony Tiffany lámpa',
            lampArtNouveau: 'Art Nouveau Tiffany lámpa',
            lampPeony2: 'Peony Tiffany lámpa',
            // available categories
            availableGeometric: 'Rendelhető geometrikus Tiffany lámpák',
            availableTable: 'Rendelhető asztali Tiffany lámpák',
            availableStanding: 'Rendelhető álló Tiffany lámpák'
        },
        de: {
            landing: 'Landingpage',
            main: 'Hauptseite',
            tiffanyLamps: 'Tiffany-Lampen',
            availableLamps: 'Bestellbare Tiffany-Lampen',
            lampBases: 'Lampenfüße',
            contact: 'Kontakt',
            backTooltip: 'Zur Landingpage',
            callTooltip: 'Ruf uns an!',
            emailTooltip: 'Schreib uns per E-Mail!',
            instagramTooltip: 'Folge auf Instagram!',
            facebookTooltip: 'Folge auf Facebook!',
            branding: 'Magnolia Tiffany Studio',
            // lamp names
            lampMagnolia: `28" Magnolia Tiffany Lampe`,
            lampGoldBlue: 'Gold-Blau Libelle Tiffany Lampe',
            lampPeony: 'Peony Tiffany Lampe',
            lampAcorn: 'Eichel Tiffany Lampe',
            lampWaterlily: 'Seerose Tiffany Lampe',
            lampChestnut: 'Kastanie Tiffany Lampe',
            lampVine: 'Ranken-Ornament Tiffany Lampe',
            lampDragonfly: 'Libelle Tiffany Lampe',
            lampTulip: 'Tulip Tiffany Lampe',
            lampLittlePeony: 'Kleine Peony Tiffany Lampe',
            lampArtNouveau: 'Art Nouveau Tiffany Lampe',
            lampPeony2: 'Peony Tiffany Lampe',
            // available categories
            availableGeometric: 'Bestellbare geometrische Tiffany-Lampen',
            availableTable: 'Bestellbare Tisch-Tiffany-Lampen',
            availableStanding: 'Bestellbare Stehende Tiffany-Lampen'
        },
        en: {
            landing: 'Landing',
            main: 'Home',
            tiffanyLamps: 'Tiffany Lamps',
            availableLamps: 'Available Tiffany Lamps',
            lampBases: 'Lamp bases',
            contact: 'Contact',
            backTooltip: 'Back to landing page',
            callTooltip: 'Call me!',
            emailTooltip: 'Contact by email!',
            instagramTooltip: 'Follow on me Instagram!',
            facebookTooltip: 'Follow on me Facebook!',
            branding: 'Magnolia Tiffany Studio',
            // lamp names
            lampMagnolia: `28" Magnolia Tiffany Lamp`,
            lampGoldBlue: 'Gold-Blue Dragonfly Tiffany Lamp',
            lampPeony: 'Peony Tiffany Lamp',
            lampAcorn: 'Acorn Tiffany Lamp',
            lampWaterlily: 'Waterlily Tiffany Lamp',
            lampChestnut: 'Chestnut Tiffany Lamp',
            lampVine: 'Vine Ornament Tiffany Lamp',
            lampDragonfly: 'Dragonfly Tiffany Lamp',
            lampTulip: 'Tulip Tiffany Lamp',
            lampLittlePeony: 'Little Peony Tiffany Lamp',
            lampArtNouveau: 'Art Nouveau Tiffany Lamp',
            lampPeony2: 'Peony Tiffany Lamp',
            // available categories
            availableGeometric: 'Available geometric Tiffany lamps',
            availableTable: 'Available table Tiffany lamps',
            availableStanding: 'Available standing Tiffany lamps'
        }
    };

    const [isTiffanyLampsOpen, setTiffanyLampsIsOpen] = useState(false);
    const [isAvailableLampsOpen, setAvailableLampsIsOpen] = useState(false);
    const [isLampBasesOpen, setLampBasesIsOpen] = useState(false);

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

    // derive current locale using path -> cookie -> host default
    const currentLocale = getLocaleFromPath(pathname) || getLocaleFromCookie() || hostCfg.defaultLocale || DEFAULT_LOCALE;
    const search = searchParams ? `?${searchParams.toString()}` : '';

    const hostname = typeof window !== 'undefined' ? window.location.hostname.replace(/^www\./, '').toLowerCase() : '';

    const glassHref = (hostCfg.hideDefault && currentLocale === hostCfg.defaultLocale && !(hostname === 'tiffanystudio.hu' || hostname === 'tiffanystudio.at'))
        ? 'https://glassartista.com'
        : `https://glassartista.com/${currentLocale}`;

    // build localized path for navigation, respecting host hideDefault
    const localized = (targetPath) => {
        if (!targetPath.startsWith('/')) targetPath = `/${targetPath}`;
        // If current host hides its default locale and the locale equals host default, do not prefix
        if (hostCfg.hideDefault && currentLocale === hostCfg.defaultLocale) {
            // expose top-level paths for studio site (no prefix)
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
        const cfg = HOST_CONFIG[host] || { defaultLocale: DEFAULT_LOCALE, hideDefault: false };
        let to;

        // special-case: on tiffanystudio.hu, navigating to German should not add a /de prefix
        if (host === 'tiffanystudio.hu' && locale === 'de') {
            to = `${basePath}${search}${hash}`;
        } else if (cfg.hideDefault && locale === cfg.defaultLocale) {
            // navigate to path without locale prefix when host hides its default locale
            to = `${basePath}${search}${hash}`;
        } else {
            to = `/${locale}${basePath}${search}${hash}`;
        }

        router.push(to);
    };

    const goTo = (path) => {
        const host = typeof window !== 'undefined' ? window.location.hostname.replace(/^www\./, '') : '';
        // On studio hosts, tiffanystudio pages are exposed at top level (no tiffanystudio prefix)
        if (host === 'tiffanystudio.at' || host === 'tiffanystudio.hu') {
            // localized already handles hideDefault
            router.push(localized(path));
            return;
        }
        // On glassartista and other hosts, studio routes live under /tiffanystudio/
        const target = `tiffanystudio/${path}`.startsWith('/') ? `tiffanystudio/${path}` : `tiffanystudio/${path}`;
        if (host === 'glassartista.com') {
            // navigate with absolute origin so domain + path are correct
            const cfg = HOST_CONFIG[host] || { defaultLocale: DEFAULT_LOCALE, hideDefault: false };
            // If glassartista hides de and locale is default, localized will not prefix; handle similarly:
            const urlPath = localized(`/${target}`);
            router.push(`https://${host}${urlPath}`);
            return;
        }
        // fallback: same origin push
        router.push(localized(`/${target}`));
    };


    const handleLampDropdownClick = (key) => {
        if (key === 'magnolia') {
            goTo("tiffanylamps")
        } else {
            goTo(`tiffanylamps#${key}`);
        }
        setTiffanyLampsIsOpen(false);
    };

    const handleAvailableLampDropdownClick = (key) => {
        if (key === 'geometric') {
            goTo("tiffanylampsavailable")
        } else {
            goTo(`tiffanylampsavailable#${key}`);
        }
        setTiffanyLampsIsOpen(false);
    };

    const handleNavPush = (path) => {
        goTo(path);
        //router.push(localized(path));
    };

    const getNavbarLabel = () => {
        const stripped = (pathname || '/').split('/').slice(2).join('/');
        const route = `/${stripped}` === '/tiffanystudio' || pathname === `/` ? `/tiffanystudio` : `/${stripped}`;
        const t = TEXT[currentLocale] || TEXT[DEFAULT_LOCALE];
        console.log('route: ' + route)
        console.log('stripped' + stripped)
        switch (route) {
            case '/tiffanystudio':
                return t.main;
            case '/tiffanystudio/tiffanylamps':
                return t.tiffanyLamps;
            case '/tiffanystudio/tiffanylampsavailable':
                return t.availableLamps;
            case '/tiffanystudio/contact':
                return t.contact;
            case '/':
                return t.main;
            case '/tiffanylamps':
                return t.tiffanyLamps;
            case '/tiffanylampsavailable':
                return t.availableLamps;
            case '/contact':
                return t.contact;
            default:
                return '';
        }
    };

    const t = TEXT[currentLocale] || TEXT[DEFAULT_LOCALE];
    const baseBtnClass = "p-0 bg-transparent border-0 cursor-pointer hover:text-gray-200 transition-colors";
    const isTiffAt = typeof window !== 'undefined' && window.location.hostname.replace(/^www\./, '').toLowerCase() === 'tiffanystudio.at';

    const host = typeof window !== 'undefined' ? window.location.hostname.replace(/^www\./, '').toLowerCase() : '';
    const isTiffHu = host === 'tiffanystudio.hu';
    const displayPhone = isTiffHu ? '+36-70/360-0950' : '+43 (0) 676 6933329';
    const telHref = isTiffHu ? 'tel:+36703600950' : 'tel:+436766933329';


    return (
        <>
            <Navbar position="sticky"
                    className="xl:hidden"
                    classNames={{base: "!px-0 animate__animated animate__fadeInDown bg-transparent select-none uppercase antonio-navbar"}}>
                <NavbarBrand>
                    <img
                        draggable={false}
                        alt="Magnólia Tiffanystudió logó"
                        src="/design/tiffanystudiologotext.png"
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
                                        className={`mt-1 transition-transform duration-300 ${isTiffanyLampsOpen ? 'rotate-180' : ''}`}
                                    />
                                }
                            >
                                {getNavbarLabel()}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu  aria-label="Dropdown menu" >
                            <DropdownSection showDivider>
                                <DropdownItem key="landing_page"
                                              onPress={() => router.push(glassHref)}>
                                <span
                                    className='hover:underline hover:decoration-dashed'>
                                    {t.landing}
                                </span>
                                </DropdownItem>
                                <DropdownItem key="main_page"
                                              onPress={() => goTo('/')}>
                                <span
                                    className={`${stripLocaleFromPath(pathname || '/') === '/' || pathname.endsWith('/tiffanystudio') ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                    {t.main}
                                </span>
                                </DropdownItem>
                                <DropdownItem key="contact"
                                              onPress={() => goTo('contact')}>
                                <span
                                    className={`${pathname && pathname.endsWith('/contact') ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                    {t.contact}
                                </span>
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownSection showDivider title={t.tiffanyLamps} classNames={{
                                group: "grid grid-cols-2 gap-2"
                            }} >
                                <DropdownItem key="magnolia" className='border-2 border-gray-200' startContent={<PiFlowerFill size={20}/>}
                                              onClick={() => handleLampDropdownClick('magnolia')}>{t.lampMagnolia}</DropdownItem>
                                <DropdownItem key="goldblue" className='border-2 border-gray-200' startContent={<GiDragonfly size={20}/>}
                                              onClick={() => handleLampDropdownClick('goldblue')}>{t.lampGoldBlue}</DropdownItem>
                                <DropdownItem key="peony" className='border-2 border-gray-200' startContent={<IoRose size={20}/>}
                                              onClick={() => handleLampDropdownClick('peony')}>{t.lampPeony}</DropdownItem>
                                <DropdownItem key="acorn" className='border-2 border-gray-200' startContent={<PiAcornFill size={20}/>}
                                              onClick={() => handleLampDropdownClick('acorn')}>{t.lampAcorn}</DropdownItem>
                                <DropdownItem key="waterlily" className='border-2 border-gray-200' startContent={<GiLilyPads size={20}/>}
                                              onClick={() => handleLampDropdownClick('waterlily')}>{t.lampWaterlily}</DropdownItem>
                                <DropdownItem key="chestnut" className='border-2 border-gray-200' startContent={<GiChestnutLeaf size={20}/>}
                                              onClick={() => handleLampDropdownClick('chestnut')}>{t.lampChestnut}</DropdownItem>
                                <DropdownItem key="vine" className='border-2 border-gray-200' startContent={<GiCurlingVines size={20}/>}
                                              onClick={() => handleLampDropdownClick('vine')}>{t.lampVine}</DropdownItem>
                                <DropdownItem key="dragonfly" className='border-2 border-gray-200' startContent={<GiFairyWings size={20}/>}
                                              onClick={() => handleLampDropdownClick('dragonfly')}>{t.lampDragonfly}</DropdownItem>
                                <DropdownItem key="tulip" className='border-2 border-gray-200' startContent={<PiFlowerTulipFill size={20}/>}
                                              onClick={() => handleLampDropdownClick('tulip')}>{t.lampTulip}</DropdownItem>
                                <DropdownItem key="little_peony" className='border-2 border-gray-200' startContent={<MdLocalFlorist size={20}/>}
                                              onClick={() => handleLampDropdownClick('little_peony')}>{t.lampLittlePeony}</DropdownItem>
                                <DropdownItem key="art_nouveau" className='border-2 border-gray-200' startContent={<FaPalette size={20}/>}
                                              onClick={() => handleLampDropdownClick('art_nouveau')}>{t.lampArtNouveau}</DropdownItem>
                                <DropdownItem key="peony2" className='border-2 border-gray-200' startContent={<PiFlower size={20}/>}
                                              onClick={() => handleLampDropdownClick('peony2')}>{t.lampPeony2}</DropdownItem>
                            </DropdownSection>
                            <DropdownSection showDivider title={t.availableLamps} classNames={{
                                group: "flex flex-col gap-2"
                            }}>
                                <DropdownItem startContent={<IoIosGrid size={20}/>} className='border-2 border-gray-200 w-min'
                                              onClick={() => handleAvailableLampDropdownClick('geometric')}>{t.availableGeometric}</DropdownItem>
                                <DropdownItem startContent={<LuLamp size={20}/>} className='border-2 border-gray-200 w-min'
                                              onClick={() => handleAvailableLampDropdownClick('table')}>{t.availableTable}</DropdownItem>
                                <DropdownItem startContent={<LuLampFloor size={20}/>} className='border-2 border-gray-200 w-min'
                                              onClick={() => handleAvailableLampDropdownClick('standing')}>{t.availableStanding}</DropdownItem>
                            </DropdownSection>
                            <DropdownSection classNames={{
                                group: "flex flex-row w-fit gap-4 mx-auto text-neutral-400",
                            }}
                            >

                                {!isTiffAt && (
                                    <DropdownItem
                                        aria-label="Magyar"
                                        aria-current={currentLocale === 'hu' ? 'true' : undefined}
                                        onClick={() => changeLocale('hu')}
                                    >
                                        <Avatar alt="flag" className={`!w-6 !h-6 min-w-[20px] cursor-pointer`} draggable={false} style={currentLocale === 'hu' ? { outline: '2px solid #d1d5dc', outlineOffset: '2px' } : undefined}
                                                src={'https://flagcdn.com/hu.svg'}/>
                                    </DropdownItem>
                                )}
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
                            <a href="mailto:m.tiffanystudio@gmail.com"
                               className="text-xl font-light antonio-navbar text-white">
                                <RiMailFill size="25px"/>
                            </a>
                            <Link href="https://www.instagram.com/magnolia_tiffanystudio/" target="_blank"
                                  className="text-xl font-light antonio-navbar text-white">
                                <AiFillInstagram size="26px"/>
                            </Link>
                            <Link href="https://www.facebook.com/profile.php?id=100054201323550#" target="_blank"
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
                            alt="Magnólia Tiffanystudió logó"
                            src="/design/tiffanystudiologo.png"
                            loading="eager"
                            decoding="sync"
                            width={36}/>
                        <p className="text-2xl pt-1 allura-regular normal-case bg-gradient-to-r from-[#896b60] to-[#ce9c72] inline-block text-transparent bg-clip-text">
                            {t.branding}
                        </p>
                    </div>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4 " justify="center">
                    <NavbarItem>
                        <Tooltip content={t.backTooltip} placement="bottom" showArrow={true} radius="full" color="foreground" size="sm">
                            <Link href={glassHref}><FaArrowAltCircleLeft color="white" className="pt-1" size={27}/></Link>
                        </Tooltip>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar"
                            radius="full"
                            onPress={() => goTo('/')}
                        >
                                    <span
                                        className={`${pathname && pathname.endsWith('/tiffanystudio') ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                        {t.main}
                                    </span>
                        </Button>
                    </NavbarItem>
                    <Dropdown isOpen={isTiffanyLampsOpen}
                              onMouseEnter={() => setTiffanyLampsIsOpen(true)}
                              onMouseLeave={() => setTiffanyLampsIsOpen(false)}
                    >
                        <NavbarItem onMouseEnter={() => setTiffanyLampsIsOpen(true)}
                                    onMouseLeave={() => setTiffanyLampsIsOpen(false)}
                                    className="py-2 cursor-pointer">
                            <DropdownTrigger>
                                <Button
                                    className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar cursor-default"
                                    radius="full"
                                    disableRipple={true}
                                    endContent={
                                        <FaChevronDown
                                            size={15}
                                            className={`mt-1 transition-transform duration-300 ${isTiffanyLampsOpen ? 'rotate-180' : ''}`}
                                        />
                                    }>
                                    <span
                                        className={`${pathname && pathname.endsWith('/tiffanylamps') ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                        {t.tiffanyLamps}
                                    </span>
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu aria-label="Tiffany lámpák menü">
                            <DropdownItem key="magnolia" startContent={<PiFlowerFill size={20}/>}
                                          onClick={() => handleLampDropdownClick('magnolia')}>{t.lampMagnolia}</DropdownItem>
                            <DropdownItem key="goldblue" startContent={<GiDragonfly size={20}/>}
                                          onClick={() => handleLampDropdownClick('goldblue')}>{t.lampGoldBlue}</DropdownItem>
                            <DropdownItem key="peony" startContent={<IoRose size={20}/>}
                                          onClick={() => handleLampDropdownClick('peony')}>{t.lampPeony}</DropdownItem>
                            <DropdownItem key="acorn" startContent={<PiAcornFill size={20}/>}
                                          onClick={() => handleLampDropdownClick('acorn')}>{t.lampAcorn}</DropdownItem>
                            <DropdownItem key="waterlily" startContent={<GiLilyPads size={20}/>}
                                          onClick={() => handleLampDropdownClick('waterlily')}>{t.lampWaterlily}</DropdownItem>
                            <DropdownItem key="chestnut" startContent={<GiChestnutLeaf size={20}/>}
                                          onClick={() => handleLampDropdownClick('chestnut')}>{t.lampChestnut}</DropdownItem>
                            <DropdownItem key="vine" startContent={<GiCurlingVines size={20}/>}
                                          onClick={() => handleLampDropdownClick('vine')}>{t.lampVine}</DropdownItem>
                            <DropdownItem key="dragonfly" startContent={<GiFairyWings size={20}/>}
                                          onClick={() => handleLampDropdownClick('dragonfly')}>{t.lampDragonfly}</DropdownItem>
                            <DropdownItem key="tulip" startContent={<PiFlowerTulipFill size={20}/>}
                                          onClick={() => handleLampDropdownClick('tulip')}>{t.lampTulip}</DropdownItem>
                            <DropdownItem key="little_peony" startContent={<MdLocalFlorist size={20}/>}
                                          onClick={() => handleLampDropdownClick('little_peony')}>{t.lampLittlePeony}</DropdownItem>
                            <DropdownItem key="art_nouveau" startContent={<FaPalette size={20}/>}
                                          onClick={() => handleLampDropdownClick('art_nouveau')}>{t.lampArtNouveau}</DropdownItem>
                            <DropdownItem key="peony2" startContent={<PiFlower size={20}/>}
                                          onClick={() => handleLampDropdownClick('peony2')}>{t.lampPeony2}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={isAvailableLampsOpen}
                              onMouseEnter={() => setAvailableLampsIsOpen(true)}
                              onMouseLeave={() => setAvailableLampsIsOpen(false)}>
                        <NavbarItem onMouseEnter={() => setAvailableLampsIsOpen(true)}
                                    onMouseLeave={() => setAvailableLampsIsOpen(false)}
                                    className="py-2 cursor-pointer">
                            <DropdownTrigger>
                                <Button
                                    className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar cursor-default"
                                    endContent={<FaChevronDown size={15}
                                                               className={`mt-1 transition-transform duration-300 ${isAvailableLampsOpen ? 'rotate-180' : ''}`}/>}
                                    radius="full"
                                    disableRipple={true}
                                    variant="light">
                                    <span
                                        className={`${pathname.endsWith('tiffanylampsavailable') ? 'underline ' : 'hover:underline hover:decoration-dashed '}`}>
                                        {t.availableLamps}
                                    </span>
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>

                        <DropdownMenu className="" aria-label="Rendelhető Tiffany lámpák kategóriák">
                            <DropdownItem startContent={<IoIosGrid size={20}/>}
                                          onClick={() => handleAvailableLampDropdownClick('geometric')}>{t.availableGeometric}</DropdownItem>
                            <DropdownItem startContent={<LuLamp size={20}/>}
                                          onClick={() => handleAvailableLampDropdownClick('table')}>{t.availableTable}</DropdownItem>
                            <DropdownItem startContent={<LuLampFloor size={20}/>}
                                          onClick={() => handleAvailableLampDropdownClick('standing')}>{t.availableStanding}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={isLampBasesOpen} isDisabled
                              onMouseEnter={() => setLampBasesIsOpen(true)}
                              onMouseLeave={() => setLampBasesIsOpen(false)}>
                        <NavbarItem onMouseEnter={() => setLampBasesIsOpen(true)}
                                    onMouseLeave={() => setLampBasesIsOpen(false)}
                                    className="py-2 cursor-pointer">
                            <DropdownTrigger>
                                <Button
                                    className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar"
                                    endContent={<FaChevronDown size={20} className="pt-1"/>}
                                    radius="sm"
                                    variant="light"
                                >
                                    {t.lampBases}
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                    </Dropdown>

                    <NavbarItem>
                        <Button
                            className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar"
                            radius="full"
                            onPress={() => goTo('contact')}
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
                                    <Link href={telHref}
                                          target="_blank"
                                          className="text-xl font-light antonio-navbar text-white">
                                        <FaPhoneAlt size="16px"/>
                                    </Link>
                                </Tooltip>
                                <span className="select-all">{displayPhone}</span>
                            </div>
                            <Tooltip content={t.emailTooltip} placement="bottom" showArrow={true} radius="full"
                                     color="foreground">
                                <Link href="mailto:m.tiffanystudio@gmail.com"
                                      target="_blank"
                                      className="text-xl font-light antonio-navbar text-white"><RiMailFill
                                    size="25px"/></Link>
                            </Tooltip>
                            <Tooltip content={t.instagramTooltip} placement="bottom" showArrow={true} radius="full"
                                     color="foreground">
                                <Link href="https://www.instagram.com/magnolia_tiffanystudio/" target="_blank"
                                      className="text-xl font-light antonio-navbar text-white"><AiFillInstagram
                                    size="26px"/></Link>
                            </Tooltip>
                            <Tooltip content={t.facebookTooltip} placement="bottom" showArrow={true} radius="full"
                                     color="foreground">
                                <Link href="https://www.facebook.com/profile.php?id=100054201323550#" target="_blank"
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
