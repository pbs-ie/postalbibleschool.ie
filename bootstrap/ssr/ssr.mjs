import * as jsxRuntime from "react/jsx-runtime";
import { Head, usePage, Link, useForm, router as router$1, createInertiaApp } from "@inertiajs/react";
import { useState, useEffect, useRef, useMemo, useReducer } from "react";
import { PayPalScriptProvider, usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
import { scroller, Link as Link$1 } from "react-scroll";
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { router } from "@inertiajs/core";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import route$1 from "ziggy-js";
const Fragment = jsxRuntime.Fragment;
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
function TimelineEntry({ image, imageAlt, heading, description, year, type = "left", className }) {
  return /* @__PURE__ */ jsxs("div", { className: `relative mb-8 flex ${type === "left" ? "flex-row-reverse" : ""} justify-between w-full ${className}`, children: [
    /* @__PURE__ */ jsx("div", { className: "w-2/12 md:w-5/12" }),
    /* @__PURE__ */ jsx("div", { className: "z-20 items-center hidden w-4 h-4 bg-blue-400 rounded-full shadow-xl md:relative md:flex", children: year && /* @__PURE__ */ jsx("div", { className: `absolute text-2xl font-bold text-gray-300 italic justify-center h-fit ${type === "left" ? "-left-8 sm:-left-10" : "left-1"} top-7 sm:top-10 -rotate-90`, children: year }) }),
    /* @__PURE__ */ jsxs("div", { className: `bg-stone-200 rounded-lg shadow-xl w-full md:w-5/12 px-6 sm:px-10 py-4 sm:py-6`, children: [
      image && /* @__PURE__ */ jsx("img", { src: image, alt: imageAlt, className: "object-cover object-top w-full aspect-[4/3] rounded-lg mb-3" }),
      heading && /* @__PURE__ */ jsx("h3", { className: "mb-3 text-base font-bold text-gray-700 sm:text-xl", children: heading }),
      /* @__PURE__ */ jsx("p", { className: "text-sm leading-snug tracking-wide text-left text-gray-700 text-opacity-100", children: description })
    ] })
  ] });
}
const GraysImage = "/build/assets/bertandwendy-300x300-7df40d2e.jpg";
const McMeekin1Image = "/build/assets/noelandlizamcmeekin-400x400-eb2fe7d3.jpg";
const McMeekin2Image = "/build/assets/garethandmargaret-699dea25.jpg";
function Timeline() {
  return /* @__PURE__ */ jsx("div", { className: "w-full h-full mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative h-full p-5 overflow-hidden wrap", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute h-full border-2 border-blue-400 seperator-line border-opacity-80 left-1/2" }),
    /* @__PURE__ */ jsx(
      TimelineEntry,
      {
        image: GraysImage,
        imageAlt: "Bert and Wendy Gray",
        heading: "Bert & Wendy Gray",
        description: "Postal Bible School Ireland is now in its 3rd generation of leadership. The work began in 1958 when Bert and Wendy Gray began sending written Sunday school lessons to children in remote parts of Ireland. They oversaw the initial development of the work, supplying it to children and small groups while working with a group of volunteer teachers to write the basics of the syllabus that is still used today. Bert and Wendy operated at different times from Dublin, Cork and the Midlands of Ireland.",
        year: "1958"
      }
    ),
    /* @__PURE__ */ jsx(
      TimelineEntry,
      {
        image: McMeekin1Image,
        imageAlt: "Noel and Liza McMeekin",
        heading: "Noel & Liza McMeekin",
        description: "In 1992 Noel and Liza McMeekin took over the running of the Postal Bible School Centre in Ireland and moved the offices to Cootehill in Co Cavan. They oversaw the growth of the work to over 5000 students and developed the connections with schools and students through regular visits and Bible camps. During their 25 years in charge hundreds of young people benefited from hearing God’s word through summer camps at Ovoca Manor and other activity programmes while thousands were studying God’s word through the lessons distributed.",
        year: "1992",
        type: "right"
      }
    ),
    /* @__PURE__ */ jsx(
      TimelineEntry,
      {
        image: McMeekin2Image,
        imageAlt: "Gareth and Margaret McMeekin",
        heading: "Gareth & Margaret McMeekin",
        description: "In 2018 Noel and Liza decided to reduce their involvement when their son Gareth and His wife Margaret took over running the Cootehill centre and moved it to the current address in the town centre. Gareth and Margaret have been involved in developing discipleship programmes alongside the core work of PBS and are now overseeing the development of digital resources to support the existing printed material. The office relies heavily on the support of a broad range of Christians as both staff and volunteers. In the office team alone, we have had folk from Asia, America, Europe and Ireland in the last few years. The whole work of Postal Bible School has engaged many volunteers from its earliest days with dozens of event volunteers and hundreds of correspondent markers being involved every year. Each of those who serve, whether as staff or volunteers believe that God’s word and the Gospel are important foundations for young lives.",
        year: "2018"
      }
    )
  ] }) });
}
function Heading2({ children }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("h2", { className: "p-6 mt-6 mb-4 font-sans text-3xl font-bold leading-relaxed text-center text-blue-900 uppercase md:font-extrabold md:text-4xl", children }) });
}
function Paragraph({ className = "", children }) {
  return /* @__PURE__ */ jsx("p", { className: `md:text-base mb-5 text-gray-700 ${className}`, children });
}
function ParagraphContainer({ className = "", children }) {
  return /* @__PURE__ */ jsx("div", { className: "mx-auto text-center px-5 md:px-0 md:max-w-4xl " + className, children });
}
function Heading1$1({ children }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("h1", { className: "p-6 mt-2 mb-4 text-4xl font-bold leading-snug text-blue-800 uppercase md:text-5xl font-title", children }) });
}
function ContentWrapper({ title, className = "", children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsxs("section", { className: `px-4 py-12 mx-auto text-center shadow-sm max-w-7xl sm:px-6 lg:px-8 ${className}`, children: [
      /* @__PURE__ */ jsx(Heading1$1, { children: title }),
      children
    ] })
  ] });
}
function CloseX({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z", clipRule: "evenodd" }) });
}
function FlashMessage() {
  const [showNotifs, setShowNotifs] = useState(false);
  const { flash } = usePage().props;
  useEffect(() => {
    setShowNotifs(true);
    setTimeout(() => {
      setShowNotifs(false);
    }, 1e4);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "relative", children: (flash.success || flash.failure) && /* @__PURE__ */ jsx("div", { className: `fixed ${showNotifs ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"} transition-[opacity,transform] duration-1000 ease-in top-10 md:top-auto right-2 md:right-6 md:bottom-10 z-30`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-80 w-full  ml-2 md:ml-0 overflow-auto bg-blue-500 text-gray-50 ${flash.failure ? "bg-red-700" : "bg-green-600"} rounded py-4 px-6 relative`, children: [
    /* @__PURE__ */ jsx("button", { className: "absolute right-2", onClick: () => setShowNotifs(false), children: /* @__PURE__ */ jsx(CloseX, { className: "w-6 h-6" }) }),
    flash.success && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 mr-10", children: [
      /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-[50px] h-[50px]", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z", clipRule: "evenodd" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg", children: "Success" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: flash.success })
      ] })
    ] }),
    flash.failure && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 mr-10", children: [
      /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg", children: "Failure" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: flash.failure })
      ] })
    ] })
  ] }) }) });
}
function NavLink({ href, active, isCta, isSecondary, role, ariaHaspopup, children, onClick }) {
  const getCurrentStyle = () => {
    let styleValue = "inline-flex uppercase items-center pt-1 border-b-2 text-sm leading-5 transition duration-150 ease-in-out ";
    if (isCta) {
      styleValue += " my-2 rounded-md border-2 shadow-[0_1px_0_0_black] border-black text-gray-800 px-3 active:translate-y-px active:shadow-none active:border-b-2";
      if (active) {
        styleValue += " text-indigo-700 bg-white hover:bg-blue-50 font-bold";
      } else {
        styleValue += " bg-blue-200 hover:bg-blue-50 font-medium ";
      }
    } else if (active) {
      styleValue += ` border-gray-300 ${isSecondary ? "text-blue-900" : "text-white"} font-bold hover:border-transparent`;
    } else {
      styleValue += ` border-transparent ${isSecondary ? "text-blue-900 font-normal hover:font-bold" : "text-gray-200 font-medium hover:text-white"}  hover:border-gray-50 focus:text-gray-100`;
    }
    return styleValue;
  };
  return /* @__PURE__ */ jsx(
    Link,
    {
      href,
      className: getCurrentStyle(),
      role,
      "aria-haspopup": ariaHaspopup,
      "aria-current": active ? "page" : "false",
      onClick,
      children
    }
  );
}
const LogoWhite$1 = "/build/assets/step_logo-b9292cb6.png";
function StepNavbar() {
  return /* @__PURE__ */ jsxs("div", { role: "navigation", className: "w-full text-blue-900 bg-sky-300", children: [
    /* @__PURE__ */ jsx("div", { className: "relative hidden md:block", children: /* @__PURE__ */ jsx("img", { src: LogoWhite$1, alt: "STEP Logo", className: "absolute h-10 my-1 left-20" }) }),
    /* @__PURE__ */ jsxs("ul", { className: "flex items-stretch justify-center h-12 gap-6 px-4 md:gap-8 md:px-8", children: [
      /* @__PURE__ */ jsx("li", { className: "flex -my-px", children: /* @__PURE__ */ jsx(NavLink, { isSecondary: true, active: route().current("events.step.index"), href: route("events.step.index"), children: "About" }) }),
      /* @__PURE__ */ jsx("li", { className: "flex -my-px", children: /* @__PURE__ */ jsx(NavLink, { isSecondary: true, active: route().current("events.step.past.*"), href: route("events.step.past.gallery"), children: "Past Events" }) }),
      /* @__PURE__ */ jsx("li", { className: "flex -my-px", children: /* @__PURE__ */ jsx(NavLink, { isSecondary: true, active: route().current("events.step.signup"), href: route("events.step.signup"), children: "Sign Up" }) }),
      /* @__PURE__ */ jsx("li", { className: "flex -my-px", children: /* @__PURE__ */ jsx(NavLink, { isSecondary: true, active: route().current("payment.step"), href: route("payment.step"), children: "Payment" }) })
    ] })
  ] });
}
function ResponsiveNavLink$1({ method = "get", as = "a", href, active = false, children }) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      method,
      as,
      href,
      className: `w-full flex items-start mx-2 px-2 py-2 text-base font-medium transition duration-150 ease-in-out rounded 
            ${active ? "bg-gray-300 text-gray-900 dark:bg-gray-700  dark:text-gray-100" : "border-transparent hover:text-gray-900 focus:text-gray-900 focus:bg-gray-300 hover:bg-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700 dark:focus:text-gray-100 dark:focus:bg-gray-700"}`,
      children
    }
  );
}
const LogoWhite = "/build/assets/Logo-white-96a9025e.png";
const LogoSmall = "/build/assets/logo-icon-b00716f2.png";
function AnchorNavLink({ href, isResponsive = false, newTab = false, isDropdown = false, children }) {
  const getClassNames = () => {
    if (isResponsive) {
      return "w-full flex items-start mx-2 rounded px-2 pr-4 py-2 text-base font-medium transition duration-150 ease-in-out hover:text-gray-800 hover:bg-gray-300 focus:text-gray-800 focus:bg-gray-50 dark:hover:text-gray-100 dark:hover:bg-gray-700";
    } else if (isDropdown) {
      return "inline-flex items-center whitespace-nowrap bg-clip-padding py-4 px-8 w-full text-sm font-medium leading-5  focus:bg-slate-200 transition duration-150 ease-in-out";
    } else {
      return "inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-200 uppercase transition duration-150 ease-in-out hover:text-white  focus:text-gray-100 ";
    }
  };
  return /* @__PURE__ */ jsx("a", { href, className: getClassNames(), target: newTab ? "_blank" : "_self", children: children ?? href });
}
function DropdownNavLink({ href, active, children }) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      href,
      className: `inline-flex items-center whitespace-nowrap bg-clip-padding py-4 px-8 w-full text-sm font-medium leading-5
                focus:border-black focus:bg-slate-200 focus:text-gray-700 transition duration-150 ease-in-out
                ${active ? "text-gray-50 bg-blue-500 bg-clip-padding font-bold" : "hover:bg-slate-200 text-gray-700"}`,
      children
    }
  );
}
function DropdownNav({ submenu, showSubmenu }) {
  let classList = "absolute z-10 flex-col overflow-hidden transition-opacity duration-200 ease-in-out bg-white divide-y-2 rounded-b-lg text-slate-600 top-full -left-1/2 drop-shadow-lg";
  if (showSubmenu) {
    classList += " flex opacity-100 scale-100";
  } else {
    classList += " hidden opacity-0  scale-0";
  }
  return /* @__PURE__ */ jsx("ul", { className: classList, children: submenu.map((item) => /* @__PURE__ */ jsx("li", { className: "hidden space-x-8 lg:-my-px lg:flex", children: /* @__PURE__ */ jsx(DropdownNavLink, { href: item.href, active: item.active, children: item.name }) }, item.name)) });
}
function CaratDown({ className = "w-2 ml-2" }) {
  return /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "caret-down", className, role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512", children: /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" }) });
}
function NavItem({ name, href, active, submenu }) {
  const [showSubmenu, setShowSubmenu] = useState(false);
  if (submenu) {
    return /* @__PURE__ */ jsxs(
      "li",
      {
        onMouseOver: () => setShowSubmenu(true),
        onMouseLeave: () => setTimeout(() => setShowSubmenu(false), 1500),
        className: "relative hidden space-x-8 group/navitem lg:-my-px lg:ml-6 lg:flex",
        children: [
          /* @__PURE__ */ jsxs(
            NavLink,
            {
              active,
              onClick: (event) => {
                event.preventDefault();
                setShowSubmenu(!showSubmenu);
              },
              href: "#",
              role: "button",
              "aria-haspopup": "menu",
              children: [
                name,
                /* @__PURE__ */ jsx(CaratDown, {})
              ]
            }
          ),
          /* @__PURE__ */ jsx(DropdownNav, { showSubmenu, submenu })
        ]
      }
    );
  } else {
    return /* @__PURE__ */ jsx("li", { className: "hidden space-x-8 lg:-my-px lg:ml-6 lg:flex", children: /* @__PURE__ */ jsx(NavLink, { href, active, children: name }) });
  }
}
function AnchorLink({ href, newTab = false, children, className = "" }) {
  return /* @__PURE__ */ jsx("a", { href, className: "text-blue-600 underline hover:text-blue-800 visited:text-purple-600 " + className, target: newTab ? "_blank" : "_self", children: children ?? href });
}
function Navbar() {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const { auth } = usePage().props;
  const menuItems = [
    {
      name: "Home",
      href: route("home"),
      active: route().current("home")
    },
    {
      name: "About Us",
      href: route("about"),
      active: route().current("about")
    },
    {
      name: "Courses",
      href: route("courses"),
      active: route().current("courses") || route().current("request.*"),
      submenu: [
        {
          name: "Overview",
          href: route("courses"),
          active: route().current("courses")
        },
        {
          name: "Request Lesson: Individual",
          href: route("request.individual"),
          active: route().current("request.individual")
        },
        {
          name: "Request Lesson: Group",
          href: route("request.group"),
          active: route().current("request.group")
        }
      ]
    },
    {
      name: "Events",
      href: route("events.prizegivings"),
      active: route().current("events.*"),
      submenu: [
        {
          name: "Prizegivings",
          href: route("events.prizegivings"),
          active: route().current("events.prizegivings")
        },
        {
          name: "The SHED",
          href: route("events.shed"),
          active: route().current("events.shed")
        },
        {
          name: "STEP",
          href: route("events.step.index"),
          active: route().current("events.step.index")
        },
        {
          name: "Camp",
          href: route("events.camp.index"),
          active: route().current("events.camp.*")
        },
        {
          name: "iTeam",
          href: route("events.iteam"),
          active: route().current("events.iteam")
        }
      ]
    },
    {
      name: "School Assembly",
      href: route("assembly.index"),
      active: route().current("assembly.*")
    }
  ];
  const rightSideMenuItems = [
    {
      name: "Payment",
      href: route("payment.index"),
      active: route().current("payment.*")
    },
    {
      name: "Contact Us",
      href: route("contactus"),
      active: route().current("contactus")
    }
  ];
  return /* @__PURE__ */ jsxs("header", { className: "text-white border-b-2 border-gray-800", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute p-2 m-3 font-bold text-gray-800 no-underline duration-100 transform -translate-y-16 bg-gray-200 visited:text-white focus-within:translate-y-0", children: [
      "Skip to ",
      /* @__PURE__ */ jsx(AnchorLink, { href: "#mainContent", children: "content" }),
      " or ",
      /* @__PURE__ */ jsx(AnchorLink, { href: "#footerContent", children: "footer" })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "px-6 mx-auto bg-pbsblue", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between h-16", children: [
      /* @__PURE__ */ jsxs("ul", { className: "flex", children: [
        /* @__PURE__ */ jsx("li", { className: "flex items-center shrink-0 lg:mr-5", children: /* @__PURE__ */ jsx(Link, { href: "/home", children: /* @__PURE__ */ jsx(
          "img",
          {
            srcSet: `${LogoSmall} 450w,${LogoWhite} 898w`,
            sizes: "(max-width: 600px) 250px, 898px",
            alt: "Postal Bible School Logo",
            src: LogoSmall,
            className: "h-8"
          }
        ) }) }),
        (auth == null ? void 0 : auth.user) && /* @__PURE__ */ jsx("li", { className: "hidden space-x-8 lg:-my-px lg:ml-6 lg:flex", children: /* @__PURE__ */ jsx(NavLink, { isCta: true, href: route("dashboard"), active: route().current("dashboard"), children: "The Hub" }) }),
        menuItems.map((item, index) => /* @__PURE__ */ jsx(NavItem, { name: item.name, href: item.href, active: item.active, submenu: item.submenu }, item.name))
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "flex justify-between h-16", children: [
        rightSideMenuItems.map((item) => /* @__PURE__ */ jsx(NavItem, { name: item.name, href: item.href, active: item.active }, item.name)),
        /* @__PURE__ */ jsx("li", { className: "relative hidden space-x-8 group lg:-my-px lg:ml-10 lg:flex", children: (auth == null ? void 0 : auth.user) ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(AnchorNavLink, { href: "#", children: [
            /* @__PURE__ */ jsx("img", { src: auth == null ? void 0 : auth.user.picture, alt: "User picture", className: "w-10 rounded-full" }),
            /* @__PURE__ */ jsx(CaratDown, {})
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "absolute right-0 z-10 flex-col hidden transition-opacity duration-200 ease-in-out scale-0 bg-white divide-y-2 rounded-lg opacity-0 text-slate-600 top-full group-focus:flex group-hover:flex drop-shadow-lg group-hover:opacity-100 group-focus:opacity-100 group-hover:scale-100 group-focus:scale-100", children: /* @__PURE__ */ jsx("li", { className: "inline-flex", children: /* @__PURE__ */ jsx(AnchorNavLink, { href: route("logout"), isDropdown: true, children: "Logout" }) }) })
        ] }) : /* @__PURE__ */ jsx(AnchorNavLink, { href: route("login"), children: "Login" }) }),
        /* @__PURE__ */ jsx("li", { className: "flex items-center -mr-2 lg:hidden", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowingNavigationDropdown((previousState) => !previousState),
            className: "inline-flex items-center justify-center p-2 text-gray-100 transition duration-150 ease-in-out border-2 border-transparent rounded-md hover:border-gray-100 focus:border-gray-100 ",
            children: /* @__PURE__ */ jsxs("svg", { className: "w-6 h-6", stroke: "currentColor", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  className: !showingNavigationDropdown ? "inline-flex" : "hidden",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M4 6h16M4 12h16M4 18h16"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  className: showingNavigationDropdown ? "inline-flex" : "hidden",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M6 18L18 6M6 6l12 12"
                }
              )
            ] })
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("nav", { className: (showingNavigationDropdown ? "block opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-full -z-1") + " lg:hidden transition-[transform,opacity] duration-1000 ease-in-out  bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-200", children: /* @__PURE__ */ jsxs("ul", { className: "pt-2 pb-3 space-y-1", children: [
      (auth == null ? void 0 : auth.user) && /* @__PURE__ */ jsx(ResponsiveNavLink$1, { href: route("dashboard"), active: route().current("dashboard"), children: "Dashboard" }),
      menuItems.map(
        (item) => {
          if (item.submenu) {
            return /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(ResponsiveNavLink$1, { href: item.href, active: item.active, children: item.name }),
              /* @__PURE__ */ jsx("ul", { className: "ml-6", children: item.submenu.map((subitem) => /* @__PURE__ */ jsx("li", { className: `relative before:absolute before:text-inherit before:top-1/2 before:-translate-y-1/2  before:content-['—']`, children: /* @__PURE__ */ jsx(ResponsiveNavLink$1, { href: subitem.href, active: subitem.active, children: subitem.name }, subitem.name) }, subitem.name)) })
            ] }, item.name);
          }
          return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ResponsiveNavLink$1, { href: item.href, active: item.active, children: item.name }) }, item.name);
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700", children: [
        rightSideMenuItems.map((item) => {
          return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ResponsiveNavLink$1, { href: item.href, active: item.active, children: item.name }) }, item.name);
        }),
        !(auth == null ? void 0 : auth.user) ? /* @__PURE__ */ jsx(AnchorNavLink, { href: route("login"), isResponsive: true, children: "Login" }) : /* @__PURE__ */ jsx(AnchorNavLink, { href: route("logout"), isResponsive: true, children: "Logout" })
      ] })
    ] }) })
  ] });
}
function FooterGroup({ heading, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg uppercase text-slate-200", children: heading }),
    /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-200", children })
  ] });
}
function ResponsiveNavLink({ method = "get", as = "a", href, children }) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      method,
      as,
      href,
      className: "flex items-start w-full py-3 pl-3 pr-4 font-medium transition duration-150 ease-in-out border-b border-gray-300 text-slate-300 hover:text-white focus:text-white focus:border-transparent md:text-base focus:outline-none focus:ring-2 focus:ring-gray-100",
      children
    }
  );
}
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs("footer", { id: "footerContent", className: "bottom-0 left-0 bg-gray-800 text-slate-300", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full px-8 py-6 my-5 md:px-32", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8 md:gap-4 flex-nowrap md:flex-row justify-evenly", children: [
      /* @__PURE__ */ jsxs(FooterGroup, { heading: "About Us", children: [
        /* @__PURE__ */ jsx(Paragraph, { className: "leading-snug text-left text-slate-300", children: "Postal Bible School was originally called Postal Sunday School and began in County Cork in 1958. It began as the work of Bert and Wendy Gray who believed in the importance of young people learning from the Bible and wanted to cater for those in remote areas." }),
        /* @__PURE__ */ jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsx(Link, { className: "text-base underline text-slate-300 hover:text-white focus:text-white", href: route("about"), children: "Read more" }) })
      ] }),
      /* @__PURE__ */ jsx(FooterGroup, { heading: "Links", children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("courses"), children: "Courses - Bibletime and more" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("request.individual"), children: "Request an Individual Lesson" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("request.group"), children: "Request a Group Lesson" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("assembly.index"), children: "Online Assembly" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("payment.index"), children: "Payment" }) })
      ] }) }),
      /* @__PURE__ */ jsx(FooterGroup, { heading: "Events", children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(ResponsiveNavLink, { href: route("events.prizegivings"), children: [
          "Prize",
          /* @__PURE__ */ jsx("wbr", {}),
          "givings"
        ] }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("events.shed"), children: "The SHED" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("events.step.index"), children: "STEP" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("events.camp.index"), children: "Summer Camp" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("events.iteam"), children: "iTeam" }) })
      ] }) }),
      /* @__PURE__ */ jsxs(FooterGroup, { heading: "Contact Us", children: [
        /* @__PURE__ */ jsxs("address", { className: "text-slate-300", children: [
          /* @__PURE__ */ jsxs("p", { className: "md:text-base", children: [
            "Phone - ",
            /* @__PURE__ */ jsx("a", { className: "hover:text-white", href: "tel:+353495552915", children: "049 555 2915" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "md:text-base", children: [
            "International - ",
            /* @__PURE__ */ jsx("a", { className: "hover:text-white", href: "tel:00353495552915", children: "0035349 5552915" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "md:text-base", children: [
            "Email - ",
            /* @__PURE__ */ jsx("a", { className: "hover:text-white", href: "mailto:info@postalbibleschool.ie", children: "info@postalbibleschool.ie" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsx(Link, { className: "text-base underline text-slate-300 hover:text-white focus:text-white", href: route("contactus"), children: "Contact Us" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full p-2 border-t border-gray-300 md:p-4", children: /* @__PURE__ */ jsxs("p", { className: "text-sm leading-tight text-center", children: [
      "© Copyright ",
      currentYear,
      ". Postal Bible School. All Rights Reserved."
    ] }) })
  ] });
}
function CampNavbar() {
  return /* @__PURE__ */ jsx("div", { role: "navigation", className: "w-full text-blue-900 bg-sky-300", children: /* @__PURE__ */ jsxs("ul", { className: "flex items-stretch justify-center h-12 gap-6 px-4 md:gap-8 md:px-8", children: [
    /* @__PURE__ */ jsx("li", { className: "flex -my-px", children: /* @__PURE__ */ jsx(NavLink, { isSecondary: true, active: route().current("events.camp.index"), href: route("events.camp.index"), children: "Home" }) }),
    /* @__PURE__ */ jsx("li", { className: "flex -my-px", children: /* @__PURE__ */ jsx(NavLink, { isSecondary: true, active: route().current("events.camp.signup"), href: route("events.camp.signup"), children: "Register" }) }),
    /* @__PURE__ */ jsx("li", { className: "flex -my-px", children: /* @__PURE__ */ jsx(NavLink, { isSecondary: true, active: route().current("payment.camp"), href: route("payment.camp"), children: "Payment" }) })
  ] }) });
}
function WrapperLayout({ showStepNav = false, showCampNav = false, children }) {
  const [showToTopButton, setShowToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight) {
        setShowToTopButton(true);
      } else {
        setShowToTopButton(false);
      }
    });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsx(PayPalScriptProvider, { options: {
    "clientId": "AdhiCI8cBrVDaunL7Jzi6CwYMSsC-TMSs-LnalOV-m8z-mYT5h6mz3tJmCCG85VoQw1Kh7uM5bUXWqus",
    "currency": "EUR",
    "intent": "capture",
    "locale": "en_IE"
  }, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-stretch min-h-screen", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    showStepNav && /* @__PURE__ */ jsx(StepNavbar, {}),
    showCampNav && /* @__PURE__ */ jsx(CampNavbar, {}),
    /* @__PURE__ */ jsx(FlashMessage, {}),
    /* @__PURE__ */ jsx("div", { id: "modal" }),
    /* @__PURE__ */ jsx("main", { id: "mainContent", className: "relative flex flex-col h-full grow md:justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full pb-20 overflow-hidden grow", children }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    showToTopButton && /* @__PURE__ */ jsx("button", { onClick: () => scrollToTop(), className: "fixed bottom-4 right-4 z-10 rounded-full h-[50px] w-[50px] bg-pbsblue text-white font-bold shadow-xl p-3", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 23 23", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z", clipRule: "evenodd", stroke: "currentColor", strokeWidth: "3px" }) }) })
  ] }) });
}
const Level0Image = "/build/assets/Level0_A1-96fc0208.jpg";
const Level1Image = "/build/assets/Level1_A1-45b4447f.jpg";
const Level2Image = "/build/assets/Level2_A1-2f68a9d4.jpg";
const Level3Image = "/build/assets/Level3_A1-e123ba97.jpg";
const Level4Image = "/build/assets/Level4_A1-2e24f1b8.jpg";
const BibleTimeLessons = "/build/assets/lessons-fan-english-6d32e969.png";
const GoingDeeperLessons = "/build/assets/goingdeeper-fan-7ea58ba5.png";
const GleanersLessons = "/build/assets/gleaners-lessons-7b7107f5.png";
const getCurrentMonthNumber = () => (/* @__PURE__ */ new Date()).getMonth();
const getCurrentSeriesNumber = () => ((/* @__PURE__ */ new Date()).getFullYear() - 2022) % 3;
const courseContent = [
  {
    heading: "Bible Time Lessons",
    description: /* @__PURE__ */ jsx(Paragraph, { children: "Bibletime is an extensive course of weekly fun-filled, activity work sheets for pre-school children right up to the age of 16. It covers the majority of the main Bible stories from Creation through to the early Church. Bibletime is designed for individual use or in a group setting and is available free of charge." }),
    longDescription: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Paragraph, { children: "Bibletime is an extensive course of weekly fun-filled, activity work sheets for pre-school children right up to the age of 16. It covers the majority of the main Bible stories from Creation through to the early Church. Bibletime is designed for individual use or in a group setting and is available free of charge." }),
      /* @__PURE__ */ jsx(Paragraph, { children: "The course is split into 5 levels aimed at an approximate reading age. Each level consists of a syllabus of 36 lessons split monthly over 3 years. Each lesson is subdivided into four stories or studies which can be completed weekly. The stories are taken from both the Old and New Testaments and cover basic Bible stories and major Bible characters." }),
      /* @__PURE__ */ jsx(Paragraph, { children: "If you would like to receive free printed copies of the lessons each month in the post, have them marked and possibly receive prizes based on your scores, please contact us." })
    ] }),
    image: BibleTimeLessons,
    type: "bibletime",
    scrollTo: "bibletime",
    buttonText: "Ages 4-15"
  },
  {
    heading: "Going Deeper",
    description: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Paragraph, { children: "Aimed at ages 15 to adult Going Deeper is a course designed for those who want to start digging a little deeper into the Bible. Going Deeper is designed for individual use and is free of charge. The course is split into 3 groups of 12 monthly lessons like the Bibletime lessons." }) }),
    longDescription: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Paragraph, { children: "Aimed at ages 15 to adult Going Deeper is a course designed for those who want to start digging a little deeper into the Bible. Going Deeper is designed for individual use and is free of charge. The course is split into 3 groups of 12 monthly lessons like the Bibletime lessons. This course was started in 2022 and is currently being updated each month. " }),
      /* @__PURE__ */ jsx(Paragraph, { className: "text-lg text-center text-blue-600", children: "You may find some lessons missing, they will be added in soon!" })
    ] }),
    image: GoingDeeperLessons,
    type: "goingdeeper",
    scrollTo: "goingdeeper",
    buttonText: "Age 16 to adults"
  },
  {
    heading: "Gleaners",
    description: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Paragraph, { children: "Gleaners is an in depth 5 year study course aimed at adults, covering a wide range of subjects including creation, christian life and prophecy. It is designed for individual use and is free of charge. Please get in touch if this would be of benefit to you." }) }),
    image: GleanersLessons,
    type: "gleaners",
    scrollTo: "gleaners",
    buttonText: "For adults"
  }
];
const groupThemes = {
  "bibletime": [
    { tagCode: "level0", tagClass: "bg-bibletime-pink", tagName: "level 0" },
    { tagCode: "level1", tagClass: "bg-bibletime-orange", tagName: "level 1" },
    { tagCode: "level2", tagClass: "bg-bibletime-red", tagName: "level 2" },
    { tagCode: "level3", tagClass: "bg-bibletime-green", tagName: "level 3" },
    { tagCode: "level4", tagClass: "bg-bibletime-blue", tagName: "level 4" }
  ],
  "goingdeeper": [
    { tagCode: "goingdeeper", tagClass: "bg-bibletime-blue", tagName: "group A" },
    { tagCode: "goingdeeper", tagClass: "bg-bibletime-green", tagName: "group B" },
    { tagCode: "goingdeeper", tagClass: "bg-bibletime-red", tagName: "group C" }
  ],
  "gleaners": [
    { tagCode: "gleaners", tagClass: "bg-bibletime-pink", tagName: "group A" },
    { tagCode: "gleaners", tagClass: "bg-bibletime-orange", tagName: "group B" },
    { tagCode: "gleaners", tagClass: "bg-bibletime-red", tagName: "group C" },
    { tagCode: "gleaners", tagClass: "bg-bibletime-green", tagName: "group D" },
    { tagCode: "gleaners", tagClass: "bg-bibletime-blue", tagName: "group E" }
  ]
};
const bibleTimeLevels = [
  {
    tagName: "Level 0",
    tagSubText: "Preschool",
    tagCode: "level0",
    tagColor: "bg-bibletime-pink",
    image: Level0Image,
    description: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: "Bible Stories" }),
      /* @__PURE__ */ jsx("p", { children: "Simple Puzzles" }),
      /* @__PURE__ */ jsx("p", { children: "Colouring" })
    ] })
  },
  {
    tagName: "Level 1",
    tagSubText: "Ages 5-7",
    tagCode: "level1",
    tagColor: "bg-bibletime-orange",
    image: Level1Image,
    description: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { children: "Bible Stories" }),
      /* @__PURE__ */ jsx("p", { children: "Colouring Puzzles" }),
      /* @__PURE__ */ jsx("p", { children: "Questions" })
    ] })
  },
  {
    tagName: "Level 2",
    tagSubText: "Ages 8-10",
    tagCode: "level2",
    tagColor: "bg-bibletime-red",
    image: Level2Image,
    description: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { children: "More advanced Bible stories with tasks and key verses to learn" }) })
  },
  {
    tagName: "Level 3",
    tagSubText: "Ages 11-13",
    tagCode: "level3",
    tagColor: "bg-bibletime-green",
    image: Level3Image,
    description: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { children: "Deeper level Bible readings, questions and activities with key verses to learn" }) })
  },
  {
    tagName: "Level 4",
    tagSubText: "Ages 14+",
    tagCode: "level4",
    tagColor: "bg-bibletime-blue",
    image: Level4Image,
    description: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { children: "Advanced Bible readings, more complex question and key verses to learn" }) })
  }
];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const seriesNames = [
  { name: "A series", code: "A", tagClass: "" },
  { name: "B series", code: "B", tagClass: "" },
  { name: "C series", code: "C", tagClass: "" }
];
const goingDeeperSeriesNames = [
  { name: "A series", code: "A", tagClass: "bg-bibletime-red" },
  { name: "B series", code: "B", tagClass: "bg-bibletime-green" },
  { name: "C series", code: "C", tagClass: "bg-bibletime-blue" }
];
const gleanersSeriesNames = [
  { name: "A series", code: "A", tagClass: "bg-bibletime-pink" },
  { name: "B series", code: "B", tagClass: "bg-bibletime-orange" },
  { name: "C series", code: "C", tagClass: "bg-bibletime-red" },
  { name: "D series", code: "D", tagClass: "bg-bibletime-green" },
  { name: "E series", code: "E", tagClass: "bg-bibletime-blue" }
];
const BES_GLOBALS = {
  bibleTimeBySeries: {},
  goingDeeperBySeries: {},
  gleanersBySeries: {}
};
const setAllBesLinks = function(bibleTimeValues, goingDeeperValues = {}, gleanersValues = {}) {
  BES_GLOBALS.bibleTimeBySeries = groupedBySeriesBes(bibleTimeValues);
  if (Object.keys(goingDeeperValues).length !== 0) {
    BES_GLOBALS.goingDeeperBySeries = groupedBySeriesBes(goingDeeperValues);
  }
  if (Object.keys(gleanersValues).length !== 0) {
    BES_GLOBALS.gleanersBySeries = groupedBySeriesBes(gleanersValues);
  }
};
const getDownloadLink = function(seriesCode, tagCode, monthNumber, type = "bibletime") {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  if (type === "bibletime") {
    return ((_c = (_b = (_a = BES_GLOBALS.bibleTimeBySeries[seriesCode]) == null ? void 0 : _a[tagCode]) == null ? void 0 : _b[monthNumber]) == null ? void 0 : _c.link) ?? "";
  } else if (type === "goingdeeper") {
    return ((_f = (_e = (_d = BES_GLOBALS.goingDeeperBySeries[seriesCode]) == null ? void 0 : _d[tagCode]) == null ? void 0 : _e[monthNumber]) == null ? void 0 : _f.link) ?? "";
  } else if (type === "gleaners") {
    return ((_i = (_h = (_g = BES_GLOBALS.gleanersBySeries[seriesCode]) == null ? void 0 : _g[tagCode]) == null ? void 0 : _h[monthNumber]) == null ? void 0 : _i.link) ?? "";
  }
  return "";
};
const getCurrentSeriesList = function(seriesCode, updateValues) {
  var _a;
  let onlyTagged = {};
  const besLinks = updateValues;
  for (const key in besLinks) {
    let filtered = besLinks[key].filter((value) => value.series === seriesCode);
    if (filtered.length === 0) {
      continue;
    }
    if ((_a = onlyTagged[key]) == null ? void 0 : _a.length) {
      onlyTagged[key] = [...onlyTagged[key], ...filtered];
    } else {
      onlyTagged[key] = [...filtered];
    }
  }
  return onlyTagged;
};
const groupedBySeriesBes = function(updateValues) {
  let pivot = {};
  gleanersSeriesNames.forEach((series) => {
    let currentList = getCurrentSeriesList(series.code, updateValues);
    if (Object.keys(currentList).length !== 0) {
      pivot[series.code] = currentList;
    }
  });
  return pivot;
};
const getAlphabetFromNumber = function(num) {
  return (num + 10).toString(36);
};
const getUpperCaseAlphabetFromNumber = (num) => {
  return getAlphabetFromNumber(num).toUpperCase();
};
const sortArrayById = (array) => array.sort((a, b) => a.id - b.id);
const getLastElementsOfArray = (array, number) => array.slice(-1 * number);
const getButtonClassNamesAsString = (hierarchy, size) => {
  let classList = "inline-flex mt-1 items-center justify-center capitalize rounded font-medium leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-300".split(" ");
  switch (hierarchy) {
    case "primary":
      classList.push(..."drop-shadow-md text-white bg-pbsblue focus:bg-blue-700 focus:drop-shadow-lg  hover:bg-blue-700 hover:-translate-y-px hover:drop-shadow-lg active:translate-y-0 active:drop-shadow-md active:bg-blue-700".split(" "));
      break;
    case "secondary":
      classList.push(..."border border-pbsblue text-blue-900 bg-white focus:drop-shadow-lg hover:-translate-y-px hover:drop-shadow-lg active:translate-y-0 active:drop-shadow-md focus:bg-gray-50 hover:bg-gray-50 active:bg-gray-50".split(" "));
      break;
    case "tertiary":
      classList.push(..."text-blue-900 bg-gray-200 focus:bg-gray-300 hover:bg-gray-300 active:bg-gray-300".split(" "));
      break;
    case "transparent":
      classList.push(..."text-blue-800 bg-transparent focus:underline hover:underline active:underline".split(" "));
  }
  switch (size) {
    case "large":
      classList.push(..."text-lg px-8 py-3 tracking-wide".split(" "));
      break;
    case "medium":
      classList.push(..."px-6 py-2.5".split(" "));
      break;
    case "small":
      classList.push(..."text-sm px-4 py-1.5".split(" "));
      break;
    case "xsmall":
      classList.push(..."text-xs px-2 py-0.5 tracking-tight".split(" "));
      break;
  }
  return [...new Set(classList.filter((item) => item.trim() !== ""))].join(" ");
};
const truncateString = (value, index) => {
  return value.length > index ? value.slice(0, index - 1) + "…" : value;
};
const useScrollTo = (to, props) => {
  useEffect(() => {
    if (to && to !== "") {
      setTimeout(() => {
        scroller.scrollTo(to, props);
      }, 100);
    }
  }, [to]);
};
function ButtonLink({ hierarchy = "primary", size = "medium", href, children, Icon }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Link,
    {
      as: "button",
      type: "button",
      className: getButtonClassNamesAsString(hierarchy, size),
      href,
      children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { children }),
        Icon && /* @__PURE__ */ jsx(Icon, {})
      ] })
    }
  ) });
}
function ButtonAnchor({ hierarchy = "primary", href, isExternalLink = false, Icon, children }) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      className: getButtonClassNamesAsString(hierarchy, "medium"),
      target: isExternalLink ? "_blank" : "_self",
      children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { children: children ?? href }),
        Icon && /* @__PURE__ */ jsx(Icon, {})
      ] })
    }
  );
}
function ExternalLink({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" }) });
}
function About() {
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs(ContentWrapper, { title: "About Us", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx(Heading2, { children: "Who We Are" }),
      /* @__PURE__ */ jsxs(ParagraphContainer, { children: [
        /* @__PURE__ */ jsx(Paragraph, { children: "Postal Bible School is a registered charity in Ireland and is closely linked with the work of BES (Bible Educational Services) which grew out of the same seed work and now connects it to other PBS centres across the world." }),
        /* @__PURE__ */ jsx(Paragraph, { children: "As a charity our aims are the distribution and teaching of God’s word the bible through distribution of educational resources and the hosting of events." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Timeline, {}),
    /* @__PURE__ */ jsx(Heading2, { children: "Volunteers" }),
    /* @__PURE__ */ jsxs(ParagraphContainer, { children: [
      /* @__PURE__ */ jsx(Paragraph, { children: "Postal Bible School has depended on the help of those who freely gave of their spare time from its inception. One of the most important of these roles is praying. Others include correcting lessons and communicating with kids via post, being a leader at camp and speaking to young people about the Bible. People find opportunity to use all sorts of abilities to assist us as they seek to serve God. These opportunities have included many things including carrying boxes, fixing vehicles, computer work, paper work & building work as well as more public opportunities to share the Christian faith. We praise God for the assistance of all those who have supported the work in one way or another and trust God to continue to provide people to do His work in the future." }),
      /* @__PURE__ */ jsx(Paragraph, { children: "If you would like to contact us with a view to helping us in prayer or some other way please contact Gareth or Margaret" }),
      /* @__PURE__ */ jsx(ButtonLink, { href: route("contactus"), children: "Contact Us" })
    ] }),
    /* @__PURE__ */ jsx(Heading2, { children: "How is PBS Funded" }),
    /* @__PURE__ */ jsx(ParagraphContainer, { children: /* @__PURE__ */ jsx(Paragraph, { children: "Postal Bible School is a charity, it does not trade to make money. We provide our Bible study courses, and the prizes for participation free of charge to approximately 5000 students. All the funding required for the running of Postal Bible School comes from those who wish to give freely of their own income. We do not fundraise, we simply rely on God to provide what is needed and He does this through a whole variety of people, some of whom we have never even met. We believe it is a testimony of God's goodness, that for over 50 years now, the work of Postal Bible School has been funded in this manner. Many others besides ourselves have found God faithful to provide in this manner right back to Bible times. On one such occasion God provided for His people when He made water come out of the rock for thirsty people. Exodus 17:6-7" }) }),
    /* @__PURE__ */ jsx(Heading2, { children: "PBS and BES" }),
    /* @__PURE__ */ jsxs(ParagraphContainer, { children: [
      /* @__PURE__ */ jsx(Paragraph, { children: "Bible Education Services is the trust which organises the publication of material used by Postal Bible School. PBS and BES began as the same organisation. PBS continues to use the material in Ireland while BES produce the material and encourage the translation and give support to those who make use of this material around the world." }),
      /* @__PURE__ */ jsx(Paragraph, { children: "For more information you can check out their website" }),
      /* @__PURE__ */ jsx(ButtonAnchor, { Icon: ExternalLink, isExternalLink: true, href: "https://www.besweb.com/", children: /* @__PURE__ */ jsx("span", { className: "tracking-wider", children: "BESWEB.ORG" }) })
    ] })
  ] }) });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About
}, Symbol.toStringTag, { value: "Module" }));
function BasicButton({ type = "button", hierarchy = "primary", size = "medium", processing = false, children, onClick }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "button",
    {
      type,
      onClick,
      className: getButtonClassNamesAsString(hierarchy, size),
      disabled: processing,
      children
    }
  ) });
}
function PrimaryButton({ type = "submit", className = "", processing = false, children, onClick }) {
  return /* @__PURE__ */ jsx(BasicButton, { type, processing, onClick, children });
}
function SecondaryButton({ type = "button", className = "", processing, children, onClick }) {
  return /* @__PURE__ */ jsx(BasicButton, { hierarchy: "secondary", type, processing, onClick, children });
}
function DeleteDialogCard({ isOpen, onClose, onSubmit, message, hasCloseButton }) {
  const dialogRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setIsModalOpen(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current !== null && !dialogRef.current.contains(event.target)) {
        onClose && onClose();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClose]);
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);
  useEffect(() => {
    const modalElement = dialogRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);
  if (!isModalOpen)
    return null;
  return /* @__PURE__ */ jsxs("dialog", { onKeyDown: handleKeyDown, ref: dialogRef, className: "relative z-10 px-5 pt-10 pb-5 mx-auto bg-white border-2 rounded md:w-1/3 min-w-96 h-fit", children: [
    /* @__PURE__ */ jsx("button", { onClick: handleCloseModal, className: "absolute top-5 right-5", children: /* @__PURE__ */ jsx(CloseX, { className: "text-gray-700 w-7 h-7 hover:text-gray-500" }) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-3", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-4 text-lg font-bold", children: "Delete School" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4 text-base text-gray-500", children: (message ? message : "Are you sure you want to delete this record?") + " The record will be removed permanently. This action cannot be undone." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "inline-flex justify-center w-full gap-2 mt-5 md:justify-end", children: [
      /* @__PURE__ */ jsx(SecondaryButton, { onClick: handleCloseModal, children: "Cancel" }),
      /* @__PURE__ */ jsx(PrimaryButton, { type: "button", className: "w-1/3 text-white bg-red-600 hover:bg-red-700 active:bg-red-700 focus:bg-red-700", onClick: () => onSubmit(), children: "Confirm" })
    ] })
  ] });
}
function Trash({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" }) });
}
function EditIcon({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" }) });
}
function Eye({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: [
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" }),
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
  ] });
}
function InputLabel2({ forInput, value, required = false, className = "", children }) {
  return /* @__PURE__ */ jsx("label", { htmlFor: forInput, className: `block capitalize py-1 text-base rounded font-medium md:text-base mb-px text-slate-700 ${required === true ? "after:content-['*'] after:ml-1 after:text-red-500" : ""} ${className}`, children: value ? value : children });
}
function TextInput({ type = "text", name, id, value, placeholder, ariaLabelledBy, className, autoComplete = "off", required, handleChange, onBlur }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      name,
      id,
      value,
      placeholder,
      className: "border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out self-center " + className,
      autoComplete,
      required,
      onChange: (e) => handleChange(e),
      onBlur,
      "aria-labelledby": ariaLabelledBy
    }
  );
}
function AdvancedTable({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ jsx(InputLabel2, { forInput: "filter", value: "Filter :" }),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          placeholder: "Search",
          type: "text",
          name: "filter",
          id: "filter",
          value: filtering,
          className: "",
          handleChange: (e) => setFiltering(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("table", { className: "w-full text-base text-left border border-black table-auto", children: [
      /* @__PURE__ */ jsx("thead", { className: "font-normal text-gray-500 border-b border-gray-400", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx("th", { className: "p-2", children: header.isPlaceholder ? null : /* @__PURE__ */ jsxs(
        "div",
        {
          className: header.column.getCanSort() ? "cursor-pointer select-none" : "",
          onClick: header.column.getToggleSortingHandler(),
          children: [
            flexRender(
              header.column.columnDef.header,
              header.getContext()
            ),
            header.column.getCanSort() && {
              asc: " 🔼",
              desc: " 🔽",
              none: " ↕️"
            }[header.column.getIsSorted() ? header.column.getIsSorted() : "none"]
          ]
        }
      ) }, header.id)) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx("tbody", { children: table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx("tr", { className: "even:bg-gray-100", children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx("td", { className: "px-2 min-w-[50px]", children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) }),
      /* @__PURE__ */ jsx("tfoot", { children: table.getFooterGroups().map((footerGroup) => /* @__PURE__ */ jsx("tr", { children: footerGroup.headers.map((header) => /* @__PURE__ */ jsx("th", { children: header.isPlaceholder ? null : flexRender(
        header.column.columnDef.footer,
        header.getContext()
      ) }, header.id)) }, footerGroup.id)) })
    ] })
  ] });
}
function Admin$1({ videoList }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [nameToDelete, setNameToDelete] = useState(null);
  const showModal = (id) => {
    setIdToDelete(id);
    setToggleModal(true);
    setNameToDelete(videoList[id].monthTitle);
  };
  const handleOnClose = () => {
    setIdToDelete(null);
    setToggleModal(false);
  };
  const handleSubmit = () => {
    if (idToDelete) {
      router.delete(route("assembly.destroy", idToDelete));
    } else {
      console.error("Could not find that entry. Please contact administrator");
    }
    setToggleModal(false);
  };
  const tableDataMemo = useMemo(() => videoList, [videoList]);
  const columnHelper = createColumnHelper();
  const defaultColumns = [
    columnHelper.display({
      id: "Image",
      header: "Thumbnail",
      cell: ({ row }) => /* @__PURE__ */ jsx("img", { className: "w-40", src: row.original.imageLink, alt: "Image for " + row.original.monthTitle })
    }),
    columnHelper.accessor((row) => row.monthTitle, {
      header: "Title"
    }),
    columnHelper.accessor((row) => row.month, {
      header: "Month"
    }),
    columnHelper.accessor((row) => row.series, {
      header: "Series"
    }),
    columnHelper.accessor((row) => row.routename, {
      header: "Routename"
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex w-full gap-2 py-2", children: [
        /* @__PURE__ */ jsxs(Link, { className: "text-blue-500 underline hover:no-underline", href: "/assembly/" + row.original.id + "/edit", children: [
          /* @__PURE__ */ jsx(EditIcon, { className: "w-6 h-6" }),
          " Edit"
        ] }),
        /* @__PURE__ */ jsxs(Link, { className: "text-blue-500 underline hover:no-underline", href: "/assembly/" + row.original.routename, children: [
          /* @__PURE__ */ jsx(Eye, { className: "w-6 h-6" }),
          " View"
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "text-blue-500 underline hover:no-underline", onClick: () => showModal(row.original.id), children: [
          /* @__PURE__ */ jsx(Trash, { className: "w-6 h-6" }),
          " Delete"
        ] })
      ] })
    })
  ];
  return /* @__PURE__ */ jsxs(WrapperLayout, { children: [
    /* @__PURE__ */ jsx(DeleteDialogCard, { isOpen: toggleModal, message: `Are you sure you want to delete "${nameToDelete}?"`, onClose: handleOnClose, onSubmit: handleSubmit, hasCloseButton: true }),
    /* @__PURE__ */ jsxs(ContentWrapper, { title: "Admin", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-end w-full", children: /* @__PURE__ */ jsx(ButtonLink, { href: route("assembly.create"), children: "Add video" }) }),
      /* @__PURE__ */ jsx("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ jsx(AdvancedTable, { data: tableDataMemo, columns: defaultColumns }) })
    ] })
  ] });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Admin$1
}, Symbol.toStringTag, { value: "Module" }));
function BonusAdmin({ videoList }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [nameToDelete, setNameToDelete] = useState(null);
  const showModal = (id) => {
    setIdToDelete(id);
    setToggleModal(true);
    setNameToDelete(videoList[id].monthTitle);
  };
  const handleOnClose = () => {
    setIdToDelete(null);
    setToggleModal(false);
  };
  const handleSubmit = () => {
    if (idToDelete !== null) {
      router.delete(route("assembly.bonus.destroy", idToDelete));
    } else {
      console.error("Could not find that entry. Please contact administrator");
    }
    setToggleModal(false);
  };
  const tableDataMemo = useMemo(() => videoList, [videoList]);
  const columnHelper = createColumnHelper();
  const defaultColumns = [
    columnHelper.display({
      id: "Image",
      header: "Thumbnail",
      cell: ({ row }) => /* @__PURE__ */ jsx("img", { className: "w-40", src: row.original.imageLink, alt: "Image for " + row.original.monthTitle })
    }),
    columnHelper.accessor((row) => row.monthTitle, {
      header: "Title"
    }),
    columnHelper.accessor((row) => row.routename, {
      header: "Routename"
    }),
    columnHelper.accessor((row) => row.category, {
      header: "Category"
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex w-full gap-2 py-2", children: [
        /* @__PURE__ */ jsxs(Link, { className: "text-blue-500 underline hover:no-underline", href: route("assembly.bonus.edit", row.original.id), children: [
          /* @__PURE__ */ jsx(EditIcon, { className: "w-6 h-6" }),
          " Edit"
        ] }),
        /* @__PURE__ */ jsxs(Link, { className: "text-blue-500 underline hover:no-underline", href: route("assembly.show", row.original.routename), children: [
          /* @__PURE__ */ jsx(Eye, { className: "w-6 h-6" }),
          " View"
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "text-blue-500 underline hover:no-underline", onClick: () => showModal(row.original.id), children: [
          /* @__PURE__ */ jsx(Trash, { className: "w-6 h-6" }),
          " Delete"
        ] })
      ] })
    })
  ];
  return /* @__PURE__ */ jsxs(WrapperLayout, { children: [
    /* @__PURE__ */ jsx(DeleteDialogCard, { isOpen: toggleModal, message: `Are you sure you want to delete "${nameToDelete}?"`, onClose: handleOnClose, onSubmit: handleSubmit, hasCloseButton: true }),
    /* @__PURE__ */ jsxs(ContentWrapper, { title: "Admin - Bonus Videos", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-end w-full", children: /* @__PURE__ */ jsx(ButtonLink, { href: route("assembly.bonus.create"), children: "Add video" }) }),
      /* @__PURE__ */ jsx("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ jsx(AdvancedTable, { data: tableDataMemo, columns: defaultColumns }) })
    ] })
  ] });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BonusAdmin
}, Symbol.toStringTag, { value: "Module" }));
function FileInput({ name, id, className, required, handleChange, accept }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type: "file",
      name,
      id,
      onChange: handleChange,
      className,
      required,
      accept
    }
  );
}
function InputLabel({ forInput, id, value, required, className, children }) {
  return /* @__PURE__ */ jsx("label", { id, htmlFor: forInput, className: `inline-block capitalize p-2 text-base rounded bg-sky-100 font-medium md:text-base mb-px text-slate-700 ${required && "after:content-['*'] after:ml-1 after:text-red-500"} ${className}`, children: value ? value : children });
}
function SelectInput({ name, id, value, className = "", required, handleChange, children, defaultValue }) {
  return /* @__PURE__ */ jsx(
    "select",
    {
      name,
      id,
      defaultValue: !value ? defaultValue : void 0,
      value,
      className: `border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out text-gray-700 focus-within:text-inherit ${className}`,
      onChange: (e) => handleChange(e),
      autoComplete: "on",
      required,
      children
    }
  );
}
function ToastBanner({ message }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { role: "alert", className: "w-full px-8 py-4 mb-2 text-left bg-red-500 rounded text-slate-50", children: /* @__PURE__ */ jsx("p", { children: message }) }) });
}
function Create$3() {
  const { errors } = usePage().props;
  const { data, setData, post, reset, processing } = useForm({
    monthTitle: "",
    imageFile: null,
    category: "",
    videoTitle: "",
    externalUrl: "",
    duration: ""
  });
  const handleChange = (event) => {
    switch (event.target.name) {
      case "monthTitle":
      case "videoTitle":
      case "externalUrl":
      case "duration":
      case "category":
        setData(event.target.name, event.target.value);
    }
  };
  const handleFileChange = (event) => {
    if (event.target.name === "imageFile" && event.target.files) {
      setData(event.target.name, event.target.files[0]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    post(route("assembly.bonus.store"));
  };
  useEffect(() => {
    reset();
  }, []);
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs(ContentWrapper, { title: "Create New Bonus Assembly Video", children: [
    errors && Object.keys(errors).map(
      (key) => /* @__PURE__ */ jsx(ToastBanner, { message: errors[key] }, key)
    ),
    /* @__PURE__ */ jsxs("form", { method: "post", onSubmit: handleSubmit, className: "flex flex-col items-start gap-4 px-10 py-5 border w-fit", children: [
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Basic Information" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "monthTitle", value: "Title", required: true }),
          /* @__PURE__ */ jsx(TextInput, { type: "text", name: "monthTitle", id: "monthTitle", value: data.monthTitle, className: "", handleChange, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "category", value: "Category", required: true }),
          /* @__PURE__ */ jsxs(SelectInput, { defaultValue: "", name: "category", id: "category", className: "self-center", handleChange, required: true, children: [
            /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select…" }),
            /* @__PURE__ */ jsx("option", { value: "bbw", children: "Big Bible Words" }),
            /* @__PURE__ */ jsx("option", { value: "bbooks", children: "Bible Books" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "imageFile", value: "Thumbnail Image", required: true }),
          /* @__PURE__ */ jsx(FileInput, { name: "imageFile", id: "imageFile", className: "", handleChange: handleFileChange, required: true, accept: "image/png" })
        ] }),
        /* @__PURE__ */ jsx("img", { className: "w-60", src: data.imageFile ? URL.createObjectURL(data.imageFile) : "" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Video Information" }),
      /* @__PURE__ */ jsxs("table", { children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "External URL" }),
          /* @__PURE__ */ jsx("th", { children: "Title" }),
          /* @__PURE__ */ jsx("th", { children: "Duration" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "externalUrl",
              id: `externalUrl`,
              value: data.externalUrl,
              className: "",
              handleChange
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "videoTitle",
              id: `videoTitle`,
              value: data.videoTitle,
              className: "",
              handleChange
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "duration",
              id: `duration`,
              value: data.duration,
              className: "",
              handleChange
            }
          ) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex justify-center w-full gap-2 mt-5 md:justify-end", children: [
        /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: route("assembly.admin"), children: "Cancel" }),
        /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", className: "w-60", processing, children: "Create" })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$3
}, Symbol.toStringTag, { value: "Module" }));
function Edit$3({ videoData }) {
  const { errors } = usePage().props;
  const { data, setData, post, reset, processing } = useForm({
    monthTitle: videoData.monthTitle,
    imageFile: videoData.imageFile,
    imageLink: videoData.imageLink,
    videoTitle: videoData.title,
    externalUrl: videoData.externalUrl,
    duration: videoData.duration,
    category: videoData.category
  });
  const handleChange = (event) => {
    switch (event.target.name) {
      case "monthTitle":
      case "videoTitle":
      case "externalUrl":
      case "duration":
      case "category":
        setData(event.target.name, event.target.value);
    }
  };
  const handleFileChange = (event) => {
    if (event.target.name === "imageFile" && event.target.files) {
      setData(event.target.name, event.target.files[0]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    post(route("assembly.bonus.update", videoData.id));
  };
  useEffect(() => {
    reset();
  }, []);
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs(ContentWrapper, { title: "Edit - Big Bible Word", children: [
    errors && Object.keys(errors).map(
      (key) => /* @__PURE__ */ jsx(ToastBanner, { message: errors[key] }, key)
    ),
    /* @__PURE__ */ jsxs("form", { method: "post", onSubmit: handleSubmit, className: "flex flex-col items-start gap-4 px-10 py-5 border w-fit", children: [
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Basic Information" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "monthTitle", value: "Title", required: true }),
          /* @__PURE__ */ jsx(TextInput, { type: "text", name: "monthTitle", id: "monthTitle", value: data.monthTitle, className: "", handleChange, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "category", value: "Category", required: true }),
          /* @__PURE__ */ jsxs(SelectInput, { defaultValue: data.category, name: "category", id: "category", className: "self-center", handleChange, required: true, children: [
            /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select…" }),
            /* @__PURE__ */ jsx("option", { value: "bbw", children: "Big Bible Words" }),
            /* @__PURE__ */ jsx("option", { value: "bbooks", children: "Bible Books" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "imageFile", value: "Thumbnail Image" }),
          /* @__PURE__ */ jsx(FileInput, { name: "imageFile", id: "imageFile", className: "", handleChange: handleFileChange, accept: "image/png" })
        ] }),
        /* @__PURE__ */ jsx("img", { className: "w-60", src: data.imageFile ? URL.createObjectURL(data.imageFile) : data.imageLink })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Video Information" }),
      /* @__PURE__ */ jsxs("table", { children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "External URL" }),
          /* @__PURE__ */ jsx("th", { children: "Title" }),
          /* @__PURE__ */ jsx("th", { children: "Duration" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "externalUrl",
              id: `externalUrl`,
              value: data.externalUrl,
              className: "",
              handleChange
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "videoTitle",
              id: `videoTitle`,
              value: data.videoTitle,
              className: "",
              handleChange
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "duration",
              id: `duration`,
              value: data.duration,
              className: "",
              handleChange
            }
          ) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex justify-center w-full gap-2 mt-5 md:justify-end", children: [
        /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: route("assembly.bonus.admin"), children: "Cancel" }),
        /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", className: "w-60", processing, children: "Update" })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$3
}, Symbol.toStringTag, { value: "Module" }));
function Heading1Alt({ children }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("h1", { className: "p-6 mt-6 mb-4 text-3xl font-bold leading-relaxed text-center text-blue-900 uppercase md:font-extrabold font-subtitle md:text-4xl", children }) });
}
function VideoGalleryCard({ title, clickLink, month, series = "", active = false, total, imageLink, idx }) {
  return /* @__PURE__ */ jsx("article", { children: /* @__PURE__ */ jsxs("a", { href: clickLink, className: "inline-flex flex-col items-center gap-2 p-2 md:p-4 overflow-hidden rounded-lg drop-shadow-lg " + (active ? "bg-pbsblue text-slate-50" : "bg-stone-100 text-gray-600"), children: [
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("img", { src: "/assembly/image/" + imageLink, alt: "Video " + idx, className: "block object-cover w-full h-20 bg-top rounded md:h-44 aspect-video" }) }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-sm font-bold uppercase md:text-base", children: series ? month + " — " + series : month }),
      /* @__PURE__ */ jsx("h2", { className: "text-sm md:text-base italic text-gray-600 uppercase", children: title === "" ? `Title ${idx}` : title })
    ] })
  ] }) });
}
function GalleryAssembly({ headingText, videoList }) {
  const totalVideos = videoList.length;
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsx(Heading1Alt, { children: headingText ? headingText : "Previous Assembly Videos" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center w-full", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4 w-fit md:max-w-6xl", children: videoList.map(({ monthTitle, month, routename, imageLink, id, series }, index) => /* @__PURE__ */ jsx(VideoGalleryCard, { clickLink: route("assembly.show", { "series": routename }), active: false, title: monthTitle, series, month, total: totalVideos, imageLink: routename, idx: index }, monthTitle + index)) }) })
  ] });
}
function Index$5({ bbwList = [], bbooksList = [], canEdit }) {
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs(ContentWrapper, { title: "Bonus Videos", children: [
    canEdit && /* @__PURE__ */ jsxs("div", { className: "flex justify-end w-full gap-2", children: [
      /* @__PURE__ */ jsx(ButtonLink, { href: route("assembly.bonus.admin"), children: "Admin Panel" }),
      /* @__PURE__ */ jsx(ButtonLink, { href: route("assembly.bonus.create"), children: "Add New Video" })
    ] }),
    /* @__PURE__ */ jsx(GalleryAssembly, { headingText: "Big Bible Words", videoList: bbwList }),
    /* @__PURE__ */ jsx(GalleryAssembly, { headingText: "Bible Books Explained", videoList: bbooksList })
  ] }) });
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$5
}, Symbol.toStringTag, { value: "Module" }));
function Create$2() {
  const initialState = [{
    videoTitle: "",
    externalUrl: "",
    duration: ""
  }];
  const reducer = (state, action) => {
    if (action.type === "changeValue" && "name" in action) {
      let returnObj = [...state];
      returnObj[action.idx][action.name] = action.value + "";
      return returnObj;
    } else if (action.type === "addValue") {
      return [
        ...state,
        ...initialState
      ];
    } else if (action.type === "removeValue" && "idx" in action) {
      if (state.length === 1) {
        return initialState;
      }
      let returnObj = [...state];
      returnObj.splice(action.idx, 1);
      return returnObj;
    } else {
      return state;
    }
  };
  const [videoState, dispatch] = useReducer(reducer, initialState);
  const { errors } = usePage().props;
  const { data, setData, post, reset, processing } = useForm({
    monthTitle: "",
    month: "",
    series: "",
    routename: "",
    imageFile: null,
    content: [{
      videoTitle: "",
      externalUrl: "",
      duration: ""
    }]
  });
  const handleChange = (event) => {
    switch (event.target.name) {
      case "monthTitle":
      case "month":
      case "series":
      case "routename":
        setData(event.target.name, event.target.value);
    }
  };
  const handleFileChange = (event) => {
    if (event.target.name === "imageFile" && event.target.files) {
      setData(event.target.name, event.target.files[0]);
    }
  };
  const handleComplexChange = (idx, event) => {
    if (event.target instanceof HTMLInputElement) {
      switch (event.target.name) {
        case "videoTitle":
        case "externalUrl":
        case "duration":
          dispatch({
            type: "changeValue",
            name: event.target.name,
            value: event.target.value,
            idx
          });
          break;
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    post(route("assembly.store"));
  };
  useEffect(() => {
    reset();
  }, []);
  useEffect(() => {
    setData("content", [...videoState]);
  }, [videoState]);
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs(ContentWrapper, { title: "Create New Assembly", children: [
    errors && Object.keys(errors).map(
      (key) => /* @__PURE__ */ jsx(ToastBanner, { message: errors[key] }, key)
    ),
    /* @__PURE__ */ jsxs("form", { method: "post", onSubmit: handleSubmit, className: "flex flex-col items-start gap-4 px-10 py-5 border w-fit", children: [
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Basic Information" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "monthTitle", value: "Title", required: true }),
          /* @__PURE__ */ jsx(TextInput, { type: "text", name: "monthTitle", id: "monthTitle", value: data.monthTitle, className: "", handleChange, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "month", value: "Month", required: true }),
          /* @__PURE__ */ jsx(TextInput, { type: "text", name: "month", id: "month", value: data.month, className: "", handleChange, required: true }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: '//Full month name. E.g. "January"' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-end gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "series", value: "series", required: true }),
          /* @__PURE__ */ jsx(TextInput, { type: "text", name: "series", id: "series", value: data.series, className: "", handleChange, required: true }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: '//format should be letter and number. E.g. "A1"' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-end gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "routename", value: "routename", required: true }),
          /* @__PURE__ */ jsx(TextInput, { type: "text", name: "routename", id: "routename", value: data.routename, className: "", handleChange, required: true }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: '//format should be letter and number with leading 0 for single digit. E.g. "a01 or a10"' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "imageFile", value: "Thumbnail Image", required: true }),
          /* @__PURE__ */ jsx(FileInput, { name: "imageFile", id: "imageFile", className: "", handleChange: handleFileChange, required: true, accept: "image/png" })
        ] }),
        /* @__PURE__ */ jsx("img", { className: "w-60", src: data.imageFile ? URL.createObjectURL(data.imageFile) : "" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Video Information" }),
      /* @__PURE__ */ jsxs("table", { children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "External URL" }),
          /* @__PURE__ */ jsx("th", { children: "Title" }),
          /* @__PURE__ */ jsx("th", { children: "Duration" }),
          /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => dispatch({ type: "addValue" }), className: "before:content-['+'] before:pr-1 before:text-lg bg-green-200", children: "Add Row" }) })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: videoState.map(({ videoTitle, externalUrl, duration }, idx) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "externalUrl",
              id: `externalUrl${idx}`,
              value: externalUrl,
              className: "",
              handleChange: (e) => handleComplexChange(idx, e)
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "videoTitle",
              id: `videoTitle${idx}`,
              value: videoTitle,
              className: "",
              handleChange: (e) => handleComplexChange(idx, e)
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "duration",
              id: `duration${idx}`,
              value: duration,
              className: "",
              handleChange: (e) => handleComplexChange(idx, e)
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            SecondaryButton,
            {
              onClick: () => dispatch({
                type: "removeValue",
                idx
              }),
              className: "bg-red-200 before:content-['-'] before:pr-1 before:text-lg",
              children: "Remove Row"
            }
          ) })
        ] }, "contenttable" + idx)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex justify-center w-full gap-2 mt-5 md:justify-end", children: [
        /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: route("assembly.admin"), children: "Cancel" }),
        /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", className: "w-60", processing, children: "Create" })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$2
}, Symbol.toStringTag, { value: "Module" }));
function Edit$2({ videoData }) {
  const initialState = videoData.content;
  const blankState = [{
    title: "",
    externalUrl: "",
    duration: "",
    id: ""
  }];
  const reducer = (state, action) => {
    if (action.type === "changeValue" && "name" in action) {
      let returnObj = [...state];
      returnObj[action.idx][action.name] = action.value + "";
      return returnObj;
    } else if (action.type === "addValue") {
      return [
        ...state,
        ...blankState
      ];
    } else if (action.type === "removeValue" && "idx" in action) {
      if (state.length === 1) {
        return blankState;
      }
      let returnObj = [...state];
      returnObj.splice(action.idx, 1);
      return returnObj;
    } else {
      return state;
    }
  };
  const [videoState, dispatch] = useReducer(reducer, initialState);
  const { errors } = usePage().props;
  const { data, setData, post, reset, processing } = useForm({
    monthTitle: videoData.monthTitle,
    month: videoData.month,
    series: videoData.series,
    routename: videoData.routename,
    imageFile: videoData.imageFile,
    imageLink: videoData.imageLink,
    content: videoData.content
  });
  const handleChange = (event) => {
    switch (event.target.name) {
      case "monthTitle":
      case "month":
      case "series":
      case "routename":
        setData(event.target.name, event.target.value);
    }
  };
  const handleFileChange = (event) => {
    if (event.target.name === "imageFile" && event.target.files) {
      setData(event.target.name, event.target.files[0]);
    }
  };
  const handleComplexChange = (idx, event) => {
    if (event.target instanceof HTMLInputElement) {
      switch (event.target.name) {
        case "title":
        case "externalUrl":
        case "duration":
        case "id":
          dispatch({
            type: "changeValue",
            name: event.target.name,
            value: event.target.value,
            idx
          });
          break;
      }
    }
  };
  const handleRowChange = (action) => {
    dispatch(action);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    post(route("assembly.update", videoData.id));
  };
  useEffect(() => {
    reset();
  }, []);
  useEffect(() => {
    setData("content", [...videoState]);
  }, [videoState]);
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs(ContentWrapper, { title: "Edit Assembly", children: [
    errors && Object.keys(errors).map(
      (key) => /* @__PURE__ */ jsx(ToastBanner, { message: errors[key] }, key)
    ),
    /* @__PURE__ */ jsxs("form", { method: "post", onSubmit: handleSubmit, className: "flex flex-col items-start gap-4 px-10 py-5 border w-fit", children: [
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Basic Information" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "monthTitle", value: "Title", required: true }),
          /* @__PURE__ */ jsx(TextInput, { type: "text", name: "monthTitle", id: "monthTitle", value: data.monthTitle, className: "", handleChange, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "month", value: "Month", required: true }),
          /* @__PURE__ */ jsx(TextInput, { type: "text", name: "month", id: "month", value: data.month, className: "", handleChange, required: true }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: '//Full month name. E.g. "January"' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-end gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "series", value: "series", required: true }),
          /* @__PURE__ */ jsx("input", { type: "text", name: "series", id: "series", value: data.series, className: "border-gray-400 bg-clip-padding bg-neutral-100 text-neutral-500 rounded-md shadow-sm transition ease-in-out self-center", disabled: true }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "//Should not be changed as it will break the association. Create a new assembly if you need to change it." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-end gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "routename", value: "routename", required: true }),
          /* @__PURE__ */ jsx("input", { type: "text", name: "routename", id: "routename", value: data.routename, className: "border-gray-400 bg-clip-padding bg-neutral-100 text-neutral-500 rounded-md shadow-sm transition ease-in-out self-center", required: true, disabled: true }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "//Should not be changed as it will break the association. Create a new assembly if you need to change it." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "imageFile", value: "Thumbnail Image" }),
          /* @__PURE__ */ jsx(FileInput, { name: "imageFile", id: "imageFile", className: "", handleChange: handleFileChange, accept: "image/png" })
        ] }),
        /* @__PURE__ */ jsx("img", { className: "w-60", src: data.imageFile ? URL.createObjectURL(data.imageFile) : data.imageLink })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Video Information" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Change the ID number to change order of video. Be careful of the maximum number of videos" }),
      /* @__PURE__ */ jsxs("table", { children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "ID" }),
          /* @__PURE__ */ jsx("th", { children: "External URL" }),
          /* @__PURE__ */ jsx("th", { children: "Title" }),
          /* @__PURE__ */ jsx("th", { children: "Duration" }),
          /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => handleRowChange({ type: "addValue" }), className: "before:content-['+'] before:pr-1 before:text-lg bg-green-200", children: "Add Row" }) })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: videoState.map(({ title, externalUrl, duration, id }, idx) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "id",
              id: `id${idx}`,
              value: id,
              className: "",
              handleChange: (e) => handleComplexChange(idx, e),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "externalUrl",
              id: `externalUrl${idx}`,
              value: externalUrl,
              className: "",
              handleChange: (e) => handleComplexChange(idx, e),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "title",
              id: `title${idx}`,
              value: title,
              className: "",
              handleChange: (e) => handleComplexChange(idx, e),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "duration",
              id: `duration${idx}`,
              value: duration,
              className: "",
              handleChange: (e) => handleComplexChange(idx, e)
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            SecondaryButton,
            {
              onClick: () => handleRowChange({
                type: "removeValue",
                idx
              }),
              className: "bg-red-200 before:content-['-'] before:pr-1 before:text-lg",
              children: "Remove Row"
            }
          ) })
        ] }, "contenttable" + idx)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex justify-center w-full gap-2 mt-5 md:justify-end", children: [
        /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: route("assembly.admin"), children: "Cancel" }),
        /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", className: "w-60", processing, children: "Update" })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$2
}, Symbol.toStringTag, { value: "Module" }));
const PlaceholderImage$1 = "/build/assets/assembly-sample-4f37c86a.jpg";
function VideoHeroCard({ title, series, buttonLink, idx, imageLink }) {
  return /* @__PURE__ */ jsx("div", { className: "flex-none", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex flex-col items-center gap-2 p-2 py-4 overflow-hidden text-gray-700 rounded-lg md:p-4 drop-shadow-lg min-h-content w-fit bg-stone-100", children: [
    /* @__PURE__ */ jsx("img", { src: imageLink ? "/assembly/image/" + imageLink : PlaceholderImage$1, alt: "Assembly thumbnail " + idx, className: "object-cover object-center h-64 md:h-96 w-full rounded aspect-[4/3]" }),
    /* @__PURE__ */ jsx("p", { className: "text-base font-bold text-blue-700 md:text-lg", children: series + " - " + title }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-between text-sm", children: /* @__PURE__ */ jsx(ButtonLink, { href: buttonLink, children: "View in Browser" }) })
  ] }) });
}
function Index$4({ videoList, canViewGallery = false, canEdit = false }) {
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsxs(WrapperLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "School Assembly" }),
    /* @__PURE__ */ jsxs("section", { className: "flex flex-col items-center px-10 md:mb-10 sm:px-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-5 md:max-w-4xl", children: [
        /* @__PURE__ */ jsx(Heading1Alt, { children: "School Assembly Videos" }),
        canEdit && /* @__PURE__ */ jsx("div", { className: "flex justify-end w-full mb-5", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2 rounded-md", children: [
          /* @__PURE__ */ jsx(ButtonLink, { href: route("assembly.admin"), children: "Admin Panel" }),
          /* @__PURE__ */ jsx(ButtonLink, { href: route("assembly.create"), children: "Add New Video" })
        ] }) }),
        /* @__PURE__ */ jsx(Paragraph, { children: "You will find additional video content for the year 2023/2024 down below. These videos will parallel the BibleTime lessons students are doing for each month of the coming school year. We hope you will find these additional videos helpful." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto", children: /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-4 md:gap-2 md:flex-row", children: getLastElementsOfArray(sortArrayById(videoList), 2).map((value, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(VideoHeroCard, { buttonLink: route("assembly.show", { "series": value.routename }), title: value.monthTitle && value.monthTitle !== "" ? value.monthTitle : value.month, series: value.series, imageLink: value.routename, idx: value.id }) }, index)) }) })
    ] }),
    auth && auth.user && canViewGallery && /* @__PURE__ */ jsx(GalleryAssembly, { videoList: sortArrayById(videoList) })
  ] });
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$4
}, Symbol.toStringTag, { value: "Module" }));
function Loader() {
  return /* @__PURE__ */ jsxs("div", { className: "flex pointer-events-none", children: [
    /* @__PURE__ */ jsx("p", { className: "w-[25px] h-[25px] rounded-full border-4 border-slate-300 border-r-sky-500 animate-spin" }),
    /* @__PURE__ */ jsx("p", { className: "ml-5 text-gray-400", children: "Loading..." })
  ] });
}
function VideoNavButton({ disabled = false, onClick, className = "", children }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "disabled:text-gray-400 hover:text-blue-500 hover:scale-110 md:hover:scale-125 focus:text-blue-500 active:text-blue-500 transition-[transform,color] z-10 " + className,
      disabled,
      onClick,
      children
    }
  );
}
function VideoCarousalCard({ title, duration, onClick, active = false, total, imageLink, idx }) {
  return /* @__PURE__ */ jsx("div", { className: "flex-none snap-center", children: /* @__PURE__ */ jsxs("button", { onClick, className: "inline-flex flex-col items-center gap-2 p-2 md:p-4 overflow-hidden rounded-lg drop-shadow-lg " + (active ? "bg-pbsblue text-slate-50" : "bg-stone-100 text-gray-600"), children: [
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("img", { src: imageLink, alt: "Video " + idx, className: "block object-cover h-20 md:h-32 w-full rounded aspect-[4/3]" }) }),
    /* @__PURE__ */ jsx("p", { className: "text-base md:text-xl font-bold " + (active ? "text-slate-50" : "text-blue-700"), children: title === "" ? `Title ${idx}` : title }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between w-full text-sm", children: [
      /* @__PURE__ */ jsx("p", { children: duration }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold", children: idx + 1 }),
        /* @__PURE__ */ jsx("p", { children: `${total ? "/" + total : ""}` })
      ] })
    ] })
  ] }) });
}
function ChevronLeft({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: className === "" ? "w-6 h-6" : className, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z", clipRule: "evenodd" }) });
}
function ChevronRight({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: className === "" ? "w-6 h-6" : className, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z", clipRule: "evenodd" }) });
}
function Heading2Alt$1({ className = "", children }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("h2", { className: `leading-tight uppercase text-blue-900 text-2xl md:text-3xl font-bold ${className}`, children }) });
}
function Heading3$1({ className = "", children }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("h3", { className: `leading-tight capitalize text-blue-800 text-2xl font-bold mb-2 mt-0 ${className}`, children }) });
}
function VideoPlayerComponent({ title, imageLink, content }) {
  const [videoLinks, setVideoLinks] = useState(content || []);
  const frameRef = useRef(null);
  useEffect(() => {
    if (content) {
      setVideoLinks(content);
    }
  }, [content]);
  const scrollListToView = (id) => {
    if (frameRef.current) {
      frameRef.current.scroll({
        top: 0,
        left: id * Math.floor(frameRef.current.scrollWidth / videoLinks.length) - 80,
        behavior: "smooth"
      });
    }
  };
  const initialState = {
    externalUrl: "",
    title: "",
    duration: "",
    isLoading: false,
    id: -1
  };
  const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "loadComplete":
        return { ...state, isLoading: false };
      case "setVideo":
        return { ...state, ...payload };
      case "nextVideo":
        const nextVideo = videoLinks[(state.id + 1) % videoLinks.length];
        return { ...state, isLoading: true, externalUrl: nextVideo == null ? void 0 : nextVideo.externalUrl, duration: nextVideo == null ? void 0 : nextVideo.duration, id: nextVideo == null ? void 0 : nextVideo.id, title: nextVideo == null ? void 0 : nextVideo.title };
      case "prevVideo":
        let prevIndex = state.id - 1;
        if (prevIndex < 0) {
          prevIndex = state.id;
        }
        const prevVideo = videoLinks[prevIndex];
        return { ...state, isLoading: true, externalUrl: prevVideo.externalUrl, duration: prevVideo.duration, id: prevVideo.id, title: prevVideo.title };
      default:
        return state;
    }
  };
  const [videoState, dispatchReducer] = useReducer(reducer, initialState);
  useEffect(() => {
    var _a, _b, _c;
    dispatchReducer({
      type: "setVideo",
      payload: {
        externalUrl: (_a = videoLinks[0]) == null ? void 0 : _a.externalUrl,
        title: (_b = videoLinks[0]) == null ? void 0 : _b.title,
        duration: (_c = videoLinks[0]) == null ? void 0 : _c.duration,
        isLoading: false,
        id: 0
      }
    });
  }, []);
  const loadNewLink = ({ externalUrl, title: title2, duration, id }) => {
    scrollListToView(id);
    if (externalUrl !== videoState.externalUrl) {
      dispatchReducer({
        type: "setVideo",
        payload: {
          externalUrl,
          isLoading: true,
          title: title2,
          duration,
          id
        }
      });
    }
  };
  const handleClickEvent = (type, id) => {
    scrollListToView(id);
    switch (type) {
      case "prev":
        return () => dispatchReducer({
          type: "prevVideo"
        });
      case "next":
        return () => dispatchReducer({
          type: "nextVideo"
        });
      default:
        return;
    }
  };
  const isCarousalActive = () => {
    return videoLinks.length > 1;
  };
  return videoLinks.length > 0 ? /* @__PURE__ */ jsxs("section", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "relative justify-center py-5 mx-2 md:mx-auto md:max-w-4xl", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center w-full gap-2", children: [
      /* @__PURE__ */ jsx(Heading2Alt$1, { children: title }),
      /* @__PURE__ */ jsx("div", { className: "self-start", children: /* @__PURE__ */ jsx(Heading3$1, { children: videoState.isLoading ? /* @__PURE__ */ jsx("p", { children: "…" }) : videoState.title }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative self-stretch md:self-center", children: [
        videoState.isLoading ? /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 mb-5 text-2xl right-5", children: /* @__PURE__ */ jsx(Loader, {}) }) : null,
        /* @__PURE__ */ jsx("iframe", { title: videoState.title, onLoad: () => dispatchReducer({ type: "loadComplete" }), src: videoState.externalUrl, height: "506", width: "900", allowFullScreen: true, allow: "autoplay", className: "aspect-video w-full h-auto md:w-[900px]" })
      ] }),
      isCarousalActive() && /* @__PURE__ */ jsxs("div", { className: "flex gap-10", children: [
        /* @__PURE__ */ jsx(
          VideoNavButton,
          {
            className: "md:float-left",
            disabled: videoState.id === 0,
            onClick: handleClickEvent("prev", videoState.id),
            children: /* @__PURE__ */ jsxs("p", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5 md:w-10 md:h-10" }),
              "Previous"
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          VideoNavButton,
          {
            className: "md:float-right",
            disabled: videoState.id === videoLinks.length - 1,
            onClick: handleClickEvent("next", videoState.id),
            children: /* @__PURE__ */ jsxs("p", { className: "flex items-center", children: [
              "Next",
              /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 md:w-10 md:h-10" })
            ] })
          }
        )
      ] })
    ] }) }),
    isCarousalActive() && /* @__PURE__ */ jsx("div", { className: "w-full px-2 mx-auto md:px-20 xl:px-40", children: /* @__PURE__ */ jsx("div", { ref: frameRef, id: "carousel-cards", className: "flex gap-5 p-2 overflow-x-auto bg-slate-50 justify-items-center", children: videoLinks.map(({ title: title2, duration, externalUrl }, idx) => /* @__PURE__ */ jsx(
      VideoCarousalCard,
      {
        active: videoState.id === idx,
        total: videoLinks.length,
        title: title2,
        duration,
        imageLink,
        idx,
        onClick: () => loadNewLink({ externalUrl, title: title2, duration, id: idx })
      },
      idx
    )) }) })
  ] }) : null;
}
function Show$2({ videoData }) {
  return /* @__PURE__ */ jsxs(WrapperLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "School Assembly" }),
    /* @__PURE__ */ jsx(VideoPlayerComponent, { title: videoData.title, imageLink: "/assembly/image/" + videoData.imageId, content: videoData.content }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center w-full px-5 mt-5 md:mt-10 md:px-10", children: /* @__PURE__ */ jsx(Link, { href: route("assembly.index"), children: /* @__PURE__ */ jsx(SecondaryButton, { children: "Go Back to Assembly Gallery" }) }) })
  ] });
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Show$2
}, Symbol.toStringTag, { value: "Module" }));
function ButtonPill({ onPress, addClass, isActive, setActive = {}, idx, children }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("button", { role: "button", onClick: () => {
    onPress();
    return typeof setActive === "function" ? setActive(idx) : null;
  }, className: `${isActive ? "bg-blue-500 text-gray-50" : "bg-stone-200 hover:bg-stone-300 text-gray-600"} rounded-md p-2 ${addClass}`, children }) });
}
function Download({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" }) });
}
function LessonDownloadButton({ title, infoText, infoSubText = "", infoClass = "bg-pbsblue", downloadLink = "" }) {
  const isLinkEnabled = () => {
    return downloadLink && downloadLink !== "" && downloadLink !== "#";
  };
  const getButtonColorClass = () => {
    if (isLinkEnabled())
      return `hover:${infoClass} bg-stone-200 font-bold text-slate-700 hover:text-slate-50`;
    else
      return `bg-stone-200 text-gray-500 cursor-default`;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    infoText && /* @__PURE__ */ jsx("div", { tabIndex: -1, "aria-disabled": !isLinkEnabled(), className: `block h-fit w-full ${getButtonColorClass()} rounded-md`, children: /* @__PURE__ */ jsxs("a", { className: "flex flex-row items-center", href: downloadLink, target: "_blank", onClick: (event) => !isLinkEnabled() ? event.preventDefault() : null, children: [
      /* @__PURE__ */ jsxs("div", { className: `basis-1/3 ${infoClass} text-white text-center rounded p-1 ${infoSubText === "" ? "py-3" : ""}`, children: [
        /* @__PURE__ */ jsx("div", { className: "font-bold", children: infoText }),
        infoSubText !== "" && /* @__PURE__ */ jsx("div", { className: "text-xs font-light md:text-sm", children: infoSubText })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "px-4 text-center basis-2/3", children: title }),
      isLinkEnabled() && /* @__PURE__ */ jsx("div", { className: "px-3 ml-auto shrink", children: /* @__PURE__ */ jsx(Download, {}) })
    ] }) }),
    !infoText && /* @__PURE__ */ jsx("div", { tabIndex: -1, "aria-disabled": !isLinkEnabled(), className: `block h-fit w-full ${getButtonColorClass()} rounded`, children: /* @__PURE__ */ jsxs("a", { className: "flex flex-row items-center py-2", href: downloadLink, target: "_blank", onClick: (event) => !isLinkEnabled() ? event.preventDefault() : null, children: [
      /* @__PURE__ */ jsx("div", { className: "px-4 text-center grow", children: title }),
      isLinkEnabled() && /* @__PURE__ */ jsx("div", { className: "hidden px-3 ml-auto md:block", children: /* @__PURE__ */ jsx(Download, {}) })
    ] }) })
  ] });
}
function RedirectButtonWithPill({ title, pillText, pillClass = "bg-pbsblue", downloadLink = "", imageLink }) {
  const isLinkEnabled = () => {
    return downloadLink && downloadLink !== "" && downloadLink !== "#";
  };
  const getButtonColorClass = () => {
    if (isLinkEnabled())
      return `hover:bg-blue-600 bg-stone-200 font-bold text-slate-700 hover:text-slate-50`;
    else
      return `bg-stone-200 text-gray-500`;
  };
  return /* @__PURE__ */ jsx(Fragment, { children: pillText && /* @__PURE__ */ jsxs("a", { className: `${isLinkEnabled() ? "cursor-pointer" : "cursor-not-allowed"} block`, href: downloadLink, onClick: (event) => !isLinkEnabled() ? event.preventDefault() : null, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex flex-row items-center h-fit w-full ${getButtonColorClass()} rounded-md`, children: [
      /* @__PURE__ */ jsx("div", { className: `basis-1/3 ${pillClass} text-white font-bold text-center rounded p-2 py-3`, children: pillText }),
      /* @__PURE__ */ jsx("div", { className: "px-4 text-center basis-2/3", children: title.trim() }),
      isLinkEnabled() && /* @__PURE__ */ jsx("div", { className: "px-3 ml-auto shrink", children: /* @__PURE__ */ jsx(ChevronRight, {}) })
    ] }),
    imageLink && imageLink !== "" && /* @__PURE__ */ jsx("img", { className: "float-right object-cover object-left w-2/3 h-auto mt-px rounded-lg aspect-video ", src: "/assembly/image/" + imageLink, alt: imageLink + " assembly image thumbnail" })
  ] }) });
}
const monthLessons = bibleTimeLevels;
function LessonSelectorList({ selectedMonth, selectedSeriesAlphabet, assemblyTitle = "", assemblyLink = "", assemblySeries = "", assemblyImageLink = "" }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center px-2 md:px-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsx(Heading3$1, { children: "Bible Time Lessons" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: monthLessons.map((lesson, index) => /* @__PURE__ */ jsx(LessonDownloadButton, { downloadLink: getDownloadLink(selectedSeriesAlphabet, lesson.tagCode, selectedMonth), title: `${selectedSeriesAlphabet}${selectedMonth + 1} - ${monthNames[selectedMonth]}`, infoSubText: lesson.tagSubText, infoText: lesson.tagName, infoClass: lesson.tagColor }, index)) })
    ] }),
    assemblyTitle && assemblyTitle !== "" ? /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
      /* @__PURE__ */ jsx(Heading3$1, { children: "School Assembly Video" }),
      /* @__PURE__ */ jsx(RedirectButtonWithPill, { title: `${assemblySeries} ${assemblyTitle}`, pillText: "Latest Video", pillClass: "bg-blue-500", downloadLink: assemblyLink, imageLink: assemblyImageLink })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
      /* @__PURE__ */ jsx(Heading3$1, { children: "School Assembly Video" }),
      /* @__PURE__ */ jsx(RedirectButtonWithPill, { title: "Go to Assembly Videos", pillText: "Online Presentation", pillClass: "bg-blue-500", downloadLink: route("assembly.index") })
    ] })
  ] });
}
function LessonSelectorComponent() {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthNumber());
  const [selectedSeries, setSelectedSeries] = useState(getCurrentSeriesNumber());
  const [processing, setProcessing] = useState(false);
  const delayMonthlyOverview = function() {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
    }, 250);
  };
  return /* @__PURE__ */ jsx("section", { className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-rows-2 gap-5 px-2 pt-10 bg-white rounded-lg md:px-8 h-92 md:grid-rows-none md:grid-cols-2 md:pb-10 lg:px-20 lg:mx-24 lg:my-2 drop-shadow-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl italic font-thin text-blue-800 uppercase", children: "Individual month's lessons" }),
      /* @__PURE__ */ jsx("h2", { className: "text-blue-800 uppercase", children: "Select Month" }),
      /* @__PURE__ */ jsx("div", { role: "list", className: "grid grid-cols-3 grid-rows-4 gap-2 px-5 py-4 md:px-10 justify-items-stretch", children: monthNames.map((month, index) => /* @__PURE__ */ jsx(ButtonPill, { onPress: delayMonthlyOverview, isActive: selectedMonth === index, setActive: setSelectedMonth, idx: index, addClass: `w-full py-8`, children: month }, month)) }),
      /* @__PURE__ */ jsx("h2", { className: "text-blue-800 uppercase", children: "Select Series" }),
      /* @__PURE__ */ jsx("div", { role: "list", className: "grid grid-cols-3 gap-2 px-5 py-4 md:px-16", children: seriesNames.map((seriesElement, index) => /* @__PURE__ */ jsx(ButtonPill, { onPress: delayMonthlyOverview, isActive: selectedSeries === index, setActive: setSelectedSeries, idx: index, addClass: `w-full py-1`, children: seriesElement.name }, seriesElement.code)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col my-auto", children: selectedMonth === -1 || selectedSeries === -1 ? /* @__PURE__ */ jsx("div", { className: "p-20 my-auto text-3xl text-left text-gray-600", children: /* @__PURE__ */ jsx("p", { children: "Select a month and series to see the available download links here." }) }) : !!processing ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-20 my-auto text-3xl text-left text-gray-600 space-around", children: /* @__PURE__ */ jsx(Loader, {}) }) : /* @__PURE__ */ jsx(LessonSelectorList, { selectedMonth, selectedSeriesAlphabet: getUpperCaseAlphabetFromNumber(selectedSeries) }) })
  ] }) });
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LessonSelectorComponent
}, Symbol.toStringTag, { value: "Module" }));
function TagGroupPill$1({ addClass, children }) {
  return /* @__PURE__ */ jsx("div", { className: `capitalize whitespace-nowrap text-white rounded-md p-2 hover:bg-gradient-to-r hover:from-black/10 hover:to-black/10 active:bg-gradient-to-r active:to-white/10 ${addClass}`, children });
}
function LessonCard({ heading, image, description, type = "bibletime", selectedLevel, setSelectedLevel, isWideScreen, tagCode }) {
  const currentLevel = groupThemes[type].filter((tag) => tag.tagCode.toLowerCase() === tagCode.toLowerCase())[0];
  return /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col items-center w-auto h-full p-2 py-6 rounded-md md:mb-4 md:mx-2 drop-shadow-lg " + (selectedLevel.tagCode === tagCode ? "md:bg-stone-200" : "bg-stone-100"), children: [
    isWideScreen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("img", { className: "object-fill mx-10 border border-black w-44", src: image, alt: `${heading} image` }),
      /* @__PURE__ */ jsx("div", { className: "p-4 pb-8 leading-loose text-center text-gray-700 text-md", children: description })
    ] }),
    /* @__PURE__ */ jsx("button", { onClick: () => setSelectedLevel(currentLevel), className: "absolute bottom-0 w-full text-center", children: /* @__PURE__ */ jsx(TagGroupPill$1, { addClass: `font-bold text-base ${currentLevel.tagClass}`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row", children: [
      /* @__PURE__ */ jsx("p", { className: "grow", children: currentLevel.tagName }),
      /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 ml-auto", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "3", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4.5v15m7.5-7.5h-15" }) })
    ] }) }) })
  ] });
}
function LessonDownloadList({ tagClass = "bg-bibletime-pink", tagCode = "level0", isWideScreen = false, type = "bibletime" }) {
  const [gridCols, setGridCols] = useState("");
  const getSeries = () => {
    switch (type) {
      case "gleaners":
        return gleanersSeriesNames;
      case "goingdeeper":
        return goingDeeperSeriesNames;
      default:
        return seriesNames;
    }
  };
  const getActiveTagClass = (seriesElement) => {
    return seriesElement.tagClass === "" ? tagClass : seriesElement.tagClass;
  };
  useEffect(() => {
    if (type === "gleaners") {
      setGridCols("grid-cols-5");
    } else {
      setGridCols("grid-cols-3");
    }
  }, []);
  return /* @__PURE__ */ jsx("div", { className: `grid ${gridCols} gap-1`, children: getSeries().map((seriesElement, index) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ jsx("div", { className: `text-center h-fit w-full text-gray-50 ${getActiveTagClass(seriesElement)} p-2 mb-2 rounded`, children: seriesElement.name }),
    monthNames.map((month, index2) => /* @__PURE__ */ jsx(LessonDownloadButton, { downloadLink: getDownloadLink(seriesElement.code, tagCode, index2, type), infoClass: getActiveTagClass(seriesElement), title: `${seriesElement.code}${index2 + 1}${type !== "gleaners" && isWideScreen ? " - " + month : ""}` }, index2))
  ] }, index)) });
}
function LessonDownloadListSection({ heading, description, type }) {
  const [selectedLevel, setSelectedLevel] = useState({});
  const [isWideScreen, setIsWideScreen] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const onChange = () => setIsWideScreen(!!mql.matches);
    mql.addEventListener("change", onChange);
    setIsWideScreen(mql.matches);
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, []);
  useEffect(() => {
    if (type === "goingdeeper") {
      setSelectedLevel({
        tagCode: type,
        tagClass: "bg-bibletime-blue",
        tagName: "Going Deeper"
      });
    } else if (type === "gleaners") {
      setSelectedLevel({
        tagCode: type,
        tagClass: "bg-bibletime-red",
        tagName: "Gleaners"
      });
    }
  }, []);
  return /* @__PURE__ */ jsxs("section", { id: type, className: "px-10 my-20 sm:px-20", children: [
    /* @__PURE__ */ jsx(Heading2, { children: heading }),
    /* @__PURE__ */ jsx(ParagraphContainer, { children: description }),
    type === "bibletime" && /* @__PURE__ */ jsx("div", { className: "grid w-full grid-rows-5 mt-4 mb-8 md:grid-rows-1 md:grid-cols-5", children: bibleTimeLevels.map((level, index) => /* @__PURE__ */ jsx(LessonCard, { isWideScreen, selectedLevel, setSelectedLevel, heading: level.tagName, tagCode: level.tagCode, image: level.image, description: level.description, type }, index)) }),
    /* @__PURE__ */ jsx(LessonDownloadList, { isWideScreen, tagClass: selectedLevel.tagClass, tagCode: selectedLevel.tagCode, type })
  ] });
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LessonDownloadListSection
}, Symbol.toStringTag, { value: "Module" }));
function TagGroupPill({ addClass, children }) {
  return /* @__PURE__ */ jsx("div", { className: `capitalize whitespace-nowrap text-white text-sm rounded-md p-2 ${addClass}`, children });
}
function CourseCard({ heading, image, description, type = "bibletime", scrollTo, buttonText }) {
  const levelGroup = groupThemes[type];
  return /* @__PURE__ */ jsxs("div", { className: "grid content-between h-full grid-cols-1 p-6 rounded-md min-w-min bg-slate-100 drop-shadow-lg", children: [
    /* @__PURE__ */ jsx(Heading3$1, { children: heading }),
    /* @__PURE__ */ jsx("img", { className: "h-auto mx-auto w-52", src: image, alt: `${heading} image` }),
    /* @__PURE__ */ jsx("div", { className: "p-4 pb-0 text-sm leading-tight", children: description }),
    scrollTo ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-start content-start justify-center flex-auto gap-px mb-2", children: levelGroup.map((element, index) => /* @__PURE__ */ jsx(TagGroupPill, { addClass: element.tagClass, children: element.tagName }, index)) }),
      /* @__PURE__ */ jsx("button", { className: "w-full mt-2", children: /* @__PURE__ */ jsx(Link$1, { to: scrollTo, smooth: true, className: "flex justify-center py-2", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-gray-500", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 8.25l-7.5 7.5-7.5-7.5" }) }) }) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(ButtonLink, { Icon: ChevronRight, href: route("courses", { type }), children: buttonText ? buttonText : "More details" }) })
  ] });
}
function RequestLessonBanner() {
  return /* @__PURE__ */ jsx("div", { className: "bg-pbsblue max-w-screen", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center w-full gap-2 p-6 mx-auto md:gap-8 md:py-10 md:max-w-4xl", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xl font-semibold text-center text-white md:text-3xl", children: "Request a Lesson for your School or an Individual" }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-6 w-fit", children: [
      /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: route("request.group"), children: "School or Group" }),
      /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: route("request.individual"), children: "Individual or Family" })
    ] })
  ] }) });
}
function Index$3({ bibleTimeDownloads, goingDeeperDownloads, gleanersDownloads, queryParams }) {
  useEffect(() => {
    try {
      setAllBesLinks(bibleTimeDownloads, goingDeeperDownloads, gleanersDownloads);
    } catch (e) {
      console.warn("Global links variable tried to reset");
    }
  }, [bibleTimeDownloads, goingDeeperDownloads, gleanersDownloads]);
  useScrollTo((queryParams == null ? void 0 : queryParams.type) ?? "", {
    duration: 1e3,
    delay: 100,
    smooth: true
  });
  return /* @__PURE__ */ jsxs(WrapperLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Courses" }),
    /* @__PURE__ */ jsxs("section", { className: "py-12 mx-auto text-center shadow-sm sm:rounded-lg max-w-7xl sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx(Heading1$1, { children: "Courses" }),
      /* @__PURE__ */ jsx(ParagraphContainer, { children: /* @__PURE__ */ jsx(Paragraph, { className: "p-4 mt-0 mb-2 text-base font-regular", children: "Postal Bible School offers a wide range of FREE courses for people of all ages. The majority of our lessons are used by young peple. We currently have five grades (Level0, Level 1, Level 2, Level 3 and Level 4) available to young people. These grades cover basic Bible stories and major Bible characters. Each grade has a structured 3 year syllabus, and for each month there is a series of 4 lessons." }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3 md:flex-row", children: courseContent.map((course, index) => /* @__PURE__ */ jsx(CourseCard, { heading: course.heading, type: course.type, description: course.description, image: course.image, scrollTo: course.scrollTo }, index)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "py-12 mx-auto max-w-screen sm:px-10 bg-sky-100", children: /* @__PURE__ */ jsx(LessonSelectorComponent, {}) }),
    /* @__PURE__ */ jsx(RequestLessonBanner, {}),
    courseContent.map((course) => /* @__PURE__ */ jsx(LessonDownloadListSection, { heading: course.heading, description: course.longDescription ?? course.description, type: course.type }, course.type))
  ] });
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$3
}, Symbol.toStringTag, { value: "Module" }));
function ResourceCard({ Icon, title, href }) {
  return /* @__PURE__ */ jsx(Link, { className: "w-40 p-4 transition-colors duration-200 border border-gray-200 rounded-md shadow-md group/card hover:border-pbsblue hover:shadow-lg hover:bg-gray-50", href, children: /* @__PURE__ */ jsxs("article", { className: "flex flex-col items-start justify-start gap-1", children: [
    /* @__PURE__ */ jsx("span", { role: "icon", className: "p-2 mt-8 border rounded-full group-hover/card:bg-white", children: /* @__PURE__ */ jsx(Icon, { className: "w-8 transition-colors duration-200 group-hover/card:text-pbsblue" }) }),
    /* @__PURE__ */ jsx("h1", { className: "font-bold text-left uppercase", children: title })
  ] }) });
}
function Group({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" }) });
}
function School({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" }) });
}
function Video({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" }) });
}
function Dashboard() {
  usePage().props;
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsx(ContentWrapper, { title: "The Hub", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
    /* @__PURE__ */ jsx(Heading2, { children: "Resources" }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsx(ResourceCard, { Icon: Group, href: route("assembly.index"), title: "Assembly Videos" }),
      /* @__PURE__ */ jsx(ResourceCard, { Icon: Video, href: route("assembly.bonus.index"), title: "Bonus Videos" }),
      /* @__PURE__ */ jsx(ResourceCard, { Icon: School, href: route("orders.index"), title: "Monthly Orders" })
    ] })
  ] }) }) });
}
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
function BasicTable({ tableData }) {
  return /* @__PURE__ */ jsx("table", { className: "text-base text-left table-fixed md:text-lg md:w-1/2", children: /* @__PURE__ */ jsx("tbody", { children: tableData.map((row, index) => /* @__PURE__ */ jsxs("tr", { className: "border-gray-300 border-y-2", children: [
    /* @__PURE__ */ jsx("th", { className: "w-1/4 p-4 text-base uppercase ", children: row.heading }),
    /* @__PURE__ */ jsx("td", { className: "p-4", children: row.content })
  ] }, index)) }) });
}
function Banknotes({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" }) });
}
function Calendar({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" }) });
}
function ChatBubble({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" }) });
}
function CheckBadge({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" }) });
}
function Clock({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" }) });
}
function CloseSolid({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z", clipRule: "evenodd" }) });
}
function Envelope({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" }) });
}
function File({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V10.5Z", clipRule: "evenodd" }) });
}
function Location({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: [
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" }),
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" })
  ] });
}
function MinusCircle({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" }) });
}
function Newspaper({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" }) });
}
function Phone({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" }) });
}
function Play({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z", clipRule: "evenodd" }) });
}
function PlusSolid({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z", clipRule: "evenodd" }) });
}
function ChevronDown({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" }) });
}
function IconSection() {
  const getIconTableData = () => {
    return [
      {
        heading: /* @__PURE__ */ jsx(Banknotes, {}),
        content: "Banknotes"
      },
      {
        heading: /* @__PURE__ */ jsx(Calendar, {}),
        content: "Calendar"
      },
      {
        heading: /* @__PURE__ */ jsx(CaratDown, {}),
        content: "CaratDown"
      },
      {
        heading: /* @__PURE__ */ jsx(ChatBubble, {}),
        content: "ChatBubble"
      },
      {
        heading: /* @__PURE__ */ jsx(CheckBadge, {}),
        content: "CheckBadge"
      },
      {
        heading: /* @__PURE__ */ jsx(ChevronDown, {}),
        content: "ChevronDown"
      },
      {
        heading: /* @__PURE__ */ jsx(ChevronLeft, {}),
        content: "ChevronLeft"
      },
      {
        heading: /* @__PURE__ */ jsx(ChevronRight, {}),
        content: "ChevronRight"
      },
      {
        heading: /* @__PURE__ */ jsx(Clock, {}),
        content: "Clock"
      },
      {
        heading: /* @__PURE__ */ jsx(CloseSolid, {}),
        content: "CloseSolid"
      },
      {
        heading: /* @__PURE__ */ jsx(CloseX, {}),
        content: "CloseX"
      },
      {
        heading: /* @__PURE__ */ jsx(Trash, {}),
        content: "Trash"
      },
      {
        heading: /* @__PURE__ */ jsx(Download, {}),
        content: "Download"
      },
      {
        heading: /* @__PURE__ */ jsx(EditIcon, {}),
        content: "Edit"
      },
      {
        heading: /* @__PURE__ */ jsx(Envelope, {}),
        content: "Envelope"
      },
      {
        heading: /* @__PURE__ */ jsx(ExternalLink, {}),
        content: "ExternalLink"
      },
      {
        heading: /* @__PURE__ */ jsx(Eye, {}),
        content: "Eye"
      },
      {
        heading: /* @__PURE__ */ jsx(File, {}),
        content: "File"
      },
      {
        heading: /* @__PURE__ */ jsx(Group, {}),
        content: "Group"
      },
      {
        heading: /* @__PURE__ */ jsx(Location, {}),
        content: "Location"
      },
      {
        heading: /* @__PURE__ */ jsx(MinusCircle, {}),
        content: "MinusCircle"
      },
      {
        heading: /* @__PURE__ */ jsx(Newspaper, {}),
        content: "Newspaper"
      },
      {
        heading: /* @__PURE__ */ jsx(Phone, {}),
        content: "Phone"
      },
      {
        heading: /* @__PURE__ */ jsx(Play, {}),
        content: "PlayIcon"
      },
      {
        heading: /* @__PURE__ */ jsx(PlusSolid, {}),
        content: "PlusSolid"
      },
      {
        heading: /* @__PURE__ */ jsx(School, {}),
        content: "SchoolIcon"
      },
      {
        heading: /* @__PURE__ */ jsx(Video, {}),
        content: "VideoCamera"
      }
    ];
  };
  return /* @__PURE__ */ jsx("section", { className: "text-green-900 md:max-w-3xl", children: /* @__PURE__ */ jsxs("details", { className: "group", children: [
    /* @__PURE__ */ jsxs("summary", { className: "relative p-4 list-none bg-gray-200 cursor-pointer", children: [
      /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold ", children: "Icons" }),
      /* @__PURE__ */ jsx("span", { className: "absolute pt-1 right-5", children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-6 h-6 transition-transform duration-200 group-open:rotate-180" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-black", children: /* @__PURE__ */ jsx(BasicTable, { tableData: getIconTableData() }) })
  ] }) });
}
const Header1 = ({ children }) => {
  return /* @__PURE__ */ jsx("h1", { className: "mt-6 text-2xl font-bold first:mt-0", children });
};
const Header2 = ({ children }) => {
  return /* @__PURE__ */ jsx("h2", { className: "my-2 text-lg font-bold ", children });
};
function TitleBlock({ title, subtitle = "" }) {
  return /* @__PURE__ */ jsxs("header", { className: "w-full p-6 text-left bg-gray-100 md:p-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "mt-2 mb-4 text-3xl font-bold leading-snug text-blue-800 uppercase md:text-4xl font-title", children: title }),
    subtitle && /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl", children: subtitle })
  ] });
}
function DocumentationLayout({ title, subtitle, children }) {
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[1fr_4fr]", children: [
    /* @__PURE__ */ jsx("nav", {}),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Head, { title }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx(TitleBlock, { title, subtitle }),
        /* @__PURE__ */ jsx("div", { className: "px-4 py-12 sm:px-6 lg:px-12", children })
      ] })
    ] })
  ] }) });
}
function DesignSystem() {
  return /* @__PURE__ */ jsx(DocumentationLayout, { title: "Design System", subtitle: "Documentation of the design system for postalbibleschool.ie", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 md:gap-12", children: [
    /* @__PURE__ */ jsxs("section", { className: "text-blue-900", children: [
      /* @__PURE__ */ jsx(Header1, { children: "Basic Buttons" }),
      /* @__PURE__ */ jsx(Header2, { children: "Differing Hierarchy and Sizes" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(BasicButton, { size: "large", hierarchy: "primary", children: "Primary button" }),
        /* @__PURE__ */ jsx(BasicButton, { size: "large", hierarchy: "secondary", children: "Secondary button" }),
        /* @__PURE__ */ jsx(BasicButton, { size: "large", hierarchy: "tertiary", children: "Tertiary button" }),
        /* @__PURE__ */ jsx(BasicButton, { size: "large", hierarchy: "transparent", children: "Transparent button" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(BasicButton, { size: "medium", hierarchy: "primary", children: "Primary button" }),
        /* @__PURE__ */ jsx(BasicButton, { size: "medium", hierarchy: "secondary", children: "Secondary button" }),
        /* @__PURE__ */ jsx(BasicButton, { size: "medium", hierarchy: "tertiary", children: "Tertiary button" }),
        /* @__PURE__ */ jsx(BasicButton, { size: "medium", hierarchy: "transparent", children: "Transparent button" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(BasicButton, { size: "small", hierarchy: "primary", children: "Primary button" }),
        /* @__PURE__ */ jsx(BasicButton, { size: "small", hierarchy: "secondary", children: "Secondary button" }),
        /* @__PURE__ */ jsx(BasicButton, { size: "small", hierarchy: "tertiary", children: "Tertiary button" }),
        /* @__PURE__ */ jsx(BasicButton, { size: "small", hierarchy: "transparent", children: "Transparent button" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(BasicButton, { size: "xsmall", hierarchy: "primary", children: "Primary button" }),
        /* @__PURE__ */ jsx(BasicButton, { size: "xsmall", hierarchy: "secondary", children: "Secondary button" }),
        /* @__PURE__ */ jsx(BasicButton, { size: "xsmall", hierarchy: "tertiary", children: "Tertiary button" }),
        /* @__PURE__ */ jsx(BasicButton, { size: "xsmall", hierarchy: "transparent", children: "Transparent button" })
      ] }),
      /* @__PURE__ */ jsx(Header1, { children: "Links as buttons" }),
      /* @__PURE__ */ jsx(Header2, { children: "Basic" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(ButtonAnchor, { href: "#", children: "Anchor button" }),
        /* @__PURE__ */ jsx(ButtonLink, { href: "#", children: "Link button" })
      ] }),
      /* @__PURE__ */ jsx(Header2, { children: "With Icons" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(ButtonAnchor, { Icon: ExternalLink, href: "#", children: "Anchor button" }),
        /* @__PURE__ */ jsx(ButtonLink, { Icon: ChevronRight, href: "#", children: "Link button" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(IconSection, {})
  ] }) });
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DesignSystem
}, Symbol.toStringTag, { value: "Module" }));
function EventWrapper({ title, heading, className = "", children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Events - ${title}` }),
    /* @__PURE__ */ jsxs("section", { className: "py-12 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 " + className, children: [
      /* @__PURE__ */ jsx(Heading1$1, { children: heading ?? title }),
      children
    ] })
  ] });
}
const CampBanner = "/build/assets/camp_header-c142220f.png";
function CampWrapper({ children, title }) {
  return /* @__PURE__ */ jsxs(WrapperLayout, { showCampNav: true, children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: `Events - Camp${title !== "" ? " - " + title : ""}` }) }),
    /* @__PURE__ */ jsx("section", { className: "text-center", children })
  ] });
}
function Signup$1() {
  return /* @__PURE__ */ jsxs(CampWrapper, { title: "", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute w-full h-full -z-30", children: [
      /* @__PURE__ */ jsx("img", { src: CampBanner, alt: "", className: "fixed w-full pointer-events-none aspect-auto -z-20 md:-mt-40" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden bg-fixed bg-white opacity-50" })
    ] }),
    /* @__PURE__ */ jsxs(EventWrapper, { title: "Summer Bible Camp 2024", className: "bg-white bg-opacity-90", children: [
      /* @__PURE__ */ jsxs(ParagraphContainer, { children: [
        /* @__PURE__ */ jsx(Heading2, { children: "Rules for Application" }),
        /* @__PURE__ */ jsx("p", { className: "text-left", children: "In the past demand for places has been so high that many students have been disappointed. So that we can be fair to everyone, the following rules will be strictly applied." }),
        /* @__PURE__ */ jsxs("ul", { className: "mb-5 ml-5 text-left list-disc", children: [
          /* @__PURE__ */ jsx("li", { children: "The age limit of 10 or over by the 1st January, 2024 will strictly apply. Campers should not be over 17 years old by the end of camp." }),
          /* @__PURE__ */ jsx("li", { children: "Places are only available for those who are, and have been, regularly returning PBS lessons for the year 2024" }),
          /* @__PURE__ */ jsx("li", { children: "Registration may be completed by post, delivery to our office or via the links online. Please do this as soon as possible since priority will be given to those who send their application early." }),
          /* @__PURE__ */ jsx("li", { children: "Online registrations may be paid for by following the button below. Payments are made through Paypal." })
        ] }),
        /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "primary", href: route("payment.camp"), Icon: ExternalLink, children: "Make Payment" })
      ] }),
      /* @__PURE__ */ jsx(ParagraphContainer, { className: "mt-5", children: /* @__PURE__ */ jsx(Paragraph, { className: "text-left text-black", children: "If you don't know anyone coming to camp, don't worry, we will do our best to introduce you to groups your own age, but if you do know others coming please don't forget to name on the Booking Form one person (not a leader) you would like to share a room with. If you list any more than one, it can make arranging the rooms very difficult. Further details about Holiday Week will be sent to you nearer the time, and you will be sent a receipt for your deposit." }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-stretch justify-center my-10 p-2 md:p-0", children: /* @__PURE__ */ jsx("iframe", { className: "w-full md:w-3/4 max-w-7xl h-[35rem]", src: "https://docs.google.com/forms/d/e/1FAIpQLSdEmA2nUyNVz6Lzb5RxUctJLt3bOBPHp1PG7O-RoP3OCWnCVg/viewform", children: "Loading…" }) }),
      /* @__PURE__ */ jsx(ParagraphContainer, { className: "text-right", children: /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: route("events.camp.index"), children: "Go Back" }) })
    ] })
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Signup$1
}, Symbol.toStringTag, { value: "Module" }));
function Heading3({ className = "", children }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: `leading-tight uppercase text-blue-600 text-2xl font-bold mb-2 mt-0 ${className}`, children }) });
}
function EventCardBlock({ Icon, title, description, buttonText, buttonLink = "", isExternal = false }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    Icon && /* @__PURE__ */ jsx("p", { className: "flex justify-center w-auto mb-4", children: /* @__PURE__ */ jsx(Icon, { className: "h-[90px] w-[90px] p-2 text-slate-800" }) }),
    /* @__PURE__ */ jsx(Heading3, { children: title }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-base text-gray-700 whitespace-normal", children: description }),
    buttonText && buttonLink !== "" && (isExternal ? /* @__PURE__ */ jsx(ButtonAnchor, { Icon: ExternalLink, href: buttonLink, isExternalLink: true, children: buttonText }) : /* @__PURE__ */ jsx(ButtonLink, { href: buttonLink, children: buttonText }))
  ] });
}
function Heading2Alt({ className = "", children }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("h2", { className: `leading-tight uppercase text-blue-900 text-2xl md:text-3xl font-bold mb-2 mt-0 ${className}`, children }) });
}
const PGSchedule = "/build/assets/Public PRIZEGIVINGS 2024-89cf5885.pdf";
function QuestionMarkCircle({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" }) });
}
function EventCardContainer({ type, children }) {
  const prizegivingCards = [
    {
      Icon: Calendar,
      title: "When",
      description: "Prizegivings are held each year in a large number of venues across Ireland. They are generally held in the month of February, March and April",
      buttonText: "2024 Schedule",
      buttonLink: PGSchedule,
      isExternal: true
    },
    {
      Icon: Location,
      title: "Where",
      description: "We seek to make prizegiving easily accessible to as many of our students as possible. It is also possible that prizegivings be held in schools during school hours. Please contact us if you wish to discuss this",
      buttonText: "Contact Us",
      buttonLink: route("contactus")
    }
  ];
  const shedCards = [
    {
      Icon: School,
      title: "What",
      description: "SHED Weekend",
      buttonText: "",
      buttonLink: ""
    },
    {
      Icon: Location,
      title: "Where",
      description: "Mullertown House, Annalong, Co. Down",
      buttonText: "",
      buttonLink: ""
    },
    {
      Icon: Calendar,
      title: "When",
      description: "3rd-5th May 2024",
      buttonText: "",
      buttonLink: ""
    },
    {
      Icon: Group,
      title: "Activities",
      description: /* @__PURE__ */ jsx("p", { children: "Sports, Games, Good Food, Time with friends, Bible Talks" }),
      buttonText: "",
      buttonLink: ""
    },
    {
      Icon: QuestionMarkCircle,
      title: "Join",
      description: /* @__PURE__ */ jsx("p", { children: "Click the button below and fill in the form to sign up for this event!" }),
      buttonText: "",
      buttonLink: ""
    }
  ];
  const stepCards = [
    {
      Icon: Calendar,
      title: "When",
      description: /* @__PURE__ */ jsx("p", { className: "text-lg font-bold", children: "13th June - 15th June, 2024" }),
      buttonText: "",
      buttonLink: ""
    },
    {
      Icon: Location,
      title: "Where",
      description: /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold", children: [
        "Castledaly Manor, Athlone,",
        /* @__PURE__ */ jsx("br", {}),
        " Co Westmeath"
      ] }),
      buttonText: "",
      buttonLink: ""
    },
    {
      Icon: ChatBubble,
      title: "Topic",
      description: /* @__PURE__ */ jsx("p", { className: "text-lg font-bold", children: "Book of Nehemiah" }),
      buttonText: "",
      buttonLink: ""
    },
    {
      Icon: Group,
      title: "Who can attend",
      description: "Teens and Young Adults 16+",
      buttonText: "",
      buttonLink: ""
    },
    {
      Icon: Banknotes,
      title: "Cost",
      description: /* @__PURE__ */ jsxs("p", { children: [
        "Standard €65",
        /* @__PURE__ */ jsx("br", {}),
        "Student €50"
      ] }),
      buttonText: "",
      buttonLink: ""
    }
  ];
  const campCards = [
    {
      Icon: Calendar,
      title: "When",
      description: "13th to 20th July, 2024",
      buttonText: "",
      buttonLink: ""
    },
    {
      Icon: Location,
      title: "Where",
      description: "Ovoca Manor, Avoca, Co Wicklow",
      buttonText: "",
      buttonLink: ""
    }
  ];
  const reunionCards = [
    {
      Icon: School,
      title: "What",
      description: "Camp Reunion",
      buttonText: "",
      buttonLink: ""
    },
    {
      Icon: Calendar,
      title: "When",
      description: "6th to 8th October, 2023",
      buttonText: "",
      buttonLink: ""
    },
    {
      Icon: Location,
      title: "Where",
      description: "Castledaly Manor, Moate, Athlone, Co. Westmeath",
      buttonText: "",
      buttonLink: ""
    }
  ];
  const iTeamCards = [
    {
      Icon: Calendar,
      title: "Event Timing",
      description: "Sunday, 30th July - Saturday, 5th August, 2023",
      buttonText: "",
      buttonLink: ""
    }
  ];
  const getCurrentTypeCards = () => {
    switch (type) {
      case "prizegivings":
        return prizegivingCards;
      case "shed":
        return shedCards;
      case "step":
        return stepCards;
      case "camp":
        return campCards;
      case "iteam":
        return iTeamCards;
      case "reunion":
        return reunionCards;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 mx-auto mt-10 mb-20 rounded-lg drop-shadow-lg bg-sky-100 sm:w-4/5", children: [
    /* @__PURE__ */ jsx("div", { className: "mt-2 mb-5", children: /* @__PURE__ */ jsx(Heading2Alt, { children: "Upcoming Event" }) }),
    /* @__PURE__ */ jsx("div", { className: `flex flex-col flex-wrap md:mx-auto justify-center md:justify-around md:flex-row md:mb-5`, children: getCurrentTypeCards().map(({ Icon, title, description, buttonText, buttonLink, isExternal }) => /* @__PURE__ */ jsx("div", { className: `flex flex-col ${type === "prizegivings" ? "basis-1/2  justify-between" : "basis-1/3"} items-center md:max-w-sm`, children: /* @__PURE__ */ jsx(EventCardBlock, { Icon, title, description, buttonLink, buttonText, isExternal }) }, title)) }),
    children
  ] });
}
const PlaceholderImage = "/build/assets/Placeholder-a7d46354.svg";
function GalleryCard({ imageLink, text, cardNumber = null }) {
  return /* @__PURE__ */ jsxs("div", { className: `relative overflow-hidden ${!!cardNumber && cardNumber === 1 ? "col-span-2 row-span-2 md:row-span-3" : "col-span-1"}`, children: [
    /* @__PURE__ */ jsx("img", { className: "relative aspect-[3/2] object-cover", src: imageLink === "" ? PlaceholderImage : imageLink, alt: text === "" ? "Sample image" : text }),
    /* @__PURE__ */ jsx("p", { className: "absolute bottom-0 w-full py-1 text-sm text-center uppercase md:font-bold md:py-2 md:text-base bg-blue-400/80 text-slate-50", children: text })
  ] });
}
function GalleryBasic({ images }) {
  return /* @__PURE__ */ jsx("div", { className: "grid justify-center grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 md:mx-10", children: images.map(({ title, imageLink }, idx) => /* @__PURE__ */ jsx(GalleryCard, { imageLink, text: title }, idx)) });
}
function ExtendScreenWrapper({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "w-screen relative right-1/2 left-1/2 -mx-[50vw] px-5 py-3 mb-5", children });
}
const CampTeaching = "/build/assets/shed-teaching-ce499b71.jpg";
const CampFriends = "/build/assets/camp-friends-min-da6f1303.jpg";
const CampBeach = "/build/assets/camp-beach-min-229f1a52.jpg";
const CampFire = "/build/assets/camp-fire-min-feb02735.jpg";
const CampSinging = "/build/assets/camp-singing-min-a8a2efd2.jpg";
const CampGames = "/build/assets/camp-196853a2.jpg";
const CampCraft = "/build/assets/camp-craft-min-36ec7070.jpg";
const CampAdventure = "/build/assets/camp-adventure-min-b7d42768.jpg";
function Home$1() {
  const { settings } = usePage().props;
  useState(true);
  const images = [
    {
      title: "Bible Teaching",
      imageLink: CampTeaching
    },
    {
      title: "New Friends",
      imageLink: CampFriends
    },
    {
      title: "Beach Day",
      imageLink: CampBeach
    },
    {
      title: "Camp Fire",
      imageLink: CampFire
    },
    {
      title: "Singing",
      imageLink: CampSinging
    },
    {
      title: "Team Games",
      imageLink: CampGames
    },
    {
      title: "Craft",
      imageLink: CampCraft
    },
    {
      title: "Adventure",
      imageLink: CampAdventure
    }
  ];
  return /* @__PURE__ */ jsxs(CampWrapper, { title: "", children: [
    /* @__PURE__ */ jsx("img", { src: CampBanner, alt: "", className: "w-full aspect-auto md:-mt-40" }),
    /* @__PURE__ */ jsxs(EventWrapper, { className: "-mt-20 md:-mt-40", title: "Summer Camp", children: [
      /* @__PURE__ */ jsx(ExtendScreenWrapper, { children: /* @__PURE__ */ jsx(GalleryBasic, { images }) }),
      settings && settings.camp_upcoming_card.value === "1" && /* @__PURE__ */ jsx(EventCardContainer, { type: "camp", children: /* @__PURE__ */ jsx(ButtonLink, { href: route("events.camp.signup"), children: "Register" }) }),
      /* @__PURE__ */ jsx(Heading2, { children: "Camp" }),
      /* @__PURE__ */ jsxs(ParagraphContainer, { children: [
        /* @__PURE__ */ jsx(Paragraph, { children: "Camp is held each summer in mid-July and generally fills up extremely quickly after the forms go out in mid-May. Camp is held at Ovoca Manor just outside the village of Avoca and near Arklow in Co. Wicklow. Ovoca Manor is an outdoor adventure centre owned by Scripture Union. It offers accommodation and a whole range of activities. Our week at camp will typically involve some time in activities at the centre and several trips off site for other activities." }),
        /* @__PURE__ */ jsx(Paragraph, { children: "During the week campers can, among other things, participate in team sports, water sports, craft, activities, shop and visit the beach. Besides activity there is the opportunity to make new friends, explore new places and eat good food. Each day at camp we meet twice to learn from the Bible and have a speaker who seeks to make the messages relevant to young people, this is what we feel is the most important aspect of camp." }),
        /* @__PURE__ */ jsx(Paragraph, { children: "Camp is open to PBS students who are actively completing and returning lessons, and are over the age of 10 on the 1st January of the year in which camp takes place." })
      ] }),
      /* @__PURE__ */ jsx(Heading2, { children: "History" }),
      /* @__PURE__ */ jsx(ParagraphContainer, { children: /* @__PURE__ */ jsx(Paragraph, { children: "Summer camp is something that is very special to many of the young people who have had the opportunity for a week of “summer adventure”. PBS camp began in 1963 in Co. Cork and has visited a few locations down through the years. Most recently the Camp has been held at Ovoca Manor in Co. Wicklow. Some of the young people who have attended camp in recent years have parents who also attended PBS camps. Much has changed from some of those early camps. We have proper toilets, showers and dining halls. When we are travelling it's one person to a seat, instead of “how many can you get in”, but the central purpose of camp remains the same. That purpose is the teaching of the Bible to young people." }) })
    ] })
  ] });
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home$1
}, Symbol.toStringTag, { value: "Module" }));
const PaypalQR = "/build/assets/PayPal-QR-257e24af.png";
function ReunionSignup() {
  return /* @__PURE__ */ jsxs(WrapperLayout, { children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute w-full h-full -z-30", children: [
      /* @__PURE__ */ jsx("img", { src: CampBanner, alt: "", className: "fixed w-full pointer-events-none aspect-auto -z-20 md:-mt-40" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden bg-fixed bg-white opacity-50" })
    ] }),
    /* @__PURE__ */ jsxs(EventWrapper, { title: "Camp Reunion 2023", className: "bg-white bg-opacity-90", children: [
      /* @__PURE__ */ jsxs(ParagraphContainer, { children: [
        /* @__PURE__ */ jsx(Heading2, { children: "Register to book your spot!" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-8", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-left", children: "We are excited to invite you to join us this October for a Reunion weekend with all those who attended camp in the summer! The camp will be held in Castledaly Manor, Moate, Athlone, Co. Westmeath. You may pay the bus fees along with your registration fee." }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-2 border-2 border-black rounded-2xl", children: [
            /* @__PURE__ */ jsx(Heading3$1, { children: "Payment" }),
            /* @__PURE__ */ jsx("img", { className: "p-5 mx-auto w-44", src: PaypalQR, alt: "QR code for Paypal" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Link: " }),
              /* @__PURE__ */ jsx(AnchorLink, { href: "https://www.paypal.com/donate/?hosted_button_id=CRMELXCDEWANC", newTab: true })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-stretch justify-center my-10", children: /* @__PURE__ */ jsx("iframe", { className: "w-full md:w-3/4 max-w-7xl h-[35rem]", src: "https://docs.google.com/forms/d/e/1FAIpQLSfnEcphksxb_7x9BHYUTwrRxnSdzJ88qEGiO8mShYiZkC2R4w/viewform?usp=sf_link", children: "Loading…" }) }),
      /* @__PURE__ */ jsx(ParagraphContainer, { className: "text-right", children: /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => window.history.back(), children: "Go Back" }) })
    ] })
  ] });
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ReunionSignup
}, Symbol.toStringTag, { value: "Module" }));
const iTeamFlyer = "/build/assets/iteam_flyer-63659996.png";
function ITeam() {
  const iTeamCards = [
    {
      Icon: Calendar,
      title: "Event Dates",
      description: "Sunday, 30th July - Saturday, 5th August, 2023",
      buttonText: "",
      buttonLink: ""
    }
  ];
  const title = "iTeam";
  return /* @__PURE__ */ jsxs(WrapperLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Events - ${title}` }),
    /* @__PURE__ */ jsxs("section", { className: "py-12 mx-auto text-center shadow-sm max-w-7xl sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "p-6 mt-2 mb-4 font-sans text-5xl font-bold leading-snug text-blue-800", children: title }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-5 px-5 mb-5 md:grid-cols-2 md:gap-10 md:mb-10", children: [
        /* @__PURE__ */ jsx("img", { src: iTeamFlyer, alt: "iTeam flyer", className: "md:order-last" }),
        /* @__PURE__ */ jsxs("div", { className: "md:px-10", children: [
          /* @__PURE__ */ jsx(Paragraph, { children: 'iTeam is a new event which intends to encourage those with an interest in producing digital educational resources to teach the bible to work together within a defined project for PBS. It is hoped that each contributor benefits personally in developing their own skillset by working along with complimentary skills while the group as a whole brings a whole year of bible lessons to be "click ready" for the classroom.' }),
          /* @__PURE__ */ jsx("div", { className: "p-6 mx-auto my-10 rounded-lg drop-shadow-lg bg-sky-100 lg:w-4/5", children: iTeamCards.map(({ Icon, title: title2, description, buttonText, buttonLink, isExternal }) => /* @__PURE__ */ jsx(EventCardBlock, { Icon, title: title2, description, buttonLink, buttonText, isExternal }, title2)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(ParagraphContainer, { children: [
        /* @__PURE__ */ jsx(Paragraph, { className: "text-left text-black", children: "We are glad that you are interested in joining with us this summer, and would appreciate it if you could complete the form below, and return it to us, as we have been advised to keep detailed records of participants. A few things to keep in mind as you fill this form:" }),
        /* @__PURE__ */ jsxs("ul", { className: "ml-10 text-left list-disc marker:text-sky-600", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            "This form is to ",
            /* @__PURE__ */ jsx("b", { children: "register your interest" }),
            " in the event. We will be back in touch as soon as possible to confirm if you are on the team."
          ] }),
          /* @__PURE__ */ jsx("li", { children: "This event is primarily targeted for people who are 16 years or older, but we have a small number of places available for under 16s." }),
          /* @__PURE__ */ jsx("li", { children: "In accordance with our Child Safety Policy (which applies, since both minors and adults will participate in this week), we have to ask some rather personal questions. These are necessary for legal reasons, and we do trust that you will understand." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-stretch justify-center my-10", children: /* @__PURE__ */ jsx("iframe", { src: "https://docs.google.com/forms/d/e/1FAIpQLScmiVmc6UyVxgOFiT-hGU393EWaDwq8_H7O4FW8DJk0yBbfBw/viewform", className: "w-full max-w-4xl h-[35rem] border border-y-2 py-1 border-x-0 border-gray-400 m-1", children: "Loading…" }) }),
      /* @__PURE__ */ jsx(ParagraphContainer, { children: /* @__PURE__ */ jsx(Paragraph, { children: /* @__PURE__ */ jsxs("em", { children: [
        "If you have any questions please give us a ring on ",
        /* @__PURE__ */ jsx("span", { children: "00 353 49 5552915" }),
        " / ",
        /* @__PURE__ */ jsx("span", { children: "086 8519047" }),
        " or send us an email."
      ] }) }) }),
      /* @__PURE__ */ jsx(ParagraphContainer, { className: "text-right", children: /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => window.history.back(), children: "Go Back" }) })
    ] })
  ] });
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ITeam
}, Symbol.toStringTag, { value: "Module" }));
const PrizesImage = "/build/assets/prizegiving-prizes-fe2e32b9.jpg";
const StoriesImage = "/build/assets/prizegiving-db0e5a5e.jpg";
const QuizImage = "/build/assets/prizegiving-quiz-c5a85544.jpg";
const SongsImage = "/build/assets/prizegiving-songs-5b74e293.jpg";
const EventsImage = "/build/assets/prizegiving-events-226aea44.jpg";
const SchoolsImage = "/build/assets/prizegiving-schools-58fce6bb.jpg";
const TeamImage = "/build/assets/prizegiving-team-c98f6fe2.jpg";
const CoffeeImage = "/build/assets/prizegiving-tea-and-coffee-cdee430e.jpg";
function Prizegivings({ queryParams }) {
  const images = [
    {
      title: "Prizes",
      imageLink: PrizesImage
    },
    {
      title: "Stories",
      imageLink: StoriesImage
    },
    {
      title: "Quizzes",
      imageLink: QuizImage
    },
    {
      title: "Songs",
      imageLink: SongsImage
    },
    {
      title: "Tea and Coffee",
      imageLink: CoffeeImage
    },
    {
      title: "Events",
      imageLink: EventsImage
    },
    {
      title: "Schools",
      imageLink: SchoolsImage
    },
    {
      title: "Team",
      imageLink: TeamImage
    }
  ];
  useScrollTo((queryParams == null ? void 0 : queryParams.type) ?? "", {
    duration: 1e3,
    delay: 100,
    smooth: true,
    offset: -50
  });
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs(EventWrapper, { title: "Prizegivings", children: [
    /* @__PURE__ */ jsx(ExtendScreenWrapper, { children: /* @__PURE__ */ jsx(GalleryBasic, { images }) }),
    /* @__PURE__ */ jsxs(ParagraphContainer, { className: "mt-20", children: [
      /* @__PURE__ */ jsx(Paragraph, { children: "Throughout the year those who return lessons for marking are allocated marks for their work. The total marks accumulated from January to December each year is totalled and converted to a percentage. This percentage then entitles the student to one of four levels of prize. Each student is invited to attend a prizegiving of their choice to select their prize. A prizegiving will generally take between an hour and an hour and a half depending on the number attending. The evening will begin by students selecting their prizes. This will be followed by a short time of singing songs based on the Bible and an explanation of the Bible for young people. The evening will be concluded by the presentation of the prizes and refreshments." }),
      /* @__PURE__ */ jsx(Paragraph, { children: "Prizegivings are a special time for the staff of Postal Bible School as they get an opportunity to meet students and their families across Ireland." })
    ] }),
    /* @__PURE__ */ jsx("div", { id: "prizegivings", children: /* @__PURE__ */ jsx(EventCardContainer, { type: "prizegivings" }) })
  ] }) });
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Prizegivings
}, Symbol.toStringTag, { value: "Module" }));
function RadioInput({ name, id, value, className = "", checked, ariaLabelledBy, handleChange }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type: "radio",
      name,
      id,
      value,
      className: `border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out mr-1 ` + className,
      checked,
      onChange: (e) => handleChange(e),
      "aria-labelledby": ariaLabelledBy
    }
  );
}
function SettingsRow({ title, name, value = "", handleChange }) {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center border border-gray-200 w-3/4 p-5 rounded-md mb-2", children: /* @__PURE__ */ jsxs("fieldset", { className: "inline-flex justify-between items-center gap-10 w-full", children: [
    /* @__PURE__ */ jsx("legend", { className: "float-left font-bold", children: title }),
    /* @__PURE__ */ jsxs("div", { className: "inline-flex", children: [
      /* @__PURE__ */ jsxs(InputLabel2, { className: "mr-2", forInput: "true" + name, children: [
        /* @__PURE__ */ jsx(RadioInput, { name, id: "true" + name, value: "1", handleChange, checked: value === "1" }),
        "Show"
      ] }),
      /* @__PURE__ */ jsxs(InputLabel2, { className: "mr-2", forInput: "false" + name, children: [
        /* @__PURE__ */ jsx(RadioInput, { name, id: "false" + name, value: "0", handleChange, checked: value === "0" }),
        "Hide"
      ] })
    ] })
  ] }) });
}
function Settings({ eventSettings }) {
  const initialFormObject = eventSettings;
  const { data, setData, post } = useForm(initialFormObject);
  const handleChange = (event) => {
    switch (event.target.name) {
      case "shed_upcoming_card":
      case "camp_upcoming_card":
        const computedValue = eventSettings[event.target.name];
        computedValue.value = event.target.value;
        setData(event.target.name, computedValue);
        break;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    post(route("events.settings.store"));
  };
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsx(EventWrapper, { title: "Event Settings", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[auto_1fr] gap-2 text-left items-center", children: [
      /* @__PURE__ */ jsx(Heading2Alt$1, { children: "The SHED" }),
      /* @__PURE__ */ jsx(SettingsRow, { value: data.shed_upcoming_card.value, title: "Show SHED Upcoming Card", name: data.shed_upcoming_card.key, handleChange }),
      /* @__PURE__ */ jsx(Heading2Alt$1, { children: "Summer Camp" }),
      /* @__PURE__ */ jsx(SettingsRow, { value: data.camp_upcoming_card.value, title: "Show Camp Upcoming Card", name: data.camp_upcoming_card.key, handleChange })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { children: "Submit" }) })
  ] }) }) });
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Settings
}, Symbol.toStringTag, { value: "Module" }));
const ShedGames = "/build/assets/shed-games-1933f594.jpg";
const ShedFriends = "/build/assets/shed-bf6d6f75.jpg";
const ShedTeaching = "/build/assets/shed-teaching-ce499b71.jpg";
const ShedFun = "/build/assets/shed-fun-0ac6d25f.jpg";
const ShedFood = "/build/assets/shed-food-ee09f48d.jpg";
const ShedActivities = "/build/assets/shed-activities-8669d7a3.jpg";
const ShedSkills = "/build/assets/shed-skills-58bf09de.jpg";
const ShedChallenges = "/build/assets/shed-challenges-290146c6.jpg";
const ShedLogo = "/build/assets/shed-logo-604b0c0e.png";
const ConsentForm = "/build/assets/SHED_Consent-form_2022-23-89e0cec9.pdf";
function Shed() {
  const { settings } = usePage().props;
  const images = [
    {
      title: "Games",
      imageLink: ShedGames
    },
    {
      title: "Friends",
      imageLink: ShedFriends
    },
    {
      title: "Bible Teaching",
      imageLink: ShedTeaching
    },
    {
      title: "Fun",
      imageLink: ShedFun
    },
    {
      title: "Food",
      imageLink: ShedFood
    },
    {
      title: "Activities",
      imageLink: ShedActivities
    },
    {
      title: "Skills",
      imageLink: ShedSkills
    },
    {
      title: "Challenges",
      imageLink: ShedChallenges
    }
  ];
  const descriptionText = /* @__PURE__ */ jsxs(ParagraphContainer, { className: "w-fit", children: [
    /* @__PURE__ */ jsx(Paragraph, { className: "mb-2 text-center", children: "Postal Bible School - 049 555 2915" }),
    /* @__PURE__ */ jsx(Paragraph, { className: "mb-2 text-center", children: "Gareth McMeekin - 047 56969/086 8519047" }),
    /* @__PURE__ */ jsx(Paragraph, { className: "mt-10 text-center", children: "If you need directions or a lift, give us a call" })
  ] });
  return /* @__PURE__ */ jsxs(WrapperLayout, { children: [
    /* @__PURE__ */ jsx("img", { src: ShedLogo, alt: "The SHED logo", className: "float-left w-40 mt-5 ml-5" }),
    /* @__PURE__ */ jsxs(EventWrapper, { title: "The SHED", children: [
      /* @__PURE__ */ jsx(ParagraphContainer, { className: "mb-10", children: /* @__PURE__ */ jsx(Paragraph, { children: "The Shed is a Christian youth group for young people (age 11+). It is run in association with Postal Bible School. It is usually run on the last Saturday of every month. Those involved in organising the Shed aim to teach the Bible and its importance to young people." }) }),
      /* @__PURE__ */ jsx(ExtendScreenWrapper, { children: /* @__PURE__ */ jsx(GalleryBasic, { images }) }),
      settings && settings.shed_upcoming_card.value === "1" && /* @__PURE__ */ jsx(EventCardContainer, { type: "shed", children: /* @__PURE__ */ jsx(ButtonAnchor, { href: "https://forms.gle/MmPDKpdHy4mfm1yB9", isExternalLink: true, Icon: ExternalLink, children: "Sign up" }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsx(EventCardBlock, { buttonLink: ConsentForm, title: "Contact", description: descriptionText, buttonText: "Consent Form", isExternal: true }) })
    ] })
  ] });
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Shed
}, Symbol.toStringTag, { value: "Module" }));
const TeachingImage = "/build/assets/step-teaching-cf439d87.jpg";
const DiscussionImage = "/build/assets/step-discussion-33064520.jpg";
const SingingImage = "/build/assets/step-singing-4a97bbc0.jpg";
const FellowshipImage = "/build/assets/step-fellowship-5fe05583.jpg";
const GamesImage = "/build/assets/step-cccce726.jpg";
const BunsImage = "/build/assets/step-buns-e27178c5.jpg";
const StudyImage = "/build/assets/step-study-b6e7a24b.jpg";
const MeetingImage = "/build/assets/step-meeting-87c5f998.jpg";
function Heading1({ children }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold leading-snug text-blue-900 uppercase md:text-4xl font-subtitle", children }) });
}
function StepWrapper({ children, title, heading }) {
  return /* @__PURE__ */ jsxs(WrapperLayout, { showStepNav: true, children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: `Events - STEP${title !== "" ? " - " + title : ""}` }),
      /* @__PURE__ */ jsx("link", { "head-key": "favicon", rel: "shortcut icon", href: LogoWhite$1 })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "px-3 py-6 mx-auto text-center shadow-sm max-w-7xl sm:px-6 lg:px-8", children: [
      heading && heading !== "" && /* @__PURE__ */ jsx(Heading1, { children: heading }),
      children
    ] })
  ] });
}
function Index$2() {
  const images = [
    {
      title: "Teaching",
      imageLink: TeachingImage
    },
    {
      title: "Group Discussions",
      imageLink: DiscussionImage
    },
    {
      title: "Singing",
      imageLink: SingingImage
    },
    {
      title: "Fellowship",
      imageLink: FellowshipImage
    },
    {
      title: "People",
      imageLink: MeetingImage
    },
    {
      title: "Games",
      imageLink: GamesImage
    },
    {
      title: "Tea and Buns",
      imageLink: BunsImage
    },
    {
      title: "Bible Study",
      imageLink: StudyImage
    }
  ];
  return /* @__PURE__ */ jsxs(StepWrapper, { heading: "STEP", title: "", children: [
    /* @__PURE__ */ jsxs(ParagraphContainer, { className: "mt-5 mb-10 lg:mt-10", children: [
      /* @__PURE__ */ jsx(Paragraph, { children: "The name STEP comes from the idea of progress, something that is important in spiritual life. The name is also an acronym for Sharing Truth and Encouraging Practice. At the core of STEP is a community of God's people who come together 3 times in the year for a weekend of in depth Bible study and encouraging each other in their Christian walk. It is for teens and young adults age 16+." }),
      /* @__PURE__ */ jsx(Paragraph, { children: "STEP weekends are a part of the work of Postal Bible School Ireland" })
    ] }),
    /* @__PURE__ */ jsx(ExtendScreenWrapper, { children: /* @__PURE__ */ jsx(GalleryBasic, { images }) }),
    /* @__PURE__ */ jsx(EventCardContainer, { type: "step", children: /* @__PURE__ */ jsx(ButtonLink, { href: route("events.step.signup"), children: "Register Now" }) }),
    /* @__PURE__ */ jsx(ExtendScreenWrapper, { children: /* @__PURE__ */ jsxs("section", { className: "pt-4 pb-8 bg-stone-100", children: [
      /* @__PURE__ */ jsx(Heading2, { children: "What to expect" }),
      /* @__PURE__ */ jsxs(ParagraphContainer, { children: [
        /* @__PURE__ */ jsx(Paragraph, { children: "Over several years we covered a range of topics at STEP, but the weekends are study focused as opposed to centered on activities or entertainment. There is always plenty of time for fellowhip, but the main focus is Bible study." }),
        /* @__PURE__ */ jsx(Paragraph, { children: "Our teaching usually takes the form of teaching sessions, reflection time and discussion groups." }),
        /* @__PURE__ */ jsx(Paragraph, { children: "We regularly seek to unpack big Bible books in a single weekend as well as handle relecant topics. In recent years we have looked at books like Genesis, John, Isaiah and the Psalms as well as topics like the Tabernacle, Christian Service and Bible History." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "pb-8", children: [
      /* @__PURE__ */ jsx(Heading2, { children: "Who we are" }),
      /* @__PURE__ */ jsx(ParagraphContainer, { children: /* @__PURE__ */ jsx(Paragraph, { children: "STEP is run by Postal Bible School in Ireland. The attendees are drawn from across a range of denominations and independent Christian Fellowships. The focus of the weekends is to unpack God's word in a way that allows it to speak for itself. We have a united view that Christ is our central hope and the written Word of God is powerful in teaching us what is true and worthwhile." }) })
    ] }),
    /* @__PURE__ */ jsx(ExtendScreenWrapper, { children: /* @__PURE__ */ jsxs("section", { className: "pt-4 pb-8 bg-stone-100", children: [
      /* @__PURE__ */ jsx(Heading2, { children: "History" }),
      /* @__PURE__ */ jsx(ParagraphContainer, { children: /* @__PURE__ */ jsx(Paragraph, { children: "For longer than we can remember Postal Bible School has been running Summer Camps where young people come together for fun, fellowship and learning the Word of God. At a few times over the years there have been attempts to continue to provide that experience for those who were too old for camp but only as one off events. In the Summer of 2012, as a group of teens left their final year of camp the idea of a weekend together for teens and young adults was reborn. Since January 2013 we have been holding 3 weekend events each year. In the early days it was just 12-20 each weekend but that has now grown to as many as 70. As friends have brought others over the years the group has expanded to reflect an Irish focus with an International flavour. As we moved online during the pandemic past attendees from several countries and continents were able to join in the teaching sessions. In November 2021 we returned to in person events with our largest attendance to date despite a few restrictions." }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "px-4 md:pb-8", children: [
      /* @__PURE__ */ jsx(Heading2, { children: "Location" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-10 mx-auto mt-10 md:flex-row", children: [
        /* @__PURE__ */ jsx("div", { id: "castledaly-location", children: /* @__PURE__ */ jsx("iframe", { className: "h-[300px] w-full md:h-[400px] md:w-[600px]", src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2380.034969766731!2d-7.80367208441075!3d53.378423780009456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485c4c9204f232b9%3A0x142951a650ea93b6!2sCastledaly%20Manor%20-%20BCM%20Ireland!5e0!3m2!1sen!2suk!4v1674635864862!5m2!1sen!2suk", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }) }),
        /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 text-lg font-bold", children: "Castledaly Manor" }),
          /* @__PURE__ */ jsx(Paragraph, { className: "text-black", children: "STEP takes place at Castledaly Manor which is a Christian Camp and Conference Centre in the heart of Ireland." }),
          /* @__PURE__ */ jsxs(Paragraph, { className: "text-black", children: [
            "It is owned by ",
            /* @__PURE__ */ jsx(AnchorLink, { href: "https://bcmireland.ie/", newTab: true, children: "Bible Centred Ministries (BCM)" }),
            " Ireland, who run camps throughout the year. It is also used as a retreat and conference centre by churches and other Christian organisations. To know more check out their ",
            /* @__PURE__ */ jsx(AnchorLink, { href: "https://www.facebook.com/castledalymanor/", newTab: true, children: "Facebook" }),
            " page."
          ] })
        ] })
      ] })
    ] })
  ] });
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$2
}, Symbol.toStringTag, { value: "Module" }));
function Admin({ videoList }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [nameToDelete, setNameToDelete] = useState(null);
  const showModal = (id, heading) => {
    setIdToDelete(id);
    setNameToDelete(heading);
    setToggleModal(true);
  };
  const handleOnClose = () => {
    setIdToDelete(null);
    setToggleModal(false);
  };
  const handleSubmit = () => {
    if (idToDelete) {
      router.delete(route("events.step.past.destroy", idToDelete));
    } else {
      console.error("Could not find that entry. Please contact administrator");
    }
    setToggleModal(false);
  };
  const tableDataMemo = useMemo(() => videoList, [videoList]);
  const columnHelper = createColumnHelper();
  const defaultColumns = [
    columnHelper.accessor((row) => row.id, {
      header: "ID"
    }),
    columnHelper.display({
      id: "Image",
      header: "Thumbnail",
      cell: ({ row }) => /* @__PURE__ */ jsx("img", { className: "w-40", src: row.original.imageLink, alt: "Image for " + row.original.heading })
    }),
    columnHelper.accessor((row) => row.heading, {
      header: "Title"
    }),
    columnHelper.accessor((row) => row.date, {
      header: "Date"
    }),
    columnHelper.accessor((row) => row.description, {
      header: "Description"
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex w-full gap-2 py-2", children: [
        /* @__PURE__ */ jsxs(Link, { className: "text-blue-500 underline hover:no-underline", href: route("events.step.past.edit", row.original.id), children: [
          /* @__PURE__ */ jsx(EditIcon, { className: "w-6 h-6" }),
          " Edit"
        ] }),
        /* @__PURE__ */ jsxs(Link, { className: "text-blue-500 underline hover:no-underline", href: route("events.step.past.show", row.original.routename), children: [
          /* @__PURE__ */ jsx(Eye, { className: "w-6 h-6" }),
          " View"
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "text-blue-500 underline hover:no-underline", onClick: () => showModal(row.original.id, row.original.heading), children: [
          /* @__PURE__ */ jsx(Trash, { className: "w-6 h-6" }),
          " Delete"
        ] })
      ] })
    })
  ];
  return /* @__PURE__ */ jsxs(WrapperLayout, { children: [
    /* @__PURE__ */ jsx(DeleteDialogCard, { isOpen: toggleModal, message: `Are you sure you want to delete "${nameToDelete}?"`, onClose: handleOnClose, onSubmit: handleSubmit, hasCloseButton: true }),
    /* @__PURE__ */ jsxs(ContentWrapper, { title: "Step Admin", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-end w-full", children: /* @__PURE__ */ jsx(ButtonLink, { href: route("events.step.past.create"), children: "Add video" }) }),
      /* @__PURE__ */ jsx("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ jsx(AdvancedTable, { data: tableDataMemo, columns: defaultColumns }) })
    ] })
  ] });
}
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Admin
}, Symbol.toStringTag, { value: "Module" }));
function Legend({ value, required = false, className, children }) {
  return /* @__PURE__ */ jsx("legend", { "aria-required": required, className: `inline-block capitalize p-2 text-base rounded bg-sky-100 font-medium md:text-base mb-px text-slate-700 ${required && "after:content-['*'] after:ml-1 after:text-red-500"} ${className}`, children: value ? value : children });
}
function TextAreaInput({ name, id, value, className, rows, required, handleChange }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      name,
      id,
      value,
      className: `border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out ` + className,
      autoComplete: "off",
      rows,
      required,
      onChange: (e) => handleChange(e)
    }
  );
}
function VideoEditFormComponent({ videoContent, setContent, mode = "edit" }) {
  const initialState = videoContent;
  const blankState = [{
    title: "",
    externalUrl: "",
    duration: "",
    id: 0
  }];
  const reducer = (state, action) => {
    if (action.type === "changeValue" && "name" in action) {
      let returnObj = [...state];
      if (action.name === "id") {
        returnObj[action.idx][action.name] = +action.value;
      } else {
        returnObj[action.idx][action.name] = action.value + "";
      }
      return returnObj;
    } else if (action.type === "addValue") {
      let newItem = blankState;
      newItem[0].id = state.length;
      return [
        ...state,
        ...newItem
      ];
    } else if (action.type === "removeValue" && "idx" in action) {
      if (state.length === 1) {
        return blankState;
      }
      let returnObj = [...state];
      returnObj.splice(action.idx, 1);
      return returnObj;
    } else {
      return state;
    }
  };
  const [videoState, dispatch] = useReducer(reducer, initialState);
  const handleComplexChange = (idx, event) => {
    if (event.target instanceof HTMLInputElement) {
      switch (event.target.name) {
        case "title":
        case "externalUrl":
        case "duration":
        case "id":
          dispatch({
            type: "changeValue",
            name: event.target.name,
            value: event.target.value,
            idx
          });
          break;
      }
    }
  };
  useEffect(() => {
    setContent([...videoState]);
  }, [videoState]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Video Information" }),
    mode === "edit" && /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Change the ID number to change order of video. Be careful of the maximum number of videos" }),
    /* @__PURE__ */ jsxs("table", { children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "ID" }),
        /* @__PURE__ */ jsx("th", { children: "External URL" }),
        /* @__PURE__ */ jsx("th", { children: "Title" }),
        /* @__PURE__ */ jsx("th", { children: "Duration" }),
        /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => dispatch({ type: "addValue" }), className: "before:content-['+'] before:pr-1 before:text-lg bg-green-200", children: "Add Row" }) })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: videoState.map(({ title, externalUrl, duration, id }, idx) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: mode === "edit" ? /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            name: "id",
            id: `id${idx}`,
            value: id,
            className: "",
            handleChange: (e) => handleComplexChange(idx, e),
            required: true
          }
        ) : /* @__PURE__ */ jsx("div", { className: "px-4", children: idx }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            name: "externalUrl",
            id: `externalUrl${idx}`,
            value: externalUrl,
            className: "",
            handleChange: (e) => handleComplexChange(idx, e)
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            name: "title",
            id: `title${idx}`,
            value: title,
            className: "",
            handleChange: (e) => handleComplexChange(idx, e)
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            name: "duration",
            id: `duration${idx}`,
            value: duration,
            className: "",
            handleChange: (e) => handleComplexChange(idx, e)
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          SecondaryButton,
          {
            onClick: () => dispatch({
              type: "removeValue",
              idx
            }),
            className: "bg-red-200 before:content-['-'] before:pr-1 before:text-lg",
            children: "Remove Row"
          }
        ) })
      ] }, "contenttable" + idx)) })
    ] })
  ] });
}
function VideoFilesEditComponent({ fileContent, setContent, mode = "edit" }) {
  const initialState = fileContent;
  const blankState = [{
    id: 0,
    name: "",
    title: "",
    type: "",
    fileData: null
  }];
  const reducer = (state, action) => {
    if (action.type === "changeValue" && "name" in action) {
      let returnObj = [...state];
      if (action.name === "id") {
        returnObj[action.idx][action.name] = +action.value;
      } else if (action.name === "type") {
        if (action.value === "document" || action.value === "slide")
          returnObj[action.idx][action.name] = action.value;
      } else if (action.name === "fileData") {
        returnObj[action.idx][action.name] = action.value;
      } else {
        returnObj[action.idx][action.name] = action.value + "";
      }
      return returnObj;
    } else if (action.type === "addValue") {
      let newItem = blankState;
      newItem[0].id = state.length;
      return [
        ...state,
        ...newItem
      ];
    } else if (action.type === "removeValue" && "idx" in action) {
      if (state.length === 1) {
        return [];
      }
      let returnObj = [...state];
      returnObj.splice(action.idx, 1);
      return returnObj;
    } else {
      return state;
    }
  };
  const [fileState, dispatch] = useReducer(reducer, initialState);
  const handleComplexChange = (idx, event) => {
    if (event.target instanceof HTMLInputElement) {
      switch (event.target.name) {
        case "title":
        case "name":
        case "id":
          dispatch({
            type: "changeValue",
            name: event.target.name,
            value: event.target.value,
            idx
          });
          break;
        case "fileData":
          if (event.target.files) {
            dispatch({
              type: "changeValue",
              name: event.target.name,
              value: event.target.files[0],
              idx
            });
          }
      }
    } else if (event.target instanceof HTMLSelectElement) {
      switch (event.target.name) {
        case "type":
          dispatch({
            type: "changeValue",
            name: event.target.name,
            value: event.target.value,
            idx
          });
          break;
      }
    }
  };
  useEffect(() => {
    setContent([...fileState]);
  }, [fileState]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h2", { className: "p-0 text-xl font-bold text-black", children: "File Information" }),
    /* @__PURE__ */ jsx("p", { className: "p-0 mb-2 text-base text-gray-600", children: "Only supporting .pdf files at the moment." }),
    fileState && fileState.length === 0 ? /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => dispatch({ type: "addValue" }), className: "before:content-['+'] before:pr-1 before:text-lg bg-green-200", children: "Add Row" }) : /* @__PURE__ */ jsxs("table", { children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "ID" }),
        /* @__PURE__ */ jsx("th", { children: "Name" }),
        /* @__PURE__ */ jsx("th", { children: "Title" }),
        /* @__PURE__ */ jsx("th", { children: "Type" }),
        /* @__PURE__ */ jsx("th", { children: "File" }),
        /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => dispatch({ type: "addValue" }), className: "before:content-['+'] before:pr-1 before:text-lg bg-green-200", children: "Add Row" }) })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: fileState.map(({ title, name, type, fileData, id }, idx) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: mode === "edit" ? /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            name: "id",
            id: `fileid${idx}`,
            value: id,
            className: "",
            handleChange: (e) => handleComplexChange(idx, e),
            required: true
          }
        ) : /* @__PURE__ */ jsx("div", { className: "px-4", children: idx }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            name: "name",
            id: `filename${idx}`,
            value: name,
            className: "",
            handleChange: (e) => handleComplexChange(idx, e)
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            name: "title",
            id: `filetitle${idx}`,
            value: title,
            className: "",
            handleChange: (e) => handleComplexChange(idx, e)
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs(
          SelectInput,
          {
            defaultValue: type,
            name: "type",
            id: `filetype${idx}`,
            className: "self-center",
            handleChange: (e) => handleComplexChange(idx, e),
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select…" }),
              /* @__PURE__ */ jsx("option", { value: "document", children: "Document" }),
              /* @__PURE__ */ jsx("option", { value: "slide", children: "Slide" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs(InputLabel2, { forInput: `fileData${idx}`, className: "flex items-center gap-1 pr-2 border rounded cursor-pointer border-slate-400", children: [
          /* @__PURE__ */ jsx(FileInput, { name: "fileData", id: `fileData${idx}`, className: "overflow-hidden w-0", handleChange: (e) => handleComplexChange(idx, e) }),
          /* @__PURE__ */ jsx(File, { className: "w-4" }),
          fileData ? fileData.name : "Choose File"
        ] }) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          SecondaryButton,
          {
            onClick: () => dispatch({
              type: "removeValue",
              idx
            }),
            className: "bg-red-200 before:content-['-'] before:pr-1 before:text-lg",
            children: "Remove Row"
          }
        ) })
      ] }, "filetable" + idx)) })
    ] })
  ] });
}
function Create$1() {
  const { errors } = usePage().props;
  const { data, setData, post, reset, processing } = useForm({
    date: "",
    heading: "",
    description: "",
    imageFile: null,
    showDetails: "0",
    content: [{
      title: "",
      externalUrl: "",
      duration: "",
      id: 0
    }],
    fileContent: []
  });
  const handleChange = (event) => {
    switch (event.target.name) {
      case "date":
      case "heading":
      case "description":
      case "showDetails":
        setData(event.target.name, event.target.value);
    }
  };
  const handleFileChange = (event) => {
    if (event.target.name === "imageFile" && event.target.files) {
      setData(event.target.name, event.target.files[0]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    post(route("events.step.past.store"));
  };
  useEffect(() => {
    reset();
  }, []);
  const setContent = (newContent) => {
    setData("content", [...newContent]);
  };
  const setFileContent = (newContent) => {
    setData("fileContent", [...newContent]);
  };
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs(ContentWrapper, { title: "Create New STEP event", children: [
    errors && Object.keys(errors).map(
      (key) => /* @__PURE__ */ jsx(ToastBanner, { message: errors[key] }, key)
    ),
    /* @__PURE__ */ jsxs("form", { method: "post", onSubmit: handleSubmit, className: "flex flex-col items-start gap-4 px-10 py-5 border w-fit", children: [
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Basic Information" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "date", value: "Date", required: true }),
          /* @__PURE__ */ jsx(TextInput, { type: "text", name: "date", id: "date", value: data.date, className: "", handleChange, required: true }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: '//Full month name and Year. E.g. "January 2023"' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "heading", value: "Heading", required: true }),
          /* @__PURE__ */ jsx(TextInput, { type: "text", name: "heading", id: "heading", value: data.heading, className: "", handleChange, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-start gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "description", value: "Description", required: true }),
          /* @__PURE__ */ jsx(TextAreaInput, { rows: 3, name: "description", id: "description", value: data.description, className: "w-1/2", handleChange, required: true })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-end gap-2", children: /* @__PURE__ */ jsxs("fieldset", { className: "inline-flex", children: [
          /* @__PURE__ */ jsx(Legend, { required: true, value: "Show Details" }),
          /* @__PURE__ */ jsxs(InputLabel2, { className: "mr-2", forInput: "true", children: [
            /* @__PURE__ */ jsx(RadioInput, { name: "showDetails", id: "true", value: "1", className: "", handleChange, checked: data.showDetails === "1" }),
            "Yes"
          ] }),
          /* @__PURE__ */ jsxs(InputLabel2, { forInput: "false", children: [
            /* @__PURE__ */ jsx(RadioInput, { name: "showDetails", id: "false", value: "0", className: "", handleChange, checked: data.showDetails === "0" }),
            "No"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "imageFile", value: "Thumbnail Image", required: true }),
          /* @__PURE__ */ jsx(FileInput, { name: "imageFile", id: "imageFile", className: "", handleChange: handleFileChange, required: true, accept: "image/*" })
        ] }),
        /* @__PURE__ */ jsx("img", { className: "w-60", src: data.imageFile ? URL.createObjectURL(data.imageFile) : "" })
      ] }),
      /* @__PURE__ */ jsx(VideoEditFormComponent, { videoContent: data.content, setContent, mode: "create" }),
      "                    ",
      /* @__PURE__ */ jsx(VideoFilesEditComponent, { fileContent: data.fileContent, setContent: setFileContent, mode: "create" }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex justify-center w-full gap-2 mt-5 md:justify-end", children: [
        /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: route("events.step.past.admin"), children: "Cancel" }),
        /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", className: "w-60", processing, children: "Create" })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create$1
}, Symbol.toStringTag, { value: "Module" }));
function Edit$1({ videoData }) {
  const { errors } = usePage().props;
  const { data, setData, post, reset, processing } = useForm({
    date: videoData.date,
    heading: videoData.heading,
    description: videoData.description,
    imageFile: videoData.imageFile,
    imageLink: videoData.imageLink,
    showDetails: videoData.showDetails,
    content: videoData.content ?? [],
    fileContent: videoData.fileContent ?? []
  });
  const handleChange = (event) => {
    switch (event.target.name) {
      case "date":
      case "heading":
      case "description":
      case "showDetails":
        setData(event.target.name, event.target.value);
    }
  };
  const handleFileChange = (event) => {
    if (event.target.name === "imageFile" && event.target.files) {
      setData(event.target.name, event.target.files[0]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    post(route("events.step.past.update", videoData.id));
  };
  const setContent = (newContent) => {
    setData("content", [...newContent]);
  };
  const setFileContent = (newContent) => {
    setData("fileContent", [...newContent]);
  };
  useEffect(() => {
    reset();
  }, []);
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs(ContentWrapper, { title: "Create New STEP event", children: [
    errors && Object.keys(errors).map(
      (key) => /* @__PURE__ */ jsx(ToastBanner, { message: errors[key] }, key)
    ),
    /* @__PURE__ */ jsxs("form", { method: "post", onSubmit: handleSubmit, className: "flex flex-col items-start gap-4 px-10 py-5 border w-fit", children: [
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Basic Information" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "date", value: "Date", required: true }),
          /* @__PURE__ */ jsx(TextInput, { type: "text", name: "date", id: "date", value: data.date, className: "", handleChange, required: true }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: '//Full month name and Year. E.g. "January 2023"' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "heading", value: "Heading", required: true }),
          /* @__PURE__ */ jsx(TextInput, { type: "text", name: "heading", id: "heading", value: data.heading, className: "", handleChange, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-end gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "description", value: "Description", required: true }),
          /* @__PURE__ */ jsx(TextInput, { type: "text", name: "description", id: "description", value: data.description, className: "", handleChange, required: true })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-end gap-2", children: /* @__PURE__ */ jsxs("fieldset", { className: "inline-flex", children: [
          /* @__PURE__ */ jsx(Legend, { required: true, value: "Show Details" }),
          /* @__PURE__ */ jsxs(InputLabel2, { className: "mr-2", forInput: "true", children: [
            /* @__PURE__ */ jsx(RadioInput, { name: "showDetails", id: "true", value: "1", className: "", handleChange, checked: data.showDetails === "1" }),
            "Yes"
          ] }),
          /* @__PURE__ */ jsxs(InputLabel2, { forInput: "false", children: [
            /* @__PURE__ */ jsx(RadioInput, { name: "showDetails", id: "false", value: "0", className: "", handleChange, checked: data.showDetails === "0" }),
            "No"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(InputLabel, { forInput: "imageFile", value: "Thumbnail Image" }),
          /* @__PURE__ */ jsx(FileInput, { name: "imageFile", id: "imageFile", className: "", handleChange: handleFileChange, accept: "image/png" })
        ] }),
        /* @__PURE__ */ jsx("img", { className: "w-60", src: data.imageFile ? URL.createObjectURL(data.imageFile) : data.imageLink })
      ] }),
      /* @__PURE__ */ jsx(VideoEditFormComponent, { videoContent: data.content, setContent }),
      /* @__PURE__ */ jsx(VideoFilesEditComponent, { fileContent: data.fileContent, setContent: setFileContent }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex justify-center w-full gap-2 mt-5 md:justify-end", children: [
        /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: route("events.step.past.admin"), children: "Cancel" }),
        /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", className: "w-60", processing, children: "Update" })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$1
}, Symbol.toStringTag, { value: "Module" }));
function StepEventCard({ id, heading, imageLink, description, routename = "", date, showDetails = "0" }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-between max-w-2xl gap-2 p-4 border-2 rounded-lg md:px-10 bg-stone-100 drop-shadow-md", children: [
    /* @__PURE__ */ jsx(Heading2Alt, { className: "capitalize", children: heading }),
    /* @__PURE__ */ jsx("img", { className: "object-cover h-64 aspect-video", src: imageLink, alt: "image thumbnail for STEP - " + heading }),
    /* @__PURE__ */ jsx("p", { className: "px-4 py-1 text-lg font-bold text-blue-900", children: date }),
    /* @__PURE__ */ jsx("p", { className: "mb-2 text-left text-gray-800", children: description }),
    showDetails === "1" && /* @__PURE__ */ jsx(ButtonLink, { Icon: ChevronRight, href: route("events.step.past.show", routename), children: "Watch Videos" })
  ] });
}
function Gallery({ content }) {
  const LatestEvent = () => {
    const firstEvent = content[0];
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center w-full", children: /* @__PURE__ */ jsx(StepEventCard, { id: firstEvent.id, heading: firstEvent.heading, imageLink: firstEvent.imageLink, description: firstEvent.description, date: firstEvent.date, showDetails: firstEvent.showDetails, routename: firstEvent.routename }) });
  };
  return /* @__PURE__ */ jsxs(StepWrapper, { heading: "Past Events", title: "Past Events", children: [
    /* @__PURE__ */ jsx("div", { className: "my-5", children: /* @__PURE__ */ jsx(LatestEvent, {}) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: content.slice(1).map(({ heading, imageLink, description, date, id, routename, showDetails }) => /* @__PURE__ */ jsx(StepEventCard, { id, heading, routename, imageLink, description, date, showDetails }, id)) })
  ] });
}
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gallery
}, Symbol.toStringTag, { value: "Module" }));
function VideoAdditionalFilesComponent({ worksheetFiles = [], slideFiles = [] }) {
  if (worksheetFiles.length === 0 && slideFiles.length === 0) {
    return;
  }
  return /* @__PURE__ */ jsxs("div", { className: "grid justify-start max-w-5xl grid-cols-1 gap-4 mx-auto my-5 text-left md:grid-cols-2 md:my-10", children: [
    worksheetFiles.length !== 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 md:gap-2 md:w-3/4", children: [
      /* @__PURE__ */ jsx(Heading3$1, { children: "Worksheets" }),
      worksheetFiles.map((file) => /* @__PURE__ */ jsx(LessonDownloadButton, { title: file.title, downloadLink: file.filePath }, file.title))
    ] }),
    slideFiles.length !== 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 md:gap-2 md:w-3/4", children: [
      /* @__PURE__ */ jsx(Heading3$1, { children: "Slides" }),
      slideFiles.map((file) => /* @__PURE__ */ jsx(LessonDownloadButton, { title: file.title, downloadLink: file.filePath }, file.title))
    ] })
  ] });
}
function Show$1({ videoData }) {
  var _a, _b;
  let worksheetFiles = (_a = videoData.fileContent) == null ? void 0 : _a.filter((fileData) => fileData.type === "document");
  let slideFiles = (_b = videoData.fileContent) == null ? void 0 : _b.filter((fileData) => fileData.type === "slide");
  return /* @__PURE__ */ jsxs(StepWrapper, { title: videoData.title, heading: videoData.date, children: [
    /* @__PURE__ */ jsx(VideoPlayerComponent, { title: videoData.title, imageLink: route("events.step.image", videoData.imageId), content: videoData.content }),
    /* @__PURE__ */ jsx(VideoAdditionalFilesComponent, { worksheetFiles, slideFiles }),
    /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: route("events.step.past.gallery"), children: "Back to All" }) })
  ] });
}
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Show$1
}, Symbol.toStringTag, { value: "Module" }));
const StepBanner = "/build/assets/step-current-banner-695a9a31.png";
function Signup() {
  const tableData = [
    {
      heading: "Topic",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { className: "font-normal", children: [
        "Book of ",
        /* @__PURE__ */ jsx("b", { children: "Nehemiah" })
      ] }) })
    },
    {
      heading: "Speaker",
      content: "Noel McMeekin"
    },
    {
      heading: "Dates",
      content: "13th June - 15th June, 2024"
    },
    {
      heading: "Cost",
      content: /* @__PURE__ */ jsxs("p", { className: "text-base", children: [
        "Standard - €65",
        /* @__PURE__ */ jsx("br", {}),
        "Student - €50"
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(StepWrapper, { heading: "Registration", title: "Sign Up", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center w-full gap-4 mb-8 md:flex-row", children: [
      /* @__PURE__ */ jsx(BasicTable, { tableData }),
      /* @__PURE__ */ jsx("img", { className: "h-64 md:h-72", src: StepBanner, alt: "Step June 2024 banner - Nehemiah" })
    ] }),
    /* @__PURE__ */ jsxs(ParagraphContainer, { children: [
      /* @__PURE__ */ jsx(Paragraph, { children: "Join us for the upcoming STEP in June 2024 where we go through the book of Nehemiah led by Noel McMeekin. We would encourage you to read/study chapters in the book of Nehemiah beforehand. As always, new faces are welcome!" }),
      /* @__PURE__ */ jsx(Paragraph, { children: "You can sign up using the form below. To cover the cost of your stay, the price for the weekend will be €65 for regular attendees and €50 for students. Please fill in the form first before making payment. You can either pay using your card by clicking the button below or at the venue when you arrive." }),
      /* @__PURE__ */ jsx(ButtonLink, { Icon: ChevronRight, href: route("payment.step"), children: "Make Payment" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-stretch justify-center my-10", children: /* @__PURE__ */ jsx("iframe", { className: "w-full md:w-3/4 max-w-7xl h-[35rem]", src: "https://docs.google.com/forms/d/e/1FAIpQLSfRva_FHWeXVNXSj3i-HItkQ997atTb1m-DY9AmAbo5t7wpoA/viewform?usp=sf_link", children: "Loading…" }) })
  ] });
}
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Signup
}, Symbol.toStringTag, { value: "Module" }));
function InputError({ message = "", className = "" }) {
  return message ? /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 " + className, children: message }) : null;
}
function ContactUsForm() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    contactName: "",
    contactEmail: "",
    contactDescription: ""
  });
  useEffect(() => {
    reset();
  }, []);
  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
      case "contactName":
      case "contactEmail":
      case "contactDescription":
        setData(event.target.name, event.target.value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    post(route("contactus.store"));
  };
  return /* @__PURE__ */ jsx("div", { className: "block pt-4 text-left bg-white", children: /* @__PURE__ */ jsxs("form", { name: "contactUsForm", "aria-label": "Contact us form", onSubmit: handleSubmit, method: "post", className: "max-w-screen-md", children: [
    /* @__PURE__ */ jsx(TextInput, { id: "name", type: "hidden", name: "name", value: data.name, className: "", autoComplete: "off", handleChange }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-2", children: [
      /* @__PURE__ */ jsx(InputLabel, { className: "text-center basis-1/4", forInput: "contactName", value: "Name", required: true }),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "contactName",
          type: "text",
          name: "contactName",
          value: data.contactName,
          className: "basis-3/4",
          autoComplete: "off",
          handleChange,
          required: true
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.contactName, className: "mt-2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-2", children: [
      /* @__PURE__ */ jsx(InputLabel, { className: "text-center basis-1/4", forInput: "contactEmail", value: "Email", required: true }),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "contactEmail",
          type: "email",
          name: "contactEmail",
          value: data.contactEmail,
          className: "basis-3/4",
          autoComplete: "email",
          handleChange,
          required: true
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.contactEmail, className: "mt-2" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 mb-2", children: [
      /* @__PURE__ */ jsx(InputLabel, { className: "text-center basis-1/4", forInput: "contactDescription", value: "Message", required: true }),
      /* @__PURE__ */ jsx(
        TextAreaInput,
        {
          id: "contactDescription",
          name: "contactDescription",
          value: data.contactDescription,
          className: "w-full basis-3/4",
          rows: 4,
          handleChange,
          required: true
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.contactDescription, className: "mt-2" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "inline-flex justify-end w-full mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", className: "w-1/3 md:w-1/4", processing, children: "Submit" }) })
  ] }) });
}
function ContactUsComponent() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-around px-4 md:px-0 md:flex-row md:items-centre", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-lg text-left", children: [
      /* @__PURE__ */ jsxs(Paragraph, { className: "md:text-lg", children: [
        "Don't hesitate to reach out and contact Postal Bible School. ",
        /* @__PURE__ */ jsx("br", {}),
        "We would be happy to assist you and answer any questions you might have."
      ] }),
      /* @__PURE__ */ jsx(ContactUsForm, {})
    ] }),
    /* @__PURE__ */ jsxs("address", { className: "flex flex-col max-w-md gap-6 p-6 text-gray-700 rounded-md shadow-lg md:p-10 md:my-auto h-fit md:gap-8 md:text-lg lg:text-xl bg-sky-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-5", children: [
        /* @__PURE__ */ jsx(Location, { className: "h-[50px] w-[50px] text-slate-600" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
          /* @__PURE__ */ jsx("p", { children: "5 Cavan Street" }),
          /* @__PURE__ */ jsx("p", { children: "Cootehill, Co. Cavan" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-5", children: [
        /* @__PURE__ */ jsx(Phone, { className: "h-[50px] w-[50px] text-slate-600" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
          /* @__PURE__ */ jsx("a", { href: "tel:+353495552915", children: "049 5552915" }),
          /* @__PURE__ */ jsx("a", { href: "tel:00353495552915", children: "0035349 5552915 (International)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-5", children: [
        /* @__PURE__ */ jsx(Envelope, { className: "h-[50px] w-[50px] text-slate-600" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start", children: /* @__PURE__ */ jsx("a", { href: "mailto:info@postalbibleschool.ie", children: "info@postalbibleschool.ie" }) })
      ] })
    ] })
  ] });
}
function ContactUs() {
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsx(ContentWrapper, { title: "Contact Us", children: /* @__PURE__ */ jsx(ContactUsComponent, {}) }) });
}
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContactUs
}, Symbol.toStringTag, { value: "Module" }));
const AF = [
  "Afghanistan",
  "AF",
  [
    ["Badakhshan", "BDS"],
    ["Badghis", "BDG"],
    ["Baghlan", "BGL"],
    ["Balkh", "BAL"],
    ["Bamyan", "BAM"],
    ["Daykundi", "DAY"],
    ["Farah", "FRA"],
    ["Faryab", "FYB"],
    ["Ghazni", "GHA"],
    ["Ghor", "GHO"],
    ["Helmand", "HEL"],
    ["Herat", "HER"],
    ["Jowzjan", "JOW"],
    ["Kabul", "KAB"],
    ["Kandahar", "KAN"],
    ["Kapisa", "KAP"],
    ["Khost", "KHO"],
    ["Kunar", "KNR"],
    ["Kunduz", "KDZ"],
    ["Laghman", "LAG"],
    ["Logar", "LOW"],
    ["Maidan Wardak", "WAR"],
    ["Nangarhar", "NAN"],
    ["Nimruz", "NIM"],
    ["Nuristan", "NUR"],
    ["Paktia", "PIA"],
    ["Paktika", "PKA"],
    ["Panjshir", "PAN"],
    ["Parwan", "PAR"],
    ["Samangan", "SAM"],
    ["Sar-e Pol", "SAR"],
    ["Takhar", "TAK"],
    ["Urozgan", "ORU"],
    ["Zabul", "ZAB"]
  ]
];
const AX = [
  "Åland Islands",
  "AX",
  [
    ["Brändö", "BR"],
    ["Eckerö", "EC"],
    ["Finström", "FN"],
    ["Föglö", "FG"],
    ["Geta", "GT"],
    ["Hammarland", "HM"],
    ["Jomala", "JM"],
    ["Kumlinge", "KM"],
    ["Kökar", "KK"],
    ["Lemland", "LE"],
    ["Lumparland", "LU"],
    ["Mariehamn", "MH"],
    ["Saltvik", "SV"],
    ["Sottunga", "ST"],
    ["Sund", "SD"],
    ["Vårdö", "VR"]
  ]
];
const AL = [
  "Albania",
  "AL",
  [
    ["Berat", "01"],
    ["Dibër", "09"],
    ["Durrës", "02"],
    ["Elbasan", "03"],
    ["Fier", "04"],
    ["Gjirokastër", "05"],
    ["Korçë", "06"],
    ["Kukës", "07"],
    ["Lezhë", "08"],
    ["Shkodër", "10"],
    ["Tirana", "11"],
    ["Vlorë", "12"]
  ]
];
const DZ = [
  "Algeria",
  "DZ",
  [
    ["Adrar", "01"],
    ["Aïn Defla", "44"],
    ["Aïn Témouchent", "46"],
    ["Algiers", "16"],
    ["Annaba", "23"],
    ["Batna", "05"],
    ["Béchar", "08"],
    ["Béjaïa", "06"],
    ["Biskra", "07"],
    ["Blida", "09"],
    ["Bordj Bou Arréridj", "34"],
    ["Bouïra", "10"],
    ["Boumerdès", "35"],
    ["Chlef", "02"],
    ["Constantine", "25"],
    ["Djelfa", "17"],
    ["El Bayadh", "32"],
    ["El Oued", "39"],
    ["El Tarf", "36"],
    ["Ghardaïa", "47"],
    ["Guelma", "24"],
    ["Illizi", "33"],
    ["Jijel", "18"],
    ["Khenchela", "40"],
    ["Laghouat", "03"],
    ["Mascara", "29"],
    ["Médéa", "26"],
    ["Mila", "43"],
    ["Mostaganem", "27"],
    ["Msila", "28"],
    ["Naâma", "45"],
    ["Oran", "31"],
    ["Ouargla", "30"],
    ["Oum el Bouaghi", "04"],
    ["Relizane", "48"],
    ["Saïda", "20"],
    ["Sétif", "19"],
    ["Sidi Bel Abbès", "22"],
    ["Skikda", "21"],
    ["Souk Ahras", "41"],
    ["Tamanghasset", "11"],
    ["Tébessa", "12"],
    ["Tiaret", "14"],
    ["Tindouf", "37"],
    ["Tipaza", "42"],
    ["Tissemsilt", "38"],
    ["Tizi Ouzou", "15"],
    ["Tlemcen", "13"]
  ]
];
const AS = [
  "American Samoa",
  "AS",
  [
    ["Tutuila", "01"],
    ["Aunu'u", "02"],
    ["Ta'ū", "03"],
    ["Ofu‑Olosega", "04"],
    ["Rose Atoll", "21"],
    ["Swains Island", "22"]
  ]
];
const AD = [
  "Andorra",
  "AD",
  [
    ["Andorra la Vella", "07"],
    ["Canillo", "02"],
    ["Encamp", "03"],
    ["Escaldes-Engordany", "08"],
    ["La Massana", "04"],
    ["Ordino", "05"],
    ["Sant Julià de Lòria", "06"]
  ]
];
const AO = [
  "Angola",
  "AO",
  [
    ["Bengo", "BGO"],
    ["Benguela", "BGU"],
    ["Bié", "BIE"],
    ["Cabinda", "CAB"],
    ["Cuando Cubango", "CCU"],
    ["Cuanza Norte", "CNO"],
    ["Cuanza Sul", "CUS"],
    ["Cunene", "CNN"],
    ["Huambo", "HUA"],
    ["Huíla", "HUI"],
    ["Luanda", "LUA"],
    ["Lunda Norte", "LNO"],
    ["Lunda Sul", "LSU"],
    ["Malanje", "MAL"],
    ["Moxico", "MOX"],
    ["Namibe", "NAM"],
    ["Uíge", "UIG"],
    ["Zaire", "ZAI"]
  ]
];
const AI = [
  "Anguilla",
  "AI",
  [
    ["Anguilla", "01"],
    ["Anguillita Island", "02"],
    ["Blowing Rock", "03"],
    ["Cove Cay", "04"],
    ["Crocus Cay", "05"],
    ["Deadman's Cay", "06"],
    ["Dog Island", "07"],
    ["East Cay", "08"],
    ["Little Island", "09"],
    ["Little Scrub Island", "10"],
    ["Mid Cay", "11"],
    ["North Cay", "12"],
    ["Prickly Pear Cays", "13"],
    ["Rabbit Island", "14"],
    ["Sandy Island/Sand Island", "15"],
    ["Scilly Cay", "16"],
    ["Scrub Island", "17"],
    ["Seal Island", "18"],
    ["Sombrero/Hat Island", "19"],
    ["South Cay", "20"],
    ["South Wager Island", "21"],
    ["West Cay", "22"]
  ]
];
const AQ = [
  "Antarctica",
  "AQ",
  [
    ["Antarctica", "AQ"]
  ]
];
const AG = [
  "Antigua and Barbuda",
  "AG",
  [
    ["Antigua Island", "01"],
    ["Barbuda Island", "02"],
    ["Bird Island", "04"],
    ["Bishop Island", "05"],
    ["Blake Island", "06"],
    ["Crump Island", "09"],
    ["Dulcina Island", "10"],
    ["Exchange Island", "11"],
    ["Five Islands", "12"],
    ["Great Bird Island", "13"],
    ["Green Island", "14"],
    ["Guiana Island", "15"],
    ["Hawes Island", "17"],
    ["Hells Gate Island", "16"],
    ["Henry Island", "18"],
    ["Johnson Island", "19"],
    ["Kid Island", "20"],
    ["Lobster Island", "22"],
    ["Maiden Island", "24"],
    ["Moor Island", "25"],
    ["Nanny Island", "26"],
    ["Pelican Island", "27"],
    ["Prickly Pear Island", "28"],
    ["Rabbit Island", "29"],
    ["Red Head Island", "31"],
    ["Redonda Island", "03"],
    ["Sandy Island", "32"],
    ["Smith Island", "33"],
    ["The Sisters", "34"],
    ["Vernon Island", "35"],
    ["Wicked Will Island", "36"],
    ["York Island", "37"]
  ]
];
const AR = [
  "Argentina",
  "AR",
  [
    ["Buenos Aires", "B"],
    ["Capital Federal", "C"],
    ["Catamarca", "K"],
    ["Chaco", "H"],
    ["Chubut", "U"],
    ["Córdoba", "X"],
    ["Corrientes", "W"],
    ["Entre Ríos", "E"],
    ["Formosa", "P"],
    ["Jujuy", "Y"],
    ["La Pampa", "L"],
    ["La Rioja", "F"],
    ["Mendoza", "M"],
    ["Misiones", "N"],
    ["Neuquén", "Q"],
    ["Río Negro", "R"],
    ["Salta", "A"],
    ["San Juan", "J"],
    ["San Luis", "D"],
    ["Santa Cruz", "Z"],
    ["Santa Fe", "S"],
    ["Santiago del Estero", "G"],
    ["Tierra del Fuego", "V"],
    ["Tucumán", "T"]
  ]
];
const AM = [
  "Armenia",
  "AM",
  [
    ["Aragatsotn", "AG"],
    ["Ararat", "AR"],
    ["Armavir", "AV"],
    ["Gegharkunik", "GR"],
    ["Kotayk", "KT"],
    ["Lori", "LO"],
    ["Shirak", "SH"],
    ["Syunik", "SU"],
    ["Tavush", "TV"],
    ["Vayots Dzor", "VD"],
    ["Yerevan", "ER"]
  ]
];
const AW = [
  "Aruba",
  "AW",
  [
    ["Aruba", "AW"]
  ]
];
const AU = [
  "Australia",
  "AU",
  [
    ["Australian Capital Territory", "ACT"],
    ["New South Wales", "NSW"],
    ["Northern Territory", "NT"],
    ["Queensland", "QLD"],
    ["South Australia", "SA"],
    ["Tasmania", "TAS"],
    ["Victoria", "VIC"],
    ["Western Australia", "WA"]
  ]
];
const AT = [
  "Austria",
  "AT",
  [
    ["Burgenland", "1"],
    ["Kärnten", "2"],
    ["Niederösterreich", "3"],
    ["Oberösterreich", "4"],
    ["Salzburg", "5"],
    ["Steiermark", "6"],
    ["Tirol", "7"],
    ["Vorarlberg", "8"],
    ["Wien", "9"]
  ]
];
const AZ = [
  "Azerbaijan",
  "AZ",
  [
    ["Abşeron", "ABS"],
    ["Ağcabədi", "AGC"],
    ["Ağdam", "AGM"],
    ["Ağdaş", "AGS"],
    ["Ağstafa", "AGA"],
    ["Ağsu", "AGU"],
    ["Astara", "AST"],
    ["Bakı", "BAK"],
    ["Babək", "BAB"],
    ["Balakən", "BAL"],
    ["Bərdə", "BAR"],
    ["Beyləqan", "BEY"],
    ["Biləsuvar", "BIL"],
    ["Cəbrayıl", "CAB"],
    ["Cəlilabad", "CAL"],
    ["Culfa", "CUL"],
    ["Daşkəsən", "DAS"],
    ["Füzuli", "FUZ"],
    ["Gədəbəy", "GAD"],
    ["Goranboy", "GOR"],
    ["Göyçay", "GOY"],
    ["Göygöl", "GYG"],
    ["Hacıqabul", "HAC"],
    ["İmişli", "IMI"],
    ["İsmayıllı", "ISM"],
    ["Kəlbəcər", "KAL"],
    ["Kǝngǝrli", "KAN"],
    ["Kürdəmir", "KUR"],
    ["Laçın", "LAC"],
    ["Lənkəran", "LAN"],
    ["Lerik", "LER"],
    ["Masallı", "MAS"],
    ["Neftçala", "NEF"],
    ["Oğuz", "OGU"],
    ["Ordubad", "ORD"],
    ["Qəbələ", "QAB"],
    ["Qax", "QAX"],
    ["Qazax", "QAZ"],
    ["Qobustan", "QOB"],
    ["Quba", "QBA"],
    ["Qubadli", "QBI"],
    ["Qusar", "QUS"],
    ["Saatlı", "SAT"],
    ["Sabirabad", "SAB"],
    ["Şabran", "SBN"],
    ["Sədərək", "SAD"],
    ["Şahbuz", "SAH"],
    ["Şəki", "SAK"],
    ["Salyan", "SAL"],
    ["Şamaxı", "SMI"],
    ["Şəmkir", "SKR"],
    ["Samux", "SMX"],
    ["Şərur", "SAR"],
    ["Siyəzən", "SIY"],
    ["Şuşa", "SUS"],
    ["Tərtər", "TAR"],
    ["Tovuz", "TOV"],
    ["Ucar", "UCA"],
    ["Xaçmaz", "XAC"],
    ["Xızı", "XIZ"],
    ["Xocalı", "XCI"],
    ["Xocavənd", "XVD"],
    ["Yardımlı", "YAR"],
    ["Yevlax", "YEV"],
    ["Zəngilan", "ZAN"],
    ["Zaqatala", "ZAQ"],
    ["Zərdab", "ZAR"]
  ]
];
const BS = [
  "Bahamas",
  "BS",
  [
    ["Acklins Island", "01"],
    ["Berry Islands", "22"],
    ["Bimini", "02"],
    ["Black Point", "23"],
    ["Cat Island", "03"],
    ["Central Abaco", "24"],
    ["Crooked Island and Long Cay", "28"],
    ["East Grand Bahama", "29"],
    ["Exuma", "04"],
    ["Freeport", "05"],
    ["Fresh Creek", "06"],
    ["Governor's Harbour", "07"],
    ["Green Turtle Cay", "08"],
    ["Harbour Island", "09"],
    ["High Rock", "10"],
    ["Inagua", "11"],
    ["Kemps Bay", "12"],
    ["Long Island", "13"],
    ["Marsh Harbour", "14"],
    ["Mayaguana", "15"],
    ["Moore’s Island", "40"],
    ["New Providence", "16"],
    ["Nichollstown and Berry Islands", "17"],
    ["North Abaco", "42"],
    ["North Andros", "41"],
    ["North Eleuthera", "33"],
    ["Ragged Island", "18"],
    ["Rock Sound", "19"],
    ["San Salvador and Rum Cay", "20"],
    ["Sandy Point", "21"],
    ["South Abaco", "35"],
    ["South Andros", "36"],
    ["South Eleuthera", "37"],
    ["West Grand Bahama", "39"]
  ]
];
const BH = [
  "Bahrain",
  "BH",
  [
    ["Al Janūbīyah", "14"],
    ["Al Manāmah", "13"],
    ["Al Muḩarraq", "15"],
    ["Al Wusţá", "16"],
    ["Ash Shamālīyah", "17"]
  ]
];
const BD = [
  "Bangladesh",
  "BD",
  [
    ["Barisal", "A"],
    ["Chittagong", "B"],
    ["Dhaka", "C"],
    ["Khulna", "D"],
    ["Mymensingh", "M"],
    ["Rajshahi", "E"],
    ["Rangpur", "F"],
    ["Sylhet", "G"]
  ]
];
const BB = [
  "Barbados",
  "BB",
  [
    ["Christ Church", "01"],
    ["Saint Andrew", "02"],
    ["Saint George", "03"],
    ["Saint James", "04"],
    ["Saint John", "05"],
    ["Saint Joseph", "06"],
    ["Saint Lucy", "07"],
    ["Saint Michael", "08"],
    ["Saint Peter", "09"],
    ["Saint Philip", "10"],
    ["Saint Thomas", "11"]
  ]
];
const BY = [
  "Belarus",
  "BY",
  [
    ["Brest voblast", "BR"],
    ["Gorod Minsk", "HM"],
    ["Homiel voblast", "HO"],
    ["Hrodna voblast", "HR"],
    ["Mahilyow voblast", "MA"],
    ["Minsk voblast", "MI"],
    ["Vitsebsk voblast", "VI"]
  ]
];
const BE = [
  "Belgium",
  "BE",
  [
    ["Brussels", "BRU"],
    ["Flanders", "VLG"],
    ["Wallonia", "WAL"]
  ]
];
const BZ = [
  "Belize",
  "BZ",
  [
    ["Belize District", "BZ"],
    ["Cayo District", "CY"],
    ["Corozal District", "CZL"],
    ["Orange Walk District", "OW"],
    ["Stann Creek District", "SC"],
    ["Toledo District", "TOL"]
  ]
];
const BJ = [
  "Benin",
  "BJ",
  [
    ["Alibori", "AL"],
    ["Atakora", "AK"],
    ["Atlantique", "AQ"],
    ["Borgou", "BO"],
    ["Collines Department", "CO"],
    ["Donga", "DO"],
    ["Kouffo", "KO"],
    ["Littoral Department", "LI"],
    ["Mono Department", "MO"],
    ["Ouémé", "OU"],
    ["Plateau", "PL"],
    ["Zou", "ZO"]
  ]
];
const BM = [
  "Bermuda",
  "BM",
  [
    ["City of Hamilton", "03"],
    ["Devonshire Parish", "01"],
    ["Hamilton Parish", "02"],
    ["Paget Parish", "04"],
    ["Pembroke Parish", "05"],
    ["Sandys Parish", "08"],
    ["Smith's Parish", "09"],
    ["Southampton Parish", "10"],
    ["St. George's Parish", "07"],
    ["Town of St. George", "06"],
    ["Warwick Parish", "11"]
  ]
];
const BT = [
  "Bhutan",
  "BT",
  [
    ["Bumthang", "33"],
    ["Chhukha", "12"],
    ["Dagana", "22"],
    ["Gasa", "GA"],
    ["Haa", "13"],
    ["Lhuntse", "44"],
    ["Mongar", "42"],
    ["Paro", "11"],
    ["Pemagatshel", "43"],
    ["Punakha", "23"],
    ["Samdrup Jongkhar", "45"],
    ["Samtse", "14"],
    ["Sarpang", "31"],
    ["Thimphu", "15"],
    ["Trashigang", "41"],
    ["Trashiyangtse", "TY"],
    ["Trongsa", "32"],
    ["Tsirang", "21"],
    ["Wangdue Phodrang", "24"],
    ["Zhemgang", "34"]
  ]
];
const BO = [
  "Bolivia",
  "BO",
  [
    ["Beni", "BE"],
    ["Chuquisaca", "CH"],
    ["Cochabamba", "CB"],
    ["La Paz", "LP"],
    ["Oruro", "OR"],
    ["Pando", "PD"],
    ["Potosí", "PT"],
    ["Santa Cruz", "SC"],
    ["Tarija", "TJ"]
  ]
];
const BQ = [
  "Bonaire, Sint Eustatius and Saba",
  "BQ",
  [
    ["Bonaire", "BO"],
    ["Saba Isand", "SA"],
    ["Sint Eustatius", "SE"]
  ]
];
const BA = [
  "Bosnia and Herzegovina",
  "BA",
  [
    ["Brčko Distrikt", "BRC"],
    ["Federacija Bosne i Hercegovine", "BIH"],
    ["Republika Srpska", "SRP"]
  ]
];
const BW = [
  "Botswana",
  "BW",
  [
    ["Central", "CE"],
    ["Ghanzi", "GH"],
    ["Kgalagadi", "KG"],
    ["Kgatleng", "KL"],
    ["Kweneng", "KW"],
    ["North West", "NW"],
    ["North-East", "NE"],
    ["South East", "SE"],
    ["Southern", "SO"]
  ]
];
const BV = [
  "Bouvet Island",
  "BV",
  [
    ["Bouvet Island", "BV"]
  ]
];
const BR = [
  "Brazil",
  "BR",
  [
    ["Acre", "AC"],
    ["Alagoas", "AL"],
    ["Amapá", "AP"],
    ["Amazonas", "AM"],
    ["Bahia", "BA"],
    ["Ceará", "CE"],
    ["Distrito Federal", "DF"],
    ["Espírito Santo", "ES"],
    ["Goiás", "GO"],
    ["Maranhão", "MA"],
    ["Mato Grosso", "MT"],
    ["Mato Grosso do Sul", "MS"],
    ["Minas Gerais", "MG"],
    ["Pará", "PA"],
    ["Paraíba", "PB"],
    ["Paraná", "PR"],
    ["Pernambuco", "PE"],
    ["Piauí", "PI"],
    ["Rio de Janeiro", "RJ"],
    ["Rio Grande do Norte", "RN"],
    ["Rio Grande do Sul", "RS"],
    ["Rondônia", "RO"],
    ["Roraima", "RR"],
    ["Santa Catarina", "SC"],
    ["São Paulo", "SP"],
    ["Sergipe", "SE"],
    ["Tocantins", "TO"]
  ]
];
const IO = [
  "British Indian Ocean Territory",
  "IO",
  [
    ["British Indian Ocean Territory", "IO"]
  ]
];
const BN = [
  "Brunei Darussalam",
  "BN",
  [
    ["Belait", "BE"],
    ["Brunei Muara", "BM"],
    ["Temburong", "TE"],
    ["Tutong", "TU"]
  ]
];
const BG = [
  "Bulgaria",
  "BG",
  [
    ["Blagoevgrad", "01"],
    ["Burgas", "02"],
    ["Dobrich", "08"],
    ["Gabrovo", "07"],
    ["Jambol", "28"],
    ["Khaskovo", "26"],
    ["Kjustendil", "10"],
    ["Kurdzhali", "09"],
    ["Lovech", "11"],
    ["Montana", "12"],
    ["Pazardzhik", "13"],
    ["Pernik", "14"],
    ["Pleven", "15"],
    ["Plovdiv", "16"],
    ["Razgrad", "17"],
    ["Ruse", "18"],
    ["Shumen", "27"],
    ["Silistra", "19"],
    ["Sliven", "20"],
    ["Smoljan", "21"],
    ["Sofija", "23"],
    ["Sofija-Grad", "22"],
    ["Stara Zagora", "24"],
    ["Turgovishhe", "25"],
    ["Varna", "03"],
    ["Veliko Turnovo", "04"],
    ["Vidin", "05"],
    ["Vraca", "06"]
  ]
];
const BF = [
  "Burkina Faso",
  "BF",
  [
    ["Balé", "BAL"],
    ["Bam/Lake Bam", "BAM"],
    ["Banwa Province", "BAN"],
    ["Bazèga", "BAZ"],
    ["Bougouriba", "BGR"],
    ["Boulgou Province", "BLG"],
    ["Boulkiemdé", "BLK"],
    ["Comoé/Komoe", "COM"],
    ["Ganzourgou Province", "GAN"],
    ["Gnagna", "GNA"],
    ["Gourma Province", "GOU"],
    ["Houet", "HOU"],
    ["Ioba", "IOB"],
    ["Kadiogo", "KAD"],
    ["Kénédougou", "KEN"],
    ["Komondjari", "KMD"],
    ["Kompienga", "KMP"],
    ["Kossi Province", "KOS"],
    ["Koulpélogo", "KOP"],
    ["Kouritenga", "KOT"],
    ["Kourwéogo", "KOW"],
    ["Léraba", "LER"],
    ["Loroum", "LOR"],
    ["Mouhoun", "MOU"],
    ["Namentenga", "NAM"],
    ["Naouri/Nahouri", "NAO"],
    ["Nayala", "NAY"],
    ["Noumbiel", "NOU"],
    ["Oubritenga", "OUB"],
    ["Oudalan", "OUD"],
    ["Passoré", "PAS"],
    ["Poni", "PON"],
    ["Sanguié", "SNG"],
    ["Sanmatenga", "SMT"],
    ["Séno", "SEN"],
    ["Sissili", "SIS"],
    ["Soum", "SOM"],
    ["Sourou", "SOR"],
    ["Tapoa", "TAP"],
    ["Tui/Tuy", "TUI"],
    ["Yagha", "YAG"],
    ["Yatenga", "YAT"],
    ["Ziro", "ZIR"],
    ["Zondoma", "ZON"],
    ["Zoundwéogo", "ZOU"]
  ]
];
const BI = [
  "Burundi",
  "BI",
  [
    ["Bubanza", "BB"],
    ["Bujumbura Mairie", "BM"],
    ["Bujumbura Rural", "BL"],
    ["Bururi", "BR"],
    ["Cankuzo", "CA"],
    ["Cibitoke", "CI"],
    ["Gitega", "GI"],
    ["Karuzi", "KR"],
    ["Kayanza", "KY"],
    ["Kirundo", "KI"],
    ["Makamba", "MA"],
    ["Muramvya", "MU"],
    ["Muyinga", "MY"],
    ["Mwaro", "MW"],
    ["Ngozi", "NG"],
    ["Rutana", "RT"],
    ["Ruyigi", "RY"]
  ]
];
const KH = [
  "Cambodia",
  "KH",
  [
    ["Baat Dambang", "2"],
    ["Banteay Mean Chey", "1"],
    ["Kampong Chaam", "3"],
    ["Kampong Chhnang", "4"],
    ["Kampong Spueu", "5"],
    ["Kampong Thum", "6"],
    ["Kampot", "7"],
    ["Kandaal", "8"],
    ["Kaoh Kong", "9"],
    ["Kracheh", "10"],
    ["Krong Kaeb", "23"],
    ["Krong Pailin", "24"],
    ["Krong Preah Sihanouk", "18"],
    ["Mondol Kiri", "11"],
    ["Otdar Mean Chey", "22"],
    ["Phnom Penh", "12"],
    ["Pousaat", "15"],
    ["Preah Vihear", "13"],
    ["Prey Veaeng", "14"],
    ["Rotanah Kiri", "16"],
    ["Siem Reab", "17"],
    ["Stueng Treng", "19"],
    ["Svaay Rieng", "20"],
    ["Taakaev", "21"],
    ["Tbong Khmum", "25"]
  ]
];
const CM = [
  "Cameroon",
  "CM",
  [
    ["Adamaoua", "AD"],
    ["Centre", "CE"],
    ["Est", "ES"],
    ["Extrême-Nord", "EN"],
    ["Littoral", "LT"],
    ["Nord", "NO"],
    ["Nord-Ouest", "NW"],
    ["Ouest", "OU"],
    ["Sud", "SU"],
    ["Sud-Ouest", "SW"]
  ]
];
const CA = [
  "Canada",
  "CA",
  [
    ["Alberta", "AB"],
    ["British Columbia", "BC"],
    ["Manitoba", "MB"],
    ["New Brunswick", "NB"],
    ["Newfoundland and Labrador", "NL"],
    ["Northwest Territories", "NT"],
    ["Nova Scotia", "NS"],
    ["Nunavut", "NU"],
    ["Ontario", "ON"],
    ["Prince Edward Island", "PE"],
    ["Quebec", "QC"],
    ["Saskatchewan", "SK"],
    ["Yukon", "YT"]
  ]
];
const CV = [
  "Cape Verde",
  "CV",
  [
    ["Boa Vista", "BV"],
    ["Brava", "BR"],
    ["Calheta de São Miguel", "CS"],
    ["Maio", "MA"],
    ["Mosteiros", "MO"],
    ["Paúl", "PA"],
    ["Porto Novo", "PN"],
    ["Praia", "PR"],
    ["Ribeira Brava", "RB"],
    ["Ribeira Grande", "RG"],
    ["Sal", "SL"],
    ["Santa Catarina", "CA"],
    ["Santa Cruz", "CR"],
    ["São Domingos", "SD"],
    ["São Filipe", "SF"],
    ["São Nicolau", "SN"],
    ["São Vicente", "SV"],
    ["Tarrafal", "TA"],
    ["Tarrafal de São Nicolau", "TS"]
  ]
];
const KY = [
  "Cayman Islands",
  "KY",
  [
    ["Creek", "undefined"],
    ["Eastern", "undefined"],
    ["Midland", "undefined"],
    ["South Town", "undefined"],
    ["Spot Bay", "undefined"],
    ["Stake Bay", "undefined"],
    ["West End", "undefined"],
    ["Western", "undefined"]
  ]
];
const CF = [
  "Central African Republic",
  "CF",
  [
    ["Bamingui-Bangoran", "BB"],
    ["Bangui", "BGF"],
    ["Basse-Kotto", "BK"],
    ["Haute-Kotto", "HK"],
    ["Haut-Mbomou", "HM"],
    ["Kémo", "KG"],
    ["Lobaye", "LB"],
    ["Mambéré-Kadéï", "HS"],
    ["Mbomou", "MB"],
    ["Nana-Grebizi", "10"],
    ["Nana-Mambéré", "NM"],
    ["Ombella-M'Poko", "MP"],
    ["Ouaka", "UK"],
    ["Ouham", "AC"],
    ["Ouham Péndé", "OP"],
    ["Sangha-Mbaéré", "SE"],
    ["Vakaga", "VK"]
  ]
];
const TD = [
  "Chad",
  "TD",
  [
    ["Bahr el Ghazal", "BG"],
    ["Batha", "BA"],
    ["Borkou", "BO"],
    ["Chari-Baguirmi", "CB"],
    ["Ennedi-Est", "EE"],
    ["Ennedi-Ouest", "EO"],
    ["Guéra", "GR"],
    ["Hadjer Lamis", "HL"],
    ["Kanem", "KA"],
    ["Lac", "LC"],
    ["Logone Occidental", "LO"],
    ["Logone Oriental", "LR"],
    ["Mondoul", "MA"],
    ["Mayo-Kébbi-Est", "ME"],
    ["Moyen-Chari", "MC"],
    ["Ouaddai", "OD"],
    ["Salamat", "SA"],
    ["Sila", "SI"],
    ["Tandjilé", "TA"],
    ["Tibesti", "TI"],
    ["Ville de Ndjamena", "ND"],
    ["Wadi Fira", "WF"]
  ]
];
const CL = [
  "Chile",
  "CL",
  [
    ["Aisén del General Carlos Ibáñez del Campo", "AI"],
    ["Antofagasta", "AN"],
    ["Araucanía", "AR"],
    ["Arica y Parinacota", "AP"],
    ["Atacama", "AT"],
    ["Bío-Bío", "BI"],
    ["Coquimbo", "CO"],
    ["Libertador General Bernardo O'Higgins", "LI"],
    ["Los Lagos", "LL"],
    ["Los Ríos", "LR"],
    ["Magallanes y Antartica Chilena", "MA"],
    ["Marga-Marga", ""],
    ["Maule", "ML"],
    ["Ñuble", "NB"],
    ["Región Metropolitana de Santiago", "RM"],
    ["Tarapacá", "TA"],
    ["Valparaíso", "VS"]
  ]
];
const CN = [
  "China",
  "CN",
  [
    ["Anhui", "AH"],
    ["Beijing", "BJ"],
    ["Chongqing", "CQ"],
    ["Fujian", "FJ"],
    ["Gansu", "GS"],
    ["Guangdong", "GD"],
    ["Guangxi", "GX"],
    ["Guizhou", "GZ"],
    ["Hainan", "HI"],
    ["Hebei", "HE"],
    ["Heilongjiang", "HL"],
    ["Henan", "HA"],
    ["Hong Kong", "HK"],
    ["Hubei", "HB"],
    ["Hunan", "HN"],
    ["Inner Mongolia", "NM"],
    ["Jiangsu", "JS"],
    ["Jiangxi", "JX"],
    ["Jilin", "JL"],
    ["Liaoning", "LN"],
    ["Macau", "MO"],
    ["Ningxia", "NX"],
    ["Qinghai", "QH"],
    ["Shaanxi", "SN"],
    ["Shandong", "SD"],
    ["Shanghai", "SH"],
    ["Shanxi", "SX"],
    ["Sichuan", "SC"],
    ["Tianjin", "TJ"],
    ["Tibet", "XZ"],
    ["Xinjiang", "XJ"],
    ["Yunnan", "YN"],
    ["Zhejiang", "ZJ"]
  ]
];
const CX = [
  "Christmas Island",
  "CX",
  [
    ["Christmas Island", "CX"]
  ]
];
const CC = [
  "Cocos (Keeling) Islands",
  "CC",
  [
    ["Direction Island", "DI"],
    ["Home Island", "HM"],
    ["Horsburgh Island", "HR"],
    ["North Keeling Island", "NK"],
    ["South Island", "SI"],
    ["West Island", "WI"]
  ]
];
const CO = [
  "Colombia",
  "CO",
  [
    ["Amazonas", "AMA"],
    ["Antioquia", "ANT"],
    ["Arauca", "ARA"],
    ["Archipiélago de San Andrés", "SAP"],
    ["Atlántico", "ATL"],
    ["Bogotá D.C.", "DC"],
    ["Bolívar", "BOL"],
    ["Boyacá", "BOY"],
    ["Caldas", "CAL"],
    ["Caquetá", "CAQ"],
    ["Casanare", "CAS"],
    ["Cauca", "CAU"],
    ["Cesar", "CES"],
    ["Chocó", "CHO"],
    ["Córdoba", "COR"],
    ["Cundinamarca", "CUN"],
    ["Guainía", "GUA"],
    ["Guaviare", "GUV"],
    ["Huila", "HUI"],
    ["La Guajira", "LAG"],
    ["Magdalena", "MAG"],
    ["Meta", "MET"],
    ["Nariño", "NAR"],
    ["Norte de Santander", "NSA"],
    ["Putumayo", "PUT"],
    ["Quindío", "QUI"],
    ["Risaralda", "RIS"],
    ["Santander", "SAN"],
    ["Sucre", "SUC"],
    ["Tolima", "TOL"],
    ["Valle del Cauca", "VAC"],
    ["Vaupés", "VAU"],
    ["Vichada", "VID"]
  ]
];
const KM = [
  "Comoros",
  "KM",
  [
    ["Andjazîdja", "G"],
    ["Andjouân", "A"],
    ["Moûhîlî", "M"]
  ]
];
const CG = [
  "Congo, Republic of the (Brazzaville)",
  "CG",
  [
    ["Bouenza", "11"],
    ["Brazzaville", "BZV"],
    ["Cuvette", "8"],
    ["Cuvette-Ouest", "15"],
    ["Kouilou", "5"],
    ["Lékoumou", "2"],
    ["Likouala", "7"],
    ["Niari", "9"],
    ["Plateaux", "14"],
    ["Pointe-Noire", "16"],
    ["Pool", "12"],
    ["Sangha", "13"]
  ]
];
const CD = [
  "Congo, the Democratic Republic of the (Kinshasa)",
  "CD",
  [
    ["Bandundu", "BN"],
    ["Bas-Congo", "BC"],
    ["Équateur", "EQ"],
    ["Kasaï-Occidental", "KE"],
    ["Kasaï-Oriental", "KW"],
    ["Katanga", "KA"],
    ["Kinshasa", "KN"],
    ["Maniema", "MA"],
    ["Nord-Kivu", "NK"],
    ["Orientale", "OR"],
    ["Sud-Kivu", "SK"]
  ]
];
const CK = [
  "Cook Islands",
  "CK",
  [
    ["Aitutaki", "undefined"],
    ["Atiu", "undefined"],
    ["Avarua", "undefined"],
    ["Mangaia", "undefined"],
    ["Manihiki", "undefined"],
    ["Ma'uke", "undefined"],
    ["Mitiaro", "undefined"],
    ["Nassau", "undefined"],
    ["Palmerston", "undefined"],
    ["Penrhyn", "undefined"],
    ["Pukapuka", "undefined"],
    ["Rakahanga", "undefined"]
  ]
];
const CR = [
  "Costa Rica",
  "CR",
  [
    ["Alajuela", "2"],
    ["Cartago", "3"],
    ["Guanacaste", "5"],
    ["Heredia", "4"],
    ["Limón", "7"],
    ["Puntarenas", "6"],
    ["San José", "1"]
  ]
];
const CI = [
  "Côte d'Ivoire, Republic of",
  "CI",
  [
    ["Agnéby", "16"],
    ["Bafing", "17"],
    ["Bas-Sassandra", "09"],
    ["Denguélé", "10"],
    ["Dix-Huit Montagnes", "06"],
    ["Fromager", "18"],
    ["Haut-Sassandra", "02"],
    ["Lacs", "07"],
    ["Lagunes", "01"],
    ["Marahoué", "12"],
    ["Moyen-Cavally", "19"],
    ["Moyen-Comoé", "05"],
    ["N'zi-Comoé", "11"],
    ["Savanes", "03"],
    ["Sud-Bandama", "15"],
    ["Sud-Comoé", "13"],
    ["Vallée du Bandama", "04"],
    ["Worodougou", "14"],
    ["Zanzan", "08"]
  ]
];
const HR = [
  "Croatia",
  "HR",
  [
    ["Bjelovarsko-bilogorska županija", "07"],
    ["Brodsko-posavska županija", "12"],
    ["Dubrovačko-neretvanska županija", "19"],
    ["Grad Zagreb", "21"],
    ["Istarska županija", "18"],
    ["Karlovačka županija", "04"],
    ["Koprivničko-križevačka županija", "06"],
    ["Krapinsko-zagorska županija", "02"],
    ["Ličko-senjska županija", "09"],
    ["Međimurska županija", "20"],
    ["Osječko-baranjska županija", "14"],
    ["Požeško-slavonska županija", "11"],
    ["Primorsko-goranska županija", "08"],
    ["Sisačko-moslavačka županija", "03"],
    ["Splitsko-dalmatinska županija", "17"],
    ["Šibensko-kninska županija", "15"],
    ["Varaždinska županija", "05"],
    ["Virovitičko-podravska županija", "10"],
    ["Vukovarsko-srijemska županija", "16"],
    ["Zadarska županija", "13"],
    ["Zagrebačka županija", "01"]
  ]
];
const CU = [
  "Cuba",
  "CU",
  [
    ["Artemisa", "15"],
    ["Camagüey", "09"],
    ["Ciego de Ávila", "08"],
    ["Cienfuegos", "06"],
    ["Granma", "12"],
    ["Guantánamo", "14"],
    ["Holguín", "11"],
    ["Isla de la Juventud", "99"],
    ["La Habana", "03"],
    ["Las Tunas", "10"],
    ["Matanzas", "04"],
    ["Mayabeque", "16"],
    ["Pinar del Río", "01"],
    ["Sancti Spíritus", "07"],
    ["Santiago de Cuba", "13"],
    ["Villa Clara", "05"]
  ]
];
const CW = [
  "Curaçao",
  "CW",
  [
    ["Curaçao", "CW"]
  ]
];
const CY = [
  "Cyprus",
  "CY",
  [
    ["Ammochostos", "04"],
    ["Keryneia", "06"],
    ["Larnaka", "03"],
    ["Lefkosia", "01"],
    ["Lemesos", "02"],
    ["Pafos", "05"]
  ]
];
const CZ = [
  "Czech Republic",
  "CZ",
  [
    ["Hlavní město Praha", "10"],
    ["Jihočeský kraj", "31"],
    ["Jihomoravský kraj", "64"],
    ["Karlovarský kraj", "41"],
    ["Královéhradecký kraj", "52"],
    ["Liberecký kraj", "51"],
    ["Moravskoslezský kraj", "80"],
    ["Olomoucký kraj", "71"],
    ["Pardubický kraj", "53"],
    ["Plzeňský kraj", "32"],
    ["Středočeský kraj", "20"],
    ["Ústecký kraj", "42"],
    ["Vysočina", "63"],
    ["Zlínský kraj", "72"]
  ]
];
const DK = [
  "Denmark",
  "DK",
  [
    ["Hovedstaden", "DK-84"],
    ["Midtjylland", "DK-82"],
    ["Nordjylland", "DK-81"],
    ["Sjælland", "DK-85"],
    ["Syddanmark", "DK-83"]
  ]
];
const DJ = [
  "Djibouti",
  "DJ",
  [
    ["Ali Sabieh", "AS"],
    ["Arta", "AR"],
    ["Dikhil", "DI"],
    ["Obock", "OB"],
    ["Tadjourah", "TA"]
  ]
];
const DM = [
  "Dominica",
  "DM",
  [
    ["Saint Andrew Parish", "02"],
    ["Saint David Parish", "03"],
    ["Saint George Parish", "04"],
    ["Saint John Parish", "05"],
    ["Saint Joseph Parish", "06"],
    ["Saint Luke Parish", "07"],
    ["Saint Mark Parish", "08"],
    ["Saint Patrick Parish", "09"],
    ["Saint Paul Parish", "10"],
    ["Saint Peter Parish", "11"]
  ]
];
const DO = [
  "Dominican Republic",
  "DO",
  [
    ["Cibao Central", "02"],
    ["Del Valle", "37"],
    ["Distrito Nacional", "01"],
    ["Enriquillo", "38"],
    ["Norcentral", "04"],
    ["Nordeste", "33"],
    ["Noroeste", "34"],
    ["Norte", "35"],
    ["Valdesia", "42"]
  ]
];
const EC = [
  "Ecuador",
  "EC",
  [
    ["Azuay", "A"],
    ["Bolívar", "B"],
    ["Cañar", "F"],
    ["Carchi", "C"],
    ["Chimborazo", "H"],
    ["Cotopaxi", "X"],
    ["El Oro", "O"],
    ["Esmeraldas", "E"],
    ["Galápagos", "W"],
    ["Guayas", "G"],
    ["Imbabura", "I"],
    ["Loja", "L"],
    ["Los Ríos", "R"],
    ["Manabí", "M"],
    ["Morona-Santiago", "S"],
    ["Napo", "N"],
    ["Orellana", "D"],
    ["Pastaza", "Y"],
    ["Pichincha", "P"],
    ["Santa Elena", "SE"],
    ["Santo Domingo de los Tsáchilas", "SD"],
    ["Sucumbíos", "U"],
    ["Tungurahua", "T"],
    ["Zamora-Chinchipe", "Z"]
  ]
];
const EG = [
  "Egypt",
  "EG",
  [
    ["Alexandria", "ALX"],
    ["Aswan", "ASN"],
    ["Asyout", "AST"],
    ["Bani Sueif", "BNS"],
    ["Beheira", "BH"],
    ["Cairo", "C"],
    ["Daqahlia", "DK"],
    ["Dumiat", "DT"],
    ["El Bahr El Ahmar", "BA"],
    ["El Ismailia", "IS"],
    ["El Suez", "SUZ"],
    ["El Wadi El Gedeed", "WAD"],
    ["Fayoum", "FYM"],
    ["Gharbia", "GH"],
    ["Giza", "GZ"],
    ["Helwan", "HU"],
    ["Kafr El Sheikh", "KFS"],
    ["Luxor", "LX"],
    ["Matrouh", "MT"],
    ["Menia", "MN"],
    ["Menofia", "MNF"],
    ["North Sinai", "SIN"],
    ["Port Said", "PTS"],
    ["Qalubia", "KB"],
    ["Qena", "KN"],
    ["Sharqia", "SHR"],
    ["Sixth of October", "SU"],
    ["Sohag", "SHG"],
    ["South Sinai", "JS"]
  ]
];
const SV = [
  "El Salvador",
  "SV",
  [
    ["Ahuachapán", "AH"],
    ["Cabañas", "CA"],
    ["Cuscatlán", "CU"],
    ["Chalatenango", "CH"],
    ["La Libertad", "LI"],
    ["La Paz", "PA"],
    ["La Unión", "UN"],
    ["Morazán", "MO"],
    ["San Miguel", "SM"],
    ["San Salvador", "SS"],
    ["Santa Ana", "SA"],
    ["San Vicente", "SV"],
    ["Sonsonate", "SO"],
    ["Usulután", "US"]
  ]
];
const GQ = [
  "Equatorial Guinea",
  "GQ",
  [
    ["Annobón", "AN"],
    ["Bioko Norte", "BN"],
    ["Bioko Sur", "BS"],
    ["Centro Sur", "CS"],
    ["Kié-Ntem", "KN"],
    ["Litoral", "LI"],
    ["Wele-Nzas", "WN"]
  ]
];
const ER = [
  "Eritrea",
  "ER",
  [
    ["Anseba", "AN"],
    ["Debub", "DU"],
    ["Debub-Keih-Bahri", "DK"],
    ["Gash-Barka", "GB"],
    ["Maekel", "MA"],
    ["Semien-Keih-Bahri", "SK"]
  ]
];
const EE = [
  "Estonia",
  "EE",
  [
    ["Harjumaa (Tallinn)", "37"],
    ["Hiiumaa (Kardla)", "39"],
    ["Ida-Virumaa (Johvi)", "44"],
    ["Järvamaa (Paide)", "41"],
    ["Jõgevamaa (Jogeva)", "49"],
    ["Läänemaa", "57"],
    ["Lääne-Virumaa (Rakvere)", "59"],
    ["Pärnumaa (Parnu)", "67"],
    ["Põlvamaa (Polva)", "65"],
    ["Raplamaa (Rapla)", "70"],
    ["Saaremaa (Kuessaare)", "74"],
    ["Tartumaa (Tartu)", "78"],
    ["Valgamaa (Valga)", "82"],
    ["Viljandimaa (Viljandi)", "84"],
    ["Võrumaa (Voru)", "86"]
  ]
];
const ET = [
  "Ethiopia",
  "ET",
  [
    ["Addis Ababa", "AA"],
    ["Afar", "AF"],
    ["Amhara", "AM"],
    ["Benshangul-Gumaz", "BE"],
    ["Dire Dawa", "DD"],
    ["Gambela", "GA"],
    ["Harari", "HA"],
    ["Oromia", "OR"],
    ["Somali", "SO"],
    ["Southern Nations Nationalities and People's Region", "SN"],
    ["Tigray", "TI"]
  ]
];
const FK = [
  "Falkland Islands (Islas Malvinas)",
  "FK",
  [
    ["Falkland Islands (Islas Malvinas)", "undefined"]
  ]
];
const FO = [
  "Faroe Islands",
  "FO",
  [
    ["Bordoy", "undefined"],
    ["Eysturoy", "undefined"],
    ["Mykines", "undefined"],
    ["Sandoy", "undefined"],
    ["Skuvoy", "undefined"],
    ["Streymoy", "undefined"],
    ["Suduroy", "undefined"],
    ["Tvoroyri", "undefined"],
    ["Vagar", "undefined"]
  ]
];
const FJ = [
  "Fiji",
  "FJ",
  [
    ["Ba", "01"],
    ["Bua", "02"],
    ["Cakaudrove", "03"],
    ["Kadavu", "04"],
    ["Lau", "05"],
    ["Lomaiviti", "06"],
    ["Macuata", "07"],
    ["Nadroga and Navosa", "08"],
    ["Naitasiri", "09"],
    ["Namosi", "10"],
    ["Ra", "11"],
    ["Rewa", "12"],
    ["Rotuma", "R"],
    ["Serua", "13"],
    ["Tailevu", "14"]
  ]
];
const FI = [
  "Finland",
  "FI",
  [
    ["Ahvenanmaan maakunta", "FI-01"],
    ["Etelä-Karjala", "FI-02"],
    ["Etelä-Pohjanmaa", "FI-03"],
    ["Etelä-Savo", "FI-04"],
    ["Kainuu", "FI-05"],
    ["Kanta-Häme", "FI-06"],
    ["Keski-Pohjanmaa", "FI-07"],
    ["Keski-Suomi", "FI-08"],
    ["Kymenlaakso", "FI-09"],
    ["Lappi", "FI-10"],
    ["Pirkanmaa", "FI-11"],
    ["Pohjanmaa", "FI-12"],
    ["Pohjois-Karjala", "FI-13"],
    ["Pohjois-Pohjanmaa", "FI-14"],
    ["Pohjois-Savo", "FI-15"],
    ["Päijät-Häme", "FI-16"],
    ["Satakunta", "FI-17"],
    ["Uusimaa", "FI-18"],
    ["Varsinais-Suomi", "FI-19"]
  ]
];
const FR = [
  "France",
  "FR",
  [
    ["Auvergne-Rhône-Alpes", "ARA"],
    ["Bourgogne-Franche-Comté", "BFC"],
    ["Bretagne", "BRE"],
    ["Centre-Val de Loire", "CVL"],
    ["Corse", "COR"],
    ["Grand Est", "GES"],
    ["Hauts-de-France", "HDF"],
    ["Île-de-France", "IDF"],
    ["Normandie", "NOR"],
    ["Nouvelle-Aquitaine", "NAQ"],
    ["Occitanie", "OCC"],
    ["Pays de la Loire", "PDL"],
    ["Provence-Alpes-Cote d'Azur", "PAC"],
    ["Clipperton", "CP"],
    ["Guadeloupe", "GP"],
    ["Guyane", "GF"],
    ["Martinique", "MQ"],
    ["Mayotte", "YT"],
    ["Nouvelle-Calédonie", "NC"],
    ["Polynésie", "PF"],
    ["Saint-Pierre-et-Miquelon", "PM"],
    ["Saint Barthélemy", "BL"],
    ["Saint Martin", "MF"],
    ["Réunion", "RE"],
    ["Terres Australes Françaises", "TF"],
    ["Wallis-et-Futuna", "WF"]
  ]
];
const GF = [
  "French Guiana",
  "GF",
  [
    ["French Guiana", "undefined"]
  ]
];
const PF = [
  "French Polynesia",
  "PF",
  [
    ["Archipel des Marquises", "undefined"],
    ["Archipel des Tuamotu", "undefined"],
    ["Archipel des Tubuai", "undefined"],
    ["Iles du Vent", "undefined"],
    ["Iles Sous-le-Vent", "undefined"]
  ]
];
const TF = [
  "French Southern and Antarctic Lands",
  "TF",
  [
    ["Adelie Land", "undefined"],
    ["Ile Crozet", "undefined"],
    ["Iles Kerguelen", "undefined"],
    ["Iles Saint-Paul et Amsterdam", "undefined"]
  ]
];
const GA = [
  "Gabon",
  "GA",
  [
    ["Estuaire", "1"],
    ["Haut-Ogooué", "2"],
    ["Moyen-Ogooué", "3"],
    ["Ngounié", "4"],
    ["Nyanga", "5"],
    ["Ogooué-Ivindo", "6"],
    ["Ogooué-Lolo", "7"],
    ["Ogooué-Maritime", "8"],
    ["Woleu-Ntem", "9"]
  ]
];
const GM = [
  "Gambia, The",
  "GM",
  [
    ["Banjul", "B"],
    ["Central River", "M"],
    ["Lower River", "L"],
    ["North Bank", "N"],
    ["Upper River", "U"],
    ["Western", "W"]
  ]
];
const GE = [
  "Georgia",
  "GE",
  [
    ["Abkhazia (Sokhumi)", "AB"],
    ["Ajaria (Bat'umi)", "AJ"],
    ["Guria", "GU"],
    ["Imereti", "IM"],
    ["K'akheti", "KA"],
    ["Kvemo Kartli", "KK"],
    ["Mtshkheta-Mtianeti", "MM"],
    ["Rach'a-Lexhkumi-KvemoSvaneti", "RL"],
    ["Samegrelo-Zemo Svaneti", "SZ"],
    ["Samtskhe-Javakheti", "SJ"],
    ["Shida Kartli", "SK"],
    ["Tbilisi", "TB"]
  ]
];
const DE = [
  "Germany",
  "DE",
  [
    ["Baden-Württemberg", "BW"],
    ["Bayern", "BY"],
    ["Berlin", "BE"],
    ["Brandenburg", "BB"],
    ["Bremen", "HB"],
    ["Hamburg", "HH"],
    ["Hessen", "HE"],
    ["Mecklenburg-Vorpommern", "MV"],
    ["Niedersachsen", "NI"],
    ["Nordrhein-Westfalen", "NW"],
    ["Rheinland-Pfalz", "RP"],
    ["Saarland", "SL"],
    ["Sachsen", "SN"],
    ["Sachsen-Anhalt", "ST"],
    ["Schleswig-Holstein", "SH"],
    ["Thüringen", "TH"]
  ]
];
const GH = [
  "Ghana",
  "GH",
  [
    ["Ahafo", "undefined"],
    ["Ashanti", "AH"],
    ["Bono", "undefined"],
    ["Bono East", "undefined"],
    ["Central", "CP"],
    ["Eastern", "EP"],
    ["Greater Accra", "AA"],
    ["Northern", "NP"],
    ["North East", "undefined"],
    ["Oti", "undefined"],
    ["Savannah", "undefined"],
    ["Upper East", "UE"],
    ["Upper West", "UW"],
    ["Volta", "TV"],
    ["Western", "WP"],
    ["Western North", "undefined"]
  ]
];
const GI = [
  "Gibraltar",
  "GI",
  [
    ["Gibraltar", "undefined"]
  ]
];
const GR = [
  "Greece",
  "GR",
  [
    ["Anatolikí Makedonía kai Thráki", "A"],
    ["Attikḯ", "I"],
    ["Dytikí Elláda", "G"],
    ["Dytikí Makedonía", "C"],
    ["Ionía Nísia", "F"],
    ["Kentrikí Makedonía", "B"],
    ["Krítí", "M"],
    ["Notío Aigaío", "L"],
    ["Peloponnísos", "J"],
    ["Stereá Elláda", "H"],
    ["Thessalía", "E"],
    ["Voreío Aigaío", "K"],
    ["Ípeiros", "D"],
    ["Ágion Óros", "69"]
  ]
];
const GL = [
  "Greenland",
  "GL",
  [
    ["Kommune Kujalleq", "KU"],
    ["Kommuneqarfik Sermersooq", "SM"],
    ["Qaasuitsup Kommunia", "QA"],
    ["Qeqqata Kommunia", "QE"]
  ]
];
const GD = [
  "Grenada",
  "GD",
  [
    ["Saint Andrew", "01"],
    ["Saint David", "02"],
    ["Saint George", "03"],
    ["Saint John", "04"],
    ["Saint Mark", "05"],
    ["Saint Patrick", "06"],
    ["Southern Grenadine Islands", "10"]
  ]
];
const GP = [
  "Guadeloupe",
  "GP",
  [
    ["Guadeloupe", "undefined"]
  ]
];
const GU = [
  "Guam",
  "GU",
  [
    ["Guam", "undefined"]
  ]
];
const GT = [
  "Guatemala",
  "GT",
  [
    ["Alta Verapaz", "AV"],
    ["Baja Verapaz", "BV"],
    ["Chimaltenango", "CM"],
    ["Chiquimula", "CQ"],
    ["El Progreso", "PR"],
    ["Escuintla", "ES"],
    ["Guatemala", "GU"],
    ["Huehuetenango", "HU"],
    ["Izabal", "IZ"],
    ["Jalapa", "JA"],
    ["Jutiapa", "JU"],
    ["Petén", "PE"],
    ["Quetzaltenango", "QZ"],
    ["Quiché", "QC"],
    ["Retalhuleu", "Re"],
    ["Sacatepéquez", "SA"],
    ["San Marcos", "SM"],
    ["Santa Rosa", "SR"],
    ["Sololá", "SO"],
    ["Suchitepéquez", "SU"],
    ["Totonicapán", "TO"],
    ["Zacapa", "ZA"]
  ]
];
const GG = [
  "Guernsey",
  "GG",
  [
    ["Castel", "undefined"],
    ["Forest", "undefined"],
    ["St. Andrew", "undefined"],
    ["St. Martin", "undefined"],
    ["St. Peter Port", "undefined"],
    ["St. Pierre du Bois", "undefined"],
    ["St. Sampson", "undefined"],
    ["St. Saviour", "undefined"],
    ["Torteval", "undefined"],
    ["Vale", "undefined"]
  ]
];
const GN = [
  "Guinea",
  "GN",
  [
    ["Boké", "B"],
    ["Conakry", "C"],
    ["Faranah", "F"],
    ["Kankan", "K"],
    ["Kindia", "D"],
    ["Labé", "L"],
    ["Mamou", "M"],
    ["Nzérékoré", "N"]
  ]
];
const GW = [
  "Guinea-Bissau",
  "GW",
  [
    ["Bafatá", "BA"],
    ["Biombo", "BM"],
    ["Bissau", "BS"],
    ["Bolama-Bijagos", "BL"],
    ["Cacheu", "CA"],
    ["Gabú", "GA"],
    ["Oio", "OI"],
    ["Quinara", "QU"],
    ["Tombali", "TO"]
  ]
];
const GY = [
  "Guyana",
  "GY",
  [
    ["Barima-Waini", "BA"],
    ["Cuyuni-Mazaruni", "CU"],
    ["Demerara-Mahaica", "DE"],
    ["East Berbice-Corentyne", "EB"],
    ["Essequibo Islands-West Demerara", "ES"],
    ["Mahaica-Berbice", "MA"],
    ["Pomeroon-Supenaam", "PM"],
    ["Potaro-Siparuni", "PT"],
    ["Upper Demerara-Berbice", "UD"],
    ["Upper Takutu-Upper Essequibo", "UT"]
  ]
];
const HT = [
  "Haiti",
  "HT",
  [
    ["Artibonite", "AR"],
    ["Centre", "CE"],
    ["Grand'Anse", "GA"],
    ["Nippes", "NI"],
    ["Nord", "ND"],
    ["Nord-Est", "NE"],
    ["Nord-Ouest", "NO"],
    ["Ouest", "OU"],
    ["Sud", "SD"],
    ["Sud-Est", "SE"]
  ]
];
const HM = [
  "Heard Island and McDonald Islands",
  "HM",
  [
    ["Heard Island and McDonald Islands", "undefined"]
  ]
];
const VA = [
  "Holy See (Vatican City)",
  "VA",
  [
    ["Holy See (Vatican City)", "01"]
  ]
];
const HN = [
  "Honduras",
  "HN",
  [
    ["Atlántida", "AT"],
    ["Choluteca", "CH"],
    ["Colón", "CL"],
    ["Comayagua", "CM"],
    ["Copán", "CP"],
    ["Cortés", "CR"],
    ["El Paraíso", "EP"],
    ["Francisco Morazán", "FM"],
    ["Gracias a Dios", "GD"],
    ["Intibucá", "IN"],
    ["Islas de la Bahía", "IB"],
    ["La Paz", "LP"],
    ["Lempira", "LE"],
    ["Ocotepeque", "OC"],
    ["Olancho", "OL"],
    ["Santa Bárbara", "SB"],
    ["Valle", "VA"],
    ["Yoro", "YO"]
  ]
];
const HK = [
  "Hong Kong",
  "HK",
  [
    ["Hong Kong", "HK"]
  ]
];
const HU = [
  "Hungary",
  "HU",
  [
    ["Bács-Kiskun", "BK"],
    ["Baranya", "BA"],
    ["Békés", "BE"],
    ["Békéscsaba", "BC"],
    ["Borsod-Abauj-Zemplen", "BZ"],
    ["Budapest", "BU"],
    ["Csongrád", "CS"],
    ["Debrecen", "DE"],
    ["Dunaújváros", "DU"],
    ["Eger", "EG"],
    ["Érd", "ER"],
    ["Fejér", "FE"],
    ["Győr", "GY"],
    ["Győr-Moson-Sopron", "GS"],
    ["Hajdú-Bihar", "HB"],
    ["Heves", "HE"],
    ["Hódmezővásárhely", "HV"],
    ["Jász-Nagykun-Szolnok", "N"],
    ["Kaposvár", "KV"],
    ["Kecskemét", "KM"],
    ["Komárom-Esztergom", "KE"],
    ["Miskolc", "MI"],
    ["Nagykanizsa", "NK"],
    ["Nógrád", "NO"],
    ["Nyíregyháza", "NY"],
    ["Pécs", "PS"],
    ["Pest", "PE"],
    ["Salgótarján", "ST"],
    ["Somogy", "SO"],
    ["Sopron", "SN"],
    ["Szabolcs-á-Bereg", "SZ"],
    ["Szeged", "SD"],
    ["Székesfehérvár", "SF"],
    ["Szekszárd", "SS"],
    ["Szolnok", "SK"],
    ["Szombathely", "SH"],
    ["Tatabánya", "TB"],
    ["Tolna", "TO"],
    ["Vas", "VA"],
    ["Veszprém", "VE"],
    ["Veszprém (City)", "VM"],
    ["Zala", "ZA"],
    ["Zalaegerszeg", "ZE"]
  ]
];
const IS = [
  "Iceland",
  "IS",
  [
    ["Austurland", "7"],
    ["Höfuðborgarsvæði", "1"],
    ["Norðurland eystra", "6"],
    ["Norðurland vestra", "5"],
    ["Suðurland", "8"],
    ["Suðurnes", "2"],
    ["Vestfirðir", "4"],
    ["Vesturland", "3"]
  ]
];
const IN = [
  "India",
  "IN",
  [
    ["Andaman and Nicobar Islands", "AN"],
    ["Andhra Pradesh", "AP"],
    ["Arunachal Pradesh", "AR"],
    ["Assam", "AS"],
    ["Bihar", "BR"],
    ["Chandigarh", "CH"],
    ["Chhattisgarh", "CT"],
    ["Dadra and Nagar Haveli and Daman and Diu", "DH"],
    ["Delhi", "DL"],
    ["Goa", "GA"],
    ["Gujarat", "GJ"],
    ["Haryana", "HR"],
    ["Himachal Pradesh", "HP"],
    ["Jammu and Kashmir", "JK"],
    ["Jharkhand", "JH"],
    ["Karnataka", "KA"],
    ["Kerala", "KL"],
    ["Ladakh", "LA"],
    ["Lakshadweep", "LD"],
    ["Madhya Pradesh", "MP"],
    ["Maharashtra", "MH"],
    ["Manipur", "MN"],
    ["Meghalaya", "ML"],
    ["Mizoram", "MZ"],
    ["Nagaland", "NL"],
    ["Odisha", "OR"],
    ["Puducherry", "PY"],
    ["Punjab", "PB"],
    ["Rajasthan", "RJ"],
    ["Sikkim", "SK"],
    ["Tamil Nadu", "TN"],
    ["Telangana", "TG"],
    ["Tripura", "TR"],
    ["Uttarakhand", "UT"],
    ["Uttar Pradesh", "UP"],
    ["West Bengal", "WB"]
  ]
];
const ID = [
  "Indonesia",
  "ID",
  [
    ["Aceh", "AC"],
    ["Bali", "BA"],
    ["Bangka Belitung", "BB"],
    ["Banten", "BT"],
    ["Bengkulu", "BE"],
    ["Gorontalo", "GO"],
    ["Jakarta Raya", "JK"],
    ["Jambi", "JA"],
    ["Jawa Barat", "JB"],
    ["Jawa Tengah", "JT"],
    ["Jawa Timur", "JI"],
    ["Kalimantan Barat", "KB"],
    ["Kalimantan Selatan", "KS"],
    ["Kalimantan Tengah", "KT"],
    ["Kalimantan Timur", "KI"],
    ["Kalimantan Utara", "KU"],
    ["Kepulauan Riau", "KR"],
    ["Lampung", "LA"],
    ["Maluku", "MA"],
    ["Maluku Utara", "MU"],
    ["Nusa Tenggara Barat", "NB"],
    ["Nusa Tenggara Timur", "NT"],
    ["Papua", "PA"],
    ["Papua Barat", "PB"],
    ["Riau", "RI"],
    ["Sulawesi Selatan", "SR"],
    ["Sulawesi Tengah", "ST"],
    ["Sulawesi Tenggara", "SG"],
    ["Sulawesi Utara", "SA"],
    ["Sumatera Barat", "SB"],
    ["Sumatera Selatan", "SS"],
    ["Sumatera Utara", "SU"],
    ["Yogyakarta", "YO"]
  ]
];
const IR = [
  "Iran, Islamic Republic of",
  "IR",
  [
    ["Alborz", "32"],
    ["Ardabīl", "03"],
    ["Āz̄arbāyjān-e Gharbī", "02"],
    ["Āz̄arbāyjān-e Sharqī", "01"],
    ["Būshehr", "06"],
    ["Chahār Maḩāl va Bakhtīārī", "08"],
    ["Eşfahān", "04"],
    ["Fārs", "14"],
    ["Gīlān", "19"],
    ["Golestān", "27"],
    ["Hamadān", "24"],
    ["Hormozgān", "23"],
    ["Īlām", "05"],
    ["Kermān", "15"],
    ["Kermānshāh", "17"],
    ["Khorāsān-e Jonūbī", "29"],
    ["Khorāsān-e Raẕavī", "30"],
    ["Khorāsān-e Shomālī", "61"],
    ["Khūzestān", "10"],
    ["Kohgīlūyeh va Bowyer Aḩmad", "18"],
    ["Kordestān", "16"],
    ["Lorestān", "20"],
    ["Markazi", "22"],
    ["Māzandarān", "21"],
    ["Qazvīn", "28"],
    ["Qom", "26"],
    ["Semnān", "12"],
    ["Sīstān va Balūchestān", "13"],
    ["Tehrān", "07"],
    ["Yazd", "25"],
    ["Zanjān", "11"]
  ]
];
const IQ = [
  "Iraq",
  "IQ",
  [
    ["Al Anbār", "AN"],
    ["Al Başrah", "BA"],
    ["Al Muthanná", "MU"],
    ["Al Qādisīyah", "QA"],
    ["An Najaf", "NA"],
    ["Arbīl", "AR"],
    ["As Sulaymānīyah", "SU"],
    ["Bābil", "BB"],
    ["Baghdād", "BG"],
    ["Dohuk", "DA"],
    ["Dhī Qār", "DQ"],
    ["Diyālá", "DI"],
    ["Karbalā'", "KA"],
    ["Kirkuk", "KI"],
    ["Maysān", "MA"],
    ["Nīnawá", "NI"],
    ["Şalāḩ ad Dīn", "SD"],
    ["Wāsiţ", "WA"]
  ]
];
const IE = [
  "Ireland",
  "IE",
  [
    ["Carlow", "CW"],
    ["Cavan", "CN"],
    ["Clare", "CE"],
    ["Cork", "CO"],
    ["Donegal", "DL"],
    ["Dublin", "D"],
    ["Galway", "G"],
    ["Kerry", "KY"],
    ["Kildare", "KE"],
    ["Kilkenny", "KK"],
    ["Laois", "LS"],
    ["Leitrim", "LM"],
    ["Limerick", "LK"],
    ["Longford", "LD"],
    ["Louth", "LH"],
    ["Mayo", "MO"],
    ["Meath", "MH"],
    ["Monaghan", "MN"],
    ["Offaly", "OY"],
    ["Roscommon", "RN"],
    ["Sligo", "SO"],
    ["Tipperary", "TA"],
    ["Waterford", "WD"],
    ["Westmeath", "WH"],
    ["Wexford", "WX"],
    ["Wicklow", "WW"]
  ]
];
const IM = [
  "Isle of Man",
  "IM",
  [
    ["Isle of Man", "undefined"]
  ]
];
const IL = [
  "Israel",
  "IL",
  [
    ["HaDarom", "D"],
    ["HaMerkaz", "M"],
    ["HaTsafon", "Z"],
    ["H̱efa", "HA"],
    ["Tel-Aviv", "TA"],
    ["Yerushalayim", "JM"]
  ]
];
const IT = [
  "Italy",
  "IT",
  [
    ["Abruzzo", "65"],
    ["Basilicata", "77"],
    ["Calabria", "78"],
    ["Campania", "72"],
    ["Emilia-Romagna", "45"],
    ["Friuli-Venezia Giulia", "36"],
    ["Lazio", "62"],
    ["Liguria", "42"],
    ["Lombardia", "25"],
    ["Marche", "57"],
    ["Molise", "67"],
    ["Piemonte", "21"],
    ["Puglia", "75"],
    ["Sardegna", "88"],
    ["Sicilia", "82"],
    ["Toscana", "52"],
    ["Trentino-Alto Adige", "32"],
    ["Umbria", "55"],
    ["Valle d'Aosta", "23"],
    ["Veneto", "34"]
  ]
];
const JM = [
  "Jamaica",
  "JM",
  [
    ["Clarendon", "13"],
    ["Hanover", "09"],
    ["Kingston", "01"],
    ["Manchester", "12"],
    ["Portland", "04"],
    ["Saint Andrew", "02"],
    ["Saint Ann", "06"],
    ["Saint Catherine", "14"],
    ["Saint Elizabeth", "11"],
    ["Saint James", "08"],
    ["Saint Mary", "05"],
    ["Saint Thomas", "03"],
    ["Trelawny", "07"],
    ["Westmoreland", "10"]
  ]
];
const JP = [
  "Japan",
  "JP",
  [
    ["Aichi", "23"],
    ["Akita", "05"],
    ["Aomori", "02"],
    ["Chiba", "12"],
    ["Ehime", "38"],
    ["Fukui", "18"],
    ["Fukuoka", "40"],
    ["Fukushima", "07"],
    ["Gifu", "21"],
    ["Gunma", "10"],
    ["Hiroshima", "34"],
    ["Hokkaido", "01"],
    ["Hyogo", "28"],
    ["Ibaraki", "08"],
    ["Ishikawa", "17"],
    ["Iwate", "03"],
    ["Kagawa", "37"],
    ["Kagoshima", "46"],
    ["Kanagawa", "14"],
    ["Kochi", "39"],
    ["Kumamoto", "43"],
    ["Kyoto", "26"],
    ["Mie", "24"],
    ["Miyagi", "04"],
    ["Miyazaki", "45"],
    ["Nagano", "20"],
    ["Nagasaki", "42"],
    ["Nara", "29"],
    ["Niigata", "15"],
    ["Oita", "44"],
    ["Okayama", "33"],
    ["Okinawa", "47"],
    ["Osaka", "27"],
    ["Saga", "41"],
    ["Saitama", "11"],
    ["Shiga", "25"],
    ["Shimane", "32"],
    ["Shizuoka", "22"],
    ["Tochigi", "09"],
    ["Tokushima", "36"],
    ["Tokyo", "13"],
    ["Tottori", "31"],
    ["Toyama", "16"],
    ["Wakayama", "30"],
    ["Yamagata", "06"],
    ["Yamaguchi", "35"],
    ["Yamanashi", "19"]
  ]
];
const JE = [
  "Jersey",
  "JE",
  [
    ["Jersey", "undefined"]
  ]
];
const JO = [
  "Jordan",
  "JO",
  [
    ["‘Ajlūn", "AJ"],
    ["Al 'Aqabah", "AQ"],
    ["Al Balqā’", "BA"],
    ["Al Karak", "KA"],
    ["Al Mafraq", "MA"],
    ["Al ‘A̅şimah", "AM"],
    ["Aţ Ţafīlah", "AT"],
    ["Az Zarqā’", "AZ"],
    ["Irbid", "IR"],
    ["Jarash", "JA"],
    ["Ma‘ān", "MN"],
    ["Mādabā", "MD"]
  ]
];
const KZ = [
  "Kazakhstan",
  "KZ",
  [
    ["Almaty", "ALA"],
    ["Aqmola", "AKM"],
    ["Aqtobe", "AKT"],
    ["Astana", "AST"],
    ["Atyrau", "ATY"],
    ["Batys Qazaqstan", "ZAP"],
    ["Bayqongyr", "undefined"],
    ["Mangghystau", "MAN"],
    ["Ongtustik Qazaqstan", "YUZ"],
    ["Pavlodar", "PAV"],
    ["Qaraghandy", "KAR"],
    ["Qostanay", "KUS"],
    ["Qyzylorda", "KZY"],
    ["Shyghys Qazaqstan", "VOS"],
    ["Soltustik Qazaqstan", "SEV"],
    ["Zhambyl", "ZHA"]
  ]
];
const KE = [
  "Kenya",
  "KE",
  [
    ["Baringo", "01"],
    ["Bomet", "02"],
    ["Bungoma", "03"],
    ["Busia", "04"],
    ["Eleyo/Marakwet", "05"],
    ["Embu", "06"],
    ["Garissa", "07"],
    ["Homa Bay", "08"],
    ["Isiolo", "09"],
    ["Kajiado", "10"],
    ["Kakamega", "11"],
    ["Kericho", "12"],
    ["Kiambu", "13"],
    ["Kilifi", "14"],
    ["Kirinyaga", "15"],
    ["Kisii", "16"],
    ["Kisumu", "17"],
    ["Kitui", "18"],
    ["Kwale", "19"],
    ["Laikipia", "20"],
    ["Lamu", "21"],
    ["Machakos", "22"],
    ["Makueni", "23"],
    ["Mandera", "24"],
    ["Marsabit", "25"],
    ["Meru", "26"],
    ["Migori", "27"],
    ["Mombasa", "28"],
    ["Murang'a", "29"],
    ["Nairobi City", "30"],
    ["Nakuru", "31"],
    ["Nandi", "32"],
    ["Narok", "33"],
    ["Nyamira", "34"],
    ["Nyandarua", "35"],
    ["Nyeri", "36"],
    ["Samburu", "37"],
    ["Siaya", "38"],
    ["Taita/Taveta", "39"],
    ["Tana River", "40"],
    ["Tharaka-Nithi", "41"],
    ["Trans Nzoia", "42"],
    ["Turkana", "43"],
    ["Uasin Gishu", "44"],
    ["Vihiga", "45"],
    ["Wajir", "46"],
    ["West Pokot", "47"]
  ]
];
const KI = [
  "Kiribati",
  "KI",
  [
    ["Abaiang", "undefined"],
    ["Abemama", "undefined"],
    ["Aranuka", "undefined"],
    ["Arorae", "undefined"],
    ["Banaba", "undefined"],
    ["Beru", "undefined"],
    ["Butaritari", "undefined"],
    ["Central Gilberts", "undefined"],
    ["Gilbert Islands", "G"],
    ["Kanton", "undefined"],
    ["Kiritimati", "undefined"],
    ["Kuria", "undefined"],
    ["Line Islands", "L"],
    ["Maiana", "undefined"],
    ["Makin", "undefined"],
    ["Marakei", "undefined"],
    ["Nikunau", "undefined"],
    ["Nonouti", "undefined"],
    ["Northern Gilberts", "undefined"],
    ["Onotoa", "undefined"],
    ["Phoenix Islands", "P"],
    ["Southern Gilberts", "undefined"],
    ["Tabiteuea", "undefined"],
    ["Tabuaeran", "undefined"],
    ["Tamana", "undefined"],
    ["Tarawa", "undefined"],
    ["Teraina", "undefined"]
  ]
];
const KP = [
  "Korea, Democratic People's Republic of",
  "KP",
  [
    ["Chagang-do (Chagang Province)", "04"],
    ["Hamgyong-bukto (North Hamgyong Province)", "09"],
    ["Hamgyong-namdo (South Hamgyong Province)", "08"],
    ["Hwanghae-bukto (North Hwanghae Province)", "06"],
    ["Hwanghae-namdo (South Hwanghae Province)", "05"],
    ["Kangwon-do (Kangwon Province)", "07"],
    ["Nasŏn (Najin-Sŏnbong)", "13"],
    ["P'yongan-bukto (North P'yongan Province)", "03"],
    ["P'yongan-namdo (South P'yongan Province)", "02"],
    ["P'yongyang-si (P'yongyang City)", "01"],
    ["Yanggang-do (Yanggang Province)", "10"]
  ]
];
const KR = [
  "Korea, Republic of",
  "KR",
  [
    ["Chungcheongbuk-do", "43"],
    ["Chungcheongnam-do", "44"],
    ["Jeju-teukbyeoljachido", "49"],
    ["Jeollabuk-do", "45"],
    ["Jeollanam-do", "46"],
    ["Incheon-gwangyeoksi", "28"],
    ["Gangwon-do", "42"],
    ["Gwangju-gwangyeoksi", "29"],
    ["Gyeonggi-do", "41"],
    ["Gyeongsangbuk-do", "47"],
    ["Gyeongsangnam-do", "48"],
    ["Busan-gwangyeoksi", "26"],
    ["Seoul-teukbyeolsi", "11"],
    ["Sejong-teukbyeoljachisi", "50"],
    ["Daegu-gwangyeoksi", "27"],
    ["Daejeon-gwangyeoksi", "30"],
    ["Ulsan-gwangyeoksi", "31"]
  ]
];
const XK = [
  "Kosovo",
  "XK",
  [
    ["Farizaj", "FZ"],
    ["Gjakova", "GK"],
    ["Gjilan", "GL"],
    ["Mitrovica", "MI"],
    ["Peja/Peć", "PE"],
    ["Pristina", "PR"],
    ["Prizren", "PZ"]
  ]
];
const KW = [
  "Kuwait",
  "KW",
  [
    ["Al Aḩmadi", "AH"],
    ["Al Farwānīyah", "FA"],
    ["Al Jahrā’", "JA"],
    ["Al ‘Āşimah", "KU"],
    ["Ḩawallī", "HA"],
    ["Mubārak al Kabir", "MU"]
  ]
];
const KG = [
  "Kyrgyzstan",
  "KG",
  [
    ["Batken Oblasty", "B"],
    ["Bishkek Shaary", "GB"],
    ["Chuy Oblasty (Bishkek)", "C"],
    ["Jalal-Abad Oblasty", "J"],
    ["Naryn Oblasty", "N"],
    ["Osh Oblasty", "O"],
    ["Talas Oblasty", "T"],
    ["Ysyk-Kol Oblasty (Karakol)", "Y"]
  ]
];
const LA = [
  "Laos",
  "LA",
  [
    ["Attapu", "AT"],
    ["Bokèo", "BK"],
    ["Bolikhamxai", "BL"],
    ["Champasak", "CH"],
    ["Houaphan", "HO"],
    ["Khammouan", "KH"],
    ["Louang Namtha", "LM"],
    ["Louangphabang", "LP"],
    ["Oudômxai", "OU"],
    ["Phôngsali", "PH"],
    ["Salavan", "SL"],
    ["Savannakhét", "SV"],
    ["Vientiane", "VI"],
    ["Xaignabouli", "XA"],
    ["Xékong", "XE"],
    ["Xaisomboun", "XS"],
    ["Xiangkhouang", "XI"]
  ]
];
const LV = [
  "Latvia",
  "LV",
  [
    ["Aglona", "001"],
    ["Aizkraukle", "002"],
    ["Aizpute", "003"],
    ["Aknīste", "004"],
    ["Aloja", "005"],
    ["Alsunga", "06"],
    ["Alūksne", "007"],
    ["Amata", "008"],
    ["Ape", "009"],
    ["Auce", "010"],
    ["Ādaži", "011"],
    ["Babīte", "012"],
    ["Baldone", "013"],
    ["Baltinava", "014"],
    ["Balvi", "015"],
    ["Bauska", "016"],
    ["Beverīna", "017"],
    ["Brocēni", "018"],
    ["Burtnieki", "019"],
    ["Carnikava", "020"],
    ["Cesvaine", "021"],
    ["Cēsis", "022"],
    ["Cibla", "023"],
    ["Dagda", "024"],
    ["Daugavpils", "025"],
    ["Daugavpils (City)", "DGV"],
    ["Dobele", "026"],
    ["Dundaga", "027"],
    ["Durbe", "028"],
    ["Engure", "029"],
    ["Ērgļi", "030"],
    ["Garkalne", "031"],
    ["Grobiņa", "032"],
    ["Gulbene", "033"],
    ["Iecava", "034"],
    ["Ikšķile", "035"],
    ["Ilūkste", "036"],
    ["Inčukalns", "037"],
    ["Jaunjelgava", "038"],
    ["Jaunpiebalga", "039"],
    ["Jaunpils", "040"],
    ["Jelgava", "041"],
    ["Jelgava (City)", "JEL"],
    ["Jēkabpils", "042"],
    ["Jēkabpils (City)", "JKB"],
    ["Jūrmala (City)", "JUR"],
    ["Kandava", "043"],
    ["Kārsava", "044"],
    ["Kocēni", "045"],
    ["Koknese", "046"],
    ["Krāslava", "047"],
    ["Krimulda", "048"],
    ["Krustpils", "049"],
    ["Kuldīga", "050"],
    ["Ķegums", "051"],
    ["Ķekava", "052"],
    ["Lielvārde", "053"],
    ["Liepāja", "LPX"],
    ["Limbaži", "054"],
    ["Līgatne", "055"],
    ["Līvāni", "056"],
    ["Lubāna", "057"],
    ["Ludza", "058"],
    ["Madona", "059"],
    ["Mazsalaca", "060"],
    ["Mālpils", "061"],
    ["Mārupe", "062"],
    ["Mērsrags", "063"],
    ["Naukšēni", "064"],
    ["Nereta", "065"],
    ["Nīca", "066"],
    ["Ogre", "067"],
    ["Olaine", "068"],
    ["Ozolnieki", "069"],
    ["Pārgauja", "070"],
    ["Pāvilosta", "071"],
    ["Pļaviņas", "072"],
    ["Preiļi", "073"],
    ["Priekule", "074"],
    ["Priekuļi", "075"],
    ["Rauna", "076"],
    ["Rēzekne", "077"],
    ["Rēzekne (City)", "REZ"],
    ["Riebiņi", "078"],
    ["Rīga", "RIX"],
    ["Roja", "079"],
    ["Ropaži", "080"],
    ["Rucava", "081"],
    ["Rugāji", "082"],
    ["Rundāle", "083"],
    ["Rūjiena", "084"],
    ["Sala", "085"],
    ["Salacgrīva", "086"],
    ["Salaspils", "087"],
    ["Saldus", "088"],
    ["Saulkrasti", "089"],
    ["Sēja", "090"],
    ["Sigulda", "091"],
    ["Skrīveri", "092"],
    ["Skrunda", "093"],
    ["Smiltene", "094"],
    ["Stopiņi", "095"],
    ["Strenči", "096"],
    ["Talsi", "097"],
    ["Tērvete", "098"],
    ["Tukums", "099"],
    ["Vaiņode", "100"],
    ["Valka", "101"],
    ["Valmiera", "VMR"],
    ["Varakļāni", "102"],
    ["Vārkava", "103"],
    ["Vecpiebalga", "104"],
    ["Vecumnieki", "105"],
    ["Ventspils", "106"],
    ["Ventspils (City)", "VEN"],
    ["Viesīte", "107"],
    ["Viļaka", "108"],
    ["Viļāni", "109"],
    ["Zilupe", "110"]
  ]
];
const LB = [
  "Lebanon",
  "LB",
  [
    ["Aakkâr", "AK"],
    ["Baalbelk-Hermel", "BH"],
    ["Béqaa", "BI"],
    ["Beyrouth", "BA"],
    ["Liban-Nord", "AS"],
    ["Liban-Sud", "JA"],
    ["Mont-Liban", "JL"],
    ["Nabatîyé", "NA"]
  ]
];
const LS = [
  "Lesotho",
  "LS",
  [
    ["Berea", "D"],
    ["Butha-Buthe", "B"],
    ["Leribe", "C"],
    ["Mafeteng", "E"],
    ["Maseru", "A"],
    ["Mohales Hoek", "F"],
    ["Mokhotlong", "J"],
    ["Qacha's Nek", "H"],
    ["Quthing", "G"],
    ["Thaba-Tseka", "K"]
  ]
];
const LR = [
  "Liberia",
  "LR",
  [
    ["Bomi", "BM"],
    ["Bong", "BG"],
    ["Gbarpolu", "GP"],
    ["Grand Bassa", "GB"],
    ["Grand Cape Mount", "CM"],
    ["Grand Gedeh", "GG"],
    ["Grand Kru", "GK"],
    ["Lofa", "LO"],
    ["Margibi", "MG"],
    ["Maryland", "MY"],
    ["Montserrado", "MO"],
    ["Nimba", "NI"],
    ["River Cess", "RI"],
    ["River Geee", "RG"],
    ["Sinoe", "SI"]
  ]
];
const LY = [
  "Libya",
  "LY",
  [
    ["Al Buţnān", "BU"],
    ["Al Jabal al Akhḑar", "JA"],
    ["Al Jabal al Gharbī", "JG"],
    ["Al Jafārah", "JI"],
    ["Al Jufrah", "JU"],
    ["Al Kufrah", "FK"],
    ["Al Marj", "MJ"],
    ["Al Marquab", "MB"],
    ["Al Wāḩāt", "WA"],
    ["An Nuqaţ al Khams", "NQ"],
    ["Az Zāwiyah", "ZA"],
    ["Banghāzī", "BA"],
    ["Darnah", "DR"],
    ["Ghāt", "GH"],
    ["Mişrātah", "MI"],
    ["Murzuq", "MQ"],
    ["Nālūt", "NL"],
    ["Sabhā", "SB"],
    ["Surt", "SR"],
    ["Ţarābulus", "TB"],
    ["Yafran", "WD"],
    ["Wādī ash Shāţiʾ", "WS"]
  ]
];
const LI = [
  "Liechtenstein",
  "LI",
  [
    ["Balzers", "01"],
    ["Eschen", "02"],
    ["Gamprin", "03"],
    ["Mauren", "04"],
    ["Planken", "05"],
    ["Ruggell", "06"],
    ["Schaan", "07"],
    ["Schellenberg", "08"],
    ["Triesen", "09"],
    ["Triesenberg", "10"],
    ["Vaduz", "11"]
  ]
];
const LT = [
  "Lithuania",
  "LT",
  [
    ["Alytaus", "AL"],
    ["Kauno", "KU"],
    ["Klaipėdos", "KL"],
    ["Marijampolės", "MR"],
    ["Panevėžio", "PN"],
    ["Šiaulių", "SA"],
    ["Tauragės", "TA"],
    ["Telšių", "TE"],
    ["Utenos", "UT"],
    ["Vilniaus", "VL"]
  ]
];
const LU = [
  "Luxembourg",
  "LU",
  [
    ["Capellen", "CA"],
    ["Clevaux", "CL"],
    ["Diekirch", "DI"],
    ["Echternach", "EC"],
    ["Esch-sur-Alzette", "ES"],
    ["Grevenmacher", "GR"],
    ["Luxembourg", "LU"],
    ["Mersch", "ME"],
    ["Redange", "RD"],
    ["Remich", "RM"],
    ["Vianden", "VD"],
    ["Wiltz", "WI"]
  ]
];
const MO = [
  "Macao",
  "MO",
  [
    ["Macao", "undefined"]
  ]
];
const MK = [
  "Macedonia, Republic of",
  "MK",
  [
    ["Aračinovo", "02"],
    ["Berovo", "03"],
    ["Bitola", "04"],
    ["Bogdanci", "05"],
    ["Bogovinje", "06"],
    ["Bosilovo", "07"],
    ["Brvenica", "08"],
    ["Centar Župa", "78"],
    ["Čaška", "80"],
    ["Češinovo-Obleševo", "81"],
    ["Čučer Sandevo", "82"],
    ["Debar", "21"],
    ["Debarca", "22"],
    ["Delčevo", "23"],
    ["Demir Hisar", "25"],
    ["Demir Kapija", "24"],
    ["Doran", "26"],
    ["Dolneni", "27"],
    ["Gevgelija", "18"],
    ["Gostivar", "19"],
    ["Gradsko", "20"],
    ["Ilinden", "34"],
    ["Jegunovce", "35"],
    ["Karbinci", "37"],
    ["Kavadarci", "36"],
    ["Kičevo", "40"],
    ["Kočani", "42"],
    ["Konče", "41"],
    ["Kratovo", "43"],
    ["Kriva Palanka", "44"],
    ["Krivogaštani", "45"],
    ["Kruševo", "46"],
    ["Kumanovo", "47"],
    ["Lipkovo", "48"],
    ["Lozovo", "49"],
    ["Makedonska Kamenica", "51"],
    ["Makedonski Brod", "52"],
    ["Mavrovo i Rostuša", "50"],
    ["Mogila", "53"],
    ["Negotino", "54"],
    ["Novaci", "55"],
    ["Novo Selo", "56"],
    ["Ohrid", "58"],
    ["Pehčevo", "60"],
    ["Petrovec", "59"],
    ["Plasnica", "61"],
    ["Prilep", "62"],
    ["Probištip", "63"],
    ["Radoviš", ""],
    ["Rankovce", "65"],
    ["Resen", "66"],
    ["Rosoman", "67"],
    ["Skopje", "85"],
    ["Sopište", "70"],
    ["Staro Nagoričane", "71"],
    ["Struga", "72"],
    ["Strumica", "73"],
    ["Studeničani", "74"],
    ["Sveti Nikole", "69"],
    ["Štip", "83"],
    ["Tearce", "75"],
    ["Tetovo", "76"],
    ["Valandovo", "10"],
    ["Vasilevo", "11"],
    ["Veles", "13"],
    ["Vevčani", "12"],
    ["Vinica", "14"],
    ["Vrapčište", "16"],
    ["Zelenikovo", "32"],
    ["Zrnovci", "33"],
    ["Želino", "30"]
  ]
];
const MG = [
  "Madagascar",
  "MG",
  [
    ["Antananarivo", "T"],
    ["Antsiranana", "D"],
    ["Fianarantsoa", "F"],
    ["Mahajanga", "M"],
    ["Toamasina", "A"],
    ["Toliara", "U"]
  ]
];
const MW = [
  "Malawi",
  "MW",
  [
    ["Balaka", "BA"],
    ["Blantyre", "BL"],
    ["Chikwawa", "CK"],
    ["Chiradzulu", "CR"],
    ["Chitipa", "CT"],
    ["Dedza", "DE"],
    ["Dowa", "DO"],
    ["Karonga", "KR"],
    ["Kasungu", "KS"],
    ["Likoma", "LK"],
    ["Lilongwe", "LI"],
    ["Machinga", "MH"],
    ["Mangochi", "MG"],
    ["Mchinji", "MC"],
    ["Mulanje", "MU"],
    ["Mwanza", "MW"],
    ["Mzimba", "MZ"],
    ["Nkhata Bay", "NE"],
    ["Nkhotakota", "NB"],
    ["Nsanje", "NS"],
    ["Ntcheu", "NU"],
    ["Ntchisi", "NI"],
    ["Phalombe", "PH"],
    ["Rumphi", "RU"],
    ["Salima", "SA"],
    ["Thyolo", "TH"],
    ["Zomba", "ZO"]
  ]
];
const MY = [
  "Malaysia",
  "MY",
  [
    ["Johor", "01"],
    ["Kedah", "02"],
    ["Kelantan", "03"],
    ["Melaka", "04"],
    ["Negeri Sembilan", "05"],
    ["Pahang", "06"],
    ["Perak", "08"],
    ["Perlis", "09"],
    ["Pulau Pinang", "07"],
    ["Sabah", "12"],
    ["Sarawak", "13"],
    ["Selangor", "10"],
    ["Terengganu", "11"],
    ["Wilayah Persekutuan (Kuala Lumpur)", "14"],
    ["Wilayah Persekutuan (Labuan)", "15"],
    ["Wilayah Persekutuan (Putrajaya)", "16"]
  ]
];
const MV = [
  "Maldives",
  "MV",
  [
    ["Alifu Alifu", "02"],
    ["Alifu Dhaalu", "00"],
    ["Baa", "20"],
    ["Dhaalu", "17"],
    ["Faafu", "14"],
    ["Gaafu Alifu", "27"],
    ["Gaafu Dhaalu", "28"],
    ["Gnaviyani", "29"],
    ["Haa Alifu", "07"],
    ["Haa Dhaalu", "23"],
    ["Kaafu", "26"],
    ["Laamu", "05"],
    ["Lhaviyani", "03"],
    ["Malé", "MLE"],
    ["Meemu", "12"],
    ["Noonu", "25"],
    ["Raa", "13"],
    ["Seenu", "01"],
    ["Shaviyani", "24"],
    ["Thaa", "08"],
    ["Vaavu", "04"]
  ]
];
const ML = [
  "Mali",
  "ML",
  [
    ["Bamako", "BKO"],
    ["Gao", "7"],
    ["Kayes", "1"],
    ["Kidal", "8"],
    ["Koulikoro", "2"],
    ["Mopti", "5"],
    ["Segou", "4"],
    ["Sikasso", "3"],
    ["Tombouctou", "6"],
    ["Taoudénit", "9"],
    ["Ménaka", "10"]
  ]
];
const MT = [
  "Malta",
  "MT",
  [
    ["Attard", "01"],
    ["Balzan", "02"],
    ["Birgu", "03"],
    ["Birkirkara", "04"],
    ["Birżebbuġa", "05"],
    ["Bormla", "06"],
    ["Dingli", "07"],
    ["Fgura", "08"],
    ["Floriana", "09"],
    ["Fontana", "10"],
    ["Guda", "11"],
    ["Gżira", "12"],
    ["Għajnsielem", "13"],
    ["Għarb", "14"],
    ["Għargħur", "15"],
    ["Għasri", "16"],
    ["Għaxaq", "17"],
    ["Ħamrun", "18"],
    ["Iklin", "19"],
    ["Isla", "20"],
    ["Kalkara", "21"],
    ["Kerċem", "22"],
    ["Kirkop", "23"],
    ["Lija", "24"],
    ["Luqa", "25"],
    ["Marsa", "26"],
    ["Marsaskala", "27"],
    ["Marsaxlokk", "28"],
    ["Mdina", "29"],
    ["Mellieħa", "30"],
    ["Mġarr", "31"],
    ["Mosta", "32"],
    ["Mqabba", "33"],
    ["Msida", "34"],
    ["Mtarfa", "35"],
    ["Munxar", "36"],
    ["Nadur", "37"],
    ["Naxxar", "38"],
    ["Paola", "39"],
    ["Pembroke", "40"],
    ["Pietà", "41"],
    ["Qala", "42"],
    ["Qormi", "43"],
    ["Qrendi", "44"],
    ["Rabat Għawdex", "45"],
    ["Rabat Malta", "46"],
    ["Safi", "47"],
    ["San Ġiljan", "48"],
    ["San Ġwann", "49"],
    ["San Lawrenz", "50"],
    ["San Pawl il-Baħar", "51"],
    ["Sannat", "52"],
    ["Santa Luċija", "53"],
    ["Santa Venera", "54"],
    ["Siġġiewi", "55"],
    ["Sliema", "56"],
    ["Swieqi", "57"],
    ["Tai Xbiex", "58"],
    ["Tarzien", "59"],
    ["Valletta", "60"],
    ["Xagħra", "61"],
    ["Xewkija", "62"],
    ["Xgħajra", "63"],
    ["Żabbar", "64"],
    ["Żebbuġ Għawde", "65"],
    ["Żebbuġ Malta", "66"],
    ["Żejtun", "67"],
    ["Żurrieq", "68"]
  ]
];
const MH = [
  "Marshall Islands",
  "MH",
  [
    ["Ailinglaplap", "ALL"],
    ["Ailuk", "ALK"],
    ["Arno", "ARN"],
    ["Aur", "AUR"],
    ["Bikini and Kili", "KIL"],
    ["Ebon", "EBO"],
    ["Jabat", "JAB"],
    ["Jaluit", "JAL"],
    ["Kwajalein", "KWA"],
    ["Lae", "LAE"],
    ["Lib", "LIB"],
    ["Likiep", "LIK"],
    ["Majuro", "MAJ"],
    ["Maloelap", "MAL"],
    ["Mejit", "MEJ"],
    ["Namdrik", "NMK"],
    ["Namu", "NMU"],
    ["Rongelap", "RON"],
    ["Ujae", "UJA"],
    ["Utrik", "UTI"],
    ["Wotho", "WTH"],
    ["Wotje", "WTJ"]
  ]
];
const MQ = [
  "Martinique",
  "MQ",
  [
    ["Martinique", "undefined"]
  ]
];
const MR = [
  "Mauritania",
  "MR",
  [
    ["Adrar", "07"],
    ["Assaba", "03"],
    ["Brakna", "05"],
    ["Dakhlet Nouadhibou", "08"],
    ["Gorgol", "04"],
    ["Guidimaka", "10"],
    ["Hodh Ech Chargui", "01"],
    ["Hodh El Gharbi", "02"],
    ["Inchiri", "12"],
    ["Nouakchott Nord", "14"],
    ["Nouakchott Ouest", "13"],
    ["Nouakchott Sud", "15"],
    ["Tagant", "09"],
    ["Tiris Zemmour", "11"],
    ["Trarza", "06"]
  ]
];
const MU = [
  "Mauritius",
  "MU",
  [
    ["Agalega Islands", "AG"],
    ["Beau Bassin-Rose Hill", "BR"],
    ["Black River", "BL"],
    ["Cargados Carajos Shoals", "CC"],
    ["Curepipe", "CU"],
    ["Flacq", "FL"],
    ["Grand Port", "GP"],
    ["Moka", "MO"],
    ["Pamplemousses", "PA"],
    ["Plaines Wilhems", "PW"],
    ["Port Louis (City)", "PU"],
    ["Port Louis", "PL"],
    ["Riviere du Rempart", "RR"],
    ["Rodrigues Island", "RO"],
    ["Savanne", "SA"],
    ["Vacoas-Phoenix", "CP"]
  ]
];
const YT = [
  "Mayotte",
  "YT",
  [
    ["Dzaoudzi", "01"],
    ["Pamandzi", "02"],
    ["Mamoudzou", "03"],
    ["Dembeni", "04"],
    ["Bandrélé", "05"],
    ["Kani-Kéli", "06"],
    ["Bouéni", "07"],
    ["Chirongui", "08"],
    ["Sada", "09"],
    ["Ouangani", "10"],
    ["Chiconi", "11"],
    ["Tsingoni", "12"],
    ["M'Tsangamouji", "13"],
    ["Acoua", "14"],
    ["Mtsamboro", "15"],
    ["Bandraboua", "16"],
    ["Koungou", "17"]
  ]
];
const MX = [
  "Mexico",
  "MX",
  [
    ["Aguascalientes", "AGU"],
    ["Baja California", "BCN"],
    ["Baja California Sur", "BCS"],
    ["Campeche", "CAM"],
    ["Ciudad de México", "CMX"],
    ["Chiapas", "CHP"],
    ["Chihuahua", "CHH"],
    ["Coahuila de Zaragoza", "COA"],
    ["Colima", "COL"],
    ["Durango", "DUR"],
    ["Estado de México", "MEX"],
    ["Guanajuato", "GUA"],
    ["Guerrero", "GRO"],
    ["Hidalgo", "HID"],
    ["Jalisco", "JAL"],
    ["Michoacán de Ocampo", "MIC"],
    ["Morelos", "MOR"],
    ["Nayarit", "NAY"],
    ["Nuevo León", "NLE"],
    ["Oaxaca", "OAX"],
    ["Puebla", "PUE"],
    ["Querétaro de Arteaga", "QUE"],
    ["Quintana Roo", "ROO"],
    ["San Luis Potosí", "SLP"],
    ["Sinaloa", "SIN"],
    ["Sonora", "SON"],
    ["Tabasco", "TAB"],
    ["Tamaulipas", "TAM"],
    ["Tlaxcala", "TLA"],
    ["Veracruz", "VER"],
    ["Yucatán", "YUC"],
    ["Zacatecas", "ZAC"]
  ]
];
const FM = [
  "Micronesia, Federated States of",
  "FM",
  [
    ["Chuuk (Truk)", "TRK"],
    ["Kosrae", "KSA"],
    ["Pohnpei", "PNI"],
    ["Yap", "YAP"]
  ]
];
const MD = [
  "Moldova",
  "MD",
  [
    ["Aenii Noi", "AN"],
    ["Basarabeasca", "BS"],
    ["Bălți", "BA"],
    ["Bender", "BD"],
    ["Briceni", "BR"],
    ["Cahul", "CA"],
    ["Cantemir", "CT"],
    ["Călărași", "CL"],
    ["Căușeni", "CS"],
    ["Chișinău", "CU"],
    ["Cimișlia", "CM"],
    ["Criuleni", "CR"],
    ["Dondușeni", "DO"],
    ["Drochia", "DR"],
    ["Dubăsari", "DU"],
    ["Edineț", "ED"],
    ["Fălești", "FA"],
    ["Florești", "FL"],
    ["Găgăuzia", "GA"],
    ["Glodeni", "GL"],
    ["Hîncești", "HI"],
    ["Ialoveni", "IA"],
    ["Leova", "LE"],
    ["Nisporeni", "NI"],
    ["Ocnița", "OC"],
    ["Orhei", "OR"],
    ["Rezina", "RE"],
    ["Rîșcani", "RI"],
    ["Sîngerei", "SI"],
    ["Soroca", "SO"],
    ["Stânga Nistrului", "SN"],
    ["Strășeni", "ST"],
    ["Șoldănești", "SD"],
    ["Ștefan Vodă", "SV"],
    ["Taraclia", "TA"],
    ["Telenești", "TE"],
    ["Ungheni", "UN"]
  ]
];
const MC = [
  "Monaco",
  "MC",
  [
    ["Colle", "CL"],
    ["Condamine", "CO"],
    ["Fontvieille", "FO"],
    ["Gare", "GA"],
    ["Jardin Exotique", "JE"],
    ["Larvotto", "LA"],
    ["Malbousquet", "MA"],
    ["Monaco-Ville", "MO"],
    ["Moneghetti", "MG"],
    ["Monte-Carlo", "MC"],
    ["Moulins", "MU"],
    ["Port-Hercule", "PH"],
    ["Saint-Roman", "SR"],
    ["Sainte-Dévote", "SD"],
    ["Source", "SO"],
    ["Spélugues", "SP"],
    ["Vallon de la Rousse", "VR"]
  ]
];
const MN = [
  "Mongolia",
  "MN",
  [
    ["Arhangay", "073"],
    ["Bayan-Olgiy", "071"],
    ["Bayanhongor", "069"],
    ["Bulgan", "067"],
    ["Darhan", "037"],
    ["Dornod", "061"],
    ["Dornogovi", "063"],
    ["Dundgovi", "059"],
    ["Dzavhan", "057"],
    ["Govi-Altay", "065"],
    ["Govi-Sumber", "064"],
    ["Hovd", "043"],
    ["Hovsgol", "041"],
    ["Omnogovi", "053"],
    ["Ovorhangay", "055"],
    ["Selenge", "049"],
    ["Suhbaatar", "051"],
    ["Tov", "047"],
    ["Ulaanbaatar", "1"],
    ["Uvs", "046"],
    ["Erdenet", "074"]
  ]
];
const ME = [
  "Montenegro",
  "ME",
  [
    ["Andrijevica", "01"],
    ["Bar", "02"],
    ["Berane", "03"],
    ["Bijelo Polje", "04"],
    ["Budva", "05"],
    ["Cetinje", "06"],
    ["Danilovgrad", "07"],
    ["Gusinje", "22"],
    ["Herceg Novi", "08"],
    ["Kolašin", "09"],
    ["Kotor", "10"],
    ["Mojkovac", "11"],
    ["Nikšić", "12"],
    ["Petnica", "23"],
    ["Plav", "13"],
    ["Plužine", "14"],
    ["Pljevlja", "15"],
    ["Podgorica", "16"],
    ["Rožaje", "17"],
    ["Šavnik", "18"],
    ["Tivat", "19"],
    ["Ulcinj", "20"],
    ["Žabljak", "21"]
  ]
];
const MS = [
  "Montserrat",
  "MS",
  [
    ["Saint Anthony", "undefined"],
    ["Saint Georges", "undefined"],
    ["Saint Peter's", "undefined"]
  ]
];
const MA = [
  "Morocco",
  "MA",
  [
    ["Tanger-Tétouan-Al Hoceïma", "MA-01"],
    ["L'Oriental", "MA-02"],
    ["Fès-Meknès", "MA-03"],
    ["Rabat-Salé-Kénitra", "MA-04"],
    ["Béni Mellal-Khénifra", "MA-05"],
    ["Casablanca-Settat", "MA-06"],
    ["Marrakech-Safi", "MA-07"],
    ["Drâa-Tafilalet", "MA-08"],
    ["Souss-Massa", "MA-09"],
    ["Guelmim-Oued Noun", "MA-10"],
    ["Laâyoune-Sakia El Hamra", "MA-11"],
    ["Dakhla-Oued Ed-Dahab", "MA-12"]
  ]
];
const MZ = [
  "Mozambique",
  "MZ",
  [
    ["Cabo Delgado", "P"],
    ["Gaza", "G"],
    ["Inhambane", "I"],
    ["Manica", "B"],
    ["Maputo", "L"],
    ["Maputo (City)", "MPM"],
    ["Nampula", "N"],
    ["Niassa", "A"],
    ["Sofala", "S"],
    ["Tete", "T"],
    ["Zambezia", "Q"]
  ]
];
const MM = [
  "Myanmar",
  "MM",
  [
    ["Ayeyarwady", "07"],
    ["Bago", "02"],
    ["Chin", "14"],
    ["Kachin", "11"],
    ["Kayah", "12"],
    ["Kayin", "13"],
    ["Magway", "03"],
    ["Mandalay", "04"],
    ["Mon", "15"],
    ["Nay Pyi Taw", "18"],
    ["Rakhine", "16"],
    ["Sagaing", "01"],
    ["Shan", "17"],
    ["Tanintharyi", "05"],
    ["Yangon", "06"]
  ]
];
const NA = [
  "Namibia",
  "NA",
  [
    ["Erongo", "ER"],
    ["Hardap", "HA"],
    ["Kavango East", "KE"],
    ["Kavango West", "KW"],
    ["Karas", "KA"],
    ["Khomas", "KH"],
    ["Kunene", "KU"],
    ["Ohangwena", "OW"],
    ["Omaheke", "OH"],
    ["Omusati", "OS"],
    ["Oshana", "ON"],
    ["Oshikoto", "OT"],
    ["Otjozondjupa", "OD"],
    ["Zambezi", "CA"]
  ]
];
const NR = [
  "Nauru",
  "NR",
  [
    ["Aiwo", "01"],
    ["Anabar", "02"],
    ["Anetan", "03"],
    ["Anibare", "04"],
    ["Baiti", "05"],
    ["Boe", "06"],
    ["Buada", "07"],
    ["Denigomodu", "08"],
    ["Ewa", "09"],
    ["Ijuw", "10"],
    ["Meneng", "11"],
    ["Nibok", "12"],
    ["Uaboe", "13"],
    ["Yaren", "14"]
  ]
];
const NP = [
  "Nepal",
  "NP",
  [
    ["Province No. 1", "1"],
    ["Madhesh Province", "2"],
    ["Bagmati Province", "3"],
    ["Gandaki Province", "4"],
    ["Lumbini Province", "5"],
    ["Karnali Province", "6"],
    ["Sudurpashchim Province", "7"]
  ]
];
const NL = [
  "Netherlands",
  "NL",
  [
    ["Drenthe", "DR"],
    ["Flevoland", "FL"],
    ["Friesland", "FR"],
    ["Gelderland", "GE"],
    ["Groningen", "GR"],
    ["Limburg", "LI"],
    ["Noord-Brabant", "NB"],
    ["Noord-Holland", "NH"],
    ["Overijssel", "OV"],
    ["Utrecht", "UT"],
    ["Zeeland", "ZE"],
    ["Zuid-Holland", "ZH"]
  ]
];
const NC = [
  "New Caledonia",
  "NC",
  [
    ["Iles Loyaute", "undefined"],
    ["Nord", "undefined"],
    ["Sud", "undefined"]
  ]
];
const NZ = [
  "New Zealand",
  "NZ",
  [
    ["Auckland", "AUK"],
    ["Bay of Plenty", "BOP"],
    ["Canterbury", "CAN"],
    ["Gisborne", "GIS"],
    ["Hawke's Bay", "HKB"],
    ["Marlborough", "MBH"],
    ["Manawatu-Wanganui", "MWT"],
    ["Northland", "NTL"],
    ["Nelson", "NSN"],
    ["Otago", "OTA"],
    ["Southland", "STL"],
    ["Taranaki", "TKI"],
    ["Tasman", "TAS"],
    ["Waikato", "WKO"],
    ["Wellington", "WGN"],
    ["West Coast", "WTC"],
    ["Chatham Islands Territory", "CIT"]
  ]
];
const NI = [
  "Nicaragua",
  "NI",
  [
    ["Boaco", "BO"],
    ["Carazo", "CA"],
    ["Chinandega", "CI"],
    ["Chontales", "CO"],
    ["Estelí", "ES"],
    ["Granada", "GR"],
    ["Jinotega", "JI"],
    ["León", "LE"],
    ["Madriz", "MD"],
    ["Managua", "MN"],
    ["Masaya", "MS"],
    ["Matagalpa", "MT"],
    ["Nueva Segovia", "NS"],
    ["Río San Juan", "SJ"],
    ["Rivas", "RI"],
    ["Atlántico Norte", "AN"],
    ["Atlántico Sur", "AS"]
  ]
];
const NE = [
  "Niger",
  "NE",
  [
    ["Agadez", "1"],
    ["Diffa", "2"],
    ["Dosso", "3"],
    ["Maradi", "4"],
    ["Niamey", "8"],
    ["Tahoua", "5"],
    ["Tillabéri", "6"],
    ["Zinder", "7"]
  ]
];
const NG = [
  "Nigeria",
  "NG",
  [
    ["Abia", "AB"],
    ["Abuja Federal Capital Territory", "FC"],
    ["Adamawa", "AD"],
    ["Akwa Ibom", "AK"],
    ["Anambra", "AN"],
    ["Bauchi", "BA"],
    ["Bayelsa", "BY"],
    ["Benue", "BE"],
    ["Borno", "BO"],
    ["Cross River", "CR"],
    ["Delta", "DE"],
    ["Ebonyi", "EB"],
    ["Edo", "ED"],
    ["Ekiti", "EK"],
    ["Enugu", "EN"],
    ["Gombe", "GO"],
    ["Imo", "IM"],
    ["Jigawa", "JI"],
    ["Kaduna", "KD"],
    ["Kano", "KN"],
    ["Katsina", "KT"],
    ["Kebbi", "KE"],
    ["Kogi", "KO"],
    ["Kwara", "KW"],
    ["Lagos", "LA"],
    ["Nassarawa", "NA"],
    ["Niger", "NI"],
    ["Ogun", "OG"],
    ["Ondo", "ON"],
    ["Osun", "OS"],
    ["Oyo", "OY"],
    ["Plateau", "PL"],
    ["Rivers", "RI"],
    ["Sokoto", "SO"],
    ["Taraba", "TA"],
    ["Yobe", "YO"],
    ["Zamfara", "ZA"]
  ]
];
const NU = [
  "Niue",
  "NU",
  [
    ["Niue", "undefined"]
  ]
];
const NF = [
  "Norfolk Island",
  "NF",
  [
    ["Norfolk Island", "undefined"]
  ]
];
const MP = [
  "Northern Mariana Islands",
  "MP",
  [
    ["Northern Islands", "undefined"],
    ["Rota", "undefined"],
    ["Saipan", "undefined"],
    ["Tinian", "undefined"]
  ]
];
const NO = [
  "Norway",
  "NO",
  [
    ["Akershus", "02"],
    ["Aust-Agder", "09"],
    ["Buskerud", "06"],
    ["Finnmark", "20"],
    ["Hedmark", "04"],
    ["Hordaland", "12"],
    ["Møre og Romsdal", "15"],
    ["Nordland", "18"],
    ["Nord-Trøndelag", "17"],
    ["Oppland", "05"],
    ["Oslo", "03"],
    ["Rogaland", "11"],
    ["Sogn og Fjordane", "14"],
    ["Sør-Trøndelag", "16"],
    ["Telemark", "08"],
    ["Troms", "19"],
    ["Vest-Agder", "10"],
    ["Vestfold", "07"],
    ["Østfold", "01"],
    ["Jan Mayen", "22"],
    ["Svalbard", "21"]
  ]
];
const OM = [
  "Oman",
  "OM",
  [
    ["Ad Dakhiliyah", "DA"],
    ["Al Buraymi", "BU"],
    ["Al Wusta", "WU"],
    ["Az Zahirah", "ZA"],
    ["Janub al Batinah", "BS"],
    ["Janub ash Sharqiyah", "SS"],
    ["Masqat", "MA"],
    ["Musandam", "MU"],
    ["Shamal al Batinah", "BJ"],
    ["Shamal ash Sharqiyah", "SJ"],
    ["Zufar", "ZU"]
  ]
];
const PK = [
  "Pakistan",
  "PK",
  [
    ["Āzād Kashmīr", "JK"],
    ["Balōchistān", "BA"],
    ["Gilgit-Baltistān", "GB"],
    ["Islāmābād", "IS"],
    ["Khaībar Pakhtūnkhwās", "KP"],
    ["Punjāb", "PB"],
    ["Sindh", "SD"],
    ["Federally Administered Tribal Areas", "TA"]
  ]
];
const PW = [
  "Palau",
  "PW",
  [
    ["Aimeliik", "002"],
    ["Airai", "004"],
    ["Angaur", "010"],
    ["Hatobohei", "050"],
    ["Kayangel", "100"],
    ["Koror", "150"],
    ["Melekeok", "212"],
    ["Ngaraard", "214"],
    ["Ngarchelong", "218"],
    ["Ngardmau", "222"],
    ["Ngatpang", "224"],
    ["Ngchesar", "226"],
    ["Ngeremlengui", "227"],
    ["Ngiwal", "228"],
    ["Peleliu", "350"],
    ["Sonsoral", "370"]
  ]
];
const PS = [
  "Palestine, State of",
  "PS",
  [
    ["Ak Khalīl", "HBN"],
    ["Al Quds", "JEM"],
    ["Arīḩā wal Aghwār", "JRH"],
    ["Bayt Laḩm", "BTH"],
    ["Dayr al Balaḩ", "DEB"],
    ["Ghazzah", "GZA"],
    ["Janīn", "JEN"],
    ["Khān Yūnis", "KYS"],
    ["Nāblus", "NBS"],
    ["Qalqīyah", "QQA"],
    ["Rafaḩ", "RFH"],
    ["Rām Allāh wal Bīrah", "RBH"],
    ["Salfīt", "SLT"],
    ["Shamāl Ghazzah", "NGZ"],
    ["Ţūbās", "TBS"],
    ["Ţūlkarm", "TKM"]
  ]
];
const PA = [
  "Panama",
  "PA",
  [
    ["Bocas del Toro", "1"],
    ["Chiriquí", "4"],
    ["Coclé", "2"],
    ["Colón", "3"],
    ["Darién", "5"],
    ["Emberá", "EM"],
    ["Herrera", "6"],
    ["Kuna Yala", "KY"],
    ["Los Santos", "7"],
    ["Ngäbe-Buglé", "NB"],
    ["Panamá", "8"],
    ["Panamá Oeste", "10"],
    ["Veraguas", "9"]
  ]
];
const PG = [
  "Papua New Guinea",
  "PG",
  [
    ["Bougainville", "NSB"],
    ["Central", "CPM"],
    ["Chimbu", "CPK"],
    ["East New Britain", "EBR"],
    ["East Sepik", "ESW"],
    ["Eastern Highlands", "EHG"],
    ["Enga", "EPW"],
    ["Gulf", "GPK"],
    ["Hela", "HLA"],
    ["Jiwaka", "JWK"],
    ["Madang", "MOM"],
    ["Manus", "MRL"],
    ["Milne Bay", "MBA"],
    ["Morobe", "MPL"],
    ["Port Moresby", "NCD"],
    ["New Ireland", "NIK"],
    ["Northern", "NPP"],
    ["Southern Highlands", "SHM"],
    ["West New Britain", "WBK"],
    ["West Sepik", "SAN"],
    ["Western", "WPD"],
    ["Western Highlands", "WHM"]
  ]
];
const PY = [
  "Paraguay",
  "PY",
  [
    ["Alto Paraguay", "16"],
    ["Alto Parana", "10"],
    ["Amambay", "13"],
    ["Asuncion", "ASU"],
    ["Caaguazu", "5"],
    ["Caazapa", "6"],
    ["Canindeyu", "14"],
    ["Central", "11"],
    ["Concepcion", "1"],
    ["Cordillera", "3"],
    ["Boqueron", "17"],
    ["Guaira", "4"],
    ["Itapua", "7"],
    ["Misiones", "8"],
    ["Neembucu", "12"],
    ["Paraguari", "9"],
    ["Presidente Hayes", "15"],
    ["San Pedro", "2"]
  ]
];
const PE = [
  "Peru",
  "PE",
  [
    ["Amazonas", "AMA"],
    ["Ancash", "ANC"],
    ["Apurimac", "APU"],
    ["Arequipa", "ARE"],
    ["Ayacucho", "AYA"],
    ["Cajamarca", "CAJ"],
    ["Callao", "CAL"],
    ["Cusco", "CUS"],
    ["Huancavelica", "HUV"],
    ["Huanuco", "HUC"],
    ["Ica", "ICA"],
    ["Junin", "JUN"],
    ["La Libertad", "LAL"],
    ["Lambayeque", "LAM"],
    ["Lima", "LIM"],
    ["Loreto", "LOR"],
    ["Madre de Dios", "MDD"],
    ["Moquegua", "MOQ"],
    ["Municipalidad Metropolitana de Lima", "LMA"],
    ["Pasco", "PAS"],
    ["Piura", "PIU"],
    ["Puno", "PUN"],
    ["San Martin", "SAM"],
    ["Tacna", "TAC"],
    ["Tumbes", "TUM"],
    ["Ucayali", "UCA"]
  ]
];
const PH = [
  "Philippines",
  "PH",
  [
    ["Abra", "ABR"],
    ["Agusan del Norte", "AGN"],
    ["Agusan del Sur", "AGS"],
    ["Aklan", "AKL"],
    ["Albay", "ALB"],
    ["Antique", "ANT"],
    ["Apayao", "APA"],
    ["Aurora", "AUR"],
    ["Basilan", "BAS"],
    ["Bataan", "BAN"],
    ["Batanes", "BTN"],
    ["Batangas", "BTG"],
    ["Benguet", "BEN"],
    ["Biliran", "BIL"],
    ["Bohol", "BOH"],
    ["Bukidnon", "BUK"],
    ["Bulacan", "BUL"],
    ["Cagayan", "CAG"],
    ["Camarines Norte", "CAN"],
    ["Camarines Sur", "CAS"],
    ["Camiguin", "CAM"],
    ["Capiz", "CAP"],
    ["Catanduanes", "CAT"],
    ["Cavite", "CAV"],
    ["Cebu", "CEB"],
    ["Cotabato", "NCO"],
    ["Davao del Norte", "DAV"],
    ["Davao del Sur", "DAS"],
    ["Davao Occidental", "DVO"],
    ["Davao Oriental", "DAO"],
    ["Davao de Oro", "COM"],
    ["Dinagat Islands", "DIN"],
    ["Eastern Samar", "EAS"],
    ["Guimaras", "GUI"],
    ["Ifugao", "IFU"],
    ["Ilocos Norte", "ILN"],
    ["Ilocos Sur", "ILS"],
    ["Iloilo", "ILI"],
    ["Isabela", "ISA"],
    ["Kalinga", "KAL"],
    ["La Union", "LUN"],
    ["Laguna", "LAG"],
    ["Lanao del Norte", "LAN"],
    ["Lanao del Sur", "LAS"],
    ["Leyte", "LEY"],
    ["Maguindanao", "MAG"],
    ["Marinduque", "MAD"],
    ["Masbate", "MAS"],
    ["Metro Manila", "00"],
    ["Mindoro Occidental", "MDC"],
    ["Mindoro Oriental", "MDR"],
    ["Misamis Occidental", "MSC"],
    ["Misamis Oriental", "MSR"],
    ["Mountain Province", "MOU"],
    ["Negros Occidental", "NEC"],
    ["Negros Oriental", "NER"],
    ["Northern Samar", "NSA"],
    ["Nueva Ecija", "NUE"],
    ["Nueva Vizcaya", "NUV"],
    ["Palawan", "PLW"],
    ["Pampanga", "PAM"],
    ["Pangasinan", "PAN"],
    ["Quezon", "QUE"],
    ["Quirino", "QUI"],
    ["Rizal", "RIZ"],
    ["Romblon", "ROM"],
    ["Samar", "WSA"],
    ["Sarangani", "SAR"],
    ["Siquijor", "SIG"],
    ["Sorsogon", "SOR"],
    ["South Cotabato", "SCO"],
    ["Southern Leyte", "SLE"],
    ["Sultan Kudarat", "AUK"],
    ["Sulu", "SLU"],
    ["Surigao del Norte", "SUN"],
    ["Surigao del Sur", "SUR"],
    ["Tarlac", "TAR"],
    ["Tawi-Tawi", "TAW"],
    ["Zambales", "ZMB"],
    ["Zamboanga del Norte", "ZAN"],
    ["Zamboanga del Sur", "ZAS"],
    ["Zamboanga Sibugay", "ZSI"]
  ]
];
const PN = [
  "Pitcairn",
  "PN",
  [
    ["Pitcairn Islands", "undefined"]
  ]
];
const PL = [
  "Poland",
  "PL",
  [
    ["Dolnośląskie", "02"],
    ["Kujawsko-pomorskie", "04"],
    ["Łódzkie", "10"],
    ["Lubelskie", "06"],
    ["Lubuskie", "08"],
    ["Małopolskie", "12"],
    ["Mazowieckie", "14"],
    ["Opolskie", "16"],
    ["Podkarpackie", "18"],
    ["Podlaskie", "20"],
    ["Pomorskie", "22"],
    ["Śląskie", "24"],
    ["Świętokrzyskie", "26"],
    ["Warmińsko-mazurskie", "28"],
    ["Wielkopolskie", "30"],
    ["Zachodniopomorskie", "32"]
  ]
];
const PT = [
  "Portugal",
  "PT",
  [
    ["Açores", "20"],
    ["Aveiro", "01"],
    ["Beja", "02"],
    ["Braga", "03"],
    ["Bragança", "04"],
    ["Castelo Branco", "05"],
    ["Coimbra", "06"],
    ["Évora", "07"],
    ["Faro", "08"],
    ["Guarda", "09"],
    ["Leiria", "10"],
    ["Lisboa", "11"],
    ["Madeira", "30"],
    ["Portalegre", "12"],
    ["Porto", "13"],
    ["Santarém", "14"],
    ["Setúbal", "15"],
    ["Viana do Castelo", "16"],
    ["Vila Real", "17"],
    ["Viseu", "18"]
  ]
];
const PR = [
  "Puerto Rico",
  "PR",
  [
    ["Adjuntas", "undefined"],
    ["Aguada", "undefined"],
    ["Aguadilla", "undefined"],
    ["Aguas Buenas", "undefined"],
    ["Aibonito", "undefined"],
    ["Anasco", "undefined"],
    ["Arecibo", "undefined"],
    ["Arroyo", "undefined"],
    ["Barceloneta", "undefined"],
    ["Barranquitas", "undefined"],
    ["Bayamon", "undefined"],
    ["Cabo Rojo", "undefined"],
    ["Caguas", "undefined"],
    ["Camuy", "undefined"],
    ["Canovanas", "undefined"],
    ["Carolina", "undefined"],
    ["Cat", "undefined"],
    ["Ceiba", "undefined"],
    ["Ciales", "undefined"],
    ["Cidra", "undefined"],
    ["Coamo", "undefined"],
    ["Comerio", "undefined"],
    ["Corozal", "undefined"],
    ["Culebra", "undefined"],
    ["Dorado", "undefined"],
    ["Fajardo", "undefined"],
    ["Florida", "undefined"],
    ["Guanica", "undefined"],
    ["Guayama", "undefined"],
    ["Guayanilla", "undefined"],
    ["Guaynabo", "undefined"],
    ["Gurabo", "undefined"],
    ["Hatillo", "undefined"],
    ["Hormigueros", "undefined"],
    ["Humacao", "undefined"],
    ["Isabe", "undefined"],
    ["Juana Diaz", "undefined"],
    ["Juncos", "undefined"],
    ["Lajas", "undefined"],
    ["Lares", "undefined"],
    ["Las Marias", "undefined"],
    ["Las oiza", "undefined"],
    ["Luquillo", "undefined"],
    ["Manati", "undefined"],
    ["Maricao", "undefined"],
    ["Maunabo", "undefined"],
    ["Mayaguez", "undefined"],
    ["Moca", "undefined"],
    ["Morovis", "undefined"],
    ["Naguabo", "undefined"],
    ["Naranjito", "undefined"],
    ["Orocovis", "undefined"],
    ["Patillas", "undefined"],
    ["Penuelas", "undefined"],
    ["Ponce", "undefined"],
    ["Quebradillas", "undefined"],
    ["Rincon", "undefined"],
    ["Rio Grande", "undefined"],
    ["Sabana linas", "undefined"],
    ["San German", "undefined"],
    ["San Juan", "undefined"],
    ["San Lorenzo", "undefined"],
    ["San Sebastian", "undefined"],
    ["Santa Isabel", "undefined"],
    ["Toa Alta", "undefined"],
    ["Toa Baja", "undefined"],
    ["Trujillo Alto", "undefined"],
    ["Utuado", "undefined"],
    ["Vega Alta", "undefined"],
    ["Vega ues", "undefined"],
    ["Villalba", "undefined"],
    ["Yabucoa", "undefined"],
    ["Yauco", "undefined"]
  ]
];
const QA = [
  "Qatar",
  "QA",
  [
    ["Ad Dawḩah", "DA"],
    ["Al Khawr wa adh Dhakhīrah", "KH"],
    ["Al Wakrah", "WA"],
    ["Ar Rayyān", "RA"],
    ["Ash Shamāl", "MS"],
    ["Az̧ Za̧`āyin", "ZA"],
    ["Umm Şalāl", "US"]
  ]
];
const RE = [
  "Réunion",
  "RE",
  [
    ["Réunion", "undefined"]
  ]
];
const RO = [
  "Romania",
  "RO",
  [
    ["Alba", "RO-AB"],
    ["Arad", "RO-AR"],
    ["Arges", "RO-AG"],
    ["Bacau", "RO-BC"],
    ["Bihor", "RO-BH"],
    ["Bistrita-Nasaud", "RO-BN"],
    ["Botosani", "RO-BT"],
    ["Braila", "RO-BR"],
    ["Brasov", "RO-BV"],
    ["Bucharest", "RO-B"],
    ["Buzau", "RO-BZ"],
    ["Calarasi", "RO-CL"],
    ["Caras-Severin", "RO-CS"],
    ["Cluj", "RO-CJ"],
    ["Constanta", "RO-CT"],
    ["Covasna", "RO-CV"],
    ["Dambovita", "RO-DB"],
    ["Dolj", "RO-DJ"],
    ["Galati", "RO-GL"],
    ["Giurgiu", "RO-GR"],
    ["Gorj", "RO-GJ"],
    ["Harghita", "RO-HR"],
    ["Hunedoara", "RO-HD"],
    ["Ialomita", "RO-IL"],
    ["Iasi", "RO-IS"],
    ["Iifov", "RO-IF"],
    ["Maramures", "RO-MM"],
    ["Mehedinti", "RO-MH"],
    ["Mures", "RO-MS"],
    ["Neamt", "RO-NT"],
    ["Olt", "RO-OT"],
    ["Prahova", "RO-PH"],
    ["Salaj", "RO-SJ"],
    ["Satu Mare", "RO-SM"],
    ["Sibiu", "RO-SB"],
    ["Suceava", "RO-SV"],
    ["Teleorman", "RO-TR"],
    ["Timis", "RO-TM"],
    ["Tulcea", "RO-TL"],
    ["Valcea", "RO-VL"],
    ["Vaslui", "RO-VS"],
    ["Vrancea", "RO-VN"]
  ]
];
const RU = [
  "Russian Federation",
  "RU",
  [
    ["Republic of Adygea", "AD"],
    ["Republic of Altai (Gorno-Altaysk)", "AL"],
    ["Altai Krai", "ALT"],
    ["Amur Oblast", "AMU"],
    ["Arkhangelsk Oblast", "ARK"],
    ["Astrakhan Oblast", "AST"],
    ["Republic of Bashkortostan", "BA"],
    ["Belgorod Oblast", "BEL"],
    ["Bryansk Oblast", "BRY"],
    ["Republic of Buryatia", "BU"],
    ["Chechen Republic", "CE"],
    ["Chelyabinsk Oblast", "CHE"],
    ["Chukotka Autonomous Okrug", "CHU"],
    ["Chuvash Republic", "CU"],
    ["Republic of Dagestan", "DA"],
    ["Republic of Ingushetia", "IN"],
    ["Irkutsk Oblast", "IRK"],
    ["Ivanovo Oblast", "IVA"],
    ["Jewish Autonomous Oblast", "JEW"],
    ["Kabardino-Balkar Republic", "KB"],
    ["Kaliningrad Oblast", "KLN"],
    ["Republic of Kalmykia", "KL"],
    ["Kaluga Oblast", "KLU"],
    ["Kamchatka Krai", "KAM"],
    ["Karachay-Cherkess Republic", "KC"],
    ["Republic of Karelia", "KR"],
    ["Khabarovsk Krai", "KHA"],
    ["Republic of Khakassia", "KK"],
    ["Khanty-Mansi Autonomous Okrug - Yugra", "KHM"],
    ["Kemerovo Oblast", "KEM"],
    ["Kirov Oblast", "KIR"],
    ["Komi Republic", "KO"],
    ["Kostroma Oblast", "KOS"],
    ["Krasnodar Krai", "KDA"],
    ["Krasnoyarsk Krai", "KYA"],
    ["Kurgan Oblast", "KGN"],
    ["Kursk Oblast", "KRS"],
    ["Leningrad Oblast", "LEN"],
    ["Lipetsk Oblast", "LIP"],
    ["Magadan Oblast", "MAG"],
    ["Mari El Republic", "ME"],
    ["Republic of Mordovia", "MO"],
    ["Moscow Oblast", "MOS"],
    ["Moscow", "MOW"],
    ["Murmansk Oblast", "MU"],
    ["Nenets Autonomous Okrug", "NEN"],
    ["Nizhny Novgorod Oblast", "NIZ"],
    ["Novgorod Oblast", "NGR"],
    ["Novosibirsk Oblast", "NVS"],
    ["Omsk Oblast", "OMS"],
    ["Orenburg Oblast", "ORE"],
    ["Oryol Oblast", "ORL"],
    ["Penza Oblast", "PNZ"],
    ["Perm Krai", "PER"],
    ["Primorsky Krai", "PRI"],
    ["Pskov Oblast", "PSK"],
    ["Rostov Oblast", "ROS"],
    ["Ryazan Oblast", "RYA"],
    ["Saint Petersburg", "SPE"],
    ["Sakha (Yakutia) Republic", "SA"],
    ["Sakhalin Oblast", "SAK"],
    ["Samara Oblast", "SAM"],
    ["Saratov Oblast", "SAR"],
    ["Republic of North Ossetia-Alania", "NOA"],
    ["Smolensk Oblast", "SMO"],
    ["Stavropol Krai", "STA"],
    ["Sverdlovsk Oblast", "SVE"],
    ["Tambov Oblast", "TAM"],
    ["Republic of Tatarstan", "TA"],
    ["Tomsk Oblast", "TOM"],
    ["Tuva Republic", "TU"],
    ["Tula Oblast", "TUL"],
    ["Tver Oblast", "TVE"],
    ["Tyumen Oblast", "TYU"],
    ["Udmurt Republic", "UD"],
    ["Ulyanovsk Oblast", "ULY"],
    ["Vladimir Oblast", "VLA"],
    ["Volgograd Oblast", "VGG"],
    ["Vologda Oblast", "VLG"],
    ["Voronezh Oblast", "VOR"],
    ["Yamalo-Nenets Autonomous Okrug", "YAN"],
    ["Yaroslavl Oblast", "YAR"],
    ["Zabaykalsky Krai", "ZAB"]
  ]
];
const RW = [
  "Rwanda",
  "RW",
  [
    ["Kigali", "01"],
    ["Eastern", "02"],
    ["Northern", "03"],
    ["Western", "04"],
    ["Southern", "05"]
  ]
];
const BL = [
  "Saint Barthélemy",
  "BL",
  [
    ["Au Vent", "02"],
    ["Sous le Vent", "01"]
  ]
];
const SH = [
  "Saint Helena, Ascension and Tristan da Cunha",
  "SH",
  [
    ["Ascension", "AC"],
    ["Saint Helena", "HL"],
    ["Tristan da Cunha", "TA"]
  ]
];
const KN = [
  "Saint Kitts and Nevis",
  "KN",
  [
    ["Saint Kitts", "K"],
    ["Nevis", "N"]
  ]
];
const LC = [
  "Saint Lucia",
  "LC",
  [
    ["Anse-la-Raye", "01"],
    ["Canaries", "12"],
    ["Castries", "02"],
    ["Choiseul", "03"],
    ["Dennery", "05"],
    ["Gros Islet", "06"],
    ["Laborie", "07"],
    ["Micoud", "08"],
    ["Soufriere", "10"],
    ["Vieux Fort", "11"]
  ]
];
const MF = [
  "Saint Martin",
  "MF",
  [
    ["Saint Martin", "undefined"]
  ]
];
const PM = [
  "Saint Pierre and Miquelon",
  "PM",
  [
    ["Miquelon", "undefined"],
    ["Saint Pierre", "undefined"]
  ]
];
const VC = [
  "Saint Vincent and the Grenadines",
  "VC",
  [
    ["Charlotte", "01"],
    ["Grenadines", "06"],
    ["Saint Andrew", "02"],
    ["Saint David", "03"],
    ["Saint George", "04"],
    ["Saint Patrick", "05"]
  ]
];
const WS = [
  "Samoa",
  "WS",
  [
    ["A'ana", "AA"],
    ["Aiga-i-le-Tai", "AL"],
    ["Atua", "AT"],
    ["Fa'asaleleaga", "FA"],
    ["Gaga'emauga", "GE"],
    ["Gagaifomauga", "GI"],
    ["Palauli", "PA"],
    ["Satupa'itea", "SA"],
    ["Tuamasaga", "TU"],
    ["Va'a-o-Fonoti", "VF"],
    ["Vaisigano", "VS"]
  ]
];
const SM = [
  "San Marino",
  "SM",
  [
    ["Acquaviva", "01"],
    ["Borgo Maggiore", "06"],
    ["Chiesanuova", "02"],
    ["Domagnano", "03"],
    ["Faetano", "04"],
    ["Fiorentino", "05"],
    ["Montegiardino", "08"],
    ["San Marino", "07"],
    ["Serravalle", "09"]
  ]
];
const ST = [
  "Sao Tome and Principe",
  "ST",
  [
    ["Principe", "P"],
    ["Sao Tome", "S"]
  ]
];
const SA = [
  "Saudi Arabia",
  "SA",
  [
    ["'Asir", "14"],
    ["Al Bahah", "11"],
    ["Al Hudud ash Shamaliyah", "08"],
    ["Al Jawf", "12"],
    ["Al Madinah al Munawwarah", "03"],
    ["Al Qasim", "05"],
    ["Ar Riyad", "01"],
    ["Ash Sharqiyah", "04"],
    ["Ha'il", "06"],
    ["Jazan", "09"],
    ["Makkah al Mukarramah", "02"],
    ["Najran", "10"],
    ["Tabuk", "07"]
  ]
];
const SN = [
  "Senegal",
  "SN",
  [
    ["Dakar", "DK"],
    ["Diourbel", "DB"],
    ["Fatick", "FK"],
    ["Kaffrine", "KA"],
    ["Kaolack", "KL"],
    ["Kedougou", "KE"],
    ["Kolda", "KD"],
    ["Louga", "LG"],
    ["Matam", "MT"],
    ["Saint-Louis", "SL"],
    ["Sedhiou", "SE"],
    ["Tambacounda", "TC"],
    ["Thies", "TH"],
    ["Ziguinchor", "ZG"]
  ]
];
const RS = [
  "Serbia",
  "RS",
  [
    ["Beograd (Belgrade)", "00"],
    ["Borski", "14"],
    ["Braničevski", "11"],
    ["Jablanički", "23"],
    ["Južnobački", "06"],
    ["Južnobanatski", "04"],
    ["Kolubarski", "09"],
    ["Kosovski", "25"],
    ["Kosovsko-Mitrovački", "28"],
    ["Kosovsko-Pomoravski", "29"],
    ["Mačvanski", "08"],
    ["Moravički", "17"],
    ["Nišavski", "20"],
    ["Pčinjski", "24"],
    ["Pećki", "26"],
    ["Pirotski", "22"],
    ["Podunavski", "10"],
    ["Pomoravski", "13"],
    ["Prizrenski", "27"],
    ["Rasinski", "19"],
    ["Raški", "18"],
    ["Severnobački", "01"],
    ["Severnobanatski", "03"],
    ["Srednjebanatski", "02"],
    ["Sremski", "07"],
    ["Šumadijski", "12"],
    ["Toplički", "21"],
    ["Zaječarski", "15"],
    ["Zapadnobački", "05"],
    ["Zlatiborski", "16"]
  ]
];
const SC = [
  "Seychelles",
  "SC",
  [
    ["Anse aux Pins", "01"],
    ["Anse Boileau", "02"],
    ["Anse Etoile", "03"],
    ["Anse Royale", "05"],
    ["Anu Cap", "04"],
    ["Baie Lazare", "06"],
    ["Baie Sainte Anne", "07"],
    ["Beau Vallon", "08"],
    ["Bel Air", "09"],
    ["Bel Ombre", "10"],
    ["Cascade", "11"],
    ["Glacis", "12"],
    ["Grand'Anse Mahe", "13"],
    ["Grand'Anse Praslin", "14"],
    ["La Digue", "15"],
    ["La Riviere Anglaise", "16"],
    ["Les Mamelles", "24"],
    ["Mont Buxton", "17"],
    ["Mont Fleuri", "18"],
    ["Plaisance", "19"],
    ["Pointe La Rue", "20"],
    ["Port Glaud", "21"],
    ["Roche Caiman", "25"],
    ["Saint Louis", "22"],
    ["Takamaka", "23"]
  ]
];
const SL = [
  "Sierra Leone",
  "SL",
  [
    ["Eastern", "E"],
    ["Northern", "N"],
    ["Southern", "S"],
    ["Western", "W"]
  ]
];
const SG = [
  "Singapore",
  "SG",
  [
    ["Central Singapore", "01"],
    ["North East", "02"],
    ["North West", "03"],
    ["South East", "04"],
    ["South West", "05"]
  ]
];
const SX = [
  "Sint Maarten (Dutch part)",
  "SX",
  [
    ["Sint Maarten", "undefined"]
  ]
];
const SK = [
  "Slovakia",
  "SK",
  [
    ["Banskobystricky", "BC"],
    ["Bratislavsky", "BL"],
    ["Kosicky", "KI"],
    ["Nitriansky", "NI"],
    ["Presovsky", "PV"],
    ["Trenciansky", "TC"],
    ["Trnavsky", "TA"],
    ["Zilinsky", "ZI"]
  ]
];
const SI = [
  "Slovenia",
  "SI",
  [
    ["Ajdovscina", "001"],
    ["Apace", "195"],
    ["Beltinci", "002"],
    ["Benedikt", "148"],
    ["Bistrica ob Sotli", "149"],
    ["Bled", "003"],
    ["Bloke", "150"],
    ["Bohinj", "004"],
    ["Borovnica", "005"],
    ["Bovec", "006"],
    ["Braslovce", "151"],
    ["Brda", "007"],
    ["Brezice", "009"],
    ["Brezovica", "008"],
    ["Cankova", "152"],
    ["Celje", "011"],
    ["Cerklje na Gorenjskem", "012"],
    ["Cerknica", "013"],
    ["Cerkno", "014"],
    ["Cerkvenjak", "153"],
    ["Cirkulane", "196"],
    ["Crensovci", "015"],
    ["Crna na Koroskem", "016"],
    ["Crnomelj", "017"],
    ["Destrnik", "018"],
    ["Divaca", "019"],
    ["Dobje", "154"],
    ["Dobrepolje", "020"],
    ["Dobrna", "155"],
    ["Dobrova-Polhov Gradec", "021"],
    ["Dobrovnik", "156"],
    ["Dol pri Ljubljani", "022"],
    ["Dolenjske Toplice", "157"],
    ["Domzale", "023"],
    ["Dornava", "024"],
    ["Dravograd", "025"],
    ["Duplek", "026"],
    ["Gorenja Vas-Poljane", "027"],
    ["Gorisnica", "028"],
    ["Gorje", "207"],
    ["Gornja Radgona", "029"],
    ["Gornji Grad", "030"],
    ["Gornji Petrovci", "031"],
    ["Grad", "158"],
    ["Grosuplje", "032"],
    ["Hajdina", "159"],
    ["Hoce-Slivnica", "160"],
    ["Hodos", "161"],
    ["Horjul", "162"],
    ["Hrastnik", "034"],
    ["Hrpelje-Kozina", "035"],
    ["Idrija", "036"],
    ["Ig", "037"],
    ["Ilirska Bistrica", "038"],
    ["Ivancna Gorica", "039"],
    ["Izola", "040"],
    ["Jesenice", "041"],
    ["Jursinci", "042"],
    ["Kamnik", "043"],
    ["Kanal", "044"],
    ["Kidricevo", "045"],
    ["Kobarid", "046"],
    ["Kobilje", "047"],
    ["Kocevje", "048"],
    ["Komen", "049"],
    ["Komenda", "164"],
    ["Koper", "050"],
    ["Kodanjevica na Krki", "197"],
    ["Kostel", "165"],
    ["Kozje", "051"],
    ["Kranj", "052"],
    ["Kranjska Gora", "053"],
    ["Krizevci", "166"],
    ["Krsko", "054"],
    ["Kungota", "055"],
    ["Kuzma", "056"],
    ["Lasko", "057"],
    ["Lenart", "058"],
    ["Lendava", "059"],
    ["Litija", "060"],
    ["Ljubljana", "061"],
    ["Ljubno", "062"],
    ["Ljutomer", "063"],
    ["Log-Dragomer", "208"],
    ["Logatec", "064"],
    ["Loska Dolina", "065"],
    ["Loski Potok", "066"],
    ["Lovrenc na Pohorju", "167"],
    ["Lukovica", "068"],
    ["Luce", "067"],
    ["Majsperk", "069"],
    ["Makole", "198"],
    ["Maribor", "070"],
    ["Markovci", "168"],
    ["Medvode", "071"],
    ["Menges", "072"],
    ["Metlika", "073"],
    ["Mezica", "074"],
    ["Miklavz na Dravskem Polju", "169"],
    ["Miren-Kostanjevica", "075"],
    ["Mirna", "212"],
    ["Mirna Pec", "170"],
    ["Mislinja", "076"],
    ["Mokronog-Trebelno", "199"],
    ["Moravce", "077"],
    ["Moravske Toplice", "078"],
    ["Mozirje", "079"],
    ["Murska Sobota", "080"],
    ["Naklo", "082"],
    ["Nazarje", "083"],
    ["Nova Gorica", "084"],
    ["Novo Mesto", "085"],
    ["Odranci", "086"],
    ["Ormoz", "087"],
    ["Osilnica", "088"],
    ["Pesnica", "089"],
    ["Piran", "090"],
    ["Pivka", "091"],
    ["Podcetrtek", "092"],
    ["Podlehnik", "172"],
    ["Podvelka", "093"],
    ["Poljcane", "200"],
    ["Postojna", "094"],
    ["Prebold", "174"],
    ["Preddvor", "095"],
    ["Prevalje", "175"],
    ["Ptuj", "096"],
    ["Race-Fram", "098"],
    ["Radece", "099"],
    ["Radenci", "100"],
    ["Radlje ob Dravi", "101"],
    ["Radovljica", "102"],
    ["Ravne na Koroskem", "103"],
    ["Razkrizje", "176"],
    ["Recica ob Savinji", "209"],
    ["Rence-Vogrsko", "201"],
    ["Ribnica", "104"],
    ["Ribnica na Poboriu", "177"],
    ["Rogaska Slatina", "106"],
    ["Rogasovci", "105"],
    ["Rogatec", "107"],
    ["Ruse", "108"],
    ["Salovci", "033"],
    ["Selnica ob Dravi", "178"],
    ["Semic", "109"],
    ["Sempeter-Vrtojba", "183"],
    ["Sencur", "117"],
    ["Sentilj", "118"],
    ["Sentjernej", "119"],
    ["Sentjur", "120"],
    ["Sentrupert", "211"],
    ["Sevnica", "110"],
    ["Sezana", "111"],
    ["Skocjan", "121"],
    ["Skofja Loka", "122"],
    ["Skofljica", "123"],
    ["Slovenj Gradec", "112"],
    ["Slovenska Bistrica", "113"],
    ["Slovenske Konjice", "114"],
    ["Smarje pri elsah", "124"],
    ["Smarjeske Toplice", "206"],
    ["Smartno ob Paki", "125"],
    ["Smartno pri Litiji", "194"],
    ["Sodrazica", "179"],
    ["Solcava", "180"],
    ["Sostanj", "126"],
    ["Sredisce ob Dravi", "202"],
    ["Starse", "115"],
    ["Store", "127"],
    ["Straza", "203"],
    ["Sveta Ana", "181"],
    ["Sveta Trojica v Slovenskih Goricah", "204"],
    ["Sveta Andraz v Slovenskih Goricah", "182"],
    ["Sveti Jurij", "116"],
    ["Sveti Jurij v Slovenskih Goricah", "210"],
    ["Sveti Tomaz", "205"],
    ["Tabor", "184"],
    ["Tisina", "010"],
    ["Tolmin", "128"],
    ["Trbovlje", "129"],
    ["Trebnje", "130"],
    ["Trnovska Vas", "185"],
    ["Trzin", "186"],
    ["Trzic", "131"],
    ["Turnisce", "132"],
    ["Velenje", "133"],
    ["Velika Polana", "187"],
    ["Velike Lasce", "134"],
    ["Verzej", "188"],
    ["Videm", "135"],
    ["Vipava", "136"],
    ["Vitanje", "137"],
    ["Vodice", "138"],
    ["Vojnik", "139"],
    ["Vransko", "189"],
    ["Vrhnika", "140"],
    ["Vuzenica", "141"],
    ["Zagorje ob Savi", "142"],
    ["Zavrc", "143"],
    ["Zrece", "144"],
    ["Zalec", "190"],
    ["Zelezniki", "146"],
    ["Zetale", "191"],
    ["Ziri", "147"],
    ["Zirovnica", "192"],
    ["Zuzemberk", "193"]
  ]
];
const SB = [
  "Solomon Islands",
  "SB",
  [
    ["Central", "CE"],
    ["Choiseul", "CH"],
    ["Guadalcanal", "GU"],
    ["Honiara", "CT"],
    ["Isabel", "IS"],
    ["Makira-Ulawa", "MK"],
    ["Malaita", "ML"],
    ["Rennell and Bellona", "RB"],
    ["Temotu", "TE"],
    ["Western", "WE"]
  ]
];
const SO = [
  "Somalia",
  "SO",
  [
    ["Awdal", "AW"],
    ["Bakool", "BK"],
    ["Banaadir", "BN"],
    ["Bari", "BR"],
    ["Bay", "BY"],
    ["Galguduud", "GA"],
    ["Gedo", "GE"],
    ["Hiiraan", "HI"],
    ["Jubbada Dhexe", "JD"],
    ["Jubbada Hoose", "JH"],
    ["Mudug", "MU"],
    ["Nugaal", "NU"],
    ["Sanaag", "SA"],
    ["Shabeellaha Dhexe", "SD"],
    ["Shabeellaha Hoose", "SH"],
    ["Sool", "SO"],
    ["Togdheer", "TO"],
    ["Woqooyi Galbeed", "WO"]
  ]
];
const ZA = [
  "South Africa",
  "ZA",
  [
    ["Eastern Cape", "EC"],
    ["Free State", "FS"],
    ["Gauteng", "GT"],
    ["KwaZulu-Natal", "NL"],
    ["Limpopo", "LP"],
    ["Mpumalanga", "MP"],
    ["Northern Cape", "NC"],
    ["North West", "NW"],
    ["Western Cape", "WC"]
  ]
];
const GS = [
  "South Georgia and South Sandwich Islands",
  "GS",
  [
    ["Bird Island", "undefined"],
    ["Bristol Island", "undefined"],
    ["Clerke Rocks", "undefined"],
    ["Montagu Island", "undefined"],
    ["Saunders Island", "undefined"],
    ["South Georgia", "undefined"],
    ["Southern Thule", "undefined"],
    ["Traversay Islands", "undefined"]
  ]
];
const SS = [
  "South Sudan",
  "SS",
  [
    ["Central Equatoria", "CE"],
    ["Eastern Equatoria", "EE"],
    ["Jonglei", "JG"],
    ["Lakes", "LK"],
    ["Northern Bahr el Ghazal", "BN"],
    ["Unity", "UY"],
    ["Upper Nile", "NU"],
    ["Warrap", "WR"],
    ["Western Bahr el Ghazal", "BW"],
    ["Western Equatoria", "EW"]
  ]
];
const ES = [
  "Spain",
  "ES",
  [
    ["Albacete", "AB"],
    ["Alicante", "A"],
    ["Almería", "AN"],
    ["Araba/Álava", "VI"],
    ["Asturias", "O"],
    ["Ávila", "AV"],
    ["Badajoz", "BA"],
    ["Barcelona", "B"],
    ["Bizkaia", "BI"],
    ["Burgos", "BU"],
    ["Cáceres", "CC"],
    ["Cádiz", "CA"],
    ["Cantabria", "S"],
    ["Castellón/Castelló", "CS"],
    ["Ceuta", "CE"],
    ["Ciudad Real", "CR"],
    ["Córdoba", "CO"],
    ["A Coruña", "C"],
    ["Cuenca", "CU"],
    ["Gipuzkoa", "SS"],
    ["Girona", "GI"],
    ["Granada", "GR"],
    ["Guadalajara", "GU"],
    ["Huelva", "H"],
    ["Huesca", "HU"],
    ["Illes Balears", "PM"],
    ["Jaén", "J"],
    ["León", "LE"],
    ["Lleida", "L"],
    ["Lugo", "LU"],
    ["Madrid", "M"],
    ["Málaga", "MA"],
    ["Melilla", "ML"],
    ["Murcia", "MU"],
    ["Navarra/Nafarroa", "NA"],
    ["Ourense", "OR"],
    ["Palencia", "P"],
    ["Las Palmas", "GC"],
    ["Pontevedra", "PO"],
    ["La Rioja", "LO"],
    ["Salamanca", "SA"],
    ["Santa Cruz de Tenerife", "TF"],
    ["Segovia", "SG"],
    ["Sevilla", "SE"],
    ["Soria", "SO"],
    ["Tarragona", "T"],
    ["Teruel", "TE"],
    ["Toledo", "TO"],
    ["Valencia/València", "V"],
    ["Valladolid", "VA"],
    ["Zamora", "ZA"],
    ["Zaragoza", "Z"]
  ]
];
const LK = [
  "Sri Lanka",
  "LK",
  [
    ["Basnahira", "1"],
    ["Dakunu", "3"],
    ["Madhyama", "2"],
    ["Naegenahira", "5"],
    ["Sabaragamuwa", "9"],
    ["Uturu", "4"],
    ["Uturumaeda", "7"],
    ["Vayamba", "6"],
    ["Uva", "8"]
  ]
];
const SD = [
  "Sudan",
  "SD",
  [
    ["Al Bahr al Ahmar", "RS"],
    ["Al Jazirah", "GZ"],
    ["Al Khartum", "KH"],
    ["Al Qadarif", "GD"],
    ["An Nil al Abyad", "NW"],
    ["An Nil al Azraq", "NB"],
    ["Ash Shamaliyah", "NO"],
    ["Gharb Darfur", "DW"],
    ["Gharb Kurdufan", "GK"],
    ["Janub Darfur", "DS"],
    ["Janub Kurdufan", "KS"],
    ["Kassala", "KA"],
    ["Nahr an Nil", "NR"],
    ["Shamal Darfur", "DN"],
    ["Sharq Darfur", "DE"],
    ["Shiamal Kurdufan", "KN"],
    ["Sinnar", "SI"],
    ["Wasat Darfur Zalinjay", "DC"]
  ]
];
const SR = [
  "Suriname",
  "SR",
  [
    ["Brokopondo", "BR"],
    ["Commewijne", "CM"],
    ["Coronie", "CR"],
    ["Marowijne", "MA"],
    ["Nickerie", "NI"],
    ["Para", "PR"],
    ["Paramaribo", "PM"],
    ["Saramacca", "SA"],
    ["Sipaliwini", "SI"],
    ["Wanica", "WA"]
  ]
];
const SZ = [
  "Eswatini",
  "SZ",
  [
    ["Hhohho", "HH"],
    ["Lubombo", "LU"],
    ["Manzini", "MA"],
    ["Shiselweni", "SH"]
  ]
];
const SE = [
  "Sweden",
  "SE",
  [
    ["Blekinge", "K"],
    ["Dalarna", "W"],
    ["Gävleborg", "X"],
    ["Gotland", "I"],
    ["Halland", "N"],
    ["Jämtland", "Z"],
    ["Jönköping", "F"],
    ["Kalmar", "H"],
    ["Kronoberg", "G"],
    ["Norrbotten", "BD"],
    ["Örebro", "T"],
    ["Östergötland", "E"],
    ["Skåne", "M"],
    ["Södermanland", "D"],
    ["Stockholm", "AB"],
    ["Uppsala", "C"],
    ["Värmland", "S"],
    ["Västerbotten", "AC"],
    ["Västernorrland", "Y"],
    ["Västmanland", "U"],
    ["Västra Götaland", "O"]
  ]
];
const CH = [
  "Switzerland",
  "CH",
  [
    ["Aargau", "AG"],
    ["Appenzell Ausserrhoden", "AR"],
    ["Appenzell Innerhoden", "AI"],
    ["Basel-Landschaft", "BL"],
    ["Basel-Stadt", "BS"],
    ["Bern", "BE"],
    ["Fribourg", "FR"],
    ["Genève", "GE"],
    ["Glarus", "GL"],
    ["Graubünden", "GR"],
    ["Jura", "JU"],
    ["Luzern", "LU"],
    ["Neuchâtel", "NE"],
    ["Nidwalden", "NW"],
    ["Obwalden", "OW"],
    ["Sankt Gallen", "SG"],
    ["Schaffhausen", "SH"],
    ["Schwyz", "SZ"],
    ["Solothurn", "SO"],
    ["Thurgau", "TG"],
    ["Ticino", "TI"],
    ["Uri", "UR"],
    ["Valais", "VS"],
    ["Vaud", "VD"],
    ["Zug", "ZG"],
    ["Zürich", "ZH"]
  ]
];
const SY = [
  "Syrian Arab Republic",
  "SY",
  [
    ["Al Hasakah", "HA"],
    ["Al Ladhiqiyah", "LA"],
    ["Al Qunaytirah", "QU"],
    ["Ar Raqqah", "RA"],
    ["As Suwayda'", "SU"],
    ["Dar'a", "DR"],
    ["Dayr az Zawr", "DY"],
    ["Dimashq", "DI"],
    ["Halab", "HL"],
    ["Hamah", "HM"],
    ["Hims", "HI"],
    ["Idlib", "ID"],
    ["Rif Dimashq", "RD"],
    ["Tartus", "TA"]
  ]
];
const TW = [
  "Taiwan",
  "TW",
  [
    ["Changhua", "CHA"],
    ["Chiayi", "CYQ"],
    ["Hsinchu", "HSQ"],
    ["Hualien", "HUA"],
    ["Kaohsiung", "KHH"],
    ["Keelung", "KEE"],
    ["Kinmen", "KIN"],
    ["Lienchiang", "LIE"],
    ["Miaoli", "MIA"],
    ["Nantou", "NAN"],
    ["Penghu", "PEN"],
    ["New Taipei", "NWT"],
    ["Pingtung", "PIF"],
    ["Taichung", "TXG"],
    ["Tainan", "TNN"],
    ["Taipei", "TPE"],
    ["Taitung", "TTT"],
    ["Taoyuan", "TAO"],
    ["Yilan", "ILA"],
    ["Yunlin", "YUN"]
  ]
];
const TJ = [
  "Tajikistan",
  "TJ",
  [
    ["Dushanbe", "DU"],
    ["Kŭhistoni Badakhshon", "GB"],
    ["Khatlon", "KT"],
    ["Sughd", "SU"]
  ]
];
const TZ = [
  "Tanzania, United Republic of",
  "TZ",
  [
    ["Arusha", "01"],
    ["Coast", "19"],
    ["Dar es Salaam", "02"],
    ["Dodoma", "03"],
    ["Iringa", "04"],
    ["Kagera", "05"],
    ["Kigoma", "08"],
    ["Kilimanjaro", "09"],
    ["Lindi", "12"],
    ["Manyara", "26"],
    ["Mara", "13"],
    ["Mbeya", "14"],
    ["Morogoro", "16"],
    ["Mtwara", "17"],
    ["Mwanza", "18"],
    ["Pemba North", "06"],
    ["Pemba South", "10"],
    ["Rukwa", "20"],
    ["Ruvuma", "21"],
    ["Shinyanga", "22"],
    ["Singida", "23"],
    ["Tabora", "24"],
    ["Tanga", "25"],
    ["Zanzibar North", "07"],
    ["Zanzibar Central/South", "11"],
    ["Zanzibar Urban/West", "15"]
  ]
];
const TH = [
  "Thailand",
  "TH",
  [
    ["Amnat Charoen", "37"],
    ["Ang Thong", "15"],
    ["Bueng Kan", "38"],
    ["Buri Ram", "31"],
    ["Chachoengsao", "24"],
    ["Chai Nat", "18"],
    ["Chaiyaphum", "36"],
    ["Chanthaburi", "22"],
    ["Chiang Mai", "50"],
    ["Chiang Rai", "57"],
    ["Chon Buri", "20"],
    ["Chumphon", "86"],
    ["Kalasin", "46"],
    ["Kamphaeng Phet", "62"],
    ["Kanchanaburi", "71"],
    ["Khon Kaen", "40"],
    ["Krabi", "81"],
    ["Krung Thep Mahanakhon (Bangkok)", "10"],
    ["Lampang", "52"],
    ["Lamphun", "51"],
    ["Loei", "42"],
    ["Lop Buri", "16"],
    ["Mae Hong Son", "58"],
    ["Maha Sarakham", "44"],
    ["Mukdahan", "49"],
    ["Nakhon Nayok", "26"],
    ["Nakhon Phathom", "73"],
    ["Nakhon Phanom", "48"],
    ["Nakhon Ratchasima", "30"],
    ["Nakhon Sawan", "60"],
    ["Nakhon Si Thammarat", "80"],
    ["Nan", "55"],
    ["Narathiwat", "96"],
    ["Nong Bua Lam Phu", "39"],
    ["Nong Khai", "43"],
    ["Nonthaburi", "12"],
    ["Pathum Thani", "13"],
    ["Pattani", "94"],
    ["Phangnga", "82"],
    ["Phatthalung", "93"],
    ["Phayao", "56"],
    ["Phetchabun", "67"],
    ["Phetchaburi", "76"],
    ["Phichit", "66"],
    ["Phitsanulok", "65"],
    ["Phra Nakhon Si Ayutthaya", "14"],
    ["Phrae", "54"],
    ["Phuket", "83"],
    ["Prachin Buri", "25"],
    ["Prachuap Khiri Khan", "77"],
    ["Ranong", "85"],
    ["Ratchaburi", "70"],
    ["Rayong", "21"],
    ["Roi Et", "45"],
    ["Sa Kaeo", "27"],
    ["Sakon Nakhon", "47"],
    ["Samut Prakan", "11"],
    ["Samut Sakhon", "74"],
    ["Samut Songkhram", "75"],
    ["Saraburi", "19"],
    ["Satun", "91"],
    ["Sing Buri", "17"],
    ["Si Sa ket", "33"],
    ["Songkhla", "90"],
    ["Sukhothai", "64"],
    ["Suphan Buri", "72"],
    ["Surat Thani", "84"],
    ["Surin", "32"],
    ["Tak", "63"],
    ["Trang", "92"],
    ["Trat", "23"],
    ["Ubon Ratchathani", "34"],
    ["Udon Thani", "41"],
    ["Uthai Thani", "61"],
    ["Uttaradit", "53"],
    ["Yala", "95"],
    ["Yasothon", "35"]
  ]
];
const TL = [
  "Timor-Leste",
  "TL",
  [
    ["Aileu", "AL"],
    ["Ainaro", "AN"],
    ["Baucau", "BA"],
    ["Bobonaro", "BO"],
    ["Cova Lima", "CO"],
    ["Dili", "DI"],
    ["Ermera", "ER"],
    ["Lautem", "LA"],
    ["Liquica", "LI"],
    ["Manatuto", "MT"],
    ["Manufahi", "MF"],
    ["Oecussi", "OE"],
    ["Viqueque", "VI"]
  ]
];
const TG = [
  "Togo",
  "TG",
  [
    ["Centre", "C"],
    ["Kara", "K"],
    ["Maritime", "M"],
    ["Plateaux", "P"],
    ["Savannes", "S"]
  ]
];
const TK = [
  "Tokelau",
  "TK",
  [
    ["Atafu", "undefined"],
    ["Fakaofo", "undefined"],
    ["Nukunonu", "undefined"]
  ]
];
const TO = [
  "Tonga",
  "TO",
  [
    ["'Eua", "01"],
    ["Ha'apai", "02"],
    ["Niuas", "03"],
    ["Tongatapu", "04"],
    ["Vava'u", "05"]
  ]
];
const TT = [
  "Trinidad and Tobago",
  "TT",
  [
    ["Arima", "ARI"],
    ["Chaguanas", "CHA"],
    ["Couva-Tabaquite-Talparo", "CTT"],
    ["Diefo Martin", "DMN"],
    ["Mayaro-Rio Claro", "MRC"],
    ["Penal-Debe", "PED"],
    ["Point Fortin", "PTF"],
    ["Port-of-Spain", "POS"],
    ["Princes Town", "PRT"],
    ["San Fernando", "SFO"],
    ["San Juan-Laventille", "SJL"],
    ["Sangre Grande", "SGE"],
    ["Siparia", "SIP"],
    ["Tobago", "TOB"],
    ["Tunapuna-Piarco", "TUP"]
  ]
];
const TN = [
  "Tunisia",
  "TN",
  [
    ["Ariana", "12"],
    ["Beja", "31"],
    ["Ben Arous", "13"],
    ["Bizerte", "23"],
    ["Gabes", "81"],
    ["Gafsa", "71"],
    ["Jendouba", "32"],
    ["Kairouan", "41"],
    ["Kasserine", "42"],
    ["Kebili", "73"],
    ["Kef", "33"],
    ["Mahdia", "53"],
    ["Medenine", "82"],
    ["Monastir", "52"],
    ["Nabeul", "21"],
    ["Sfax", "61"],
    ["Sidi Bouzid", "43"],
    ["Siliana", "34"],
    ["Sousse", "51"],
    ["Tataouine", "83"],
    ["Tozeur", "72"],
    ["Tunis", "11"],
    ["Zaghouan", "22"]
  ]
];
const TR = [
  "Turkey",
  "TR",
  [
    ["Adana", "01"],
    ["Adiyaman", "02"],
    ["Afyonkarahisar", "03"],
    ["Agri", "04"],
    ["Aksaray", "68"],
    ["Amasya", "05"],
    ["Ankara", "06"],
    ["Antalya", "07"],
    ["Ardahan", "75"],
    ["Artvin", "08"],
    ["Aydin", "09"],
    ["Balikesir", "10"],
    ["Bartin", "74"],
    ["Batman", "72"],
    ["Bayburt", "69"],
    ["Bilecik", "11"],
    ["Bingol", "12"],
    ["Bitlis", "13"],
    ["Bolu", "14"],
    ["Burdur", "15"],
    ["Bursa", "16"],
    ["Canakkale", "17"],
    ["Cankiri", "18"],
    ["Corum", "19"],
    ["Denizli", "20"],
    ["Diyarbakir", "21"],
    ["Duzce", "81"],
    ["Edirne", "22"],
    ["Elazig", "23"],
    ["Erzincan", "24"],
    ["Erzurum", "25"],
    ["Eskisehir", "26"],
    ["Gaziantep", "27"],
    ["Giresun", "28"],
    ["Gumushane", "29"],
    ["Hakkari", "30"],
    ["Hatay", "31"],
    ["Igdir", "76"],
    ["Isparta", "32"],
    ["Istanbul", "34"],
    ["Izmir", "35"],
    ["Kahramanmaras", "46"],
    ["Karabuk", "78"],
    ["Karaman", "70"],
    ["Kars", "36"],
    ["Kastamonu", "37"],
    ["Kayseri", "38"],
    ["Kilis", "79"],
    ["Kirikkale", "71"],
    ["Kirklareli", "39"],
    ["Kirsehir", "40"],
    ["Kocaeli", "41"],
    ["Konya", "42"],
    ["Kutahya", "43"],
    ["Malatya", "44"],
    ["Manisa", "45"],
    ["Mardin", "47"],
    ["Mersin", "33"],
    ["Mugla", "48"],
    ["Mus", "49"],
    ["Nevsehir", "50"],
    ["Nigde", "51"],
    ["Ordu", "52"],
    ["Osmaniye", "80"],
    ["Rize", "53"],
    ["Sakarya", "54"],
    ["Samsun", "55"],
    ["Sanliurfa", "63"],
    ["Siirt", "56"],
    ["Sinop", "57"],
    ["Sirnak", "73"],
    ["Sivas", "58"],
    ["Tekirdag", "59"],
    ["Tokat", "60"],
    ["Trabzon", "61"],
    ["Tunceli", "62"],
    ["Usak", "64"],
    ["Van", "65"],
    ["Yalova", "77"],
    ["Yozgat", "66"],
    ["Zonguldak", "67"]
  ]
];
const TM = [
  "Turkmenistan",
  "TM",
  [
    ["Ahal", "A"],
    ["Asgabat", "S"],
    ["Balkan", "B"],
    ["Dashoguz", "D"],
    ["Lebap", "L"],
    ["Mary", "M"]
  ]
];
const TC = [
  "Turks and Caicos Islands",
  "TC",
  [
    ["Turks and Caicos Islands", "undefined"]
  ]
];
const TV = [
  "Tuvalu",
  "TV",
  [
    ["Funafuti", "FUN"],
    ["Nanumanga", "NMG"],
    ["Nanumea", "NMA"],
    ["Niutao", "NIT"],
    ["Nui", "NUI"],
    ["Nukufetau", "NKF"],
    ["Nukulaelae", "NKL"],
    ["Vaitupu", "VAU"]
  ]
];
const UG = [
  "Uganda",
  "UG",
  [
    ["Abim", "317"],
    ["Adjumani", "301"],
    ["Amolatar", "314"],
    ["Amuria", "216"],
    ["Amuru", "319"],
    ["Apac", "302"],
    ["Arua", "303"],
    ["Budaka", "217"],
    ["Bududa", "223"],
    ["Bugiri", "201"],
    ["Bukedea", "224"],
    ["Bukwa", "218"],
    ["Buliisa", "419"],
    ["Bundibugyo", "401"],
    ["Bushenyi", "402"],
    ["Busia", "202"],
    ["Butaleja", "219"],
    ["Dokolo", "318"],
    ["Gulu", "304"],
    ["Hoima", "403"],
    ["Ibanda", "416"],
    ["Iganga", "203"],
    ["Isingiro", "417"],
    ["Jinja", "204"],
    ["Kaabong", "315"],
    ["Kabale", "404"],
    ["Kabarole", "405"],
    ["Kaberamaido", "213"],
    ["Kalangala", "101"],
    ["Kaliro", "220"],
    ["Kampala", "102"],
    ["Kamuli", "205"],
    ["Kamwenge", "413"],
    ["Kanungu", "414"],
    ["Kapchorwa", "206"],
    ["Kasese", "406"],
    ["Katakwi", "207"],
    ["Kayunga", "112"],
    ["Kibaale", "407"],
    ["Kiboga", "103"],
    ["Kiruhura", "418"],
    ["Kisoro", "408"],
    ["Kitgum", "305"],
    ["Koboko", "316"],
    ["Kotido", "306"],
    ["Kumi", "208"],
    ["Kyenjojo", "415"],
    ["Lira", "307"],
    ["Luwero", "104"],
    ["Lyantonde", "116"],
    ["Manafwa", "221"],
    ["Maracha", "320"],
    ["Masaka", "105"],
    ["Masindi", "409"],
    ["Mayuge", "214"],
    ["Mbale", "209"],
    ["Mbarara", "410"],
    ["Mityana", "114"],
    ["Moroto", "308"],
    ["Moyo", "309"],
    ["Mpigi", "106"],
    ["Mubende", "107"],
    ["Mukono", "108"],
    ["Nakapiripirit", "311"],
    ["Nakaseke", "115"],
    ["Nakasongola", "109"],
    ["Namutumba", "222"],
    ["Nebbi", "310"],
    ["Ntungamo", "411"],
    ["Oyam", "321"],
    ["Pader", "312"],
    ["Pallisa", "210"],
    ["Rakai", "110"],
    ["Rukungiri", "412"],
    ["Sembabule", "111"],
    ["Sironko", "215"],
    ["Soroti", "211"],
    ["Tororo", "212"],
    ["Wakiso", "113"],
    ["Yumbe", "313"]
  ]
];
const UA = [
  "Ukraine",
  "UA",
  [
    ["Cherkaska oblast", "71"],
    ["Chernihivska oblast", "74"],
    ["Chernivetska oblast", "77"],
    ["Dnipropetrovska oblast", "12"],
    ["Donetska oblast", "14"],
    ["Ivano-Frankivska oblast", "26"],
    ["Kharkivska oblast", "63"],
    ["Khersonska oblast", "65"],
    ["Khmelnytska oblast", "68"],
    ["Kyivska oblast", "32"],
    ["Kirovohradska oblast", "35"],
    ["Luhanska oblast", "09"],
    ["Lvivska oblast", "46"],
    ["Mykolaivska oblast", "48"],
    ["Odeska oblast", "51"],
    ["Poltavska oblast", "53"],
    ["Rivnenska oblast", "56"],
    ["Sumska oblast", "59"],
    ["Ternopilska oblast", "61"],
    ["Vinnytska oblast", "05"],
    ["Volynska oblast", "07"],
    ["Zakarpatska oblast", "21"],
    ["Zaporizka oblast", "23"],
    ["Zhytomyrska oblast", "18"],
    ["Avtonomna Respublika Krym", "43"],
    ["Kyiv", "30"],
    ["Sevastopol", "40"]
  ]
];
const AE = [
  "United Arab Emirates",
  "AE",
  [
    ["Abu Dhabi", "AZ"],
    ["Ajman", "AJ"],
    ["Dubai", "DU"],
    ["Fujairah", "FU"],
    ["Ras al Khaimah", "RK"],
    ["Sharjah", "SH"],
    ["Umm Al Quwain", "UQ"]
  ]
];
const GB = [
  "United Kingdom",
  "GB",
  [
    ["Aberdeen City", "ABE"],
    ["Aberdeenshire", "ABD"],
    ["Angus", "ANS"],
    ["Antrim and Newtownabbey", "ANN"],
    ["Ards and North Down", "AND"],
    ["Argyll and Bute", "AGB"],
    ["Armagh City, Banbridge and Craigavon", "ABC"],
    ["Barking and Dagenham", "BDG"],
    ["Barnet", "BNE"],
    ["Barnsley", "BNS"],
    ["Bath and North East Somerset", "BAS"],
    ["Bedford", "BDF"],
    ["Belfast City", "BFS"],
    ["Berkshire", "BRK"],
    ["Bexley", "BEX"],
    ["Birmingham", "BIR"],
    ["Blackburn with Darwen", "BBD"],
    ["Blackpool", "BPL"],
    ["Blaenau Gwent", "BGW"],
    ["Bolton", "BOL"],
    ["Bournemouth, Christchurch and Poole", "BCP"],
    ["Bracknell Forest", "BRC"],
    ["Bradford", "BRD"],
    ["Brent", "BEN"],
    ["Bridgend", "BGE"],
    ["Brighton and Hove", "BNH"],
    ["Bristol, City of", "BST"],
    ["Bromley", "BRY"],
    ["Buckinghamshire", "BKM"],
    ["Bury", "BUR"],
    ["Caerphilly", "CAY"],
    ["Calderdale", "CLD"],
    ["Cambridgeshire", "CAM"],
    ["Camden", "CMD"],
    ["Cardiff", "CRF"],
    ["Carmarthenshire", "CMN"],
    ["Causeway Coast and Glens", "CCG"],
    ["Central Bedfordshire", "CBF"],
    ["Ceredigion", "CGN"],
    ["Cheshire East", "CHE"],
    ["Cheshire West and Chester", "CHW"],
    ["Clackmannanshire", "CLK"],
    ["Conwy", "CWY"],
    ["Cornwall", "CON"],
    ["Coventry", "COV"],
    ["Croydon", "CRY"],
    ["Cumbria", "CMA"],
    ["Darlington", "DAL"],
    ["Denbighshire", "DEN"],
    ["Derby", "DER"],
    ["Derbyshire", "DBY"],
    ["Derry and Strabane", "DRS"],
    ["Devon", "DEV"],
    ["Doncaster", "DNC"],
    ["Dorset", "DOR"],
    ["Dudley", "DUD"],
    ["Dumfries and Galloway", "DGY"],
    ["Dundee City", "DND"],
    ["Durham, County", "DUR"],
    ["Ealing", "EAL"],
    ["East Ayrshire", "EAY"],
    ["East Dunbartonshire", "EDU"],
    ["East Lothian", "ELN"],
    ["East Renfrewshire", "ERW"],
    ["East Riding of Yorkshire", "ERY"],
    ["East Sussex", "ESX"],
    ["Edinburgh, City of", "EDH"],
    ["Eilean Siar", "ELS"],
    ["Enfield", "ENF"],
    ["Essex", "ESS"],
    ["Falkirk", "FAL"],
    ["Fermanagh and Omagh", "FMO"],
    ["Fife", "FIF"],
    ["Flintshire", "FLN"],
    ["Gateshead", "GAT"],
    ["Glasgow City", "GLG"],
    ["Gloucestershire", "GLS"],
    ["Greenwich", "GRE"],
    ["Gwynedd", "GWN"],
    ["Hackney", "HCK"],
    ["Halton", "HAL"],
    ["Hammersmith and Fulham", "HMF"],
    ["Hampshire", "HAM"],
    ["Haringey", "HRY"],
    ["Harrow", "HRW"],
    ["Hartlepool", "HPL"],
    ["Havering", "HAV"],
    ["Herefordshire", "HEF"],
    ["Hertfordshire", "HRT"],
    ["Highland", "HLD"],
    ["Hillingdon", "HIL"],
    ["Hounslow", "HNS"],
    ["Inverclyde", "IVC"],
    ["Isle of Anglesey", "AGY"],
    ["Isle of Wight", "IOW"],
    ["Isles of Scilly", "IOS"],
    ["Islington", "ISL"],
    ["Kensington and Chelsea", "KEC"],
    ["Kent", "KEN"],
    ["Kingston upon Hull", "KHL"],
    ["Kingston upon Thames", "KTT"],
    ["Kirklees", "KIR"],
    ["Knowsley", "KWL"],
    ["Lambeth", "LBH"],
    ["Lancashire", "LAN"],
    ["Leeds", "LDS"],
    ["Leicester", "LCE"],
    ["Leicestershire", "LEC"],
    ["Lewisham", "LEW"],
    ["Lincolnshire", "LIN"],
    ["Lisburn and Castlereagh", "LBC"],
    ["Liverpool", "LIV"],
    ["London, City of", "LND"],
    ["Luton", "LUT"],
    ["Manchester", "MAN"],
    ["Medway", "MDW"],
    ["Merthyr Tydfil", "MTY"],
    ["Merton", "MRT"],
    ["Mid and East Antrim", "MEA"],
    ["Mid-Ulster", "MUL"],
    ["Middlesbrough", "MDB"],
    ["Midlothian", "MLN"],
    ["Milton Keynes", "MIK"],
    ["Monmouthshire", "MON"],
    ["Moray", "MRY"],
    ["Neath Port Talbot", "NTL"],
    ["Newcastle upon Tyne", "NET"],
    ["Newham", "NWM"],
    ["Newport", "NWP"],
    ["Newry, Mourne and Down", "NMD"],
    ["Norfolk", "NFK"],
    ["North Ayrshire", "NAY"],
    ["North East Lincolnshire", "NEL"],
    ["North Lanarkshire", "NLK"],
    ["North Lincolnshire", "NLN"],
    ["North Somerset", "NSM"],
    ["North Tyneside", "NTY"],
    ["North Yorkshire", "NYK"],
    ["Northamptonshire", "NTH"],
    ["Northumberland", "NBL"],
    ["Nottingham", "NGM"],
    ["Nottinghamshire", "NTT"],
    ["Oldham", "OLD"],
    ["Orkney Islands", "ORK"],
    ["Oxfordshire", "OXF"],
    ["Pembrokeshire", "PEM"],
    ["Perth and Kinross", "PKN"],
    ["Peterborough", "PTE"],
    ["Plymouth", "PLY"],
    ["Portsmouth", "POR"],
    ["Powys", "POW"],
    ["Reading", "RDG"],
    ["Redbridge", "RDB"],
    ["Redcar and Cleveland", "RCC"],
    ["Renfrewshire", "RFW"],
    ["Rhondda Cynon Taff", "RCT"],
    ["Richmond upon Thames", "RIC"],
    ["Rochdale", "RCH"],
    ["Rotherham", "ROT"],
    ["Rutland", "RUT"],
    ["Salford", "SLF"],
    ["Sandwell", "SAW"],
    ["Scottish Borders", "SCB"],
    ["Sefton", "SFT"],
    ["Sheffield", "SHF"],
    ["Shetland Islands", "ZET"],
    ["Shropshire", "SHR"],
    ["Slough", "SLG"],
    ["Solihull", "SOL"],
    ["Somerset", "SOM"],
    ["South Ayrshire", "SAY"],
    ["South Gloucestershire", "SGC"],
    ["South Lanarkshire", "SLK"],
    ["South Tyneside", "STY"],
    ["Southampton", "STH"],
    ["Southend-on-Sea", "SOS"],
    ["Southwark", "SWK"],
    ["St. Helens", "SHN"],
    ["Staffordshire", "STS"],
    ["Stirling", "STG"],
    ["Stockport", "SKP"],
    ["Stockton-on-Tees", "STT"],
    ["Stoke-on-Trent", "STE"],
    ["Suffolk", "SFK"],
    ["Sunderland", "SND"],
    ["Surrey", "SRY"],
    ["Sutton", "STN"],
    ["Swansea", "SWA"],
    ["Swindon", "SWD"],
    ["Tameside", "TAM"],
    ["Telford and Wrekin", "TFW"],
    ["Thurrock", "THR"],
    ["Torbay", "TOB"],
    ["Torfaen", "TOF"],
    ["Tower Hamlets", "TWH"],
    ["Trafford", "TRF"],
    ["Vale of Glamorgan, The", "VGL"],
    ["Wakefield", "WKF"],
    ["Walsall", "WLL"],
    ["Waltham Forest", "WFT"],
    ["Wandsworth", "WND"],
    ["Warrington", "WRT"],
    ["Warwickshire", "WAR"],
    ["West Berkshire", "WBK"],
    ["West Dunbartonshire", "WDU"],
    ["West Lothian", "WLN"],
    ["West Sussex", "WSX"],
    ["Westminster", "WSM"],
    ["Wigan", "WGN"],
    ["Wiltshire", "WIL"],
    ["Windsor and Maidenhead", "WNM"],
    ["Wirral", "WRL"],
    ["Wokingham", "WOK"],
    ["Wolverhampton", "WLV"],
    ["Worcestershire", "WOR"],
    ["Wrexham", "WRX"],
    ["York", "YOR"]
  ]
];
const US = [
  "United States",
  "US",
  [
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["American Samoa", "AS"],
    ["Arizona", "AZ"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["District of Columbia", "DC"],
    ["Micronesia", "FM"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Guam", "GU"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Marshall Islands", "MH"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["Northern Mariana Islands", "MP"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Palau", "PW"],
    ["Pennsylvania", "PA"],
    ["Puerto Rico", "PR"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virgin Islands", "VI"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"],
    ["Armed Forces Americas", "AA"],
    ["Armed Forces Europe, Canada, Africa and Middle East", "AE"],
    ["Armed Forces Pacific", "AP"]
  ]
];
const UM = [
  "United States Minor Outlying Islands",
  "UM",
  [
    ["Baker Island", "81"],
    ["Howland Island", "84"],
    ["Jarvis Island", "86"],
    ["Johnston Atoll", "67"],
    ["Kingman Reef", "89"],
    ["Midway Islands", "71"],
    ["Navassa Island", "76"],
    ["Palmyra Atoll", "95"],
    ["Wake Island", "79"],
    ["Bajo Nuevo Bank", "BN"],
    ["Serranilla Bank", "SB"]
  ]
];
const UY = [
  "Uruguay",
  "UY",
  [
    ["Artigas", "AR"],
    ["Canelones", "CA"],
    ["Cerro Largo", "CL"],
    ["Colonia", "CO"],
    ["Durazno", "DU"],
    ["Flores", "FS"],
    ["Florida", "FD"],
    ["Lavalleja", "LA"],
    ["Maldonado", "MA"],
    ["Montevideo", "MO"],
    ["Paysandú", "PA"],
    ["Río Negro", "RN"],
    ["Rivera", "RV"],
    ["Rocha", "RO"],
    ["Salto", "SA"],
    ["San José", "SJ"],
    ["Soriano", "SO"],
    ["Tacuarembó", "TA"],
    ["Treinta y Tres", "TT"]
  ]
];
const UZ = [
  "Uzbekistan",
  "UZ",
  [
    ["Toshkent shahri", "TK"],
    ["Andijon", "AN"],
    ["Buxoro", "BU"],
    ["Farg‘ona", "FA"],
    ["Jizzax", "JI"],
    ["Namangan", "NG"],
    ["Navoiy", "NW"],
    ["Qashqadaryo (Qarshi)", "QA"],
    ["Samarqand", "SA"],
    ["Sirdaryo (Guliston)", "SI"],
    ["Surxondaryo (Termiz)", "SU"],
    ["Toshkent wiloyati", "TO"],
    ["Xorazm (Urganch)", "XO"],
    ["Qoraqalpog‘iston Respublikasi (Nukus)", "QR"]
  ]
];
const VU = [
  "Vanuatu",
  "VU",
  [
    ["Malampa", "MAP"],
    ["Pénama", "PAM"],
    ["Sanma", "SAM"],
    ["Shéfa", "SEE"],
    ["Taféa", "TAE"],
    ["Torba", "TOB"]
  ]
];
const VE = [
  "Venezuela, Bolivarian Republic of",
  "VE",
  [
    ["Dependencias Federales", "W"],
    ["Distrito Federal", "A"],
    ["Amazonas", "Z"],
    ["Anzoátegui", "B"],
    ["Apure", "C"],
    ["Aragua", "D"],
    ["Barinas", "E"],
    ["Bolívar", "F"],
    ["Carabobo", "G"],
    ["Cojedes", "H"],
    ["Delta Amacuro", "Y"],
    ["Falcón", "I"],
    ["Guárico", "J"],
    ["Lara", "K"],
    ["Mérida", "L"],
    ["Miranda", "M"],
    ["Monagas", "N"],
    ["Nueva Esparta", "O"],
    ["Portuguesa", "P"],
    ["Sucre", "R"],
    ["Táchira", "S"],
    ["Trujillo", "T"],
    ["Vargas", "X"],
    ["Yaracuy", "U"],
    ["Zulia", "V"]
  ]
];
const VN = [
  "Vietnam",
  "VN",
  [
    ["An Giang", "44"],
    ["Bà Rịa - Vũng Tàu", "43"],
    ["Bình Dương", "57"],
    ["Bình Phước", "58"],
    ["Bình Định", "31"],
    ["Bình Thuận", "40"],
    ["Bạc Liêu", "55"],
    ["Bắc Giang", "54"],
    ["Bắc Kạn", "53"],
    ["Bắc Ninh", "56"],
    ["Bến Tre", "50"],
    ["Cao Bằng", "04"],
    ["Cà Mau", "59"],
    ["Đắk Lắk", "33"],
    ["Đắk Nông", "72"],
    ["Điện Biên", "71"],
    ["Đồng Nai", "39"],
    ["Đồng Tháp", "45"],
    ["Gia Lai", "30"],
    ["Hà Giang", "03"],
    ["Hà Nam", "63"],
    ["Hà Tây", "15"],
    ["Hà Tĩnh", "23"],
    ["Hải Dương", "61"],
    ["Hậu Giang", "73"],
    ["Hòa Bình", "14"],
    ["Hưng Yên", "66"],
    ["Khánh Hòa", "34"],
    ["Kiên Giang", "47"],
    ["Kon Tum", "28"],
    ["Lai Châu", "01"],
    ["Lâm Đồng", "35"],
    ["Lạng Sơn", "09"],
    ["Lào Cai", "02"],
    ["Long An", "41"],
    ["Nam Định", "67"],
    ["Nghệ An", "22"],
    ["Ninh Bình", "18"],
    ["Ninh Thuận", "36"],
    ["Phú Thọ", "68"],
    ["Phú Yên", "32"],
    ["Quảng Bình", "24"],
    ["Quảng Nam", "27"],
    ["Quảng Ngãi", "29"],
    ["Quảng Ninh", "13"],
    ["Quảng Trị", "25"],
    ["Sóc Trăng", "52"],
    ["Sơn La", "05"],
    ["Tây Ninh", "37"],
    ["Thái Bình", "20"],
    ["Thái Nguyên", "69"],
    ["Thanh Hóa", "21"],
    ["Thừa Thiên–Huế", "26"],
    ["Tiền Giang", "46"],
    ["Trà Vinh", "51"],
    ["Tuyên Quang", "07"],
    ["Vĩnh Long", "49"],
    ["Vĩnh Phúc", "70"],
    ["Yên Bái", "06"],
    ["Cần Thơ", "CT"],
    ["Đà Nẵng", "DN"],
    ["Hà Nội", "HN"],
    ["Hải Phòng", "HP"],
    ["Hồ Chí Minh (Sài Gòn)", "SG"]
  ]
];
const VG = [
  "Virgin Islands, British",
  "VG",
  [
    ["Anegada", "ANG"],
    ["Jost Van Dyke", "JVD"],
    ["Tortola", "TTA"],
    ["Virgin Gorda", "VGD"]
  ]
];
const VI = [
  "Virgin Islands, U.S.",
  "VI",
  [
    ["St. Thomas", "STH"],
    ["St. John", "SJO"],
    ["St. Croix", "SCR"]
  ]
];
const WF = [
  "Wallis and Futuna",
  "WF",
  [
    ["Alo", "ALO"],
    ["Sigave", "SIG"],
    ["Wallis", "WAL"]
  ]
];
const EH = [
  "Western Sahara",
  "EH",
  [
    ["Es Smara", "ESM"],
    ["Boujdour", "BOD"],
    ["Laâyoune", "LAA"],
    ["Aousserd", "AOU"],
    ["Oued ed Dahab", "OUD"]
  ]
];
const YE = [
  "Yemen",
  "YE",
  [
    ["Abyān", "AB"],
    ["'Adan", "AD"],
    ["Aḑ Ḑāli'", "DA"],
    ["Al Bayḑā'", "BA"],
    ["Al Ḩudaydah", "HU"],
    ["Al Jawf", "JA"],
    ["Al Mahrah", "MR"],
    ["Al Maḩwīt", "MW"],
    ["'Amrān", "AM"],
    ["Dhamār", "DH"],
    ["Ḩaḑramawt", "HD"],
    ["Ḩajjah", "HJ"],
    ["Ibb", "IB"],
    ["Laḩij", "LA"],
    ["Ma'rib", "MA"],
    ["Raymah", "RA"],
    ["Şā‘dah", "SD"],
    ["Şan‘ā'", "SN"],
    ["Shabwah", "SH"],
    ["Tā‘izz", "TA"]
  ]
];
const ZM = [
  "Zambia",
  "ZM",
  [
    ["Central", "02"],
    ["Copperbelt", "08"],
    ["Eastern", "03"],
    ["Luapula", "04"],
    ["Lusaka", "09"],
    ["Northern", "05"],
    ["North-Western", "06"],
    ["Southern", "07"],
    ["Western", "01"]
  ]
];
const ZW = [
  "Zimbabwe",
  "ZW",
  [
    ["Bulawayo", "BU"],
    ["Harare", "HA"],
    ["Manicaland", "MA"],
    ["Mashonaland Central", "MC"],
    ["Mashonaland East", "ME"],
    ["Mashonaland West", "MW"],
    ["Masvingo", "MV"],
    ["Matabeleland North", "MN"],
    ["Matabeleland South", "MS"],
    ["Midlands", "MI"]
  ]
];
const allCountries = [AF, AX, AL, DZ, AS, AD, AO, AI, AQ, AG, AR, AM, AW, AU, AT, AZ, BS, BH, BD, BB, BY, BE, BZ, BJ, BM, BT, BO, BQ, BA, BW, BV, BR, IO, BN, BG, BF, BI, KH, CM, CA, CV, KY, CF, TD, CL, CN, CX, CC, CO, KM, CG, CD, CK, CR, CI, HR, CU, CW, CY, CZ, DK, DJ, DM, DO, EC, EG, SV, GQ, ER, EE, ET, FK, FO, FJ, FI, FR, GF, PF, TF, GA, GM, GE, DE, GH, GI, GR, GL, GD, GP, GU, GT, GG, GN, GW, GY, HT, HM, VA, HN, HK, HU, IS, IN, ID, IR, IQ, IE, IM, IL, IT, JM, JP, JE, JO, KZ, KE, KI, KP, KR, XK, KW, KG, LA, LV, LB, LS, LR, LY, LI, LT, LU, MO, MK, MG, MW, MY, MV, ML, MT, MH, MQ, MR, MU, YT, MX, FM, MD, MC, MN, ME, MS, MA, MZ, MM, NA, NR, NP, NL, NC, NZ, NI, NE, NG, NU, NF, MP, NO, OM, PK, PW, PS, PA, PG, PY, PE, PH, PN, PL, PT, PR, QA, RE, RO, RU, RW, BL, SH, KN, LC, MF, PM, VC, WS, SM, ST, SA, SN, RS, SC, SL, SG, SX, SK, SI, SB, SO, ZA, GS, SS, ES, LK, SD, SR, SZ, SE, CH, SY, TW, TJ, TZ, TH, TL, TG, TK, TO, TT, TN, TR, TM, TC, TV, UG, UA, AE, GB, US, UM, UY, UZ, VU, VE, VN, VG, VI, WF, EH, YE, ZM, ZW];
function CountryDropdown({ value, handleChange }) {
  const [countryList, setCountryList] = useState([]);
  useEffect(() => {
    setCountryList(allCountries.filter((country) => country[1] === "IE" || country[1] === "GB"));
  }, []);
  return /* @__PURE__ */ jsxs(SelectInput, { name: "country", id: "country", value, handleChange, children: [
    /* @__PURE__ */ jsx("option", { value: "", children: "Select country" }),
    countryList.map(
      (country) => /* @__PURE__ */ jsx("option", { value: country[1], children: country[0] }, country[1])
    )
  ] });
}
function GroupLabel({ id, value, required, className, children }) {
  return /* @__PURE__ */ jsx("span", { id, className: `inline-block text-base p-2 rounded bg-sky-100 font-medium md:text-base mb-px text-slate-700 ${required && "after:content-['*'] after:ml-1 after:text-red-500"} ${className}`, children: value ? value : children });
}
function NumberInput({ name, id, value, min = 0, max = 1e3, placeholder, ariaLabelledBy, className, autoComplete, required, handleChange }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type: "number",
      name,
      id,
      value,
      max,
      min,
      placeholder,
      className: "border-gray-400 bg-clip-padding focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition ease-in-out " + className,
      autoComplete,
      required,
      onChange: (e) => handleChange(e),
      "aria-labelledby": ariaLabelledBy
    }
  );
}
function GroupRequest() {
  const { errors } = usePage().props;
  const { data, setData, post, processing, reset } = useForm({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    type: "",
    numberOfStudents: 0,
    ageRange: "",
    message: ""
  });
  useEffect(() => {
    reset();
  }, []);
  const handleChange = (event) => {
    switch (event.target.name) {
      case "firstname":
      case "lastname":
      case "email":
      case "phone":
      case "address1":
      case "address2":
      case "city":
      case "state":
      case "postcode":
      case "country":
      case "type":
      case "numberOfStudents":
      case "ageRange":
      case "message":
        setData(event.target.name, event.target.value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    post(route("request.group"));
  };
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs("div", { className: "px-4 py-12 mx-auto text-center shadow-sm max-w-7xl sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(Head, { title: "Request Sample Lessons" }),
    /* @__PURE__ */ jsx(Heading1Alt, { children: "Request Lesson for a Group or School" }),
    errors && Object.keys(errors).map(
      (key) => /* @__PURE__ */ jsx(ToastBanner, { message: errors[key] }, key)
    ),
    /* @__PURE__ */ jsxs("form", { method: "post", onSubmit: handleSubmit, className: "justify-center max-w-screen-md mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid mb-5 items-start grid-cols-[1fr_2fr] gap-2", children: [
        /* @__PURE__ */ jsx(InputLabel, { id: "name", forInput: "firstname", value: "Name", required: true }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2", children: [
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "firstname",
              id: "firstname",
              value: data.firstname,
              placeholder: "First Name",
              className: "block w-full",
              autoComplete: "given-name",
              handleChange,
              required: true,
              ariaLabelledBy: "name"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "lastname",
              id: "lastname",
              value: data.lastname,
              placeholder: "Last Name",
              className: "block w-full",
              autoComplete: "family-name",
              handleChange,
              required: true,
              ariaLabelledBy: "name"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(InputLabel, { forInput: "email", value: "Email", required: true }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            name: "email",
            id: "email",
            value: data.email,
            className: "block w-full",
            autoComplete: "email",
            handleChange,
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputLabel, { forInput: "phone", value: "Phone" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            name: "phone",
            id: "phone",
            value: data.phone,
            className: "block w-full",
            autoComplete: "phone",
            handleChange
          }
        ),
        /* @__PURE__ */ jsx(GroupLabel, { id: "address", value: "Address" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "address1", className: "hidden", children: "Address Field 1" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "address1",
              id: "address1",
              value: data.address1,
              placeholder: "Street Address",
              className: "block w-full col-span-2",
              autoComplete: "on",
              handleChange,
              ariaLabelledBy: "address"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "address2", className: "hidden", children: "Address Field 2" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "address2",
              id: "address2",
              value: data.address2,
              placeholder: "Address Line 2",
              className: "block w-full col-span-2",
              autoComplete: "on",
              handleChange,
              ariaLabelledBy: "address"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "city", className: "hidden", children: "City" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "city",
              id: "city",
              value: data.city,
              placeholder: "City",
              className: "block w-full",
              autoComplete: "on",
              handleChange,
              ariaLabelledBy: "address"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "state", className: "hidden", children: "State" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "state",
              id: "state",
              value: data.state,
              placeholder: "State",
              className: "block w-full",
              autoComplete: "on",
              handleChange,
              ariaLabelledBy: "address"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "postcode", className: "hidden", children: "Postcode" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "postcode",
              id: "postcode",
              value: data.postcode,
              placeholder: "Postcode",
              className: "block w-full",
              autoComplete: "on",
              handleChange,
              ariaLabelledBy: "address"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "country", className: "hidden", children: "Country" }),
          /* @__PURE__ */ jsx(
            CountryDropdown,
            {
              value: data.country,
              handleChange
            }
          )
        ] }),
        /* @__PURE__ */ jsx(InputLabel, { forInput: "type", value: "School or Group", required: true }),
        /* @__PURE__ */ jsxs(SelectInput, { className: "self-center", name: "type", id: "type", value: data.type, handleChange, required: true, children: [
          /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select…" }),
          /* @__PURE__ */ jsx("option", { value: "school", children: "School" }),
          /* @__PURE__ */ jsx("option", { value: "group", children: "Group" })
        ] }),
        /* @__PURE__ */ jsx(InputLabel, { forInput: "numberOfStudents", value: "Number of Students", required: true }),
        /* @__PURE__ */ jsx(
          NumberInput,
          {
            name: "numberOfStudents",
            id: "numberOfStudents",
            max: 1e3,
            value: data.numberOfStudents,
            placeholder: "Number of Students",
            className: "self-center block w-full",
            autoComplete: "off",
            handleChange,
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputLabel, { forInput: "ageRange", value: "Target Student Age Range" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            name: "ageRange",
            id: "ageRange",
            value: data.ageRange,
            className: "block w-full",
            autoComplete: "off",
            handleChange
          }
        ),
        /* @__PURE__ */ jsx(InputLabel, { forInput: "message", value: "Message or Comment" }),
        /* @__PURE__ */ jsx(
          TextAreaInput,
          {
            name: "message",
            id: "message",
            value: data.message,
            className: "block w-full",
            handleChange,
            rows: 4
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex justify-center w-full gap-2 mt-5 md:justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => window.history.back(), children: "Go Back" }),
        /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", className: "w-1/3", processing, children: "Request a Lesson" })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GroupRequest
}, Symbol.toStringTag, { value: "Module" }));
function IndividualRequest() {
  const initialState = [{
    firstname: "",
    lastname: "",
    day: "",
    month: "",
    year: ""
  }];
  const reducer = (state, action) => {
    if (action.type === "changeValue" && "name" in action) {
      let returnObj = [...state];
      returnObj[action.idx][action.name] = action.value + "";
      return returnObj;
    } else if (action.type === "addValue") {
      return [
        ...state,
        ...initialState
      ];
    } else if (action.type === "removeValue") {
      if (state.length === 1) {
        return initialState;
      }
      return state.slice(0, state.length - 1);
    } else {
      return state;
    }
  };
  const [studentState, dispatch] = useReducer(reducer, initialState);
  const [showDateError, setShowDateError] = useState([false]);
  const { errors } = usePage().props;
  const { data, setData, post, processing, reset, transform } = useForm({
    studentDetails: [{
      firstname: "",
      lastname: "",
      dob: ""
    }],
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    message: ""
  });
  useEffect(() => {
    reset();
  }, []);
  const handleChange = (event) => {
    switch (event.target.name) {
      case "email":
      case "phone":
      case "address1":
      case "address2":
      case "city":
      case "state":
      case "postcode":
      case "country":
      case "message":
        setData(event.target.name, event.target.value);
    }
  };
  const handleComplexChange = (idx, event) => {
    if (event.target instanceof HTMLInputElement) {
      switch (event.target.name) {
        case "firstname":
        case "lastname":
        case "day":
        case "month":
        case "year":
          dispatch({
            type: "changeValue",
            name: event.target.name,
            value: event.target.value,
            idx
          });
          break;
      }
    }
  };
  const hasDateError = (idx) => {
    let isShowing = [...showDateError];
    if (studentState[idx].day !== "" && (isNaN(+studentState[idx].day) || +studentState[idx].day < 1 || +studentState[idx].day > 31) || studentState[idx].month !== "" && (isNaN(+studentState[idx].month) || +studentState[idx].month < 1 || +studentState[idx].month > 12) || studentState[idx].year !== "" && (isNaN(+studentState[idx].year) || +studentState[idx].year < 1900 || +studentState[idx].year >= (/* @__PURE__ */ new Date()).getFullYear())) {
      isShowing[idx] = true;
    } else {
      isShowing[idx] = false;
    }
    console.log("Setting showDateError", showDateError[idx]);
    setShowDateError(isShowing);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let transformStudent = [];
    studentState.forEach(({ firstname, lastname, day, month, year }) => {
      transformStudent.push({
        firstname,
        lastname,
        dob: new Date(Number(year), Number(month) - 1, Number(day)).toISOString().slice(0, 10)
      });
    });
    setData("studentDetails", transformStudent);
    transform((data2) => ({
      ...data2,
      studentDetails: transformStudent
    }));
    post(route("request.individual"));
  };
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs("div", { className: "px-4 py-12 mx-auto text-center shadow-sm max-w-7xl sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx(Head, { title: "Request Sample Lessons" }),
    /* @__PURE__ */ jsx(Heading1Alt, { children: "Request Lesson for an Individual" }),
    errors && Object.keys(errors).map(
      (key) => /* @__PURE__ */ jsx(ToastBanner, { message: errors[key] }, key)
    ),
    /* @__PURE__ */ jsxs("form", { "aria-label": "Individual lesson request form", name: "individualForm", method: "post", onSubmit: handleSubmit, className: "max-w-screen-md mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "flex mb-4 text-lg font-bold", children: "Student Details" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 pb-3 mb-8 border-b border-gray-600", children: [
        studentState.map(({ firstname, lastname, day, month, year }, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 mb-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(InputLabel, { id: "fullname" + (idx + 1), forInput: `firstname[${idx}]`, value: "Name " + (idx + 1), className: "basis-1/3", required: true }),
            /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-2 basis-2/3", children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: `firstname[${idx}]`, className: "hidden", children: [
                "First Name for ",
                idx + 1
              ] }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  type: "text",
                  name: "firstname",
                  id: `firstname[${idx}]`,
                  value: firstname,
                  placeholder: "First Name",
                  className: "block w-full",
                  autoComplete: "given-name",
                  handleChange: (e) => handleComplexChange(idx, e),
                  ariaLabelledBy: "fullname" + (idx + 1),
                  required: true
                }
              ),
              /* @__PURE__ */ jsxs("label", { htmlFor: `lastname[${idx}]`, className: "hidden", children: [
                "Last Name for ",
                idx + 1
              ] }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  type: "text",
                  name: "lastname",
                  id: `lastname[${idx}]`,
                  value: lastname,
                  placeholder: "Last Name",
                  className: "block w-full",
                  autoComplete: "family-name",
                  handleChange: (e) => handleComplexChange(idx, e),
                  ariaLabelledBy: "fullname" + (idx + 1),
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "inline-flex flex-wrap items-start gap-2 md:flex-nowrap", children: [
            /* @__PURE__ */ jsx(InputLabel, { forInput: `day[${idx}]`, value: `Date of Birth ${idx + 1}`, className: "basis-1/3", required: true }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-start gap-2 basis-2/3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: `day[${idx}]`, children: "Day (DD):" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: "text",
                      name: "day",
                      id: `day[${idx}]`,
                      value: day,
                      className: "w-24",
                      placeholder: "DD",
                      autoComplete: "on",
                      handleChange: (e) => handleComplexChange(idx, e),
                      onBlur: (e) => hasDateError(idx),
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: `month[${idx}]`, children: "Month (MM):" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: "text",
                      name: "month",
                      id: `month[${idx}]`,
                      value: month,
                      className: "w-24",
                      placeholder: "MM",
                      autoComplete: "on",
                      handleChange: (e) => handleComplexChange(idx, e),
                      onBlur: (e) => hasDateError(idx),
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: `year[${idx}]`, children: "Year (YYYY):" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: "text",
                      name: "year",
                      id: `year[${idx}]`,
                      value: year,
                      className: "w-40",
                      placeholder: "YYYY",
                      autoComplete: "on",
                      handleChange: (e) => handleComplexChange(idx, e),
                      onBlur: (e) => hasDateError(idx),
                      required: true
                    }
                  )
                ] })
              ] }),
              showDateError && showDateError[idx] && /* @__PURE__ */ jsx(InputError, { message: "Please enter a valid date", className: "mt-2 bg-red-100" })
            ] })
          ] })
        ] }, idx)),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => dispatch({ type: "addValue" }), className: "my-2 before:content-['+'] before:pr-1 before:text-lg", children: "Add Student" }),
          /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => dispatch({ type: "removeValue" }), className: "my-2 before:content-['-'] before:pr-1 before:text-lg", children: "Remove Student" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "flex mb-4 text-lg font-bold", children: "Contact Details" }),
      /* @__PURE__ */ jsxs("div", { className: "grid mb-5 items-start grid-cols-[1fr_2fr] gap-2", children: [
        /* @__PURE__ */ jsx(InputLabel, { forInput: "email", value: "Email", required: true }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "email",
            name: "email",
            id: "email",
            value: data.email,
            className: "block w-full",
            autoComplete: "email",
            handleChange,
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputLabel, { forInput: "phone", value: "Phone" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "text",
            name: "phone",
            id: "phone",
            value: data.phone,
            className: "block w-full",
            autoComplete: "phone",
            handleChange
          }
        ),
        /* @__PURE__ */ jsx(GroupLabel, { id: "address", value: "Address", required: true }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsx("label", { id: "address1label", htmlFor: "address1", className: "hidden", children: "Field 1" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "address1",
              id: "address1",
              value: data.address1,
              placeholder: "Street Address",
              className: "block w-full col-span-2",
              autoComplete: "on",
              handleChange,
              ariaLabelledBy: "address address1label"
            }
          ),
          /* @__PURE__ */ jsx("label", { id: "address2label", htmlFor: "address2", className: "hidden", children: "Field 2" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "address2",
              id: "address2",
              value: data.address2,
              placeholder: "Address Line 2",
              className: "block w-full col-span-2",
              autoComplete: "on",
              handleChange,
              ariaLabelledBy: "address address2label"
            }
          ),
          /* @__PURE__ */ jsx("label", { id: "citylabel", htmlFor: "city", className: "hidden", children: "City" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "city",
              id: "city",
              value: data.city,
              placeholder: "City",
              className: "block w-full",
              autoComplete: "on",
              handleChange,
              ariaLabelledBy: "address citylabel"
            }
          ),
          /* @__PURE__ */ jsx("label", { id: "statelabel", htmlFor: "state", className: "hidden", children: "State" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "state",
              id: "state",
              value: data.state,
              placeholder: "State",
              className: "block w-full",
              autoComplete: "on",
              handleChange,
              ariaLabelledBy: "address statelabel"
            }
          ),
          /* @__PURE__ */ jsx("label", { id: "postcodelabel", htmlFor: "postcode", className: "hidden", children: "Postcode" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              name: "postcode",
              id: "postcode",
              value: data.postcode,
              placeholder: "Postcode",
              className: "block w-full",
              autoComplete: "on",
              handleChange,
              ariaLabelledBy: "address postcode"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "country", className: "hidden", children: "Country" }),
          /* @__PURE__ */ jsx(
            CountryDropdown,
            {
              value: data.country,
              handleChange
            }
          )
        ] }),
        /* @__PURE__ */ jsx(InputLabel, { forInput: "message", value: "Message or Comment" }),
        /* @__PURE__ */ jsx(
          TextAreaInput,
          {
            name: "message",
            id: "message",
            value: data.message,
            className: "block w-full",
            handleChange,
            rows: 4
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex justify-center w-full gap-2 mt-5 md:justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => window.history.back(), children: "Go Back" }),
        /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", className: "w-1/3", processing: processing || showDateError.filter((el) => el === true).length > 0, children: "Request a Lesson" })
      ] })
    ] })
  ] }) });
}
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IndividualRequest
}, Symbol.toStringTag, { value: "Module" }));
const LessonsImage = "/build/assets/lessons-fan-english-08fc07c1.jpg";
const PrizegivingImage = "/build/assets/prizegiving-db0e5a5e.jpg";
const ShedImage = "/build/assets/shed-bf6d6f75.jpg";
const StepImage = "/build/assets/step-cccce726.jpg";
const CampImage = "/build/assets/camp-196853a2.jpg";
const BibletimeBanner = "/build/assets/bibletime-banner-610f94ac.jpg";
function LandingCards({ heading, content, image, buttonText, buttonLink, className = "", showNewBanner = false, primary = false }) {
  return /* @__PURE__ */ jsx(Fragment, { children: primary ? /* @__PURE__ */ jsxs("div", { className: "gap-4 h-full p-6 md:p-10 md:flex drop-shadow-lg bg-slate-50 " + className, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between md:w-1/2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-6 text-4xl font-bold uppercase break-words md:text-4xl lg:text-5xl font-subtitle", children: heading }),
        /* @__PURE__ */ jsx("div", { className: "mb-4 text-xl lg:text-3xl md:pr-5", children: content })
      ] }),
      buttonLink && buttonText && /* @__PURE__ */ jsx("div", { className: "flex justify-center w-full md:block", children: /* @__PURE__ */ jsx(ButtonLink, { size: "large", href: buttonLink, children: buttonText }) })
    ] }),
    /* @__PURE__ */ jsx("img", { className: "hidden object-contain w-1/2 md:block", src: image, alt: "Banner image" })
  ] }) : /* @__PURE__ */ jsxs("div", { className: "gap-4 h-full drop-shadow-lg p-6 bg-slate-50 overflow-clip relative " + className, children: [
    showNewBanner && /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 flex flex-col justify-end w-20 h-20 pb-1 text-center rotate-45 translate-x-10 -translate-y-10 shadow-inner bg-pbsblue", children: /* @__PURE__ */ jsx("span", { className: "text-sm text-white uppercase", children: "New" }) }),
    /* @__PURE__ */ jsx("div", { className: "mb-1 text-2xl font-bold uppercase break-words font-subtitle w-inherit", children: heading }),
    /* @__PURE__ */ jsx("div", { className: "mb-2 text-xl", children: content }),
    buttonLink && buttonText && /* @__PURE__ */ jsx("div", { className: "flex justify-center w-full md:block", children: /* @__PURE__ */ jsx(ButtonLink, { href: buttonLink, children: buttonText }) })
  ] }) });
}
function EventCard({ title, image, imageAlt, className = "", routeName }) {
  return /* @__PURE__ */ jsx(Link, { href: route(routeName), children: /* @__PURE__ */ jsxs("div", { className: `w-fit h-full rounded-lg bg-slate-50 mx-auto overflow-clip md:mx-0 drop-shadow-lg hover:bg-slate-200 ${className}`, children: [
    /* @__PURE__ */ jsx("p", { className: "py-3 text-3xl font-extrabold text-blue-900 capitalize", children: title }),
    /* @__PURE__ */ jsx("img", { className: "object-cover transition rounded-lg w-80 h-72 hover:scale-105", src: image, alt: imageAlt })
  ] }) });
}
function BannerComponent({ setShowBanner }) {
  return /* @__PURE__ */ jsxs("div", { role: "banner", className: "relative flex items-center justify-between w-full pr-5 text-white lg:pr-0 bg-bibletime-green", children: [
    /* @__PURE__ */ jsxs("p", { className: "mx-auto", children: [
      "You can view older assembly videos in the ",
      /* @__PURE__ */ jsx("a", { className: "underline hover:no-underline focus:no-underline", href: "/assembly", children: "School Assembly" }),
      " tab"
    ] }),
    /* @__PURE__ */ jsx("button", { "aria-label": "Close announcement banner", onClick: () => setShowBanner(false), className: "top-0 right-0 p-2 shrink", children: /* @__PURE__ */ jsx(CloseSolid, { className: "w-6 h-6" }) })
  ] });
}
function Home({ bibleTimeDownloads, videoList, canViewGallery = false }) {
  try {
    setAllBesLinks(bibleTimeDownloads);
  } catch (e) {
    console.warn("Global links variable tried to reset");
  }
  const { auth } = usePage().props;
  const [currentAssembly, setCurrentAssembly] = useState(videoList[0]);
  const [showBanner, setShowBanner] = useState(true);
  useEffect(() => {
    const searchedAssembly = videoList.find((vid) => vid.series === getUpperCaseAlphabetFromNumber(getCurrentSeriesNumber()) + (getCurrentMonthNumber() + 1));
    if (searchedAssembly) {
      setCurrentAssembly(searchedAssembly);
    } else {
      setCurrentAssembly(videoList[videoList.length - 1]);
    }
  }, [videoList]);
  return /* @__PURE__ */ jsxs(WrapperLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Home" }),
      /* @__PURE__ */ jsx("meta", { "head-key": "description", name: "description", content: "Postal Bible School Ireland offers free Bible based study material for all ages" })
    ] }),
    (auth == null ? void 0 : auth.user) && canViewGallery && showBanner && /* @__PURE__ */ jsx(BannerComponent, { setShowBanner }),
    /* @__PURE__ */ jsx("section", { className: "relative flex w-full", children: /* @__PURE__ */ jsxs("div", { className: `relative h-fit flex justify-center align-middle bg-sky-100 lg:bg-slate-50/70`, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute", children: /* @__PURE__ */ jsx("img", { src: BibletimeBanner, alt: "", className: "relative flex justify-center flex-1 invisible align-middle pointer-events-none -z-50 lg:visible lg:h-[calc(100vh+5rem)] lg:w-auto lg:aspect-auto lg:-top-20" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid h-full py-5 lg:py-10 w-4/5 grid-cols-1 gap-2 text-blue-900 my-5 lg:grid-cols-[1fr_1fr_20%]", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-white bg-clip-content md:col-span-2 md:row-span-2", children: /* @__PURE__ */ jsx(
          LandingCards,
          {
            heading: "School Study Materials",
            content: "Postal Bible School offers free Bible based study material for all age ranges at primary level",
            buttonText: "Learn More",
            buttonLink: route("courses"),
            image: LessonsImage,
            className: "border-4",
            primary: true
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white md:col-span-1 md:row-span-1", children: /* @__PURE__ */ jsx(
          LandingCards,
          {
            heading: /* @__PURE__ */ jsxs("p", { children: [
              "Prize",
              /* @__PURE__ */ jsx("wbr", {}),
              "givings 2024"
            ] }),
            content: "Find dates and locations.",
            className: "border-4",
            buttonText: "Details",
            buttonLink: route("events.prizegivings", { "type": "prizegivings" })
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white md:col-span-1 md:row-span-1", children: /* @__PURE__ */ jsx(
          LandingCards,
          {
            heading: "School Assembly Video",
            content: `is now available for ${currentAssembly.month}`,
            buttonText: "Show Me",
            buttonLink: route("assembly.show", { "series": currentAssembly.routename }),
            className: "border-4"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "w-full bg-sky-100 md:py-10", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-5 py-5 bg-white rounded-lg md:py-8 md:grid-cols-2 md:pr-20 lg:mx-24 drop-shadow-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col text-center uppercase", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl italic text-blue-900", children: "This month's Lesson" }),
        /* @__PURE__ */ jsx(Heading2Alt, { children: `${seriesNames[getCurrentSeriesNumber()].code}${getCurrentMonthNumber() + 1} - ${monthNames[getCurrentMonthNumber()]}` }),
        /* @__PURE__ */ jsx("div", { className: "h-full overflow-clip", children: /* @__PURE__ */ jsx("img", { className: "object-cover w-4/5 h-auto mx-auto my-auto bg-left-top md:scale-150 md:-translate-x-32 md:translate-y-28", src: LessonsImage, alt: "Lessons fanned" }) })
      ] }),
      /* @__PURE__ */ jsx(LessonSelectorList, { assemblySeries: currentAssembly.series, assemblyTitle: currentAssembly.monthTitle, assemblyLink: route("assembly.show", { "series": currentAssembly.routename }), selectedMonth: getCurrentMonthNumber(), selectedSeriesAlphabet: getUpperCaseAlphabetFromNumber(getCurrentSeriesNumber()), assemblyImageLink: currentAssembly.routename })
    ] }) }),
    /* @__PURE__ */ jsx(RequestLessonBanner, {}),
    /* @__PURE__ */ jsxs("section", { className: "py-12 mx-auto text-center max-w-7xl sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx(Heading2, { children: "Courses" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3 md:flex-row", children: courseContent.map((course, index) => /* @__PURE__ */ jsx(CourseCard, { heading: course.heading, type: course.type, description: course.description, image: course.image, buttonText: course.buttonText }, index)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-12 text-center bg-sky-100 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl ", children: [
      /* @__PURE__ */ jsx(Heading2, { children: "Events" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col content-center justify-center gap-4 md:flex-row", children: [
        /* @__PURE__ */ jsx(EventCard, { title: "Prizegivings", image: PrizegivingImage, imageAlt: "Prizegiving image", routeName: "events.prizegivings" }),
        /* @__PURE__ */ jsx(EventCard, { title: "The SHED", image: ShedImage, imageAlt: "SHED image", routeName: "events.shed" }),
        /* @__PURE__ */ jsx(EventCard, { title: "STEP", image: StepImage, imageAlt: "STEP image", routeName: "events.step.index" }),
        /* @__PURE__ */ jsx(EventCard, { title: "Summer Camp", image: CampImage, imageAlt: "Summer Camp image", routeName: "events.camp.index" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto mb-10 text-center max-w-7xl", children: [
      /* @__PURE__ */ jsx(Heading2, { children: "Contact Us" }),
      /* @__PURE__ */ jsx(ContactUsComponent, {})
    ] })
  ] });
}
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
function Create() {
  const { errors } = usePage().props;
  const { data, setData, post, processing } = useForm({
    schoolName: "",
    schoolType: "",
    level0Order: 0,
    level1Order: 0,
    level2Order: 0,
    level3Order: 0,
    level4Order: 0,
    tlpOrder: 0
  });
  const handleChange = (event) => {
    switch (event.target.name) {
      case "schoolName":
      case "schoolType":
      case "level0Order":
      case "level1Order":
      case "level2Order":
      case "level3Order":
      case "level4Order":
      case "tlpOrder":
        setData(event.target.name, event.target.value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    post(route("orders.store"));
  };
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs(ContentWrapper, { title: "Create New Order", children: [
    errors && Object.keys(errors).map(
      (key) => {
        if (key === "tlpOrder") {
          let updatedError = errors[key].replaceAll("tlp", "Teacher Lesson Plan");
          return /* @__PURE__ */ jsx(ToastBanner, { message: updatedError }, key);
        }
        return /* @__PURE__ */ jsx(ToastBanner, { message: errors[key] }, key);
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start gap-4 px-10 py-5 border", children: /* @__PURE__ */ jsxs("form", { method: "post", onSubmit: handleSubmit, className: "text-left min-w-screen-md", children: [
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Basic Information" }),
      /* @__PURE__ */ jsxs("div", { className: "block mb-4", children: [
        /* @__PURE__ */ jsx(InputLabel2, { forInput: "schoolName", value: "School Name", required: true }),
        /* @__PURE__ */ jsx(TextInput, { type: "text", name: "schoolName", id: "schoolName", value: data.schoolName, className: "", autoComplete: "off", handleChange, required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "block mb-4", children: [
        /* @__PURE__ */ jsx(InputLabel2, { forInput: "schoolType", value: "School Type" }),
        /* @__PURE__ */ jsx(TextInput, { type: "text", name: "schoolType", id: "schoolType", value: data.schoolType, className: "", autoComplete: "off", handleChange }),
        /* @__PURE__ */ jsx("p", { className: "text-sm italic text-gray-600", children: "Like: Delivery, Saints, Non-Saints, Donegal" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "block mb-4", children: [
        /* @__PURE__ */ jsx(InputLabel2, { forInput: "tlpOrder", value: "Teacher Lesson Plans" }),
        /* @__PURE__ */ jsx(NumberInput, { name: "tlpOrder", id: "tlpOrder", value: data.tlpOrder, className: "", autoComplete: "off", handleChange, required: true })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Lesson Order Numbers" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel2, { forInput: "level0Order", value: "Level 0" }),
          /* @__PURE__ */ jsx(NumberInput, { name: "level0Order", id: "level0Order", value: data.level0Order, className: "", autoComplete: "off", handleChange, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel2, { forInput: "level1Order", value: "Level 1" }),
          /* @__PURE__ */ jsx(NumberInput, { name: "level1Order", id: "level1Order", value: data.level1Order, className: "", autoComplete: "off", handleChange, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel2, { forInput: "level2Order", value: "Level 2" }),
          /* @__PURE__ */ jsx(NumberInput, { name: "level2Order", id: "level2Order", value: data.level2Order, className: "", autoComplete: "off", handleChange, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel2, { forInput: "level3Order", value: "Level 3" }),
          /* @__PURE__ */ jsx(NumberInput, { name: "level3Order", id: "level3Order", value: data.level3Order, className: "", autoComplete: "off", handleChange, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel2, { forInput: "level4Order", value: "Level 4" }),
          /* @__PURE__ */ jsx(NumberInput, { name: "level4Order", id: "level4Order", value: data.level4Order, className: "", autoComplete: "off", handleChange, required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex justify-center w-full gap-2 mt-5 md:justify-end", children: [
        /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: route("orders.index"), children: "Cancel" }),
        /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", className: "w-1/3", processing, children: "Create" })
      ] })
    ] }) })
  ] }) });
}
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create
}, Symbol.toStringTag, { value: "Module" }));
function OrderInfoCard({ schoolName, email, level0Order, level1Order, level2Order, level3Order, level4Order, tlpOrder }) {
  const rowStyle = "inline-flex flex-row w-full justify-between gap-5 mb-2 py-2 px-3 rounded-md bg-white border border-gray-800";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center max-w-md gap-4 p-6 bg-white border border-gray-800 rounded-md drop-shadow-md", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: rowStyle, children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex gap-2 font-semibold", children: [
          /* @__PURE__ */ jsx(School, { className: "w-6 h-6" }),
          "School"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: schoolName })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: rowStyle, children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex gap-2 font-semibold", children: [
          /* @__PURE__ */ jsx(Envelope, { className: "w-6 h-6" }),
          "Email"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: rowStyle, children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex gap-2 font-semibold", children: [
          /* @__PURE__ */ jsx(Newspaper, { className: "w-6 h-6" }),
          "Teacher Lesson Plans"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: tlpOrder })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between w-full gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center bg-white border-2 rounded-md border-bibletime-pink", children: [
        /* @__PURE__ */ jsx("span", { className: "p-1 font-medium text-center text-white rounded bg-bibletime-pink", children: "Level 0" }),
        /* @__PURE__ */ jsx("span", { className: "p-1", children: level0Order })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center bg-white border-2 rounded-md border-bibletime-orange", children: [
        /* @__PURE__ */ jsx("span", { className: "p-1 font-medium text-center text-white rounded bg-bibletime-orange", children: "Level 1" }),
        /* @__PURE__ */ jsx("span", { className: "p-2", children: level1Order })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center bg-white border-2 rounded-md border-bibletime-red", children: [
        /* @__PURE__ */ jsx("span", { className: "p-1 font-medium text-center text-white rounded bg-bibletime-red", children: "Level 2" }),
        /* @__PURE__ */ jsx("span", { className: "p-2", children: level2Order })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center bg-white border-2 rounded-md border-bibletime-green", children: [
        /* @__PURE__ */ jsx("span", { className: "p-1 font-medium text-center text-white rounded bg-bibletime-green", children: "Level 3" }),
        /* @__PURE__ */ jsx("span", { className: "p-2", children: level3Order })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center bg-white border-2 rounded-md border-bibletime-blue", children: [
        /* @__PURE__ */ jsx("span", { className: "p-1 font-medium text-center text-white rounded bg-bibletime-blue", children: "Level 4" }),
        /* @__PURE__ */ jsx("span", { className: "p-2", children: level4Order })
      ] })
    ] })
  ] });
}
function Edit({ isAdmin, lessonOrder }) {
  const { errors } = usePage().props;
  const { data, setData, processing, reset, put } = useForm({
    schoolName: lessonOrder.schoolName,
    schoolType: lessonOrder.schoolType ?? "",
    email: lessonOrder.email,
    level0Order: lessonOrder.level0Order,
    level1Order: lessonOrder.level1Order,
    level2Order: lessonOrder.level2Order,
    level3Order: lessonOrder.level3Order,
    level4Order: lessonOrder.level4Order,
    tlpOrder: lessonOrder.tlpOrder
  });
  const handleChange = (event) => {
    switch (event.target.name) {
      case "schoolName":
      case "schoolType":
      case "email":
      case "level0Order":
      case "level1Order":
      case "level2Order":
      case "level3Order":
      case "level4Order":
      case "tlpOrder":
        setData(event.target.name, event.target.value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    put(route("orders.update", lessonOrder.id));
  };
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs(ContentWrapper, { title: "Edit Order", children: [
    /* @__PURE__ */ jsx(ParagraphContainer, { children: /* @__PURE__ */ jsx(Paragraph, { className: "text-left", children: "View and update your monthly orders of BibleTime lessons here. Please note, changes are made effective only from the following month. If you wish for the changes to take effect immediately, please contact us." }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-4 py-5 md:px-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black capitalize", children: "Current information" }),
      /* @__PURE__ */ jsx(OrderInfoCard, { schoolName: lessonOrder.schoolName, email: lessonOrder.email, level0Order: lessonOrder.level0Order, level1Order: lessonOrder.level1Order, level2Order: lessonOrder.level2Order, level3Order: lessonOrder.level3Order, level4Order: lessonOrder.level4Order, tlpOrder: lessonOrder.tlpOrder }),
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Update Information" }),
      errors && Object.keys(errors).map(
        (key) => {
          if (key === "tlpOrder") {
            let updatedError = errors[key].replaceAll("tlp", "Teacher Lesson Plan");
            return /* @__PURE__ */ jsx(ToastBanner, { message: updatedError }, key);
          }
          return /* @__PURE__ */ jsx(ToastBanner, { message: errors[key] }, key);
        }
      ),
      /* @__PURE__ */ jsxs("form", { method: "post", onSubmit: handleSubmit, className: "text-left min-w-screen-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "block mb-4", children: [
          /* @__PURE__ */ jsx(InputLabel2, { forInput: "tlpOrder", value: "Teacher Lesson Plans" }),
          /* @__PURE__ */ jsx(NumberInput, { name: "tlpOrder", id: "tlpOrder", value: data.tlpOrder, className: "", autoComplete: "off", handleChange })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "p-0 mb-2 font-bold text-black text-l", children: "Lesson Order Numbers" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel2, { forInput: "level0Order", value: "Level 0" }),
            /* @__PURE__ */ jsx(NumberInput, { name: "level0Order", id: "level0Order", value: data.level0Order, className: "", autoComplete: "off", handleChange })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel2, { forInput: "level1Order", value: "Level 1" }),
            /* @__PURE__ */ jsx(NumberInput, { name: "level1Order", id: "level1Order", value: data.level1Order, className: "", autoComplete: "off", handleChange })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel2, { forInput: "level2Order", value: "Level 2" }),
            /* @__PURE__ */ jsx(NumberInput, { name: "level2Order", id: "level2Order", value: data.level2Order, className: "", autoComplete: "off", handleChange })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel2, { forInput: "level3Order", value: "Level 3" }),
            /* @__PURE__ */ jsx(NumberInput, { name: "level3Order", id: "level3Order", value: data.level3Order, className: "", autoComplete: "off", handleChange })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel2, { forInput: "level4Order", value: "Level 4" }),
            /* @__PURE__ */ jsx(NumberInput, { name: "level4Order", id: "level4Order", value: data.level4Order, className: "", autoComplete: "off", handleChange })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex justify-end w-full gap-2 mt-5 md:justify-end", children: [
          /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: route("orders.index"), children: "Cancel" }),
          /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", className: "w-1/3", processing, children: "Update" })
        ] })
      ] })
    ] }) })
  ] }) });
}
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
function Index$1({ lessonOrders }) {
  const getTypeFromDispatchCode = (code) => {
    switch (code) {
      case "DL":
        return "Donegal";
      case "G":
        return "Group";
      case "S":
        return "Delivery";
      case "SP":
        return "Postal";
      default:
        return "";
    }
  };
  const tableDataMemo = useMemo(() => lessonOrders, []);
  const columnHelper = createColumnHelper();
  const defaultColumns = [
    columnHelper.accessor((row) => truncateString(row.schoolName, 20), {
      header: "School Name",
      maxSize: 20
    }),
    columnHelper.accessor((row) => getTypeFromDispatchCode(row.schoolType), {
      header: "School Type",
      minSize: 100
    }),
    columnHelper.accessor((row) => row.level0Order, {
      id: "level0Order",
      header: () => /* @__PURE__ */ jsx("span", { className: "p-2 text-white bg-bibletime-pink", children: "Level 0" })
    }),
    columnHelper.accessor((row) => row.level1Order, {
      id: "level1Order",
      header: () => /* @__PURE__ */ jsx("span", { className: "p-2 text-white bg-bibletime-orange", children: "Level 1" })
    }),
    columnHelper.accessor((row) => row.level2Order, {
      id: "level2Order",
      header: () => /* @__PURE__ */ jsx("span", { className: "p-2 text-white bg-bibletime-red", children: "Level 2" })
    }),
    columnHelper.accessor((row) => row.level3Order, {
      id: "level3Order",
      header: () => /* @__PURE__ */ jsx("span", { className: "p-2 text-white bg-bibletime-green", children: "Level 3" })
    }),
    columnHelper.accessor((row) => row.level4Order, {
      id: "level4Order",
      header: () => /* @__PURE__ */ jsx("span", { className: "p-2 text-white bg-bibletime-blue", children: "Level 4" })
    }),
    columnHelper.accessor((row) => row.tlpOrder, {
      header: "TLP"
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex w-full gap-2 py-2", children: [
        /* @__PURE__ */ jsxs(Link, { className: "text-blue-500 underline hover:no-underline", href: "/orders/" + row.original.id + "/edit", children: [
          /* @__PURE__ */ jsx(EditIcon, { className: "w-6 h-6" }),
          " Edit"
        ] }),
        /* @__PURE__ */ jsxs(Link, { className: "text-blue-500 underline hover:no-underline", href: "/orders/" + row.original.id, children: [
          /* @__PURE__ */ jsx(Eye, { className: "w-6 h-6" }),
          " View"
        ] })
      ] })
    })
  ];
  const handleDataSync = () => {
    router$1.get(route("orders.sync"));
  };
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsx(ContentWrapper, { title: "Monthly Lesson Order", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-4 px-2 py-5 border md:px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between w-full mb-2", children: [
      /* @__PURE__ */ jsx("h2", { className: "p-0 text-xl font-bold text-black", children: "View Schools" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 text-sm", children: /* @__PURE__ */ jsx(SecondaryButton, { onClick: handleDataSync, children: "Sync Data" }) })
    ] }),
    /* @__PURE__ */ jsx(AdvancedTable, { data: tableDataMemo, columns: defaultColumns })
  ] }) }) });
}
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
function NotFound$1() {
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs(ContentWrapper, { title: "Monthly Lesson Order", children: [
    /* @__PURE__ */ jsx(Heading2, { children: "No Record" }),
    /* @__PURE__ */ jsx(ParagraphContainer, { children: /* @__PURE__ */ jsxs(Paragraph, { className: "text-left", children: [
      "We do not have a record of your order with Postal Bible School. If this is a mistake or you wish to place a new order for lessons please ",
      /* @__PURE__ */ jsx(AnchorLink, { href: route("contactus"), children: "contact us" }),
      "."
    ] }) })
  ] }) });
}
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound$1
}, Symbol.toStringTag, { value: "Module" }));
function Show({ isAdmin, lessonOrder }) {
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsxs(ContentWrapper, { title: "Monthly Lesson Order", children: [
    /* @__PURE__ */ jsx(ParagraphContainer, { children: /* @__PURE__ */ jsx(Paragraph, { className: "text-left", children: "View and update your monthly orders of BibleTime lessons here. Please note, changes are made effective only from the following month. If you wish for the changes to take effect immediately, please contact us." }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center w-full mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "px-2 py-5 text-left md:px-10 w-fit", children: [
      /* @__PURE__ */ jsx("h2", { className: "p-0 mb-2 text-xl font-bold text-black", children: "Current Information" }),
      /* @__PURE__ */ jsx(OrderInfoCard, { schoolName: lessonOrder.schoolName, email: lessonOrder.email, level0Order: lessonOrder.level0Order, level1Order: lessonOrder.level1Order, level2Order: lessonOrder.level2Order, level3Order: lessonOrder.level3Order, level4Order: lessonOrder.level4Order, tlpOrder: lessonOrder.tlpOrder }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex justify-end w-full gap-2 mt-5 md:justify-end", children: [
        isAdmin && /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: route("orders.index"), children: "Back" }),
        !isAdmin && /* @__PURE__ */ jsx(ButtonLink, { hierarchy: "secondary", href: "/", children: "Back" }),
        /* @__PURE__ */ jsx(ButtonLink, { href: route("orders.edit", lessonOrder.id), children: "Edit" })
      ] })
    ] }) })
  ] }) });
}
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Show
}, Symbol.toStringTag, { value: "Module" }));
function NotFound() {
  return /* @__PURE__ */ jsx("section", { className: "py-6 bg-white sm:py-8 lg:py-12", children: /* @__PURE__ */ jsx("div", { className: "px-4 mx-auto max-w-screen-2xl md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("a", { href: "/", className: "inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5 mb-8", "aria-label": "logo", children: [
      /* @__PURE__ */ jsx("img", { src: LogoSmall, alt: "PBS Icon", className: "w-10 h-10" }),
      "Postal Bible School"
    ] }),
    /* @__PURE__ */ jsx("h1", { className: "mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "max-w-screen-md mb-12 text-center text-gray-500 md:text-lg", children: "The page you’re looking for doesn’t exist." }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "inline-block px-8 py-3 text-sm font-semibold text-center text-gray-500 transition duration-100 bg-gray-200 rounded-lg outline-none hover:bg-gray-300 focus-visible:ring ring-indigo-300 active:text-gray-700 md:text-base", children: "Go home" })
  ] }) }) });
}
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound
}, Symbol.toStringTag, { value: "Module" }));
function PaypalCheckoutButtons({ cart, onClick, setErrorMessage, setSuccess, cartDescription = "" }) {
  const [message, setMessage] = useState("");
  const resetMessage = () => {
    setMessage("");
  };
  const createOrder = async () => {
    var _a;
    resetMessage();
    try {
      let body = {
        cart,
        description: cartDescription
      };
      const response = await fetch(route("paypal.create"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const orderData = await response.json();
      if (orderData.id) {
        console.log("Order ID", orderData.id);
        return orderData.id;
      } else {
        const errorDetail = (_a = orderData == null ? void 0 : orderData.details) == null ? void 0 : _a[0];
        const errorMessage = errorDetail ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})` : JSON.stringify(orderData);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      setMessage(`Could not initiate PayPal Checkout... Please try again later`);
    }
  };
  const onApprove = async (data, actions) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    resetMessage();
    try {
      const response = await fetch(route("paypal.capture", data.orderID), {
        method: "POST"
      });
      const orderData = await response.json();
      console.log("Capture Order", orderData);
      const errorDetail = (_a = orderData == null ? void 0 : orderData.details) == null ? void 0 : _a[0];
      if ((errorDetail == null ? void 0 : errorDetail.issue) === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else if (!orderData.purchase_units) {
        throw new Error(JSON.stringify(orderData));
      } else {
        const transaction = ((_e = (_d = (_c = (_b = orderData == null ? void 0 : orderData.purchase_units) == null ? void 0 : _b[0]) == null ? void 0 : _c.payments) == null ? void 0 : _d.captures) == null ? void 0 : _e[0]) || ((_i = (_h = (_g = (_f = orderData == null ? void 0 : orderData.purchase_units) == null ? void 0 : _f[0]) == null ? void 0 : _g.payments) == null ? void 0 : _h.authorizations) == null ? void 0 : _i[0]);
        setMessage(`Transaction ${transaction.status}: ${transaction.id}`);
        console.log(
          `Transaction ${transaction.status}: ${transaction.id} - See console for all available details`
        );
        setSuccess(true);
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
      }
    } catch (e) {
      console.log(`Transaction Failed: ${e.message}`);
      setMessage(`Transaction Failed. Please try again later.`);
    }
  };
  useEffect(() => {
    if (message && message !== "")
      setErrorMessage(message);
    return () => {
      setMessage("");
    };
  }, [message]);
  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer();
    const [{ options }, dispatch] = usePayPalScriptReducer();
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      showSpinner && isPending && /* @__PURE__ */ jsx(Loader, {}),
      !(showSpinner && isPending) && /* @__PURE__ */ jsx(
        PayPalButtons,
        {
          style: {
            layout: "vertical",
            height: 50,
            shape: "pill"
          },
          disabled: false,
          createOrder,
          onApprove,
          onClick,
          onCancel: () => {
            resetMessage();
            dispatch({
              type: "resetOptions",
              value: {
                ...options
              }
            });
            setMessage("Order cancelled");
          }
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full mx-auto", children: /* @__PURE__ */ jsx(ButtonWrapper, { showSpinner: false }) });
}
function PaymentSuccessComponent() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 my-6", children: [
    /* @__PURE__ */ jsx(CheckBadge, { className: "w-40 h-40 text-green-600" }),
    /* @__PURE__ */ jsx("p", { children: "Your transaction has been successful!" }),
    /* @__PURE__ */ jsx(Link, { href: route("home"), children: /* @__PURE__ */ jsx(SecondaryButton, { children: "Return Home" }) })
  ] });
}
const defaultProducts$1 = [
  {
    title: "General",
    quantity: 0,
    price: 30
  },
  {
    title: "2 in family",
    quantity: 0,
    price: 60
  }
];
const productReducer$1 = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "increase":
      return [...state].map((product, index) => {
        if (index === action.index) {
          return {
            title: product.title,
            quantity: product.quantity + 1,
            price: product.price
          };
        }
        return product;
      });
    case "decrease":
      return [...state].map((product, index) => {
        if (index === action.index && product.quantity > 1) {
          return {
            title: product.title,
            quantity: product.quantity - 1,
            price: product.price
          };
        }
        return product;
      });
    case "selected":
      newState = [...state];
      newState[action.index].quantity = 1;
      return newState;
    default:
      return state;
  }
};
const defaultCart$1 = [
  {
    id: 0,
    quantity: 1,
    value: 0
  }
];
const cartReducer$1 = (state, action) => {
  switch (action.type) {
    case "setItem":
      return [
        {
          id: action.id,
          quantity: action.quantity,
          value: action.value
        }
      ];
    case "changeValue":
      return [...state].map((cart) => {
        if (cart.id === action.id && action.quantity && action.value) {
          return {
            id: action.id,
            quantity: action.quantity,
            value: action.value
          };
        }
        return cart;
      });
    case "addItem":
      if (action.quantity && action.value) {
        return [
          ...state,
          {
            id: state.length,
            quantity: action.quantity,
            value: action.value
          }
        ];
      }
      return state;
    case "removeItem":
      if (state.length === 1) {
        return defaultCart$1;
      }
      return state.filter((cart) => cart.id !== action.id);
    case "resetCart":
      return defaultCart$1;
    default:
      return state;
  }
};
function Camp() {
  const [activeOption, setActiveOption] = useState(null);
  const [customPrice, setCustomPrice] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [cartState, cartDispatch] = useReducer(cartReducer$1, defaultCart$1);
  const [productState, productDispatch] = useReducer(productReducer$1, defaultProducts$1);
  const handleOptionSelect = (option) => {
    if (option === activeOption) {
      return;
    }
    setCustomPrice("");
    if (option === 4) {
      cartDispatch({
        type: "resetCart",
        id: 0,
        quantity: 0,
        value: 0
      });
    } else {
      productDispatch({ type: "selected", index: option });
    }
    setActiveOption(option);
  };
  const handleCustomPriceChange = (event) => {
    if (event.target) {
      setCustomPrice(event.target.value.replace(/^0+/, ""));
    }
  };
  const handleContinueButton = () => {
    setError("");
    if (activeOption === null || activeOption === 4 && customPrice === "") {
      setIsButtonDisabled(true);
      setError("Please select or enter an amount to send");
      return;
    }
    if (customPrice !== "") {
      cartDispatch({
        type: "setItem",
        id: 0,
        quantity: 1,
        value: Number(customPrice)
      });
    } else {
      cartDispatch({
        type: "setItem",
        id: 0,
        quantity: productState[activeOption].quantity,
        value: productState[activeOption].price
      });
    }
    setIsButtonDisabled(false);
  };
  const handlePaymentContinued = (data, actions) => {
    if (isButtonDisabled) {
      console.error("Values not set");
      setError("Please select or enter an amount to send");
      return actions.reject();
    }
    return actions.resolve();
  };
  const displayAdditionalAction = () => {
    if (activeOption === 4) {
      return /* @__PURE__ */ jsx("div", { className: "w-full h-10 mb-4", children: /* @__PURE__ */ jsxs("p", { className: "flex items-center w-full transition ease-in-out border border-gray-400 rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:shadow-md focus-within:shadow-indigo-500", children: [
        /* @__PURE__ */ jsx("span", { className: "ml-4 font-normal pointer-events-none", children: "€" }),
        /* @__PURE__ */ jsx("input", { className: "w-full border-0 rounded-md focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none", type: "number", name: "price", id: "price", value: customPrice, onChange: handleCustomPriceChange, placeholder: "Please enter an amount" })
      ] }) });
    }
  };
  const getTotalAmount = () => {
    return cartState.reduce((total, item) => total + item.value * item.quantity, 0);
  };
  const handleAmountReset = () => {
    cartDispatch({
      type: "resetCart",
      id: 0,
      quantity: 0,
      value: 0
    });
    setError("");
    setActiveOption(null);
    setIsButtonDisabled(true);
  };
  useEffect(() => {
    handleAmountReset();
  }, []);
  return /* @__PURE__ */ jsx(CampWrapper, { title: "Payment", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto", children: [
    /* @__PURE__ */ jsx(Heading1Alt, { children: "Summer Camp Payment" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center flex-col w-3/4 mx-auto my-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mx-auto w-full gap-2 p-8 mb-5 border border-gray-300 rounded-md lg:w-2/3", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex justify-center w-full px-6", children: /* @__PURE__ */ jsx("img", { src: LogoSmall, alt: "Postal Bible School Logo", className: "my-4 h-14" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl", children: "Postal Bible School" }),
      !isSuccess && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { className: "px-10 mb-5 text-xl", children: [
          "You can pay the deposit for Summer Camp 2024 to ",
          /* @__PURE__ */ jsx("br", {}),
          " Postal Bible School here"
        ] }),
        isButtonDisabled && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 mb-4", children: [
            productState.map(({ title, quantity, price }, index) => /* @__PURE__ */ jsx("button", { onClick: () => handleOptionSelect(index), className: "flex flex-col justify-center items-center p-2 px-6 border border-gray-300 rounded-md shadow-md" + (activeOption === index ? " bg-blue-800 text-white" : ""), children: price && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("p", { className: "text-lg font-bold before:content-['€']", children: price }),
              /* @__PURE__ */ jsx("p", { className: "capitalize", children: title })
            ] }) }, index + "product")),
            /* @__PURE__ */ jsx("button", { onClick: () => handleOptionSelect(4), className: "flex flex-col justify-center items-center p-2 px-6 border border-gray-300 rounded-md shadow-md" + (activeOption === 4 ? " bg-blue-800 text-white" : ""), children: /* @__PURE__ */ jsx("p", { className: "text-lg font-bold", children: "Custom" }) })
          ] }),
          displayAdditionalAction(),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end w-full", children: /* @__PURE__ */ jsx(PrimaryButton, { onClick: () => handleContinueButton(), children: "Continue" }) })
        ] }),
        !isButtonDisabled && /* @__PURE__ */ jsxs("div", { className: "w-full lg:max-w-2xl", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "mb-2", children: "You have selected to pay" }),
            /* @__PURE__ */ jsxs("p", { className: "mb-4 text-xl md:text-4xl", children: [
              "€",
              getTotalAmount()
            ] }),
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => handleAmountReset(), children: "Change Amount" })
          ] }),
          /* @__PURE__ */ jsx("hr", { className: "w-1/2 h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700" }),
          /* @__PURE__ */ jsx("div", { className: "py-4 lg:px-8", children: /* @__PURE__ */ jsx(PaypalCheckoutButtons, { setSuccess: setIsSuccess, setErrorMessage: setError, onClick: handlePaymentContinued, cart: cartState, cartDescription: "Payment for PBS Camp" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full lg:max-w-2xl", children: error && /* @__PURE__ */ jsx("p", { className: "text-red-500", children: error }) })
      ] }),
      isSuccess && /* @__PURE__ */ jsx(PaymentSuccessComponent, {})
    ] }) })
  ] }) });
}
const __vite_glob_0_39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Camp
}, Symbol.toStringTag, { value: "Module" }));
function Index() {
  const [activeOption, setActiveOption] = useState(null);
  const [currentPrice, setCurrentPrice] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const products = [
    {
      title: "Option 1",
      description: "",
      price: 20
    },
    {
      title: "Option 2",
      description: "",
      price: 40
    },
    {
      title: "Option 3",
      description: "",
      price: 60
    }
  ];
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setCart([]);
    setActiveOption(null);
    setCurrentPrice("");
    setError("");
  }, []);
  const handleOptionSelect = (option) => {
    if (option === activeOption) {
      return;
    }
    if (option === 4) {
      setCurrentPrice("");
      setCart([]);
    } else {
      setCurrentPrice("" + products[option].price);
      setCart([
        {
          id: 0,
          quantity: 1,
          value: Number(currentPrice)
        }
      ]);
    }
    setActiveOption(option);
  };
  const handleCustomPriceChange = (event) => {
    if (event.target) {
      setCurrentPrice(event.target.value.replace(/^0+/, ""));
    }
  };
  const handleContinueButton = () => {
    if (activeOption === null || currentPrice === "") {
      setIsButtonDisabled(true);
      setError("Please select or enter an amount to send");
      return;
    }
    setCart([{
      id: 0,
      quantity: 1,
      value: Number(currentPrice)
    }]);
    setIsButtonDisabled(false);
  };
  const handlePaymentContinued = (data, actions) => {
    if (isButtonDisabled || currentPrice === "") {
      console.error("Values not set");
      setError("Please select or enter an amount to send");
      return actions.reject();
    }
    return actions.resolve();
  };
  return /* @__PURE__ */ jsx(WrapperLayout, { children: /* @__PURE__ */ jsx(ContentWrapper, { title: "Default Payment", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center w-3/4 mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center w-full gap-2 p-8 mb-5 border border-gray-300 rounded-md lg:w-2/3", children: [
    /* @__PURE__ */ jsx("div", { className: "inline-flex justify-center w-full px-6", children: /* @__PURE__ */ jsx("img", { src: LogoSmall, alt: "Postal Bible School Logo", className: "my-4 h-14" }) }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl", children: "Postal Bible School" }),
    !isSuccess && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("p", { className: "px-10 text-xl", children: [
        "You can make general payments to",
        /* @__PURE__ */ jsx("br", {}),
        " Postal Bible School Trust here"
      ] }),
      isButtonDisabled && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-2 mb-4", children: [
          products.map(({ title, description, price }, index) => /* @__PURE__ */ jsx("button", { onClick: () => handleOptionSelect(index), className: "flex flex-col justify-center items-center p-2 px-6 border border-gray-300 rounded-md shadow-md" + (activeOption === index ? " bg-blue-800 text-white" : ""), children: price && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "text-lg font-bold before:content-['€']", children: price }),
            /* @__PURE__ */ jsx("div", { className: "text-sm uppercase ", children: "EUR" })
          ] }) }, index + "product")),
          /* @__PURE__ */ jsx("button", { onClick: () => handleOptionSelect(4), className: "flex flex-col justify-center items-center p-2 px-6 border border-gray-300 rounded-md shadow-md" + (activeOption === 4 ? " bg-blue-800 text-white" : ""), children: /* @__PURE__ */ jsx("p", { className: "text-lg font-bold", children: "Other" }) })
        ] }),
        activeOption === 4 && /* @__PURE__ */ jsx("div", { className: "w-full h-10 mb-4", children: /* @__PURE__ */ jsxs("p", { className: "flex items-center w-full transition ease-in-out border border-gray-400 rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:shadow-md focus-within:shadow-indigo-500", children: [
          /* @__PURE__ */ jsx("span", { className: "ml-4 font-normal pointer-events-none", children: "€" }),
          /* @__PURE__ */ jsx("input", { className: "w-full border-0 rounded-md focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none", type: "number", name: "price", id: "price", value: currentPrice, onChange: handleCustomPriceChange, placeholder: "Please enter an amount" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end w-full", children: /* @__PURE__ */ jsx(PrimaryButton, { onClick: () => handleContinueButton(), children: "Continue" }) })
      ] }),
      !isButtonDisabled && /* @__PURE__ */ jsxs("div", { className: "w-full lg:max-w-2xl", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-2", children: "You have selected to pay" }),
          /* @__PURE__ */ jsxs("p", { className: "mb-4 text-xl md:text-4xl", children: [
            "€",
            currentPrice === "" ? 0 : currentPrice
          ] }),
          /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => {
            setError("");
            setIsButtonDisabled(true);
          }, children: "Change Amount" })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "w-1/2 h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700" }),
        /* @__PURE__ */ jsx("div", { className: "py-4 lg:px-8", children: /* @__PURE__ */ jsx(PaypalCheckoutButtons, { setSuccess: setIsSuccess, setErrorMessage: setError, onClick: handlePaymentContinued, cart }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full lg:max-w-2xl", children: error && /* @__PURE__ */ jsx("p", { className: "text-red-500", children: error }) })
    ] }),
    isSuccess && /* @__PURE__ */ jsx(PaymentSuccessComponent, {})
  ] }) }) }) });
}
const __vite_glob_0_40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const defaultProducts = [
  {
    title: "General",
    quantity: 0,
    price: 65
  },
  {
    title: "Student",
    quantity: 0,
    price: 50
  }
];
const productReducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "increase":
      return [...state].map((product, index) => {
        if (index === action.index) {
          return {
            title: product.title,
            quantity: product.quantity + 1,
            price: product.price
          };
        }
        return product;
      });
    case "decrease":
      return [...state].map((product, index) => {
        if (index === action.index && product.quantity > 1) {
          return {
            title: product.title,
            quantity: product.quantity - 1,
            price: product.price
          };
        }
        return product;
      });
    case "selected":
      newState = [...state];
      newState[action.index].quantity = 1;
      return newState;
    default:
      return state;
  }
};
const defaultCart = [
  {
    id: 0,
    quantity: 1,
    value: 0
  }
];
const cartReducer = (state, action) => {
  switch (action.type) {
    case "setItem":
      return [
        {
          id: action.id,
          quantity: action.quantity,
          value: action.value
        }
      ];
    case "changeValue":
      return [...state].map((cart) => {
        if (cart.id === action.id && action.quantity && action.value) {
          return {
            id: action.id,
            quantity: action.quantity,
            value: action.value
          };
        }
        return cart;
      });
    case "addItem":
      if (action.quantity && action.value) {
        return [
          ...state,
          {
            id: state.length,
            quantity: action.quantity,
            value: action.value
          }
        ];
      }
      return state;
    case "removeItem":
      if (state.length === 1) {
        return defaultCart;
      }
      return state.filter((cart) => cart.id !== action.id);
    case "resetCart":
      return defaultCart;
    default:
      return state;
  }
};
function Step() {
  const [activeOption, setActiveOption] = useState(null);
  const [customPrice, setCustomPrice] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCart);
  const [productState, productDispatch] = useReducer(productReducer, defaultProducts);
  const handleOptionSelect = (option) => {
    if (option === activeOption) {
      return;
    }
    setCustomPrice("");
    if (option === 4) {
      cartDispatch({
        type: "resetCart",
        id: 0,
        quantity: 0,
        value: 0
      });
    } else {
      productDispatch({ type: "selected", index: option });
    }
    setActiveOption(option);
  };
  const handleCustomPriceChange = (event) => {
    if (event.target) {
      setCustomPrice(event.target.value.replace(/^0+/, ""));
    }
  };
  const handleContinueButton = () => {
    setError("");
    if (activeOption === null) {
      setIsButtonDisabled(true);
      setError("Please select or enter an amount to send");
      return;
    }
    if (customPrice !== "") {
      cartDispatch({
        type: "setItem",
        id: 0,
        quantity: 1,
        value: Number(customPrice)
      });
    } else {
      cartDispatch({
        type: "setItem",
        id: 0,
        quantity: productState[activeOption].quantity,
        value: productState[activeOption].price
      });
    }
    setIsButtonDisabled(false);
  };
  const handlePaymentContinued = (data, actions) => {
    if (isButtonDisabled) {
      console.error("Values not set");
      setError("Please select or enter an amount to send");
      return actions.reject();
    }
    return actions.resolve();
  };
  const displayAdditionalAction = () => {
    if (activeOption === 0 || activeOption === 1) {
      return /* @__PURE__ */ jsx("div", { className: "w-full h-10 mb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end text-lg", children: [
        /* @__PURE__ */ jsx("p", { children: "Select quantity: " }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center ml-2 rounded-full bg-slate-100", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => productDispatch({ type: "decrease", index: activeOption }), className: "rounded-full", children: /* @__PURE__ */ jsx(MinusCircle, { className: "w-10 h-10" }) }),
          /* @__PURE__ */ jsx("p", { className: "px-2", children: productState[activeOption].quantity }),
          /* @__PURE__ */ jsx("button", { onClick: () => productDispatch({ type: "increase", index: activeOption }), className: "rounded-full", children: /* @__PURE__ */ jsx(PlusSolid, { className: "w-10 h-10" }) })
        ] })
      ] }) });
    }
    if (activeOption === 4) {
      return /* @__PURE__ */ jsx("div", { className: "w-full h-10 mb-4", children: /* @__PURE__ */ jsxs("p", { className: "flex items-center w-full transition ease-in-out border border-gray-400 rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:shadow-md focus-within:shadow-indigo-500", children: [
        /* @__PURE__ */ jsx("span", { className: "ml-4 font-normal pointer-events-none", children: "€" }),
        /* @__PURE__ */ jsx("input", { className: "w-full border-0 rounded-md focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none", type: "number", name: "price", id: "price", value: customPrice, onChange: handleCustomPriceChange, placeholder: "Please enter an amount" })
      ] }) });
    }
  };
  const getTotalAmount = () => {
    return cartState.reduce((total, item) => total + item.value * item.quantity, 0);
  };
  const handleAmountReset = () => {
    cartDispatch({
      type: "resetCart",
      id: 0,
      quantity: 0,
      value: 0
    });
    setError("");
    setActiveOption(null);
    setIsButtonDisabled(true);
  };
  useEffect(() => {
    handleAmountReset();
  }, []);
  return /* @__PURE__ */ jsx(StepWrapper, { heading: "STEP Payment", title: "Payment", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center w-3/4 mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center w-full gap-2 p-8 mb-5 border border-gray-300 rounded-md lg:w-2/3", children: [
    /* @__PURE__ */ jsx("div", { className: "inline-flex justify-center w-full px-6", children: /* @__PURE__ */ jsx("img", { src: LogoSmall, alt: "Postal Bible School Logo", className: "my-4 h-14" }) }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl", children: "Postal Bible School" }),
    !isSuccess && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("p", { className: "px-10 mb-5 text-xl", children: [
        "You can make payments for STEP to the",
        /* @__PURE__ */ jsx("br", {}),
        " Postal Bible School Trust here"
      ] }),
      isButtonDisabled && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 mb-4", children: [
          productState.map(({ title, quantity, price }, index) => /* @__PURE__ */ jsx("button", { onClick: () => handleOptionSelect(index), className: "flex flex-col justify-center items-center p-2 px-6 border border-gray-300 rounded-md shadow-md" + (activeOption === index ? " bg-blue-800 text-white" : ""), children: price && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("p", { className: "text-lg font-bold before:content-['€']", children: price }),
            /* @__PURE__ */ jsx("p", { className: "capitalize", children: title })
          ] }) }, index + "product")),
          /* @__PURE__ */ jsx("button", { onClick: () => handleOptionSelect(4), className: "flex flex-col justify-center items-center p-2 px-6 border border-gray-300 rounded-md shadow-md" + (activeOption === 4 ? " bg-blue-800 text-white" : ""), children: /* @__PURE__ */ jsx("p", { className: "text-lg font-bold", children: "Custom" }) })
        ] }),
        displayAdditionalAction(),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end w-full", children: /* @__PURE__ */ jsx(PrimaryButton, { onClick: () => handleContinueButton(), children: "Continue" }) })
      ] }),
      !isButtonDisabled && /* @__PURE__ */ jsxs("div", { className: "w-full lg:max-w-2xl", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-2", children: "You have selected to pay" }),
          /* @__PURE__ */ jsxs("p", { className: "mb-4 text-xl md:text-4xl", children: [
            "€",
            getTotalAmount()
          ] }),
          /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => handleAmountReset(), children: "Change Amount" })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "w-1/2 h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700" }),
        /* @__PURE__ */ jsx("div", { className: "py-4 lg:px-8", children: /* @__PURE__ */ jsx(PaypalCheckoutButtons, { setSuccess: setIsSuccess, setErrorMessage: setError, onClick: handlePaymentContinued, cart: cartState, cartDescription: "Payment for PBS STEP" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full lg:max-w-2xl", children: error && /* @__PURE__ */ jsx("p", { className: "text-red-500", children: error }) })
    ] }),
    isSuccess && /* @__PURE__ */ jsx(PaymentSuccessComponent, {})
  ] }) }) });
}
const __vite_glob_0_41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Step
}, Symbol.toStringTag, { value: "Module" }));
const Ziggy = {
  url: "http://127.0.0.1:8000",
  port: 8e3,
  defaults: {},
  routes: {
    "ignition.healthCheck": {
      uri: "_ignition/health-check",
      methods: ["GET", "HEAD"]
    },
    "ignition.executeSolution": {
      uri: "_ignition/execute-solution",
      methods: ["POST"]
    },
    "ignition.updateConfig": {
      uri: "_ignition/update-config",
      methods: ["POST"]
    },
    contactus: { uri: "contactus", methods: ["GET", "HEAD"] },
    "contactus.store": { uri: "contactus", methods: ["POST"] },
    "request.group": { uri: "request/group", methods: ["GET", "HEAD"] },
    "request.group.store": { uri: "request/group", methods: ["POST"] },
    "request.individual": {
      uri: "request/individual",
      methods: ["GET", "HEAD"]
    },
    "request.individual.store": {
      uri: "request/individual",
      methods: ["POST"]
    },
    courses: { uri: "courses", methods: ["GET", "HEAD"] },
    "events.prizegivings": {
      uri: "events/prizegivings",
      methods: ["GET", "HEAD"]
    },
    "events.shed": { uri: "events/shed", methods: ["GET", "HEAD"] },
    "events.camp": { uri: "events/camp", methods: ["GET", "HEAD"] },
    "events.step": { uri: "events/step", methods: ["GET", "HEAD"] },
    "events.step.past": {
      uri: "events/step/past",
      methods: ["GET", "HEAD"]
    },
    "events.step.signup": {
      uri: "events/step/signup",
      methods: ["GET", "HEAD"]
    },
    "events.step.schedule": {
      uri: "events/step/schedule",
      methods: ["GET", "HEAD"]
    },
    about: { uri: "about", methods: ["GET", "HEAD"] },
    "assembly.index": { uri: "assembly", methods: ["GET", "HEAD"] },
    "assembly.show": { uri: "assembly/{series}", methods: ["GET", "HEAD"] },
    "assembly.image": {
      uri: "assembly/image/{imageId}",
      methods: ["GET", "HEAD"]
    },
    dashboard: { uri: "dashboard", methods: ["GET", "HEAD"] },
    "profile.edit": { uri: "profile", methods: ["GET", "HEAD"] },
    "profile.update": { uri: "profile", methods: ["PATCH"] },
    "profile.destroy": { uri: "profile", methods: ["DELETE"] },
    register: { uri: "register", methods: ["GET", "HEAD"] },
    login: { uri: "login", methods: ["GET", "HEAD"] },
    "password.request": {
      uri: "forgot-password",
      methods: ["GET", "HEAD"]
    },
    "password.email": { uri: "forgot-password", methods: ["POST"] },
    "password.reset": {
      uri: "reset-password/{token}",
      methods: ["GET", "HEAD"]
    },
    "password.store": { uri: "reset-password", methods: ["POST"] },
    "verification.notice": {
      uri: "verify-email",
      methods: ["GET", "HEAD"]
    },
    "verification.verify": {
      uri: "verify-email/{id}/{hash}",
      methods: ["GET", "HEAD"]
    },
    "verification.send": {
      uri: "email/verification-notification",
      methods: ["POST"]
    },
    "password.confirm": {
      uri: "confirm-password",
      methods: ["GET", "HEAD"]
    },
    "password.update": { uri: "password", methods: ["PUT"] },
    logout: { uri: "logout", methods: ["POST"] }
  }
};
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} | Postal Bible School`,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/About.tsx": __vite_glob_0_0, "./Pages/Assembly/Admin.tsx": __vite_glob_0_1, "./Pages/Assembly/Bonus/Admin.tsx": __vite_glob_0_2, "./Pages/Assembly/Bonus/Create.tsx": __vite_glob_0_3, "./Pages/Assembly/Bonus/Edit.tsx": __vite_glob_0_4, "./Pages/Assembly/Bonus/Index.tsx": __vite_glob_0_5, "./Pages/Assembly/Create.tsx": __vite_glob_0_6, "./Pages/Assembly/Edit.tsx": __vite_glob_0_7, "./Pages/Assembly/Index.tsx": __vite_glob_0_8, "./Pages/Assembly/Show.tsx": __vite_glob_0_9, "./Pages/Courses/Index.tsx": __vite_glob_0_10, "./Pages/Courses/LessonDownloadListSection.tsx": __vite_glob_0_11, "./Pages/Courses/LessonSelectorComponent.tsx": __vite_glob_0_12, "./Pages/Dashboard.tsx": __vite_glob_0_13, "./Pages/DesignSystem.tsx": __vite_glob_0_14, "./Pages/Events/Camp/CampSignup.tsx": __vite_glob_0_15, "./Pages/Events/Camp/Home.tsx": __vite_glob_0_16, "./Pages/Events/Camp/ReunionSignup.tsx": __vite_glob_0_17, "./Pages/Events/ITeam.tsx": __vite_glob_0_18, "./Pages/Events/Prizegivings.tsx": __vite_glob_0_19, "./Pages/Events/Settings.tsx": __vite_glob_0_20, "./Pages/Events/Shed.tsx": __vite_glob_0_21, "./Pages/Events/Step/Index.tsx": __vite_glob_0_22, "./Pages/Events/Step/Past/Admin.tsx": __vite_glob_0_23, "./Pages/Events/Step/Past/Create.tsx": __vite_glob_0_24, "./Pages/Events/Step/Past/Edit.tsx": __vite_glob_0_25, "./Pages/Events/Step/Past/Gallery.tsx": __vite_glob_0_26, "./Pages/Events/Step/Past/Show.tsx": __vite_glob_0_27, "./Pages/Events/Step/Signup.tsx": __vite_glob_0_28, "./Pages/Forms/ContactUs.tsx": __vite_glob_0_29, "./Pages/Forms/GroupRequest.tsx": __vite_glob_0_30, "./Pages/Forms/IndividualRequest.tsx": __vite_glob_0_31, "./Pages/Home.tsx": __vite_glob_0_32, "./Pages/LessonOrder/Create.tsx": __vite_glob_0_33, "./Pages/LessonOrder/Edit.tsx": __vite_glob_0_34, "./Pages/LessonOrder/Index.tsx": __vite_glob_0_35, "./Pages/LessonOrder/NotFound.tsx": __vite_glob_0_36, "./Pages/LessonOrder/Show.tsx": __vite_glob_0_37, "./Pages/NotFound.tsx": __vite_glob_0_38, "./Pages/Payment/Camp.tsx": __vite_glob_0_39, "./Pages/Payment/Index.tsx": __vite_glob_0_40, "./Pages/Payment/Step.tsx": __vite_glob_0_41 });
      return pages[`./Pages/${name}.tsx`];
    },
    setup: ({ App, props }) => {
      global.route = (name, params, absolute, config = Ziggy) => route$1(name, params, absolute, config);
      /* @__PURE__ */ jsx(App, { ...props });
    }
  })
);
