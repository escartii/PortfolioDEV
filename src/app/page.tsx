"use client";

import React, { useState, useEffect } from 'react';
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Home, Settings, Globe, User, Mail, Moon, Sun, Code, Briefcase, Award, Github, Linkedin, Twitter, Database, Cloud, Cpu, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";
import { Globe as GlobeComponent } from "@/components/magicui/globe";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Meteors } from "@/components/magicui/meteors";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

// Navigation helper function
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80; // Account for fixed header
    const top = element.offsetTop - offset;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
};

// Programming Tech Icons
const TechIcons = {
  react: () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#80deea" d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"></path><path fill="#80deea" d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"></path><path fill="#80deea" d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"></path><circle cx="24" cy="24" r="4" fill="#80deea"></circle>
</svg>
  ),
  javascript: () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#ffd600" d="M6,42V6h36v36H6z"></path><path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"></path>
</svg>
  ),
  Java: () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#F44336" d="M23.65,24.898c-0.998-1.609-1.722-2.943-2.725-5.455C19.229,15.2,31.24,11.366,26.37,3.999c2.111,5.089-7.577,8.235-8.477,12.473C17.07,20.37,23.645,24.898,23.65,24.898z"></path><path fill="#F44336" d="M23.878,17.27c-0.192,2.516,2.229,3.857,2.299,5.695c0.056,1.496-1.447,2.743-1.447,2.743s2.728-0.536,3.579-2.818c0.945-2.534-1.834-4.269-1.548-6.298c0.267-1.938,6.031-5.543,6.031-5.543S24.311,11.611,23.878,17.27z"></path><g><path fill="#1565C0" d="M32.084 25.055c1.754-.394 3.233.723 3.233 2.01 0 2.901-4.021 5.643-4.021 5.643s6.225-.742 6.225-5.505C37.521 24.053 34.464 23.266 32.084 25.055zM29.129 27.395c0 0 1.941-1.383 2.458-1.902-4.763 1.011-15.638 1.147-15.638.269 0-.809 3.507-1.638 3.507-1.638s-7.773-.112-7.773 2.181C11.683 28.695 21.858 28.866 29.129 27.395z"></path><path fill="#1565C0" d="M27.935,29.571c-4.509,1.499-12.814,1.02-10.354-0.993c-1.198,0-2.974,0.963-2.974,1.889c0,1.857,8.982,3.291,15.63,0.572L27.935,29.571z"></path><path fill="#1565C0" d="M18.686,32.739c-1.636,0-2.695,1.054-2.695,1.822c0,2.391,9.76,2.632,13.627,0.205l-2.458-1.632C24.271,34.404,17.014,34.579,18.686,32.739z"></path><path fill="#1565C0" d="M36.281,36.632c0-0.936-1.055-1.377-1.433-1.588c2.228,5.373-22.317,4.956-22.317,1.784c0-0.721,1.807-1.427,3.477-1.093l-1.42-0.839C11.26,34.374,9,35.837,9,37.017C9,42.52,36.281,42.255,36.281,36.632z"></path><path fill="#1565C0" d="M39,38.604c-4.146,4.095-14.659,5.587-25.231,3.057C24.341,46.164,38.95,43.628,39,38.604z"></path></g>
</svg>
  ),
  nodejs: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="#339933">
      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.276-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
    </svg>
  ),
  python: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="#3776AB">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
    </svg>
  ),
  bash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#ededed" fillRule="evenodd" d="M22.903,3.286c0.679-0.381,1.515-0.381,2.193,0 c3.355,1.883,13.451,7.551,16.807,9.434C42.582,13.1,43,13.804,43,14.566c0,3.766,0,15.101,0,18.867 c0,0.762-0.418,1.466-1.097,1.847c-3.355,1.883-13.451,7.551-16.807,9.434c-0.679,0.381-1.515,0.381-2.193,0 c-3.355-1.883-13.451-7.551-16.807-9.434C5.418,34.899,5,34.196,5,33.434c0-3.766,0-15.101,0-18.867 c0-0.762,0.418-1.466,1.097-1.847C9.451,10.837,19.549,5.169,22.903,3.286z" clipRule="evenodd"></path><path fill="#434345" d="M23.987,46.221c-1.085,0-2.171-0.252-3.165-0.757c-2.22-1.127-5.118-2.899-7.921-4.613 c-1.973-1.206-3.836-2.346-5.297-3.157C5.381,36.458,4,34.113,4,31.572V16.627c0-2.59,1.417-4.955,3.699-6.173 c3.733-1.989,9.717-5.234,12.878-7.01h0c2.11-1.184,4.733-1.184,6.844,0c3.576,2.007,10.369,6.064,14.252,8.513 C43.13,12.874,44,14.453,44,16.182V32c0,2.4-0.859,4.048-2.553,4.895c-0.944,0.531-2.628,1.576-4.578,2.787 c-3.032,1.882-6.806,4.225-9.564,5.705C26.27,45.942,25.128,46.221,23.987,46.221z M21.556,5.188 C18.384,6.97,12.382,10.226,8.64,12.22C7.012,13.088,6,14.776,6,16.627v14.945c0,1.814,0.987,3.49,2.576,4.373 c1.498,0.832,3.378,1.981,5.369,3.199c2.77,1.693,5.634,3.445,7.783,4.536c1.458,0.739,3.188,0.717,4.631-0.056 c2.703-1.451,6.447-3.775,9.456-5.643c1.97-1.223,3.671-2.279,4.696-2.854C41.835,34.464,42,33.109,42,32V16.182 c0-1.037-0.521-1.983-1.392-2.532c-3.862-2.435-10.613-6.467-14.165-8.461C24.913,4.331,23.086,4.331,21.556,5.188L21.556,5.188z"></path><path fill="#434345" d="M22.977,41.654l-0.057-13.438c-0.011-2.594,1.413-4.981,3.701-6.204l12.01-6.416 c1.998-1.068,4.414,0.38,4.414,2.646v14.73c0,1.041-0.54,2.008-1.426,2.554l-14.068,8.668 C25.557,45.424,22.987,43.996,22.977,41.654z"></path><path fill="#ededed" d="M28.799,26.274c0.123-0.063,0.225,0.014,0.227,0.176l0.013,1.32 c0.552-0.219,1.032-0.278,1.467-0.177c0.095,0.024,0.136,0.153,0.098,0.306l-0.291,1.169c-0.024,0.089-0.072,0.178-0.132,0.233 c-0.026,0.025-0.052,0.044-0.077,0.057c-0.04,0.02-0.078,0.026-0.114,0.019c-0.199-0.045-0.671-0.148-1.413,0.228 c-0.778,0.395-1.051,1.071-1.046,1.573c0.007,0.601,0.315,0.783,1.377,0.802c1.416,0.023,2.027,0.643,2.042,2.067 c0.016,1.402-0.733,2.905-1.876,3.826l0.025,1.308c0.001,0.157-0.1,0.338-0.225,0.4l-0.775,0.445 c-0.123,0.063-0.225-0.014-0.227-0.172l-0.013-1.286c-0.664,0.276-1.334,0.342-1.763,0.17c-0.082-0.032-0.117-0.152-0.084-0.288 l0.28-1.181c0.022-0.092,0.071-0.186,0.138-0.246c0.023-0.023,0.048-0.04,0.072-0.053c0.044-0.022,0.087-0.027,0.124-0.013 c0.462,0.155,1.053,0.082,1.622-0.206c0.722-0.365,1.206-1.102,1.198-1.834c-0.007-0.664-0.366-0.939-1.241-0.946 c-1.113,0.002-2.151-0.216-2.168-1.855c-0.014-1.35,0.688-2.753,1.799-3.641l-0.013-1.319c-0.001-0.162,0.098-0.34,0.225-0.405 L28.799,26.274z"></path><path fill="#4da925" d="M37.226,34.857l-3.704,2.185c-0.109,0.061-0.244-0.019-0.244-0.143v-1.252 c0-0.113,0.061-0.217,0.16-0.273l3.704-2.185c0.111-0.061,0.246,0.019,0.246,0.145v1.248 C37.388,34.697,37.326,34.801,37.226,34.857"></path>
</svg>
  ),
  docker: () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#2395ec" d="M47.527,19.847c-0.13-0.102-1.345-1.007-3.908-1.007c-0.677,0.003-1.352,0.06-2.019,0.171 c-0.496-3.354-3.219-4.93-3.345-5.003l-0.688-0.392l-0.453,0.644c-0.567,0.866-1.068,1.76-1.311,2.763 c-0.459,1.915-0.18,3.713,0.806,5.25C35.417,22.928,33.386,22.986,33,23H1.582c-0.826,0.001-1.496,0.66-1.501,1.474 c-0.037,2.733,0.353,5.553,1.306,8.119c1.089,2.818,2.71,4.894,4.818,6.164C8.567,40.184,12.405,41,16.756,41 c1.965,0.006,3.927-0.169,5.859-0.524c2.686-0.487,5.271-1.413,7.647-2.74c1.958-1.119,3.72-2.542,5.219-4.215 c2.505-2.798,3.997-5.913,5.107-8.682c0.149,0,0.298,0,0.442,0c2.743,0,4.429-1.083,5.359-1.99 c0.618-0.579,1.101-1.284,1.414-2.065L48,20.216L47.527,19.847z"></path><path fill="#2395ec" d="M8,22H5c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C9,21.552,8.552,22,8,22z"></path><path fill="#2395ec" d="M14,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C15,21.552,14.552,22,14,22z"></path><path fill="#2395ec" d="M20,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C21,21.552,20.552,22,20,22z"></path><path fill="#2395ec" d="M26,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C27,21.552,26.552,22,26,22z"></path><path fill="#2395ec" d="M14,16h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C15,15.552,14.552,16,14,16z"></path><path fill="#2395ec" d="M20,16h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C21,15.552,20.552,16,20,16z"></path><path fill="#2395ec" d="M26,16h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C27,15.552,26.552,16,26,16z"></path><path fill="#2395ec" d="M26,10h-3c-0.552,0-1-0.448-1-1V6c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C27,9.552,26.552,10,26,10z"></path><path fill="#2395ec" d="M32,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C33,21.552,32.552,22,32,22z"></path>
</svg>
  ),
  git: () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#F4511E" d="M42.2,22.1L25.9,5.8C25.4,5.3,24.7,5,24,5c0,0,0,0,0,0c-0.7,0-1.4,0.3-1.9,0.8l-3.5,3.5l4.1,4.1c0.4-0.2,0.8-0.3,1.3-0.3c1.7,0,3,1.3,3,3c0,0.5-0.1,0.9-0.3,1.3l4,4c0.4-0.2,0.8-0.3,1.3-0.3c1.7,0,3,1.3,3,3s-1.3,3-3,3c-1.7,0-3-1.3-3-3c0-0.5,0.1-0.9,0.3-1.3l-4-4c-0.1,0-0.2,0.1-0.3,0.1v10.4c1.2,0.4,2,1.5,2,2.8c0,1.7-1.3,3-3,3s-3-1.3-3-3c0-1.3,0.8-2.4,2-2.8V18.8c-1.2-0.4-2-1.5-2-2.8c0-0.5,0.1-0.9,0.3-1.3l-4.1-4.1L5.8,22.1C5.3,22.6,5,23.3,5,24c0,0.7,0.3,1.4,0.8,1.9l16.3,16.3c0,0,0,0,0,0c0.5,0.5,1.2,0.8,1.9,0.8s1.4-0.3,1.9-0.8l16.3-16.3c0.5-0.5,0.8-1.2,0.8-1.9C43,23.3,42.7,22.6,42.2,22.1z"></path>
</svg>
  ),
  openai: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="#412991">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
    </svg>
  ),
};

const projects = [
  { 
    name: "SaaS Dashboard", 
    tech: "React, Node.js, MongoDB",
    desc: "Complete dashboard with analytics, user management, and payment integration.",
    status: "Completado"
  },
  { 
    name: "E-commerce Platform", 
    tech: "Next.js, Stripe, PostgreSQL",
    desc: "Full-featured e-commerce solution with inventory management and order tracking.",
    status: "En desarrollo"
  },
  { 
    name: "AI Chat Bot", 
    tech: "Python, OpenAI, FastAPI",
    desc: "Intelligent chatbot with natural language processing and context awareness.",
    status: "Completado"
  },
  { 
    name: "Mobile App", 
    tech: "React Native, Firebase",
    desc: "Cross-platform mobile application with real-time synchronization.",
    status: "Completado"
  },
  { 
    name: "Web3 DApp", 
    tech: "Solidity, Web3.js, IPFS",
    desc: "Decentralized application with smart contracts and blockchain integration.",
    status: "En desarrollo"
  },
];

// Enhanced features for BentoGrid with Magic UI components
const features = [
  {
    Icon: Code,
    name: "Desarrollo Frontend",
    description: "Especializado en React, Next.js y las últimas tecnologías frontend con interfaces modernas e intuitivas.",
    href: "#",
    cta: "Ver proyectos",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        <Meteors number={20} />
        <div className="absolute bottom-4 right-4">
          <Code className="h-16 w-16 text-blue-500 opacity-20" />
        </div>
      </div>
    ),
  },
  {
    Icon: Briefcase,
    name: "Proyectos Exitosos",
    description: "Más de 50 proyectos completados con clientes satisfechos alrededor del mundo.",
    href: "#",
    cta: "Ver portfolio",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0">
        <div className="absolute top-4 right-4 flex items-center gap-4">
          <NumberTicker value={50} className="text-6xl font-bold text-green-500" />
          <div className="text-lg font-semibold text-green-500">Proyectos</div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: Globe,
    name: "Alcance Global",
    description: "Conectando usuarios de más de 30 países con soluciones tecnológicas innovadoras.",
    href: "#",
    cta: "Conocer más",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        <GlobeComponent className="absolute -right-10 -top-10 scale-75 opacity-30" />
      </div>
    ),
  },
  {
    Icon: Award,
    name: "Tecnologías Avanzadas",
    description: "Utilizando las últimas tecnologías: IA, Blockchain, Cloud Computing y más.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Ver skills",
    background: (
      <div className="absolute inset-0">
        <div className="absolute top-4 right-4 grid grid-cols-2 gap-2">
          <Database className="h-8 w-8 text-purple-500" />
          <Cloud className="h-8 w-8 text-blue-500" />
          <Shield className="h-8 w-8 text-green-500" />
          <Cpu className="h-8 w-8 text-orange-500" />
        </div>
      </div>
    ),
  },
];

function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}

function ProjectsMarquee() {
  return (
    <Marquee
      pauseOnHover
      className="absolute top-10 [--duration:25s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
    >
      {projects.map((project, idx) => (
        <figure
          key={idx}
          className={cn(
            "relative w-72 cursor-pointer overflow-hidden rounded-xl border p-6 mx-4",
            "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 shadow-lg",
            "transform-gpu transition-all duration-300 ease-out hover:scale-105",
          )}
        >
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <figcaption className="text-lg font-bold text-gray-900 dark:text-white">{project.name}</figcaption>
              <span className={cn(
                "text-xs px-2 py-1 rounded-full",
                project.status === "Completado" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-blue-100 text-blue-800"
              )}>{project.status}</span>
            </div>
            <p className="text-sm mb-3 text-blue-600 font-medium">{project.tech}</p>
            <blockquote className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{project.desc}</blockquote>
          </div>
        </figure>
      ))}
    </Marquee>
  );
}

interface CircleProps {
  className?: string;
  children?: React.ReactNode;
}

const Circle = React.forwardRef<HTMLDivElement, CircleProps>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        "dark:bg-gray-800 dark:border-gray-600 bg-white border-gray-200",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

function TechSkillsBeam() {
  const containerRef = React.useRef(null);
  const centerRef = React.useRef(null);
  const reactRef = React.useRef(null);
  const jsRef = React.useRef(null);
  const tsRef = React.useRef(null);
  const nodeRef = React.useRef(null);
  const pythonRef = React.useRef(null);
  const bashRef = React.useRef(null);
  const dockerRef = React.useRef(null);
  const gitRef = React.useRef(null);

  return (
    <div
      className="relative flex h-[400px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[350px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={reactRef}>
            <TechIcons.react />
          </Circle>
          <Circle ref={tsRef}>
            <TechIcons.Java />
          </Circle>
          <Circle ref={nodeRef}>
            <TechIcons.nodejs />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={jsRef}>
            <TechIcons.javascript />
          </Circle>
          <Circle ref={centerRef} className="size-20 bg-gradient-to-r from-blue-500 to-purple-600">
            <Code className="h-10 w-10 text-white" />
          </Circle>
          <Circle ref={pythonRef}>
            <TechIcons.python />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={bashRef}>
            <TechIcons.bash />
          </Circle>
          <Circle ref={dockerRef}>
            <TechIcons.docker />
          </Circle>
          <Circle ref={gitRef}>
            <TechIcons.git />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={reactRef}
        toRef={centerRef}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={jsRef}
        toRef={centerRef}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={bashRef}
        toRef={centerRef}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={tsRef}
        toRef={centerRef}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={pythonRef}
        toRef={centerRef}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={nodeRef}
        toRef={centerRef}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={dockerRef}
        toRef={centerRef}
        curvature={75}
        endYOffset={10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={gitRef}
        toRef={centerRef}
        reverse
      />
    </div>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false); // Cambiado a false para empezar en light mode

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-2xl">Cargando...</div>
      </div>
    );
  }

  const themeClasses = {
    bg: isDark ? "bg-black" : "bg-white",
    text: isDark ? "text-white" : "text-black",
    textMuted: isDark ? "text-gray-300" : "text-gray-600",
    textLight: isDark ? "text-gray-400" : "text-gray-500",
    border: isDark ? "border-gray-700" : "border-gray-200",
    dockBg: isDark ? "bg-black/80 backdrop-blur-md" : "bg-white/80 backdrop-blur-md",
    buttonBg: isDark ? "bg-white/10" : "bg-black/5",
    buttonHover: isDark ? "hover:bg-white/20" : "hover:bg-black/10",
    card: isDark ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200 shadow-lg",
  };

  return (
    <div className={cn("min-h-screen overflow-hidden transition-all duration-500 ease-out font-['Inter','system-ui',sans-serif]", themeClasses.bg, themeClasses.text)}>
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className={cn(
            "p-3 rounded-full transition-all duration-300 backdrop-blur-sm border",
            isDark ? "bg-gray-800/80 border-gray-700 hover:bg-gray-700/80" : "bg-white/80 border-gray-200 hover:bg-gray-50/80"
          )}
        >
          {isDark ? (
            <Sun className="h-6 w-6 text-yellow-500" />
          ) : (
            <Moon className="h-6 w-6 text-purple-600" />
          )}
        </button>
      </div>

      {/* Header con Dock */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <Dock className={cn("border", themeClasses.dockBg, themeClasses.border)}>
          <DockIcon>
            <button onClick={() => scrollToSection('hero')} className={cn("p-2 rounded-md transition-colors", themeClasses.buttonHover)}>
              <Home className={cn("h-6 w-6", themeClasses.text)} />
            </button>
          </DockIcon>
          <DockIcon>
            <button onClick={() => scrollToSection('about')} className={cn("p-2 rounded-md transition-colors", themeClasses.buttonHover)}>
              <User className={cn("h-6 w-6", themeClasses.text)} />
            </button>
          </DockIcon>
          <DockIcon>
            <button onClick={() => scrollToSection('projects')} className={cn("p-2 rounded-md transition-colors", themeClasses.buttonHover)}>
              <Code className={cn("h-6 w-6", themeClasses.text)} />
            </button>
          </DockIcon>
          <DockIcon>
            <button onClick={() => scrollToSection('contact')} className={cn("p-2 rounded-md transition-colors", themeClasses.buttonHover)}>
              <Mail className={cn("h-6 w-6", themeClasses.text)} />
            </button>
          </DockIcon>
          <DockIcon>
            <button onClick={() => scrollToSection('services')} className={cn("p-2 rounded-md transition-colors", themeClasses.buttonHover)}>
              <Settings className={cn("h-6 w-6", themeClasses.text)} />
            </button>
          </DockIcon>
        </Dock>
      </div>

      {/* Hero Section con Meteors */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Meteors number={40} />
        </div>
        <div className="relative z-10 text-center px-4">
          <BlurFade delay={0.25} inView>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
              <span className={themeClasses.text}>Álvaro</span>{" "}
              <AuroraText 
                colors={["#FF0080", "#7928CA", "#0070F3", "#38bdf8", "#10B981"]} 
                speed={1.5} 
                className="inline-block font-black"
              >
                Escartí
              </AuroraText>{" "}
              <span className="text-6xl">👋</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <div className="mb-8">
              <AnimatedShinyText className="text-2xl md:text-3xl font-bold tracking-tight">
                Desarrollador Full Stack • Innovador Digital
              </AnimatedShinyText>
            </div>
          </BlurFade>
          <BlurFade delay={0.75} inView>
            <p className={cn("text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium", themeClasses.textMuted)}>
              Creando experiencias digitales excepcionales con tecnología de vanguardia. 
              Especializado en soluciones SaaS innovadoras y arquitectura de software escalable.
            </p>
          </BlurFade>
          <BlurFade delay={1} inView>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('projects')}
                className={cn(
                  "px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105",
                  isDark ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                )}
              >
                Ver Proyectos
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={cn(
                  "px-8 py-4 border rounded-full transition-all duration-300 text-lg font-medium hover:scale-105",
                  isDark ? "border-white/20 hover:bg-white/10" : "border-black/20 hover:bg-black/5"
                )}
              >
                Contactar
              </button>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <BlurFade delay={0.25} inView>
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                Sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-black">mí</span>
              </h2>
              <BlurFade delay={0.5} inView>
                <p className={cn("text-lg leading-relaxed mb-6 font-medium", themeClasses.textMuted)}>
                  Soy un desarrollador apasionado por crear soluciones tecnológicas innovadoras. 
                  Con más de 5 años de experiencia, me especializo en desarrollo full-stack, 
                  arquitectura de software y transformación digital.
                </p>
              </BlurFade>
              <BlurFade delay={0.75} inView>
                <p className={cn("text-lg leading-relaxed font-medium", themeClasses.textMuted)}>
                  Mi objetivo es construir productos que no solo cumplan con los requisitos técnicos, 
                  sino que también brinden experiencias excepcionales a los usuarios y generen 
                  un impacto positivo en el mundo.
                </p>
              </BlurFade>
            </div>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <div className={cn(
              "p-6 rounded-lg border backdrop-blur-sm",
              isDark ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-white/50 shadow-lg"
            )}>
              <h3 className="text-xl font-bold mb-6 text-center">Habilidades Técnicas</h3>
              <TechSkillsBeam />
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Velocity Scroll Section */}
      <section className={cn("py-20 border-y", themeClasses.border)}>
        <div className="overflow-hidden">
          <VelocityScroll className={cn(
            "text-4xl md:text-6xl font-bold",
            isDark ? "text-white/10" : "text-black/10"
          )}>
            DESARROLLO • INNOVACIÓN • DISEÑO • TECNOLOGÍA • FUTURO •
          </VelocityScroll>
        </div>
      </section>

      {/* Experience Stats - Elegant Animation Design */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <BlurFade delay={0.25} inView>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-none">
                Impacto en <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Números</span>
              </h2>
              <p className={cn(
                "text-lg md:text-xl max-w-3xl mx-auto font-medium",
                themeClasses.textMuted
              )}>
                Resultado de años de dedicación, pasión y compromiso con la excelencia
              </p>
            </div>
          </BlurFade>
          
          {/* Main Stats Display */}
          <div className="text-center mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <BlurFade delay={0.3} inView>
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <NumberTicker 
                      value={50} 
                      className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent"
                    />
                    <span className="text-4xl md:text-5xl font-black text-blue-500 ml-1">+</span>
                  </div>
                  <p className="text-xl font-bold">Proyectos</p>
                  <p className={cn("text-sm", themeClasses.textMuted)}>Completados</p>
                  <div className="w-full h-1 bg-blue-500/20 rounded-full mt-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform -translate-x-full animate-[slideIn_2s_ease-out_forwards]" 
                         style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              </BlurFade>
              
              <BlurFade delay={0.4} inView>
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <NumberTicker 
                      value={12} 
                      className="text-6xl md:text-7xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent"
                    />
                    <span className="text-4xl md:text-5xl font-black text-green-500 ml-1">+</span>
                  </div>
                  <p className="text-xl font-bold">Tecnologías</p>
                  <p className={cn("text-sm", themeClasses.textMuted)}>Dominadas</p>
                  <div className="w-full h-1 bg-green-500/20 rounded-full mt-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transform -translate-x-full animate-[slideIn_2s_ease-out_forwards]" 
                         style={{ animationDelay: '0.7s' }} />
                  </div>
                </div>
              </BlurFade>
              
              <BlurFade delay={0.5} inView>
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <NumberTicker 
                      value={100} 
                      className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent"
                    />
                    <span className="text-4xl md:text-5xl font-black text-purple-500 ml-1">%</span>
                  </div>
                  <p className="text-xl font-bold">Satisfacción</p>
                  <p className={cn("text-sm", themeClasses.textMuted)}>Cliente</p>
                  <div className="w-full h-1 bg-purple-500/20 rounded-full mt-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transform -translate-x-full animate-[slideIn_2s_ease-out_forwards]" 
                         style={{ animationDelay: '0.9s' }} />
                  </div>
                </div>
              </BlurFade>
              
              <BlurFade delay={0.6} inView>
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <NumberTicker 
                      value={30} 
                      className="text-6xl md:text-7xl font-black bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
                    />
                    <span className="text-4xl md:text-5xl font-black text-orange-500 ml-1">+</span>
                  </div>
                  <p className="text-xl font-bold">Países</p>
                  <p className={cn("text-sm", themeClasses.textMuted)}>Alcance Global</p>
                  <div className="w-full h-1 bg-orange-500/20 rounded-full mt-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full transform -translate-x-full animate-[slideIn_2s_ease-out_forwards]" 
                         style={{ animationDelay: '1.1s' }} />
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
          
          {/* Animated Timeline */}
          <BlurFade delay={0.8} inView>
            <div className="relative">
              <div className="flex justify-center items-center">
                <div className="flex items-center space-x-4 md:space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-sm font-medium">2019 - Inicio</span>
                  </div>
                  <div className="w-16 md:w-24 h-px bg-gradient-to-r from-blue-500 to-green-500"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span className="text-sm font-medium">2021 - Expansión</span>
                  </div>
                  <div className="w-16 md:w-24 h-px bg-gradient-to-r from-green-500 to-purple-500"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span className="text-sm font-medium">2023 - Innovación</span>
                  </div>
                  <div className="w-16 md:w-24 h-px bg-gradient-to-r from-purple-500 to-orange-500"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    <span className="text-sm font-medium">2025 - Presente</span>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
        
        <style jsx>{`
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
        `}</style>
      </section>

      {/* Features Grid using BentoDemo */}
      <section id="services" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <BlurFade delay={0.25} inView>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Mis <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Servicios</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <p className={cn("text-lg max-w-3xl mx-auto font-medium", themeClasses.textLight)}>
              Ofrezco soluciones completas para llevar tu idea desde el concepto hasta la realidad, 
              utilizando las mejores prácticas y tecnologías de vanguardia 🚀
            </p>
          </BlurFade>
        </div>
        <BentoDemo />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <BlurFade delay={0.25} inView>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Proyectos <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Destacados</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <p className={cn("text-lg mb-12 max-w-3xl mx-auto font-medium", themeClasses.textLight)}>
              Una selección de mis proyectos más recientes y exitosos, desde aplicaciones web 
              hasta soluciones de inteligencia artificial ✨
            </p>
          </BlurFade>
          <div className="relative h-80 overflow-hidden">
            <ProjectsMarquee />
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <BlurFade delay={0.25} inView>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Lo que dicen <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">mis clientes</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <p className={cn("text-lg mb-12 max-w-3xl mx-auto font-medium", themeClasses.textLight)}>
              Testimonios reales de clientes satisfechos que confían en mi trabajo 
              para sus proyectos más importantes 🌟
            </p>
          </BlurFade>
          <BlurFade delay={0.75} inView>
            <div className="flex justify-center">
              <div className={cn(
                "max-w-lg w-full rounded-xl border p-6 transition-all duration-300 hover:scale-105",
                isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200 shadow-lg"
              )}>
                {/* Tweet Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">CM</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Carlos Mendez</h4>
                      <p className={cn("text-sm", themeClasses.textMuted)}>@carlosmendez_dev</p>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                
                {/* Tweet Content */}
                <div className="mb-4">
                  <p className={cn("text-base leading-relaxed", themeClasses.text)}>
                    Álvaro transformó completamente nuestra plataforma. Su expertise en React y su atención al detalle son excepcionales. 
                    <span className="text-cyan-500">#DesarrolloWeb #React #Portfolio</span>
                  </p>
                </div>
                
                {/* Tweet Metadata */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>2:47 PM • Nov 15, 2024</span>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6V4h6v2H9zm0 0h6v12H9V6z" />
                      </svg>
                      <span>24</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>156</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Social Links */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">Conecta Conmigo</h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <div className="flex justify-center gap-6">
              <a 
                href="https://github.com/escartii" 
                target="_blank" 
                rel="noopener noreferrer"
                className={cn(
                  "p-4 rounded-full transition-all duration-300 hover:scale-110 border inline-block",
                  themeClasses.card
                )}
              >
                <Github className="h-8 w-8" />
              </a>
              <a 
                href="https://www.linkedin.com/in/%C3%A1lvaro-escart%C3%AD-lamolda-91a652277/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={cn(
                  "p-4 rounded-full transition-all duration-300 hover:scale-110 border inline-block",
                  themeClasses.card
                )}
              >
                <Linkedin className="h-8 w-8" />
              </a>
              <a 
                href="https://x.com/escartii" 
                target="_blank" 
                rel="noopener noreferrer"
                className={cn(
                  "p-4 rounded-full transition-all duration-300 hover:scale-110 border inline-block",
                  themeClasses.card
                )}
              >
                <Twitter className="h-8 w-8" />
              </a>
              <a 
                href="mailto:alvaro@escartii.com" 
                className={cn(
                  "p-4 rounded-full transition-all duration-300 hover:scale-110 border inline-block",
                  themeClasses.card
                )}
              >
                <Mail className="h-8 w-8" />
              </a>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* CTA Final */}
      <section className={cn(
        "py-20 px-4 relative",
        isDark ? "bg-gradient-to-t from-blue-900/20 to-transparent" : "bg-gradient-to-t from-blue-50 to-transparent"
      )}>
        <div className="max-w-4xl mx-auto text-center">
          <BlurFade delay={0.25} inView>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              ¿Listo para <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">Colaborar</span>?
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <p className={cn("text-lg mb-12 max-w-3xl mx-auto font-medium", themeClasses.textLight)}>
              Convirtamos tu visión en realidad. Contacta conmigo para discutir tu próximo proyecto 
              y descubrir cómo podemos hacer algo increíble juntos 💡
            </p>
          </BlurFade>
          <BlurFade delay={0.75} inView>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('contact')}
                className={cn(
                  "px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105",
                  isDark ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                )}
              >
                Iniciar Proyecto
              </button>
              <a 
                href="/cv-alvaro-escarti.pdf" 
                download="CV-Alvaro-Escarti.pdf"
                className={cn(
                  "px-8 py-4 rounded-full font-semibold transition-all duration-300 text-lg hover:scale-105 inline-block text-center",
                  isDark ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                )}
              >
                Descargar CV
              </a>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Footer */}
      <footer className={cn("py-12 px-4 border-t", themeClasses.border)}>
        <div className="max-w-4xl mx-auto text-center">
          <p className={themeClasses.textLight}>
            © 2025 Álvaro Escartí. Construyendo el futuro, una línea de código a la vez.
          </p>
        </div>
      </footer>
    </div>
  );
}