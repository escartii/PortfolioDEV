"use client";

import React, { useState, useEffect } from 'react';
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { Home, Calendar, QrCode, ShoppingBag, Users, Code, Shield, CheckCircle, Activity, Phone, CreditCard, ArrowRight, Languages, Database, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Globe as GlobeComponent } from "@/components/magicui/globe";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Meteors } from "@/components/magicui/meteors";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { LayoutGroup, motion } from "motion/react";
import { TextRotate } from "@/components/ui/text-rotate";
import { AnimatedList } from "@/components/magicui/animated-list";

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

// Pricing Plans
const pricingPlans = [
  {
    name: "Starter",
    price: "49",
    billing: "mensual",
    desc: "Perfecto para clubs pequeños con hasta 3 pistas",
    features: [
      "Hasta 3 pistas de pádel",
      "Reservas ilimitadas",
      "Calendario básico",
      "Análisis básico de ocupación",
      "Soporte por email"
    ],
    cta: "Comenzar prueba gratis",
    popular: false
  },
  {
    name: "Premium",
    price: "99",
    billing: "mensual",
    desc: "Ideal para clubs medianos con mayor afluencia",
    features: [
      "Hasta 10 pistas de pádel",
      "Reservas ilimitadas",
      "Calendario avanzado",
      "Análisis detallado",
      "Integración con pagos",
      "Soporte prioritario",
      "Sistema de torneos"
    ],
    cta: "Probar 14 días gratis",
    popular: true
  },
  {
    name: "Enterprise",
    price: "199",
    billing: "mensual",
    desc: "Para grandes clubs y cadenas con múltiples sedes",
    features: [
      "Pistas ilimitadas",
      "Multi-sede",
      "Sistema de torneos avanzado",
      "API personalizada",
      "Panel de administración avanzado",
      "Soporte 24/7",
      "App personalizada"
    ],
    cta: "Contactar ventas",
    popular: false
  },
];

// Testimonials
const testimonials = [
  {
    name: "Carlos Martínez",
    handle: "@padelclubmalaga",
    text: "PadelBook ha revolucionado la gestión de nuestro club. Los usuarios pueden reservar a cualquier hora del día y nosotros tenemos toda la información organizada. ¡La ocupación ha aumentado un 30%! #Pádel #Innovación",
    avatarInitials: "CM",
    likes: 124,
    retweets: 36,
    date: "10:23 AM • Mar 12, 2024"
  },
  {
    name: "Laura Sánchez",
    handle: "@worldpadel",
    text: "Desde que implementamos PadelBook, las quejas por dobles reservas han desaparecido. El sistema de pagos online nos ha facilitado enormemente la gestión y los jugadores están encantados con la app. #GestiónDeportiva #Tecnología",
    avatarInitials: "LS",
    likes: 98,
    retweets: 24,
    date: "2:47 PM • Abr 3, 2024"
  },
  {
    name: "Miguel Ángel",
    handle: "@padelcenter",
    text: "Como propietario de 4 centros de pádel, PadelBook Enterprise ha simplificado nuestra gestión. El sistema multi-sede nos permite controlar todo desde un único panel y los informes son fundamentales para nuestras decisiones. Inversión que vale cada euro.",
    avatarInitials: "MA",
    likes: 203,
    retweets: 59,
    date: "4:36 PM • Feb 18, 2024"
  },
];

// Features for BentoGrid
// Implementación de notificaciones para el BentoGrid
// Primero definimos el componente Notification
interface NotificationProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  time: string;
}

const Notification = ({ name, description, icon, color, time }: NotificationProps) => {
  return (
    <figure className={cn(
      "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
      // animation styles
      "transition-all duration-200 ease-in-out hover:scale-[103%]",
      // light styles
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
    )}>
      <div className="flex flex-row items-center gap-3">
        <div 
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

// Estilos CSS para animaciones (con mejor optimización)
const styles = `
@keyframes rise {
  0% { transform: scaleY(0); transform-origin: bottom; }
  100% { transform: scaleY(1); transform-origin: bottom; }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes grow-in {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

@keyframes pulse-subtle {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
}

@keyframes appear {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-rise {
  animation: rise 1.5s ease-out forwards;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animate-grow-in {
  animation: grow-in 0.8s ease-out forwards;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s ease-in-out infinite;
}

.animate-appear {
  animation: appear 0.5s ease-out forwards;
}
`;

// Componente de calendario de reservas
const CalendarDisplay = () => {
  return (
    <div className="absolute inset-0 p-4 flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Fondo degradado sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/5 to-[#34D399]/5 rounded-xl"></div>
        
        {/* Calendario */}
        <div className="absolute inset-0 m-4 bg-white rounded-lg shadow-md border border-gray-100 flex flex-col overflow-hidden">
          {/* Header del calendario */}
          <div className="px-3 py-2 bg-[#10B981] text-white flex justify-between items-center">
            <div className="text-sm font-medium">Mayo 2025</div>
            <div className="flex space-x-2">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="w-3 h-3 transform rotate-180" />
              </div>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
          
          {/* Días de la semana */}
          <div className="grid grid-cols-7 text-center text-xs text-gray-500 bg-gray-50 py-1">
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, i) => (
              <div key={i}>{day}</div>
            ))}
          </div>
          
          {/* Días del mes */}
          <div className="grid grid-cols-7 flex-1 gap-1 p-2 text-xs">
            {Array.from({ length: 35 }).map((_, i) => {
              const dayNum = i - 3; // Empezar desde -3 para que el día 1 caiga en jueves
              const isCurrentMonth = dayNum > 0 && dayNum <= 31;
              const isToday = dayNum === 14;
              const isBooked = [4, 10, 15, 18, 22, 25, 28].includes(dayNum);
              const isPartiallyBooked = [2, 7, 12, 19, 24, 30].includes(dayNum);
              
              return (
                <div 
                  key={i} 
                  className={`rounded flex flex-col items-center p-1 ${
                    isCurrentMonth ? 'bg-white' : 'opacity-30 bg-gray-50'
                  } ${isToday ? 'border-2 border-[#10B981]' : 'border border-gray-100'}`}
                >
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
                    isToday ? 'bg-[#10B981] text-white font-bold' : ''
                  }`}>
                    {isCurrentMonth ? dayNum : (dayNum <= 0 ? 31 + dayNum : dayNum - 31)}
                  </div>
                  {isCurrentMonth && (
                    <div className="w-full mt-1 flex justify-center">
                      <div className={`h-1 rounded-full ${
                        isBooked ? 'w-full bg-red-400' : 
                        isPartiallyBooked ? 'w-1/2 bg-yellow-400' : 'w-full bg-[#34D399]'
                      }`}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Leyenda */}
          <div className="px-3 py-1 flex justify-end space-x-3 border-t border-gray-100 text-[9px] text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-[#34D399] rounded-full mr-1"></div>
              <span>Disponible</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></div>
              <span>Parcial</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-1"></div>
              <span>Completo</span>
            </div>
          </div>
        </div>
        
        {/* Notificación flotante */}
        <div className="absolute bottom-6 right-6 px-2 py-1 bg-white text-[#10B981] shadow-md rounded-lg text-xs font-medium animate-pulse-subtle">
          ¡Pista 3 reservada!
        </div>
      </div>
    </div>
  );
};

// NUEVO: Análisis Avanzado completamente rediseñado
const ModernAnalytics = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{styles}</style>
      
      {/* Fondo sutil con gradientes */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
      <div className="absolute -right-10 top-10 w-40 h-40 bg-[#10B981]/5 rounded-full blur-xl"></div>
      
      {/* Panel principal */}
      <div className="absolute inset-4 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
            <span className="text-xs font-semibold text-gray-700">Ocupación en tiempo real</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Contenido */}
        <div className="flex-1 grid grid-cols-2 gap-2 p-3">
          {/* KPI Cards */}
          <div className="col-span-2 grid grid-cols-3 gap-2">
            {[
              { label: "Reservas", value: "438", percent: "+24%", color: "#10B981" },
              { label: "Usuarios", value: "215", percent: "+12%", color: "#4C9EFF" },
              { label: "Ocupación", value: "76%", percent: "+8%", color: "#10B981" }
            ].map((kpi, idx) => (
              <div key={idx} className="bg-gray-50 p-2 rounded-lg border border-gray-100">
                <div className="text-xs text-gray-500 mb-1">{kpi.label}</div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">{kpi.value}</span>
                  <span className="text-xs font-medium px-1 py-0.5 rounded-sm" style={{ 
                    backgroundColor: `${kpi.color}20`,
                    color: kpi.color
                  }}>
                    {kpi.percent}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gráfico de barras */}
          <div className="bg-gray-50 rounded-lg border border-gray-100 p-2 flex flex-col">
            <div className="text-xs text-gray-500 mb-2">Reservas por día</div>
            <div className="flex-1 flex items-end space-x-1 pb-1">
              {[40, 65, 50, 90, 75, 60].map((height, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full rounded-t-sm animate-rise bg-gradient-to-t from-[#10B981] to-[#34D399]" 
                    style={{ 
                      height: `${height}%`,
                      animationDelay: `${idx * 100}ms`
                    }}
                  ></div>
                  <span className="text-[8px] mt-1 text-gray-400 font-medium">
                    {['L', 'M', 'X', 'J', 'V', 'S'][idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gráfico circular */}
          <div className="bg-gray-50 rounded-lg border border-gray-100 p-2 flex flex-col">
            <div className="text-xs text-gray-500 mb-1">Distribución por horas</div>
            <div className="flex-1 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {[
                  { name: "Mañana", value: 35, color: "#10B981" },
                  { name: "Tarde", value: 45, color: "#4C9EFF" },
                  { name: "Noche", value: 20, color: "#8B5CF6" }
                ].map((category, i) => {
                  const total = 100;
                  const startAngle = i === 0 ? 0 : [35, 80].slice(0, i).reduce((a, b) => a + b, 0) * 3.6;
                  const endAngle = startAngle + category.value * 3.6;
                  
                  const startRad = (startAngle - 90) * Math.PI / 180;
                  const endRad = (endAngle - 90) * Math.PI / 180;
                  
                  const x1 = 50 + 30 * Math.cos(startRad);
                  const y1 = 50 + 30 * Math.sin(startRad);
                  const x2 = 50 + 30 * Math.cos(endRad);
                  const y2 = 50 + 30 * Math.sin(endRad);
                  
                  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                  
                  return (
                    <path 
                      key={i}
                      d={`M 50,50 L ${x1},${y1} A 30,30 0 ${largeArcFlag},1 ${x2},${y2} Z`}
                      fill={category.color}
                      className="animate-grow-in"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  );
                })}
                <circle cx="50" cy="50" r="15" fill="white" />
                <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="bold" fill="#333">
                  100%
                </text>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Footer con etiquetas */}
        <div className="p-2 flex justify-center space-x-2">
          {[
            { color: "#10B981", label: "Mañana" },
            { color: "#4C9EFF", label: "Tarde" },
            { color: "#8B5CF6", label: "Noche" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-[8px] text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente de app móvil
const AppMockup = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Elementos de decoración */}
      <div className="absolute top-5 left-5 w-16 h-16 bg-[#10B981]/5 rounded-full blur-lg"></div>
      <div className="absolute bottom-5 right-5 w-20 h-20 bg-[#10B981]/5 rounded-full blur-lg"></div>
      
      {/* Dispositivo móvil */}
      <div className="w-48 h-96 rounded-3xl bg-gray-800 p-1 shadow-xl overflow-hidden relative">
        {/* Pantalla */}
        <div className="w-full h-full rounded-2xl bg-white overflow-hidden flex flex-col">
          {/* Barra de estado */}
          <div className="h-6 bg-gradient-to-r from-[#10B981] to-[#34D399] flex items-center justify-between px-3">
            <div className="w-10 h-1.5 bg-white/40 rounded-full"></div>
            <div className="flex space-x-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
              ))}
            </div>
          </div>
          
          {/* Contenido de pistas */}
          <div className="flex-1 p-3 flex flex-col space-y-3">
            {/* Fecha */}
            <div className="text-xs font-medium text-center py-1 bg-gray-50 rounded-full">
              Hoy, 19 de Mayo
            </div>
            
            {/* Pistas disponibles */}
            {["Pista 1", "Pista 2", "Pista 3", "Pista 4", "Pista 5"].map((pista, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50 rounded-lg p-2 flex flex-col shadow-sm animate-appear"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="flex justify-between mb-1">
                  <div className="text-xs font-bold">{pista}</div>
                  <div className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    idx === 2 ? 'bg-red-100 text-red-600' : 'bg-[#10B981]/10 text-[#10B981]'
                  }`}>
                    {idx === 2 ? 'Ocupada' : 'Disponible'}
                  </div>
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 h-4 rounded-sm text-[8px] flex items-center justify-center ${
                        idx === 2 ? 'bg-red-200 text-red-700' :
                        (i === 3 || i === 4) ? 'bg-[#10B981] text-white' : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {i + 14}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Barra de navegación */}
          <div className="h-12 border-t border-gray-100 flex justify-around items-center px-4">
            {[
              { icon: "◼", active: false },
              { icon: "◆", active: true },
              { icon: "○", active: false }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`w-8 h-8 flex items-center justify-center rounded-full 
                ${item.active ? 'bg-[#10B981]/10 text-[#10B981]' : 'text-gray-400'}`}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
        
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-2xl"></div>
      </div>
      
      {/* Panel de confirmación flotante */}
      <div className="absolute bottom-8 inset-x-8 bg-white shadow-lg rounded-xl p-3 border border-[#10B981]/10">
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs font-semibold text-[#10B981]">Confirmar reserva</div>
          <div className="flex space-x-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-[#10B981]' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[10px] text-gray-500">Pista 4 • 17:00 - 18:30</div>
          <div className="bg-[#10B981] text-white text-[10px] px-2 py-1 rounded-md font-medium">
            Reservar
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de pagos y torneos
const TournamentsDisplay = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{styles}</style>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
      
      {/* Elementos de fondo */}
      <div className="absolute top-5 right-10 w-20 h-20 bg-[#10B981]/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-[#10B981]/5 rounded-full blur-lg"></div>
      
      {/* Panel principal */}
      <div className="absolute inset-4 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden flex flex-col">
        {/* Header - Torneo */}
        <div className="px-4 py-3 bg-[#10B981] text-white">
          <div className="text-xs uppercase tracking-wider mb-1">Próximo torneo</div>
          <div className="flex justify-between">
            <div className="font-bold">Campeonato de Primavera</div>
            <div className="text-sm">24-26 Mayo</div>
          </div>
        </div>
        
        {/* Contenido - Árbol del torneo */}
        <div className="flex-1 p-3 overflow-auto">
          <div className="h-full w-full flex items-center justify-center">
            {/* Estructura del torneo */}
            <div className="relative w-full max-w-sm">
              {/* Final */}
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-16 h-14 border-2 border-[#10B981] rounded bg-[#10B981]/5 flex items-center justify-center">
                <div className="text-[10px] text-center">
                  <div className="font-bold">Final</div>
                  <div className="text-[8px] text-gray-600">26 Mayo</div>
                </div>
              </div>
              
              {/* Semifinales */}
              <div className="absolute top-1/4 right-24 transform -translate-y-1/2 w-16 h-12 border border-gray-300 rounded bg-gray-50 flex items-center justify-center">
                <div className="text-[10px] text-center">
                  <div>Semi 1</div>
                  <div className="text-[8px] text-gray-600">25 Mayo</div>
                </div>
              </div>
              <div className="absolute top-3/4 right-24 transform -translate-y-1/2 w-16 h-12 border border-gray-300 rounded bg-gray-50 flex items-center justify-center">
                <div className="text-[10px] text-center">
                  <div>Semi 2</div>
                  <div className="text-[8px] text-gray-600">25 Mayo</div>
                </div>
              </div>
              
              {/* Cuartos */}
              <div className="absolute top-1/8 right-48 transform -translate-y-1/2 w-14 h-8 border border-gray-200 rounded bg-gray-50/80 flex items-center justify-center">
                <div className="text-[8px]">Cuartos 1</div>
              </div>
              <div className="absolute top-3/8 right-48 transform -translate-y-1/2 w-14 h-8 border border-gray-200 rounded bg-gray-50/80 flex items-center justify-center">
                <div className="text-[8px]">Cuartos 2</div>
              </div>
              <div className="absolute top-5/8 right-48 transform -translate-y-1/2 w-14 h-8 border border-gray-200 rounded bg-gray-50/80 flex items-center justify-center">
                <div className="text-[8px]">Cuartos 3</div>
              </div>
              <div className="absolute top-7/8 right-48 transform -translate-y-1/2 w-14 h-8 border border-gray-200 rounded bg-gray-50/80 flex items-center justify-center">
                <div className="text-[8px]">Cuartos 4</div>
              </div>
              
              {/* Líneas de conexión */}
              {/* Líneas horizontales */}
              <div className="absolute top-1/4 right-16 transform -translate-y-1/2 h-0.5 w-8 bg-gray-300"></div>
              <div className="absolute top-3/4 right-16 transform -translate-y-1/2 h-0.5 w-8 bg-gray-300"></div>
              <div className="absolute top-1/8 right-34 transform -translate-y-1/2 h-0.5 w-6 bg-gray-200"></div>
              <div className="absolute top-3/8 right-34 transform -translate-y-1/2 h-0.5 w-6 bg-gray-200"></div>
              <div className="absolute top-5/8 right-34 transform -translate-y-1/2 h-0.5 w-6 bg-gray-200"></div>
              <div className="absolute top-7/8 right-34 transform -translate-y-1/2 h-0.5 w-6 bg-gray-200"></div>
              
              {/* Líneas verticales */}
              <div className="absolute top-1/4 right-24 h-[50%] w-0.5 bg-gray-300"></div>
              <div className="absolute top-1/8 right-48 h-[25%] w-0.5 bg-gray-200"></div>
              <div className="absolute top-5/8 right-48 h-[25%] w-0.5 bg-gray-200"></div>
            </div>
          </div>
        </div>
        
        {/* Footer - Inscripción */}
        <div className="p-3 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[10px] text-gray-500">Precio de inscripción</div>
              <div className="font-bold text-sm">25€ por pareja</div>
            </div>
            <button className="px-3 py-1.5 bg-[#10B981] text-white text-xs font-medium rounded-lg">
              Inscribirme
            </button>
          </div>
        </div>
      </div>
      
      {/* Notificación flotante */}
      <div className="absolute top-12 left-8 px-3 py-2 bg-white shadow-md rounded-lg flex items-center space-x-2 border-l-4 border-[#10B981] animate-float">
        <div className="w-6 h-6 rounded-full bg-[#10B981]/10 flex items-center justify-center">
          <Trophy className="w-3 h-3 text-[#10B981]" />
        </div>
        <div className="text-xs">
          <div className="font-medium">¡Inscripción confirmada!</div>
          <div className="text-gray-500 text-[10px]">Te esperamos el viernes</div>
        </div>
      </div>
    </div>
  );
};

// Definición de tipo para las características
interface Feature {
  name: string;
  description: string;
  background: React.ReactNode;
  cta?: string;
  href?: string;
  className?: string;
}

// Componente de tarjeta personalizado (para evitar problemas de tipos)
const CustomFeatureCard = ({ feature, index }: { feature: Feature, index: number }) => {
  const { name, description, background, cta = "", href = "#", className = "" } = feature;
  
  return (
    <div key={index} className={`relative rounded-xl overflow-hidden ${className}`}>
      {background}
      <div className="relative z-10 p-6 h-full flex flex-col">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="mb-4 text-gray-700">{description}</p>
        {cta && (
          <div className="mt-auto">
            <a 
              href={href} 
              className="inline-flex items-center text-sm font-medium text-[#10B981]"
            >
              {cta}
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

// Features para el grid mejorado con mejor distribución
const featureItems = [
  {
    name: "Reservas simplificadas",
    description: "Sistema intuitivo de reserva de pistas que permite a los usuarios ver disponibilidad en tiempo real y hacer reservas en segundos.",
    href: "#",
    cta: "Ver demo",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        <style>{styles}</style>
        {/* Meteoros sutiles en el fondo */}
        <Meteors number={10} />
        
        {/* Gradiente de fondo más suave */}
        <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-[#10B981]/5 blur-xl"></div>
        
        {/* Calendario de reservas */}
        <CalendarDisplay />
        
        {/* Decoración sutil adicional */}
        <div className="absolute bottom-8 left-4 w-10 h-10 rounded-full bg-[#10B981]/5 animate-pulse-subtle"></div>
      </div>
    ),
  },
  {
    name: "Gestión de torneos",
    description: "Organiza competiciones con facilidad. Gestiona inscripciones, emparejamientos y resultados para mantener a tus jugadores comprometidos.",
    href: "#",
    cta: "Explorar",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        <style>{styles}</style>
        <div className="absolute top-0 left-0 w-full h-full">
          <TournamentsDisplay />
        </div>
      </div>
    ),
  },
  {
    name: "Análisis Avanzado",
    description: "Obtén datos detallados sobre la ocupación de tus pistas, preferencias de los usuarios y tendencias para optimizar tu negocio.",
    href: "#",
    cta: "Ver analytics",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        <style>{styles}</style>
        {/* Análisis Avanzado completamente rediseñado */}
        <ModernAnalytics />
      </div>
    ),
  },
  {
    name: "App para jugadores",
    description: "Ofrece a tus clientes una experiencia premium con una app móvil intuitiva para reservas, pagos y notificaciones.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Ver funciones",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        <style>{styles}</style>
        
        {/* Teléfono móvil rediseñado */}
        <AppMockup />
      </div>
    ),
  },
];

// Componente para simular una pista de pádel (icono)
const PadelCourtIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="1" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="7" y1="7" x2="7" y2="17" strokeDasharray="1 3" />
    <line x1="17" y1="7" x2="17" y2="17" strokeDasharray="1 3" />
  </svg>
);

// Componente para simular un icono de trofeo
const Trophy = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 22v-4"></path>
    <path d="M14 22v-4"></path>
    <path d="M12 2v5"></path>
    <path d="M6 9a6 6 0 0 0 12 0"></path>
    <path d="M12 12a4 4 0 0 0 4-4"></path>
  </svg>
);

// TechBeamComponent para la sección "Cómo funciona"
function TechBeamComponent() {
  const containerRef = React.useRef(null);
  const centerRef = React.useRef(null);
  const reservaRef = React.useRef(null);
  const calendarioRef = React.useRef(null);
  const pagoRef = React.useRef(null);
  const analyticsRef = React.useRef(null);

  return (
    <div
      className="relative flex h-[400px] w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[350px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <div ref={reservaRef} className="z-10 flex size-16 items-center justify-center rounded-full border-2 border-[#10B981]/40 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
            <Calendar className="h-8 w-8 text-[#10B981]" />
          </div>
          <div ref={calendarioRef} className="z-10 flex size-16 items-center justify-center rounded-full border-2 border-gray-300 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
            <Users className="h-8 w-8 text-gray-700" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <div ref={centerRef} className="z-10 flex size-24 items-center justify-center rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] p-3 shadow-[0_0_30px_-12px_rgba(16,185,129,0.8)]">
            <Activity className="h-12 w-12 text-white" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div ref={pagoRef} className="z-10 flex size-16 items-center justify-center rounded-full border-2 border-gray-300 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
            <CreditCard className="h-8 w-8 text-gray-700" />
          </div>
          <div ref={analyticsRef} className="z-10 flex size-16 items-center justify-center rounded-full border-2 border-[#10B981]/40 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">
            <Database className="h-8 w-8 text-[#10B981]" />
          </div>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={reservaRef}
        toRef={centerRef}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={calendarioRef}
        toRef={centerRef}
        curvature={75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={pagoRef}
        toRef={centerRef}
        curvature={-75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={analyticsRef}
        toRef={centerRef}
        curvature={75}
        endYOffset={10}
      />
    </div>
  );
}

// Process Steps Component
function ProcessStepsImproved() {
  return (
    <div className="relative py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
          Cómo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]">Funciona</span>
        </h2>
        <p className="text-lg max-w-3xl mx-auto font-medium text-gray-500">
          Implementar PadelBook en tu club o centro deportivo es rápido y sencillo con estos simples pasos
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <TechBeamComponent />
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[
          {
            step: "01",
            title: "Configura tu Club",
            description: "Registra tu centro, configura tus pistas y horarios con nuestro intuitivo asistente guiado.",
            icon: <Users className="w-8 h-8" />
          },
          {
            step: "02",
            title: "Personaliza tu Sistema",
            description: "Adapta la plataforma a tus necesidades: precios, restricciones de reserva y opciones de pago.",
            icon: <Calendar className="w-8 h-8" />
          },
          {
            step: "03",
            title: "Invita a tus Usuarios",
            description: "Comparte el acceso con tus clientes para que puedan comenzar a reservar inmediatamente.",
            icon: <Activity className="w-8 h-8" />
          },
          {
            step: "04",
            title: "Analiza y Optimiza",
            description: "Visualiza los datos de ocupación y comportamiento para mejorar continuamente tu estrategia.",
            icon: <Database className="w-8 h-8" />
          }
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-6 border border-gray-200 flex items-start space-x-4 transition-all duration-300 hover:shadow-md hover:border-[#10B981]"
          >
            <div className="flex-shrink-0 flex items-center justify-center bg-[#10B981] text-white h-12 w-12 rounded-full">
              {item.icon}
            </div>
            <div>
              <div className="flex items-center mb-2">
                <span className="text-xs font-semibold bg-[#ecfdf5] text-[#10B981] px-2 py-1 rounded-full mr-2">PASO {item.step}</span>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
              <p className="text-gray-600">{item.description}</p>

              {idx !== 3 && (
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span className="mr-2">Siguiente</span>
                  <ArrowRight className="w-4 h-4 text-[#10B981]" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tweet Card Component
interface Testimonial {
  name: string;
  handle: string;
  text: string;
  avatarInitials: string;
  likes: number;
  retweets: number;
  date: string;
}

function TweetCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="max-w-lg w-full rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:scale-105 mx-4 my-2 bg-white shadow-lg hover:border-[#10B981]">
      {/* Tweet Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center">
            <span className="text-white font-bold text-lg">{testimonial.avatarInitials}</span>
          </div>
          <div>
            <h4 className="font-bold text-lg">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.handle}</p>
          </div>
        </div>
        <svg className="w-6 h-6 text-[#10B981]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Tweet Content */}
      <div className="mb-4">
        <p className="text-base leading-relaxed text-black">
          {testimonial.text}
        </p>
      </div>

      {/* Tweet Metadata */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{testimonial.date}</span>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6V4h6v2H9zm0 0h6v12H9V6z" />
            </svg>
            <span>{testimonial.retweets}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-[#10B981]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>{testimonial.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pricing Card Component
interface PricingPlan {
  name: string;
  price: string;
  billing: string;
  desc: string;
  features: string[];
  cta: string;
  popular: boolean;
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div className={cn(
      "relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col h-full",
      plan.popular ?
        "border-2 border-[#10B981] bg-gray-50" :
        "border border-gray-300 bg-white",
      "shadow-xl"
    )}>
      {plan.popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="px-4 py-1 text-sm font-bold bg-[#10B981] text-white rounded-full">
            Más popular
          </span>
        </div>
      )}

      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
      <div className="flex items-baseline mb-4">
        <span className="text-4xl font-bold">{plan.price}€</span>
        <span className="text-sm ml-2 text-gray-500">/{plan.billing}</span>
      </div>
      <p className="text-sm mb-6 text-gray-500">{plan.desc}</p>

      <div className="flex-grow">
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-[#10B981]" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className={cn(
        "w-full py-3 px-4 font-medium rounded-xl transition-all duration-300",
        plan.popular ?
          "bg-[#10B981] text-white hover:bg-[#0d9669]" :
          "bg-gray-200 text-gray-800 hover:bg-gray-300",
        "hover:shadow-lg"
      )}>
        {plan.cta}
      </button>
    </div>
  );
}

// Navigation Bar Component
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
      isScrolled ? "bg-white shadow-md" : "bg-white"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-12 w-12 bg-gradient-to-b from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center text-white">
              <Activity className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl text-black">PadelBook</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { name: "Inicio", target: "hero" },
              { name: "Características", target: "features" },
              { name: "Testimonios", target: "testimonials" },
              { name: "Cómo funciona", target: "how-it-works" },
              { name: "Precios", target: "pricing" },
              { name: "FAQ", target: "faq" },
              { name: "Contacto", target: "contact" }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.target)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-gray-900 hover:text-[#10B981]"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md md:hidden text-gray-900"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden transition-all duration-300 overflow-hidden",
        isMobileMenuOpen ? "max-h-80" : "max-h-0"
      )}>
        <div className="px-4 pt-2 pb-4 border-t border-gray-200 bg-white">
          <nav className="flex flex-col space-y-1">
            {[
              { name: "Inicio", target: "hero" },
              { name: "Características", target: "features" },
              { name: "Testimonios", target: "testimonials" },
              { name: "Cómo funciona", target: "how-it-works" },
              { name: "Precios", target: "pricing" },
              { name: "FAQ", target: "faq" },
              { name: "Contacto", target: "contact" }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  scrollToSection(item.target);
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 text-gray-900 hover:text-[#10B981]"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

// Colores para las palabras rotativas y elementos de diseño
const brandColors = {
  primary: "#10B981",   // Verde esmeralda (color principal)
  primaryHover: "#0d9669", // Versión más oscura para hover
  blue: "#3B82F6",      // Azul
  green: "#10B981",     // Verde
  purple: "#8B5CF6",    // Púrpura
  amber: "#F59E0B",     // Ámbar
  gray: "#6B7280",      // Gris
  black: "#111827",     // Negro
  white: "#FFFFFF"      // Blanco
};

export default function PadelBookLanding() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = 'PadelBook | Software de Gestión de Reservas de Pádel';
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-2xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-white text-black font-['Inter','system-ui',sans-serif]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Properly Centered */}
      <section id="hero" className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center mt-20 md:mt-0">
            <div className="h-20 w-20 bg-gradient-to-b from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center text-white mb-6">
              <Activity className="h-10 w-10" />
            </div>
            <BlurFade delay={0.25} inView>
              <div className="flex justify-center mb-8 w-full">
                <LayoutGroup>
                  <motion.div className="flex flex-wrap justify-center items-center text-5xl md:text-7xl font-black tracking-tighter leading-none text-black w-full" layout>
                    <motion.span
                      layout
                      className="inline-block w-full sm:w-auto mb-2 sm:mb-0 text-[#1C1C1C]"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    >
                      Gestiona tu club de &nbsp;{" "}
                    </motion.span>
                    <TextRotate
                      texts={[
                        "pádel",
                        "forma fácil",
                        "manera eficiente",
                        "modo digital",
                        "forma inteligente",
                      ]}
                      mainClassName="px-2 sm:px-2 md:px-3 text-white bg-[#10B981] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={2000}
                    />
                  </motion.div>
                </LayoutGroup>
              </div>
            </BlurFade>
            <BlurFade delay={0.5} inView>
              <div className="mb-6">
                <AnimatedShinyText className="text-2xl md:text-3xl font-bold tracking-tight">
                  El software completo para centros de pádel
                </AnimatedShinyText>
              </div>
            </BlurFade>
            <BlurFade delay={0.75} inView>
              <p className="text-xl md:text-2xl mb-10 leading-relaxed font-medium text-gray-600">
                Reservas online, gestión de pistas, torneos y estadísticas. Todo en una sola plataforma.
              </p>
            </BlurFade>
            <BlurFade delay={1} inView>
              <div className="flex justify-center">
                <PulsatingButton onClick={() => scrollToSection('pricing')}>
                  Comenzar prueba gratuita
                </PulsatingButton>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ProcessStepsImproved />
        </div>
      </section>

      {/* Velocity Scroll Section */}
      <section className="py-12 border-y border-gray-200 bg-white">
        <div className="overflow-hidden">
          <VelocityScroll
            className="text-4xl md:text-6xl font-bold py-8"
          >
            <span className="text-gray-300">SIMPLIFICA</span> <span className="text-[#10B981]">OPTIMIZA</span> <span className="text-gray-300">DIGITALIZA</span> <span className="text-gray-300">CRECE</span> <span className="text-[#10B981]">INNOVA</span> <span className="text-gray-300">CONTROLA</span>
          </VelocityScroll>
        </div>
      </section>

      {/* Features Grid using BentoDemo */}
      <section id="features" className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Funcionalidades Que Transforman Tu <span className="text-[#10B981]">Club</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto font-medium text-gray-500">
            Herramientas avanzadas diseñadas específicamente para centros de pádel, que mejoran
            la experiencia de jugadores y gestores 🎾
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Reservas simplificadas */}
          <div className="bg-gray-50 rounded-xl overflow-hidden p-6 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-2">Reservas simplificadas</h3>
            <p className="text-gray-700 mb-4">
              Sistema intuitivo de reserva de pistas que permite a los usuarios ver disponibilidad en 
              tiempo real y hacer reservas en segundos.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 relative border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Mayo 2025</span>
                <div className="flex space-x-1">
                  <button className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full">
                    <ArrowRight className="w-3 h-3 transform rotate-180" />
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full">
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 text-center text-xs text-gray-500 bg-gray-50 py-1 rounded">
                {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, i) => (
                  <div key={i}>{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 mt-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className={`h-8 w-full rounded flex items-center justify-center text-xs 
                    ${i === 6 ? 'bg-[#10B981]/10 text-[#10B981] font-medium border border-[#10B981]/30' : 'bg-gray-50'}`}>
                    {6 + i}
                  </div>
                ))}
              </div>
              <div className="mt-2 bg-green-100 text-[#10B981] text-xs py-1 px-2 rounded inline-block">
                ¡Pista 3 reservada!
              </div>
            </div>
            <a href="#" className="text-[#10B981] text-sm font-medium inline-flex items-center">
              Ver demo <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>

          {/* Gestión de torneos */}
          <div className="bg-gray-50 rounded-xl overflow-hidden p-6 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-2">Gestión de torneos</h3>
            <p className="text-gray-700 mb-4">
              Organiza competiciones con facilidad. Gestiona inscripciones, emparejamientos y resultados para 
              mantener a tus jugadores comprometidos.
            </p>
            <div className="bg-white rounded-lg mb-4 overflow-hidden border border-gray-100">
              <div className="px-4 py-3 bg-[#10B981] text-white flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-[#10B981] text-[8px]">✓</span>
                  </div>
                  <span className="text-xs">¡Inscripción confirmada!</span>
                </div>
                <div className="text-sm font-medium">24-26 Mayo</div>
              </div>
              <div className="px-4 py-6 flex justify-center">
                <div className="relative">
                  <div className="border-2 border-[#10B981] rounded-lg px-3 py-2 text-center text-sm bg-green-50 w-24">
                    <div className="font-bold">Final</div>
                    <div className="text-xs text-gray-500">26 Mayo</div>
                  </div>
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full flex items-center">
                    <div className="h-0.5 w-6 bg-gray-300"></div>
                    <div className="border border-gray-300 rounded-lg px-2 py-1 text-center text-xs bg-white mr-3">
                      <div>Semi 2</div>
                      <div className="text-[10px] text-gray-500">25 Mayo</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                <div>
                  <div className="text-xs text-gray-500">Precio de inscripción</div>
                  <div className="font-medium">25€ por pareja</div>
                </div>
                <button className="px-3 py-1.5 bg-[#10B981] text-white text-xs font-medium rounded-lg">
                  Inscribirme
                </button>
              </div>
            </div>
            <a href="#" className="text-[#10B981] text-sm font-medium inline-flex items-center">
              Explorar <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>

          {/* Análisis Avanzado */}
          <div className="bg-gray-50 rounded-xl overflow-hidden p-6 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-2">Análisis Avanzado</h3>
            <p className="text-gray-700 mb-4">
              Obtén datos detallados sobre la ocupación de tus pistas, preferencias de los usuarios y tendencias 
              para optimizar tu negocio.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 border border-gray-100">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Reservas</div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">438</span>
                    <span className="text-xs bg-[#10B981]/10 text-[#10B981] px-1 py-0.5 rounded">+24%</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Usuarios</div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">215</span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-1 py-0.5 rounded">+12%</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Ocupación</div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">76%</span>
                    <span className="text-xs bg-[#10B981]/10 text-[#10B981] px-1 py-0.5 rounded">+8%</span>
                  </div>
                </div>
              </div>
              <div className="mb-2 text-sm font-medium">Reservas por día</div>
              <div className="h-16 flex items-end space-x-1 mb-1">
                {[40, 65, 50, 90, 75, 60].map((height, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full rounded-t-sm bg-[#10B981]" 
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-6 text-[10px] text-center text-gray-400">
                {['L', 'M', 'X', 'J', 'V', 'S'].map((day, i) => (
                  <div key={i}>{day}</div>
                ))}
              </div>
              <div className="mt-4 text-sm font-medium">Distribución por horas</div>
            </div>
            <a href="#" className="text-[#10B981] text-sm font-medium inline-flex items-center">
              Ver analytics <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>

          {/* App para jugadores */}
          <div className="bg-gray-50 rounded-xl overflow-hidden p-6 shadow-sm">
            <h3 className="text-xl font-bold text-black mb-2">App para jugadores</h3>
            <p className="text-gray-700 mb-4">
              Ofrece a tus clientes una experiencia premium con una app móvil intuitiva para 
              reservas, pagos y notificaciones.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 flex justify-center border border-gray-100">
              <div className="w-48 h-auto rounded-xl bg-gray-50 relative p-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="h-5 bg-[#10B981] flex items-center justify-between px-3">
                    <div className="w-8 h-1 bg-white/40 rounded-full"></div>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-white/70 rounded-full"></div>
                      <div className="w-1 h-1 bg-white/70 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-2 space-y-2">
                    <div className="text-[8px] bg-gray-100 text-center py-1 rounded">Hoy, 19 de Mayo</div>
                    <div className="flex justify-between text-[8px]">
                      <div className="font-medium">Pista 4</div>
                      <div className="bg-green-100 text-[#10B981] px-1 rounded">Disponible</div>
                    </div>
                    <div className="text-[7px] text-gray-500">17:00 - 18:30</div>
                    <button className="w-full bg-[#10B981] text-white text-[8px] py-1 rounded mt-2">
                      Reservar
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[8px] bg-white px-1 py-0.5 rounded shadow border border-gray-100">
                  Pista 4 • Disponible
                </div>
              </div>
            </div>
            <a href="#" className="text-[#10B981] text-sm font-medium inline-flex items-center">
              Ver funciones <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <BlurFade delay={0.25} inView>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                Lo que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]">dicen</span> nuestros clientes
              </h2>
            </BlurFade>
            <BlurFade delay={0.5} inView>
              <p className="text-lg mb-12 max-w-3xl mx-auto font-medium text-gray-500">
                Descubre cómo PadelBook ha transformado la gestión de clubes en todo el país
              </p>
            </BlurFade>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide">
            {testimonials.map((testimonial, idx) => (
              <BlurFade key={idx} delay={0.3 + idx * 0.2} inView>
                <TweetCard testimonial={testimonial} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <BlurFade delay={0.25} inView>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                Planes <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]">Sencillos</span>
              </h2>
            </BlurFade>
            <BlurFade delay={0.5} inView>
              <p className="text-lg mb-12 max-w-3xl mx-auto font-medium text-gray-500">
                Precios transparentes que escalan con tu club. Sin sorpresas ni comisiones ocultas.
              </p>
            </BlurFade>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {pricingPlans.map((plan, idx) => (
              <BlurFade key={idx} delay={0.25 + idx * 0.2} inView>
                <PricingCard plan={plan} />
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.8} inView>
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500">
                ¿Tienes necesidades específicas? <a href="#contact" className="underline text-black font-medium">Contáctanos</a> para un plan personalizado.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <BlurFade delay={0.25} inView>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                Preguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]">Frecuentes</span>
              </h2>
            </BlurFade>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "¿Qué necesito para empezar a usar PadelBook?",
                answer: "Solo necesitas registrarte, configurar las pistas de tu club y comenzar a recibir reservas. No requiere ningún hardware especial."
              },
              {
                question: "¿Puedo integrar PadelBook con mi sistema de pagos actual?",
                answer: "¡Absolutamente! Nos integramos con la mayoría de pasarelas de pago populares como Stripe, PayPal y otros sistemas locales."
              },
              {
                question: "¿Cómo gestionan los usuarios las cancelaciones de reservas?",
                answer: "PadelBook permite configurar políticas de cancelación personalizadas. Puedes establecer plazos, penalizaciones o reembolsos según las necesidades de tu club."
              },
              {
                question: "¿Es necesario que mis clientes descarguen una app?",
                answer: "No es obligatorio. PadelBook funciona perfectamente desde cualquier navegador web. Sin embargo, ofrecemos una app móvil opcional que mejora la experiencia del usuario."
              },
              {
                question: "¿Puedo probar PadelBook antes de pagar?",
                answer: "Sí, ofrecemos una prueba gratuita de 14 días con todas las funcionalidades para que puedas experimentar el impacto en tu club."
              }
            ].map((faq, idx) => (
              <BlurFade key={idx} delay={0.3 + idx * 0.1} inView>
                <div className="border border-gray-200 p-6 hover:border-[#10B981] transition-all duration-300 rounded-xl bg-white shadow-sm hover:shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-black">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contact" className="py-20 px-4 relative bg-white-50">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Meteors number={20} />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <BlurFade delay={0.25} inView>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Listo para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]">Digitalizar</span> tu Club?
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <p className="text-lg mb-12 max-w-3xl mx-auto font-medium text-gray-600">
              Únete a los cientos de clubes de pádel que ya están transformando su negocio con PadelBook.
              Comienza hoy mismo y experimenta la diferencia.
            </p>
          </BlurFade>
          <BlurFade delay={0.75} inView>
            <div className="flex justify-center">
              <PulsatingButton className="bg-[#10B981] hover:bg-[#0d9669] text-white">
                Comenzar 14 días gratis
              </PulsatingButton>
            </div>
          </BlurFade>

          <BlurFade delay={1} inView>
            <div className="mt-12 max-w-lg mx-auto">
              <div className="border border-gray-200 p-4 flex items-center hover:border-[#10B981] transition-all duration-300 bg-white rounded-lg shadow-sm">
                <div className="flex-shrink-0 mr-4 w-12 h-12 rounded-full flex items-center justify-center bg-[#ecfdf5]">
                  <Phone className="w-6 h-6 text-[#10B981]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium mb-1">¿Necesitas ayuda personalizada?</p>
                  <a href="tel:+34911234567" className="text-lg font-bold text-black hover:text-[#10B981]">+34 911 234 567</a>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center text-black">
                <Activity className="w-6 h-6 mr-2 text-[#10B981]" />
                PadelBook
              </h3>
              <p className="text-sm mb-4 text-gray-600">
                Revolucionando la gestión de clubes de pádel con tecnología innovadora.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></svg> },
                  { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path></svg> },
                  { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path></svg> },
                  { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg> }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-[#10B981]"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-black">Producto</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#features" className="hover:underline hover:text-[#10B981]">Características</a></li>
                <li><a href="#pricing" className="hover:underline hover:text-[#10B981]">Precios</a></li>
                <li><a href="#" className="hover:underline hover:text-[#10B981]">Actualizaciones</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-black">Recursos</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:underline hover:text-[#10B981]">Blog</a></li>
                <li><a href="#" className="hover:underline hover:text-[#10B981]">Guías</a></li>
                <li><a href="#" className="hover:underline hover:text-[#10B981]">Centro de ayuda</a></li>
                <li><a href="#" className="hover:underline hover:text-[#10B981]">Webinars</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-black">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:underline hover:text-[#10B981]">Sobre nosotros</a></li>
                <li><a href="#" className="hover:underline hover:text-[#10B981]">Clientes</a></li>
                <li><a href="#contact" className="hover:underline hover:text-[#10B981]">Contacto</a></li>
                <li><a href="#" className="hover:underline hover:text-[#10B981]">Trabaja con nosotros</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2025 PadelBook. Todos los derechos reservados.</p>
            <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:underline hover:text-[#10B981]">Términos de servicio</a>
              <a href="#" className="hover:underline hover:text-[#10B981]">Política de privacidad</a>
              <a href="#" className="hover:underline hover:text-[#10B981]">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}